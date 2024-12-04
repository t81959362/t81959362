// Image Loading Utility
window.addEventListener('DOMContentLoaded', function() {
    class ImageLoader {
        constructor() {
            this.dogCeoBaseUrl = 'https://dog.ceo/api';
            this.breedMapping = {
                'german shepherd': 'germanshepherd',
                'golden retriever': 'retriever/golden',
                'labrador retriever': 'retriever/labrador',
                'cocker spaniel': 'spaniel/cocker',
                'border collie': 'collie/border'
            };
        }

        // Get random dog image from Dog CEO API
        async getRandomDogImage() {
            try {
                const response = await fetch(`${this.dogCeoBaseUrl}/breeds/image/random`);
                const data = await response.json();
                return data.message;
            } catch (error) {
                console.error('Error fetching dog image:', error);
                return this.getFallbackImage();
            }
        }

        // Get breed-specific image
        async getBreedImage(breed) {
            try {
                const formattedBreed = this.formatBreedName(breed);
                const response = await fetch(`${this.dogCeoBaseUrl}/breed/${formattedBreed}/images/random`);
                const data = await response.json();
                return data.message;
            } catch (error) {
                console.error(`Error fetching ${breed} image:`, error);
                return this.getRandomDogImage();
            }
        }

        // Format breed name for API
        formatBreedName(breed) {
            const lowercaseBreed = breed.toLowerCase();
            return this.breedMapping[lowercaseBreed] || lowercaseBreed.replace(/\s+/g, '');
        }

        // Get a fallback image using placeholder.com
        getFallbackImage(width = 800, height = 600) {
            const text = encodeURIComponent('Dog Image Coming Soon');
            return `https://via.placeholder.com/${width}x${height}?text=${text}`;
        }

        // Set hero background image
        async setHeroBackground(element) {
            try {
                const imageUrl = await this.getRandomDogImage();
                element.style.setProperty('--hero-image', `url(${imageUrl})`);
                console.log('Set hero background:', imageUrl);
            } catch (error) {
                console.error('Error setting hero background:', error);
                element.style.setProperty('--hero-image', `url(${this.getFallbackImage()})`);
            }
        }

        // Load images into elements with data-image-type attribute
        async loadPageImages() {
            console.log('Loading page images...');
            const imageElements = document.querySelectorAll('[data-image-type]');
            console.log('Found', imageElements.length, 'images to load');
            
            for (const element of imageElements) {
                const imageType = element.dataset.imageType;
                const breed = element.dataset.breed;
                
                if (imageType === 'hero') {
                    await this.setHeroBackground(element);
                    continue;
                }

                let imageUrl;
                try {
                    if (imageType === 'breed' && breed) {
                        imageUrl = await this.getBreedImage(breed);
                    } else {
                        imageUrl = await this.getRandomDogImage();
                    }
                    console.log('Loaded image:', imageUrl);
                } catch (error) {
                    console.error('Error loading image:', error);
                    imageUrl = this.getFallbackImage();
                }

                if (element.tagName.toLowerCase() === 'img') {
                    element.src = imageUrl;
                    element.loading = 'lazy';
                    console.log('Set image src:', imageUrl);
                } else {
                    element.style.backgroundImage = `url(${imageUrl})`;
                    console.log('Set background image:', imageUrl);
                }

                // Add error handler
                if (element.tagName.toLowerCase() === 'img') {
                    element.onerror = () => {
                        console.log('Image failed to load, using fallback');
                        element.src = this.getFallbackImage();
                    };
                }
            }
        }
    }

    // Initialize and run immediately
    const imageLoader = new ImageLoader();
    imageLoader.loadPageImages();
});
