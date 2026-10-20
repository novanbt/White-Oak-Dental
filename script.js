// White Oak Dental Clinic - Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('translate-x-full');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileMenu() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('translate-x-full');
      document.body.style.overflow = '';
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileMenu);
  }
  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMobileMenu);
  }
  if (drawerOverlay) {
    drawerOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
      closeConfirmationModal();
    }
  });

  // 2. Set min date for appointment booking to today
  const dateInput = document.getElementById('preferred-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
    dateInput.value = today;
  }

  // 3. Treatment "Enquire Now" Click Handlers
  const treatmentLinks = document.querySelectorAll('.enquire-treatment-btn');
  const serviceSelect = document.getElementById('service-required');

  treatmentLinks.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service');
      if (serviceSelect && serviceName) {
        // Find matching option
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value.toLowerCase().includes(serviceName.toLowerCase()) || 
              serviceName.toLowerCase().includes(serviceSelect.options[i].value.toLowerCase())) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      const appointmentSection = document.getElementById('appointment-section');
      if (appointmentSection) {
        appointmentSection.scrollIntoView({ behavior: 'smooth' });
        // Focus on name input
        setTimeout(() => {
          const nameInput = document.getElementById('patient-name');
          if (nameInput) nameInput.focus();
        }, 600);
      }
    });
  });

  // 4. Appointment Form Submission Handler
  const appointmentForm = document.getElementById('dental-appointment-form');
  const confirmationModal = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const whatsappSendBtn = document.getElementById('whatsapp-confirm-btn');

  function closeConfirmationModal() {
    if (confirmationModal) {
      confirmationModal.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeConfirmationModal);
  }

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('patient-name').value.trim();
      const phone = document.getElementById('patient-phone').value.trim();
      const date = document.getElementById('preferred-date').value;
      const slot = document.getElementById('preferred-slot').value;
      const service = document.getElementById('service-required').value;
      const notes = document.getElementById('patient-notes').value.trim();

      // Populate confirmation summary
      const summaryName = document.getElementById('summary-name');
      const summaryPhone = document.getElementById('summary-phone');
      const summaryDate = document.getElementById('summary-date');
      const summarySlot = document.getElementById('summary-slot');
      const summaryService = document.getElementById('summary-service');

      if (summaryName) summaryName.textContent = name;
      if (summaryPhone) summaryPhone.textContent = `+91 ${phone}`;
      if (summaryDate) summaryDate.textContent = date;
      if (summarySlot) summarySlot.textContent = slot;
      if (summaryService) summaryService.textContent = service;

      // Prepare WhatsApp message URL
      const waText = encodeURIComponent(
        `*New Appointment Request - White Oak Dental Clinic*\n\n` +
        `👤 *Patient:* ${name}\n` +
        `📞 *Phone:* +91 ${phone}\n` +
        `🗓 *Date:* ${date}\n` +
        `⏰ *Slot:* ${slot}\n` +
        `🦷 *Service/Concern:* ${service}\n` +
        (notes ? `📝 *Notes/Symptoms:* ${notes}\n\n` : `\n`) +
        `Please confirm my appointment slot. Thank you!`
      );
      const waUrl = `https://wa.me/919999108937?text=${waText}`;

      if (whatsappSendBtn) {
        whatsappSendBtn.setAttribute('href', waUrl);
      }

      // Show modal
      if (confirmationModal) {
        confirmationModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }

      // Also reveal inline alert
      const inlineConfirmation = document.getElementById('booking-confirmation');
      if (inlineConfirmation) {
        inlineConfirmation.classList.remove('hidden');
      }

      appointmentForm.reset();
      if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
      }
    });
  }

  // 5. Scrollspy for Active Desktop Navigation Highlighting
  const sections = document.querySelectorAll('section[id], header[id]');
  const navLinks = document.querySelectorAll('nav a[data-path]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentId}` || (scrollY < 200 && href === '#')) {
        link.classList.add('bg-surface-container', 'text-on-surface', 'font-semibold');
        link.classList.remove('text-on-surface-variant');
      } else {
        link.classList.remove('bg-surface-container', 'text-on-surface', 'font-semibold');
        link.classList.add('text-on-surface-variant');
      }
    });
  });

  // 6. Header Background Elevation on Scroll
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('shadow-md');
    } else {
      header?.classList.remove('shadow-md');
    }
  });
});
