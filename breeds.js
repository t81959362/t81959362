// Breed Database
const breeds = {
    'cavalier-king-charles-spaniel': {
        name: 'Cavalier King Charles Spaniel',
        size: 'small',
        activity: 'moderate',
        space: 'apartment',
        experience: 'beginner',
        stats: {
            weight: '5-8 kg',
            height: '30-33 cm',
            lifespan: '12-14 years',
            exercise: 60,
            grooming: 80,
            familyFriendly: 100
        },
        characteristics: {
            temperament: ['Affectionate', 'Gentle', 'Graceful'],
            training: 'Easy to train',
            shedding: 'Moderate',
            health: ['Heart issues', 'Syringomyelia']
        }
    },
    'english-cocker-spaniel': {
        name: 'English Cocker Spaniel',
        size: 'medium',
        activity: 'high',
        space: 'house',
        experience: 'intermediate',
        stats: {
            weight: '13-14.5 kg',
            height: '38-41 cm',
            lifespan: '12-14 years',
            exercise: 80,
            grooming: 80,
            familyFriendly: 90
        },
        characteristics: {
            temperament: ['Energetic', 'Merry', 'Responsive'],
            training: 'Highly trainable',
            shedding: 'Moderate to high',
            health: ['Eye problems', 'Hip dysplasia']
        }
    },
    'german-shepherd': {
        name: 'German Shepherd',
        size: 'large',
        activity: 'high',
        space: 'house',
        experience: 'experienced',
        stats: {
            weight: '30-40 kg',
            height: '55-65 cm',
            lifespan: '9-13 years',
            exercise: 90,
            grooming: 70,
            familyFriendly: 80
        },
        characteristics: {
            temperament: ['Intelligent', 'Loyal', 'Confident'],
            training: 'Highly trainable',
            shedding: 'High',
            health: ['Hip dysplasia', 'Elbow dysplasia']
        }
    }
};

// Initialize Breed Finder
function initializeBreedFinder() {
    const filters = {
        size: document.getElementById('size-filter'),
        activity: document.getElementById('activity-filter'),
        space: document.getElementById('space-filter'),
        experience: document.getElementById('experience-filter')
    };

    // Add event listeners to all filters
    Object.values(filters).forEach(filter => {
        if (filter) {
            filter.addEventListener('change', filterBreeds);
        }
    });
}

// Filter Breeds based on selected criteria
function filterBreeds() {
    const selectedSize = document.getElementById('size-filter').value;
    const selectedActivity = document.getElementById('activity-filter').value;
    const selectedSpace = document.getElementById('space-filter').value;
    const selectedExperience = document.getElementById('experience-filter').value;

    const breedCards = document.querySelectorAll('.breed-card');

    breedCards.forEach(card => {
        const breedId = card.dataset.breedId;
        const breed = breeds[breedId];

        if (!breed) return;

        const matchesFilters = (!selectedSize || breed.size === selectedSize) &&
                             (!selectedActivity || breed.activity === selectedActivity) &&
                             (!selectedSpace || breed.space === selectedSpace) &&
                             (!selectedExperience || breed.experience === selectedExperience);

        card.style.display = matchesFilters ? 'block' : 'none';
    });
}

// Initialize Category Filters
function initializeCategoryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.dataset.filter;
            filterByCategory(category);
        });
    });
}

// Filter breeds by category
function filterByCategory(category) {
    const breedCards = document.querySelectorAll('.breed-card');

    breedCards.forEach(card => {
        if (category === 'all' || card.dataset.category.includes(category)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Initialize Breed Comparison
function initializeBreedComparison() {
    const breed1Select = document.getElementById('breed1');
    const breed2Select = document.getElementById('breed2');
    const compareButton = document.getElementById('compare-btn');
    const resultsDiv = document.getElementById('comparison-results');

    // Populate breed select options
    const breedOptions = Object.entries(breeds).map(([id, breed]) => {
        return `<option value="${id}">${breed.name}</option>`;
    }).join('');

    breed1Select.innerHTML += breedOptions;
    breed2Select.innerHTML += breedOptions;

    compareButton.addEventListener('click', () => {
        const breed1 = breeds[breed1Select.value];
        const breed2 = breeds[breed2Select.value];

        if (!breed1 || !breed2) {
            alert('Please select two breeds to compare');
            return;
        }

        displayComparison(breed1, breed2);
    });
}

// Display breed comparison results
function displayComparison(breed1, breed2) {
    const resultsDiv = document.getElementById('comparison-results');
    
    resultsDiv.innerHTML = `
        <div class="comparison-table">
            <table>
                <tr>
                    <th>Characteristic</th>
                    <th>${breed1.name}</th>
                    <th>${breed2.name}</th>
                </tr>
                <tr>
                    <td>Size</td>
                    <td>${breed1.size}</td>
                    <td>${breed2.size}</td>
                </tr>
                <tr>
                    <td>Activity Level</td>
                    <td>${breed1.activity}</td>
                    <td>${breed2.activity}</td>
                </tr>
                <tr>
                    <td>Exercise Needs</td>
                    <td><div class="rating-bar"><div class="rating" style="width: ${breed1.stats.exercise}%"></div></div></td>
                    <td><div class="rating-bar"><div class="rating" style="width: ${breed2.stats.exercise}%"></div></div></td>
                </tr>
                <tr>
                    <td>Grooming Needs</td>
                    <td><div class="rating-bar"><div class="rating" style="width: ${breed1.stats.grooming}%"></div></div></td>
                    <td><div class="rating-bar"><div class="rating" style="width: ${breed2.stats.grooming}%"></div></div></td>
                </tr>
                <tr>
                    <td>Family Friendly</td>
                    <td><div class="rating-bar"><div class="rating" style="width: ${breed1.stats.familyFriendly}%"></div></div></td>
                    <td><div class="rating-bar"><div class="rating" style="width: ${breed2.stats.familyFriendly}%"></div></div></td>
                </tr>
            </table>
        </div>
    `;
}

// Initialize Cost Calculator
function initializeCostCalculator() {
    const calculatorBtn = document.querySelector('.tool-btn');
    if (calculatorBtn) {
        calculatorBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Implementation for cost calculator
            alert('Cost calculator feature coming soon!');
        });
    }
}

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeBreedFinder();
    initializeCategoryFilters();
    initializeBreedComparison();
    initializeCostCalculator();
});

// Add data attributes to breed cards
function initializeBreedCards() {
    const breedCards = document.querySelectorAll('.breed-card');
    breedCards.forEach(card => {
        const breedName = card.querySelector('h3').textContent.toLowerCase().replace(/\s+/g, '-');
        card.dataset.breedId = breedName;
    });
}

// Initialize breed cards when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeBreedCards);
