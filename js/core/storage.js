/**
 * PawPulse – Storage & Repository Core Module
 * Provides clean database abstraction. Currently backed by browser localStorage,
 * designed with clean interfaces to swap with cloud databases/REST APIs in the future.
 */

window.PawPulse = window.PawPulse || {};

window.PawPulse.Storage = (() => {
  const { STORAGE_KEYS } = window.PawPulse.Config;

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  return {
    get(key, defaultValue = null) {
      try {
        const item = localStorage.getItem(key);
        if (!item) return defaultValue;
        return JSON.parse(item);
      } catch (err) {
        console.warn(`PawPulse Storage get error for key "${key}":`, err);
        return defaultValue;
      }
    },

    set(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (err) {
        console.error(`PawPulse Storage set error for key "${key}":`, err);
        return false;
      }
    },

    remove(key) {
      try {
        localStorage.removeItem(key);
        return true;
      } catch (err) {
        console.warn(`PawPulse Storage remove error for key "${key}":`, err);
        return false;
      }
    },

    // --- Specialized Domain Repositories ---

    loadPetData(defaultInitialData) {
      try {
        const parsed = this.get(STORAGE_KEYS.STATE);
        if (!parsed || typeof parsed !== 'object') {
          return deepClone(defaultInitialData);
        }

        const merged = deepClone(defaultInitialData);

        ['cat', 'dog'].forEach(petKey => {
          if (parsed[petKey] && typeof parsed[petKey] === 'object') {
            const userPet = parsed[petKey];

            if (typeof userPet.name === 'string' && userPet.name.trim()) merged[petKey].name = userPet.name;
            if (typeof userPet.profileBreed === 'string' && userPet.profileBreed.trim()) merged[petKey].profileBreed = userPet.profileBreed;
            if (typeof userPet.breed === 'string' && userPet.breed.trim()) merged[petKey].breed = userPet.breed;
            if (typeof userPet.age === 'string' && userPet.age.trim()) merged[petKey].age = userPet.age;
            if (typeof userPet.weight === 'string' && userPet.weight.trim()) merged[petKey].weight = userPet.weight;
            if (typeof userPet.color === 'string' && userPet.color.trim()) merged[petKey].color = userPet.color;

            // Reminders array preservation (deleted items stay deleted)
            if (Array.isArray(userPet.reminders)) {
              merged[petKey].reminders = userPet.reminders;
            }

            // 6 Pet care sections preservation
            if (userPet.careSections && typeof userPet.careSections === 'object') {
              Object.keys(merged[petKey].careSections).forEach(secKey => {
                if (userPet.careSections[secKey] && Array.isArray(userPet.careSections[secKey].items)) {
                  merged[petKey].careSections[secKey].items = userPet.careSections[secKey].items;
                }
              });
            }
          }
        });

        return merged;
      } catch (err) {
        console.error('PawPulse Storage: Error loading pet data, using defaults:', err);
        return deepClone(defaultInitialData);
      }
    },

    savePetData(petData) {
      return this.set(STORAGE_KEYS.STATE, petData);
    },

    loadActivePet() {
      const active = this.get(STORAGE_KEYS.ACTIVE_PET, 'cat');
      return (active === 'cat' || active === 'dog') ? active : 'cat';
    },

    saveActivePet(petKey) {
      return this.set(STORAGE_KEYS.ACTIVE_PET, petKey);
    },

    loadDeviceState() {
      return this.get(STORAGE_KEYS.DEVICE, {
        pairedDeviceId: null,
        pairedDeviceName: null,
        lastSyncTimestamp: null,
        simulationMode: true
      });
    },

    saveDeviceState(deviceState) {
      return this.set(STORAGE_KEYS.DEVICE, deviceState);
    },

    loadRescueReports() {
      return this.get(STORAGE_KEYS.RESCUE_REPORTS, []);
    },

    saveRescueReports(reports) {
      return this.set(STORAGE_KEYS.RESCUE_REPORTS, reports);
    },

    resetAllData() {
      this.remove(STORAGE_KEYS.STATE);
      this.remove(STORAGE_KEYS.ACTIVE_PET);
      this.remove(STORAGE_KEYS.DEVICE);
      this.remove(STORAGE_KEYS.RESCUE_REPORTS);
    }
  };
})();
