document.addEventListener('DOMContentLoaded', () => {

    // ===== THEME TOGGLE LOGIC =====
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'light' || (!savedTheme && prefersDark)) {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });

    // ===== MOBILE MENU TOGGLE =====
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // ===== CUSTOM CURSOR LOGIC =====
    const cursor = document.querySelector('.custom-cursor');
    const interactiveElements = document.querySelectorAll('a, button, .interactive-element');
    window.addEventListener('mousemove', e => {
        cursor.style.top = `${e.clientY}px`;
        cursor.style.left = `${e.clientX}px`;
    });
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
    });

    // ===== SCROLL FADE-IN ANIMATION LOGIC =====
    const fadeElements = document.querySelectorAll('.fade-in');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    fadeElements.forEach(el => fadeObserver.observe(el));

    // ===== FOOTER REVEAL ON SCROLL LOGIC =====
    const footer = document.querySelector('.bottom-footer');
    const footerTrigger = document.querySelector('#footer-trigger');

    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('is-visible');
            } else {
                footer.classList.remove('is-visible');
            }
        });
    }, {
        rootMargin: "50px"
    });

    if (footerTrigger) {
        footerObserver.observe(footerTrigger);
    }

    // ====================

    const defaultColor = getComputedStyle(cursor).backgroundColor; // Get the initial color

    // Move the cursor
    document.addEventListener('mousemove', e => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Change color when hovering footer
    footer.addEventListener('mouseenter', () => {
        cursor.style.backgroundColor = 'grey';
    });

    footer.addEventListener('mouseleave', () => {
        cursor.style.backgroundColor = defaultColor;
    });

});
