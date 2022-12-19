(function ($) {
    "use strict";

    console.clear();

    gsap.set(window, {
        scrollTo: 0,

    })

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    var keys = {
        37: 1,
        38: 1,
        39: 1,
        40: 1
    };

    function preventDefault(e) {
        e.preventDefault();
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    // modern Chrome requires { passive: false } when adding event
    var supportsPassive = false;
    try {
        window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
            get: function () {
                supportsPassive = true;
            }
        }));
    } catch (e) {}

    var wheelOpt = supportsPassive ? {
        passive: false
    } : false;
    var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

    // call this to Disable
    function disableScroll() {
        window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
        window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
        window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
        window.addEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    // call this to Enable
    function enableScroll() {
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
        window.removeEventListener('touchmove', preventDefault, wheelOpt);
        window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
    }

    function sheeriaLanding() {

        var landing = $('.sheeria-landing'),
            heading = landing.find('h1'),
            subTitle = landing.find('h5');

        new SplitText(heading, {
            type: 'lines',
            linesClass: 'anim-line',
        })

        var lines = heading.find('.anim-line');

        lines.wrapInner('<span></span>');

        var lineSpan = lines.find('span');


        gsap.fromTo(lineSpan, {
            yPercent: 100
        }, {
            yPercent: 0,
            duration: 1,
            stagger: 0.1,
            delay: 1,
            ease: 'power2.out',

        })

        new SplitText(subTitle, {
            type: 'lines, chars',
            linesClass: 'anim-line',
            charsClass: 'anim-char',
        })


        var char = subTitle.find('.anim-char');


        gsap.fromTo(char, {
            yPercent: 100
        }, {
            yPercent: 0,
            duration: 1,
            stagger: 0.02,
            ease: 'power2.out',
            delay: 1,
            onComplete: function () {

                subTitle.parent('.text-wrapper').addClass('is-inview')
            }

        })


        let img = landing.find('.like-this'),
            imgWidth = img.outerWidth(),
            imgHeight = img.outerHeight();

        img.wrap('<div class="img-anim"><div class="img-anim-wrap"></div></div>');

        let wrap = img.parent('.img-anim-wrap'),
            parent = img.parents('.img-anim'),
            lefto = parent.outerWidth() / 2 - imgWidth / 2;


        gsap.set(img, {
            height: imgHeight,
            width: imgWidth
        })

        gsap.set(wrap, {
            height: imgHeight,
            width: 0,
            position: 'relative',
            display: 'block',
            overflow: 'hidden',
            left: lefto
        })

        gsap.to(wrap, {
            width: imgWidth,
            duration: 2,
            ease: 'power3.inOut',
            onComplete: function () {


                gsap.to('.scroll-button-icon', {
                    y: '-50%',
                    opacity: 1,
                    onComplete: function () {
                        $('.scroll-button-icon').addClass('in-view')

                    }
                })

                gsap.to('#scroll-button-text', {
                    opacity: 1,
                    duration: 1
                })
            }
        })

        gsap.to(parent, {
            marginTop: '-20vh',
            scrollTrigger: {
                trigger: parent,
                start: 'top bottom',
                scrub: 1
            }
        })





    }


    function sheeriaIntro() {

        disableScroll();

        var intro = $('.sheeria-intro'),
            siteLogo = $('.site-logo'),
            siteLogoTop = siteLogo.offset().top,
            siteLogoLeft = siteLogo.offset().left,
            introLogo = $('.intro-logo'),
            introButton = $('.intro-button');




        introButton.on('click', function () {

            let $this = $(this).parent(intro),
                video = $this.find('video');


            var introAnim = gsap.timeline({
                yoyo: true,
                onComplete: function () {

                    enableScroll();
                    gsap.set('#page', {
                        visibility: 'visible'
                    })

                    sheeriaLanding();
                    sheeriaCharis();

                    $this.addClass('done');

                    gsap.to($this, {
                        opacity: 0
                    })



                }
            })

            introAnim.to(introButton, {
                opacity: 0,
                scale: 0.8,
                duration: 1,
                ease: 'power3.out'
            }, 0)

            introAnim.to(introLogo, {
                top: siteLogoTop,
                left: siteLogoLeft,
                width: 50,
                duration: 1.5,
                yPercent: 0,
                xPercent: 0,
                ease: 'power3.inOut'
            }, 0.35)


            introAnim.to(video, {
                scale: 3,
                duration: 1,
                ease: 'power3.in',


            }, 0)

            introAnim.to('.header-wrap', {
                y: 0,
                duration: 1.5,
                ease: 'power3.out',


            }, 0.5)



        })




    }




    function fullscrenMenu() {

        var menu = $('.fs-menu').find('.main-menu'),
            menuItem = menu.find('li');

        new SplitText('.cta-text', {
            type: 'lines'
        })

        menuItem.each(function (i) {
            i++

            let $this = $(this),
                link = $this.children('a');

            link.attr('data-index', '0' + i)


        })

        var toggle = $('.hamburger-toggle'),
            fsMenu = $('.fullscreen-menu');

        var fsAnim = gsap.timeline({
            yoyo: true,
            delay: .3,
            paused: true,
            onReverseComplete: function () {
                fsMenu.removeClass('is-active');
                enableScroll();

                gsap.set('.cta-wrap', {
                    opacity: 0,
                    visibility: 'hidden'
                })


            }
        })

        fsAnim.to('.fs-menu .menu-item', {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: .7,
            ease: 'power3.out',
        }, 0)

        fsAnim.to('.cta-text div', {
            x: 0,
            opacity: 1,
            stagger: 0.05,
            duration: .7,
            ease: 'power3.out',
            onStart: function () {

                gsap.set('.cta-wrap', {
                    opacity: 1,
                    visibility: 'visible'
                })

            }
        }, .1)

        fsAnim.to('.cta-icon', {
            x: 0,
            opacity: 1,
            duration: .7,
            ease: 'power3.out'
        }, .3)

        fsAnim.to('.fs-widget-wrap', {
            y: 0,
            opacity: 1,
            duration: .7,
            ease: 'power3.out'
        }, .3)

        toggle.on('click', function () {

            var clicks = $(this).data('clicks');



            if (clicks) {


                toggle.removeClass('is-active')
                fsAnim.reverse();

            } else {
                disableScroll();
                fsMenu.addClass('is-active');

                fsAnim.play();
                toggle.addClass('is-active')
            }
            $(this).data("clicks", !clicks);



        })






    }
    fullscrenMenu();

    function sheeriaServices() {

        var servicesSlider = new Swiper('.services-wrap', {
            mousewheel: {
                eventsTarget: '.sheeria-services',
                invert: false,
                releaseOnEdges: true
            },
            direction: 'vertical',
            slidesPerView: 1,
            speed: 1000
        });

        servicesSlider.mousewheel.disable();


        var mouseDot = $('.mi-dot');

        gsap.to(mouseDot, {
            y: 35,
            repeat: -1,
            opacity: 0,
            duration: 1
        })

        var services = $('.sheeria-services'),
            parentSec = services.parents('.section'),
            secHeight = parentSec.outerHeight(),
            winHeight = $(window).outerHeight(),
            service = $('.service.swiper-slide'),
            serviceLength = service.length,
            miBg = $('.mi-bg');

        $('.sf-tot').text('0' + serviceLength)

        for (var i = 0; i < serviceLength - 1; i++) {
            miBg.clone().addClass('index_' + (i)).insertBefore(miBg);


        }


        gsap.set(services, {
            height: winHeight - secHeight
        });

        $('.mi-bg:last-child').addClass('index_' + (serviceLength - 1))

        servicesSlider.on('slideNextTransitionStart', function () {

            var activeIndex = servicesSlider.activeIndex,
                findBg = '.index_' + activeIndex,
                nextBg = '.index_' + (activeIndex + 1);

            gsap.to(findBg, {
                yPercent: -90,
                scale: 2.5,
                duration: 2

            })

            gsap.to(nextBg, {
                yPercent: -20,
                scale: 1,
                duration: 2

            })

            $('.sf-curr').text('0' + (activeIndex + 1))

        })

        servicesSlider.on('slidePrevTransitionStart', function () {

            var activeIndex = servicesSlider.snapIndex,
                findBg = '.index_' + (activeIndex + 1),
                prevBg = '.index_' + (activeIndex + 2);


            gsap.to(findBg, {
                yPercent: -20,
                scale: 1,
                duration: 2

            })

            gsap.to(prevBg, {
                yPercent: 10,
                scale: 1,
                duration: 2
            })

            $('.sf-curr').text('0' + (activeIndex + 1))


        })


        setTimeout(function () {

            var servicesIn = gsap.timeline({
                yoyo: true
            });

            servicesIn.to('.wrapper.try', {
                height: 0,
                marginBottom: 0,
            }, 0)

            servicesIn.to(services, {
                height: winHeight,
                onComplete: function () {

                    var activeIndex = servicesSlider.activeIndex,
                        findBg = '.index_' + activeIndex,
                        nextBg = '.index_' + (activeIndex + 1);

                    gsap.to(nextBg, {
                        yPercent: -20,
                        scale: 1,
                        duration: 2

                    })


                    gsap.to(findBg, {
                        yPercent: -90,
                        scale: 2.5,
                        duration: 2

                    })


                }
            }, 0)


            ScrollTrigger.create({
                trigger: parentSec,
                start: 'top top',
                end: 'bottom+=1000 bottom',
                pin: true,
                animation: servicesIn,
                scrub: false,
                repeat: true,
                onEnter: function () {
                    gsap.to('.wrapper.try', {
                        opacity: 0,
                        onComplete: function () {
                            servicesSlider.mousewheel.enable();

                        }
                    });

                    gsap.to('.sheeria-services-hold', {
                        opacity: 1
                    })

                    gsap.set('.wrapper.try', {
                        overflow: 'hidden'
                    })



                },
                onEnterBack: function () {

                    servicesSlider.mousewheel.enable();



                },

                onLeaveBack: function () {

                    servicesSlider.mousewheel.disable();



                },
                onLeave: function () {
                    servicesSlider.mousewheel.disable();

                    $('.services-link').removeClass('is-inview');
                    gsap.to('.services-link', {
                        y: '100%',

                    })

                }
            })

        }, 100)

        servicesSlider.on('reachEnd', function () {

            $('.services-link').addClass('is-inview');
            gsap.to('.services-link', {
                y: '50%',

            })

        })


    }

    function sheeriaTeamCarousel() {

        var teamWrap = $('.team-wrapper'),
            sec = teamWrap.parents('.section');

        gsap.to(teamWrap, {
            xPercent: -90,
            scrollTrigger: {
                trigger: sec,
                start: 'top top',
                end: 'bottom+=1500 bottom',
                scrub: 1,
                pin: true,
            }
        })


    }

    function sheeriaScrollButton() {

        var text = $('#scroll-button-text'),
            scrollButton = $('.scroll-button');

        new CircleType(document.getElementById('scroll-button-text'));

        gsap.to(text, {
            rotate: 360,
            repeat: -1,
            duration: 20,
            ease: 'none'
        });

        let scrollSize = $('.sheeria-landing').outerHeight();

        scrollButton.on('click', function () {

            gsap.to(window, {
                duration: 1.5,
                scrollTo: scrollSize,
                ease: 'power3.inOut'
            });


        })

    }

    function sheeriaCircularVideo() {

        ScrollTrigger.create({
            trigger: '.circular-video',
            start: 'top+=10% bottom',
            onEnter: function () {

                $('.circular-video').addClass('is-inview');

            }
        })

    }
    sheeriaCircularVideo();

    function sheeriaPlayMusicButton() {

        var button = $('.play-music-button');

        if ($('.play-music-button').length) {

            var text = $('#pmb-text'),
                scrollButton = $('.play-music-button');

            new CircleType(document.getElementById('pmb-text'));

            gsap.to(text, {
                rotate: 360,
                repeat: -1,
                duration: 20,
                ease: 'none'
            });

            var iconLineFirst = $('.pmb-icon').find('span:first-child'),
                iconLineLast = $('.pmb-icon').find('span:last-child');


            var ilf = gsap.timeline({
                repeat: -1,

            })
            ilf.to(iconLineFirst, {
                height: '30%',

            });
            ilf.to(iconLineFirst, {
                height: '100%',

            })

            var ill = gsap.timeline({
                repeat: -1,
                delay: .3,

            })
            ill.to(iconLineLast, {
                height: '10%',

            });

            ill.to(iconLineLast, {
                height: '100%',

            });

            var colSize = button.parent('div').outerWidth(),
                winSize = $(window).outerWidth(),
                rightPos = (winSize - colSize) / 2;

            ScrollTrigger.create({
                trigger: '.play-music-button',
                start: 'bottom bottom-=5%',
                end: 'bottom bottom',
                onEnter: function () {

                    var parent = button.parents('.c-col-12'),
                        butHeight = parent.outerHeight();

                    gsap.set(parent, {
                        paddingBottom: butHeight
                    })


                    gsap.set('.play-music-button', {
                        position: 'fixed',
                        bottom: '5%',
                        right: rightPos + 15

                    })




                },
                onEnterBack: function () {

                    gsap.set('.play-music-button', {
                        position: 'relative',
                        bottom: 'unset',
                        right: 'unset'

                    })

                    var parent = button.parents('.c-col-12');

                    gsap.set(parent, {
                        paddingBottom: 0
                    })


                }
            })

            button.on('click', function () {

                var clicks = $(this).data('clicks'),
                    music = document.getElementById("pageMusic");


                if (clicks) {

                    music.pause();

                } else {
                    music.play();
                }
                $(this).data("clicks", !clicks);

            })

        }





    }

    function sheeriaTextScrollAnimations() {

        var hasAnim = $('.has-anim');

        hasAnim.each(function () {


            let $this = $(this),
                anim = $this.data('anim'),
                title = $this.parent('.sheeria-title');


            if (anim === 'linesUp') {


                new SplitText($this, {
                    type: 'lines',
                    linesClass: 'anim-line',
                })

                var lines = $this.find('.anim-line');

                lines.wrapInner('<span></span>');

                var lineSpan = lines.find('span');


                gsap.fromTo(lineSpan, {
                    yPercent: 100
                }, {
                    yPercent: 0,
                    duration: 1,
                    stagger: 0.1,
                    delay: .3,

                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: $this,
                        start: 'top bottom'
                    }
                })

            }

            if (anim === 'fillBack') {


                new SplitText($this, {
                    type: 'lines',
                    linesClass: 'fill-line'
                })

                let lines = $this.find('.fill-line');


                lines.each(function () {

                    let $this = $(this);

                    $this.clone().addClass('line-fill-layer').appendTo($this);

                    gsap.set('.line-fill-layer', {
                        position: 'absolute'
                    })

                    let fillLayer = $this.children('.line-fill-layer');

                    gsap.to(fillLayer, {
                        width: '100%',
                        scrollTrigger: {
                            trigger: $this,
                            scrub: 1
                        }
                    })


                })


            }

            if (anim === 'charsUp') {


                new SplitText($this, {
                    type: 'lines, chars',
                    linesClass: 'anim-line',
                    charsClass: 'anim-char',
                })


                var char = $this.find('.anim-char');


                gsap.fromTo(char, {
                    yPercent: 100
                }, {
                    yPercent: 0,
                    duration: 1,
                    stagger: 0.02,
                    delay: .3,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: $this,
                        start: 'top bottom'
                    },
                    onStart: function () {

                        if (title.length) {
                            title.addClass('is-inview')
                        }

                    }
                })

            }




        })



    }

    function sheeriaImageScrollAnimations() {

        var hasAnim = $('img.has-anim');

        hasAnim.each(function () {

            let $this = $(this),
                anim = $this.data('anim');

            if (anim === 'writeText') {

                let imgWidth = $this.outerWidth(),
                    imgHeight = $this.outerHeight();

                $this.wrap('<div class="img-anim"><div class="img-anim-wrap"></div></div>');

                var wrap = $this.parent('.img-anim-wrap'),
                    parent = $this.parents('.img-anim'),
                    lefto = 0,
                    singo = $this.parents('.single-image'),
                    pageNav = $this.parents('.sheeria-page-nav');

                if (pageNav.length) {

                    var parent = $this.parents('.nav-bg-text'),
                        lefto = parent.outerWidth() / 2 - imgWidth / 2;
                }

                if (singo.hasClass('align-right')) {

                    var lefto = parent.outerWidth() - imgWidth;
                }


                gsap.set($this, {
                    height: imgHeight,
                    width: imgWidth,

                })

                gsap.set(wrap, {
                    height: imgHeight,
                    width: 0,
                    position: 'relative',
                    display: 'block',
                    overflow: 'hidden',
                    left: lefto
                })

                gsap.to(wrap, {
                    width: imgWidth,
                    duration: 2,
                    ease: 'power3.inOut',
                    delay: .5,
                    scrollTrigger: {
                        trigger: wrap,
                    }
                })

            }





        })





    }


    function sheeriaCharis() {

        $('.charis-a img').each(function (i) {

            i++
            let $this = $(this);

        })


        gsap.fromTo('.sheeria-chairs img', {
            yPercent: 200
        }, {
            yPercent: 0,
            stagger: -0.015,
            ease: 'power3.out',
            duration: 1.5,
            delay: 1,
            onStart: function () {

                $('.sheeria-landing .landing-image').addClass('is-inview');

            },
            onComplete: function () {

                gsap.to('.sheeria-chairs img', {
                    yPercent: 50,
                    scrollTrigger: {
                        trigger: '.sheeria-landing',
                        scrub: 1,
                        start: 'bottom bottom'
                    }
                })

            }
        })

    }

    function sheeriaFooter() {

        $('.back-to-top').on('click', function () {

            gsap.to(window, {
                scrollTo: 0,
                duration: 3,
                ease: 'power3.inOut'
            })

        });

        ScrollTrigger.create({
            trigger: '.footer-headline',
            onEnter: function () {

                $('.footer-headline').addClass('is-inview');
            }
        })




    }

    function sheeriaContactForm() {

        var sheeriaForm = $('.sheeria-form');

        sheeriaForm.each(function () {

            let $this = $(this),
                input = $this.find(":input");


            input.on('focus', function () {

                let $this = $(this),
                    fieldWrap = $this.parent('div');

                fieldWrap.addClass('focus')


            })

            input.on('focusout', function () {

                let $this = $(this),
                    fieldWrap = $this.parent('div');

                if (!$(this).val()) {
                    fieldWrap.removeClass('focus')

                }

            })

        })



    }
    sheeriaContactForm();

    function sheeriaGreekTheater() {

        var greek = $('.greek-theater-section'),
            light = greek.find('.greek-light'),
            logo = greek.find('.greek-logo'),
            title = greek.find('.g-title'),
            text = greek.find('.g-text');

        new SplitText(title, {
            type: 'lines',
            linesClass: 'g-line'
        })

        new SplitText(text, {
            type: 'lines',
            linesClass: 'g-line'
        })

        gsap.fromTo(light, {
            yPercent: -10,
            opacity: 0,
            rotate: -45
        }, {
            yPercent: 0,
            opacity: 1,
            rotate: 0,
            scrollTrigger: {
                trigger: greek,
                start: 'top+=50% bottom'
            },
            duration: 2,
            ease: 'power4.inOut'
        })

        gsap.fromTo(logo, {
            yPercent: -50,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            scrollTrigger: {
                trigger: greek,
                start: 'top+=15% bottom'
            },
            duration: 1,
            ease: 'power4.out'
        })

        gsap.fromTo('.g-line', {
            yPercent: 100,
            opacity: 0
        }, {
            yPercent: 0,
            opacity: 1,
            stagger: 0.07,
            scrollTrigger: {
                trigger: '.greek-content',
                start: 'top+=15% bottom'
            },
            duration: 1,
            ease: 'power4.out',
            delay: 0.5
        })





    }
    sheeriaGreekTheater();

     

    $(window).on('load', function () {

        window.scrollTo(0, 0);

        if ($('.sheeria-intro').length) {
            sheeriaIntro();

        } else {

            enableScroll();
            sheeriaLanding();
            sheeriaCharis();


            gsap.to('.header-wrap', {
                y: 0,
                duration: 1.5,
                ease: 'power3.out',


            })


        }

        sheeriaScrollButton();

        sheeriaPlayMusicButton();
        sheeriaServices();

        setTimeout(function () {

                sheeriaTeamCarousel();
                sheeriaTextScrollAnimations();
                sheeriaImageScrollAnimations();
                sheeriaFooter();

                ScrollTrigger.update();
                ScrollTrigger.refresh();




            }, 500)

      



    })




}(jQuery));
