(function () {
  "use strict";

  /* ---------------------------------------------------------
     Theme toggle (light default, remembered via localStorage —
     this is a real standalone site, not a chat artifact, so
     browser storage is fine here).
  --------------------------------------------------------- */
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const THEME_KEY = "rahsaz-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  }
  applyTheme(localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light");
  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(THEME_KEY, next);
  });

  /* ---------------------------------------------------------
     Mobile nav
  --------------------------------------------------------- */
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");
  hamburger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("is-open");
    hamburger.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("is-open");
      hamburger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------------------------------------------------------
     Header shadow on scroll
  --------------------------------------------------------- */
  const header = document.getElementById("siteHeader");
  const onHeaderScroll = () => {
    header.style.boxShadow = window.scrollY > 12 ? "0 8px 24px rgba(0,0,0,.12)" : "none";
  };
  document.addEventListener("scroll", onHeaderScroll, { passive: true });
  onHeaderScroll();

  /* ---------------------------------------------------------
     Scroll reveal
  --------------------------------------------------------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target;
              const group = el.closest(".brand-grid, .story-copy, .story-media, .consult-points, .contact-cards");
              const siblings = group ? Array.from(group.querySelectorAll(".reveal")) : [el];
              const index = siblings.indexOf(el);
              el.style.animationDelay = `${Math.max(index, 0) * 110}ms`;
              el.classList.add("is-visible");
              io.unobserve(el);
            }
          });
        },
        { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ===========================================================
     i18n — FA (default) / EN
  =========================================================== */
  const translations = {
    fa: {
      "brand.name": "راهساز <strong>ماشین</strong>",
      "nav.home": "خانه",
      "nav.explode": "نمای فنی",
      "nav.products": "محصولات",
      "nav.about": "درباره ما",
      "nav.contact": "تماس",


      "hero.heading1": "تامین کننده قطعات یدکی اصل",
      "hero.heading2": "لودرهای <em>XCMG</em> و <em>Shantui</em>",
      "hero.tagline": "راهساز ماشین در مشهد، قطعات موتور، هیدرولیک، شاسی، برق و فیلتر لودرهای چینی رو با ضمانت اصالت کالا و مشاوره فنی رایگان تأمین میکنه. انبار ما همیشه پر از قطعه‌ست، از موتور بگیر تا کوچک‌ترین واشر. هر دستگاهی رو که داشته باشی، قطعه‌اش رو داریم.",
      "hero.ctaPrimary": "درخواست مشاوره رایگان",
      "hero.ctaSecondary": "مشاهده دسته‌بندی قطعات",
      "hero.scroll": "اسکرول کنید",

      "panel.label.category": "دسته‌بندی",
      "panel.label.stock": "موجودی",
      "panel.label.delivery": "تحویل",
      "panel.icon.engine": "موتور",
      "panel.icon.hydraulic": "هیدرولیک",
      "panel.icon.chassis": "شاسی",

      "explode.heading": "هر پیچ و مهره‌اش رو می‌شناسیم",
      "explode.loading": "چند لحظه صبر کنید…",

      "brands.heading": "گستردگی در تامین قطعات",
      "brands.lede": "تمام قطعات لودرهای چینی رو زیر یک سقف جمع کردیم. کافیه برند و مدل دستگاهت رو بگی تا قطعه‌ای که نیاز داری رو برات ارسال کنیم.",
      "brands.xcmg.desc": "برای لودرهای چرخ‌لاستیکی XCMG، مجموعه‌ی کامل قطعات موتور، گیربکس، سیستم هیدرولیک و اتاق راننده رو در انبار مشهد داریم. اصالت کالا با ماست.",
      "brands.xcmg.tag1": "موتور و توربو",
      "brands.xcmg.tag2": "پمپ و شیر هیدرولیک",
      "brands.xcmg.tag3": "اکسل و دیفرانسیل",
      "brands.xcmg.tag4": "فیلتر و لوازم مصرفی",
      "brands.shantui.desc": "برای لودر و بلدوزرهای Shantui هم شاسی، زنجیر، بوش و پین، سیستم برق و کابین رو با قیمت رقابتی و ارسال سریع عرضه می‌کنیم.",
      "brands.shantui.tag1": "شاسی و زنجیر (آندرکریج)",
      "brands.shantui.tag2": "سیستم برق و سنسورها",
      "brands.shantui.tag3": "کابین و شیشه",
      "brands.shantui.tag4": "لاستیک و رینگ",

      "cat.engine": "موتور",
      "cat.hydraulic": "هیدرولیک",
      "cat.chassis": "شاسی و زنجیر",
      "cat.electrical": "الکتریکی",
      "cat.filtration": "فیلتراسیون",
      "cat.cabin": "کابین و اتاق",

      "story.heading": "داستان راهساز ماشین",
      "story.p1": "راهساز ماشین رو با یه هدف ساده شروع کردیم: تو مشهد قطعه‌ی درست رو برای لودرهای چینی وارد کنیم، تا نگرانی مشتریان نسبت به کالای با کیفیت بر طرف بشه. امروز خیلی از تعمیرگاه‌ها و پیمانکارهای راه و ساختمانی شرق کشور برای قطعات XCMG و Shantui اول یاد ما می‌افتن.",
      "story.p2": "ما فقط جنس نمی‌فروشیم. قبل از هر خریدی، مدل دستگاه و مشخصات قطعه رو با کارشناس‌های فنی خودمون چک می‌کنیم تا مطمئن بشیم همون چیزیه که دستگاهت بهش نیاز داره.",
      "story.p3": "انبارمون تو مشهد پره، مستقیم از تأمین‌کننده‌ها می‌خریم و به در تمامی نقاط کشور هم سریع می‌فرستیم. به خاطر همینه که خیلی از تعمیرگاه‌ها و کارگاه‌های ماشین‌آلات راهسازی، اول با ما تماس می‌گیرن.",

      "consult.heading": "قطعه‌ای که نیاز داری رو ارسال می‌کنیم",
      "consult.lede": "مدل دستگاه و مشخصات قطعه‌ای که لازم داری رو برامون بفرست. کارشناس‌های راهساز ماشین در سریع‌ترین زمان با تو تماس می‌گیرن.",
      "consult.point1": "پاسخ‌گویی توسط کارشناس فنی",
      "consult.point2": "استعلام قیمت",
      "consult.point3": "راهنمایی برای انتخاب قطعه‌ی اصلی یا جایگزین مناسب",
      "consult.form.name": "نام و نام خانوادگی",
      "consult.form.namePh": "مثال: علی رضایی",
      "consult.form.phone": "شماره تماس",
      "consult.form.brand": "برند و مدل دستگاه",
      "consult.form.brandPh": "مثال: XCMG LW300FN",
      "consult.form.message": "توضیح قطعه‌ی مورد نیاز",
      "consult.form.messagePh": "نام قطعه، کد فنی (اگه داری) و هر توضیح دیگه...",
      "consult.form.submit": "ارسال درخواست مشاوره",

      "contact.heading": "راهساز ماشین، مشهد",
      "contact.phoneLabel": "تلفن تماس",
      "contact.addressLabel": "آدرس",
      "contact.addressValue": "مشهد، کوشش ۲۷، خبیری ۱۵، پلاک ۱۱۷",
      "contact.hoursLabel": "ساعات کاری",
      "contact.hours1": "شنبه تا چهارشنبه: ۸ تا ۱۸",
      "contact.hours2": "پنجشنبه: ۸ تا ۱۳",

      "cta.heading": "برای هر مدل لودر چینی، قطعه‌اش رو داریم",
      "cta.sub": "همین حالا با کارشناس‌های راهساز ماشین در مشهد تماس بگیر.",
      "cta.call": "تماس مستقیم: 5566 3344 051",
      "cta.form": "فرم مشاوره رایگان",

      "footer.tagline": "راهساز ماشین — تامین قطعات یدکی لودرهای چینی، مشهد",
      "footer.consult": "مشاوره",
      "footer.copyPrefix": "©",
      "footer.copyRest": "راهساز ماشین. تمامی حقوق محفوظ است.",

      "form.required": "لطفاً فیلدهای الزامی رو پر کن.",
      "form.success": "عزیز، درخواستت ثبت شد (نسخه دمو). به‌زودی باهات تماس می‌گیریم.",
      "form.successNoName": "درخواستت ثبت شد (نسخه دمو). به‌زودی باهات تماس می‌گیریم.",

      "marquee": ["XCMG قطعات اصلی", "SHANTUI قطعات اصلی", "موتور", "هیدرولیک", "شاسی و زنجیر", "الکتریکی", "فیلتراسیون", "ارسال به سراسر کشور"],
    },

    en: {
      "brand.name": "Rahsaz <strong>Machine</strong>",
      "nav.home": "Home",
      "nav.explode": "Tech View",
      "nav.products": "Products",
      "nav.about": "About",
      "nav.contact": "Contact",

      "hero.heading1": "Genuine Spare Parts Supplier",
      "hero.heading2": "For <em>XCMG</em> & <em>Shantui</em> Loaders",
      "hero.tagline": "Rahsaz Machine in Mashhad supplies engine, hydraulic, chassis, electrical and filter parts for Chinese loaders with guaranteed authenticity and free technical consultation. Our warehouse is always full of parts, from engines to the smallest washers. Whatever machine you have, we'll find the part for it.",
      "hero.ctaPrimary": "Request Free Consultation",
      "hero.ctaSecondary": "View Part Categories",
      "hero.scroll": "Scroll",

      "panel.label.category": "Category",
      "panel.label.stock": "In Stock",
      "panel.label.delivery": "Delivery",
      "panel.icon.engine": "Engine",
      "panel.icon.hydraulic": "Hydraulic",
      "panel.icon.chassis": "Chassis",


      "explode.heading": "We know every bolt on it",
      "explode.loading": "One moment…",
      "explode.hint": "Scroll to rotate through the parts",


      "brands.heading": "Extensive Parts Supply",
      "brands.lede": "We've gathered all Chinese loader parts under one roof. Just tell us the brand and model, and we'll find the part you need.",
      "brands.xcmg.desc": "For XCMG wheel loaders, we have a complete set of engine, transmission, hydraulic system and cabin parts in our Mashhad warehouse. Authenticity guaranteed.",
      "brands.xcmg.tag1": "Engine & Turbo",
      "brands.xcmg.tag2": "Hydraulic Pumps & Valves",
      "brands.xcmg.tag3": "Axles & Differentials",
      "brands.xcmg.tag4": "Filters & Consumables",
      "brands.shantui.desc": "For Shantui loaders and dozers, we supply chassis, track, bushings and pins, electrical system and cabin parts at competitive prices with fast delivery.",
      "brands.shantui.tag1": "Chassis & Track (Undercarriage)",
      "brands.shantui.tag2": "Electrical System & Sensors",
      "brands.shantui.tag3": "Cabin & Glass",
      "brands.shantui.tag4": "Tires & Rims",

      "cat.engine": "Engine",
      "cat.hydraulic": "Hydraulic",
      "cat.chassis": "Chassis & Track",
      "cat.electrical": "Electrical",
      "cat.filtration": "Filtration",
      "cat.cabin": "Cabin",

      "story.eyebrow": "RM-03 / About Us",
      "story.heading": "The Rahsaz Machine Story",
      "story.p1": "We started Rahsaz Machine with a simple goal: to find the right part for Chinese loaders in Mashhad, right when it's needed. Today, many workshops and road construction contractors in Khorasan think of us first for XCMG and Shantui parts.",
      "story.p2": "We don't just sell parts. Before any purchase, our technical team checks the machine model and part specifications to make sure it's exactly what your equipment needs.",
      "story.p3": "Our warehouse in Mashhad is fully stocked, we buy directly from suppliers, and we deliver quickly across Khorasan. That's why so many workshops and heavy equipment crews call us first.",

      "consult.heading": "Looking For a Part? We'll Find It",
      "consult.lede": "Send us your machine model and what part you need, and our Rahsaz Machine experts will get back to you as soon as possible.",
      "consult.point1": "You talk to a technician, not just a salesperson",
      "consult.point2": "Free price and stock check",
      "consult.point3": "Help choosing genuine parts or suitable alternatives",
      "consult.form.name": "Full name",
      "consult.form.namePh": "e.g. Ali Rezaei",
      "consult.form.phone": "Phone number",
      "consult.form.brand": "Machine brand & model",
      "consult.form.brandPh": "e.g. XCMG LW300FN",
      "consult.form.message": "Describe the part you need",
      "consult.form.messagePh": "Part name, technical code (if you have one), and any other details...",
      "consult.form.submit": "Send Consultation Request",
      "consult.form.disclaimer": "* This form is currently in demo mode and your request won't be sent to a real server. For immediate contact, call <a href=\"tel:+985133445566\">051‑3344‑5566</a>.",



      "contact.heading": "Rahsaz Machine, Mashhad",
      "contact.phoneLabel": "Phone",
      "contact.addressLabel": "Address",
      "contact.addressValue": "Mashhad, Kooshesh 27, Khabiri 15, No. 117",
      "contact.hoursLabel": "Working Hours",
      "contact.hours1": "Sat–Wed: 8:00–18:00",
      "contact.hours2": "Thursday: 8:00–13:00",

      "cta.heading": "We've Got Parts for Every Chinese Loader Model",
      "cta.sub": "Call our Rahsaz Machine experts in Mashhad right now.",
      "cta.call": "Call Now: 051‑3344‑5566",
      "cta.form": "Free Consultation Form",

      "footer.tagline": "Rahsaz Machine — Spare parts for Chinese wheel loaders, Mashhad",
      "footer.consult": "Consult",
      "footer.copyPrefix": "©",
      "footer.copyRest": "Rahsaz Machine. All rights reserved.",

      "form.required": "Please fill in the required fields.",
      "form.success": ", your request has been submitted (demo version). We'll be in touch soon.",
      "form.successNoName": "Your request has been submitted (demo version). We'll be in touch soon.",

      "marquee": ["XCMG Genuine Parts", "SHANTUI Genuine Parts", "Engine", "Hydraulic", "Chassis & Track", "Electrical", "Filtration", "Delivery Across Khorasan"],
    },
  };

  const LANG_KEY = "rahsaz-lang";
  const langToggle = document.getElementById("langToggle");
  const langCurrent = document.getElementById("langCurrent");
  let currentLang = localStorage.getItem(LANG_KEY) === "en" ? "en" : "fa";

  function fillMarquee(lang) {
    const track = document.getElementById("marqueeTrack");
    if (!track) return;
    const words = translations[lang].marquee;
    const sequence = [...words, ...words]; // duplicated for seamless loop
    track.innerHTML = sequence.map((w) => `<span>${w}</span><span>·</span>`).join("");
  }

  function applyLanguage(lang) {
    currentLang = lang;
    const dict = translations[lang];
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "en" ? "ltr" : "rtl");
    langCurrent.textContent = lang === "en" ? "FA" : "EN";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
      const key = el.getAttribute("data-i18n-placeholder");
      if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
    });

    fillMarquee(lang);
    if (typeof window.__renderBrandPanel === "function") window.__renderBrandPanel();
    if (typeof window.__rerenderStoryViewer === "function") window.__rerenderStoryViewer();
    if (typeof window.__rerenderStoryMarquee === "function") window.__rerenderStoryMarquee();
    localStorage.setItem(LANG_KEY, lang);
  }

  langToggle.addEventListener("click", () => applyLanguage(currentLang === "en" ? "fa" : "en"));
  applyLanguage(currentLang);

  /* ---------------------------------------------------------
     Hero spec-panel — XCMG / Shantui switcher (bilingual)
  --------------------------------------------------------- */
  const brandData = {
    fa: [
      { name: "XCMG", logo: "images/xcmg-logo.webp", heading: "قطعات موتور و هیدرولیک", rows: ["موتور، توربو و هیدرولیک", "بیش از ۵۰۰ قلم در انبار مشهد", "ارسال سریع به سراسر کشور"] },
      { name: "SHANTUI", logo: "images/shantui-logo-png_seeklogo-488047.webp", heading: "شاسی، زنجیر و برق", rows: ["آندرکریج، برق و کابین", "بیش از ۳۰۰ قلم در انبار مشهد", "ارسال سریع به سراسر کشور"] },
    ],
    en: [
      { name: "XCMG", logo: "images/xcmg-logo.webp", heading: "Engine & Hydraulic Parts", rows: ["Engine, turbo & hydraulics", "500+ items in Mashhad warehouse", "Fast delivery across Khorasan"] },
      { name: "SHANTUI", logo: "images/shantui-logo-png_seeklogo-488047.webp", heading: "Chassis, Track & Electrical", rows: ["Undercarriage, electrical & cabin", "300+ items in Mashhad warehouse", "Fast delivery across Khorasan"] },
    ],
  };

  const panel = document.getElementById("brandPanel");
  if (panel) {
    const logoEl = document.getElementById("panelLogo");

    const headingEl = document.getElementById("panelHeading");
    const row1 = document.getElementById("panelRow1");
    const row2 = document.getElementById("panelRow2");
    const row3 = document.getElementById("panelRow3");
    const dots = document.querySelectorAll("#panelDots span");
    const prevBtn = document.getElementById("panelPrev");
    const nextBtn = document.getElementById("panelNext");
    let brandIndex = 0;

    function renderBrand(index, skipAnim) {
      const data = brandData[currentLang][index];
      const apply = () => {
        logoEl.src = data.logo;
        logoEl.alt = data.name + " logo";

        headingEl.textContent = data.heading;
        row1.textContent = data.rows[0];
        row2.textContent = data.rows[1];
        row3.textContent = data.rows[2];
        dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      };
      if (skipAnim) { apply(); return; }
      panel.classList.add("is-swapping");
      window.setTimeout(() => { apply(); panel.classList.remove("is-swapping"); }, 180);
    }

    function goTo(index) {
      brandIndex = (index + brandData[currentLang].length) % brandData[currentLang].length;
      renderBrand(brandIndex);
    }

    prevBtn.addEventListener("click", () => goTo(brandIndex - 1));
    nextBtn.addEventListener("click", () => goTo(brandIndex + 1));
    window.__renderBrandPanel = () => renderBrand(brandIndex, true);
  }

  /* ---------------------------------------------------------
     Story section — click-to-play warehouse walkthrough video
  --------------------------------------------------------- */
  const storyVideo = document.getElementById("storyVideo");
  const storyPlayBtn = document.getElementById("storyVideoPlay");
  if (storyVideo && storyPlayBtn) {
    storyPlayBtn.addEventListener("click", () => {
      storyVideo.play();
    });
    storyVideo.addEventListener("play", () => storyPlayBtn.classList.add("is-hidden"));
    storyVideo.addEventListener("pause", () => storyPlayBtn.classList.remove("is-hidden"));
    storyVideo.addEventListener("ended", () => storyPlayBtn.classList.remove("is-hidden"));
  }

  /* ===========================================================
     Category story viewer (Instagram-story style)
     ---------------------------------------------------------
     Filenames are already wired up below — just save your files
     into /media/stories/ with these EXACT names and they'll work
     immediately, no further code changes needed:

       media/stories/engine-1.mp4
       media/stories/engine-2.mp4
       media/stories/engine-3.mp4
       media/stories/engine-4.mp4
       media/stories/chassis-1.mp4
       media/stories/electrical-1.mp4
  =========================================================== */
  const storyCategories = [
    {
      key: "engine", labelKey: "cat.engine",
      items: [
        { type: "video", src: "media/stories/engine-1.mp4" },
        { type: "video", src: "media/stories/engine-2.mp4" },
        { type: "video", src: "media/stories/engine-3.mp4" },
        { type: "video", src: "media/stories/engine-4.mp4" },
      ],
    },
    {
      key: "chassis", labelKey: "cat.chassis",
      items: [{ type: "video", src: "media/stories/chassis-1.mp4" }],
    },
    {
      key: "electrical", labelKey: "cat.electrical",
      items: [{ type: "video", src: "media/stories/electrical-1.mp4" }],
    },
  ];

  // Flatten into a single navigable sequence: [{catIndex, itemIndexInCat, ...item}, ...]
  const storySlides = [];
  storyCategories.forEach((cat, catIndex) => {
    cat.items.forEach((item, itemIndexInCat) => {
      storySlides.push({ ...item, catIndex, itemIndexInCat, itemsInCat: cat.items.length });
    });
  });

  function renderStoryMarquee() {
    const track = document.getElementById("storyMarqueeTrack");
    if (!track) return;
    const tileHtml = (cat) => {
      const label = translations[currentLang][cat.labelKey] || cat.key;
      const countBadge = cat.items.length > 1 ? `<span class="story-square__count">${cat.items.length}</span>` : "";
      const coverSrc = cat.items[0] && cat.items[0].src;
      return `
        <button type="button" class="story-square" data-category="${cat.key}" aria-label="${label}">
          <video class="story-square__video" src="${coverSrc}" muted loop autoplay playsinline preload="metadata"></video>
          <span class="story-square__ring"></span>
          ${countBadge}
          <span class="story-square__label">${label}</span>
        </button>`;
    };
    // Duplicate the sequence once for a seamless CSS loop.
    track.innerHTML = storyCategories.map(tileHtml).join("") + storyCategories.map(tileHtml).join("");

    // Some browsers ignore the `autoplay` HTML attribute on <video> elements
    // that were inserted dynamically via innerHTML — force it explicitly.
    track.querySelectorAll(".story-square__video").forEach((video) => {
      video.muted = true;
      const tryPlay = () => video.play().catch(() => {});
      if (video.readyState >= 2) tryPlay();
      else video.addEventListener("loadeddata", tryPlay, { once: true });
    });

    track.querySelectorAll(".story-square").forEach((tile) => {
      tile.addEventListener("click", () => {
        const key = tile.getAttribute("data-category");
        const catIndex = storyCategories.findIndex((c) => c.key === key);
        const slideIndex = storySlides.findIndex((s) => s.catIndex === catIndex);
        if (storyViewerApi) storyViewerApi.open(slideIndex === -1 ? 0 : slideIndex);
      });
    });
  }

  let storyViewerApi = null;

  const storyViewer = document.getElementById("storyViewer");
  if (storyViewer) {
    const backdrop = document.getElementById("storyViewerBackdrop");
    const closeBtn = document.getElementById("storyViewerClose");
    const titleEl = document.getElementById("storyViewerTitle");
    const mediaEl = document.getElementById("storyViewerMedia");
    const barsEl = document.getElementById("storyViewerBars");
    const prevBtn = document.getElementById("storyViewerPrev");
    const nextBtn = document.getElementById("storyViewerNext");
    const tapPrev = document.getElementById("storyViewerTapPrev");
    const tapNext = document.getElementById("storyViewerTapNext");

    let activeSlide = 0;

    function placeholderMarkup(label) {
      return `
        <div class="story-viewer__placeholder">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 15 5-5 4 4 4-4 5 5"/><circle cx="8.5" cy="9.5" r="1.5"/></svg>
          <span>${label}</span>
        </div>`;
    }

    function renderSlide(index) {
      activeSlide = (index + storySlides.length) % storySlides.length;
      const slide = storySlides[activeSlide];
      const cat = storyCategories[slide.catIndex];
      const label = translations[currentLang][cat.labelKey] || cat.key;

      titleEl.textContent = slide.itemsInCat > 1
          ? `${label} · ${slide.itemIndexInCat + 1}/${slide.itemsInCat}`
          : label;

      barsEl.innerHTML = Array.from({ length: slide.itemsInCat })
          .map((_, i) => `<div class="bar${i < slide.itemIndexInCat ? " is-done" : ""}${i === slide.itemIndexInCat ? " is-current" : ""}"><span></span></div>`)
          .join("");

      mediaEl.innerHTML = "";
      if (slide.type === "image") {
        const img = document.createElement("img");
        img.src = slide.src;
        img.alt = label;
        mediaEl.appendChild(img);
      } else if (slide.type === "video") {
        mediaEl.innerHTML = `<video src="${slide.src}" autoplay muted loop playsinline controls></video>`;
        const viewerVideo = mediaEl.querySelector("video");
        viewerVideo.muted = true;
        const tryPlay = () => viewerVideo.play().catch(() => {});
        if (viewerVideo.readyState >= 2) tryPlay();
        else viewerVideo.addEventListener("loadeddata", tryPlay, { once: true });
      } else {
        const comingSoonText = currentLang === "en"
            ? `${label} photos & video coming soon`
            : `عکس و ویدیوی «${label}» به‌زودی اضافه می‌شود`;
        mediaEl.innerHTML = placeholderMarkup(comingSoonText);
      }
    }

    function openStory(index) {
      renderSlide(index);
      storyViewer.classList.add("is-open");
      storyViewer.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeStory() {
      storyViewer.classList.remove("is-open");
      storyViewer.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      mediaEl.innerHTML = "";
    }

    closeBtn.addEventListener("click", closeStory);
    backdrop.addEventListener("click", closeStory);
    prevBtn.addEventListener("click", () => renderSlide(activeSlide - 1));
    nextBtn.addEventListener("click", () => renderSlide(activeSlide + 1));
    tapPrev.addEventListener("click", () => renderSlide(activeSlide - 1));
    tapNext.addEventListener("click", () => renderSlide(activeSlide + 1));

    document.addEventListener("keydown", (e) => {
      if (!storyViewer.classList.contains("is-open")) return;
      if (e.key === "Escape") closeStory();
      if (e.key === "ArrowLeft") renderSlide(currentLang === "en" ? activeSlide + 1 : activeSlide - 1);
      if (e.key === "ArrowRight") renderSlide(currentLang === "en" ? activeSlide - 1 : activeSlide + 1);
    });

    storyViewerApi = {
      open: openStory,
      rerenderIfOpen: () => { if (storyViewer.classList.contains("is-open")) renderSlide(activeSlide); },
    };

    window.__rerenderStoryViewer = () => storyViewerApi.rerenderIfOpen();
  }

  renderStoryMarquee();
  window.__rerenderStoryMarquee = renderStoryMarquee;

  /* ---------------------------------------------------------
     Demo consultation form — front-end only, no real backend.
  --------------------------------------------------------- */
  /* ---------------------------------------------------------
     Consultation form — wired to Supabase
  --------------------------------------------------------- */
  const SUPABASE_URL = "https://ubnnqxnmsepqmkyfumvb.supabase.co";
  const SUPABASE_ANON_KEY = "sb_publishable_EPG9MxBMYBymc6IWRt03qw_fssnB_2Q";
  const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const form = document.getElementById("consultForm");
  const note = document.getElementById("formNote");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dict = translations[currentLang];
    if (!form.checkValidity()) {
      note.textContent = dict["form.required"];
      note.style.color = "#B23A2E";
      return;
    }

    const name = document.getElementById("fName").value.trim();
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    const { error } = await supabaseClient.from("consultation_requests").insert([
      {
        name: name,
        phone: document.getElementById("fPhone").value.trim(),
        brand: document.getElementById("fBrand").value.trim(),
        message: document.getElementById("fMsg").value.trim(),
        lang: currentLang,
      },
    ]);

    submitBtn.disabled = false;
    note.style.color = "";

    if (error) {
      console.error(error);
      note.textContent = currentLang === "en" ? "Something went wrong. Please call us instead." : "یه مشکلی پیش اومد، لطفاً تلفنی تماس بگیرید.";
      note.style.color = "#B23A2E";
      return;
    }

    note.textContent = name
        ? `${name}${dict["form.success"].startsWith(",") ? "" : " "}${dict["form.success"]}`
        : dict["form.successNoName"];
    form.reset();
  });

  /* ---------------------------------------------------------
     Footer year
  --------------------------------------------------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ===========================================================
     Exploded-view canvas — scroll-scrubbed video frames
     (192 frames extracted from the uploaded wheel-loader video,
     bound to scroll position of the #explode section: scrolling
     down plays forward, scrolling up plays backward.)
  =========================================================== */
  (function initExplodeScrub() {
    const section = document.getElementById("explode");
    const canvas = document.getElementById("explodeCanvas");
    if (!section || !canvas) return;

    const ctx = canvas.getContext("2d");
    const loader = document.getElementById("explodeLoader");
    const loaderFill = document.getElementById("explodeLoaderFill");

    const FRAME_COUNT = 192;
    const FRAME_PATH = (i) => `frames/frame_${String(i).padStart(4, "0")}.webp`;
    const frames = new Array(FRAME_COUNT);
    let framesReady = 0;
    let currentFrame = -1;
    let canvasW = 0, canvasH = 0;

    function sizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvasW = Math.max(1, Math.round(rect.width * dpr));
      canvasH = Math.max(1, Math.round(rect.height * dpr));
      canvas.width = canvasW;
      canvas.height = canvasH;
    }

    function drawFrame(index) {
      const img = frames[index];
      if (!img || !img.complete) return;
      const cw = canvasW, ch = canvasH;
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (!iw || !ih) return;
      const scale = Math.max(cw / iw, ch / ih); // cover mode — frames are pre-composed on a dark set
      const dw = iw * scale, dh = ih * scale;
      const dx = (cw - dw) / 2, dy = (ch - dh) / 2;
      ctx.fillStyle = "#16130E";
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    }

    function loadFrame(i) {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.onload = () => { framesReady++; resolve(); };
        img.onerror = () => { framesReady++; resolve(); };
        img.src = FRAME_PATH(i + 1);
        frames[i] = img;
      });
    }

    function updateLoaderUI() {
      const pct = Math.round((framesReady / FRAME_COUNT) * 100);
      if (loaderFill) loaderFill.style.width = pct + "%";
    }

    async function preload() {
      // Phase 1 — first frames fast, for immediate first paint.
      const firstBatch = Math.min(12, FRAME_COUNT);
      for (let i = 0; i < firstBatch; i++) {
        await loadFrame(i);
        updateLoaderUI();
      }
      sizeCanvas();
      drawFrame(0);
      currentFrame = 0;
      if (loader) loader.classList.add("is-hidden");

      // Phase 2 — remaining frames in the background.
      for (let i = firstBatch; i < FRAME_COUNT; i++) {
        await loadFrame(i);
        updateLoaderUI();
      }
    }

    function onScrub() {
      const rect = section.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, Math.max(0, -rect.top / total));
      const index = Math.min(FRAME_COUNT - 1, Math.floor(progress * FRAME_COUNT));
      if (index !== currentFrame && frames[index] && frames[index].complete) {
        currentFrame = index;
        drawFrame(currentFrame);
      }
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { onScrub(); ticking = false; });
    }

    window.addEventListener("resize", () => { sizeCanvas(); drawFrame(currentFrame); }, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    preload();
  })();
})();