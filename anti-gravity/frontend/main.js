import './style.css';
import { router } from './src/router.js';

window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        if (e.target.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
        // Handle bubbling for icons inside links
        if (e.target.parentElement?.matches('[data-link]')) {
            e.preventDefault();
            navigateTo(e.target.parentElement.href);
        }
    });

    router();
});

export const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

