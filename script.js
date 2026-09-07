document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('ph-list');
            icon.classList.add('ph-x');
        } else {
            icon.classList.remove('ph-x');
            icon.classList.add('ph-list');
        }
    });

    // Close mobile menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    });

    // Smooth scroll for anchor links (if default smooth scroll isn't enough)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed navbar
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Booking form WhatsApp integration
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const eventType = document.getElementById('event-type').value;
            const eventDate = document.getElementById('event-date').value;
            
            // Format WhatsApp message
            const message = `Hello Kalanjali Convention, I would like to inquire about a booking:
            
*Name:* ${name}
*Phone:* ${phone}
*Event Type:* ${eventType}
*Event Date:* ${eventDate}

Please get back to me. Thank you!`;
            
            // WhatsApp Number
            const whatsappNumber = "919030522637";
            
            // Encode message and open WhatsApp URL
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
            
            // Optional: reset form
            // bookingForm.reset();
        });
    }

    // Gallery Show More / Show Less logic
    const galleryItems = document.querySelectorAll('.gallery-item');
    const showMoreBtn = document.getElementById('showMoreBtn');
    let isGalleryExpanded = false;

    if (galleryItems.length > 10 && showMoreBtn) {
        // Initially hide items beyond the 10th
        galleryItems.forEach((item, index) => {
            if (index >= 10) {
                item.classList.add('hidden');
            }
        });
        showMoreBtn.style.display = 'inline-block';

        showMoreBtn.addEventListener('click', () => {
            if (!isGalleryExpanded) {
                // Expand
                galleryItems.forEach((item, index) => {
                    if (index >= 10) {
                        item.classList.remove('hidden');
                        item.classList.add('fade-in');
                    }
                });
                showMoreBtn.textContent = 'Show Less';
                isGalleryExpanded = true;
            } else {
                // Collapse
                galleryItems.forEach((item, index) => {
                    if (index >= 10) {
                        item.classList.add('hidden');
                        item.classList.remove('fade-in');
                    }
                });
                showMoreBtn.textContent = 'Show More';
                isGalleryExpanded = false;
                
                // Smooth scroll back to gallery top
                const gallerySection = document.getElementById('gallery');
                if (gallerySection) {
                    const headerOffset = 80;
                    const elementPosition = gallerySection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    }
});
