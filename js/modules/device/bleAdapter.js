/**
 * PawPulse – Bluetooth Low Energy (BLE) Hardware Adapter
 * Implements Web Bluetooth API communication with PawPulse smart collar hardware.
 * Subscribes to standard Bluetooth SIG GATT services and parses incoming telemetry packets.
 */

window.PawPulse = window.PawPulse || {};
window.PawPulse.Device = window.PawPulse.Device || {};

window.PawPulse.Device.BleAdapter = (() => {
  const { BLE } = window.PawPulse.Config;
  let activeDevice = null;
  let gattServer = null;
  let telemetryCallback = null;

  function isSupported() {
    return typeof navigator !== 'undefined' && 'bluetooth' in navigator;
  }

  // Parse standard Bluetooth SIG Heart Rate Measurement (0x2A37) DataView
  function parseHeartRate(dataView) {
    const flags = dataView.getUint8(0);
    const is16Bit = (flags & 0x01) !== 0;
    if (is16Bit) {
      return dataView.getUint16(1, /* littleEndian */ true);
    }
    return dataView.getUint8(1);
  }

  // Parse standard Bluetooth SIG Battery Level (0x2A19) DataView (0-100%)
  function parseBatteryLevel(dataView) {
    return dataView.getUint8(0);
  }

  // Parse standard Bluetooth SIG Temperature Measurement (0x2A1C) DataView (IEEE-11073 32-bit float)
  function parseTemperature(dataView) {
    const flags = dataView.getUint8(0);
    const isFahrenheit = (flags & 0x01) !== 0;
    // Temperature value in 32-bit FLOAT-Type
    const mantissa = dataView.getInt32(1, true) & 0x00FFFFFF;
    const exponent = dataView.getInt8(4);
    let temp = mantissa * Math.pow(10, exponent);
    if (isFahrenheit) {
      temp = (temp - 32) * (5 / 9); // Convert to Celsius
    }
    return Math.round(temp * 10) / 10;
  }

  return {
    isSupported,

    async requestCollarDevice() {
      if (!isSupported()) {
        throw new Error('Web Bluetooth is not supported in this browser. Please use Chrome, Edge, or Opera.');
      }

      const device = await navigator.bluetooth.requestDevice({
        filters: [
          { namePrefix: BLE.DEVICE_NAME_PREFIX },
          { namePrefix: 'PawPulse' }
        ],
        optionalServices: [
          BLE.SERVICES.HEART_RATE,
          BLE.SERVICES.BATTERY,
          BLE.SERVICES.HEALTH_THERMOMETER,
          BLE.SERVICES.CUSTOM_TELEMETRY
        ]
      });

      activeDevice = device;
      return {
        id: device.id,
        name: device.name || 'PawPulse Smart Collar'
      };
    },

    async connect(deviceInstance, onDisconnectCallback) {
      if (!activeDevice && deviceInstance) {
        activeDevice = deviceInstance;
      }
      if (!activeDevice) throw new Error('No device selected to connect.');

      activeDevice.addEventListener('gattserverdisconnected', () => {
        gattServer = null;
        if (onDisconnectCallback) onDisconnectCallback();
      });

      gattServer = await activeDevice.gatt.connect();
      return gattServer.connected;
    },

    async startTelemetryStream(onPacketCallback) {
      telemetryCallback = onPacketCallback;
      if (!gattServer || !gattServer.connected) {
        throw new Error('GATT Server not connected.');
      }

      // 1. Subscribe to standard Heart Rate Service if available
      try {
        const hrService = await gattServer.getPrimaryService(BLE.SERVICES.HEART_RATE);
        const hrChar = await hrService.getCharacteristic(BLE.CHARACTERISTICS.HEART_RATE_MEASUREMENT);
        await hrChar.startNotifications();
        hrChar.addEventListener('characteristicvaluechanged', (e) => {
          const hr = parseHeartRate(e.target.value);
          if (telemetryCallback) {
            telemetryCallback({
              type: 'vitals',
              isSimulated: false, // Certified live hardware reading!
              data: { heartRateBpm: hr }
            });
          }
        });
      } catch (err) {
        console.warn('Collar Heart Rate service optional probe:', err.message);
      }

      // 2. Subscribe to Battery Service if available
      try {
        const batService = await gattServer.getPrimaryService(BLE.SERVICES.BATTERY);
        const batChar = await batService.getCharacteristic(BLE.CHARACTERISTICS.BATTERY_LEVEL);
        await batChar.startNotifications();
        batChar.addEventListener('characteristicvaluechanged', (e) => {
          const batteryLevel = parseBatteryLevel(e.target.value);
          if (telemetryCallback) {
            telemetryCallback({
              type: 'device',
              isSimulated: false,
              data: { batteryPct: batteryLevel }
            });
          }
        });
      } catch (err) {
        console.warn('Collar Battery service optional probe:', err.message);
      }
    },

    disconnect() {
      if (activeDevice && activeDevice.gatt.connected) {
        activeDevice.gatt.disconnect();
      }
      gattServer = null;
      activeDevice = null;
    }
  };
})();
