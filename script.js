/* =========================================================
   CITY ACADEMY — SCRIPT
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => setTimeout(() => preloader.classList.add('hide'), 400));
  setTimeout(() => preloader.classList.add('hide'), 2200);

  /* ---------- Sticky navbar ---------- */
  const mainNav = document.getElementById('mainNav');
  const toggleNavClass = () => mainNav.classList.toggle('scrolled', window.scrollY > 40);
  toggleNavClass();
  window.addEventListener('scroll', toggleNavClass);

  const navCollapse = document.getElementById('navContent');
  document.querySelectorAll('#navContent .nav-link, #navContent .btn-nav-cta').forEach(link => {
    link.addEventListener('click', () => {
      if (navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

  /* ---------- Dark / Light mode toggle ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const root = document.documentElement;
  themeToggle.addEventListener('click', () => {
    const isDark = root.getAttribute('data-theme') === 'dark';
    root.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.innerHTML = isDark ? '<i class="bi bi-moon-stars-fill"></i>' : '<i class="bi bi-sun-fill"></i>';
  });

  /* ---------- Scroll reveal ---------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); revealObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  const observeReveals = () => document.querySelectorAll('[data-reveal]:not(.in-view)').forEach(el => revealObserver.observe(el));

  /* ---------- Counter animation ---------- */
  const animateCounter = (el) => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step); else el.textContent = target;
    };
    requestAnimationFrame(step);
  };
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); counterObserver.unobserve(entry.target); }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

  /* ---------- Scroll to top ---------- */
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => scrollTopBtn.classList.toggle('show', window.scrollY > 500));
  scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* =========================================================
     DYNAMIC CONTENT
     ========================================================= */

  /* ---------- Matric classes (9 & 10) ---------- */
  const matricSubjects = ['English','Urdu','Islamiyat','Pakistan Studies','Mathematics','Physics','Chemistry','Computer Science'];
  const matricClasses = [
    { name:'Class 9', icon:'bi-1-circle-fill', desc:'Building strong fundamentals in Science and Arts subjects for board exam success from year one.' },
    { name:'Class 10', icon:'bi-2-circle-fill', desc:'Matric year — focused revision, past-paper practice and mock tests for excellent board results.' },
  ];
  document.getElementById('matricGrid').innerHTML = matricClasses.map(c => `
    <div class="col-md-6" data-reveal>
      <div class="class-card">
        <div class="class-icon"><i class="bi ${c.icon}"></i></div>
        <span class="class-tag">Matric · Science &amp; Arts</span>
        <h5>${c.name}</h5>
        <p class="desc">${c.desc}</p>
        <ul class="subject-list">${matricSubjects.map(s => `<li>${s}</li>`).join('')}</ul>
        <a href="#admissions" class="btn btn-class-apply">Apply Now <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  `).join('');

  /* ---------- Class 11 groups (Science + Arts) ---------- */
  const class11Groups = [
    { name:'Pre-Medical', icon:'bi-heart-pulse-fill', desc:'For students aiming toward medical and health science careers.', subjects:['English','Urdu','Islamiyat','Physics','Chemistry','Biology'] },
    { name:'Pre-Engineering', icon:'bi-gear-fill', desc:'For students aiming toward engineering and technical fields.', subjects:['English','Urdu','Islamiyat','Physics','Chemistry','Mathematics'] },
    { name:'ICS', icon:'bi-laptop-fill', desc:'Computer Science focus for students headed toward IT and software careers.', subjects:['English','Urdu','Islamiyat','Physics','Mathematics','Computer Science'] },
    { name:'Arts / General', icon:'bi-book-half', desc:'Humanities and general subjects for a broad, well-rounded first year.', subjects:['English','Urdu','Islamiyat','Pakistan Studies','General Subjects','Other Arts Subjects'] },
  ];
  document.getElementById('class11Grid').innerHTML = class11Groups.map(g => `
    <div class="col-md-6 col-lg-3" data-reveal>
      <div class="class-card">
        <div class="class-icon"><i class="bi ${g.icon}"></i></div>
        <span class="class-tag">Class 11 · First Year</span>
        <h5>${g.name}</h5>
        <p class="desc">${g.desc}</p>
        <ul class="subject-list">${g.subjects.map(s => `<li>${s}</li>`).join('')}</ul>
        <a href="#admissions" class="btn btn-class-apply">Apply Now <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  `).join('');

  /* ---------- Class 12 groups (Science + Arts) ---------- */
  const class12Groups = [
    { name:'Pre-Medical', icon:'bi-heart-pulse-fill', desc:'Final-year preparation for medical entry tests and board exams.', subjects:['Physics','Chemistry','Biology','English','Urdu'] },
    { name:'Pre-Engineering', icon:'bi-gear-fill', desc:'Final-year preparation for engineering entry tests and board exams.', subjects:['Physics','Chemistry','Mathematics','English','Urdu'] },
    { name:'ICS', icon:'bi-laptop-fill', desc:'Advanced computer science concepts ahead of board exams.', subjects:['Physics','Computer Science','Mathematics','English','Urdu'] },
    { name:'Arts / General', icon:'bi-book-half', desc:'Final-year humanities preparation for strong board results.', subjects:['English','Urdu','Islamiyat','Pakistan Studies','General Subjects'] },
  ];
  document.getElementById('class12Grid').innerHTML = class12Groups.map(g => `
    <div class="col-md-6 col-lg-3" data-reveal>
      <div class="class-card">
        <div class="class-icon"><i class="bi ${g.icon}"></i></div>
        <span class="class-tag">Class 12 · Second Year</span>
        <h5>${g.name}</h5>
        <p class="desc">${g.desc}</p>
        <ul class="subject-list">${g.subjects.map(s => `<li>${s}</li>`).join('')}</ul>
        <a href="#admissions" class="btn btn-class-apply">Apply Now <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  `).join('');

  /* ---------- Computer Courses ---------- */
  const computerCourses = [
    { name:'Basic Computer Course', icon:'bi-pc-display-horizontal', duration:'6 Weeks', desc:'Essential computer literacy — MS Office, internet, email and typing skills for beginners.' },
    { name:'MS Excel Course', icon:'bi-file-earmark-spreadsheet-fill', duration:'4 Weeks', desc:'Spreadsheets, formulas, charts and data tools for school, office and business use.' },
    { name:'Graphic Designing', icon:'bi-palette2', duration:'2 Months', desc:'Photoshop, Illustrator and design principles for posters, logos and social media.' },
    { name:'Python Programming', icon:'bi-code-slash', duration:'3 Months', desc:'Programming fundamentals, logic building and real mini-projects with Python.' },
    { name:'Machine Learning', icon:'bi-cpu-fill', duration:'4 Months', desc:'Hands-on data science and ML using Python, NumPy, Pandas and real datasets.' },
    { name:'HTML &amp; Web Development', icon:'bi-code-square', duration:'2 Months', desc:'HTML, CSS and JavaScript basics to build modern responsive web pages.' },
    { name:'Flutter &amp; Dart Development', icon:'bi-phone-fill', duration:'3 Months', desc:'Build cross-platform Android &amp; iOS mobile apps using Flutter and Dart.' },
    { name:'Website Development', icon:'bi-globe2', duration:'3 Months', desc:'End-to-end website building — front-end, back-end basics and deployment.' },
  ];
  document.getElementById('coursesGrid').innerHTML = computerCourses.map((c, i) => `
    <div class="col-sm-6 col-lg-3" data-reveal data-reveal-delay="${i % 4}">
      <div class="class-card course-card">
        <div class="class-icon"><i class="bi ${c.icon}"></i></div>
        <span class="course-duration"><i class="bi bi-clock-fill"></i> ${c.duration}</span>
        <h5>${c.name}</h5>
        <p class="desc">${c.desc}</p>
        <a href="#admissions" class="btn btn-class-apply">Enroll Now <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  `).join('');

  /* ---------- Teachers ---------- */
  const teachers = [
    { name:'Ali', subject:'Physics &amp; Mathematics', qual:'Bachelor Degree' },
    { name:'Faraz', subject:'Computer Science', qual:'Bachelor Degree' },
    { name:'Ameer', subject:'English', qual:'Bachelor Degree' },
    { name:'Obaid', subject:'Chemistry &amp; Biology', qual:'Bachelor Degree' },
    { name:'Abdullah', subject:'General Subjects', qual:'Bachelor Degree' },
  ];
  document.getElementById('teacherGrid').innerHTML = teachers.map((t, i) => `
    <div class="col-6 col-md-4 col-lg teacher-col" data-reveal data-reveal-delay="${i % 3}">
      <div class="teacher-card">
        <div class="teacher-avatar"><div class="avatar-circle">${t.name.charAt(0)}</div></div>
        <h5>${t.name}</h5>
        <p class="subject">${t.subject}</p>
        <span class="qual">${t.qual}</span>
      </div>
    </div>
  `).join('');

  /* ---------- Facilities ---------- */
  const facilities = [
    { name:'Experienced Teachers', icon:'bi-person-workspace' },
    { name:'Weekly Tests', icon:'bi-clipboard-check-fill' },
    { name:'Monthly Tests', icon:'bi-calendar-check-fill' },
    { name:'Complete Notes', icon:'bi-journal-text' },
    { name:'Past Papers', icon:'bi-file-earmark-text-fill' },
    { name:'Career Guidance', icon:'bi-signpost-split-fill' },
    { name:'Friendly Learning Environment', icon:'bi-emoji-smile-fill' },
  ];
  document.getElementById('facilitiesGrid').innerHTML = facilities.map((f, i) => `
    <div class="col-6 col-md-4 col-lg-3" data-reveal data-reveal-delay="${i % 3}">
      <div class="facility-card">
        <div class="facility-icon"><i class="bi ${f.icon}"></i></div>
        <h6>${f.name}</h6>
      </div>
    </div>
  `).join('');

  /* ---------- Gallery (generic academy scenery, no identifiable people) ---------- */
  const galleryImgs = [
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1560523159-4a9692d222f9?q=80&w=500&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=500&auto=format&fit=crop',
  ];
  const galleryLabels = ['Classroom Session','Lecture Hall','Group Study','Computer Lab','Career Talk','Result Day','Science Lab','Academy Campus'];
  document.getElementById('galleryGrid').innerHTML = galleryImgs.map((src, i) => `
    <div class="gallery-item" data-reveal data-reveal-delay="${i % 4}">
      <img src="${src}" alt="${galleryLabels[i]} at City Academy" loading="lazy">
      <div class="gallery-overlay"><span>${galleryLabels[i]}</span></div>
    </div>
  `).join('');

  /* ---------- Testimonials ---------- */
  const testimonials = [
    { name:'Hina Raza', role:'Class 10, A+ Grade', text:'The weekly tests at City Academy kept me consistent all year. I scored A+ in my Matric board exams.', initial:'H' },
    { name:'Ahmad Farooq', role:'Pre-Engineering, Class 12', text:'Teachers here actually explain concepts instead of rushing the syllabus. My Physics and Maths improved a lot.', initial:'A' },
    { name:'Zainab Sheikh', role:'Pre-Medical, Class 11', text:'Small class sizes meant I could ask questions freely. Monthly reports helped my parents track my progress too.', initial:'Z' },
    { name:'Talha Nadeem', role:'Python &amp; ML Course', text:'The computer courses gave me real project experience. I built my first Python project within two months.', initial:'T' },
  ];
  const track = document.getElementById('testimonialTrack');
  const dotsWrap = document.getElementById('testimonialDots');
  track.innerHTML = testimonials.map((t, i) => `
    <div class="testimonial-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
      <div class="stars">
        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
        <i class="bi bi-star-fill"></i><i class="bi bi-star-fill"></i>
      </div>
      <p class="quote">"${t.text}"</p>
      <div class="author">
        <div class="avatar-circle" style="width:48px;height:48px;font-size:1.1rem;">${t.initial}</div>
        <div><strong>${t.name}</strong><span>${t.role}</span></div>
      </div>
    </div>
  `).join('');
  dotsWrap.innerHTML = testimonials.map((_, i) => `<span class="${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('');

  let currentSlide = 0;
  const slides = track.querySelectorAll('.testimonial-slide');
  const dots = dotsWrap.querySelectorAll('span');
  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }
  document.getElementById('testNext').addEventListener('click', () => goToSlide(currentSlide + 1));
  document.getElementById('testPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
  dots.forEach(dot => dot.addEventListener('click', (e) => goToSlide(parseInt(e.target.dataset.index, 10))));
  let autoSlide = setInterval(() => goToSlide(currentSlide + 1), 6000);
  const sliderEl = document.querySelector('.testimonial-slider');
  sliderEl.addEventListener('mouseenter', () => clearInterval(autoSlide));
  sliderEl.addEventListener('mouseleave', () => autoSlide = setInterval(() => goToSlide(currentSlide + 1), 6000));

  /* Now that all dynamic sections exist, attach reveal observers */
  observeReveals();

  /* ---------- Form submissions (front-end only) ---------- */
  const admissionForm = document.getElementById('admissionForm');
  const formSuccess = document.getElementById('formSuccess');
  admissionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!admissionForm.checkValidity()) { admissionForm.classList.add('was-validated'); return; }
    formSuccess.classList.add('show');
    admissionForm.reset();
    admissionForm.classList.remove('was-validated');
    setTimeout(() => formSuccess.classList.remove('show'), 5000);
  });

  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!contactForm.checkValidity()) { contactForm.classList.add('was-validated'); return; }
    contactSuccess.classList.add('show');
    contactForm.reset();
    contactForm.classList.remove('was-validated');
    setTimeout(() => contactSuccess.classList.remove('show'), 5000);
  });

});
