document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.product-tab-link');
    const contents = document.querySelectorAll('.production-tab-link-content');
    const personalisationTrigger = document.querySelector('.mobile-personalisation-trigger');
    const personalisationPopup = document.getElementById('personalisation-popup-overlay');
    const personalisationPopupClose = document.getElementById('personalisation-popup-close');
    const personalisationPopupForm = document.querySelector('.personalisation-popup-form');
    let isPopupSliderReady = false;

    function initTabSliders() {
        if (window.innerWidth < 768) {
            $('.production-tab-link-content .row').not('.slick-initialized').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                arrows: false,
                infinite: false,
                responsive: [
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        } else {
            $('.production-tab-link-content .row.slick-initialized').slick('unslick');
        }
    }

    // Initial check
    initTabSliders();

    // Re-check on resize
    window.addEventListener('resize', function() {
        initTabSliders();
    });

    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();

            // 1. Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('custom-product-active-link'));
            
            // 2. Add active class to clicked tab
            this.classList.add('custom-product-active-link');

            // 3. Hide all content divs using d-none utility class
            contents.forEach(content => content.classList.add('d-none'));

            // 4. Show the target content div based on the clicked tab's ID
            const targetId = this.getAttribute('id') === 'pre-select-tab' 
                ? 'pre-select-tab-content' 
                : 'own-bundle-tab-content';
            
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('d-none');
                
                // If slider is initialized, refresh its position because it was hidden
                if (window.innerWidth < 768) {
                    const slider = targetContent.querySelector('.row.slick-initialized');
                    if (slider) {
                        $(slider).slick('setPosition');
                    }
                }
            }
        });
    });

    function initPopupSlider() {
        if (isPopupSliderReady || typeof $ === 'undefined') {
            return;
        }

        $('.slider-for-popup').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav-popup'
        });

        $('.slider-nav-popup').slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            asNavFor: '.slider-for-popup',
            dots: false,
            focusOnSelect: true,
            prevArrow: '<button type="button" class="slick-prev"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7583 14.4084L7.34995 10.0001L11.7583 5.5918" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.2417 5.5918L12.65 10.0001L8.2417 14.4084" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
        });

        isPopupSliderReady = true;
    }

    function openPersonalisationPopup() {
        if (!personalisationPopup) {
            return;
        }

        personalisationPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        initPopupSlider();

        if (isPopupSliderReady) {
            $('.slider-for-popup, .slider-nav-popup').slick('setPosition');
        }
    }

    function closePersonalisationPopup() {
        if (!personalisationPopup) {
            return;
        }

        personalisationPopup.classList.remove('active');
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
    }

    if (personalisationTrigger) {
        personalisationTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            openPersonalisationPopup();
        });
    }

    if (personalisationPopupClose) {
        personalisationPopupClose.addEventListener('click', closePersonalisationPopup);
    }

    if (personalisationPopup) {
        personalisationPopup.addEventListener('click', function(e) {
            if (e.target === personalisationPopup) {
                closePersonalisationPopup();
            }
        });
    }

    if (personalisationPopupForm) {
        personalisationPopupForm.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && personalisationPopup && personalisationPopup.classList.contains('active')) {
            closePersonalisationPopup();
        }
    });
});
