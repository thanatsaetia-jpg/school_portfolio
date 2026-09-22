/**
 * Navigation Bar Functionality
 * Student: Thanat Saetia (Year 12)
 * Features: Mobile Menu Toggle, Scroll Elevation, Smooth Anchor Scrolling
 */

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // ==========================================
  // 1. Mobile Hamburger Menu Toggle
  // ==========================================
  const toggleMenu = () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Prevent background body scrolling when menu is active
    document.body.style.overflow = !isExpanded ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggleMenu);

  // Close mobile overlay when clicking links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  });

  // ==========================================
  // 2. Dynamic Navbar Background on Scroll
  // ==========================================
  const handleNavbarScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll);

  // ==========================================
  // 3. Smooth Offset Scrolling for Links
  // ==========================================
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      
      if (targetId.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
          const navbarHeight = header.offsetHeight;
          const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});

// ==========================================
  // 4. Hero Section Entrance Animation
  // ==========================================
  const triggerHeroAnimation = () => {
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent && heroVisual) {
      // Set initial entry state
      heroContent.style.opacity = '0';
      heroContent.style.transform = 'translateY(25px)';
      heroContent.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';

      heroVisual.style.opacity = '0';
      heroVisual.style.transform = 'translateY(35px)';
      heroVisual.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s';

      // Trigger transition frame
      requestAnimationFrame(() => {
        heroContent.style.opacity = '1';
        heroContent.style.transform = 'translateY(0)';
        heroVisual.style.opacity = '1';
        heroVisual.style.transform = 'translateY(0)';
      });
    }
  };

  triggerHeroAnimation();

// ==========================================
  // 5. Scroll Reveal Observer for Sections
  // ==========================================
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // Trigger animation once
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      revealElements.forEach(el => observer.observe(el));
    } else {
      // Immediate fallback for unsupported browsers
      revealElements.forEach(el => el.classList.add('is-visible'));
    }
  };

  initScrollReveal();

  // ==========================================
  // 6. Skill Bars Dynamic Width Animation
  // ==========================================
  const initSkillAnimations = () => {
    // Select all progress bar fills
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    if ('IntersectionObserver' in window) {
      // Create a dedicated observer for the skill panels
      const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Find all bars within the currently intersected panel and animate them
            const barsInPanel = entry.target.querySelectorAll('.skill-bar-fill');
            barsInPanel.forEach(bar => {
              const targetWidth = bar.getAttribute('data-width');
              bar.style.width = targetWidth; // Triggers the CSS transition
            });
            
            // Unobserve the panel once the animation has been triggered
            skillObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.2, // Trigger when 20% of the panel is visible
        rootMargin: '0px'
      });

      // Observe each skill panel individually to trigger animations at the right scroll depth
      const skillPanels = document.querySelectorAll('.skill-panel');
      skillPanels.forEach(panel => skillObserver.observe(panel));
    } else {
      // Fallback for browsers without IntersectionObserver support
      skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width');
        bar.style.width = targetWidth;
      });
    }
  };

  initSkillAnimations();

// ==========================================
  // 7. Project Category Filtering System
  // ==========================================
  const initProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');

          if (filterValue === 'all' || filterValue === cardCategory) {
            // Show the card matching the category
            card.style.display = 'flex';
            
            // Short timeout ensures the display change registers before animating opacity/transform
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            // Trigger exit animation
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            
            // Wait for CSS transition (0.4s) to finish before removing from layout flow
            setTimeout(() => {
              card.style.display = 'none';
            }, 400); 
          }
        });
      });
    });
  };

  initProjectFilters();

// ==========================================
  // 8. Interactive Experience Timeline
  // ==========================================
  const initTimelineInteraction = () => {
    const timelineItems = document.querySelectorAll('.exp-timeline-item');
    
    if ('IntersectionObserver' in window) {
      const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Add 'in-view' class when the timeline item enters the viewport
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          } else {
            // Optional: Remove class if you want the effect to repeat on scroll up/down
            entry.target.classList.remove('in-view');
          }
        });
      }, {
        threshold: 0.5, // Trigger when 50% of the item is visible
        rootMargin: '0px 0px -50px 0px' 
      });

      timelineItems.forEach(item => timelineObserver.observe(item));
    } else {
      // Fallback for older browsers
      timelineItems.forEach(item => item.classList.add('in-view'));
    }
  };

  initTimelineInteraction();

