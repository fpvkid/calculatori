/**
 * CalcsFor.Life — Shared Header Component (Ultra Pro)
 * Features: Dark Mode, Deep Linking Auto-init, Breadcrumbs, Likes
 */
(function () {
    'use strict';

    try {
        // --- GOOGLE ANALYTICS (GA4) ---
        const gaScript = document.createElement('script');
        gaScript.async = true;
        gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-RWSDEYGF53';
        document.head.appendChild(gaScript);

        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-RWSDEYGF53');

        // Determine base URL
        const scripts = document.querySelectorAll('script[src]');
        let base = '/';
        for (const s of scripts) {
            const src = s.getAttribute('src');
            if (src && src.includes('shared/header.js')) {
                base = src.replace('shared/header.js', '');
                break;
            }
        }

        // Auto-inject utils.js for Deep Linking & Print
        if (!window.CFL_Utils) {
            const utilScript = document.createElement('script');
            utilScript.src = `${base}shared/utils.js`;
            utilScript.defer = true;
            document.head.appendChild(utilScript);
        }

        // --- THEME LOGIC ---
        const savedTheme = localStorage.getItem('cfl_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', savedTheme);

        const header = document.createElement('header');
        header.className = 'site-header';
        header.id = 'site-header';

        header.innerHTML = `
            <div class="container header-inner">
                <a href="${base}" class="logo" id="logo">
                    <span class="logo-icon">🧮</span>
                    <span class="logo-text">Calcs<span class="logo-accent">For</span>Life</span>
                </a>
                <nav class="main-nav" id="main-nav" aria-label="Main navigation">
                    <ul>
                        <li><a href="${base}#calculators">Calculators</a></li>
                        <li><a href="${base}#categories">Categories</a></li>
                        <li><a href="${base}#about">About</a></li>
                    </ul>
                </nav>
                <div class="header-actions" style="display: flex; align-items: center; gap: 15px;">
                    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Switch Theme">
                        <svg class="moon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        <svg class="sun" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    </button>
                    <button class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Toggle navigation">
                        <span></span><span></span><span></span>
                    </button>
                </div>
            </div>
        `;

        document.body.insertBefore(header, document.body.firstChild);

        // --- THEME TOGGLE EVENT ---
        const themeBtn = document.getElementById('theme-toggle');
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                document.documentElement.setAttribute('data-theme', next);
                localStorage.setItem('cfl_theme', next);
            });
        }

        // --- BREADCRUMBS & LIKES ---
        // Only if NOT on homepage (homepage has cat-grid)
        const isHomepage = document.getElementById('cat-grid') || window.location.pathname === base || window.location.pathname.endsWith('index.html');
        
        if (!isHomepage) {
            const breadContainer = document.createElement('div');
            breadContainer.className = 'container';

            const pageTitle = document.querySelector('h1')?.textContent || 'Calculator';
            const pageCat = document.querySelector('meta[name="category"]')?.getAttribute('content') || 'General';
            const pageId = window.location.pathname.split('/').filter(Boolean).pop() || 'tool';

            const baseLikes = Math.abs(pageId.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0) % 30) + 15;
            let myLikes = JSON.parse(localStorage.getItem('cfl_likes') || '[]');
            const isLiked = myLikes.includes(pageId);
            const displayCount = isLiked ? baseLikes + 1 : baseLikes;

            breadContainer.innerHTML = `
                <div class="breadcrumbs-wrap">
                    <nav class="breadcrumbs" aria-label="Breadcrumbs">
                        <a href="${base}">Home</a> <span>/</span>
                        <a href="${base}#${pageCat.toLowerCase()}">${pageCat}</a> <span>/</span>
                        <span>${pageTitle}</span>
                    </nav>
                    <button class="like-btn ${isLiked ? 'active' : ''}" id="like-btn" data-id="${pageId}" data-base="${baseLikes}">
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="${isLiked ? 'var(--clr-heart)' : 'none'}" stroke="${isLiked ? 'var(--clr-heart)' : 'currentColor'}" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        <span id="like-count-display">${displayCount}</span>
                    </button>
                </div>
            `;
            header.after(breadContainer);

            const lBtn = document.getElementById('like-btn');
            if (lBtn) {
                lBtn.addEventListener('click', function() {
                    const id = this.dataset.id;
                    const baseL = parseInt(this.dataset.base);
                    let current = JSON.parse(localStorage.getItem('cfl_likes') || '[]');
                    const countEl = document.getElementById('like-count-display');
                    const svg = this.querySelector('svg');

                    if (current.includes(id)) {
                        current = current.filter(i => i !== id);
                        this.classList.remove('active');
                        countEl.textContent = baseL;
                        svg.setAttribute('fill', 'none');
                        svg.setAttribute('stroke', 'currentColor');
                    } else {
                        current.push(id);
                        this.classList.add('active');
                        countEl.textContent = baseL + 1;
                        svg.setAttribute('fill', 'var(--clr-heart)');
                        svg.setAttribute('stroke', 'var(--clr-heart)');
                    }
                    localStorage.setItem('cfl_likes', JSON.stringify(current));
                });
            }
        }

        // Mobile menu toggle
        const menuBtn = document.getElementById('mobile-menu-btn');
        const nav = document.getElementById('main-nav');
        if (menuBtn && nav) {
            menuBtn.addEventListener('click', () => {
                const isOpen = nav.classList.toggle('open');
                menuBtn.classList.toggle('active', isOpen);
                menuBtn.setAttribute('aria-expanded', isOpen);
            });
        }
    } catch (e) {
        console.warn("Header init failed", e);
    }
})();
