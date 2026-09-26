/* =========================================================
   NOVA BUSINESS SOLUTIONS
   JAVASCRIPT
========================================================= */


/* =========================================================
   SELECT ELEMENTS
========================================================= */

const loader = document.getElementById("loader");

const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeMenu = document.getElementById("closeMenu");
const menuOverlay = document.getElementById("menuOverlay");

const navLinks = document.querySelectorAll(".nav-link");
const pageButtons = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

const scrollTopButton = document.getElementById("scrollTop");

const contactForm = document.getElementById("contactForm");
const quoteForm = document.getElementById("quoteForm");

const toast = document.getElementById("toast");
const toastTitle = document.getElementById("toastTitle");
const toastMessage = document.getElementById("toastMessage");

const projectModal = document.getElementById("projectModal");
const projectModalClose = document.getElementById("projectModalClose");
const projectModalOverlay = document.getElementById("projectModalOverlay");

const projectModalImage = document.getElementById("projectModalImage");
const projectModalCategory = document.getElementById("projectModalCategory");
const projectModalTitle = document.getElementById("projectModalTitle");
const projectModalText = document.getElementById("projectModalText");

const currentYear = document.getElementById("currentYear");


/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", function () {

    setTimeout(function () {

        if (loader) {
            loader.classList.add("hidden");
        }

    }, 800);

});


/* =========================================================
   SIDE MENU
========================================================= */

function openMenu() {

    if (sideMenu) {
        sideMenu.classList.add("open");
    }

    if (menuOverlay) {
        menuOverlay.classList.add("show");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "true");
    }

    document.body.style.overflow = "hidden";
}


function closeSideMenu() {

    if (sideMenu) {
        sideMenu.classList.remove("open");
    }

    if (menuOverlay) {
        menuOverlay.classList.remove("show");
    }

    if (menuToggle) {
        menuToggle.setAttribute("aria-expanded", "false");
    }

    document.body.style.overflow = "";
}


if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
}


if (closeMenu) {
    closeMenu.addEventListener("click", closeSideMenu);
}


if (menuOverlay) {
    menuOverlay.addEventListener("click", closeSideMenu);
}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function showPage(pageId) {

    const targetPage = document.getElementById(pageId);

    if (!targetPage) {
        return;
    }


    /* Hide all pages */

    pages.forEach(function (page) {
        page.classList.remove("active-page");
    });


    /* Show selected page */

    targetPage.classList.add("active-page");


    /* Update navigation */

    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (link.dataset.page === pageId) {
            link.classList.add("active");
        }

    });


    /* Close menu */

    closeSideMenu();


    /* Scroll to top */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    /* Trigger reveal animation */

    setTimeout(function () {
        revealElements();
    }, 150);

}


/* All page buttons */

pageButtons.forEach(function (button) {

    button.addEventListener("click", function (event) {

        event.preventDefault();

        const pageId = button.dataset.page;

        if (pageId) {
            showPage(pageId);
        }

    });

});


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {

        closeSideMenu();

        closeProjectModal();

    }

});


/* =========================================================
   REVEAL ANIMATIONS
========================================================= */

function revealElements() {

    const revealItems = document.querySelectorAll(
        ".active-page .reveal"
    );


    const observer = new IntersectionObserver(
        function (entries, observerInstance) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealItems.forEach(function (item) {

        if (!item.classList.contains("visible")) {
            observer.observe(item);
        }

    });

}


window.addEventListener("DOMContentLoaded", function () {
    revealElements();
});


/* =========================================================
   STAGGER REVEAL ANIMATION
========================================================= */

function addRevealDelay() {

    const revealItems = document.querySelectorAll(".reveal");

    revealItems.forEach(function (item, index) {

        item.style.transitionDelay =
            (index % 5) * 0.08 + "s";

    });

}

addRevealDelay();


/* =========================================================
   COUNTER ANIMATION
========================================================= */

let countersStarted = false;


function startCounters() {

    if (countersStarted) {
        return;
    }


    const counters = document.querySelectorAll("[data-count]");

    if (counters.length === 0) {
        return;
    }


    const aboutPage = document.getElementById("about");

    if (!aboutPage || !aboutPage.classList.contains("active-page")) {
        return;
    }


    countersStarted = true;


    counters.forEach(function (counter) {

        const target = Number(counter.dataset.count);

        let current = 0;

        const duration = 1400;

        const increment = target / (duration / 20);


        const timer = setInterval(function () {

            current += increment;


            if (current >= target) {

                current = target;

                clearInterval(timer);

            }


            counter.textContent = Math.floor(current) + "+";

        }, 20);

    });

}


window.addEventListener("scroll", function () {

    const aboutPage = document.getElementById("about");

    if (!aboutPage) {
        return;
    }


    if (aboutPage.classList.contains("active-page")) {

        const rect = aboutPage.getBoundingClientRect();

        if (rect.top < window.innerHeight * 0.75) {
            startCounters();
        }

    }

});


/* Reset counter when leaving About */

function resetCounterState() {

    countersStarted = false;

    const counters = document.querySelectorAll("[data-count]");

    counters.forEach(function (counter) {
        counter.textContent = "0";
    });

}


/* =========================================================
   TOAST MESSAGE
========================================================= */

let toastTimer;


function showToast(title, message) {

    if (!toast) {
        return;
    }


    toastTitle.textContent = title;
    toastMessage.textContent = message;


    toast.classList.add("show");


    clearTimeout(toastTimer);


    toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 4000);

}


