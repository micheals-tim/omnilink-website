function initializePageScripts() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileModulesButton = document.getElementById('mobile-modules-button');
    const mobileModulesList = document.getElementById('mobile-modules-list');
    const mobileArrowModules = document.getElementById('mobile-arrow-modules');
    const mobileFeaturesButton = document.getElementById('mobile-features-button');
    const mobileFeaturesList = document.getElementById('mobile-features-list');
    const mobileArrowFeatures = document.getElementById('mobile-arrow-features');

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    if (mobileModulesButton) {
        mobileModulesButton.addEventListener('click', () => {
            mobileModulesList.classList.toggle('hidden');
            if(mobileArrowModules) mobileArrowModules.classList.toggle('rotate-180');
        });
    }

    if (mobileFeaturesButton) {
        mobileFeaturesButton.addEventListener('click', () => {
            mobileFeaturesList.classList.toggle('hidden');
            if(mobileArrowFeatures) mobileArrowFeatures.classList.toggle('rotate-180');
        });
    }

    const mobileMenuLinks = document.querySelectorAll('#mobile-menu a');
    for (let link of mobileMenuLinks) {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const submitButton = document.getElementById('submit-button');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                company: formData.get('company'),
                message: formData.get('message')
            };

            submitButton.disabled = true;
            submitButton.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
            `;

            const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwn9qkKR7WF6seQk8YnnPAGDF-zptNHiA4VOnqIyZF-ozecNhE8DILXNOf9m3K0Z9oW/exec";

            fetch(SCRIPT_URL, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8',
                }
            })
            .then(response => response.json())
            .then(res => {
                if (res.result === 'success') {
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                } else {
                    console.error('Error:', res.error);
                    alert('An error occurred. Please try again.');
                    submitButton.disabled = false;
                    submitButton.textContent = 'Submit Request';
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
                submitButton.disabled = false;
                submitButton.textContent = 'Submit Request';
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    if (headerPlaceholder) {
        fetch("_header.html")
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
                // Now that the header is loaded, initialize the scripts for it
                initializePageScripts();
            });
    } else {
            // If there's no header, still initialize scripts for the rest of the page
            initializePageScripts();
    }

    if (footerPlaceholder) {
        fetch("_footer.html")
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            });
    }
});
