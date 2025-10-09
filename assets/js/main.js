
/**
* Template Name: Strategy
* Template URL: https://bootstrapmade.com/strategy-bootstrap-agency-template/
* Updated: May 09 2025 with Bootstrap v5.3.6
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
document.querySelectorAll('#navmenu a').forEach(navmenu => {
  navmenu.addEventListener('click', () => {
    if (document.querySelector('.mobile-nav-active')) {
      mobileNavToogle();
    }
  });
});

/**
 * Toggle mobile nav dropdowns
 */
document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
  navmenu.addEventListener('click', function(e) {
    e.preventDefault();
    this.parentNode.classList.toggle('active');
    this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
    e.stopImmediatePropagation();
  });
});

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

if (scrollTop) {
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  window.addEventListener('load', scrollTop);
  document.addEventListener('scroll', scrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });
  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });
  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);
})();

// --- Dynamic Service Details Sidebar & Content ---
document.addEventListener('DOMContentLoaded', function() {
  // Only run on service-details page
  if (!document.body.classList.contains('service-details-page')) return;

  // Get service ID from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = parseInt(urlParams.get('id')) || 1; // Default to 1 if no ID provided

  // Elements
  const sidebarList = document.getElementById('sidebar-features-list');
  const cardDetailsArea = document.getElementById('card-details-area');
  const cardImage = document.getElementById('card-details-image');
  const cardTitle = document.getElementById('card-details-title');
  const cardDesc = document.getElementById('card-details-description');
  const productList = document.querySelector('.product-list');
  const toolbar = document.querySelector('.product-toolbar');
  const pageTitle = document.querySelector('.page-title h1');

  // Helper: Clear product list
  function clearProductList() {
    if (productList) productList.innerHTML = '';
  }

  // Helper: Render products
  function renderProducts(productsListing) {
    clearProductList();
    if (!productsListing || !productsListing.items || productsListing.items.length === 0) {
      const msg = document.createElement('div');
      msg.className = 'no-products-message text-center py-4';
      msg.innerHTML = '<p class="text-muted">No products found for this category.</p>';
      productList.appendChild(msg);
      return;
    }
    
    const whatsappNumber = productsListing.whatsAppDefaultNumber || '';
    productsListing.items.forEach(function(item) {
      if (!item || !item.title) return;
      const div = document.createElement('div');
      div.className = 'product-item border rounded p-3 mb-3';
      
      // GST Inclusive Price
      const price = item.pricing && item.pricing.display
        ? `<span class="badge bg-primary px-3 py-2 mb-2" style="font-weight:bold;font-size:1.1em;">
            ${item.pricing.display}
          </span>`
        : '';
      
      // Specs
      let specsArr = [];
      if (item.specs) {
        if (item.specs.qty) specsArr.push(`Qty: ${item.specs.qty}`);
        if (item.specs.substrate) specsArr.push(item.specs.substrate);
        if (item.specs.printingLabel) specsArr.push(item.specs.printingLabel);
        if (item.specs.lamination) specsArr.push(item.specs.lamination);
        if (item.specs.fileUploadSize) specsArr.push(`Size: ${item.specs.fileUploadSize}`);
        if (item.specs.delivery) specsArr.push(`Delivery: ${item.specs.delivery}`);
      }
      const specs = specsArr.join(' | ');
      
      // WhatsApp button
      const whatsappBtn = whatsappNumber ? 
        `<a href='https://wa.me/${whatsappNumber}?text=Hi, I'm interested in ${encodeURIComponent(item.title)}' target='_blank' class='btn btn-success btn-sm'>
          <i class='bi bi-whatsapp'></i> Order Now
        </a>` : '';
      
      div.innerHTML = `
        <div class="row g-3 align-items-center">
          <div class="col-12 col-md-3 col-lg-3">
            <img src="${item.image || 'assets/img/placeholder.jpg'}" class="img-fluid product-thumb rounded" alt="${item.title}" style="max-height: 150px; object-fit: cover;">
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <h5 class="mb-2 product-title">${item.title}</h5>
            <div class="text-muted small">${specs || 'Contact for specifications'}</div>
          </div>
          <div class="col-12 col-md-3 col-lg-3 text-end d-flex flex-column align-items-end justify-content-center">
            ${price}
            ${whatsappBtn}
          </div>
        </div>
      `;
      productList.appendChild(div);
    });
  }

  // Helper: Render toolbar
  function renderToolbar(toolbarData) {
    if (!toolbar || !toolbarData) return;
    const countSpan = toolbar.querySelector('.show-count span');
    const showLabel = toolbar.querySelector('.show-count label');
    const select = toolbar.querySelector('select');
    
    if (countSpan) countSpan.textContent = toolbarData.totalLabel || '0 Item(s)';
    if (showLabel) showLabel.textContent = toolbarData.showLabel || 'SHOW:';
    if (select) {
      select.innerHTML = '';
      (toolbarData.pageSizeOptions || [20,50,100]).forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (opt === toolbarData.defaultPageSize) option.selected = true;
        select.appendChild(option);
      });
    }
  }

  // Fetch JSON and render content based on service ID
  fetch('assets/data/service-details.json')
    .then(res => res.json())
    .then(data => {
      // Find the service by ID
      const service = data.services.find(s => s.id === serviceId);
      if (!service || !service.sidebar || !service.sidebar.featuresList) {
        console.error('Service not found or invalid structure for ID:', serviceId);
        return;
      }

      // Update page title
      if (pageTitle) {
        pageTitle.textContent = service.title || 'Service Details';
      }

      const features = service.sidebar.featuresList.features;

      // Render sidebar items
      sidebarList.innerHTML = '';
      features.forEach((feature, idx) => {
        const li = document.createElement('li');
        li.textContent = feature.title;
        li.className = 'sidebar-feature-item cursor-pointer p-2 border-bottom';
        li.setAttribute('data-idx', idx);
        li.style.cursor = 'pointer';
        sidebarList.appendChild(li);
      });

      // Render feature details function
      function renderFeature(feature) {
        if (!feature) return;
        
        // Update hero section (if elements exist)
        if (cardImage) cardImage.src = feature.hero && feature.hero.image ? feature.hero.image : '';
        if (cardTitle) cardTitle.textContent = feature.hero && feature.hero.title ? feature.hero.title : '';
        if (cardDesc) cardDesc.textContent = feature.hero && feature.hero.description ? feature.hero.description : '';

        // Find productsListing (handle nested structure)
        let productsListing = null;
        if (feature.productsListing) {
          let obj = feature.productsListing;
          // Navigate through nested productsListing objects to find one with items
          let depth = 0;
          while (obj.productsListing && depth < 5) { // Safety limit
            obj = obj.productsListing;
            depth++;
          }
          if (obj.items && Array.isArray(obj.items)) {
            productsListing = obj;
          } else if (feature.productsListing.items && Array.isArray(feature.productsListing.items)) {
            // Fallback to direct access if nested structure fails
            productsListing = feature.productsListing;
          }
        }

        renderToolbar(productsListing && productsListing.toolbar ? productsListing.toolbar : null);
        renderProducts(productsListing);
      }

      // Initial load - render first feature
      if (features.length > 0) {
        renderFeature(features[0]);
        // Highlight first sidebar item
        const firstItem = sidebarList.querySelector('.sidebar-feature-item');
        if (firstItem) firstItem.classList.add('active');
      }

      // Add click handlers for sidebar items
      sidebarList.querySelectorAll('.sidebar-feature-item').forEach(item => {
        item.addEventListener('click', function() {
          const idx = parseInt(this.getAttribute('data-idx'));
          renderFeature(features[idx]);

          // Update active state
          sidebarList.querySelectorAll('.sidebar-feature-item').forEach(i => i.classList.remove('active'));
          this.classList.add('active');
        });
      });
    })
    .catch(error => {
      console.error('Error loading service details:', error);
      if (productList) {
        productList.innerHTML = '<div class="text-center py-4"><p class="text-danger">Error loading service details. Please try again.</p></div>';
      }
    });
});   // closes DOMContentLoaded
