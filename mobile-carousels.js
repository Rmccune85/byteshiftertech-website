document.addEventListener("DOMContentLoaded", () => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    const carouselSelectors = [
        ".services-grid",
        ".problem-grid",
        ".trust-grid",
        ".process-grid",
        ".service-detail-grid",
        ".service-summary-grid",
        ".popular-services-grid",
        ".about-values-grid"
    ];

    const carouselElements = document.querySelectorAll(
        carouselSelectors.join(",")
    );

    const carouselRecords = new Map();

    function enableCarousel(carousel, index) {
        if (carouselRecords.has(carousel)) {
            return;
        }

        const cards = Array.from(carousel.children);

        if (cards.length < 2) {
            return;
        }

        const wrapper = document.createElement("div");
        wrapper.className = "swiper-wrapper";

        cards.forEach((card) => {
            card.classList.add("swiper-slide");
            wrapper.appendChild(card);
        });

        carousel.appendChild(wrapper);
        carousel.classList.add("swiper", "mobile-card-swiper");

        const controls = document.createElement("div");
        controls.className = "mobile-carousel-controls";

        const previousButton = document.createElement("button");
        previousButton.type = "button";
        previousButton.className = "mobile-carousel-button";
        previousButton.setAttribute("aria-label", "View previous card");
        previousButton.innerHTML =
            '<i class="fa-solid fa-chevron-left"></i>';

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "mobile-carousel-button";
        nextButton.setAttribute("aria-label", "View next card");
        nextButton.innerHTML =
            '<i class="fa-solid fa-chevron-right"></i>';

        controls.append(previousButton, nextButton);
        carousel.insertAdjacentElement("afterend", controls);

        const swiper = new Swiper(carousel, {
            slidesPerView: 1.12,
            slidesPerGroup: 1,
            spaceBetween: 16,
            loop: true,
            speed: 350,
            grabCursor: true,
            simulateTouch: true,
            allowTouchMove: true,

            navigation: {
                prevEl: previousButton,
                nextEl: nextButton
            }
        });

        carouselRecords.set(carousel, {
            swiper,
            wrapper,
            controls,
            cards
        });
    }

    function disableCarousel(carousel) {
        const record = carouselRecords.get(carousel);

        if (!record) {
            return;
        }

        record.swiper.destroy(true, true);

        record.cards.forEach((card) => {
            card.classList.remove("swiper-slide");
            card.removeAttribute("style");
            carousel.appendChild(card);
        });

        record.wrapper.remove();
        record.controls.remove();

        carousel.classList.remove(
            "swiper",
            "mobile-card-swiper",
            "swiper-initialized",
            "swiper-horizontal",
            "swiper-backface-hidden"
        );

        carousel.removeAttribute("style");

        carouselRecords.delete(carousel);
    }

    function updateCarousels() {
        carouselElements.forEach((carousel, index) => {
            if (mobileQuery.matches) {
                enableCarousel(carousel, index);
            } else {
                disableCarousel(carousel);
            }
        });
    }

    updateCarousels();

    mobileQuery.addEventListener("change", updateCarousels);
});