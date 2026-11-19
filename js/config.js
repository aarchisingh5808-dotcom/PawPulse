/**
 * PawPulse – Platform Configuration & Constants
 * Defines BLE GATT UUIDs, telemetry contracts, default application settings, and directories.
 */

window.PawPulse = window.PawPulse || {};

window.PawPulse.Config = {
  VERSION: '1.0.0-hardware-ready',

  STORAGE_KEYS: {
    STATE: 'pawpulse_state_v1',
    ACTIVE_PET: 'pawpulse_active_pet',
    DEVICE: 'pawpulse_device_v1',
    RESCUE_REPORTS: 'pawpulse_rescue_reports_v1'
  },

  // Standard Bluetooth SIG GATT Service & Characteristic UUIDs
  BLE: {
    SERVICES: {
      HEART_RATE: 0x180D,           // 16-bit standard Heart Rate service
      BATTERY: 0x180F,              // 16-bit standard Battery service
      HEALTH_THERMOMETER: 0x1809,   // 16-bit standard Temperature service
      CUSTOM_TELEMETRY: '0000ff00-0000-1000-8000-00805f9b34fb' // Custom PawPulse Collar stream
    },
    CHARACTERISTICS: {
      HEART_RATE_MEASUREMENT: 0x2A37,
      BATTERY_LEVEL: 0x2A19,
      TEMPERATURE_MEASUREMENT: 0x2A1C,
      CUSTOM_STREAM: '0000ff01-0000-1000-8000-00805f9b34fb' // Encapsulates respiratory, activity, collar telemetry
    },
    DEVICE_NAME_PREFIX: 'PawPulse-Collar'
  },

  DEVICE_STATES: {
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    SYNCHRONIZING: 'synchronizing',
    UNAVAILABLE: 'unavailable'
  },

  RESCUE_STATUSES: {
    SUBMITTED: 'submitted',
    TRIAGED: 'triaged',
    DISPATCHED: 'dispatched',
    RESOLVED: 'resolved'
  }
};
