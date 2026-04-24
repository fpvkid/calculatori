/**
 * CalcsFor.Life — Shared Footer Component (SEO Boost)
 * Features: Automatic Related Tools & Improved Branding
 */
(function () {
    'use strict';

    try {
        // Determine base URL
        const scripts = document.querySelectorAll('script[src]');
        let base = '/';
        for (const s of scripts) {
            const src = s.getAttribute('src');
            if (src && src.includes('shared/footer.js')) {
                base = src.replace('shared/footer.js', '');
                break;
            }
        }

        const footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.id = 'site-footer';
        const year = new Date().getFullYear();

        footer.innerHTML = `
            <div class="container">
                <div class="footer-grid">
                    <div class="footer-brand">
                        <a href="${base}" class="logo">
                            <span class="logo-icon">🧮</span>
                            <span class="logo-text">Calcs<span class="logo-accent">For</span><span class="logo-dot">.</span>Life</span>
                        </a>
                        <p>Specialized niche calculators for your daily life. Accurate, fast, and privacy-focused tools that run entirely in your browser.</p>
                    </div>
                    <div class="footer-links">
                        <h4>Top Tools</h4>
                        <ul>
                            <li><a href="${base}raw-dog-food-calculator/">Dog Diet</a></li>
                            <li><a href="${base}egg-boiling-timer/">Egg Timer</a></li>
                            <li><a href="${base}mortgage-calculator/">Mortgage</a></li>
                        </ul>
                    </div>
                    <div class="footer-links">
                        <h4>Support</h4>
                        <ul>
                            <li><a href="${base}privacy.html">Privacy</a></li>
                            <li><a href="${base}terms.html">Terms</a></li>
                            <li><a href="${base}contact.html">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${year} CalcsFor.Life — Part of the Niche Calc Network.</p>
                </div>
            </div>
        `;

        // Always append footer first
        document.body.appendChild(footer);

        // --- RELATED TOOLS INJECTION (Subpages only) ---
        const pageId = window.location.pathname.split('/').filter(Boolean).pop();
        const pageCat = document.querySelector('meta[name="category"]')?.getAttribute('content');

        if (pageId && pageId !== 'calculatori' && !window.location.pathname.endsWith('index.html')) {
            const related = document.createElement('section');
            related.className = 'related-tools container';
            related.style.marginTop = '60px';
            related.style.paddingTop = '60px';
            related.style.borderTop = '1px solid var(--clr-border)';

            const tools = [
                { t: 'Dog Food', s: 'raw-dog-food-calculator', c: 'Pets' },
                { t: 'Cat Calories', s: 'cat-calorie-calculator', c: 'Pets' },
                { t: 'Dog Age', s: 'dog-age-calculator', c: 'Pets' },
                { t: 'Sourdough', s: 'sourdough-hydration-calculator', c: 'Kitchen' },
                { t: 'Egg Timer', s: 'egg-boiling-timer', c: 'Kitchen' },
                { t: 'Air Fryer', s: 'air-fryer-converter', c: 'Kitchen' },
                { t: 'Mortgage', s: 'mortgage-calculator', c: 'Finance' },
                { t: 'Rent Affordability', s: 'rent-calculator', c: 'Finance' },
                { t: 'Zen Meditation', s: 'meditation-timer', c: 'Timers' },
                { t: 'Pomodoro', s: 'pomodoro-timer', c: 'Timers' },
                { t: 'Yoga Timer', s: 'yoga-timer', c: 'Timers' },
                { t: 'BMI Calc', s: 'bmi-calculator', c: 'Health' }
            ];

            let matches = tools.filter(t => t.c === pageCat && t.s !== pageId).slice(0, 3);
            if (matches.length < 3) {
                const extras = tools.filter(t => t.s !== pageId && !matches.includes(t))
                                    .sort(() => 0.5 - Math.random())
                                    .slice(0, 3 - matches.length);
                matches = [...matches, ...extras];
            }
            
            if (matches.length > 0) {
                related.innerHTML = `
                    <h2 style="font-size: 1.5rem; margin-bottom: 30px;">You might also like</h2>
                    <div class="related-tools-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin-bottom: 60px;">
                        ${matches.map(m => `
                            <a href="${base}${m.s}/" class="surface-card" style="text-decoration:none; display:block; padding:25px; transition: all 0.3s ease; border: 1px solid var(--clr-border); border-radius: var(--radius-lg);">
                                <h4 style="margin:0; color:var(--clr-accent); font-size: 1.1rem;">${m.t}</h4>
                                <p style="margin:8px 0 0; font-size:0.85rem; color:var(--clr-text-muted);">Explore Tool &rarr;</p>
                            </a>
                        `).join('')}
                    </div>
                `;
                document.body.insertBefore(related, footer);
            }
        }

        // --- SAVE RESULT BUTTON (Injected into Result Cards) ---
        const resultCard = document.querySelector('.result-card');
        if (resultCard) {
            const saveBtn = document.createElement('button');
            saveBtn.className = 'btn btn-outline btn-sm save-btn no-print';
            saveBtn.style.marginTop = '20px';
            saveBtn.innerHTML = `
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:8px; vertical-align:middle;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Save Result (PDF)
            `;
            saveBtn.onclick = () => window.print();
            resultCard.appendChild(saveBtn);
        }

    } catch (e) {
        console.error("Footer init failed", e);
    }
})();
