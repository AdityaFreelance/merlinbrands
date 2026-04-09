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

    // Bulk Enquiry Popup Logic
    const bulkOverlay = document.getElementById('bulk-enquiry-overlay');
    const bulkFormState = document.getElementById('bulk-form-state');
    const bulkSuccessState = document.getElementById('bulk-success-state');
    const bulkConfirmState = document.getElementById('bulk-confirm-state');
    const bulkForm = document.getElementById('bulk-enquiry-form');

    const bulkCloseBtn = document.getElementById('bulk-popup-close-btn');
    const bulkOkayBtn = document.getElementById('bulk-okay-btn');
    const bulkCancelClose = document.getElementById('bulk-cancel-close');
    const bulkConfirmClose = document.getElementById('bulk-confirm-close');

    // Function to open bulk popup
    function openBulkPopup() {
        bulkOverlay.classList.add('active');
        bulkFormState.style.display = 'block';
        bulkSuccessState.style.display = 'none';
        bulkConfirmState.style.display = 'none';
        document.body.style.overflow = 'hidden';
    }

    // Function to close bulk popup
    function closeBulkPopup() {
        bulkOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach to Get Bulk Enquiry buttons
    const bulkEnquiryBtns = document.querySelectorAll('.customBtn');
    bulkEnquiryBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            openBulkPopup();
        });
    });

    // Close button (Top right) - Shows confirmation
    bulkCloseBtn.addEventListener('click', function() {
        bulkFormState.style.display = 'none';
        bulkConfirmState.style.display = 'block';
    });

    // Confirm Close - Okay button
    bulkConfirmClose.addEventListener('click', closeBulkPopup);

    // Confirm Close - Cancel button (Go back to form)
    bulkCancelClose.addEventListener('click', function() {
        bulkConfirmState.style.display = 'none';
        bulkFormState.style.display = 'block';
    });

    // Success Okay button
    bulkOkayBtn.addEventListener('click', closeBulkPopup);

    // Form Submission
    bulkForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would normally send the data to a server
        bulkFormState.style.display = 'none';
        bulkSuccessState.style.display = 'block';
    });

    // Close on overlay click
    bulkOverlay.addEventListener('click', function(e) {
        if (e.target === bulkOverlay) {
            closeBulkPopup();
        }
    });
});
