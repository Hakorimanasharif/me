document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    
    // Change to 5-second preloader
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
        
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }, 3000);

    // Cursor Effect
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        setTimeout(() => {
            cursorFollower.style.left = e.clientX + 'px';
            cursorFollower.style.top = e.clientY + 'px';
        }, 100);
    });
    
    // Change cursor on hover
    const hoverElements = document.querySelectorAll('a, button, .project-item, .tool-item, input, textarea');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorFollower.classList.add('cursor-follower-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorFollower.classList.remove('cursor-follower-hover');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    navLinkItems.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    // Projects Pagination System
    const projectsPerPage = 6; // Show 6 projects per page
    const projectItems = document.querySelectorAll('.project-item');
    const pageButtons = document.querySelectorAll('.page-btn');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentPage = 1;
    const totalPages = Math.ceil(projectItems.length / projectsPerPage);

    // Function to show projects for a specific page
    function showPage(page) {
        // Validate page number
        if (page < 1) page = 1;
        if (page > totalPages) page = totalPages;
        
        currentPage = page;
        
        // Calculate start and end index
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        
        // Hide all projects first
        projectItems.forEach(item => {
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        });
        
        // Show projects for current page
        projectItems.forEach((item, index) => {
            if (index >= startIndex && index < endIndex) {
                setTimeout(() => {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                }, 300);
            }
        });
        
        // Update active state of page buttons
        updatePaginationButtons();
    }
    
    // Function to update pagination buttons
    function updatePaginationButtons() {
        pageButtons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            }
        });
        
        // Disable/enable prev/next buttons
        if (currentPage === 1) {
            prevBtn.disabled = true;
            prevBtn.classList.add('disabled');
        } else {
            prevBtn.disabled = false;
            prevBtn.classList.remove('disabled');
        }
        
        if (currentPage === totalPages) {
            nextBtn.disabled = true;
            nextBtn.classList.add('disabled');
        } else {
            nextBtn.disabled = false;
            nextBtn.classList.remove('disabled');
        }
    }
    
    // Initialize pagination
    function initPagination() {
        // Add click event to page buttons
        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('dots')) {
                    const pageNum = parseInt(button.textContent);
                    showPage(pageNum);
                }
            });
        });
        
        // Next button click
        nextBtn.addEventListener('click', () => {
            showPage(currentPage + 1);
        });
        
        // Previous button click
        prevBtn.addEventListener('click', () => {
            showPage(currentPage - 1);
        });
        
        // Show first page initially
        showPage(1);
    }
    
    // Projects filter with pagination support
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Reset to first page when filtering
            currentPage = 1;
            
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 100);
                } else {
                    const categories = item.getAttribute('data-category').split(',');
                    if (categories.includes(filterValue)) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                }
            });
            
            // Update pagination after filtering
            updatePaginationButtons();
        });
    });
    
    // Initialize pagination system
    initPagination();

    // Typing animation
    const typingText = document.querySelector('.typing-text');
    const words = ['Web Developer', 'UI/UX Designer', 'Frontend Developer', 'Fullstack Developer'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isEnd = false;
    
    function type() {
        const currentWord = words[wordIndex];
        const currentChar = currentWord.substring(0, charIndex);
        
        typingText.textContent = currentChar;
        
        if (!isDeleting && charIndex < currentWord.length) {
            // Typing
            charIndex++;
            setTimeout(type, 100);
        } else if (isDeleting && charIndex > 0) {
            // Deleting
            charIndex--;
            setTimeout(type, 50);
        } else {
            // Change word
            isDeleting = !isDeleting;
            
            if (!isDeleting) {
                wordIndex = (wordIndex + 1) % words.length;
            }
            
            setTimeout(type, 1000);
        }
    }
    
    // Start typing animation
    setTimeout(type, 1000);

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.hero-content, .hero-image, .about-image, .about-text, .skills-description, .skills-progress, .project-item, .contact-info, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeIn 1s forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});
// ======================
// PROJECTS PAGINATION SYSTEM
// ======================

