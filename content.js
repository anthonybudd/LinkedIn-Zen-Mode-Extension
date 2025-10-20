(function () {
    'use strict';

    function hideLinkedInElements() {

        // Hide elements with aria-label="LinkedIn News"
        const newsElements = document.querySelectorAll('[aria-label="LinkedIn News"]');
        newsElements.forEach(element => element.style.display = 'none');

        // Hide all .artdeco-card inside [aria-label="Side Bar"], except .artdeco-card.profile-card
        const sideBar = document.querySelector('[aria-label="Side Bar"]');
        if (sideBar) sideBar.querySelectorAll('.artdeco-card:not(.profile-card)').forEach(card => card.style.display = 'none');

        // Hide elements with aria-label="Main Feed"
        const mainFeedElements = document.querySelectorAll('[aria-label="Main Feed"] > .relative');
        mainFeedElements.forEach(element => element.style.display = 'none');

        // Add info div to main feed
        const infoDiv = document.createElement('div');
        infoDiv.textContent = 'Feed hidden by LinkedIn Zen Mode extension';
        infoDiv.style.textAlign = 'center';
        infoDiv.style.background = '#fff';
        infoDiv.style.color = '#333';
        infoDiv.style.padding = '12px 24px';
        infoDiv.style.borderRadius = '8px';
        infoDiv.style.boxShadow = '0 2px 8px rgba(0,0,0,0.15)';
        infoDiv.style.zIndex = '9999';
        const mainFeed = document.querySelectorAll('[aria-label="Main Feed"]');
        mainFeed.forEach(element => element.appendChild(infoDiv));
    }

    hideLinkedInElements();
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hideLinkedInElements);
    let lastUrl = location.href;

    const urlObserver = new MutationObserver(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            if (location.pathname.startsWith('/feed/')) {
                hideLinkedInElements();
            }
        }
    });

    urlObserver.observe(document, { subtree: true, childList: true });


    function addZenModeNavigationListeners() {
        ['popstate', 'pushstate', 'replacestate'].forEach(eventType => {
            window.addEventListener(eventType, () => {
                if (location.pathname.startsWith('/feed/')) {
                    hideLinkedInElements();
                }
            });
        });
    }
    addZenModeNavigationListeners();

    // To catch manual navigation using pushState/replaceState, patch them
    ['pushState', 'replaceState'].forEach(method => {
        const orig = history[method];
        history[method] = function () {
            const result = orig.apply(this, arguments);
            const event = new Event(method.toLowerCase());
            window.dispatchEvent(event);
            return result;
        };
    });
})();
