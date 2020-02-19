class FbAdblocker {

    lastScrollPos = 0;

    initialize() {
        document.addEventListener("scroll", () => this.onDocScroll());
    }

    onDocScroll() {
        const currScrollPos = document.scrollingElement.scrollTop;

        if (Math.abs(currScrollPos - this.lastScrollPos) < FbAdblocker.SCROLL_MIN) {
            return;
        }

        this.lastScrollPos = currScrollPos;
        this.checkForAds();
        this.checkForSuggestedForYou();
    }

    checkForAds() {
        const buttons = document.querySelectorAll("a[role='button']");
        buttons.forEach(el => el.dispatchEvent(new Event("mouseover")));

        const adButtons = document.querySelectorAll("a[href='/ads/about']");
        adButtons.forEach(el => {
            const feedEl = el.closest("[data-insertion-position]");
            //const feedEl = el.closest(".userContentWrapper");

            if (feedEl) {
                feedEl.style.display = "none !important";
                feedEl.classList.add("fb-ad-block");
                feedEl.setAttribute("data-fb-adblock", "true");
            }
        });
    }

    checkForSuggestedForYou() {
        document.querySelectorAll("div").forEach(el => {
            if (el.innerText == "Suggested for you") {
                const feedEl = el.closest("[data-insertion-position]");

                if (feedEl) {
                    feedEl.style.display = "none !important";
                    feedEl.classList.add("fb-ad-block");
                    feedEl.setAttribute("data-fb-adblock", "true");
                }
            }
        });
    }

}

FbAdblocker.SCROLL_MIN = 100;

(function () {
    new FbAdblocker().initialize();

})();