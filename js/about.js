// =====================================================
// ABOUT SECTION
// =====================================================


// =====================================================
// 1. ABOUT TABS
// =====================================================

const aboutTabs = document.querySelectorAll(".about-tab");
const aboutPanels = document.querySelectorAll(".about-panel");

aboutTabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        const selectedTab = tab.dataset.tab;


        // Remove active state from all tabs
        aboutTabs.forEach(function(item) {
            item.classList.remove("active");
        });


        // Hide all content panels
        aboutPanels.forEach(function(panel) {
            panel.classList.remove("active");
        });


        // Activate the clicked tab
        tab.classList.add("active");


        // Find the matching content panel
        const selectedPanel = document.querySelector(
            `.about-panel[data-content="${selectedTab}"]`
        );


        // Show the matching panel
        if (selectedPanel) {
            selectedPanel.classList.add("active");
        }

    });

});



// =====================================================
// 2. ID CARD DROP ANIMATION
// =====================================================

const aboutSection = document.querySelector(".about");
const idCardWrapper = document.querySelector(".id-card-wrapper");

let cardAnimationPlayed = false;


function playCardDrop() {

    if (!idCardWrapper || cardAnimationPlayed) {
        return;
    }


    cardAnimationPlayed = true;

    idCardWrapper.classList.add("card-drop");

}


// Detect when the About section enters the viewport

if (aboutSection && idCardWrapper) {

    const aboutObserver = new IntersectionObserver(
        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    playCardDrop();

                    // Stop observing after the first entrance
                    aboutObserver.unobserve(aboutSection);

                }

            });

        },
        {
            threshold: 0.8
        }
    );


    aboutObserver.observe(aboutSection);

}


// =====================================================
// ID CARD TILT HOVER
// =====================================================

const idCard = document.querySelector(".id-card");

if (idCard) {

    idCard.addEventListener("mousemove", function(event) {

        const cardRect = idCard.getBoundingClientRect();

        const mouseX = event.clientX - cardRect.left;
        const mouseY = event.clientY - cardRect.top;

        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;

        const rotateX =
            ((mouseY - centerY) / centerY) * -8;

        const rotateY =
            ((mouseX - centerX) / centerX) * 8;

        idCard.style.transform =
            `translateX(-50%) rotate(-4deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    });


    idCard.addEventListener("mouseleave", function() {

        idCard.style.transform =
            "translateX(-50%) rotate(-4deg) rotateX(0deg) rotateY(0deg) scale(1)";

    });

}



// =====================================================
// 4. NAVBAR ACTIVE LINK — SCROLL DETECTION
// =====================================================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navbar a");


function updateActiveNavLink() {

    const scrollPosition = window.scrollY + 180;


    sections.forEach(function(section) {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {

            navLinks.forEach(function(link) {

                link.classList.remove("active");


                const target = link.getAttribute("href");


                if (target === `#${sectionId}`) {
                    link.classList.add("active");
                }

            });

        }

    });

}


window.addEventListener("scroll", updateActiveNavLink);



// =====================================================
// 5. NAVBAR ACTIVE LINK — CLICK
// =====================================================

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navLinks.forEach(function(item) {
            item.classList.remove("active");
        });


        link.classList.add("active");

    });

});


// Set correct active link when page loads
updateActiveNavLink();