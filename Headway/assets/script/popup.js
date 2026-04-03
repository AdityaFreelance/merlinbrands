document.addEventListener('DOMContentLoaded', function() {
    const popupOverlay = document.getElementById('custom-popup-overlay');
    const closePopupBtn = document.getElementById('popup-close-btn');
    const openPopupBtns = document.querySelectorAll('.custom-product-btn');
    const personalToggle = document.getElementById('personal-toggle');
    const personalInputs = document.getElementById('personalisation-inputs');
    const quantitySelect = document.getElementById('quantity-select');
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    // Open Popup
    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        });
    });

    // Close Popup
    closePopupBtn.addEventListener('click', () => closePopup());
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) closePopup();
    });

    function closePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    // Toggle Personalisation
    personalToggle.addEventListener('change', function() {
        if (this.checked) {
            personalInputs.classList.add('active');
            updatePersonalisationInputs();
        } else {
            personalInputs.classList.remove('active');
        }
    });

    // Quantity Change
    quantitySelect.addEventListener('change', function() {
        if (personalToggle.checked) {
            updatePersonalisationInputs();
        }
    });

    function updatePersonalisationInputs() {
        const qty = parseInt(quantitySelect.value);
        personalInputs.innerHTML = '';
        for (let i = 1; i <= qty; i++) {
            const div = document.createElement('div');
            div.className = 'input-group';
            div.innerHTML = `
                <label>Name ${i} <span>*</span></label>
                <input type="text" placeholder="Type here">
            `;
            personalInputs.appendChild(div);
        }
    }

    // Accordion Logic
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('span:last-child');
            
            if (content.style.display === 'block') {
                content.style.display = 'none';
                icon.innerHTML = '&#9013;'; // Chevron down
            } else {
                content.style.display = 'block';
                icon.innerHTML = '&#8963;'; // Chevron up
            }
        });
    });
});
