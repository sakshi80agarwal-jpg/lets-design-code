document.addEventListener('DOMContentLoaded', () => {
  // 1. EYE TRACKER FOR PRELOADER
  document.addEventListener('mousemove', (e) => {
    const pupils = document.querySelectorAll('.pupil');
    pupils.forEach((pupil) => {
      const eye = pupil.parentElement;
      if (!eye) return;

      const rect = eye.getBoundingClientRect();
      const eyeX = rect.left + rect.width / 2;
      const eyeY = rect.top + rect.height / 2;

      const angle = Math.atan2(e.clientY - eyeY, e.clientX - eyeX);
      const distance = Math.min(10, Math.hypot(e.clientX - eyeX, e.clientY - eyeY) / 10);

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
});

// 2. PRELOADER START LOGIC
function startLoading() {
  const startBtn = document.getElementById('startBtn');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');

  if (!startBtn || !progressBar || !progressText) return;

  startBtn.style.display = 'none';
  let progress = 0;

  const interval = setInterval(() => {
    progress += 2;
    progressBar.style.width = progress + '%';
    progressText.innerText = `Loading ${progress}%`;

    if (progress >= 100) {
      clearInterval(interval);
      const preloader = document.getElementById('preloader');
      if (preloader) preloader.style.display = 'none';
      playIntroVideo();
    }
  }, 30);
}

// 3. INTRO VIDEO LOGIC (STOPS AUDIO IMMEDIATELY ON SKIP)
function playIntroVideo() {
  const videoContainer = document.getElementById('videoContainer');
  const video = document.getElementById('introVideo');

  if (!videoContainer || !video) {
    endVideo();
    return;
  }

  videoContainer.style.display = 'block';

  video.play().catch(() => {
    endVideo();
  });

  video.onended = () => {
    endVideo();
  };
}

function endVideo() {

  const videoContainer = document.getElementById('videoContainer');
  const mainWebsite = document.getElementById('mainWebsite');
  const video = document.getElementById('introVideo');
  const pageTransition = document.getElementById('pageTransition');

  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  if (mainWebsite) {
    mainWebsite.style.display = 'block';
  }

  if (pageTransition) {
    pageTransition.classList.add('active');
  }

  setTimeout(function () {

    if (videoContainer) {
      videoContainer.style.display = 'none';
    }

    startTypingEffect();
    initScrollSpy();

  }, 700);
}

// 4. HERO SECTION TYPING ANIMATION
const words = ["UI/UX Designer", "Frontend Developer", "Freelancer", "Digital Creator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function startTypingEffect() {
  const typingElement = document.getElementById("typingText");
  if (!typingElement) return;

  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingElement.innerText = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingElement.innerText = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    typeSpeed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typeSpeed = 400;
  }

  setTimeout(startTypingEffect, typeSpeed);
}

// 5. RESPONSIVE HAMBURGER MENU TOGGLE
function toggleMenu() {
  const navbar = document.getElementById('navbar');
  const navOverlay = document.getElementById('navOverlay');
  const menuBtnIcon = document.getElementById('menuBtnIcon');

  if (!navbar) return;

  navbar.classList.toggle('active');
  if (navOverlay) navOverlay.classList.toggle('active');

  if (menuBtnIcon) {
    if (navbar.classList.contains('active')) {
      menuBtnIcon.className = 'bx bx-x';
    } else {
      menuBtnIcon.className = 'bx bx-menu';
    }
  }
}

function closeMenu() {
  const navbar = document.getElementById('navbar');
  const navOverlay = document.getElementById('navOverlay');
  const menuBtnIcon = document.getElementById('menuBtnIcon');

  if (navbar) navbar.classList.remove('active');
  if (navOverlay) navOverlay.classList.remove('active');
  if (menuBtnIcon) menuBtnIcon.className = 'bx bx-menu';
}

// 6. DYNAMIC ACTIVE NAVLINK SWITCHING & SCROLLSPY
function setActiveLink(clickedLink) {
  const navLinks = document.querySelectorAll('.navbar .nav-link');
  navLinks.forEach((link) => link.classList.remove('active'));
  clickedLink.classList.add('active');
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.navbar .nav-link');

  if (navLinks.length > 0) {
    navLinks[0].classList.add('active');
  }

  window.addEventListener('scroll', () => {
    let currentSectionId = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// =====================================================
// CONTACT VIDEO
// =====================================================

const contactSection = document.querySelector(".contact");
const contactVideo = document.querySelector("#contact-video");
const contactPlay = document.querySelector("#contact-play");


if (contactSection && contactVideo) {

  const contactVideoObserver = new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (entry.isIntersecting) {

          contactVideo.currentTime = 0;

          const playPromise = contactVideo.play();


          if (playPromise !== undefined) {

            playPromise
              .then(function () {

                contactPlay.style.display = "none";

              })
              .catch(function () {

                contactPlay.style.display = "block";

              });

          }

        } else {

          contactVideo.pause();

        }

      });

    },
    {
      threshold: 0.35
    }
  );


  contactVideoObserver.observe(contactSection);


  // Manual fallback if autoplay with sound is blocked

  contactPlay.addEventListener("click", function () {

    contactVideo.muted = false;

    contactVideo.play();

    contactPlay.style.display = "none";

  });

}


// =====================================================
// CONTACT FORM
// =====================================================

const contactForm = document.querySelector("#contact-form");

const formToast = document.querySelector("#form-toast");
const toastTitle = document.querySelector("#toast-title");
const toastMessage = document.querySelector("#toast-message");
const toastClose = document.querySelector("#toast-close");

let toastTimer;


function showToast(title, message) {

  if (!formToast) return;

  toastTitle.textContent = title;
  toastMessage.textContent = message;

  formToast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(function () {

    formToast.classList.remove("show");

  }, 5000);
}


if (toastClose) {

  toastClose.addEventListener("click", function () {

    formToast.classList.remove("show");

    clearTimeout(toastTimer);

  });

}


if (contactForm) {

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    const name =
      document.querySelector("#name").value.trim();

    const email =
      document.querySelector("#email").value.trim();

    const project =
      document.querySelector("#project").value;

    const message =
      document.querySelector("#message").value.trim();


    // CHECK REQUIRED FIELDS

    if (!name || !email || !project || !message) {

      showToast(
        "Almost there!",
        "Please fill in all the fields."
      );

      return;
    }


    // SHOW SENDING MESSAGE

    showToast(
      "Sending message...",
      "Your message is being sent."
    );


    try {

      const response = await fetch(
        contactForm.action,
        {
          method: "POST",
          body: new FormData(contactForm),
          headers: {
            "Accept": "application/json"
          }
        }
      );


      if (response.ok) {

        contactForm.reset();

        showToast(
          "Message sent!",
          "Thanks for reaching out. I'll get back to you soon."
        );

      } else {

        showToast(
          "Something went wrong.",
          "Please try again in a moment."
        );

      }


    } catch (error) {

      showToast(
        "Something went wrong.",
        "Please check your connection and try again."
      );

    }

  });

}

// 4. OPEN WORK DIRECTLY FROM CASE STUDIES

window.addEventListener('DOMContentLoaded', function () {

  if (window.location.hash === '#work') {

    const preloader = document.getElementById('preloader');
    const videoContainer = document.getElementById('videoContainer');
    const mainWebsite = document.getElementById('mainWebsite');

    // Hide preloader
    if (preloader) {
      preloader.style.display = 'none';
    }

    // Make sure intro video is hidden
    if (videoContainer) {
      videoContainer.style.display = 'none';
    }

    // Show portfolio
    if (mainWebsite) {
      mainWebsite.style.display = 'block';
    }

    // Start normal website functions
    startTypingEffect();
    initScrollSpy();

    // Go to Work section
    setTimeout(function () {

      const workSection = document.getElementById('work');

      if (workSection) {
        workSection.scrollIntoView({
          behavior: 'auto',
          block: 'start'
        });
      }

    }, 100);
  }

});