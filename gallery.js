// Photo Database
const photos = [
    {
        id: 1,
        title: "Happy Golden",
        description: "A joyful Golden Retriever playing in the park",
        photographer: "Sarah Smith",
        category: "action",
        breed: "Golden Retriever",
        imageUrl: "images/gallery/golden-retriever-1.jpg",
        likes: 245,
        comments: [],
        tags: ["golden retriever", "happy", "park", "playing"],
        uploadDate: "2024-01-15",
        featured: true
    },
    // More photos...
];

// Photographer Database
const photographers = [
    {
        id: 1,
        name: "Sarah Smith",
        bio: "Pet photographer specializing in action shots",
        avatar: "images/photographers/sarah-smith.jpg",
        portfolio: ["photo-1.jpg", "photo-2.jpg", "photo-3.jpg"],
        followers: 1200,
        featured: true
    },
    // More photographers...
];

// Initialize Gallery
function initializeGallery() {
    loadPhotos();
    initializeFilters();
    setupModals();
    setupPhotoUpload();
    loadFeaturedPhotographers();
    setupPhotoChallenge();
}

// Load Photos
function loadPhotos(filters = {}) {
    const photoGrid = document.querySelector('.photo-grid');
    let filteredPhotos = [...photos];

    // Apply filters
    if (filters.category && filters.category !== 'all') {
        filteredPhotos = filteredPhotos.filter(photo => photo.category === filters.category);
    }
    if (filters.breed && filters.breed !== 'all') {
        filteredPhotos = filteredPhotos.filter(photo => photo.breed === filters.breed);
    }

    // Apply sorting
    if (filters.sort === 'popular') {
        filteredPhotos.sort((a, b) => b.likes - a.likes);
    } else if (filters.sort === 'newest') {
        filteredPhotos.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate));
    } else if (filters.sort === 'random') {
        filteredPhotos.sort(() => Math.random() - 0.5);
    }

    // Generate HTML
    photoGrid.innerHTML = filteredPhotos.map(photo => `
        <div class="photo-card" data-id="${photo.id}">
            <div class="photo-wrapper">
                <img src="${photo.imageUrl}" alt="${photo.title}" loading="lazy">
                <div class="photo-overlay">
                    <h3>${photo.title}</h3>
                    <div class="photo-stats">
                        <span><i class="fas fa-heart"></i> ${photo.likes}</span>
                        <span><i class="fas fa-comment"></i> ${photo.comments.length}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners
    document.querySelectorAll('.photo-card').forEach(card => {
        card.addEventListener('click', () => openPhotoModal(card.dataset.id));
    });
}

// Initialize Filters
function initializeFilters() {
    const categoryFilter = document.getElementById('category-filter');
    const breedFilter = document.getElementById('breed-filter');
    const sortButtons = document.querySelectorAll('.sort-btn');

    // Populate breed filter
    const breeds = [...new Set(photos.map(photo => photo.breed))].sort();
    breedFilter.innerHTML += breeds.map(breed => 
        `<option value="${breed}">${breed}</option>`
    ).join('');

    // Filter change handlers
    categoryFilter.addEventListener('change', updateGallery);
    breedFilter.addEventListener('change', updateGallery);

    // Sort button handlers
    sortButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            sortButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateGallery();
        });
    });
}

// Update Gallery
function updateGallery() {
    const filters = {
        category: document.getElementById('category-filter').value,
        breed: document.getElementById('breed-filter').value,
        sort: document.querySelector('.sort-btn.active').dataset.sort
    };
    loadPhotos(filters);
}

// Photo Modal
function setupModals() {
    const photoModal = document.getElementById('photo-modal');
    const uploadModal = document.getElementById('upload-modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Close modal handlers
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            photoModal.style.display = 'none';
            uploadModal.style.display = 'none';
        });
    });

    // Upload button handler
    document.getElementById('upload-photo').addEventListener('click', () => {
        uploadModal.style.display = 'flex';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === photoModal) photoModal.style.display = 'none';
        if (e.target === uploadModal) uploadModal.style.display = 'none';
    });
}

// Open Photo Modal
function openPhotoModal(photoId) {
    const photo = photos.find(p => p.id === parseInt(photoId));
    const modal = document.getElementById('photo-modal');
    
    // Update modal content
    modal.querySelector('.modal-image').src = photo.imageUrl;
    modal.querySelector('.photo-title').textContent = photo.title;
    modal.querySelector('.photo-description').textContent = photo.description;
    modal.querySelector('.photographer').textContent = photo.photographer;
    modal.querySelector('.upload-date').textContent = new Date(photo.uploadDate).toLocaleDateString();
    modal.querySelector('.likes-count').textContent = photo.likes;
    
    // Update tags
    modal.querySelector('.photo-tags').innerHTML = photo.tags.map(tag =>
        `<span class="tag">#${tag}</span>`
    ).join('');
    
    // Load comments
    loadComments(photo.id);
    
    modal.style.display = 'flex';
}

