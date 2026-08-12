/*========  MOBILE MENU TOGGLE  ========*/

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
});

// Close menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
    });
});


/*========  SMOOTH SCROLL   ========*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/*========  STICKY HEADER SHADOW   ========*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.08)";
    } else {
        header.style.boxShadow = "none";
    }
});

/*========  SCROLL TO TOP   ========*/

const scrollBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        scrollBtn.style.display = "flex";
        scrollBtn.style.justifyContent = "center";
        scrollBtn.style.alignItems = "center";
    } else {
        scrollBtn.style.display = "none";
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

/*========  SCROLL REVEAL   ========*/

const reveals = document.querySelectorAll(".reveal");

function revealSections() {
    const windowHeight = window.innerHeight;
    reveals.forEach(section => {
        const top = section.getBoundingClientRect().top;
        if (top < windowHeight - 120) {
            section.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealSections);
window.addEventListener("load", revealSections);

     
/*========  ACTIVE NAV LINK ========*/

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/*======== TESTIMONIAL SLIDER ========*/

const testimonials = document.querySelectorAll(".testimonial");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentSlide = 0;

function showSlide(index) {
    testimonials.forEach(slide => {
        slide.classList.remove("active");
    });
    testimonials[index].classList.add("active");
}

// Show first slide
showSlide(currentSlide);

// Next Slide
function nextSlide() {
    currentSlide++;
    if (currentSlide >= testimonials.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Previous Slide
function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = testimonials.length - 1;
    }
    showSlide(currentSlide);
}

// Buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto Slider
setInterval(nextSlide, 5000);


/*======== CONTACT FORM VALIDATION ========*/

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function(e){
    e.preventDefault();
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    if(name === ""){
        showMessage("Please enter your name.","red");
        nameInput.focus();
        return;
    }
    const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
        showMessage("Please enter a valid email.","red");
        emailInput.focus();
        return;
    }
    const phonePattern =
    /^[0-9]{10}$/;
    if(!phonePattern.test(phone)){
        showMessage("Phone number must be 10 digits.","red");
        phoneInput.focus();
        return;
    }
    if(message.length < 10){
        showMessage("Message should be at least 10 characters.","red");
        messageInput.focus();
        return;
    }
    showMessage(
        "✅ Thank you! Your message has been sent successfully.",
        "green"
    );
    form.reset();
});

/*======== MESSAGE FUNCTION ========*/

function showMessage(text,color){
    formMessage.textContent = text;
    formMessage.style.color = color;
    setTimeout(()=>{
        formMessage.textContent="";
    },4000);
}

/*======== IMAGE HOVER EFFECT ========*/

const galleryImages =
document.querySelectorAll(".gallery img");

galleryImages.forEach(image=>{
    image.addEventListener("mouseenter",()=>{
        image.style.transform="scale(1.05)";
    });
    image.addEventListener("mouseleave",()=>{
        image.style.transform="scale(1)";
    });
});

/*======== LOADER (Optional) ========*/

window.addEventListener("load",()=>{
    document.body.classList.add("loaded");
});

/*======== CONSOLE MESSAGE ========*/

console.log(
"%cSanjay Water Website Loaded Successfully!",
"color:#0077B6;font-size:18px;font-weight:bold;"
);