// Initialize pagination when DOM loads
function initPagination() {
    const projectsPerPage = 6;
    const projectItems = document.querySelectorAll('.project-item');
    const pageButtons = document.querySelectorAll('.page-btn');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    let currentPage = 1;
    const totalPages = Math.ceil(projectItems.length / projectsPerPage);

    // Show specific page of projects
    function showPage(page) {
        // Validate page number
        page = Math.max(1, Math.min(page, totalPages));
        currentPage = page;

        // Calculate range of projects to show
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;

        // Hide all projects with fade out
        projectItems.forEach(item => {
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.display = 'none';
            }, 200);
        });

        // Show current page's projects with fade in
        setTimeout(() => {
            projectItems.forEach((item, index) => {
                if (index >= startIndex && index < endIndex) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                }
            });
        }, 250);

        updatePaginationUI();
    }

    // Update pagination buttons state
    function updatePaginationUI() {
        // Update active state of number buttons
        pageButtons.forEach(button => {
            button.classList.remove('active');
            if (parseInt(button.textContent) === currentPage) {
                button.classList.add('active');
            }
        });

        // Disable prev/next buttons when at limits
        prevBtn.classList.toggle('disabled', currentPage === 1);
        nextBtn.classList.toggle('disabled', currentPage === totalPages);
    }

    // Event listeners for pagination controls
    function setupPaginationEvents() {
        // Number buttons
        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (!button.classList.contains('dots')) {
                    showPage(parseInt(button.textContent));
                }
            });
        });

        // Next button
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) showPage(currentPage + 1);
        });

        // Previous button
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });
    }

    // Initialize everything
    setupPaginationEvents();
    showPage(1); // Start on first page
}

// Call this when DOM is loaded
document.addEventListener('DOMContentLoaded', initPagination);

document.addEventListener('DOMContentLoaded', function() {
    // ... (keep all your existing code until the projects section)

    // ======================
    // PROJECTS PAGINATION SYSTEM
    // ======================
    const projectsPerPage = 3;
    const projectItems = document.querySelectorAll('.project-item');
    const pageNumbers = document.querySelector('.page-numbers');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentPage = 1;
    const totalPages = Math.ceil(projectItems.length / projectsPerPage);

    // Initialize pagination
    function initPagination() {
        // Create page buttons dynamically based on total projects
        createPageButtons();
        
        // Show first page
        showPage(1);
        
        // Set up event listeners
        setupPaginationEvents();
    }

    // Create page number buttons
    function createPageButtons() {
        pageNumbers.innerHTML = '';
        
        // Always show first 3 pages
        for (let i = 1; i <= Math.min(3, totalPages); i++) {
            pageNumbers.appendChild(createPageButton(i));
        }
        
        // Show dots if there are more than 3 pages
        if (totalPages > 3) {
            pageNumbers.appendChild(createDotsElement());
            
            // Show last page
            pageNumbers.appendChild(createPageButton(totalPages));
        }
    }

    // Create a single page button
    function createPageButton(pageNum) {
        const button = document.createElement('button');
        button.className = 'page-btn';
        button.textContent = pageNum;
        if (pageNum === 1) button.classList.add('active');
        return button;
    }

    // Create dots element
    function createDotsElement() {
        const dots = document.createElement('span');
        dots.className = 'dots';
        dots.textContent = '...';
        return dots;
    }

    // Show specific page of projects
    function showPage(page) {
        // Validate page number
        page = Math.max(1, Math.min(page, totalPages));
        currentPage = page;
        
        // Calculate project range
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        
        // Hide all projects
        projectItems.forEach(item => {
            item.style.opacity = '0';
            setTimeout(() => {
                item.style.display = 'none';
            }, 200);
        });
        
        // Show projects for current page
        setTimeout(() => {
            projectItems.forEach((item, index) => {
                if (index >= startIndex && index < endIndex) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                }
            });
        }, 250);
        
        updatePaginationUI();
    }

    // Update pagination UI state
    function updatePaginationUI() {
        // Update active page button
        document.querySelectorAll('.page-btn').forEach(btn => {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === currentPage) {
                btn.classList.add('active');
            }
        });
        
        // Update prev/next buttons
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;
    }

    // Set up pagination event listeners
    function setupPaginationEvents() {
        // Page number clicks
        pageNumbers.addEventListener('click', (e) => {
            if (e.target.classList.contains('page-btn')) {
                showPage(parseInt(e.target.textContent));
            }
        });
        
        // Previous button
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) showPage(currentPage - 1);
        });
        
        // Next button
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) showPage(currentPage + 1);
        });
    }

    // Initialize pagination
    initPagination();

    // ... (keep the rest of your existing code)
});
// Contact Form Submission
const contactForm = document.querySelector('.contact-form form');
const successPopup = document.getElementById('successPopup');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Here you would normally send the form data to your server
        // For demonstration, we'll just show the success message
        
        // Show the success popup
        successPopup.classList.add('active');
        
        // Reset the form
        this.reset();
        
        // You can add actual form submission code here:
        // Example using Fetch API:
        /*
        const formData = new FormData(this);
        
        fetch('your-server-endpoint', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                successPopup.classList.add('active');
                this.reset();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        */
    });
}

// Close popup when clicking OK or overlay
document.querySelector('.popup-close-btn').addEventListener('click', closePopup);
successPopup.addEventListener('click', function(e) {
    if (e.target === this) {
        closePopup();
    }
});

function closePopup() {
    successPopup.classList.remove('active');
}