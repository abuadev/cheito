export default function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-toggle');
    const closeBtn = document.querySelector('.menu-close');
    const navOverlay = document.querySelector('.nav-overlay');
    const body = document.body;

    function toggleMenu() {
        const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';

        if (!isExpanded) {
            // Open Menu
            menuBtn.setAttribute('aria-expanded', 'true');
            navOverlay.classList.add('is-open');
            body.style.overflow = 'hidden'; // Lock scroll
        } else {
            // Close Menu
            menuBtn.setAttribute('aria-expanded', 'false');
            navOverlay.classList.remove('is-open');
            body.style.overflow = ''; // Unlock scroll
        }
    }

    // Event Listeners
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
    if (closeBtn) closeBtn.addEventListener('click', toggleMenu);

    // Close when clicking a link
    const navLinks = document.querySelectorAll('.nav-overlay a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only close if it's currently open (safety check)
            if (document.querySelector('.nav-overlay.is-open')) {
                toggleMenu();
            }
        });
    });
}

// Initial run
initMobileMenu();

// Support View Transitions if added later
document.addEventListener('astro:after-swap', initMobileMenu);
