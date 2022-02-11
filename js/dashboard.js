(function(jQuery) {
    "use strict";
    jQuery(document).ready(function() {
        continueWatching();

        function activaTav(pill) {
            jQuery(pill).addClass('active show');
        }

        // sticky header anmation and height 
        function headerHeight() {
            var height = jQuery("#main-header").height();
            jQuery('.iq-height').css('height', height + 'px');
        }

        jQuery(function() {
            var header = jQuery("#main-header"),
                yOffset = 0,
                triggerPoint = 80;
            headerHeight();
            jQuery(window).resize(headerHeight);
        });

        // header menu dropdown 
        jQuery('[data-toggle=more-toggle]').on('click', function() {
            jQuery(this).next().toggleClass('show');
        });

        jQuery(document).on('click', function(e) {
            let myTargetElement = e.target;
            let selector, mainElement;
            if (jQuery(myTargetElement).hasClass('search-toggle') || jQuery(myTargetElement).parent().hasClass('search-toggle') || jQuery(myTargetElement).parent().parent().hasClass('search-toggle')) {
                if (jQuery(myTargetElement).hasClass('search-toggle')) {
                    selector = jQuery(myTargetElement).parent();
                    mainElement = jQuery(myTargetElement);
                } else if (jQuery(myTargetElement).parent().hasClass('search-toggle')) {
                    selector = jQuery(myTargetElement).parent().parent();
                    mainElement = jQuery(myTargetElement).parent();
                } else if (jQuery(myTargetElement).parent().parent().hasClass('search-toggle')) {
                    selector = jQuery(myTargetElement).parent().parent().parent();
                    mainElement = jQuery(myTargetElement).parent().parent();
                }
                if (!mainElement.hasClass('active') && jQuery('.navbar-list li').find('.active')) {
                    jQuery('.navbar-right li').removeClass('.iq-show');
                    jQuery('.navbar-right li .search-toggle').removeClass('active');
                }

                selector.toggleClass('iq-show');
                mainElement.toggleClass('active');
                e.preventDefault();
            } else if (jQuery(myTargetElement).is('search-input')) {} else {
                jQuery('.navbar-right li').removeClass('.iq-show');
                jQuery('.navbar-right li .search-toggle').removeClass('active');
            }
        });
        jQuery(document).on('click', function(event) {
            var $trigger = jQuery(".main-header .navbar");
            if ($trigger !== event.target && !$trigger.has(event.target).length) {
                jQuery(".main-header .navbar-collapse").collapse('hide');
                jQuery('body').removeClass('nav-open');
            }
        });
        jQuery('.c-toggler').on("click", function() {
            jQuery('body').addClass('nav-open');
        });


        $('#home-slider').slick({
            autoplay: false,
            speed: 800,
            lazyload: 'progressive',
            arrows: true,
            dots: false,
            prevArrow: '<div class="slick-nav prev-arrow"><i class="fa fa-chevron-right"></i></div>',
            nextArrow: '<div class="slick-nav next-arrow"><i class="fa fa-chevron-left"></i></div>',
            responsive: [{
                breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false,
                }
            }]
        }).slickAnimation();

        $(".slick-nav").on("click touch", function(e) {
            e.preventDefault();

            var arrow = $(this);

            if (!arrow.hasClass('animate')) {
                arrow.addClass('animate');
                setTimeout(() => {
                    arrow.removeClass('animate');
                }, 1600);
            }
        });

        jQuery('.favorites-slider').slick({
            dots: false,
            arrow: true,
            infinite: false,
            speed: 300,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="fa fa-chevron-right"></i></a>',
            prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="fa fa-chevron-left"></i></a>',
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
            ]
        });

        jQuery('#top-ten-slider').slick({
            slidesToScroll: 1,
            slidesToShow: 1,
            arrows: false,
            fade: true,
            asNavFor: '#top-ten-slider-nav',
            responsive: [{
                breakpoint: 992,
                settings: {
                    asNavFor: false,
                    arrows: true,
                    nextArrow: '<button class="NextArrow"><i class="fa fa-angle-right"></i></button>',
                    prevArrow: '<button class="PrevArrow"><i class="fa fa-angle-left"></i></button>',
                }
            }]
        });
        jQuery('#top-ten-slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '#top-ten-slider',
            dots: false,
            arrows: true,
            infinite: true,
            vertical: true,
            verticalSwiping: true,
            centerMode: false,
            nextArrow: '<button class="NextArrow"><i class="fa fa-angle-down"></i></button>',
            prevArrow: '<button class="PrevArrow"><i class="fa fa-angle-up"></i></button>',
            focusOnSelect: true,
            responsive: [{
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 2,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        asNavFor: false,
                    }
                },
            ]
        });


        jQuery("#trending-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            draggable: false,
            asNavFor: "#trending-slider-nav",
        });

        jQuery("#trending-slider-nav").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: "#trending-slider",
            dots: false,
            arrows: true,
            nextArrow: '<a href="#" class="slick-arrow slick-next"><i class="fa fa-chevron-right"></i></a>',
            prevArrow: '<a href="#" class="slick-arrow slick-prev"><i class="fa fa-chevron-left"></i></a>',
            infinite: true,
            centerMode: true,
            centerPadding: 0,
            focusOnSelect: true,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        });

        jQuery('.episodes-slider1').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i> "],
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                1000: {
                    items: 4
                }
            }
        });


        jQuery('.trending-content').each(function() {
            var highestBox = 0;
            jQuery('.tab-pane', this).each(function() {
                if (jQuery(this).height() > highestBox) {
                    highestBox = jQuery(this).height();
                }
            });
            jQuery('.tab-pane', this).height(highestBox);
        });

        if (jQuery('select').hasClass('season-select')) {
            jQuery('select').select2({
                theme: 'bootstrap4',
                allowClear: false,
                width: 'resolve'
            });
        }




    });
})(jQuery);

