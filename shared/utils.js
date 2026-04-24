/**
 * CalcsFor.Life — Shared Utility Functions
 * Features: URL State Sync, Print PDF, and more.
 */
const CFL_Utils = {
    // 1. Sync all input values to URL query parameters
    initUrlSync: function() {
        const inputs = document.querySelectorAll('input, select, textarea');
        
        // Load from URL on init
        const params = new URLSearchParams(window.location.search);
        params.forEach((value, key) => {
            const el = document.getElementById(key) || document.getElementsByName(key)[0];
            if (el) {
                if (el.type === 'checkbox' || el.type === 'radio') {
                    el.checked = (value === 'true' || value === el.value);
                } else {
                    el.value = value;
                }
                // Trigger change event to update calculation
                el.dispatchEvent(new Event('input'));
                el.dispatchEvent(new Event('change'));
            }
        });

        // Save to URL on change
        inputs.forEach(el => {
            el.addEventListener('change', () => this.updateUrl());
            el.addEventListener('input', () => this.updateUrl());
        });
    },

    updateUrl: function() {
        const params = new URLSearchParams();
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(el => {
            const id = el.id || el.name;
            if (!id || el.type === 'password' || el.type === 'file') return;
            
            if (el.type === 'checkbox') {
                if (el.checked) params.set(id, 'true');
            } else if (el.type === 'radio') {
                if (el.checked) params.set(id, el.value);
            } else if (el.value) {
                params.set(id, el.value);
            }
        });
        const newUrl = `${window.location.pathname}?${params.toString()}`;
        window.history.replaceState({}, '', newUrl);
    },

    // 2. Print result only
    printResult: function(elementId = 'result-card') {
        const el = document.getElementById(elementId);
        if (!el) {
            window.print();
            return;
        }
        window.print();
    }
};

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    CFL_Utils.initUrlSync();
});
