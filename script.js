// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });

    // Featured Posts Data
    const featuredPosts = [
        {
            title: "10 Must-Know Tips for First-Time Dog Owners",
            excerpt: "Essential advice to help you start your journey as a new dog parent.",
            image: "images/first-time-owner.jpg",
            category: "Guides"
        },
        {
            title: "The 5 Best Durable Chew Toys for Heavy Chewers",
            excerpt: "Find the perfect toy that can withstand your dog's powerful jaws.",
            image: "images/chew-toys.jpg",
            category: "Reviews"
        },
        {
            title: "Top Dog-Friendly Beaches in Cornwall",
            excerpt: "Discover the most beautiful coastal spots to explore with your furry friend.",
            image: "images/beach.jpg",
            category: "Locations"
        }
    ];

    // Populate Featured Posts
    const postGrid = document.querySelector('.post-grid');
    if (postGrid) {
        featuredPosts.forEach(post => {
            const article = document.createElement('article');
            article.className = 'post-card';
            article.innerHTML = `
                <div class="post-image">
                    <img src="${post.image}" alt="${post.title}">
                    <span class="category">${post.category}</span>
                </div>
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="#" class="read-more">Read More</a>
                </div>
            `;
            postGrid.appendChild(article);
        });
    }

    // Gallery Images
    const galleryImages = [
        'images/gallery1.jpg',
        'images/gallery2.jpg',
        'images/gallery3.jpg',
        'images/gallery4.jpg',
        'images/gallery5.jpg',
        'images/gallery6.jpg'
    ];

    // Populate Gallery
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        galleryImages.forEach(image => {
            const div = document.createElement('div');
            div.className = 'gallery-item';
            div.innerHTML = `<img src="${image}" alt="Dog Gallery Image">`;
            galleryGrid.appendChild(div);
        });
    }

    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Here you would typically send this to your backend
            alert('Thanks for subscribing! We\'ll be in touch soon.');
            newsletterForm.reset();
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.category-card, .post-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
});

// Product Review Rating System
function initializeRatingSystem() {
    const ratingElements = document.querySelectorAll('.rating');
    ratingElements.forEach(rating => {
        const score = parseFloat(rating.textContent);
        if (score >= 4.5) {
            rating.classList.add('excellent');
        } else if (score >= 4.0) {
            rating.classList.add('good');
        } else {
            rating.classList.add('average');
        }
    });
}

// Product Comparison Tool
function initializeComparisonTool() {
    const compareButton = document.querySelector('.tool-btn');
    if (compareButton) {
        compareButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Implementation for comparison tool
            alert('Product comparison feature coming soon!');
        });
    }
}

// Price Tracking
function initializePriceTracker() {
    const trackButton = document.querySelector('.tool-btn:last-child');
    if (trackButton) {
        trackButton.addEventListener('click', (e) => {
            e.preventDefault();
            // Implementation for price tracking
            alert('Price tracking feature coming soon!');
        });
    }
}

// Resource Downloads
function initializeDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const resourceName = e.target.parentElement.querySelector('h3').textContent;
            // Implementation for download tracking
            alert(`Downloading ${resourceName}...`);
        });
    });
}

// Article Search and Filter
function initializeSearch() {
    const articleCards = document.querySelectorAll('.article-card');
    if (articleCards.length > 0) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Search articles..." class="search-input">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        `;
        
        const firstSection = document.querySelector('.guide-categories, .review-categories');
        if (firstSection) {
            firstSection.insertBefore(searchContainer, firstSection.firstChild);
            
            const searchInput = searchContainer.querySelector('.search-input');
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                articleCards.forEach(card => {
                    const title = card.querySelector('h3').textContent.toLowerCase();
                    const description = card.querySelector('p').textContent.toLowerCase();
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }
}

// Affiliate Link Tracking
function initializeAffiliateTracking() {
    const affiliateLinks = document.querySelectorAll('.buy-now');
    affiliateLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Implementation for affiliate link tracking
            const productName = link.closest('.product-card').querySelector('h3').textContent;
            console.log(`Affiliate link clicked for: ${productName}`);
        });
    });
}

// Newsletter Form Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function enhanceNewsletterForm() {
    const form = document.querySelector('.newsletter-form');
    if (form) {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button');
        
        emailInput.addEventListener('input', () => {
            if (validateEmail(emailInput.value)) {
                emailInput.classList.remove('invalid');
                emailInput.classList.add('valid');
                submitButton.disabled = false;
            } else {
                emailInput.classList.remove('valid');
                emailInput.classList.add('invalid');
                submitButton.disabled = true;
            }
        });
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeRatingSystem();
    initializeComparisonTool();
    initializePriceTracker();
    initializeDownloads();
    initializeSearch();
    initializeAffiliateTracking();
    enhanceNewsletterForm();
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add loading animation for images
function handleImageLoading() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
        
        if (img.complete) {
            img.classList.add('loaded');
        }
    });
}

// Initialize image loading handling
window.addEventListener('load', handleImageLoading);

// Add scroll-based navbar styling
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.main-nav');
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});
