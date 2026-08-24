"use strict";

/* =========================================================
   SANJAY WATER
   FINAL STABLE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       HELPER
    ===================================================== */

    const $ = (selector) => document.querySelector(selector);

    const $$ = (selector) => document.querySelectorAll(selector);


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const hamburger = $(".hamburger");
    const navLinks = $(".nav-links");
    const header = $(".header");
    const scrollTop = $("#scrollTop");


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    if (hamburger && navLinks) {

        hamburger.addEventListener("click", function () {

            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");

            hamburger.setAttribute(
                "aria-expanded",
                navLinks.classList.contains("active")
            );

        });

    }


    /* =====================================================
       CLOSE MOBILE MENU
    ===================================================== */

    $$(".nav-links a").forEach(function (link) {

        link.addEventListener("click", function () {

            if (navLinks) {
                navLinks.classList.remove("active");
            }

            if (hamburger) {
                hamburger.classList.remove("active");

                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        });

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    $$('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                this.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       HEADER SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    updateHeader();


    /* =====================================================
       SCROLL REVEAL
       
       IMPORTANT:
       CSS uses .reveal.show
       NOT .reveal.active
    ===================================================== */

    const revealElements =
        $$(".reveal");


    function revealSections() {

        const windowHeight =
            window.innerHeight;


        revealElements.forEach(function (element) {

            const position =
                element.getBoundingClientRect().top;


            if (
                position <
                windowHeight - 80
            ) {

                element.classList.add("show");

            }

        });

    }


    window.addEventListener(
        "scroll",
        revealSections,
        { passive: true }
    );


    window.addEventListener(
        "load",
        revealSections
    );


    // Initial check
    revealSections();


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        $$("section[id]");

    const navItems =
        $$(".nav-links a");


    function updateActiveNavigation() {

        let currentSection = "";


        const scrollPosition =
            window.scrollY + 160;


        sections.forEach(function (section) {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(function (link) {

            link.classList.remove("active");


            const href =
                link.getAttribute("href");


            if (
                href === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    updateActiveNavigation();


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    function updateScrollTop() {

        if (!scrollTop) {
            return;
        }


        if (window.scrollY > 400) {

            scrollTop.classList.add("show");

        } else {

            scrollTop.classList.remove("show");

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollTop,
        { passive: true }
    );


    updateScrollTop();


    if (scrollTop) {

        scrollTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       TESTIMONIAL SLIDER
    ===================================================== */

    const testimonials =
        $$(".testimonial");

    const previousButton =
        $(".prev");

    const nextButton =
        $(".next");


    let currentSlide = 0;


    function showSlide(index) {

        if (!testimonials.length) {
            return;
        }


        if (index >= testimonials.length) {
            index = 0;
        }


        if (index < 0) {
            index =
                testimonials.length - 1;
        }


        currentSlide = index;


        testimonials.forEach(
            function (slide, i) {

                slide.classList.toggle(
                    "active",
                    i === currentSlide
                );

            }
        );

    }


    if (testimonials.length) {

        showSlide(0);

    }


    if (nextButton) {

        nextButton.addEventListener(
            "click",
            function () {

                showSlide(
                    currentSlide + 1
                );

            }
        );

    }


    if (previousButton) {

        previousButton.addEventListener(
            "click",
            function () {

                showSlide(
                    currentSlide - 1
                );

            }
        );

    }


    /* =====================================================
       AUTO TESTIMONIAL SLIDER
    ===================================================== */

    if (testimonials.length > 1) {

        setInterval(
            function () {

                showSlide(
                    currentSlide + 1
                );

            },
            5000
        );

    }


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        $("#contactForm");

    const nameInput =
        $("#name");

    const emailInput =
        $("#email");

    const phoneInput =
        $("#phone");

    const messageInput =
        $("#message");

    const formMessage =
        $("#formMessage");


    function showMessage(
        text,
        color
    ) {

        if (!formMessage) {
            return;
        }

        formMessage.textContent =
            text;

        formMessage.style.color =
            color;


        setTimeout(
            function () {

                if (formMessage) {
                    formMessage.textContent =
                        "";
                }

            },
            4000
        );

    }


    /* Phone filter */

    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

            }
        );

    }


    /* Contact submit */

    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                const phone =
                    phoneInput
                        ? phoneInput.value.trim()
                        : "";


                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* Name */

                if (name.length < 2) {

                    showMessage(
                        "Please enter your name.",
                        "red"
                    );

                    if (nameInput) {
                        nameInput.focus();
                    }

                    return;

                }


                /* Email */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    showMessage(
                        "Please enter a valid email.",
                        "red"
                    );

                    if (emailInput) {
                        emailInput.focus();
                    }

                    return;

                }


                /* Phone */

                const phonePattern =
                    /^[6-9][0-9]{9}$/;


                if (
                    !phonePattern.test(phone)
                ) {

                    showMessage(
                        "Phone number must be 10 digits.",
                        "red"
                    );

                    if (phoneInput) {
                        phoneInput.focus();
                    }

                    return;

                }


                /* Message */

                if (message.length < 10) {

                    showMessage(
                        "Message should be at least 10 characters.",
                        "red"
                    );

                    if (messageInput) {
                        messageInput.focus();
                    }

                    return;

                }


                showMessage(
                    "✅ Message sent successfully!",
                    "green"
                );


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       GALLERY HOVER
    ===================================================== */

    $$(".gallery img").forEach(
        function (image) {

            image.addEventListener(
                "mouseenter",
                function () {

                    image.style.transform =
                        "scale(1.05)";

                }
            );


            image.addEventListener(
                "mouseleave",
                function () {

                    image.style.transform =
                        "";

                }
            );

        }
    );


    /* =====================================================
       GALLERY LIGHTBOX
    ===================================================== */

    const lightbox =
        $("#lightbox");

    const lightboxImage =
        $("#lightboxImage");

    const lightboxClose =
        $("#lightboxClose");


    function openLightbox(image) {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        lightboxImage.src =
            image.src;

        lightboxImage.alt =
            image.alt ||
            "Sanjay Water";


        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    $$(".gallery img").forEach(
        function (image) {

            image.addEventListener(
                "click",
                function () {

                    openLightbox(image);

                }
            );

        }
    );


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       ORDER SYSTEM
    ===================================================== */

    const orderModal =
        $("#orderModal");

    const closeOrder =
        $("#closeOrder");

    const orderForm =
        $("#orderForm");

    const orderProduct =
        $("#orderProduct");

    const orderQuantity =
        $("#orderQuantity");

    const orderName =
        $("#orderName");

    const orderPhone =
        $("#orderPhone");

    const orderAddress =
        $("#orderAddress");

    const orderMessage =
        $("#orderMessage");


    const orderButtons =
        $$(".order-btn");


    /* =====================================================
       OPEN ORDER MODAL
    ===================================================== */

    function openOrderModal(
        product = ""
    ) {

        if (!orderModal) {
            return;
        }


        orderModal.classList.add(
            "active"
        );


        orderModal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.style.overflow =
            "hidden";


        if (
            orderProduct &&
            product
        ) {

            orderProduct.value =
                product;

        }


        if (orderMessage) {

            orderMessage.textContent =
                "";

        }


        setTimeout(
            function () {

                if (orderProduct) {
                    orderProduct.focus();
                }

            },
            150
        );

    }


    /* =====================================================
       CLOSE ORDER MODAL
    ===================================================== */

    function closeOrderModal() {

        if (!orderModal) {
            return;
        }


        orderModal.classList.remove(
            "active"
        );


        orderModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    }


    /* =====================================================
       PRODUCT ORDER BUTTONS
    ===================================================== */

    orderButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const product =
                        button.getAttribute(
                            "data-product"
                        ) || "";


                    openOrderModal(
                        product
                    );

                }
            );

        }
    );


    /* =====================================================
       HERO ORDER BUTTON
    ===================================================== */

    const heroOrderButton =
        $(".hero-order-btn");


    if (heroOrderButton) {

        heroOrderButton.addEventListener(
            "click",
            function () {

                openOrderModal("");

            }
        );

    }


    /* =====================================================
       NAV ORDER BUTTON
    ===================================================== */

    const navOrderButton =
        $("#navOrderBtn");


    if (navOrderButton) {

        navOrderButton.addEventListener(
            "click",
            function () {

                openOrderModal("");

            }
        );

    }


    /* =====================================================
       CTA ORDER BUTTON
    ===================================================== */

    const ctaOrderButton =
        $("#ctaOrderBtn");


    if (ctaOrderButton) {

        ctaOrderButton.addEventListener(
            "click",
            function () {

                openOrderModal("");

            }
        );

    }


    /* =====================================================
       FOOTER ORDER BUTTON
    ===================================================== */

    const footerOrderButton =
        $("#footerOrderBtn");


    if (footerOrderButton) {

        footerOrderButton.addEventListener(
            "click",
            function () {

                openOrderModal("");

            }
        );

    }


    /* =====================================================
       CLOSE ORDER
    ===================================================== */

    if (closeOrder) {

        closeOrder.addEventListener(
            "click",
            closeOrderModal
        );

    }


    /* Outside click */

    if (orderModal) {

        orderModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === orderModal
                ) {

                    closeOrderModal();

                }

            }
        );

    }


    /* =====================================================
       ORDER PHONE
    ===================================================== */

    if (orderPhone) {

        orderPhone.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                        .replace(/\D/g, "")
                        .slice(0, 10);

            }
        );

    }


    /* =====================================================
       ORDER QUANTITY
    ===================================================== */

    if (orderQuantity) {

        orderQuantity.addEventListener(
            "input",
            function () {

                let value =
                    Number(this.value);


                if (!Number.isFinite(value)) {
                    value = 1;
                }


                if (value < 1) {
                    value = 1;
                }


                if (value > 999) {
                    value = 999;
                }


                this.value =
                    value;

            }
        );

    }


    /* =====================================================
       ORDER MESSAGE
    ===================================================== */

    function showOrderMessage(
        text,
        color
    ) {

        if (!orderMessage) {
            return;
        }


        orderMessage.textContent =
            text;

        orderMessage.style.color =
            color;

    }


    /* =====================================================
       ORDER ID
    ===================================================== */

    function generateOrderID() {

        return (
            "SW-" +
            Date.now()
                .toString()
                .slice(-8)
        );

    }


    /* =====================================================
       ORDER FORM SUBMIT
    ===================================================== */

    if (orderForm) {

        orderForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const product =
                    orderProduct
                        ? orderProduct.value.trim()
                        : "";


                const quantity =
                    orderQuantity
                        ? Number(
                            orderQuantity.value
                        )
                        : 0;


                const name =
                    orderName
                        ? orderName.value.trim()
                        : "";


                const phone =
                    orderPhone
                        ? orderPhone.value.trim()
                        : "";


                const address =
                    orderAddress
                        ? orderAddress.value.trim()
                        : "";


                /* Product */

                if (!product) {

                    showOrderMessage(
                        "Please select a water product.",
                        "red"
                    );

                    if (orderProduct) {
                        orderProduct.focus();
                    }

                    return;

                }


                /* Quantity */

                if (
                    !Number.isFinite(quantity) ||
                    quantity < 1
                ) {

                    showOrderMessage(
                        "Please enter a valid quantity.",
                        "red"
                    );

                    if (orderQuantity) {
                        orderQuantity.focus();
                    }

                    return;

                }


                /* Name */

                if (name.length < 2) {

                    showOrderMessage(
                        "Please enter your full name.",
                        "red"
                    );

                    if (orderName) {
                        orderName.focus();
                    }

                    return;

                }


                /* Phone */

                const phonePattern =
                    /^[6-9][0-9]{9}$/;


                if (
                    !phonePattern.test(phone)
                ) {

                    showOrderMessage(
                        "Please enter a valid 10 digit mobile number.",
                        "red"
                    );

                    if (orderPhone) {
                        orderPhone.focus();
                    }

                    return;

                }


                /* Address */

                if (address.length < 10) {

                    showOrderMessage(
                        "Please enter your complete delivery address.",
                        "red"
                    );

                    if (orderAddress) {
                        orderAddress.focus();
                    }

                    return;

                }


                /* Payment */

                const selectedPayment =
                    document.querySelector(
                        'input[name="paymentMethod"]:checked'
                    );


                const paymentMethod =
                    selectedPayment
                        ? selectedPayment.value
                        : "Cash on Delivery";


                /* Order ID */

                const orderId =
                    generateOrderID();


                /* Order object */

                const order = {

                    orderId:
                        orderId,

                    product:
                        product,

                    quantity:
                        quantity,

                    customerName:
                        name,

                    phone:
                        phone,

                    address:
                        address,

                    paymentMethod:
                        paymentMethod,

                    status:
                        "Pending",

                    createdAt:
                        new Date().toISOString()

                };


                /* Save locally */

                try {

                    const orders =
                        JSON.parse(
                            localStorage.getItem(
                                "sanjayWaterOrders"
                            ) || "[]"
                        );


                    orders.push(order);


                    localStorage.setItem(
                        "sanjayWaterOrders",
                        JSON.stringify(orders)
                    );

                } catch (error) {

                    console.warn(
                        "Local storage unavailable:",
                        error
                    );

                }


                /* Success */

                showOrderMessage(
                    "✅ Order ready! Order ID: " +
                    orderId,
                    "green"
                );


                console.log(
                    "💧 Sanjay Water Order:",
                    order
                );


                /* Reset */

                setTimeout(
                    function () {

                        orderForm.reset();

                        closeOrderModal();

                    },
                    2500
                );

            }
        );

    }


    /* =====================================================
       ESC KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeOrderModal();
                closeLightbox();


                if (navLinks) {

                    navLinks.classList.remove(
                        "active"
                    );

                }


                if (hamburger) {

                    hamburger.classList.remove(
                        "active"
                    );

                }

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        $("#currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       PAGE LOADED
    ===================================================== */

    window.addEventListener(
        "load",
        function () {

            document.body.classList.add(
                "loaded"
            );


            // Force reveal check
            revealSections();

        }
    );


    /* =====================================================
       FINAL
    ===================================================== */

    console.log(
        "%c💧 SANJAY WATER",
        "color:#087ea4;font-size:24px;font-weight:800;"
    );

    console.log(
        "%c✅ Website JavaScript Loaded Successfully",
        "color:#16a34a;font-size:14px;font-weight:700;"
    );

    console.log(
        "%c🚀 Order System Ready",
        "color:#063b5c;font-size:14px;font-weight:700;"
    );

});