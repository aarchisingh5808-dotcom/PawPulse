/**
 * PawPulse – Pet Health Monitoring Prototype (Version 0 Enhanced)
 * Interactive Reminders, Dynamic Pet Care Sections, and Data Provenance.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. Navigation & Screen Switching
  // ==========================================================================
  const screens = {
    'screen-home': document.getElementById('screen-home'),
    'screen-profile': document.getElementById('screen-profile'),
    'screen-records': document.getElementById('screen-records')
  };

  const navButtons = {
    'screen-home': document.getElementById('nav-btn-home'),
    'screen-profile': document.getElementById('nav-btn-profile'),
    'screen-records': document.getElementById('nav-btn-records')
  };

  const btnPetCard = document.getElementById('home-pet-card');
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

  if (btnGotoRecords) {
    btnGotoRecords.addEventListener('click', () => navigateTo('screen-records'));
  }

  // ==========================================================================
  // 2. Pet Profiles & Interactive In-Memory State
  // ==========================================================================
  const categoryIcons = {
    vet: { icon: '🩺', badgeClass: 'badge-vet', label: 'Vet Visit' },
    grooming: { icon: '🛁', badgeClass: 'badge-grooming', label: 'Grooming' },
    brush: { icon: '✂️', badgeClass: 'badge-brush', label: 'Hygiene' },
    med: { icon: '💊', badgeClass: 'badge-med', label: 'Medication' },
    nutrition: { icon: '🥣', badgeClass: 'badge-nutrition', label: 'Feeding' },
    general: { icon: '🐾', badgeClass: 'badge-general', label: 'General' }
  };

  const petData = {
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
      // Routine Care Reminders (Interactive)
      reminders: [
        {
          id: 'rem-cat-1',
          title: 'Routine Veterinary Wellness Checkup',
          date: 'Next Month (Demo Reminder)',
          category: 'vet',
          description: 'Comprehensive annual wellness inspection including coat check, dental overview, and routine weight check.',
          status: 'pending', // 'pending' | 'completed'
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
      // Pet Care Information: 6 Organized Sections (Interactive)
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

  let currentPet = 'cat';
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

  // Helper for source badge HTML (Requirement 4)
  function renderSourceBadge(isUserCreated) {
    if (isUserCreated) {
      return '<span class="badge-source badge-user">✏️ User Added</span>';
    }
    return '<span class="badge-source badge-demo">🧪 Sample Demo</span>';
  }

  // ==========================================================================
  // 3. Render Routine Care Reminders (Requirement 1 & 2)
  // ==========================================================================
  const remindersContainer = document.getElementById('reminders-container');

  function renderReminders() {
    if (!remindersContainer) return;
    const reminders = petData[currentPet].reminders;

    if (!reminders || reminders.length === 0) {
      remindersContainer.innerHTML = `
        <div class="card" style="text-align: center; color: var(--color-text-muted); padding: 24px;">
          <p>No reminders found. Tap <strong>+ Add Reminder</strong> above to create one.</p>
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
  // 4. Reminder Detail Modal (Requirement 1)
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

    // Source Badge
    if (reminder.isUserCreated) {
      modalRemSourceBadge.className = 'badge-source badge-user';
      modalRemSourceBadge.innerHTML = '✏️ User Added';
    } else {
      modalRemSourceBadge.className = 'badge-source badge-demo';
      modalRemSourceBadge.innerHTML = '🧪 Sample Demo';
    }

    // Status Pill
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
      renderReminders();
      openReminderDetail(activeReminderId); // Refresh modal view
    });
  }

  if (btnDeleteReminder) {
    btnDeleteReminder.addEventListener('click', () => {
      if (!activeReminderId) return;
      if (confirm('Delete this reminder?')) {
        petData[currentPet].reminders = petData[currentPet].reminders.filter(r => r.id !== activeReminderId);
        renderReminders();
        closeReminderDetail();
      }
    });
  }

  // ==========================================================================
  // 5. Add / Edit Reminder Form Modal (Requirement 2)
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
          // Note: If user edits a sample demo reminder, we can keep its provenance or note user edit
        }
      } else {
        // Create new (User Created)
        const newReminder = {
          id: 'rem-user-' + Date.now(),
          title: title,
          date: date,
          category: category,
          description: desc,
          status: 'pending',
          isUserCreated: true // Marked as User Created (Requirement 4)
        };
        petData[currentPet].reminders.unshift(newReminder);
      }

      renderReminders();
      closeReminderForm();
    });
  }

  // ==========================================================================
  // 6. Interactive Pet Care Information Sections (Requirement 3)
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

    // Add Care Entry Button Handlers
    careSectionsContainer.querySelectorAll('.btn-add-care-entry').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sectionKey = btn.getAttribute('data-section');
        openCareForm(sectionKey, null);
      });
    });

    // Edit Care Entry Handlers
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

    // Delete Care Entry Handlers
    careSectionsContainer.querySelectorAll('.btn-delete-care').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const sectionKey = btn.getAttribute('data-section');
        const itemId = btn.getAttribute('data-item-id');
        if (confirm('Delete this care record?')) {
          petData[currentPet].careSections[sectionKey].items = 
            petData[currentPet].careSections[sectionKey].items.filter(i => i.id !== itemId);
          renderCareSections();
        }
      });
    });
  }

  // ==========================================================================
  // 7. Add / Edit Pet Care Modal Form
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
        // Edit existing
        const item = section.items.find(i => i.id === itemId);
        if (item) {
          item.title = title;
          item.details = details;
        }
      } else {
        // Create new item (User Entered)
        const newItem = {
          id: 'care-user-' + Date.now(),
          title: title,
          details: details,
          isUserCreated: true // Marked as User Entered (Requirement 4)
        };
        section.items.push(newItem);
        openAccordions[sectionKey] = true; // Ensure section is open to view new item
      }

      renderCareSections();
      closeCareForm();
    });
  }

  // ==========================================================================
  // 8. Global Modal Overlay Dismissal (Backdrop Click & ESC Key)
  // ==========================================================================
  [modalRemDetail, modalRemForm, modalCareForm].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.hidden = true;
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalRemDetail && !modalRemDetail.hidden) modalRemDetail.hidden = true;
      if (modalRemForm && !modalRemForm.hidden) modalRemForm.hidden = true;
      if (modalCareForm && !modalCareForm.hidden) modalCareForm.hidden = true;
    }
  });

  // ==========================================================================
  // 9. Pet Switcher Function (Cat & Dog Support)
  // ==========================================================================
  const btnCat = document.getElementById('btn-pet-cat');
  const btnDog = document.getElementById('btn-pet-dog');

  function renderPetData(petKey) {
    currentPet = petKey;
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
  }

  if (btnCat) {
    btnCat.addEventListener('click', () => renderPetData('cat'));
  }
  if (btnDog) {
    btnDog.addEventListener('click', () => renderPetData('dog'));
  }

  // Initial render with default sample pet (Cat Luna)
  renderPetData('cat');
});