var e_thumbnail = "";
var s_title = "";
var e_title = "";
var e_number = "";
var ACCESS_TOKEN = "LNDJgOit5yaRIWN";
var DEVICE_TYPE = "com.crunchyroll.windows.desktop";
var LOCALE = "enUS";
var VERSION = "1.1.20.0";
var CONNECTIVITY_TYPE = "ethernet";
var recentResponse;
const recentMap = new Map();
var recentSort = [];

var liTemplate = `<li class="slide-item">
                                    <div class="block-images position-relative">
                                        <div class="img-box">
                                            <img src="${e_thumbnail}" class="img-fluid" alt="">
                                        </div>
                                        <div class="block-description">
                                            <h6 class="iq-title">
                                                <a href="#">${s_title}</a>
                                            </h6>
                                            <div class="movie-time d-flex align-items-center my-2">
                                                <div class="badge badge-secondary p-1 mr-2">${e_title}</div>
                                                <span class="text-white">Episode #${e_number}</span>
                                            </div>
                                            <div class="hover-buttons">
                                                <span class="btn btn-hover iq-button">
                          <i class="fa fa-play mr-1"></i>
                          Play Now
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;

function continueWatching() {
    let xmlHttpReq = new XMLHttpRequest();
    let url = `https://api.crunchyroll.com/recently_watched.0.json?session_id=${localStorage.getItem("session_id")}&media_types=anime%7Cdrama&fields=media.media_id,media.available,media.available_time,media.collection_id,media.collection_name,media.series_id,media.type,media.episode_number,media.name,media.description,media.screenshot_image,media.created,media.duration,media.playhead,media.bif_url,series.series_id,series.name,series.portrait_image,series.landscape_image,series.description,series.in_queue&limit=24&offset=0&locale=${LOCALE}&version${VERSION}&connectivity_type=${CONNECTIVITY_TYPE}`;
    xmlHttpReq.onreadystatechange = function() {
        if (xmlHttpReq.readyState == 4) {
            if (xmlHttpReq.status == 200) {
                recentResponse = JSON.parse(xmlHttpReq.responseText);
                if (recentResponse.error == true)
                    window.location.href = "../index.html";
                for (var i = 0; i < recentResponse.data.length; i++) {
                    if (recentMap.has(recentResponse.data[i]["series"]["name"]) == false) {
                        recentMap.set(recentResponse.data[i]["series"]["name"], recentResponse.data[i]);
                    }
                }
                recentMap.forEach((value, key) => {
                    recentSort.push(recentMap.get(key))

                })
                recentSort.sort(function(a, b) {
                    return new Date(b.timestamp) - new Date(a.timestamp);
                })
                let selection = document.querySelector("#iq-upcoming-movie\\  > div > div > div > div.favorite-contens > ul");
                for (var i = 0; i < recentSort.length; i++) {
                    e_thumbnail = recentSort[i].media.screenshot_image.full_url;
                    s_title = recentSort[i].series.name;
                    e_title = recentSort[i].media.name;
                    e_number = recentSort[i].media.episode_number;
                    liTemplate = `<li class="slide-item">
                                    <div class="block-images position-relative">
                                        <div class="img-box">
                                            <img src="${e_thumbnail}" class="img-fluid" alt="">
                                        </div>
                                        <div class="block-description">
                                            <h6 class="iq-title">
                                                <a href="#">${s_title}</a>
                                            </h6>
                                            <div class="movie-time d-flex align-items-center my-2">
                                                <div class="badge badge-secondary p-1 mr-2">${e_title}</div>
                                                <span class="text-white">Episode #${e_number}</span>
                                            </div>
                                            <div class="hover-buttons">
                                                <span class="btn btn-hover iq-button">
                          <i class="fa fa-play mr-1"></i>
                          Play Now
                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>`;
                    selection.innerHTML += liTemplate;
                }
            } else if (xmlHttpReq.status == 400) {
                alert('There was an error 400');
            } else {
                alert('something else other than 200 was returned');
            }
        }
    };
    xmlHttpReq.open("GET", url, false);
    xmlHttpReq.send();
}
var currFocus;
var slidePos = 0;

