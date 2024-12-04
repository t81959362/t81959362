// Location Database
const locations = {
    parks: [
        {
            name: "Hyde Park",
            address: "London, W2 2UH",
            coordinates: [51.5073, -0.1657],
            type: "Park",
            amenities: ["Parking", "Toilets", "Cafe"],
            description: "Expansive park with dedicated dog walking areas and water features.",
            rating: 4.5,
            reviews: 328,
            images: ["hyde-park-1.jpg", "hyde-park-2.jpg"],
            seasonalAccess: "Year-round",
            restrictions: "Dogs must be on lead in some areas"
        },
        // More parks...
    ],
    beaches: [
        {
            name: "Camber Sands",
            address: "East Sussex, TN31 7RB",
            coordinates: [50.9331, 0.7948],
            type: "Beach",
            amenities: ["Parking", "Toilets", "Kiosk"],
            description: "Beautiful sandy beach with dunes, perfect for dog walks.",
            rating: 5.0,
            reviews: 456,
            images: ["camber-1.jpg", "camber-2.jpg"],
            seasonalAccess: "Restricted in summer months",
            restrictions: "Check tide times"
        },
        // More beaches...
    ],
    cafes: [
        {
            name: "Bark & Brew",
            address: "Manchester, M1 2WR",
            coordinates: [53.4808, -2.2426],
            type: "Cafe",
            amenities: ["Dog Treats", "Water Bowls", "Dog Beds"],
            description: "Dog-friendly cafe with special menu for four-legged friends.",
            rating: 4.0,
            reviews: 189,
            images: ["bark-brew-1.jpg", "bark-brew-2.jpg"],
            openingHours: "9am-6pm",
            dogMenu: true
        },
        // More cafes...
    ]
};

// Initialize Map
function initializeMap() {
    const map = L.map('locations-map').setView([54.5, -2], 6); // Center on UK

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add markers for all locations
    Object.values(locations).flat().forEach(location => {
        const marker = L.marker(location.coordinates)
            .bindPopup(`
                <strong>${location.name}</strong><br>
                ${location.type}<br>
                Rating: ${location.rating} ⭐<br>
                <a href="#" onclick="showLocationDetails('${location.name}')">View Details</a>
            `)
            .addTo(map);
    });

    return map;
}

// Location Search
function initializeSearch() {
    const searchInput = document.getElementById('location-search');
    const typeSelect = document.getElementById('location-type');
    const searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedType = typeSelect.value;

        const filteredLocations = Object.entries(locations)
            .filter(([type]) => selectedType === 'all' || type === selectedType)
            .flatMap(([, items]) => items)
            .filter(location => 
                location.name.toLowerCase().includes(searchTerm) ||
                location.address.toLowerCase().includes(searchTerm)
            );

        updateLocationGrid(filteredLocations);
        updateMapMarkers(filteredLocations);
    });
}

// Update Location Grid
function updateLocationGrid(filteredLocations) {
    const locationGrid = document.querySelector('.location-grid');
    locationGrid.innerHTML = filteredLocations.map(location => `
        <article class="location-card" data-type="${location.type.toLowerCase()}">
            <div class="location-image">
                <img src="images/locations/${location.images[0]}" alt="${location.name}">
                <span class="location-type">${location.type}</span>
            </div>
            <div class="location-info">
                <h3>${location.name}</h3>
                <p class="location-address">${location.address}</p>
                <div class="amenities">
                    ${location.amenities.map(amenity => `
                        <span><i class="fas fa-check"></i> ${amenity}</span>
                    `).join('')}
                </div>
                <p class="location-description">${location.description}</p>
                <div class="location-rating">
                    <div class="stars">
                        ${generateStars(location.rating)}
                    </div>
                    <span>${location.rating} (${location.reviews} reviews)</span>
                </div>
                <a href="#" class="view-details-btn" onclick="showLocationDetails('${location.name}')">View Details</a>
            </div>
        </article>
    `).join('');
}

// Generate Star Rating HTML
function generateStars(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return stars;
}

