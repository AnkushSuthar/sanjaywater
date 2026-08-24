// your code goes here
/* =========================================================
   SANJAY WATER
   PREMIUM FRONTEND JAVASCRIPT
   Version: 2.0
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HELPER FUNCTIONS
    ===================================================== */

    const $ = (selector, parent = document) => {
        return parent.querySelector(selector);
    };

    const $$ = (selector, parent = document) => {
        return [...parent.querySelectorAll(selector)];
    };

    const exists = (element) => element !== null && element !== undefined;

    const safeOn = (element, event, handler, options = {}) => {
        if (exists(element)) {
            element.addEventListener(event, handler, options);
        }
    };

    const show = (element) => {
        if (exists(element)) {
            element.style.display = "flex";
        }
    };

    const hide = (element) => {
        if (exists(element)) {
            element.style.display = "none";
        }
    };


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const hamburger = $(".hamburger");
    const navLinks = $(".nav-links");

    safeOn(hamburger, "click", () => {

        if (!exists(navLinks)) return;

        navLinks.classList.toggle("active");
        hamburger.classList.toggle("active");

    });


    // Close mobile menu when clicking navigation link
    $$(".nav-links a").forEach(link => {

        safeOn(link, "click", () => {

            if (!exists(navLinks)) return;

            navLinks.classList.remove("active");

            if (exists(hamburger)) {
                hamburger.classList.remove("active");
            }

        });

    });


    // Close menu when clicking outside
    safeOn(document, "click", (event) => {

        if (!exists(hamburger) || !exists(navLinks)) return;

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedHamburger =
            hamburger.contains(event.target);

        if (
            navLinks.classList.contains("active") &&
            !clickedInsideMenu &&
            !clickedHamburger
        ) {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
        }

    });


    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    $$('a[href^="#"]').forEach(anchor => {

        safeOn(anchor, "click", function (event) {

            const href = this.getAttribute("href");

            if (
                !href ||
                href === "#" ||
                href.length < 2
            ) {
                return;
            }

            const target = $(href);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

    const header = $(".header");

    const handleHeader = () => {

        if (!exists(header)) return;

        if (window.scrollY > 40) {

            header.style.boxShadow =
                "0 8px 25px rgba(0,0,0,.08)";

        } else {

            header.style.boxShadow = "none";

        }

    };

    safeOn(window, "scroll", handleHeader, {
        passive: true
    });

    handleHeader();


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    const scrollButtons = [
        ...new Set(
            $$("#scrollTop")
        )
    ];

    const updateScrollTop = () => {

        scrollButtons.forEach(button => {

            if (window.scrollY > 400) {

                button.style.display = "flex";
                button.style.justifyContent = "center";
                button.style.alignItems = "center";

            } else {

                button.style.display = "none";

            }

        });

    };

    safeOn(window, "scroll", updateScrollTop, {
        passive: true
    });

    updateScrollTop();


    scrollButtons.forEach(button => {

        safeOn(button, "click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = $$(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("active");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -80px 0px"
            }
        );

        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("active");

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navItems = $$(".nav-links a");

    const pageSections = $$(
        "section[id]"
    );

    const updateActiveNav = () => {

        if (!pageSections.length) return;

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 160;

        pageSections.forEach(section => {

            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === "#" + currentSection
            ) {
                link.classList.add("active");
            }

        });

    };

    safeOn(window, "scroll", updateActiveNav, {
        passive: true
    });

    updateActiveNav();


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

    let testimonialTimer = null;

    const showTestimonial = (index) => {

        if (!testimonials.length) return;

        currentSlide =
            (index + testimonials.length) %
            testimonials.length;

        testimonials.forEach((slide, i) => {

            slide.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    };


    const nextTestimonial = () => {

        showTestimonial(currentSlide + 1);

    };


    const previousTestimonial = () => {

        showTestimonial(currentSlide - 1);

    };


    const startTestimonialAutoPlay = () => {

        if (testimonials.length <= 1) return;

        clearInterval(testimonialTimer);

        testimonialTimer =
            setInterval(
                nextTestimonial,
                5000
            );

    };


    const stopTestimonialAutoPlay = () => {

        clearInterval(testimonialTimer);

    };


    safeOn(
        nextButton,
        "click",
        () => {

            nextTestimonial();
            startTestimonialAutoPlay();

        }
    );


    safeOn(
        previousButton,
        "click",
        () => {

            previousTestimonial();
            startTestimonialAutoPlay();

        }
    );


    if (testimonials.length) {

        showTestimonial(0);
        startTestimonialAutoPlay();

    }


    /* =====================================================
       PAUSE SLIDER ON HOVER
    ===================================================== */

    const testimonialArea =
        $(".testimonial-slider");

    safeOn(
        testimonialArea,
        "mouseenter",
        stopTestimonialAutoPlay
    );

    safeOn(
        testimonialArea,
        "mouseleave",
        startTestimonialAutoPlay
    );


    /* =====================================================
       CONTACT FORM
    ===================================================== */

    const contactForm =
        $("#contactForm");

    const contactName =
        $("#name");

    const contactEmail =
        $("#email");

    const contactPhone =
        $("#phone");

    const contactMessage =
        $("#message");

    const formMessage =
        $("#formMessage");


    const showContactMessage =
        (text, type = "red") => {

            if (!exists(formMessage)) return;

            formMessage.textContent = text;

            formMessage.style.color =
                type === "green"
                    ? "#16a34a"
                    : "#dc2626";

        };


    safeOn(
        contactPhone,
        "input",
        () => {

            contactPhone.value =
                contactPhone.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }
    );


    safeOn(
        contactForm,
        "submit",
        event => {

            event.preventDefault();

            const name =
                contactName?.value.trim() || "";

            const email =
                contactEmail?.value.trim() || "";

            const phone =
                contactPhone?.value.trim() || "";

            const message =
                contactMessage?.value.trim() || "";


            if (name.length < 2) {

                showContactMessage(
                    "Please enter your name."
                );

                contactName?.focus();

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showContactMessage(
                    "Please enter a valid email."
                );

                contactEmail?.focus();

                return;

            }


            const phonePattern =
                /^[6-9][0-9]{9}$/;


            if (!phonePattern.test(phone)) {

                showContactMessage(
                    "Please enter a valid 10 digit mobile number."
                );

                contactPhone?.focus();

                return;

            }


            if (message.length < 10) {

                showContactMessage(
                    "Message should be at least 10 characters."
                );

                contactMessage?.focus();

                return;

            }


            showContactMessage(
                "✅ Message ready! We will contact you soon.",
                "green"
            );


            // Save contact inquiry locally
            const inquiry = {

                name,
                email,
                phone,
                message,

                createdAt:
                    new Date().toISOString()

            };


            try {

                const oldInquiries =
                    JSON.parse(
                        localStorage.getItem(
                            "sanjayWaterInquiries"
                        ) || "[]"
                    );


                oldInquiries.push(inquiry);


                localStorage.setItem(
                    "sanjayWaterInquiries",
                    JSON.stringify(oldInquiries)
                );

            } catch (error) {

                console.warn(
                    "Could not save inquiry:",
                    error
                );

            }


            contactForm.reset();


            setTimeout(() => {

                if (exists(formMessage)) {
                    formMessage.textContent = "";
                }

            }, 5000);

        }
    );


    /* =====================================================
       GALLERY IMAGE HOVER
    ===================================================== */

    const galleryImages =
        $$(".gallery img");


    galleryImages.forEach(image => {

        safeOn(
            image,
            "mouseenter",
            () => {

                image.style.transform =
                    "scale(1.05)";

            }
        );


        safeOn(
            image,
            "mouseleave",
            () => {

                image.style.transform =
                    "scale(1)";

            }
        );

    });


    /* =====================================================
       IMAGE LIGHTBOX
    ===================================================== */

    const lightbox =
        $("#lightbox");

    const lightboxImage =
        $("#lightboxImage");

    const lightboxClose =
        $("#lightboxClose");


    const openLightbox =
        (image) => {

            if (
                !exists(lightbox) ||
                !exists(lightboxImage) ||
                !exists(image)
            ) {
                return;
            }


            const source =
                image.currentSrc ||
                image.src;


            if (!source) return;


            lightboxImage.src = source;

            lightboxImage.alt =
                image.alt ||
                "Sanjay Water Gallery";


            lightbox.classList.add("active");

            lightbox.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        };


    const closeLightbox = () => {

        if (!exists(lightbox)) return;


        lightbox.classList.remove("active");

        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    };


    galleryImages.forEach(image => {

        safeOn(
            image,
            "click",
            () => openLightbox(image)
        );

    });


    safeOn(
        lightboxClose,
        "click",
        closeLightbox
    );


    safeOn(
        lightbox,
        "click",
        event => {

            if (
                event.target === lightbox
            ) {
                closeLightbox();
            }

        }
    );


    /* =====================================================
       ORDER SYSTEM
    ===================================================== */

    const orderModal =
        $("#orderModal");

    const closeOrderButton =
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

    const openOrderModal =
        (product = "") => {

            if (!exists(orderModal)) return;


            orderModal.classList.add("active");

            orderModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";


            if (
                exists(orderProduct) &&
                product
            ) {

                orderProduct.value =
                    product;

            }


            if (exists(orderMessage)) {

                orderMessage.textContent = "";

            }


            // Focus product after animation
            setTimeout(() => {

                if (exists(orderProduct)) {

                    orderProduct.focus();

                }

            }, 150);

        };


    /* =====================================================
       CLOSE ORDER MODAL
    ===================================================== */

    const closeOrderModal = () => {

        if (!exists(orderModal)) return;


        orderModal.classList.remove("active");

        orderModal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.style.overflow =
            "";

    };


    /* =====================================================
       PRODUCT ORDER BUTTONS
    ===================================================== */

    orderButtons.forEach(button => {

        safeOn(
            button,
            "click",
            () => {

                const product =
                    button.getAttribute(
                        "data-product"
                    ) || "";


                openOrderModal(product);

            }
        );

    });


    /* =====================================================
       CTA ORDER BUTTON
    ===================================================== */

    const ctaOrderButton =
        $("#ctaOrderBtn");


    safeOn(
        ctaOrderButton,
        "click",
        () => {

            openOrderModal();

        }
    );


    /* =====================================================
       FOOTER ORDER BUTTON
    ===================================================== */

    const footerOrderButton =
        $("#footerOrderBtn");


    safeOn(
        footerOrderButton,
        "click",
        () => {

            openOrderModal();

        }
    );


    /* =====================================================
       CLOSE ORDER BUTTON
    ===================================================== */

    safeOn(
        closeOrderButton,
        "click",
        closeOrderModal
    );


    /* =====================================================
       CLOSE ORDER ON OUTSIDE CLICK
    ===================================================== */

    safeOn(
        orderModal,
        "click",
        event => {

            if (
                event.target === orderModal
            ) {

                closeOrderModal();

            }

        }
    );


    /* =====================================================
       PHONE NUMBER FILTER
    ===================================================== */

    safeOn(
        orderPhone,
        "input",
        () => {

            orderPhone.value =
                orderPhone.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }
    );


    /* =====================================================
       ORDER MESSAGE
    ===================================================== */

    const showOrderMessage =
        (text, type = "red") => {

            if (!exists(orderMessage)) return;


            orderMessage.textContent =
                text;


            orderMessage.style.color =
                type === "green"
                    ? "#16a34a"
                    : "#dc2626";

        };


    /* =====================================================
       ORDER ID GENERATOR
    ===================================================== */

    const generateOrderID = () => {

        const date =
            new Date();


        const datePart =
            String(
                date.getDate()
            ).padStart(2, "0") +
            String(
                date.getMonth() + 1
            ).padStart(2, "0");


        const randomPart =
            Math.floor(
                1000 + Math.random() * 9000
            );


        return (
            "SW-" +
            datePart +
            "-" +
            randomPart
        );

    };


    /* =====================================================
       ORDER FORM SUBMIT
    ===================================================== */

    let orderSubmitting = false;


    safeOn(
        orderForm,
        "submit",
        event => {

            event.preventDefault();


            if (orderSubmitting) {
                return;
            }


            const product =
                orderProduct?.value.trim() || "";


            const quantity =
                Number(
                    orderQuantity?.value
                );


            const name =
                orderName?.value.trim() || "";


            const phone =
                orderPhone?.value.trim() || "";


            const address =
                orderAddress?.value.trim() || "";


            const payment =
                $(
                    'input[name="paymentMethod"]:checked',
                    orderForm
                );


            /* -----------------------------------------
               PRODUCT
            ----------------------------------------- */

            if (!product) {

                showOrderMessage(
                    "Please select a water product."
                );

                orderProduct?.focus();

                return;

            }


            /* -----------------------------------------
               QUANTITY
            ----------------------------------------- */

            if (
                !Number.isFinite(quantity) ||
                quantity < 1 ||
                quantity > 999
            ) {

                showOrderMessage(
                    "Please enter a valid quantity."
                );

                orderQuantity?.focus();

                return;

            }


            /* -----------------------------------------
               NAME
            ----------------------------------------- */

            if (name.length < 2) {

                showOrderMessage(
                    "Please enter your full name."
                );

                orderName?.focus();

                return;

            }


            /* -----------------------------------------
               PHONE
            ----------------------------------------- */

            const phonePattern =
                /^[6-9][0-9]{9}$/;


            if (!phonePattern.test(phone)) {

                showOrderMessage(
                    "Please enter a valid 10 digit mobile number."
                );

                orderPhone?.focus();

                return;

            }


            /* -----------------------------------------
               ADDRESS
            ----------------------------------------- */

            if (address.length < 10) {

                showOrderMessage(
                    "Please enter your complete delivery address."
                );

                orderAddress?.focus();

                return;

            }


            /* -----------------------------------------
               PAYMENT
            ----------------------------------------- */

            const paymentMethod =
                payment
                    ? payment.value
                    : "Cash on Delivery";


            /* -----------------------------------------
               CREATE ORDER
            ----------------------------------------- */

            const orderID =
                generateOrderID();


            const order = {

                orderId: orderID,

                product: product,

                quantity: quantity,

                customerName: name,

                phone: phone,

                address: address,

                paymentMethod:
                    paymentMethod,

                status: "Pending",

                createdAt:
                    new Date().toISOString()

            };


            /* -----------------------------------------
               SAVE ORDER LOCALLY
               UNTIL DATABASE IS CONNECTED
            ----------------------------------------- */

            try {

                const previousOrders =
                    JSON.parse(
                        localStorage.getItem(
                            "sanjayWaterOrders"
                        ) || "[]"
                    );


                previousOrders.push(order);


                localStorage.setItem(
                    "sanjayWaterOrders",
                    JSON.stringify(
                        previousOrders
                    )
                );

            } catch (error) {

                console.warn(
                    "Local order storage failed:",
                    error
                );

            }


            /* -----------------------------------------
               BUTTON LOADING
            ----------------------------------------- */

            const submitButton =
                $(".order-submit", orderForm);


            orderSubmitting = true;


            if (exists(submitButton)) {

                submitButton.disabled = true;

                submitButton.dataset.originalText =
                    submitButton.innerHTML;


                submitButton.innerHTML =
                    '<i class="fa-solid fa-spinner fa-spin"></i> Processing...';

            }


            /* -----------------------------------------
               SUCCESS
            ----------------------------------------- */

            showOrderMessage(
                "✅ Order placed successfully! Order ID: " +
                orderID,
                "green"
            );


            console.log(
                "%c SANJAY WATER ORDER ",
                "background:#063B5C;color:white;font-weight:bold;padding:6px;",
                order
            );


            /* -----------------------------------------
               SUCCESS CLEANUP
            ----------------------------------------- */

            setTimeout(() => {

                if (exists(orderForm)) {
                    orderForm.reset();
                }


                // Restore default quantity
                if (exists(orderQuantity)) {

                    orderQuantity.value = "1";

                }


                if (exists(submitButton)) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        submitButton.dataset.originalText ||
                        '<i class="fa-solid fa-check"></i> Confirm Order';

                }


                orderSubmitting = false;


                closeOrderModal();


            }, 2200);

        }
    );


    /* =====================================================
       ESC KEY
    ===================================================== */

    safeOn(
        document,
        "keydown",
        event => {

            if (event.key !== "Escape") {
                return;
            }


            // Close mobile menu
            if (
                exists(navLinks) &&
                navLinks.classList.contains("active")
            ) {

                navLinks.classList.remove(
                    "active"
                );

                hamburger?.classList.remove(
                    "active"
                );

            }


            // Close order modal
            if (
                exists(orderModal) &&
                orderModal.classList.contains("active")
            ) {

                closeOrderModal();

            }


            // Close lightbox
            if (
                exists(lightbox) &&
                lightbox.classList.contains("active")
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const currentYear =
        $("#currentYear");


    if (exists(currentYear)) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       IMAGE FALLBACK
       Prevent broken images from looking ugly
    ===================================================== */

    $$("img").forEach(image => {

        safeOn(
            image,
            "error",
            () => {

                image.style.opacity = "0.5";

                console.warn(
                    "Image failed to load:",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       ORDER FORM SMART UX
    ===================================================== */

    safeOn(
        orderName,
        "input",
        () => {

            // Remove leading spaces
            orderName.value =
                orderName.value.replace(
                    /^\s+/,
                    ""
                );

        }
    );


    safeOn(
        orderAddress,
        "input",
        () => {

            // Remove excessive spaces at start
            orderAddress.value =
                orderAddress.value.replace(
                    /^\s+/,
                    ""
                );

        }
    );


    /* =====================================================
       RESTORE LAST ORDER INFORMATION
       Helps customer reorder faster
    ===================================================== */

    const restoreCustomerInfo = () => {

        try {

            const orders =
                JSON.parse(
                    localStorage.getItem(
                        "sanjayWaterOrders"
                    ) || "[]"
                );


            if (!orders.length) return;


            const lastOrder =
                orders[orders.length - 1];


            if (
                exists(orderName) &&
                !orderName.value
            ) {

                orderName.value =
                    lastOrder.customerName || "";

            }


            if (
                exists(orderPhone) &&
                !orderPhone.value
            ) {

                orderPhone.value =
                    lastOrder.phone || "";

            }


            if (
                exists(orderAddress) &&
                !orderAddress.value
            ) {

                orderAddress.value =
                    lastOrder.address || "";

            }

        } catch (error) {

            console.warn(
                "Could not restore previous order:",
                error
            );

        }

    };


    /* =====================================================
       PRODUCT SELECTION UX
    ===================================================== */

    safeOn(
        orderProduct,
        "change",
        () => {

            if (!exists(orderProduct)) {
                return;
            }


            if (orderProduct.value) {

                orderProduct.style.borderColor =
                    "#16a34a";

            } else {

                orderProduct.style.borderColor =
                    "";

            }

        }
    );


    /* =====================================================
       ORDER QUANTITY UX
    ===================================================== */

    safeOn(
        orderQuantity,
        "input",
        () => {

            if (!exists(orderQuantity)) {
                return;
            }


            let value =
                Number(
                    orderQuantity.value
                );


            if (!Number.isFinite(value)) {
                value = 1;
            }


            if (value < 1) {
                value = 1;
            }


            if (value > 999) {
                value = 999;
            }


            orderQuantity.value =
                value;

        }
    );


    /* =====================================================
       PAGE LOAD ANIMATION
    ===================================================== */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "loaded"
            );


            // Re-check reveal elements
            revealElements.forEach(
                element => {

                    const rect =
                        element.getBoundingClientRect();


                    if (
                        rect.top <
                        window.innerHeight - 50
                    ) {

                        element.classList.add(
                            "active"
                        );

                    }

                }
            );

        }
    );


    /* =====================================================
       PREVENT DOUBLE TAP ON ORDER BUTTON
    ===================================================== */

    orderButtons.forEach(button => {

        let locked = false;


        safeOn(
            button,
            "click",
            () => {

                if (locked) return;


                locked = true;


                setTimeout(() => {

                    locked = false;

                }, 500);

            }
        );

    });


    /* =====================================================
       ONLINE / OFFLINE STATUS
    ===================================================== */

    const updateConnectionStatus = () => {

        if (!navigator.onLine) {

            console.warn(
                "Sanjay Water: You are currently offline."
            );

        } else {

            console.log(
                "Sanjay Water: Connection restored."
            );

        }

    };


    safeOn(
        window,
        "online",
        updateConnectionStatus
    );


    safeOn(
        window,
        "offline",
        updateConnectionStatus
    );


    /* =====================================================
       FINAL INITIALIZATION
    ===================================================== */

    restoreCustomerInfo();


    console.log(
        "%c💧 SANJAY WATER",
        "color:#0077B6;font-size:24px;font-weight:800;"
    );


    console.log(
        "%cWebsite JavaScript initialized successfully.",
        "color:#16a34a;font-size:14px;font-weight:600;"
    );


    console.log(
        "%cOrder System: READY",
        "color:#063B5C;font-size:14px;font-weight:700;"
    );

});