/* =========================================================
   CONTACT FORM
========================================================= */

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("contactName").value.trim();


        showToast(
            "Message Sent!",
            "Thank you " + name + ". We will get back to you soon."
        );


        contactForm.reset();

    });

}


/* =========================================================
   QUOTE FORM
========================================================= */

if (quoteForm) {

    quoteForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("quoteName").value.trim();


        const service =
            document.getElementById("serviceSelect").value;


        showToast(
            "Quote Request Received!",
            "Thanks " +
            name +
            ". Your " +
            service +
            " request has been received."
        );


        quoteForm.reset();

    });

}


/* =========================================================
   PROJECT DATA
========================================================= */

const projectData = {

    analytics: {

        category: "BUSINESS / TECHNOLOGY",

        title: "Nova Analytics",

        text:
            "A modern business analytics experience designed to help teams understand performance, track important metrics and make better decisions.",

        image:
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85"

    },


    commerce: {

        category: "RETAIL / DIGITAL",

        title: "Urban Commerce",

        text:
            "A clean digital shopping experience created for a growing brand, focusing on simple navigation, strong presentation and an easy customer journey.",

        image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"

    },


    workspace: {

        category: "BRANDING / CONSULTING",

        title: "NextSpace",

        text:
            "A business transformation project combining brand development, digital strategy and a modern workspace experience.",

        image:
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"

    }

};


/* =========================================================
   OPEN PROJECT MODAL
========================================================= */

function openProjectModal(projectId) {

    const project = projectData[projectId];


    if (!project || !projectModal) {
        return;
    }


    projectModalCategory.textContent = project.category;

    projectModalTitle.textContent = project.title;

    projectModalText.textContent = project.text;

    projectModalImage.src = project.image;

    projectModalImage.alt = project.title;


    projectModal.classList.add("show");

    document.body.style.overflow = "hidden";

}


/* =========================================================
   CLOSE PROJECT MODAL
========================================================= */

function closeProjectModal() {

    if (!projectModal) {
        return;
    }


    projectModal.classList.remove("show");

    document.body.style.overflow = "";

}


if (projectModalClose) {

    projectModalClose.addEventListener(
        "click",
        closeProjectModal
    );

}


if (projectModalOverlay) {

    projectModalOverlay.addEventListener(
        "click",
        closeProjectModal
    );

}


/* =========================================================
   PROJECT BUTTONS
========================================================= */

const projectButtons =
    document.querySelectorAll(".project-view");


projectButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const projectId = button.dataset.project;

        openProjectModal(projectId);

    });

});


/* =========================================================
   MODAL "START SIMILAR PROJECT" BUTTON
========================================================= */

const modalQuoteButton =
    document.querySelector("#projectModal [data-page='quote']");


if (modalQuoteButton) {

    modalQuoteButton.addEventListener("click", function () {

        closeProjectModal();

        showPage("quote");

    });

}


/* =========================================================
   SCROLL TOP BUTTON
========================================================= */

window.addEventListener("scroll", function () {

    if (!scrollTopButton) {
        return;
    }


    if (window.scrollY > 450) {

        scrollTopButton.classList.add("show");

    } else {

        scrollTopButton.classList.remove("show");

    }

});


if (scrollTopButton) {

    scrollTopButton.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   CURRENT YEAR
========================================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================================
   SERVICE BUTTONS
========================================================= */

const serviceButtons =
    document.querySelectorAll(".service-link");


serviceButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        showPage("quote");

    });

});


/* =========================================================
   PAGE CHANGE OBSERVER
========================================================= */

const originalShowPage = showPage;


function navigateToPage(pageId) {

    if (pageId === "about") {

        resetCounterState();

    }

    originalShowPage(pageId);


    setTimeout(function () {

        revealElements();


        if (pageId === "about") {

            setTimeout(function () {

                const aboutPage =
                    document.getElementById("about");

                if (aboutPage) {

                    const rect =
                        aboutPage.getBoundingClientRect();

                    if (
                        rect.top <
                        window.innerHeight * 0.9
                    ) {

                        startCounters();

                    }

                }

            }, 400);

        }

    }, 200);

}


/* Reconnect navigation using enhanced function */

pageButtons.forEach(function (button) {

    button.onclick = function (event) {

        event.preventDefault();

        const pageId = button.dataset.page;

        if (pageId) {
            navigateToPage(pageId);
        }

    };

});


/* =========================================================
   LOGO CLICK
========================================================= */

const brands =
    document.querySelectorAll(".brand");


brands.forEach(function (brand) {

    brand.style.cursor = "pointer";


    brand.addEventListener("click", function () {

        navigateToPage("home");

    });

});


/* =========================================================
   PREVENT EMPTY FOOTER LINKS
========================================================= */

const emptyLinks =
    document.querySelectorAll('a[href="#"]');


emptyLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

    });

});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    revealElements();

    addRevealDelay();

});


console.log("NOVA Business Solutions website loaded successfully.");