// Load Comments
function loadComments(photoId) {
    const photo = photos.find(p => p.id === photoId);
    const commentsList = document.querySelector('.comments-list');
    
    commentsList.innerHTML = photo.comments.map(comment => `
        <div class="comment">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                <span class="comment-date">${new Date(comment.date).toLocaleDateString()}</span>
            </div>
            <p class="comment-text">${comment.text}</p>
        </div>
    `).join('');
}

// Photo Upload
function setupPhotoUpload() {
    const uploadArea = document.querySelector('.upload-area');
    const photoInput = document.getElementById('photo-input');
    const photoPreview = document.getElementById('photo-preview');
    const uploadForm = document.getElementById('upload-form');

    // Drag and drop handlers
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });

    // Click to upload
    uploadArea.addEventListener('click', () => {
        photoInput.click();
    });

    photoInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    // Form submission
    uploadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        alert('Photo uploaded successfully!');
        document.getElementById('upload-modal').style.display = 'none';
        uploadForm.reset();
        photoPreview.src = '';
        photoPreview.style.display = 'none';
    });
}

// Handle File Upload
function handleFiles(files) {
    const file = files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const photoPreview = document.getElementById('photo-preview');
            photoPreview.src = e.target.result;
            photoPreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Featured Photographers
function loadFeaturedPhotographers() {
    const photographerGrid = document.querySelector('.photographer-grid');
    const featuredPhotographers = photographers.filter(p => p.featured);
    
    photographerGrid.innerHTML = featuredPhotographers.map(photographer => `
        <div class="photographer-card">
            <img src="${photographer.avatar}" alt="${photographer.name}" class="photographer-avatar">
            <h3>${photographer.name}</h3>
            <p>${photographer.bio}</p>
            <div class="photographer-stats">
                <span><i class="fas fa-user-friends"></i> ${photographer.followers}</span>
                <span><i class="fas fa-camera"></i> ${photographer.portfolio.length}</span>
            </div>
            <button class="follow-btn">Follow</button>
        </div>
    `).join('');
}

// Photo Challenge
function setupPhotoChallenge() {
    const participateBtn = document.querySelector('.participate-btn');
    
    participateBtn.addEventListener('click', () => {
        document.getElementById('upload-modal').style.display = 'flex';
        document.querySelector('select[name="category"]').value = 'challenge';
    });

    // Load challenge entries
    const challengeEntries = photos.filter(photo => photo.category === 'challenge');
    const entriesContainer = document.querySelector('.challenge-entries');
    
    entriesContainer.innerHTML = challengeEntries.map(photo => `
        <div class="challenge-entry" data-id="${photo.id}">
            <img src="${photo.imageUrl}" alt="${photo.title}">
            <div class="entry-details">
                <h4>${photo.title}</h4>
                <span class="likes"><i class="fas fa-heart"></i> ${photo.likes}</span>
            </div>
        </div>
    `).join('');
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGallery);