// Seasonal Recommendations
function initializeSeasonalContent() {
    const seasonTabs = document.querySelectorAll('.season-tab');
    const seasonContent = document.querySelector('.season-content');

    const seasonalData = {
        spring: {
            title: "Spring Adventures",
            locations: ["Richmond Park", "Peak District", "Cornwall Coast"],
            tips: ["Watch for ground-nesting birds", "Keep dogs on lead around livestock"]
        },
        summer: {
            title: "Summer Spots",
            locations: ["Brighton Beach (early morning/evening)", "Lake District", "Forest Trails"],
            tips: ["Avoid hot pavements", "Bring plenty of water"]
        },
        autumn: {
            title: "Autumn Walks",
            locations: ["New Forest", "Scottish Highlands", "Coastal Paths"],
            tips: ["Check for seasonal hunting", "Watch for mushrooms"]
        },
        winter: {
            title: "Winter Wanderings",
            locations: ["Snowdonia", "Urban Parks", "Dog-friendly Pubs"],
            tips: ["Keep visible in low light", "Check for ice warnings"]
        }
    };

    seasonTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const season = tab.dataset.season;
            seasonTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const data = seasonalData[season];
            seasonContent.innerHTML = `
                <h3>${data.title}</h3>
                <div class="seasonal-recommendations">
                    <div class="recommended-locations">
                        <h4>Recommended Locations</h4>
                        <ul>
                            ${data.locations.map(loc => `<li>${loc}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="seasonal-tips">
                        <h4>Seasonal Tips</h4>
                        <ul>
                            ${data.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });
    });

    // Trigger click on current season
    const currentSeason = getCurrentSeason();
    document.querySelector(`[data-season="${currentSeason}"]`).click();
}

// Get Current Season
function getCurrentSeason() {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
}

// Review System
function initializeReviewSystem() {
    const reviewForm = document.getElementById('review-form');
    const starRating = document.querySelector('.star-rating');
    let selectedRating = 0;

    // Populate location select
    const locationSelect = reviewForm.querySelector('select[name="location"]');
    Object.values(locations).flat().forEach(location => {
        const option = document.createElement('option');
        option.value = location.name;
        option.textContent = location.name;
        locationSelect.appendChild(option);
    });

    // Star rating interaction
    starRating.addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('fa-star')) {
            const rating = parseInt(e.target.dataset.rating);
            updateStarDisplay(rating);
        }
    });

    starRating.addEventListener('click', (e) => {
        if (e.target.classList.contains('fa-star')) {
            selectedRating = parseInt(e.target.dataset.rating);
        }
    });

    starRating.addEventListener('mouseleave', () => {
        updateStarDisplay(selectedRating);
    });

    // Form submission
    reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (selectedRating === 0) {
            alert('Please select a rating');
            return;
        }

        const formData = {
            location: locationSelect.value,
            review: reviewForm.querySelector('textarea[name="review"]').value,
            rating: selectedRating,
            date: new Date().toISOString()
        };

        // Here you would typically send this to a server
        addReviewToDisplay(formData);
        reviewForm.reset();
        selectedRating = 0;
        updateStarDisplay(0);
    });
}

// Update Star Display
function updateStarDisplay(rating) {
    const stars = document.querySelectorAll('.star-rating .fa-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.remove('far');
            star.classList.add('fas');
        } else {
            star.classList.remove('fas');
            star.classList.add('far');
        }
    });
}

// Add Review to Display
function addReviewToDisplay(review) {
    const recentReviews = document.querySelector('.recent-reviews');
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review-card';
    reviewElement.innerHTML = `
        <div class="review-header">
            <h4>${review.location}</h4>
            <div class="review-rating">
                ${generateStars(review.rating)}
            </div>
        </div>
        <p class="review-text">${review.review}</p>
        <p class="review-date">${new Date(review.date).toLocaleDateString()}</p>
    `;
    recentReviews.insertBefore(reviewElement, recentReviews.firstChild);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const map = initializeMap();
    initializeSearch();
    initializeSeasonalContent();
    initializeReviewSystem();
});