function handleKeydown(event) {
    switch (event.keyCode) {
        case tizen.tvinputdevice.getKey('ArrowRight').code: //10252
            if (document.getElementsByClassName("focused").length) {
                document.getElementsByClassName("focused")[0].className = document.getElementsByClassName("focused")[0].className.replace(' focused', '');
            }
            if (currFocus == null) {
                currFocus = 0;
                document.querySelector(`[data-slick-index="${currFocus}"]`).className += " focused";
            } else {
                switch (slidePos) {
                    case 3:
                        if (currFocus < document.querySelector('#iq-upcoming-movie\\  > div > div > div > div.favorite-contens > ul').slick.slideCount - 1) {
                            document.querySelector('#iq-upcoming-movie\\  > div > div > div > div.favorite-contens > ul').slick.$nextArrow.click();
                            currFocus++;
                        }
                        break;
                    case 1:
                    case 2:
                    case 0:
                        currFocus++;
                        slidePos++;
                        break;
                }
                document.querySelector(`[data-slick-index="${currFocus}"]`).className += " focused";
                break;
            }
            break;
        case tizen.tvinputdevice.getKey('ArrowLeft').code: //403
            if (document.getElementsByClassName("focused").length) {
                document.getElementsByClassName("focused")[0].className = document.getElementsByClassName("focused")[0].className.replace(' focused', '');
            }
            if (currFocus == null) {
                currFocus = 0;
                document.querySelector(`[data-slick-index="${currFocus}"]`).className += " focused";
            } else {
                switch (slidePos) {
                    case 0:
                        if (currFocus != 0) {
                            document.querySelector('#iq-upcoming-movie\\  > div > div > div > div.favorite-contens > ul').slick.$prevArrow.click();
                            currFocus--;
                        }
                        break;
                    case 1:
                    case 2:
                    case 3:
                        slidePos--;
                        currFocus--;
                        break;
                }
                document.querySelector(`[data-slick-index="${currFocus}"]`).className += " focused";
                break;
            }
            break;
    }
}

document.body.addEventListener('keydown', handleKeydown);