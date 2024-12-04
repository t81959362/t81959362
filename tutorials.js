// Tutorial Database
const tutorials = {
    'basic-obedience': {
        'sit-command': {
            title: "Teaching the 'Sit' Command",
            level: 'beginner',
            duration: '5:30',
            description: "Master the fundamental 'sit' command with positive reinforcement techniques.",
            videoUrl: 'videos/sit-command.mp4',
            thumbnail: 'images/tutorials/sit-command.jpg',
            steps: [
                'Start with your dog standing',
                'Hold a treat close to their nose',
                'Move the treat up and back over their head',
                'As their head tilts back, they will naturally sit',
                'Mark the behavior and reward'
            ]
        },
        // More tutorials
    },
    'house-training': {
        'potty-basics': {
            title: 'Potty Training Basics',
            level: 'beginner',
            duration: '8:15',
            description: 'Essential tips and techniques for successful house training.',
            videoUrl: 'videos/potty-training.mp4',
            thumbnail: 'images/tutorials/potty-training.jpg',
            steps: [
                'Establish a routine',
                'Choose a designated potty area',
                'Watch for signs they need to go',
                'Reward successful outdoor potty breaks',
                'Clean accidents thoroughly'
            ]
        },
        // More tutorials
    },
    'advanced-training': {
        'agility-intro': {
            title: 'Introduction to Agility Training',
            level: 'advanced',
            duration: '12:45',
            description: 'Learn the basics of agility training and course navigation.',
            videoUrl: 'videos/agility-intro.mp4',
            thumbnail: 'images/tutorials/agility.jpg',
            steps: [
                'Start with basic equipment familiarization',
                'Teach directional commands',
                'Practice jumps and tunnels',
                'Introduce contact obstacles',
                'Build simple sequences'
            ]
        },
        // More tutorials
    }
};

// Initialize Skill Level Filter
function initializeSkillFilter() {
    const levelButtons = document.querySelectorAll('.level-btn');
    const tutorialCategories = document.querySelectorAll('.tutorial-category');

    levelButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            levelButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter tutorials
            const selectedLevel = button.dataset.level;
            tutorialCategories.forEach(category => {
                if (selectedLevel === 'all' || category.dataset.level === selectedLevel) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// Initialize Video Players
function initializeVideoPlayers() {
    const playButtons = document.querySelectorAll('.play-btn');
    
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = button.closest('.tutorial-card');
            const videoContainer = card.querySelector('.tutorial-video');
            const thumbnail = videoContainer.querySelector('img');
            const videoUrl = thumbnail.src.replace('.jpg', '.mp4');
            
            // Create video element
            const video = document.createElement('video');
            video.src = videoUrl;
            video.controls = true;
            video.autoplay = true;
            
            // Replace thumbnail with video
            videoContainer.replaceChild(video, thumbnail);
            button.style.display = 'none';
        });
    });
}

// Progress Tracking
function initializeProgressTracking() {
    const signupButton = document.querySelector('.signup-btn');
    if (signupButton) {
        signupButton.addEventListener('click', () => {
            // Implementation for progress tracking signup
            alert('Progress tracking feature coming soon!');
        });
    }
}

// Resource Downloads
function initializeResourceDownloads() {
    const downloadButtons = document.querySelectorAll('.download-btn');
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const resourceName = button.parentElement.querySelector('h3').textContent;
            // Implementation for download tracking
            alert(`Downloading ${resourceName}...`);
        });
    });
}

// Training Tools Shop
function initializeShop() {
    const buyButtons = document.querySelectorAll('.buy-btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const toolCard = button.closest('.tool-card');
            const toolName = toolCard.querySelector('h3').textContent;
            const price = toolCard.querySelector('.tool-price').textContent;
            // Implementation for shop functionality
            alert(`Adding ${toolName} (${price}) to cart...`);
        });
    });
}

// Tutorial Search
function initializeSearch() {
    const tutorialCards = document.querySelectorAll('.tutorial-card');
    if (tutorialCards.length > 0) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <input type="text" placeholder="Search tutorials..." class="search-input">
            <button class="search-btn"><i class="fas fa-search"></i></button>
        `;
        
        const firstSection = document.querySelector('.tutorial-categories');
        if (firstSection) {
            firstSection.insertBefore(searchContainer, firstSection.firstChild);
            
            const searchInput = searchContainer.querySelector('.search-input');
            searchInput.addEventListener('input', (e) => {
                const searchTerm = e.target.value.toLowerCase();
                tutorialCards.forEach(card => {
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

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSkillFilter();
    initializeVideoPlayers();
    initializeProgressTracking();
    initializeResourceDownloads();
    initializeShop();
    initializeSearch();
});
