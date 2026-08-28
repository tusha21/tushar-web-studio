/**
 * Tushar Web Studio - Complete Master Script
 * Location: Nagpur, Maharashtra, India
 * Features: Auto-scroll Reset, 3D Parallax, Dynamic Scrollspy, Anytime Metric Counter,
 * Interactive Demos (6 concepts), Scroll Reveal Up/Down, & WhatsApp Lead Integration.
 */

// 1. Browser ki scroll memory reset karein (Refresh par hamesha Home Page aayega)
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  if (window.location.hash) {
    window.history.replaceState(null, null, window.location.pathname);
  }
});

// Main DOM Content Loaded Engine
document.addEventListener('DOMContentLoaded', () => {

  // 2. Sticky Navbar Glass Effect on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link, .nav-cta-mobile');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      hamburger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // 4. Dynamic Navbar Underline Tracking (Home to Contact ScrollSpy)
  const trackedSections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-menu .nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    trackedSections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        desktopNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  // 5. Anytime Working Metric Scoring & Counter Animation (Runs on every Scroll Up/Down)
  const counters = document.querySelectorAll('.metric-counter');

  const startCounting = (el) => {
    if (el.counterInterval) {
      clearInterval(el.counterInterval);
    }

    const target = +el.getAttribute('data-target');
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400; // ms
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const easeOutQuad = (t) => t * (2 - t);

    el.counterInterval = setInterval(() => {
      frame++;
      const progress = easeOutQuad(frame / totalFrames);
      const currentVal = Math.round(target * progress);

      el.textContent = currentVal + suffix;

      if (frame >= totalFrames) {
        el.textContent = target + suffix;
        clearInterval(el.counterInterval);
        el.counterInterval = null;
      }
    }, frameRate);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const counterEl = entry.target;
      const suffix = counterEl.getAttribute('data-suffix') || '';

      if (entry.isIntersecting) {
        startCounting(counterEl);
      } else {
        if (counterEl.counterInterval) {
          clearInterval(counterEl.counterInterval);
          counterEl.counterInterval = null;
        }
        counterEl.textContent = '0' + suffix;
      }
    });
  }, { threshold: 0.25 });

  counters.forEach(counter => counterObserver.observe(counter));

  // 6. Smooth Scroll Reveal Up & Down Animation Engine
  const revealElements = document.querySelectorAll(
    '.service-card, .portfolio-card, .why-card, .pricing-card, .testimonial-card, .about-card, .contact-grid, .section-header'
  );

  revealElements.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 7. Demo Showcase Data Store (6 Complete Concepts)
  const demoData = {
    sneakers: {
      title: 'URBANHIVE — Sneaker Store',
      tagline: 'Streetwear. Sneakers. Own Your Style.',
      category: 'Footwear & Streetwear Demo Concept',
      heroImage: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=1200&auto=format&fit=crop&q=80',
      items: [
        {
          name: 'Air Retro High Top',
          price: '₹7,999',
          image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Oversized Heavyweight Hoodie',
          price: '₹2,499',
          image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Classic Monochrome Lows',
          price: '₹5,499',
          image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&auto=format&fit=crop&q=80'
        }
      ],
      features: [
        { title: '1-Click WhatsApp Order', desc: 'Instant checkout directly into WhatsApp chat' },
        { title: 'Store Location Sync', desc: 'Google Maps integrated for local footfall' },
        { title: 'Customer Reviews', desc: 'Verified social proof to build local trust' }
      ]
    },
    gym: {
      title: 'IRON DISTRICT — Gym & Fitness',
      tagline: 'Train Hard. Build Strong.',
      category: 'Gym & Fitness Center Demo Concept',
      heroImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80',
      items: [
        {
          name: 'Strength & Conditioning Arena',
          price: '₹2,499 / mo',
          image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Personal Trainer Guidance',
          price: '₹8,000 (12 Sessions)',
          image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Annual VIP Gym Membership',
          price: '₹18,999 / yr',
          image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&auto=format&fit=crop&q=80'
        }
      ],
      features: [
        { title: 'Free Trial Pass Booking', desc: 'Converts cold visitors into WhatsApp leads' },
        { title: 'Certified Trainer Bios', desc: 'Highlights gym authority & experience' },
        { title: 'Facilities Tour', desc: 'High-res gallery of the fitness floor' }
      ]
    },
    salon: {
      title: 'THE STYLE ROOM — Salon & Spa',
      tagline: 'Your Style. Your Signature.',
      category: 'Luxury Salon & Hair Styling Demo Concept',
      heroImage: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&auto=format&fit=crop&q=80',
      items: [
        {
          name: 'Signature Keratin Hair Treatment',
          price: '₹3,999',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Complete Bridal Glow Package',
          price: '₹14,999',
          image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Men Hair Styling & Beard Spa',
          price: '₹899',
          image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80'
        }
      ],
      features: [
        { title: 'Instant WhatsApp Appointment', desc: 'Customers book slots in 10 seconds' },
        { title: 'Digital Rate Card', desc: 'Transparent service pricing list' },
        { title: 'Bridal Makeover Gallery', desc: 'High-definition lookbook for brides' }
      ]
    },
    cafe: {
      title: 'BREW & BEAN — Café & Bistro',
      tagline: 'Good Coffee. Good Moments.',
      category: 'Artisanal Café & Food Demo Concept',
      heroImage: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&auto=format&fit=crop&q=80',
      items: [
        {
          name: 'Single Origin Pour Over Coffee',
          price: '₹220',
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Artisan Sourdough Avocado Toast',
          price: '₹310',
          image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Belgian Dark Chocolate Waffle',
          price: '₹280',
          image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=500&auto=format&fit=crop&q=80'
        }
      ],
      features: [
        { title: 'Interactive Menu', desc: 'Fast mobile-friendly menu without PDF lag' },
        { title: 'Ambience Photo Showcase', desc: 'Drives evening & weekend walk-ins' },
        { title: 'Google Maps Directions', desc: '1-tap GPS directions straight to the café' }
      ]
    },
    boutique: {
      title: 'NOVA WEAR — Clothing Store',
      tagline: 'Wear Your Identity.',
      category: 'Fashion & Boutique Demo Concept',
      heroImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80',
      items: [
        {
          name: 'Handcrafted Silk Festive Anarkali',
          price: '₹6,499',
          image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Linen Casual Summer Blazer',
          price: '₹3,299',
          image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Embroidered Kurta Set',
          price: '₹2,899',
          image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=500&auto=format&fit=crop&q=80'
        }
      ],
      features: [
        { title: 'New Arrival Catalog', desc: 'Keep local shoppers updated with collections' },
        { title: 'Festive Offers & Sales', desc: 'Dedicated promotional banners' },
        { title: 'WhatsApp Order System', desc: 'Customers screenshot & order directly' }
      ]
    },
    jewellery: {
      title: 'AURA JEWELS — Luxury Diamond & Gold Jewellery',
      tagline: 'Timeless Luxury. Pure Elegance.',
      category: 'Fine Jewellery & Bridal Studio Demo',
      heroImage: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1200&auto=format&fit=crop&q=80',
      items: [
        {
          name: 'Solitaire Diamond Engagement Ring',
          price: '₹84,999',
          image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Handcrafted Kundan Bridal Choker',
          price: '₹1,45,000',
          image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop&q=80'
        },
        {
          name: 'Rose Gold Minimalist Pendant',
          price: '₹28,500',
          image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&auto=format&fit=crop&q=80'
        }
      ],
      features: [
        { title: 'Live Gold Rate Calculator', desc: 'Daily updated certified market rates' },
        { title: 'VIP Lounge Appointment', desc: 'Private jewellery consultation booking' },
        { title: '100% BIS Hallmarked', desc: 'Certified authenticity on all items' }
      ]
    }
  };

  // 8. Full-Screen Interactive Demo Modal Controller
  const demoModal = document.getElementById('demoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalTitle = document.getElementById('modalTitle');
  const modalBadge = document.getElementById('modalBadge');
  const modalBody = document.getElementById('modalBody');
  const modalWhatsAppCta = document.getElementById('modalWhatsAppCta');
  const openDemoButtons = document.querySelectorAll('.open-demo-btn');

  function openModal(demoKey) {
    const data = demoData[demoKey];
    if (!data) return;

    modalTitle.textContent = data.title;
    modalBadge.textContent = data.category.toUpperCase();

    const encodedMsg = encodeURIComponent(`Hi Tushar, I saw the ${data.title} Demo Concept on your website and I am interested in getting a similar website for my business.`);
    modalWhatsAppCta.href = `https://wa.me/919325108723?text=${encodedMsg}`;

    modalBody.innerHTML = `
      <div class="demo-preview-hero">
        <img src="${data.heroImage}" alt="${data.title}" onerror="this.src='https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80'">
        <div class="demo-hero-overlay">
          <h2 style="color:#fff; font-size:1.8rem; margin-bottom:4px;">${data.tagline}</h2>
          <p style="color:var(--accent-gold); font-weight:600;">Interactive Demo Prototype — Built for Local Businesses in Nagpur</p>
        </div>
      </div>

      <h4 style="margin-bottom:14px; font-size:1.1rem; color:var(--text-main);">Featured Products / Service Cards:</h4>
      <div class="demo-gallery-grid">
        ${data.items.map(item => `
          <div class="demo-item-card">
            <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555421689-491a97ff2040?w=500&auto=format&fit=crop&q=80'">
            <div class="demo-item-info">
              <h5>${item.name}</h5>
              <span>${item.price}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <h4 style="margin-bottom:14px; font-size:1.1rem; color:var(--text-main);">Included Features:</h4>
      <div class="demo-features-row">
        ${data.features.map(feat => `
          <div class="demo-feature-box">
            <i data-lucide="check-circle-2"></i>
            <div>
              <strong>${feat.title}</strong>
              <span>${feat.desc}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    if (window.lucide) {
      window.lucide.createIcons();
    }

    demoModal.classList.add('active');
    demoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    demoModal.classList.remove('active');
    demoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openDemoButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const demoId = e.currentTarget.getAttribute('data-demo-id');
      openModal(demoId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && demoModal.classList.contains('active')) {
      closeModal();
    }
  });

  // 9. Contact Form WhatsApp Lead Generator
  const enquiryForm = document.getElementById('enquiryForm');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('clientName').value.trim();
      const business = document.getElementById('businessName').value.trim();
      const category = document.getElementById('businessCategory').value;
      const phone = document.getElementById('clientPhone').value.trim();
      const requirements = document.getElementById('clientRequirements').value.trim() || 'Not specified';

      if (!name || !business || !phone || !category) {
        alert('Please fill in all required fields.');
        return;
      }

      const formattedMessage = 
`Hi Tushar,

I am interested in a website.

Name: ${name}
Business: ${business}
Category: ${category}
Phone: ${phone}
Requirements: ${requirements}

Please contact me.`;

      const whatsappURL = `https://wa.me/919325108723?text=${encodeURIComponent(formattedMessage)}`;
      window.open(whatsappURL, '_blank');
    });
  }
});