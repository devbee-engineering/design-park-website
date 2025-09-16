
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

  // Elements
  const sidebarList = document.getElementById('sidebar-features-list');
  const cardDetailsArea = document.getElementById('card-details-area');
  const cardImage = document.getElementById('card-details-image');
  const cardTitle = document.getElementById('card-details-title');
  const cardDesc = document.getElementById('card-details-description');
  const productList = document.querySelector('.product-list');
  const toolbar = document.querySelector('.product-toolbar');

  // Helper: Clear product list
  function clearProductList() {
    if (productList) productList.innerHTML = '';
  }

  // Helper: Render products
  function renderProducts(productsListing) {
    clearProductList();
        if (!productsListing || !productsListing.items || productsListing.items.length === 0) {
          const msg = document.createElement('div');
          msg.className = 'no-products-message';
          msg.textContent = 'No products found for this category.';
          productList.appendChild(msg);
          return;
        }
    const whatsappNumber = productsListing.whatsAppDefaultNumber || '';
    productsListing.items.forEach(function(item) {
      if (!item || !item.title) return;
      const div = document.createElement('div');
      div.className = 'product-item';
      // GST Inclusive Rs
      const price = item.pricing && item.pricing.price
        ? `<span style='color:#d2a48c;font-weight:bold;font-size:1.2em;'>${item.pricing.gstInclusive ? 'GST Inclusive Rs ' : 'Rs '}${item.pricing.price}</span>`
        : '';
      // Specs
      let specsArr = [];
      if (item.specs) {
        if (item.specs.qty) specsArr.push(`Qty : ${item.specs.qty}`);
        if (item.specs.material) specsArr.push(item.specs.material);
        if (item.specs.printing) specsArr.push(item.specs.printing);
        if (item.specs.fileUploadSize) specsArr.push(`File Upload Size - ${item.specs.fileUploadSize}`);
        if (item.specs.delivery) specsArr.push(`Delivery: ${item.specs.delivery}`);
      }
      const specs = specsArr.join(' | ');
      // WhatsApp button
      const whatsappBtn = whatsappNumber ? `<a href='https://wa.me/${whatsappNumber}' target='_blank' class='btn btn-success'><i class='bi bi-whatsapp'></i> Contact WhatsApp</a>` : '';
      div.innerHTML = `
        <div class="row g-3 align-items-center">
          <div class="col-12 col-md-3 col-lg-3">
            <img src="${item.image || ''}" class="img-fluid product-thumb" alt="${item.title}">
          </div>
          <div class="col-12 col-md-6 col-lg-6">
            <h5 class="mb-2 product-title">${item.title}</h5>
            <div>${specs ? specs : ''}</div>
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
  toolbar.querySelector('.show-count span').textContent = toolbarData.totalLabel || '';
  toolbar.querySelector('.show-count label').textContent = toolbarData.showLabel || 'SHOW:';
  const select = toolbar.querySelector('select');
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

// Fetch JSON and render sidebar
fetch('assets/data/service-details.json')
  .then(res => res.json())
  .then(data => {
    const service = data.services && data.services[0];
    if (!service || !service.sidebar || !service.sidebar.featuresList) return;
    const features = service.sidebar.featuresList.features;

    // Render sidebar items
    sidebarList.innerHTML = '';
    features.forEach((feature, idx) => {
      const li = document.createElement('li');
      li.textContent = feature.title;
      li.className = 'sidebar-feature-item';
      li.setAttribute('data-idx', idx);
      sidebarList.appendChild(li);
    });

//     // Render feature details
    function renderFeature(feature) {
      if (!feature) return;
      if (cardImage) cardImage.src = feature.hero && feature.hero.image ? feature.hero.image : '';
      if (cardTitle) cardTitle.textContent = feature.hero && feature.hero.title ? feature.hero.title : '';
      if (cardDesc) cardDesc.textContent = feature.hero && feature.hero.description ? feature.hero.description : '';

      // Robustly find productsListing
      let productsListing = null;
      if (feature.productsListing) {
        // If productsListing is nested, find the deepest one with items
        let obj = feature.productsListing;
        while (obj.productsListing) obj = obj.productsListing;
        if (obj.items) productsListing = obj;
      }
      renderToolbar(productsListing && productsListing.toolbar ? productsListing.toolbar : null);
      renderProducts(productsListing);
    }

    // Initial load
    if (features.length) renderFeature(features[0]);

    // Click handler
    sidebarList.querySelectorAll('.sidebar-feature-item').forEach(item => {
      item.addEventListener('click', function() {
        const idx = parseInt(this.getAttribute('data-idx'));
        renderFeature(features[idx]);

        // Highlight
        sidebarList.querySelectorAll('.sidebar-feature-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Highlight first
    sidebarList.querySelector('.sidebar-feature-item').classList.add('active');
  });
});   // closes DOMContentLoaded
