$(document).ready(function () {
    const $personalisationPopup = $('#personalisation-popup-overlay');
    const $personalisationTrigger = $('.mobile-personalisation-trigger');
    const $personalisationClose = $('#personalisation-popup-close');
    let isPopupSliderReady = false;

    // Banner Slider
    $('.banner-slider-row').slick({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 800,
        autoplay: false,
        autoplaySpeed: 3000,
        pauseOnHover: false,
    });

    // Client Logo Slider
    $('.client-wrapper-row').slick({
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        speed: 5000,
        cssEase: 'linear',
        arrows: false,
        dots: false,
        pauseOnHover: false,
        pauseOnFocus: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                }
            }
        ]
    });

    // Preview Section Sliders
    $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
    });
    $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        arrows:true,
        focusOnSelect: true,
        prevArrow: '<button type="button" class="slick-prev"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.71 15.88L10.83 12L14.71 8.11998C15.1 7.72998 15.1 7.09998 14.71 6.70998C14.32 6.31998 13.69 6.31998 13.3 6.70998L8.70998 11.3C8.31998 11.69 8.31998 12.32 8.70998 12.71L13.3 17.3C13.69 17.69 14.32 17.69 14.71 17.3C15.09 16.91 15.1 16.27 14.71 15.88Z" fill="white"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.29006 15.88L13.1701 12L9.29006 8.11998C8.90006 7.72998 8.90006 7.09998 9.29006 6.70998C9.68006 6.31998 10.3101 6.31998 10.7001 6.70998L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" fill="white"/></svg></button>'
    });

    function initPersonalisationPopupSlider() {
        if (isPopupSliderReady) return;

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
            arrows: true,
            focusOnSelect: true,
            prevArrow: '<button type="button" class="slick-prev"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7583 14.4084L7.34995 10.0001L11.7583 5.5918" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
            nextArrow: '<button type="button" class="slick-next"><svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.2417 5.5918L12.65 10.0001L8.2417 14.4084" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
        });

        isPopupSliderReady = true;
    }

    function openPersonalisationPopup() {
        $personalisationPopup.addClass('active');
        $('body, html').css('overflow', 'hidden');
        initPersonalisationPopupSlider();
        if (isPopupSliderReady) {
            $('.slider-for-popup, .slider-nav-popup').slick('setPosition');
        }
    }

    function closePersonalisationPopup() {
        $personalisationPopup.removeClass('active');
        $('body, html').css('overflow', '');
    }

    $personalisationTrigger.on('click', function (e) {
        e.preventDefault();
        openPersonalisationPopup();
    });

    $personalisationClose.on('click', function () {
        closePersonalisationPopup();
    });

    $personalisationPopup.on('click', function (e) {
        if (e.target === this) {
            closePersonalisationPopup();
        }
    });

    $('.personalisation-popup-form').on('submit', function (e) {
        e.preventDefault();
    });

    $(document).on('keydown', function (e) {
        if (e.key === 'Escape' && $personalisationPopup.hasClass('active')) {
            closePersonalisationPopup();
        }
    });

    // Product Range Horizontal Scroll Initialization
    function updateProductHorizontalScroll() {
        const $wrapper = $('.product-range-wrapper');
        const $stickyContainer = $('.product-range-sticky-container');
        const $activeContent = $('.poduct-range-containerBox.active');
        const $activeRow = $activeContent.find('.row');

        if (!$activeRow.length) return;

        // Temporarily reset transform to get accurate scrollWidth
        const currentTransform = $activeRow.css('transform');
        $activeRow.css('transform', 'none');
        const scrollWidth = $activeRow[0].scrollWidth;
        const clientWidth = $activeRow[0].clientWidth;
        const totalHorizontalScroll = scrollWidth - clientWidth;
        $activeRow.css('transform', currentTransform);

        if (totalHorizontalScroll <= 0) {
            $wrapper.css('height', 'auto');
            $activeRow.css('transform', 'translateX(0)');
            return;
        }

        // Set section height to provide scrolling space
        // Higher scrollFactor = slower/longer horizontal scroll
        const scrollFactor = 2;
        const scrollDistance = totalHorizontalScroll * scrollFactor;
        
        $wrapper.css('height', (window.innerHeight + scrollDistance) + 'px');

        const wrapperRect = $wrapper[0].getBoundingClientRect();
        
        // Progress starts when wrapper hits top of viewport
        // Progress = how much of scrollDistance has passed
        let progress = -wrapperRect.top / scrollDistance;
        progress = Math.max(0, Math.min(1, progress));

        const translateX = -progress * totalHorizontalScroll;
        $activeRow.css('transform', `translateX(${translateX}px)`);
    }

    $(window).on('scroll resize', updateProductHorizontalScroll);

    // Set default active tab
    $('#best-seller-tab-content').addClass('active');
    setTimeout(updateProductHorizontalScroll, 100);

    // Product Range Tab Functionality
    $('.product-range-nav-tab-item').on('click', function (e) {
        e.preventDefault();
        var target = $(this).attr('id');

        // Remove active class from all tabs and contents
        $('.product-range-nav-tab-item').removeClass('active');
        $('.poduct-range-containerBox').removeClass('active');

        // Add active class to clicked tab
        $(this).addClass('active');

        // Show corresponding content
        if (target === 'best-seller') {
            $('#best-seller-tab-content').addClass('active');
        } else if (target === 'bundles') {
            $('#bundles-tab-content').addClass('active');
        }

        // Update scroll state after switching tab
        setTimeout(updateProductHorizontalScroll, 50);
    });

    // Testimonial Slider
    $('.testimonial-row').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // FAQ Accordion
    $('.faq-box-content').hide(); // Ensure all are hidden initially
    $('.faq-btn').on('click', function () {
        var $content = $(this).next('.faq-box-content');
        var $allButtons = $('.faq-btn');
        var $allContents = $('.faq-box-content');

        if ($content.is(':visible')) {
            $content.slideUp();
            $(this).removeClass('faq-btn-active');
        } else {
            $allContents.slideUp();
            $allButtons.removeClass('faq-btn-active');
            $content.slideDown();
            $(this).addClass('faq-btn-active');
        }
    });
});
