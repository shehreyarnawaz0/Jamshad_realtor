/**
 * REALTOR JAMSHED - JAMSHED AFZAL (10+ YEARS EXPERIENCE)
 * Core Interactions, ROI Calculator & Lead Submission
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Current Year in Footer
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Menu Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileBackdrop = document.getElementById('mobileMenuBackdrop');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('open');
    if (mobileBackdrop) mobileBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (mobileBackdrop) mobileBackdrop.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (closeMenu) closeMenu.addEventListener('click', closeMobileMenu);
  if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // 3. Header Scroll Effect & Active Nav Link Highlighting
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 40) {
        navbar.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      } else {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
        navbar.style.background = 'rgba(255, 255, 255, 0.97)';
      }
    }

    // Active Section Detection
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 4. Interactive ROI & Property Growth Calculator
  const investmentAmount = document.getElementById('investmentAmount');
  const holdingPeriod = document.getElementById('holdingPeriod');
  const expectedAppreciation = document.getElementById('expectedAppreciation');
  const rentalYield = document.getElementById('rentalYield');

  const investmentValueDisplay = document.getElementById('investmentValueDisplay');
  const holdingPeriodDisplay = document.getElementById('holdingPeriodDisplay');
  const expectedAppreciationDisplay = document.getElementById('expectedAppreciationDisplay');
  const rentalYieldDisplay = document.getElementById('rentalYieldDisplay');

  const resInitial = document.getElementById('resInitial');
  const resGains = document.getElementById('resGains');
  const resRental = document.getElementById('resRental');
  const resTotal = document.getElementById('resTotal');

  function formatPakistaniCurrency(num) {
    if (num >= 10000000) {
      return (num / 10000000).toFixed(2) + ' Crore';
    } else if (num >= 100000) {
      return (num / 100000).toFixed(2) + ' Lac';
    } else {
      return num.toLocaleString();
    }
  }

  function updateCalculator() {
    if (!investmentAmount) return;

    const principal = parseFloat(investmentAmount.value);
    const years = parseInt(holdingPeriod.value, 10);
    const growthRate = parseFloat(expectedAppreciation.value) / 100;
    const rentRate = parseFloat(rentalYield.value) / 100;

    // Displays
    investmentValueDisplay.textContent = `PKR ${formatPakistaniCurrency(principal)}`;
    holdingPeriodDisplay.textContent = `${years} Year${years > 1 ? 's' : ''}`;
    expectedAppreciationDisplay.textContent = `${expectedAppreciation.value}% per year`;
    rentalYieldDisplay.textContent = `${rentalYield.value}% per year`;

    // Compound Growth Calculation
    const futurePropertyVal = principal * Math.pow(1 + growthRate, years);
    const capitalGains = futurePropertyVal - principal;
    const totalRentalIncome = (principal * rentRate) * years;
    const grandTotal = futurePropertyVal + totalRentalIncome;

    resInitial.textContent = `PKR ${formatPakistaniCurrency(principal)}`;
    resGains.textContent = `+ PKR ${formatPakistaniCurrency(capitalGains)}`;
    resRental.textContent = `+ PKR ${formatPakistaniCurrency(totalRentalIncome)}`;
    resTotal.textContent = `PKR ${formatPakistaniCurrency(grandTotal)}`;
  }

  if (investmentAmount) {
    [investmentAmount, holdingPeriod, expectedAppreciation, rentalYield].forEach(slider => {
      slider.addEventListener('input', updateCalculator);
    });
    updateCalculator(); // Initial calculation run
  }

  // 5. Contact Section Lead Form Submission
  const contactLeadForm = document.getElementById('contactLeadForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');

  if (contactLeadForm) {
    contactLeadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();

      if (!name || !phone) {
        alert('Please provide your name and contact number.');
        return;
      }

      // Show confirmation message
      contactLeadForm.reset();
      if (formSuccessMessage) {
        formSuccessMessage.style.display = 'flex';
        setTimeout(() => {
          formSuccessMessage.style.display = 'none';
        }, 8000);
      }
    });
  }

});
