$(document).ready(function () {
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
        focusOnSelect: true,
        prevArrow: '<button type="button" class="slick-prev"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.71 15.88L10.83 12L14.71 8.11998C15.1 7.72998 15.1 7.09998 14.71 6.70998C14.32 6.31998 13.69 6.31998 13.3 6.70998L8.70998 11.3C8.31998 11.69 8.31998 12.32 8.70998 12.71L13.3 17.3C13.69 17.69 14.32 17.69 14.71 17.3C15.09 16.91 15.1 16.27 14.71 15.88Z" fill="white"/></svg></button>',
        nextArrow: '<button type="button" class="slick-next"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.29006 15.88L13.1701 12L9.29006 8.11998C8.90006 7.72998 8.90006 7.09998 9.29006 6.70998C9.68006 6.31998 10.3101 6.31998 10.7001 6.70998L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z" fill="white"/></svg></button>'
    });

    // Product Range Slider Initialization
    function initProductSlider() {
        $('.poduct-range-containerBox .row').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            arrows: false,
            dots: false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                    }
                }
            ]
        });
    }

    // Set default active tab and THEN init slider
    $('#best-seller-tab-content').addClass('active');
    initProductSlider();

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

        // Full refresh of slick slider to recalculate dimensions properly after becoming visible
        setTimeout(function () {
            $('.poduct-range-containerBox.active .row').slick('refresh');
        }, 50);
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
