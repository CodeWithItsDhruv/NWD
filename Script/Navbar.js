// Navbar scroll effect
const navbar = document.querySelector(".nav-container");
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});

// Ensure the page scrolls to the top on refresh
window.onload = function () {
    // Use setTimeout to ensure this happens after any other onload events
    setTimeout(function () {
        window.scrollTo(0, 0);
    }, 0);
    
    // If the URL contains a hash, clear it to prevent automatic scrolling to sections
    if (window.location.hash) {
        // Remove the hash but don't refresh the page
        history.replaceState("", document.title, window.location.pathname + window.location.search);
    }
}

const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
    navLinks.style.display =
        navLinks.style.display === "flex" ? "none" : "flex";
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth",
            });
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                navLinks.style.display = "none";
            }
        } else {
            // If the target doesn't exist, scroll to top for "DR" logo
            if (this.classList.contains("nav-logo")) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll("section:not(.hero)").forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(20px)";
    section.style.transition = "all 0.6s ease-out";
    observer.observe(section);
});