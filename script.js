
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

document.querySelectorAll('.section, .project-card, .skill-card').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.6s ease-out';
    observer.observe(section);
});
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const statusText = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (statusText) {
        statusText.textContent = "Sending message...";
        statusText.style.color = "#38bdf8";
    }
    submitBtn.disabled = true;

    const serviceID = 'service_vn3zhpt';
    const templateID = 'template_wdrumc7';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            if (statusText) {
                statusText.textContent = "Your message has been sent successfully! I will be in touch soon.";
                statusText.style.color = "#22c55e";
            }
            document.getElementById('contact-form').reset();
        })
        .catch((error) => {
            if (statusText) {
                statusText.textContent = "An error occurred during submission; please try again later.";
                statusText.style.color = "#ef4444";
            }
            console.error('EmailJS Error:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
        });
});
document.addEventListener("DOMContentLoaded", function () {
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll(".project-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            projectCards.forEach(card => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || category === filterValue) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
});
const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add("show");
    } else {
        backToTopButton.classList.remove("show");
    }
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});