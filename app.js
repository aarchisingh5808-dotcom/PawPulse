/**
 * PawPulse – Pet Health Monitoring Prototype (Version 0 Enhanced with LocalStorage Persistence)
 * Handles screen navigation, pet switching, interactive reminders, care accordions,
 * pet profile editing, and robust localStorage persistence.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Storage Keys & Default Initial Demo Data
  // ==========================================================================
  const STORAGE_KEY = 'pawpulse_state_v1';
  const ACTIVE_PET_KEY = 'pawpulse_active_pet';

  const categoryIcons = {
    vet: { icon: '🩺', badgeClass: 'badge-vet', label: 'Vet Visit' },
    grooming: { icon: '🛁', badgeClass: 'badge-grooming', label: 'Grooming' },
    brush: { icon: '✂️', badgeClass: 'badge-brush', label: 'Hygiene' },
    med: { icon: '💊', badgeClass: 'badge-med', label: 'Medication' },
    nutrition: { icon: '🥣', badgeClass: 'badge-nutrition', label: 'Feeding' },
    general: { icon: '🐾', badgeClass: 'badge-general', label: 'General' }
  };

  const DEFAULT_INITIAL_DATA = {
    cat: {
      avatar: '🐱',
      name: 'Luna',
      species: 'Cat',
      breed: 'Domestic Shorthair • 3 Years Old',
      profileBreed: 'Domestic Shorthair Cat',
      demoId: 'Pet ID: #DEMO-CAT-01 (Fictional Placeholder)',
      age: '3 Years',
      weight: '4.2 kg',
      speciesDetail: 'Feline',
      color: 'Silver Tabby',
      metrics: {
        heartRate: '120',
        activity: '45',
        sleep: '13.5'
      },
      readings: {
        hr: '120 bpm',
        weight: '4.2 kg',
        activity: '45 mins',
        temp: '38.4 °C'
      },
      reminders: [
        {
          id: 'rem-cat-1',
          title: 'Routine Veterinary Wellness Checkup',
          date: 'Next Month (Demo Reminder)',
          category: 'vet',
          description: 'Comprehensive annual wellness inspection including coat check, dental overview, and routine weight check.',
          status: 'pending',
          isUserCreated: false
        },
        {
          id: 'rem-cat-2',
          title: 'Pet Grooming & Hygiene Session',
          date: 'This Saturday (Demo Reminder)',
          category: 'grooming',
          description: 'Gentle coat brushing session to remove loose undercoat fur and maintain coat cleanliness.',
          status: 'pending',
          isUserCreated: false
        },
        {
          id: 'rem-cat-3',
          title: 'Nail Trim & Coat Brushing',
          date: 'In 2 Weeks (Demo Reminder)',
          category: 'brush',
          description: 'Front claw inspection and tip trim using feline-safe pet clippers.',
          status: 'pending',
          isUserCreated: false
        }
      ],
      careSections: {
        feeding: {
          title: 'Feeding Schedules',
          icon: '🥣',
          items: [
            {
              id: 'care-cat-f1',
              title: 'Daily Meal Schedule',
              details: 'Twice daily standard portion (morning at 8:00 AM, evening at 6:30 PM).',
              isUserCreated: false
            },
            {
              id: 'care-cat-f2',
              title: 'Hydration & Water Preference',
              details: 'Prefers circulating fresh water fountain; bowl refreshed daily.',
              isUserCreated: false
            }
          ]
        },
        grooming: {
          title: 'Grooming',
          icon: '🛁',
          items: [
            {
              id: 'care-cat-g1',
              title: 'Coat Brushing Routine',
              details: 'Soft silicone brush twice weekly to manage seasonal shedding.',
              isUserCreated: false
            },
            {
              id: 'care-cat-g2',
              title: 'Claw Maintenance',
              details: 'Inspect claws every 2 to 3 weeks; trim outer sharp tips gently.',
              isUserCreated: false
            }
          ]
        },
        vaccinations: {
          title: 'Vaccinations',
          icon: '💉',
          items: [
            {
              id: 'care-cat-v1',
              title: 'FVRCP Routine Booster Log',
              details: 'Core feline booster administered during annual checkup (Fictional Demonstration Record).',
              isUserCreated: false
            },
            {
              id: 'care-cat-v2',
              title: 'Rabies Vaccination Log',
              details: 'Current status recorded under sample veterinary profile.',
              isUserCreated: false
            }
          ]
        },
        vetVisits: {
          title: 'Veterinary Visits',
          icon: '🩺',
          items: [
            {
              id: 'care-cat-vv1',
              title: 'Primary Care Clinic',
              details: 'Sample Feline Care Center (Demo Placeholder clinic).',
              isUserCreated: false
            },
            {
              id: 'care-cat-vv2',
              title: 'Last Routine Wellness Exam',
              details: '2024 annual wellness check recorded as healthy baseline (Demo Record).',
              isUserCreated: false
            }
          ]
        },
        medications: {
          title: 'Medications',
          icon: '💊',
          items: [
            {
              id: 'care-cat-m1',
              title: 'Monthly Topical Preventive',
              details: 'Seasonal flea and tick topical solution applied the 1st of each month (Sample Demo Note).',
              isUserCreated: false
            }
          ]
        },
        careNotes: {
          title: 'Care Notes',
          icon: '📝',
          items: [
            {
              id: 'care-cat-cn1',
              title: 'Resting & Sunlight Spots',
              details: 'Loves resting on the cushioned windowsill during sunny afternoons.',
              isUserCreated: false
            }
          ]
        }
      },
      history: [
        {
          year: '2025',
          title: 'Routine Core Vaccination Log',
          desc: 'Fictional sample record demonstrating routine feline booster administration.'
        },
        {
          year: '2024',
          title: 'Annual Physical Examination',
          desc: 'Fictional demonstration entry illustrating a routine annual wellness exam.'
        },
        {
          year: '2023',
          title: 'Initial Pet Wellness Intake',
          desc: 'Fictional demonstration intake record and kitten baseline registration.'
        }
      ],
      observations: [
        {
          date: 'Nov 17, 2026',
          text: '"Engaged in energetic morning play session with feather toy; finished usual portion of food without hesitation."'
        },
        {
          date: 'Nov 08, 2026',
          text: '"Rested calmly indoors for most of the afternoon. Water consumption was steady throughout the day."'
        },
        {
          date: 'Oct 25, 2026',
          text: '"Introduced to a new scratching post; calm and relaxed behavior observed."'
        }
      ]
    },
    dog: {
      avatar: '🐶',
      name: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever Mix • 4 Years Old',
      profileBreed: 'Golden Retriever Mix Dog',
      demoId: 'Pet ID: #DEMO-DOG-02 (Fictional Placeholder)',
      age: '4 Years',
      weight: '26.5 kg',
      speciesDetail: 'Canine',
      color: 'Golden Honey',
      metrics: {
        heartRate: '82',
        activity: '65',
        sleep: '11.0'
      },
      readings: {
        hr: '82 bpm',
        weight: '26.5 kg',
        activity: '65 mins',
        temp: '38.6 °C'
      },
      reminders: [
        {
          id: 'rem-dog-1',
          title: 'Routine Veterinary Wellness Checkup',
          date: 'Next Month (Demo Reminder)',
          category: 'vet',
          description: 'Annual canine physical exam including heart sounds check, dental assessment, and joint mobility review.',
          status: 'pending',
          isUserCreated: false
        },
        {
          id: 'rem-dog-2',
          title: 'Pet Grooming & Hygiene Session',
          date: 'This Saturday (Demo Reminder)',
          category: 'grooming',
          description: 'Bath, de-shedding blowout, and thorough ear cleaning session.',
          status: 'pending',
          isUserCreated: false
        },
        {
          id: 'rem-dog-3',
          title: 'Nail Trim & Coat Brushing',
          date: 'In 2 Weeks (Demo Reminder)',
          category: 'brush',
          description: 'Routine paw pad check and nail clip to maintain comfortable walking posture.',
          status: 'pending',
          isUserCreated: false
        }
      ],
      careSections: {
        feeding: {
          title: 'Feeding Schedules',
          icon: '🥣',
          items: [
            {
              id: 'care-dog-f1',
              title: 'Daily Feeding Routine',
              details: 'Two cups dry balanced kibble split evenly between 7:30 AM and 6:00 PM.',
              isUserCreated: false
            },
            {
              id: 'care-dog-f2',
              title: 'Treats & Rewards',
              details: 'Enjoys crunchy carrot sticks and pet-safe dental chews after evening walks.',
              isUserCreated: false
            }
          ]
        },
        grooming: {
          title: 'Grooming',
          icon: '🛁',
          items: [
            {
              id: 'care-dog-g1',
              title: 'Undercoat De-shedding',
              details: 'Weekly brushing with undercoat rake to minimize shedding.',
              isUserCreated: false
            },
            {
              id: 'care-dog-g2',
              title: 'Paw Care',
              details: 'Wipe paws with damp cloth after muddy outdoor trail walks.',
              isUserCreated: false
            }
          ]
        },
        vaccinations: {
          title: 'Vaccinations',
          icon: '💉',
          items: [
            {
              id: 'care-dog-v1',
              title: 'DHPP Core Routine Booster',
              details: 'Administered as part of canine routine prevention schedule (Demo Record).',
              isUserCreated: false
            },
            {
              id: 'care-dog-v2',
              title: 'Rabies Booster',
              details: 'Logged under sample preventive canine records.',
              isUserCreated: false
            }
          ]
        },
        vetVisits: {
          title: 'Veterinary Visits',
          icon: '🩺',
          items: [
            {
              id: 'care-dog-vv1',
              title: 'Primary Canine Care Clinic',
              details: 'Sample Canine Wellness Clinic (Demo Placeholder clinic).',
              isUserCreated: false
            },
            {
              id: 'care-dog-vv2',
              title: 'Annual Physical Checkup',
              details: '2024 routine checkup recorded in baseline log.',
              isUserCreated: false
            }
          ]
        },
        medications: {
          title: 'Medications',
          icon: '💊',
          items: [
            {
              id: 'care-dog-m1',
              title: 'Heartworm Preventive Chewable',
              details: 'Monthly chewable administered on the 15th with dinner (Sample Demo Note).',
              isUserCreated: false
            }
          ]
        },
        careNotes: {
          title: 'Care Notes',
          icon: '📝',
          items: [
            {
              id: 'care-dog-cn1',
              title: 'Play & Exercise Preferences',
              details: 'Enjoys 30-minute morning walks and playing fetch with tennis balls in the yard.',
              isUserCreated: false
            }
          ]
        }
      },
      history: [
        {
          year: '2025',
          title: 'Routine Canine Booster Log',
          desc: 'Fictional sample record demonstrating routine canine immunization.'
        },
        {
          year: '2024',
          title: 'Annual Physical Examination',
          desc: 'Fictional demonstration entry illustrating a routine annual canine wellness check.'
        },
        {
          year: '2022',
          title: 'Initial Pet Adoption Intake',
          desc: 'Fictional demonstration registration and baseline wellness checkup.'
        }
      ],
      observations: [
        {
          date: 'Nov 18, 2026',
          text: '"Enjoyed afternoon stroll in the park; wagged tail cheerfully and rested comfortably afterwards."'
        },
        {
          date: 'Nov 10, 2026',
          text: '"Showed high enthusiasm during morning fetch routine; drank fresh water promptly."'
        },
        {
          date: 'Oct 29, 2026',
          text: '"Calm during coat grooming session; showed relaxed posture."'
        }
      ]
    }
  };

  function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  // ==========================================================================
  // 2. Safe Persistence: Load & Save with Validation
  // ==========================================================================
  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // First-time user: Return deep clone of default sample data
        return deepClone(DEFAULT_INITIAL_DATA);
      }

      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') {
        console.warn('PawPulse: Invalid localStorage payload. Reverting safely to default.');
        return deepClone(DEFAULT_INITIAL_DATA);
      }

      // Safe merge: Preserve user's saved data while ensuring structure integrity
      const merged = deepClone(DEFAULT_INITIAL_DATA);

      ['cat', 'dog'].forEach(petKey => {
        if (parsed[petKey] && typeof parsed[petKey] === 'object') {
          const userPet = parsed[petKey];

          // 1. Profile information
          if (typeof userPet.name === 'string' && userPet.name.trim()) merged[petKey].name = userPet.name;
          if (typeof userPet.profileBreed === 'string' && userPet.profileBreed.trim()) merged[petKey].profileBreed = userPet.profileBreed;
          if (typeof userPet.breed === 'string' && userPet.breed.trim()) merged[petKey].breed = userPet.breed;
          if (typeof userPet.age === 'string' && userPet.age.trim()) merged[petKey].age = userPet.age;
          if (typeof userPet.weight === 'string' && userPet.weight.trim()) merged[petKey].weight = userPet.weight;
          if (typeof userPet.color === 'string' && userPet.color.trim()) merged[petKey].color = userPet.color;

          // 2. Reminders: Load the exact saved array (so deleted items stay deleted!)
          if (Array.isArray(userPet.reminders)) {
            merged[petKey].reminders = userPet.reminders;
          }

          // 3. Care Sections (Feeding, Grooming, Vaccinations, Vet Visits, Medications, Care Notes)
          if (userPet.careSections && typeof userPet.careSections === 'object') {
            Object.keys(merged[petKey].careSections).forEach(secKey => {
              if (userPet.careSections[secKey] && Array.isArray(userPet.careSections[secKey].items)) {
                // Load exact array of items, preserving additions, edits, and deletions
                merged[petKey].careSections[secKey].items = userPet.careSections[secKey].items;
              }
            });
          }
        }
      });

      return merged;
    } catch (err) {
      console.error('PawPulse: Error loading saved state from localStorage:', err);
      return deepClone(DEFAULT_INITIAL_DATA);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(petData));
      localStorage.setItem(ACTIVE_PET_KEY, currentPet);
    } catch (err) {
      console.error('PawPulse: Unable to save state to localStorage:', err);
    }
  }

  // Initialize application state
  let petData = loadState();

  // Restore active pet safely
  let currentPet = 'cat';
  try {
    const savedPet = localStorage.getItem(ACTIVE_PET_KEY);
    if (savedPet === 'cat' || savedPet === 'dog') {
      currentPet = savedPet;
    }
  } catch (e) {
    currentPet = 'cat';
  }

  let activeReminderId = null;

  // Track accordion open state (default feeding & grooming open)
  const openAccordions = {
    feeding: true,
    grooming: true,
    vaccinations: false,
    vetVisits: false,
    medications: false,
    careNotes: false
  };

  // ==========================================================================
  // 3. Navigation & Screen Switching
  // ==========================================================================
  const screens = {
    'screen-home': document.getElementById('screen-home'),
    'screen-location': document.getElementById('screen-location'),
    'screen-vet': document.getElementById('screen-vet'),
    'screen-rescue': document.getElementById('screen-rescue'),
    'screen-profile': document.getElementById('screen-profile'),
    'screen-records': document.getElementById('screen-records')
  };

  const navButtons = {
    'screen-home': document.getElementById('nav-btn-home'),
    'screen-location': document.getElementById('nav-btn-location'),
    'screen-vet': document.getElementById('nav-btn-vet'),
    'screen-rescue': document.getElementById('nav-btn-rescue')
  };

  const btnPetCard = document.getElementById('home-pet-card');
  const btnBackFromProfile = document.getElementById('btn-back-from-profile');
  const btnGotoRecords = document.getElementById('btn-goto-records');

  function navigateTo(targetScreenId) {
    if (!screens[targetScreenId]) return;

    Object.keys(screens).forEach(id => {
      screens[id].classList.remove('active');
    });

    Object.keys(navButtons).forEach(id => {
      navButtons[id].classList.remove('active');
      navButtons[id].setAttribute('aria-selected', 'false');
    });

    screens[targetScreenId].classList.add('active');
    if (navButtons[targetScreenId]) {
      navButtons[targetScreenId].classList.add('active');
      navButtons[targetScreenId].setAttribute('aria-selected', 'true');
    }

    const mainViewport = document.getElementById('main-content');
    if (mainViewport) {
      mainViewport.scrollTop = 0;
    }
  }

  Object.keys(navButtons).forEach(screenId => {
    const btn = navButtons[screenId];
    if (btn) {
      btn.addEventListener('click', () => navigateTo(screenId));
    }
  });

  if (btnPetCard) {
    btnPetCard.addEventListener('click', () => navigateTo('screen-profile'));
    btnPetCard.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigateTo('screen-profile');
      }
    });
  }

  if (btnBackFromProfile) {
    btnBackFromProfile.addEventListener('click', () => navigateTo('screen-home'));
  }

  if (btnGotoRecords) {
    btnGotoRecords.addEventListener('click', () => navigateTo('screen-records'));
  }

  // Helper for source badge HTML (Requirement 4)
  function renderSourceBadge(isUserCreated) {
    if (isUserCreated) {
      return '<span class="badge-source badge-user">✏️ User Added</span>';
    }
    return '<span class="badge-source badge-demo">🧪 Sample Demo</span>';
  }

  // ==========================================================================
  // 4. Render Routine Care Reminders (Requirement 1)
  // ==========================================================================
  const remindersContainer = document.getElementById('reminders-container');

  function renderReminders() {
    if (!remindersContainer) return;
    const reminders = petData[currentPet].reminders;

    if (!reminders || reminders.length === 0) {
      remindersContainer.innerHTML = `
        <div class="card" style="text-align: center; color: var(--color-text-muted); padding: 24px;">
          <p>No reminders logged. Tap <strong>+ Add Reminder</strong> above to create one.</p>
        </div>
      `;
      return;
    }

    remindersContainer.innerHTML = reminders.map(rem => {
      const catConfig = categoryIcons[rem.category] || categoryIcons.general;
      const isCompleted = rem.status === 'completed';
      const statusPill = isCompleted
        ? '<span class="status-pill status-completed">✓ Completed</span>'
        : '<span class="status-pill status-upcoming">Upcoming</span>';

      return `
        <article class="reminder-card ${isCompleted ? 'completed' : ''}" 
                 data-reminder-id="${rem.id}" 
                 tabindex="0" 
                 role="button" 
                 aria-label="View reminder details for ${rem.title}">
          <div class="reminder-badge ${catConfig.badgeClass}">
            ${catConfig.icon}
          </div>
          <div class="reminder-body">
            <div class="reminder-header-row">
              ${renderSourceBadge(rem.isUserCreated)}
              ${statusPill}
            </div>
            <h3 class="reminder-title">${rem.title}</h3>
            <p class="reminder-date">${rem.date}</p>
          </div>
          <div class="reminder-card-action">
            <div class="reminder-indicator-btn" aria-hidden="true">
              ${isCompleted ? '✓' : '→'}
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click listeners to cards
    remindersContainer.querySelectorAll('.reminder-card').forEach(card => {
      card.addEventListener('click', () => {
        const remId = card.getAttribute('data-reminder-id');
        openReminderDetail(remId);
      });
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const remId = card.getAttribute('data-reminder-id');
          openReminderDetail(remId);
        }
      });
    });
  }

  // ==========================================================================
  // 5. Reminder Detail Modal (Status toggle, Edit, Delete)
  // ==========================================================================
  const modalRemDetail = document.getElementById('modal-reminder-detail');
  const btnCloseRemDetail = document.getElementById('btn-close-rem-detail');
  const modalRemIcon = document.getElementById('modal-rem-icon');
  const modalRemTitle = document.getElementById('modal-rem-title');
  const modalRemDate = document.getElementById('modal-rem-date');
  const modalRemDesc = document.getElementById('modal-rem-desc');
  const modalRemSourceBadge = document.getElementById('modal-rem-source-badge');
  const modalRemStatusPill = document.getElementById('modal-rem-status-pill');
  const btnToggleRemStatus = document.getElementById('btn-toggle-rem-status');
  const btnToggleRemStatusText = document.getElementById('btn-toggle-rem-status-text');
  const btnEditReminder = document.getElementById('btn-edit-reminder');
  const btnDeleteReminder = document.getElementById('btn-delete-reminder');

  function openReminderDetail(reminderId) {
    const reminder = petData[currentPet].reminders.find(r => r.id === reminderId);
    if (!reminder) return;

    activeReminderId = reminderId;
    const catConfig = categoryIcons[reminder.category] || categoryIcons.general;
    const isCompleted = reminder.status === 'completed';

    modalRemIcon.textContent = catConfig.icon;
    modalRemTitle.textContent = reminder.title;
    modalRemDate.textContent = reminder.date;
    modalRemDesc.textContent = reminder.description || 'No additional instructions provided.';

    if (reminder.isUserCreated) {
      modalRemSourceBadge.className = 'badge-source badge-user';
      modalRemSourceBadge.innerHTML = '✏️ User Added';
    } else {
      modalRemSourceBadge.className = 'badge-source badge-demo';
      modalRemSourceBadge.innerHTML = '🧪 Sample Demo';
    }

    if (isCompleted) {
      modalRemStatusPill.className = 'status-pill status-completed';
      modalRemStatusPill.textContent = '✓ Completed';
      btnToggleRemStatus.className = 'btn btn-tertiary';
      btnToggleRemStatusText.textContent = '↺ Mark as Incomplete';
    } else {
      modalRemStatusPill.className = 'status-pill status-upcoming';
      modalRemStatusPill.textContent = 'Upcoming';
      btnToggleRemStatus.className = 'btn btn-action-complete';
      btnToggleRemStatusText.textContent = '✓ Mark as Completed';
    }

    modalRemDetail.hidden = false;
  }

  function closeReminderDetail() {
    modalRemDetail.hidden = true;
    activeReminderId = null;
  }

  if (btnCloseRemDetail) {
    btnCloseRemDetail.addEventListener('click', closeReminderDetail);
  }

  if (btnToggleRemStatus) {
    btnToggleRemStatus.addEventListener('click', () => {
      if (!activeReminderId) return;
      const reminder = petData[currentPet].reminders.find(r => r.id === activeReminderId);
      if (!reminder) return;

      reminder.status = reminder.status === 'completed' ? 'pending' : 'completed';
      saveState(); // Persist completion toggle
      renderReminders();
      openReminderDetail(activeReminderId);
    });
  }

  if (btnDeleteReminder) {
    btnDeleteReminder.addEventListener('click', () => {
      if (!activeReminderId) return;
      if (confirm('Delete this reminder?')) {
        petData[currentPet].reminders = petData[currentPet].reminders.filter(r => r.id !== activeReminderId);
        saveState(); // Persist deletion (ensures it does not reappear on refresh)
        renderReminders();
        closeReminderDetail();
      }
    });
  }

  // ==========================================================================
  // 6. Add / Edit Reminder Form Modal
  // ==========================================================================
  const modalRemForm = document.getElementById('modal-reminder-form');
  const btnOpenAddReminder = document.getElementById('btn-open-add-reminder');
  const btnCloseRemForm = document.getElementById('btn-close-rem-form');
  const btnCancelRemForm = document.getElementById('btn-cancel-rem-form');
  const formReminder = document.getElementById('form-reminder');
  const remFormTitleHeader = document.getElementById('modal-rem-form-title');
  const remFormId = document.getElementById('rem-form-id');
  const remFormTitle = document.getElementById('rem-form-title');
  const remFormDate = document.getElementById('rem-form-date');
  const remFormCategory = document.getElementById('rem-form-category');
  const remFormDesc = document.getElementById('rem-form-desc');

  function openReminderForm(reminderToEdit = null) {
    formReminder.reset();

    if (reminderToEdit) {
      remFormTitleHeader.textContent = 'Edit Reminder';
      remFormId.value = reminderToEdit.id;
      remFormTitle.value = reminderToEdit.title;
      remFormDate.value = reminderToEdit.date;
      remFormCategory.value = reminderToEdit.category || 'vet';
      remFormDesc.value = reminderToEdit.description || '';
    } else {
      remFormTitleHeader.textContent = 'Add Custom Reminder';
      remFormId.value = '';
    }

    modalRemForm.hidden = false;
    remFormTitle.focus();
  }

  function closeReminderForm() {
    modalRemForm.hidden = true;
    formReminder.reset();
  }

  if (btnOpenAddReminder) {
    btnOpenAddReminder.addEventListener('click', () => openReminderForm(null));
  }
  if (btnCloseRemForm) {
    btnCloseRemForm.addEventListener('click', closeReminderForm);
  }
  if (btnCancelRemForm) {
    btnCancelRemForm.addEventListener('click', closeReminderForm);
  }

  if (btnEditReminder) {
    btnEditReminder.addEventListener('click', () => {
      if (!activeReminderId) return;
      const reminder = petData[currentPet].reminders.find(r => r.id === activeReminderId);
      if (reminder) {
        closeReminderDetail();
        openReminderForm(reminder);
      }
    });
  }

  if (formReminder) {
    formReminder.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = remFormId.value;
      const title = remFormTitle.value.trim();
      const date = remFormDate.value.trim();
      const category = remFormCategory.value;
      const desc = remFormDesc.value.trim();

      if (!title || !date) return;

      if (id) {
        // Edit existing
        const reminder = petData[currentPet].reminders.find(r => r.id === id);
        if (reminder) {
          reminder.title = title;
          reminder.date = date;
          reminder.category = category;
          reminder.description = desc;
        }
      } else {
        // Create new
        const newReminder = {
          id: 'rem-user-' + Date.now(),
          title: title,
          date: date,
          category: category,
          description: desc,
          status: 'pending',
          isUserCreated: true
        };
        petData[currentPet].reminders.unshift(newReminder);
      }

      saveState(); // Persist addition / edit
      renderReminders();
      closeReminderForm();
    });
  }

  // ==========================================================================
  // 7. Interactive Pet Care Information Sections (Requirement 2 & 3)
  // ==========================================================================
  const careSectionsContainer = document.getElementById('care-sections-container');

  function renderCareSections() {
    if (!careSectionsContainer) return;
    const careData = petData[currentPet].careSections;

    careSectionsContainer.innerHTML = Object.keys(careData).map(sectionKey => {
      const section = careData[sectionKey];
      const isOpen = !!openAccordions[sectionKey];
      const count = section.items ? section.items.length : 0;

      const itemsHtml = section.items && section.items.length > 0
        ? section.items.map(item => `
            <div class="care-entry-card" data-item-id="${item.id}">
              <div class="care-entry-header">
                <span class="care-entry-title">${item.title}</span>
                <div class="care-entry-actions">
                  ${renderSourceBadge(item.isUserCreated)}
                  <button type="button" class="btn-icon-sm btn-edit-care" data-section="${sectionKey}" data-item-id="${item.id}" aria-label="Edit item">✏️</button>
                  <button type="button" class="btn-icon-sm btn-delete-care" data-section="${sectionKey}" data-item-id="${item.id}" aria-label="Delete item">🗑️</button>
                </div>
              </div>
              <p class="care-entry-desc">${item.details}</p>
            </div>
          `).join('')
        : '<p style="font-size: 0.78rem; color: var(--color-text-subtle); font-style: italic; margin-top: 4px;">No entries logged yet.</p>';

      return `
        <div class="care-accordion-item ${isOpen ? 'open' : ''}" id="care-acc-${sectionKey}">
          <button type="button" class="care-accordion-header" data-section="${sectionKey}" aria-expanded="${isOpen}">
            <div class="care-header-left">
              <span class="care-header-icon">${section.icon}</span>
              <span class="care-header-title">${section.title}</span>
            </div>
            <div class="care-header-right">
              <span class="care-count-badge">${count} item${count === 1 ? '' : 's'}</span>
              <span class="care-chevron" aria-hidden="true">▼</span>
            </div>
          </button>
          <div class="care-accordion-body">
            <div class="care-entries-container">
              ${itemsHtml}
            </div>
            <button type="button" class="btn-add-care-entry" data-section="${sectionKey}">
              <span>+ Add ${section.title.slice(0, -1) || 'Entry'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Accordion Toggle Handlers
    careSectionsContainer.querySelectorAll('.care-accordion-header').forEach(header => {
      header.addEventListener('click', () => {
        const sectionKey = header.getAttribute('data-section');
        openAccordions[sectionKey] = !openAccordions[sectionKey];
        renderCareSections();
      });
    });

    // Add Care Entry
    careSectionsContainer.querySelectorAll('.btn-add-care-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sectionKey = btn.getAttribute('data-section');
        openCareForm(sectionKey, null);
      });
    });

    // Edit Care Entry
    careSectionsContainer.querySelectorAll('.btn-edit-care').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sectionKey = btn.getAttribute('data-section');
        const itemId = btn.getAttribute('data-item-id');
        const item = petData[currentPet].careSections[sectionKey].items.find(i => i.id === itemId);
        if (item) {
          openCareForm(sectionKey, item);
        }
      });
    });

    // Delete Care Entry
    careSectionsContainer.querySelectorAll('.btn-delete-care').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sectionKey = btn.getAttribute('data-section');
        const itemId = btn.getAttribute('data-item-id');
        if (confirm('Delete this care record?')) {
          petData[currentPet].careSections[sectionKey].items = 
            petData[currentPet].careSections[sectionKey].items.filter(i => i.id !== itemId);
          saveState(); // Persist deletion (deleted items do not reappear on refresh)
          renderCareSections();
        }
      });
    });
  }

  // ==========================================================================
  // 8. Add / Edit Pet Care Modal Form
  // ==========================================================================
  const modalCareForm = document.getElementById('modal-care-form');
  const btnCloseCareForm = document.getElementById('btn-close-care-form');
  const btnCancelCareForm = document.getElementById('btn-cancel-care-form');
  const formCareEntry = document.getElementById('form-care-entry');
  const careFormCategoryLabel = document.getElementById('care-form-category-label');
  const careFormTitleHeader = document.getElementById('modal-care-form-title');
  const careFormSectionKey = document.getElementById('care-form-section-key');
  const careFormItemId = document.getElementById('care-form-item-id');
  const careFormTitle = document.getElementById('care-form-title');
  const careFormDetails = document.getElementById('care-form-details');

  function openCareForm(sectionKey, itemToEdit = null) {
    formCareEntry.reset();
    const section = petData[currentPet].careSections[sectionKey];
    if (!section) return;

    careFormSectionKey.value = sectionKey;
    careFormCategoryLabel.textContent = `${section.icon} ${section.title}`;

    if (itemToEdit) {
      careFormTitleHeader.textContent = 'Edit Care Entry';
      careFormItemId.value = itemToEdit.id;
      careFormTitle.value = itemToEdit.title;
      careFormDetails.value = itemToEdit.details;
    } else {
      careFormTitleHeader.textContent = `Add to ${section.title}`;
      careFormItemId.value = '';
    }

    modalCareForm.hidden = false;
    careFormTitle.focus();
  }

  function closeCareForm() {
    modalCareForm.hidden = true;
    formCareEntry.reset();
  }

  if (btnCloseCareForm) btnCloseCareForm.addEventListener('click', closeCareForm);
  if (btnCancelCareForm) btnCancelCareForm.addEventListener('click', closeCareForm);

  if (formCareEntry) {
    formCareEntry.addEventListener('submit', (e) => {
      e.preventDefault();
      const sectionKey = careFormSectionKey.value;
      const itemId = careFormItemId.value;
      const title = careFormTitle.value.trim();
      const details = careFormDetails.value.trim();

      if (!title || !details || !sectionKey) return;

      const section = petData[currentPet].careSections[sectionKey];
      if (!section) return;

      if (itemId) {
        // Edit existing item
        const item = section.items.find(i => i.id === itemId);
        if (item) {
          item.title = title;
          item.details = details;
        }
      } else {
        // Create new item
        const newItem = {
          id: 'care-user-' + Date.now(),
          title: title,
          details: details,
          isUserCreated: true
        };
        section.items.push(newItem);
        openAccordions[sectionKey] = true;
      }

      saveState(); // Persist care entry addition / edit (feeding, grooming, hydration, etc.)
      renderCareSections();
      closeCareForm();
    });
  }

  // ==========================================================================
  // 9. Edit Pet Profile Modal Form (Requirement 2)
  // ==========================================================================
  const modalProfileForm = document.getElementById('modal-profile-form');
  const btnOpenEditProfile = document.getElementById('btn-open-edit-profile');
  const btnCloseProfForm = document.getElementById('btn-close-prof-form');
  const btnCancelProfForm = document.getElementById('btn-cancel-prof-form');
  const formProfile = document.getElementById('form-profile');
  const profFormName = document.getElementById('prof-form-name');
  const profFormBreed = document.getElementById('prof-form-breed');
  const profFormAge = document.getElementById('prof-form-age');
  const profFormWeight = document.getElementById('prof-form-weight');
  const profFormColor = document.getElementById('prof-form-color');

  function openProfileForm() {
    if (!modalProfileForm) return;
    const pet = petData[currentPet];

    profFormName.value = pet.name || '';
    profFormBreed.value = pet.profileBreed || pet.breed || '';
    profFormAge.value = pet.age || '';
    profFormWeight.value = pet.weight || '';
    profFormColor.value = pet.color || '';

    modalProfileForm.hidden = false;
    profFormName.focus();
  }

  function closeProfileForm() {
    if (modalProfileForm) modalProfileForm.hidden = true;
    if (formProfile) formProfile.reset();
  }

  if (btnOpenEditProfile) {
    btnOpenEditProfile.addEventListener('click', openProfileForm);
  }
  if (btnCloseProfForm) {
    btnCloseProfForm.addEventListener('click', closeProfileForm);
  }
  if (btnCancelProfForm) {
    btnCancelProfForm.addEventListener('click', closeProfileForm);
  }

  if (formProfile) {
    formProfile.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = profFormName.value.trim();
      const breed = profFormBreed.value.trim();
      const age = profFormAge.value.trim();
      const weight = profFormWeight.value.trim();
      const color = profFormColor.value.trim();

      if (!name || !breed || !age || !weight) return;

      const pet = petData[currentPet];
      pet.name = name;
      pet.profileBreed = breed;
      pet.breed = `${breed} • ${age} Old`;
      pet.age = age;
      pet.weight = weight;
      if (color) pet.color = color;

      saveState(); // Persist pet profile changes (Requirement 2)
      renderPetData(currentPet);
      closeProfileForm();
    });
  }

  // ==========================================================================
  // 10. Reset to Initial Demo Data Control (Requirement 6 & 8)
  // ==========================================================================
  const btnResetData = document.getElementById('btn-reset-data');
  if (btnResetData) {
    btnResetData.addEventListener('click', () => {
      if (confirm('Reset PawPulse to the initial demo state? This will clear all custom additions and edits.')) {
        try {
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(ACTIVE_PET_KEY);
        } catch (e) {
          console.warn('PawPulse: Error clearing localStorage', e);
        }
        petData = deepClone(DEFAULT_INITIAL_DATA);
        currentPet = 'cat';
        renderPetData('cat');
      }
    });
  }

  // ==========================================================================
  // 11. Stage 1 New Modals & Platform Controllers
  // ==========================================================================
  // Smart Collar Device Manager Modal
  const modalDeviceManager = document.getElementById('modal-device-manager');
  const btnOpenCollarModal = document.getElementById('btn-open-collar-modal');
  const btnCloseDeviceModal = document.getElementById('btn-close-device-modal');
  const btnCloseCollarDialog = document.getElementById('btn-close-collar-dialog');
  const btnToggleCollarConn = document.getElementById('btn-toggle-collar-connection');
  const collarStatusDot = document.getElementById('collar-status-dot');
  const collarStatusText = document.getElementById('collar-status-text');
  const collarBatteryPill = document.getElementById('collar-battery-pill');
  const collarSyncText = document.getElementById('collar-sync-text');
  const devModalState = document.getElementById('dev-modal-state');
  const btnCollarConnText = document.getElementById('btn-collar-conn-text');

  let isCollarSimConnected = false;

  function updateCollarHUD(connected) {
    isCollarSimConnected = connected;
    if (connected) {
      if (collarStatusDot) collarStatusDot.className = 'hud-status-dot connected';
      if (collarStatusText) collarStatusText.textContent = 'Demo Collar: Connected';
      if (collarBatteryPill) collarBatteryPill.textContent = '🔋 88% (Demo)';
      if (collarSyncText) collarSyncText.textContent = 'Sync: Active Stream';
      if (devModalState) devModalState.textContent = 'Status: Connected (Simulation Mode)';
      if (btnCollarConnText) btnCollarConnText.textContent = 'Disconnect Demo Collar';
    } else {
      if (collarStatusDot) collarStatusDot.className = 'hud-status-dot disconnected';
      if (collarStatusText) collarStatusText.textContent = 'Demo Collar: Disconnected';
      if (collarBatteryPill) collarBatteryPill.textContent = '🔋 --% (Demo)';
      if (collarSyncText) collarSyncText.textContent = 'Sync: Standby';
      if (devModalState) devModalState.textContent = 'Status: Disconnected (Demo Mode)';
      if (btnCollarConnText) btnCollarConnText.textContent = 'Connect Demo Collar';
    }
  }

  if (btnOpenCollarModal) {
    btnOpenCollarModal.addEventListener('click', () => {
      if (modalDeviceManager) modalDeviceManager.hidden = false;
    });
  }

  function closeCollarModal() {
    if (modalDeviceManager) modalDeviceManager.hidden = true;
  }
  if (btnCloseDeviceModal) btnCloseDeviceModal.addEventListener('click', closeCollarModal);
  if (btnCloseCollarDialog) btnCloseCollarDialog.addEventListener('click', closeCollarModal);

  if (btnToggleCollarConn) {
    btnToggleCollarConn.addEventListener('click', () => {
      updateCollarHUD(!isCollarSimConnected);
    });
  }

  // Find My Pet – Lost Pet Mode Toggle
  const btnToggleLostMode = document.getElementById('btn-toggle-lost-mode');
  const btnLostModeText = document.getElementById('btn-lost-mode-text');
  let isLostModeActive = false;

  if (btnToggleLostMode) {
    btnToggleLostMode.addEventListener('click', () => {
      isLostModeActive = !isLostModeActive;
      if (isLostModeActive) {
        btnLostModeText.textContent = '🚨 Deactivate Lost Pet Mode (Demo)';
        btnToggleLostMode.style.backgroundColor = '#9F1239';
        alert('Simulated Lost Pet Mode Activated: Collar high-frequency beacon simulation initiated. Emergency contact broadcast simulated.');
      } else {
        btnLostModeText.textContent = '🚨 Activate Lost Pet Mode (Demo)';
        btnToggleLostMode.style.backgroundColor = '';
        alert('Simulated Lost Pet Mode Deactivated.');
      }
    });
  }

  // Emergency Vet – Video Consultation Stub Modal
  const modalVetConsult = document.getElementById('modal-vet-consult');
  const btnOpenVideoConsult = document.getElementById('btn-open-video-consult');
  const btnCloseVetConsult = document.getElementById('btn-close-vet-consult');
  const btnEndVideoConsult = document.getElementById('btn-end-video-consult');

  if (btnOpenVideoConsult) {
    btnOpenVideoConsult.addEventListener('click', () => {
      if (modalVetConsult) modalVetConsult.hidden = false;
    });
  }
  function closeVetConsult() {
    if (modalVetConsult) modalVetConsult.hidden = true;
  }
  if (btnCloseVetConsult) btnCloseVetConsult.addEventListener('click', closeVetConsult);
  if (btnEndVideoConsult) btnEndVideoConsult.addEventListener('click', closeVetConsult);

  // Animal Rescue – Incident Report Modal & Temporary Photo Preview
  const modalRescueReport = document.getElementById('modal-rescue-report');
  const btnOpenRescueModal = document.getElementById('btn-open-rescue-modal');
  const btnCloseRescueModal = document.getElementById('btn-close-rescue-modal');
  const btnCancelRescue = document.getElementById('btn-cancel-rescue');
  const formRescueReport = document.getElementById('form-rescue-report');
  const rescuePhotoInput = document.getElementById('rescue-photo-input');
  const rescuePhotoPreviewBox = document.getElementById('rescue-photo-preview-box');
  const rescuePhotoPreview = document.getElementById('rescue-photo-preview');
  const btnRemovePhoto = document.getElementById('btn-remove-photo');
  const btnCaptureLocation = document.getElementById('btn-capture-location');
  const rescueLocationInput = document.getElementById('rescue-location-input');
  const rescueGpsHint = document.getElementById('rescue-gps-hint');
  const rescueReportsList = document.getElementById('rescue-reports-list');

  let temporaryPhotoObjectUrl = null;
  let activeRescueReports = [
    {
      id: 'rescue-demo-1',
      type: 'Injured Animal',
      animalDesc: 'Small terrier mix, limping near curb',
      location: 'Oakridge Park Gate 3 (Demo Area)',
      status: 'triaged', // 'submitted' | 'triaged' | 'dispatched' | 'resolved'
      timestamp: 'Today, 2:15 PM (Demo)'
    }
  ];

  function renderRescueReports() {
    if (!rescueReportsList) return;
    if (activeRescueReports.length === 0) {
      rescueReportsList.innerHTML = `
        <div class="card empty-state-card" style="padding: 16px;">
          <p style="font-size: 0.8rem; color: var(--color-text-muted);">No active rescue incident reports logged. Use the button above to report an animal in distress.</p>
        </div>
      `;
      return;
    }

    rescueReportsList.innerHTML = activeRescueReports.map(rep => {
      const steps = ['submitted', 'triaged', 'dispatched', 'resolved'];
      const currentIndex = steps.indexOf(rep.status);

      return `
        <article class="card" style="margin-bottom: 12px; padding: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span class="badge-source badge-demo">${rep.type}</span>
            <span style="font-size: 0.7rem; color: var(--color-text-muted);">${rep.timestamp}</span>
          </div>
          <h4 style="font-size: 0.9rem; font-weight: 800; color: var(--color-text-main); margin-bottom: 2px;">${rep.animalDesc}</h4>
          <p style="font-size: 0.78rem; color: var(--color-text-muted); margin-bottom: 10px;">📍 ${rep.location}</p>
          
          <div style="display: flex; justify-content: space-between; gap: 4px; background: var(--color-surface-soft); padding: 8px 10px; border-radius: var(--radius-sm); font-size: 0.68rem; font-weight: 700;">
            <span style="color: ${currentIndex >= 0 ? '#047857' : '#94A3B8'};">1. Submitted ✓</span>
            <span style="color: ${currentIndex >= 1 ? '#047857' : '#94A3B8'};">2. Triaged ${currentIndex >= 1 ? '✓' : '○'}</span>
            <span style="color: ${currentIndex >= 2 ? '#047857' : '#94A3B8'};">3. Dispatched ${currentIndex >= 2 ? '✓' : '○'}</span>
            <span style="color: ${currentIndex >= 3 ? '#047857' : '#94A3B8'};">4. Resolved ${currentIndex >= 3 ? '✓' : '○'}</span>
          </div>
        </article>
      `;
    }).join('');
  }

  if (btnOpenRescueModal) {
    btnOpenRescueModal.addEventListener('click', () => {
      if (modalRescueReport) modalRescueReport.hidden = false;
    });
  }

  function closeRescueModal() {
    if (modalRescueReport) modalRescueReport.hidden = true;
    if (formRescueReport) formRescueReport.reset();
    if (temporaryPhotoObjectUrl) {
      URL.revokeObjectURL(temporaryPhotoObjectUrl);
      temporaryPhotoObjectUrl = null;
    }
    if (rescuePhotoPreviewBox) rescuePhotoPreviewBox.hidden = true;
  }

  if (btnCloseRescueModal) btnCloseRescueModal.addEventListener('click', closeRescueModal);
  if (btnCancelRescue) btnCancelRescue.addEventListener('click', closeRescueModal);

  // Temporary Photo Preview Handler (Constraint 7: Object URL only, zero localStorage base64 bloat)
  if (rescuePhotoInput) {
    rescuePhotoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (temporaryPhotoObjectUrl) URL.revokeObjectURL(temporaryPhotoObjectUrl);
        temporaryPhotoObjectUrl = URL.createObjectURL(file);
        if (rescuePhotoPreview) rescuePhotoPreview.src = temporaryPhotoObjectUrl;
        if (rescuePhotoPreviewBox) rescuePhotoPreviewBox.hidden = false;
      }
    });
  }

  if (btnRemovePhoto) {
    btnRemovePhoto.addEventListener('click', () => {
      if (temporaryPhotoObjectUrl) URL.revokeObjectURL(temporaryPhotoObjectUrl);
      temporaryPhotoObjectUrl = null;
      if (rescuePhotoInput) rescuePhotoInput.value = '';
      if (rescuePhotoPreviewBox) rescuePhotoPreviewBox.hidden = true;
    });
  }

  // Location Capture Handler
  if (btnCaptureLocation) {
    btnCaptureLocation.addEventListener('click', () => {
      if (navigator.geolocation) {
        if (rescueGpsHint) rescueGpsHint.textContent = 'Requesting device coordinates...';
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const coords = `${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° W (Device GPS)`;
            if (rescueLocationInput) rescueLocationInput.value = coords;
            if (rescueGpsHint) rescueGpsHint.textContent = 'Captured coordinates via device Geolocation.';
          },
          (err) => {
            if (rescueLocationInput) rescueLocationInput.value = '37.7749° N, 122.4194° W (Demo Coordinates)';
            if (rescueGpsHint) rescueGpsHint.textContent = 'Location set to demo coordinates (Permission unavailable).';
          },
          { timeout: 8000 }
        );
      } else {
        if (rescueLocationInput) rescueLocationInput.value = '37.7749° N, 122.4194° W (Demo Coordinates)';
      }
    });
  }

  if (formRescueReport) {
    formRescueReport.addEventListener('submit', (e) => {
      e.preventDefault();
      const typeSelect = document.getElementById('rescue-incident-type');
      const descInput = document.getElementById('rescue-animal-desc');
      const locInput = document.getElementById('rescue-location-input');

      const newReport = {
        id: 'rescue-' + Date.now(),
        type: typeSelect ? typeSelect.options[typeSelect.selectedIndex].text : 'Animal Incident',
        animalDesc: descInput ? descInput.value.trim() : 'Unspecified animal',
        location: locInput ? locInput.value.trim() : 'Unknown location',
        status: 'submitted',
        timestamp: 'Just now (Demo Report)'
      };

      activeRescueReports.unshift(newReport);
      renderRescueReports();
      closeRescueModal();
      alert('Rescue incident report submitted in demonstration mode. Status tracking updated below.');
    });
  }

  // Initial render of rescue reports
  renderRescueReports();

  // ==========================================================================
  // 12. Global Modal Overlay Dismissal (Backdrop Click & ESC Key)
  // ==========================================================================
  [
    modalRemDetail, 
    modalRemForm, 
    modalCareForm, 
    modalProfileForm, 
    modalDeviceManager, 
    modalRescueReport, 
    modalVetConsult
  ].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.hidden = true;
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [
        modalRemDetail, 
        modalRemForm, 
        modalCareForm, 
        modalProfileForm, 
        modalDeviceManager, 
        modalRescueReport, 
        modalVetConsult
      ].forEach(m => {
        if (m && !m.hidden) m.hidden = true;
      });
    }
  });

  // ==========================================================================
  // 13. Pet Switcher Function (Cat & Dog Support)
  // ==========================================================================
  const btnCat = document.getElementById('btn-pet-cat');
  const btnDog = document.getElementById('btn-pet-dog');

  function renderPetData(petKey) {
    currentPet = petKey;
    saveState(); // Persist active pet selection
    const data = petData[petKey];
    if (!data) return;

    // Update active pill button
    if (btnCat && btnDog) {
      btnCat.classList.toggle('active', petKey === 'cat');
      btnDog.classList.toggle('active', petKey === 'dog');
    }

    // Update Home Screen Hero & Vitals
    const homeAvatar = document.getElementById('home-pet-avatar');
    const homeName = document.getElementById('home-pet-name');
    const homeSpecies = document.getElementById('home-pet-species');
    const homeBreed = document.getElementById('home-pet-breed');
    const metricHr = document.getElementById('metric-heart-rate');
    const metricAct = document.getElementById('metric-activity');
    const metricSleep = document.getElementById('metric-sleep');

    if (homeAvatar) homeAvatar.textContent = data.avatar;
    if (homeName) homeName.textContent = data.name;
    if (homeSpecies) homeSpecies.textContent = data.species;
    if (homeBreed) homeBreed.textContent = data.breed;
    if (metricHr) metricHr.textContent = data.metrics.heartRate;
    if (metricAct) metricAct.textContent = data.metrics.activity;
    if (metricSleep) metricSleep.textContent = data.metrics.sleep;

    // Update Profile Screen Details
    const profAvatar = document.getElementById('profile-avatar');
    const profName = document.getElementById('profile-name');
    const profBreed = document.getElementById('profile-breed');
    const profDemoId = document.getElementById('profile-demo-id');
    const profAge = document.getElementById('profile-age');
    const profWeight = document.getElementById('profile-weight');
    const profSpecies = document.getElementById('profile-species');
    const profColor = document.getElementById('profile-color');

    if (profAvatar) profAvatar.textContent = data.avatar;
    if (profName) profName.textContent = data.name;
    if (profBreed) profBreed.textContent = data.profileBreed;
    if (profDemoId) profDemoId.textContent = data.demoId;
    if (profAge) profAge.textContent = data.age;
    if (profWeight) profWeight.textContent = data.weight;
    if (profSpecies) profSpecies.textContent = data.speciesDetail;
    if (profColor) profColor.textContent = data.color;

    // Render Dynamic Components
    renderReminders();
    renderCareSections();

    // Render Medical History List
    const historyContainer = document.getElementById('profile-history-list');
    if (historyContainer) {
      historyContainer.innerHTML = data.history.map(item => `
        <article class="history-item">
          <div class="history-item-header">
            <span class="history-year">${item.year}</span>
            <span class="badge-fictional">Fictional Demonstration Record</span>
          </div>
          <h3 class="history-event-title">${item.title}</h3>
          <p class="history-desc">${item.desc}</p>
        </article>
      `).join('');
    }

    // Render Health Records Screen
    const recHr = document.getElementById('rec-hr');
    const recWeight = document.getElementById('rec-weight');
    if (recHr) recHr.textContent = data.readings.hr;
    if (recWeight) recWeight.textContent = data.readings.weight;

    const obsContainer = document.getElementById('records-observations-list');
    if (obsContainer) {
      obsContainer.innerHTML = data.observations.map(obs => `
        <article class="card observation-card">
          <div class="obs-header">
            <span class="obs-date">${obs.date}</span>
            <span class="obs-tag">Demonstration Observation</span>
          </div>
          <p class="obs-text">${obs.text}</p>
        </article>
      `).join('');
    }

    // Update Stage 1 Find My Pet Map Marker
    const mapPetAvatar = document.getElementById('map-pet-avatar');
    const mapPetName = document.getElementById('map-pet-name');
    if (mapPetAvatar) mapPetAvatar.textContent = data.avatar;
    if (mapPetName) mapPetName.textContent = data.name;

    // Update Stage 1 Emergency Vet Medical Passport
    const passAvatar = document.getElementById('pass-avatar');
    const passName = document.getElementById('pass-name');
    const passBreed = document.getElementById('pass-breed');
    const passVitals = document.getElementById('pass-vitals');
    if (passAvatar) passAvatar.textContent = data.avatar;
    if (passName) passName.textContent = data.name;
    if (passBreed) passBreed.textContent = `${data.profileBreed || data.breed} • ${data.age} • ${data.weight}`;
    if (passVitals) passVitals.textContent = `${data.metrics.heartRate} bpm (Simulated Value)`;
  }

  if (btnCat) {
    btnCat.addEventListener('click', () => renderPetData('cat'));
  }
  if (btnDog) {
    btnDog.addEventListener('click', () => renderPetData('dog'));
  }

  // Initial render with loaded data
  renderPetData(currentPet);
});
