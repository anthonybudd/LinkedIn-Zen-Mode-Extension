// Content script to hide LinkedIn elements
(function () {
    'use strict';

    // Function to hide LinkedIn elements
    function hideLinkedInElements() {
        // Hide elements with class 'scaffold-finite-scroll'
        const scaffoldElements = document.querySelectorAll('.scaffold-finite-scroll');
        scaffoldElements.forEach(element => {
            element.style.display = 'none';
        });

        // Hide elements with aria-label="LinkedIn News"
        const newsElements = document.querySelectorAll('[aria-label="LinkedIn News"]');
        newsElements.forEach(element => {
            element.style.display = 'none';
        });
    }

    // Hide elements when the page loads
    hideLinkedInElements();

    // Use MutationObserver to watch for dynamically added elements
    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type === 'childList') {
                // Check if any added nodes match our selectors
                mutation.addedNodes.forEach(function (node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Check if the added node itself matches our selectors
                        if (node.classList && node.classList.contains('scaffold-finite-scroll')) {
                            node.style.display = 'none';
                        }
                        if (node.getAttribute && node.getAttribute('aria-label') === 'LinkedIn News') {
                            node.style.display = 'none';
                        }
                        // Check if any child elements match our selectors
                        const scaffoldChildren = node.querySelectorAll && node.querySelectorAll('.scaffold-finite-scroll');
                        if (scaffoldChildren) {
                            scaffoldChildren.forEach(child => {
                                child.style.display = 'none';
                            });
                        }
                        const newsChildren = node.querySelectorAll && node.querySelectorAll('[aria-label="LinkedIn News"]');
                        if (newsChildren) {
                            newsChildren.forEach(child => {
                                child.style.display = 'none';
                            });
                        }
                    }
                });
            }
        });
    });

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also hide elements when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', hideLinkedInElements);
    }
})();
