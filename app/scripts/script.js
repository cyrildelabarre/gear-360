
$(function(){  

		var $galaxyColorContrast = $('.galaxy-color-contrast');
		if ($galaxyColorContrast.get(0)) {
			//var cookieHighContrastMode = $._cookie.get('highContrastMode');
			var skipMessage = $galaxyColorContrast.data('skipMessage');
			$('#header .skip-content').append('<p><a href="#skipToHighContrast">'+skipMessage+'</a></p>');
			$galaxyColorContrast.find('a.color-type1').on('click', function(e) {
				e.preventDefault();
				//$._cookie.set('highContrastMode', 1, 1, '/');
				$('html').addClass('color_yb');
			});
			$galaxyColorContrast.find('a.color-type2').on('click', function(e) {
				e.preventDefault();
				//$._cookie.set('highContrastMode', 0, 1, '/');
				$('html').removeClass('color_yb');
			});
		}
    

	$(window).scroll(function(){

	});
	
	NFJQ(window).resize(function(){

	});
});
;(function($) {
$(function() {
	
	var setHeart, 
		sclast,
		setMove,
		setTimeIn,
		moveCheck = true,
		sccheck = true,
		animateIn = true,
		changeH = true,
		oneTab = true,
		changeResize,
		safari,
		resizeIn,
		checkAni01,
		checkAni02,
		checkAni03,
		setTaking,
		sc2 = 0,
		sc3 = 0,
		sc4 = 0,
		scroll = '';
	var __startMov = false;
	var __contx;
	var __mousex;
	var __mousey;
	var __smooth = false;
	var __dragLeft = 0;
	var __dragRight = 0;
	var __movePoint;
	var __movePointy;
	var __timer;
	var __movedirection = '';
	var __animateCurr;
	var __anipoint;
	
	var center01 = $('.m_content-stats .normal .f_header-type1').offset().top - 150;
	var center02 = $('.m_content-widge .normal .tit').offset().top - 150;
	var center03 = $('.m_content-style .style01').offset().top + $('.m_content-style .style01').height() / 2 - $(window).height() / 2;
	var center04 = $('.m_content-band').offset().top;
	if ($('html').hasClass('mobile')) {
		center03 = $('.m_content-style .f_header-type1').offset().top - 100;
	}
	startbeat();
	function startbeat() {
		setHeart = setInterval( function () {
			var imgWi = -1 * Math.ceil($('.heartbeat_green > img').width());
			$('.heartbeat_green').animate({left:'100%', 'margin-left':'0'}, 3000, 'easeOutQuint', function () {
				$('.heartbeat_green').css('left', '0');
				$('.heartbeat_green').css('margin-left', imgWi);
			});
			setTimeout(function () {
				$('.heartbeat_light').fadeIn(200);
				$('.heartbeat_light').fadeOut(200);
			}, 300);
			
		}, 3000);
	}	


	$('.m_content-stats > .common_btn a').on('click', function () {
		var thisNum = $(this).parent().index();
		var currNum = $('.m_content-stats > .common_btn .curr').parent().index();
		if (thisNum != currNum) {
			$('.m_content-stats > .common_btn .curr').removeClass('curr');
			$(this).addClass('curr');
			var band01;
			if ($('html').hasClass('s4')) {
				band01 = 1280;
			} else if ($('html').hasClass('s3')) {
				band01 = 1080;
			} else if ($('html').hasClass('s2')) {
				band01 = 945;
			} else if ($('html').hasClass('s1')) {
				band01 = 855;
			}
			if (thisNum == '0') {
				$('.m_content-stats .control').stop().animate({'height':'0px'}, 700);
			} else {
				$('.m_content-stats .control').stop().animate({'height':band01}, 700);
			}
		}
		return false;
	});
	$('.m_content-widge > .common_btn a').on('click', function () {
		var thisNum = $(this).parent().index();
		var currNum = $('.m_content-widge > .common_btn .curr').parent().index();
		if (thisNum != currNum) {
			$('.m_content-widge > .common_btn .curr').removeClass('curr');
			$(this).addClass('curr');
			if (thisNum == '0') {
				$('.m_content-widge .control').stop().animate({'height':'0px'}, 700);
			} else {
				$('.m_content-widge .control').stop().animate({'height':$('.m_content-widge').height()}, 700);
			}
		}
		return false;
	});
	$('.m_content-style > .c_paging-type2 a').on('click', function () {
		var thisNum = $(this).index();
		var currNum = $('.m_content-style > .c_paging-type2 .on').index();
		if (thisNum != currNum) {
			$('.m_content-style > .c_paging-type2 .on').removeClass('on');
			$(this).addClass('on');
			if (thisNum == '0') {
				$('.m_content-style .style02').stop().animate({'opacity':'0'}, 700);
			} else {
				$('.m_content-style .style02').stop().animate({'opacity':'1'}, 700);
			}
		}
		return false;
	});
	
	$(window).on('scroll load', function (e) {
		var clock = $('.m_content-tracking .gear_fit_slide').offset().top - ($(window).height() / 2);
		var sc = $(window).scrollTop() || $('html, body').scrollTop();
		if (e.type == 'load') {
			if (oneTab) {
				setTaking = setTimeout(function () {
					if (!$('html').hasClass('mobile')) {
						$('.gear_fit_slide > li').eq(2).find('> a').click();
					}
				}, 500);
			}
		}

		if (oneTab) {
			if (($('.m_content-tracking > .m_feature-mf1').hasClass('visible'))) {
				oneTab = false;
				moveclock();
				clearTimeout(setTaking);
				if (!$('html').hasClass('mobile')){
					$('.gear_fit_slide > li').eq(0).find('> a').click();
				}
			}
		}
	});

	$(window).on('resize', function (e) {
		if (!$('html').hasClass('mobile')) {
			resettracking();
			if (!oneTab) {
				$('.gear_fit_slide').attr('style', '');
			} else {
				$('.gear_fit_slide li:eq(2) a').click();
			}
			if (!$('.gear_fit_slide > li').eq(0).hasClass('center')) {
				$('.gear_fit_slide > li.center').removeClass('center');
				$('.gear_fit_slide > li').eq(0).addClass('center');
				$('.m_content-tracking .f_header-type1 li.curr').removeClass('curr');
				$('.m_content-tracking .f_header-type1 li').eq(0).addClass('curr');
			}
		}
	});

	function resettracking() {
		$('.gear_fit_slide > li').each( function () {
			$('.m_content-tracking .gear_fit_slide > .center div ul').stop();
			$(this).find('div > ul').attr('style', '');
			$(this).find('div > ul').find('.long img').attr('style', '');
		});
	}

	function moveclock() {
		$('.m_content-tracking .gear_fit_slide > .center').addClass('play');
		resettracking();
		clearTimeout(setMove);
		setMove = setTimeout(function () {
			var imgwidth = $('.m_content-tracking .gear_fit_slide > .center div ul > li').width();
			if (!$('.m_content-tracking .gear_fit_slide > .center div ul').hasClass('case01')) {
				$('.m_content-tracking .gear_fit_slide > .center div ul').animate({'left':-imgwidth}, 300);
				$('.m_content-tracking .gear_fit_slide > .center div ul').delay(1000).animate({'left':-(2 * imgwidth)}, 300, function () {
					setTimeout(function () {
						$('.m_content-tracking .gear_fit_slide > .play').removeClass('play');
					}, 500);
				});
			} else {
				$('.m_content-tracking .gear_fit_slide > .center div ul').animate({'left':-imgwidth}, 300, function () {
				});
				$('.m_content-tracking .gear_fit_slide > .center div ul').delay(1000).animate({'left':-(2 * imgwidth)}, 300, function () {
					var imgHeight = $('.m_content-tracking .gear_fit_slide > .center div ul li:eq(2) img').height();
					var imgHeight01 = $('.m_content-tracking .gear_fit_slide > .center div ul li:eq(0) img').height();
					$('.m_content-tracking .gear_fit_slide > .center div ul li:eq(2) img').stop().delay(800).animate({'margin-top':-(imgHeight-imgHeight01)}, 1200);
					setTimeout(function () {
						$('.m_content-tracking .gear_fit_slide > .play').removeClass('play');
					}, 2500);
				});
			}
		}, 800);
	}

	$('.m_content-tracking .f_header-type1 ul li a').on('click', function () {
		if (!$(this).parent().hasClass('curr')) {
			__startMov = false;
			resettracking();
			clearTimeout(setMove);
			var curr = $(this).parent().index();
			var thispoint = Math.ceil($('.m_content-tracking .gear_fit_slide').css('left').replace('px', ''));
			var winSize = $(window).width();
			$('.m_content-tracking .gear_fit_slide > li.center').removeClass('center');
			var $endCurrent = $('.m_content-tracking .gear_fit_slide > li').eq(curr).addClass('center');
			$('.m_content-tracking .f_header-type1 li.curr').removeClass('curr');
			$('.m_content-tracking .f_header-type1 li').eq(curr).addClass('curr');
			$('.m_content-tracking .gear_fit_slide').stop().animate({
				'left': thispoint + Math.ceil(winSize/2 - ($endCurrent.offset().left +  $endCurrent.innerWidth()/2)
			)}, 500, function () {
				if (!oneTab) {
					moveclock();
				}
			});
		}
		
		return false;
	});
	$('.m_content-tracking .gear_fit_slide > li a').on('click', function () {
		if (!$(this).parent().hasClass('curr')) {
			__startMov = false;
			resettracking();
			clearTimeout(setMove);
			var curr = $(this).parent().index();
			var thispoint = Math.ceil($('.m_content-tracking .gear_fit_slide').css('left').replace('px', ''));
			var winSize = $(window).width();
			$('.m_content-tracking .gear_fit_slide > li.center').removeClass('center');
			var $endCurrent = $('.m_content-tracking .gear_fit_slide > li').eq(curr).addClass('center');
			$('.m_content-tracking .f_header-type1 li.curr').removeClass('curr');
			$('.m_content-tracking .f_header-type1 li').eq(curr).addClass('curr');
			$('.m_content-tracking .gear_fit_slide').stop().animate({
				'left': thispoint + Math.ceil(winSize/2 - ($endCurrent.offset().left +  $endCurrent.innerWidth()/2)
			)}, 500, function () {
				if (!oneTab) {
					moveclock();
				}
			});
		}
		return false;
	});

	$('.m_content-tracking .gear_fit_slide').bind('mousedown touchstart', function (e) {
		if (!$.browser.mobile) {
			e.preventDefault();
		}
		__contx = $(this).position().left;
		__mousex = e.pageX;
		__mousey = e.pageY;
		if (e.type == 'touchstart') {
			__mousex = e.originalEvent.touches[0].pageX;
			__mousey = e.originalEvent.touches[0].pageY;
		}
		$('.m_content-personalize-band .band-list').stop();
		__movedirection = '';
		__startMov = true;
	});

	$('.m_content-tracking .gear_fit_slide').bind('mousemove touchmove', function (e) {
		if ((__movedirection == 'x') && ($.browser.mobile)) {
			e.preventDefault();
		}
		var evType = e.pageX;
		var evTypey = e.pageY;
		if (__startMov) {
			if (e.type == 'touchmove') {
				evType = e.originalEvent.touches[0].pageX;
				evTypey = e.originalEvent.touches[0].pageY;
			}
			__movePoint = evType - __mousex;
			__movePointy = evTypey - __mousey;
			resettracking();
			clearTimeout(setMove);
			bandDrag();
		}
	});
	function bandDrag() {
		var poinleft = __contx + __movePoint;
		var moveIng = function () {
				$('.m_content-tracking .gear_fit_slide').css({'left' : poinleft});
				__smooth = true;
		}
		if ($.browser.mobile) {
			if (__movedirection == '') {
				if (Math.abs(__movePointy) < Math.abs(__movePoint)) {
					__movedirection = 'x';
				} else {
					__movedirection = 'y';
				}
			} else if (__movedirection == 'x') {
				moveIng();
			}
		} else{
			moveIng();
		}
	}
	$(document).bind('mouseup touchend', function (e) {
		var winSize = $(window).width();
		var thispoint = Math.ceil($('.m_content-tracking .gear_fit_slide').css('left').replace('px', ''));
		var anipoint = Math.abs(thispoint);
		var poinleft = anipoint - __anipoint;
		var limitCenter;
		var idx;
		var arrA = [];
		var countA = [];
		var currin;
		var curr;
		$('.m_content-tracking .gear_fit_slide > li').each(function(){
			var All = $('.m_content-tracking .gear_fit_slide > li').length - 1;
			var center =  Math.floor(winSize/2);
        	arrA[$(this).index()] = Math.ceil(Math.abs(($(this).offset().left)+($(this).innerWidth()/2) - center));
        	if (All == $(this).index()) {
        		currin = Math.min.apply(null, arrA);
        		if(!Array.indexOf){
			        for(var i=0; i<arrA.length; i++){
			            if(arrA[i]==currin){
							curr = i;
			            }
			        }
				} else {
					curr = arrA.indexOf(currin);
				}
        	}
        });
        $('.m_content-tracking .gear_fit_slide > li.center').removeClass('center');
		var $endCurrent = $('.m_content-tracking .gear_fit_slide > li').eq(curr).addClass('center');
		$('.m_content-tracking .f_header-type1 li.curr').removeClass('curr');
		$('.m_content-tracking .f_header-type1 li').eq(curr).addClass('curr');
		if (__smooth) {
			$('.m_content-tracking .gear_fit_slide').stop().animate({
				'left': thispoint + Math.ceil(winSize/2 - ($endCurrent.offset().left +  $endCurrent.innerWidth()/2)
			)}, 500, 'easeOutQuint', function (){
				moveclock();
			});
			__smooth = false;
		}
		__movedirection = '';
		__startMov = false;
	});
});
})(window.NFJQ);