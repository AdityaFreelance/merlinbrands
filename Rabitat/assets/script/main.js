document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.product-tab-link');
    const contents = document.querySelectorAll('.production-tab-link-content');

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
});