// ==========================================
  // 9. Animated Statistics Counters
  // ==========================================
  const initStatCounters = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    if ('IntersectionObserver' in window && statNumbers.length > 0) {
      const statsSection = document.querySelector('.cert-stats-grid');
      
      const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasCounted) {
            hasCounted = true;
            
            statNumbers.forEach(stat => {
              const target = parseInt(stat.getAttribute('data-target'), 10);
              const duration = 2000; // Animation duration in milliseconds (2 seconds)
              const stepTime = Math.abs(Math.floor(duration / target));
              let current = 0;
              
              const timer = setInterval(() => {
                current += 1;
                stat.textContent = current;
                if (current >= target) {
                  clearInterval(timer);
                  stat.textContent = target + (target >= 120 ? '+' : ''); // Adds '+' suffix formatting for specific counters if needed
                }
              }, Math.max(stepTime, 20)); // Ensures minimum interval threshold
            });
            
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.3 // Trigger when 30% of the stats block is visible
      });

      if (statsSection) {
        statsObserver.observe(statsSection);
      }
    } else {
      // Fallback for browsers without IntersectionObserver support
      statNumbers.forEach(stat => {
        const target = stat.getAttribute('data-target');
        stat.textContent = target + '+';
      });
    }
  };

  initStatCounters();
// Function to handle scroll animations for the Future Goals Section
document.addEventListener("DOMContentLoaded", () => {
  
  // Create an intersection observer for standard vertical reveals
  const revealOptions = {
    threshold: 0.15, // Triggers when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Unobserve once animated to keep it visible
      }
    });
  }, revealOptions);

  // Apply observer to general reveal elements
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // Create a separate observer specifically for timeline nodes to create a staggered effect
  const timelineOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -20px 0px"
  };

  const timelineObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add a slight delay based on index for a cascade effect if multiple nodes enter at once
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 150); 
        observer.unobserve(entry.target);
      }
    });
  }, timelineOptions);

  // Apply observer to timeline elements
  const timelineNodes = document.querySelectorAll(".timeline-item-reveal");
  timelineNodes.forEach(node => {
    timelineObserver.observe(node);
  });

});
// ==========================================
// CONTACT SECTION JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Smooth Focus Effects for Form Fields
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formInputs.forEach(input => {
    // Add focus class to parent container for styling flexibility
    input.addEventListener('focus', () => {
      input.parentElement.classList.add('focused');
      // Clear error state on focus
      input.parentElement.classList.remove('error');
    });
    
    // Remove focus class on blur
    input.addEventListener('blur', () => {
      input.parentElement.classList.remove('focused');
    });
  });

  // 2. Client-Side Form Validation
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  // Simple Email Regex Pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent standard page reload

      let isValid = true;
      
      // Hide any previous status messages
      formSuccess.classList.add('hidden');
      formError.classList.add('hidden');

      // Get Field Values
      const name = document.getElementById('fullName');
      const email = document.getElementById('emailAddress');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      // Validate Name
      if (name.value.trim() === '') {
        name.parentElement.classList.add('error');
        isValid = false;
      }

      // Validate Email
      if (email.value.trim() === '' || !emailRegex.test(email.value.trim())) {
        email.parentElement.classList.add('error');
        isValid = false;
      }

      // Validate Subject
      if (subject.value.trim() === '') {
        subject.parentElement.classList.add('error');
        isValid = false;
      }

      // Validate Message
      if (message.value.trim() === '') {
        message.parentElement.classList.add('error');
        isValid = false;
      }

      // Final Submission Check
      if (isValid) {
        // Here you would normally send data to a backend via Fetch/Axios.
        // Simulating a successful network request for the portfolio display:
        const submitBtn = document.getElementById('submitBtn');
        const originalBtnText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
          // Reset Form and show success message
          contactForm.reset();
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
          formSuccess.classList.remove('hidden');
          
          // Auto-hide success message after 5 seconds
          setTimeout(() => {
            formSuccess.classList.add('hidden');
          }, 5000);
        }, 1500);

      } else {
        // Show global error status
        formError.classList.remove('hidden');
      }
    });
  }

  // 3. Scroll-Triggered Animations (Intersection Observer)
  const animatedElements = document.querySelectorAll('.scroll-animate');
  
  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Unobserve to trigger animation only once
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px"
  });

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });

});
// ==========================================
// FOOTER & BACK TO TOP JAVASCRIPT
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

  // 1. Back to Top Button Logic
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    // Show/Hide button based on scroll position
    window.addEventListener('scroll', () => {
      // If user scrolls down more than 400px, show the button
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Footer Subtle Entrance Animation (Using Intersection Observer)
  // Ensures the footer elements fade in smoothly as they scroll into view
  const footerElements = document.querySelectorAll('.footer-column, .footer-bottom');
  
  // Set initial state for animation
  footerElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
  });

  const footerObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger when 10% visible
    rootMargin: "0px 0px -50px 0px"
  });

  footerElements.forEach(el => {
    footerObserver.observe(el);
  });

});