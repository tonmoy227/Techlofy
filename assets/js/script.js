/* -----------------------------------------------------------------------------



File:           JS Core
Version:        1.0
Last change:    00/00/00 
-------------------------------------------------------------------------------- */
;(function($) {

	"use strict";
	gsap.config({
		nullTargetWarn: false,
	});

// lenis-smooth-scroll
	const lenis = new Lenis({
		duration: .8, 
		easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
		direction: 'vertical', 
		smooth: true, 
		smoothTouch: false, 
	});

	function raf(time) {
		lenis.raf(time);
		requestAnimationFrame(raf);
	}
	requestAnimationFrame(raf);


	function TXTheaderSticky() {
		var $window = $(window);
		var lastScrollTop = 0;
		var $header = $('.txa_sticky_header');
		var headerHeight = $header.outerHeight() + 30;

		$window.scroll(function () {
			var windowTop = $window.scrollTop();

			if (windowTop >= headerHeight) {
				$header.addClass('txa_sticky');
			} else {
				$header.removeClass('txa_sticky');
				$header.removeClass('txa_sticky_show');
			}

			if ($header.hasClass('txa_sticky')) {
				if (windowTop < lastScrollTop) {
					$header.addClass('txa_sticky_show');
				} else {
					$header.removeClass('txa_sticky_show');
				}
			}

			lastScrollTop = windowTop;
		});
	}
	TXTheaderSticky();
	jQuery(window).on('scroll', function() {
		if (jQuery(window).scrollTop() > 250) {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').addClass('sticky-on')
		} else {
			jQuery('.ag-header-section.header_style_three, .ag-header-section.header_style_four').removeClass('sticky-on')
		}
	});
	$('.open_mobile_menu').on("click", function() {
		$('.mobile_menu_wrap').toggleClass("mobile_menu_on");
	});
	$('.open_mobile_menu').on('click', function () {
		$('body').toggleClass('mobile_menu_overlay_on');
	});
	jQuery(".mobile-main-navigation li.dropdown").append('<span class="dropdown-btn"><i class="fas fa-angle-down"></i></span>'),
	jQuery(".mobile-main-navigation li .dropdown-btn").on("click", function () {
		jQuery(this).hasClass("active")
		? (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"), jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle())
		: (jQuery(this).closest("ul").find(".dropdown-btn.active").toggleClass("active"),
			jQuery(this).closest("ul").find(".dropdown-menu.active").toggleClass("active").slideToggle(),
			jQuery(this).toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").toggleClass("active"),
			jQuery(this).parent().find("> .dropdown-menu").slideToggle());
	});
	// Background Image
	$('[data-background]').each(function() {
		$(this).css('background-image', 'url('+ $(this).attr('data-background') + ')');
	});
	gsap.registerPlugin(ScrollTrigger);
	
	// Animation
	if($('.wow').length){
		var wow = new WOW(
		{
			boxClass:     'wow',
			animateClass: 'animated',
			offset:       0,
			mobile:       true,
			live:         true
		}
		);
		wow.init();
	};
	jQuery('.video_box').magnificPopup({
		disableOn: 200,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
	});
	$(window).on("scroll", function() {
		if ($(this).scrollTop() > 200) {
			$('.tc-scrollup').fadeIn();
		} else {
			$('.tc-scrollup').fadeOut();
		}
	});
	$('.tc-scrollup').on("click", function()  {
		$("html, body").animate({
			scrollTop: 0
		}, 800);
		return false;
	}); 
	// windows-loaded-before-functions
	document.addEventListener("DOMContentLoaded", function () {
		window.addEventListener('load', function(){


			let preloader = document.querySelector("#preloader");
			if (preloader) {
				preloader.classList.add("preloaded");
				setTimeout(function () {
					preloader.remove();
				}, 1000 ) ;
			}

			setTimeout(function() {
				
			}, 700);
		})		
	});
	if (window.matchMedia("(min-width: 1600px)").matches) {
		var TechHero = gsap.timeline({
			scrollTrigger: {
				trigger: '.tc-hero-sec',
				start: "top 0%",
				end: "bottom 30%",
				scrub: 1.5,
				pin: true,
				pinSpacing: true,
				markers: false
			}

		});

		TechHero
		.to( ".tc-hero-sec" , {paddingLeft: 20, paddingRight: 20, duration: 1, ease: "power1.out" })
		.to( ".tc-hero-sec .tc-hero-bg" , { opacity: 0, duration: 1, ease: "power1.out" })
		.to( ".tc-hero-sec .tc-hero-img-wrap" , { gap: "10px", duration: 1, ease: "power1.out" })
		.from( ".tc-hero-img2 .circle-shape" , { scale: 0, duration: 3, ease: "power1.out" })
		.to( ".tc-hero-img1" , { yPercent: -100, duration: 4, ease: "power1.out" },"< = 2")
		.to( ".tc-hero-img3" , { yPercent: -100, duration: 4, ease: "power1.out" },"<")
		.to( ".tc-hero-content" , { scale: 6, duration: 5, ease: "power1.out" })
	}

	if (window.matchMedia("(min-width: 1600px)").matches) {
		var TECHAB = gsap.timeline({
			scrollTrigger: {
				trigger: '.tc-about-sec',
				start: "top 20%",
				end: "bottom bottom",
				toggleActions: "play none none reverse",
				markers: false,
			}

		});
		TECHAB
		.from(".tc-about-sec", { opacity: 0 ,  });
	}

	if($('.tx-split-text').length) {
		var st = jQuery(".tx-split-text");
		if(st.length == 0) return;
		gsap.registerPlugin(SplitText);
		st.each(function(index, el) {
			el.split = new SplitText(el, { 
				type: "lines,words,chars",
				linesClass: "split-line"
			});
			gsap.set(el, { perspective: 400 });
			if( jQuery(el).hasClass('split-in-up') ){
				gsap.set(el.split.chars, {
					opacity: 0,
					x: 15,
					ease: "back.out",
				});
			}
			el.anim = gsap.to(el.split.chars, {
				scrollTrigger: {
					trigger: el,
					start: "top 90%",
				},
				x: "0",
				y: "0",
				rotateX: "0",
				rotationX: "0",
				color: 'inherit',
				webkitTextStroke: "0px white",
				scale: 1,
				opacity: 1,
				duration: .5, 
				stagger: 0.02,
			});
		});
	};

	if (window.matchMedia("(min-width: 1600px)").matches) {
		
		const line1 = document.querySelector(".title_line_1");
		const line2 = document.querySelector(".title_line_2");
		const btn   = document.querySelector(".tc-about-text1 .tc-btn1");

		if (line1 && line2 && btn) {
			const split1 = new SplitText(line1, {
				type: "lines,words,chars",
				linesClass: "split-line"
			});
			const split2 = new SplitText(line2, {
				type: "lines,words,chars",
				linesClass: "split-line"
			});

			gsap.set([split1.chars, split2.chars], { opacity: 0, y: -7 });
			gsap.set(btn, { opacity: 0, y: 20 });

			const master = gsap.timeline({
				scrollTrigger: {
					trigger: ".tc-about-text1",
					start: "top 40%",
					end: "top 0%",
					scrub: 1,
					markers: false
				}
			});

			master
			.to(split1.chars, {
				opacity: 1,
				x: 0,
				duration: 1,
				stagger: 0.05,
				ease: "power2.out"
			})
			.set(line1.querySelectorAll("span"), { color: "#3CEDB7" })
			.to(line1, {
				opacity: 0,
				duration: 0.8,
				ease: "power1.out"
			}, "+=0.3")

			.to(split2.chars, {
				opacity: 1,
				x: 0,
				duration: 1.5,
				stagger: 0.05,
				ease: "power2.out"
			}, ">")
			.set(line2.querySelectorAll("span"), { color: "#3CEDB7" })

        // 🔥 Make sure line 2 is visible
			.to(line2, {
				opacity: 1,
				duration: 1.5,
				ease: "power1.out"
			}, "+=0.3")

        // 🚀 FINAL — Show Button AFTER everything
			.to(btn, {
				opacity: 1,
				y: 0,
				duration: 1.2,
				ease: "power3.out"
			}, "0");
		}

		var TechAB2 = gsap.timeline({
			scrollTrigger: {
				trigger: '.tc-about-content',
				start: "top 0%",
				end: "bottom 30%",
				scrub: 1.5,
				pin: true,
				pinSpacing: true,
				markers: false
			}
		});
		
	}
	if ($('.tc-spon-slider').length > 0 ) {
		var slider = new Swiper('.tc-spon-slider', {
			spaceBetween: 12,
			slidesPerView: 6,
			loop: true,
			autoplay: {
				enabled: true,
				delay: 3000
			},
			speed: 400,
			breakpoints: {
				'1600': {
					slidesPerView: 6,
				},
				'1200': {
					slidesPerView: 5,
				},
				'992': {
					slidesPerView: 5,
				},
				'768': {
					slidesPerView: 5,
				},
				'576': {
					slidesPerView: 3,
				},
				'480': {
					slidesPerView: 2,
				},
				'0': {
					slidesPerView: 1,
				},
			},
		});
	};

	if ($('.tc-case-slider').length > 0 ) {
		var slider = new Swiper('.tc-case-slider', {
			slidesPerView: 0,
			loop: true,
			spaceBetween: 3,
			speed: 1000,
			autoplay: {
				enabled: true,
				delay: 6000
			},
			breakpoints: {
				'1600': {
					slidesPerView: 4,
				},
				'1300': {
					slidesPerView: 3,
				},
				'992': {
					slidesPerView: 2,
				},
				'991': {
					slidesPerView: 2,
				},
				'800': {
					slidesPerView: 2,
				},
				'576': {
					slidesPerView: 1,
				},
				'0': {
					slidesPerView: 1,
				},
			},
		});
	};

	const accordionItems = document.querySelectorAll('.tc-faq-content .accordion-item');

	accordionItems.forEach(item => {
		const btn = item.querySelector('.tc-faq-content .accordion-button');
		btn.addEventListener('click', () => {
			accordionItems.forEach(i => i.classList.remove('active'));
			setTimeout(() => {
				if (!btn.classList.contains('collapsed')) {
					item.classList.add('active');
				}
			}, 200);
		});
	});

	const boxes = gsap.utils.toArray('.txt_item_active');
	boxes.forEach(svg => {
		gsap.to(svg, {
			scrollTrigger: {
				trigger: svg,
				start: "top 100%",
				end: "bottom bottom",
				toggleClass: "active",
				duration: 3,
				delay:1,
				toggleActions: "play play play reverse",
				once: true,
			}
		});
	});


	if ($('.tc-testi-slider').length > 0 ) {
		var slider = new Swiper('.tc-testi-slider', {
			spaceBetween: 0,
			slidesPerView: 1,
			loop: true,
			speed: 1000,
			effect: "fade",
			autoplay: {
				enabled: true,
				delay: 6000
			},
			navigation: {
				prevEl: ".tc-testi-prev",
				nextEl: ".tc-testi-next",
			},

		});
	};

	if($(".tc-blog-slider").length) {
		const swiper = new Swiper(".tc-blog-slider" , {
			speed: 800,
			spaceBetween: 24,
			loop: true,
			navigation: {
				prevEl: ".tc-blog-prev",
				nextEl: ".tc-blog-next",
			},
			breakpoints: {
				0: {
					slidesPerView: 1,
				},
				576: {
					slidesPerView: 1,
				},
				768: {
					slidesPerView: 1,
				},
				992: {
					slidesPerView: 2,
				},
				1200: {
					slidesPerView: 3,
				},
				1400: {
					slidesPerView: 3,
				},
				1600: {
					slidesPerView: 3,
				},
				1800: {
					slidesPerView: 3,
				},
			},
		})
	}

	const TopView = document.querySelectorAll('.ser_item');
	TopView.forEach((box) => {
		ScrollTrigger.create({
			trigger: box,
			toggleActions: 'play reverse play reverse',
			onEnter: () => box.classList.add('in-view'),
			onLeaveBack: () => box.classList.remove('in-view'),
			markers: false,
		});
	});

	gsap.utils.toArray(".img-parallax").forEach(function(container) {
		let image = container.querySelector("img");

		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: container,
				scrub: true,
				pin: false,
			},
		}); 
		tl.from(image, {
			yPercent: -30,
			filter: "blur(10px)",
			ease: "none",
		}).to(image, {
			yPercent: 30,
			ease: "none",
		}); 
	});

	$('.counter').counterUp({
		delay: 20,
		time: 5000
	});


	gsap.utils.toArray(' .top_view_2').forEach((el, index) => { 
		let tlcta = gsap.timeline({
			scrollTrigger: {
				trigger: el,
				scrub: 4,
				start: "top 100%",
				end: "top 80%",
				toggleActions: "play none none reverse",
				markers: false
			}
		})

		tlcta
		.set(el, {transformOrigin: 'center center'})
		.from(el, {  scale: 1, y: "300"})
	});



	var EdProg = gsap.timeline({
		scrollTrigger: {
			trigger: ".tc-work-p-content",
			start: "top 70%",
			toggleActions: "play reverse play reverse",
			markers: false,
		},
	})
	EdProg
	.from(".tc-work-p-item", {
		yPercent: 100,
		opacity: 0,
		ease: "back.out(1.5)",
		duration: 1,
		stagger: -.2,
	})


})(jQuery);