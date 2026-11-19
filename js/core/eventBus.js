/**
 * PawPulse – Event Bus Core Module
 * Lightweight publish/subscribe event dispatcher for decoupled inter-module communication.
 */

window.PawPulse = window.PawPulse || {};

window.PawPulse.EventBus = (() => {
  const listeners = {};

  return {
    on(event, callback) {
      if (!listeners[event]) listeners[event] = [];
      listeners[event].push(callback);
      return () => this.off(event, callback);
    },

    off(event, callback) {
      if (!listeners[event]) return;
      listeners[event] = listeners[event].filter(cb => cb !== callback);
    },

    emit(event, data) {
      if (!listeners[event]) return;
      listeners[event].forEach(callback => {
        try {
          callback(data);
        } catch (err) {
          console.error(`PawPulse EventBus Error on '${event}':`, err);
        }
      });
    }
  };
})();
