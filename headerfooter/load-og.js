// load-og.js
async function loadOGMeta(pageData = {}) {
    const defaults = {
        pageTitle: 'MNCHS Senior Scouting',
        pageDesc: 'Premier senior scouting program at MNCHS 🦅',
        pageImage: 'og-default.jpg',
        pageUrl: ''
    };
    
    const data = { ...defaults, ...pageData };
    
    // Fetch OG template
    const response = await fetch('/includes/og-meta.html');
    let ogHTML = await response.text();
    
    // Replace placeholders
    ogHTML = ogHTML
        .replace(/<%- pageTitle %>/g, data.pageTitle)
        .replace(/<%- pageDesc %>/g, data.pageDesc)
        .replace(/<%- pageImage %>/g, data.pageImage)
        .replace(/<%- pageUrl %>/g, data.pageUrl);
    
    // Insert into head
    document.head.insertAdjacentHTML('afterbegin', ogHTML);
}

// Page-specific data
const pageOGData = {
    '/memo.html': {
        pageTitle: '📄 BOR Results & Memos | MNCHS Senior Scouting',
        pageDesc: 'Latest Board of Review results and official memorandums',
        pageImage: 'memo-og.jpg'
    },
    '/index.html': {
        pageTitle: '🏠 MNCHS Senior Scouting Home',
        pageDesc: 'Join our premier senior scouting program!',
        pageImage: 'home-og.jpg'
    }
    // Add more pages...
};

// Load on page load
window.addEventListener('load', () => {
    const currentPage = window.location.pathname;
    loadOGMeta(pageOGData[currentPage] || {});
});