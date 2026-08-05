document.addEventListener("DOMContentLoaded", () => {
    const carouselSelectors = [
        ".services-grid",
        ".problem-grid",
        ".trust-grid",
        ".process-grid",
        ".service-detail-grid",
        ".service-summary-grid",
        ".popular-services-grid",
        ".about-values-grid",
        ".contact-details"
    ];

    const carousels = document.querySelectorAll(carouselSelectors.join(","));

    carousels.forEach((carousel, index) => {
        if (carousel.dataset.carouselReady === "true") {
            return;
        }

        carousel.dataset.carouselReady = "true";

        const controls = document.createElement("div");
        controls.className = "mobile-carousel-controls";

        const previousButton = document.createElement("button");
        previousButton.type = "button";
        previousButton.className = "mobile-carousel-button";
        previousButton.setAttribute("aria-label", "View previous card");
        previousButton.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';

        const nextButton = document.createElement("button");
        nextButton.type = "button";
        nextButton.className = "mobile-carousel-button";
        nextButton.setAttribute("aria-label", "View next card");
        nextButton.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';

        controls.append(previousButton, nextButton);
        carousel.insertAdjacentElement("afterend", controls);

        const getScrollAmount = () => {
            const firstCard = carousel.firstElementChild;

            if (!firstCard) {
                return carousel.clientWidth;
            }

            const styles = window.getComputedStyle(carousel);
            const gap = Number.parseFloat(styles.columnGap) || 16;

            return firstCard.getBoundingClientRect().width + gap;
        };

        const updateButtons = () => {
            const maximumScroll =
                carousel.scrollWidth - carousel.clientWidth;

            previousButton.disabled = carousel.scrollLeft <= 5;
            nextButton.disabled =
                carousel.scrollLeft >= maximumScroll - 5;
        };

        previousButton.addEventListener("click", () => {
            carousel.scrollBy({
                left: -getScrollAmount(),
                behavior: "smooth"
            });
        });

        nextButton.addEventListener("click", () => {
            carousel.scrollBy({
                left: getScrollAmount(),
                behavior: "smooth"
            });
        });

        carousel.addEventListener("scroll", updateButtons, {
            passive: true
        });

        window.addEventListener("resize", updateButtons);

        updateButtons();
    });
});