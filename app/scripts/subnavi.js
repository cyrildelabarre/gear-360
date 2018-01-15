
;(function($) {

$(function() {
	
	var
	hash = location.hash,
	subNavHashIndex = -1,
	$subNav = $('#subnav'),
	$subMenus = $subNav.find('ul li').each(function(i) {
		$(this).find('a')
		.on('keydown.subnavi', function(e) {
			if (e.keyCode==13) {
				$(this).data('keydown','Y');
			}
		})
		.on('click.subnavi', function(e) {
			if ($(this).attr('href').indexOf('#')===0) {
				$subNav.addClass('hold');
				var $section = $('.o.section').eq(i), tarTop = $section.offset().top;
				tarTop -= $subNav.height();
				var checkMinus = $('#wrap').hasClass('no-minus');
				if (GALAXY.sizeMode<=2 && !$subNav.hasClass('new_subnav') && !checkMinus) {
					tarTop -= 36;
				}
				if ($(this).data('keydown')!='Y') {
					e.preventDefault();
					GALAXY.setSmoothScrollTop(tarTop, 1500, function() {
						var selectedIndex = $subNav.removeClass('hold').find('ul li.on').index();
						var $btn = $subMenus.eq(subNavHashIndex).find('a');
						selectSubNavi(selectedIndex);
						if (subNavHashIndex>-1) {
							if (selectedIndex!=subNavHashIndex) {
								$btn.trigger('click.subnavi');
							}
							subNavHashIndex = -1;
						}
					});
				} else {
					selectSubNavi($subNav.removeClass('hold').find('ul li.on').index());
					$(this).data('keydown','N');
					$section.attr('tabindex','0').focus().one('blur', function() {
						$(this).removeAttr('tabindex');
					});
				}
			}
		});
		if (hash!='') {
			if ($(this).find('a').attr('href')==hash) {
				subNavHashIndex = i;
			}
		}
	});
	selectSubNavi = function(no) {
		var $selected = $subNav.find('ul li.on');
		if ($selected.get(0)||$selected.index()!=no) {
			$selected.removeClass('on');
			$subMenus.eq(no).addClass('on');
			if (!$subNav.hasClass('hold')) {
				GALAXY.header.resetSubNav();
			}
		}
	};
	var __count = -1;
	$('.section').each(function(i) {
		var $section = $(this);
		var count = $section.hasClass('o')&&!$section.hasClass('counted') ? ++__count : __count;
		$(this)
			.data('no',count)
			.on({
				visible: function() {
					selectSubNavi($(this).data('no'));
				}
			})
		;
		$section.addClass('counted');
	});
	
	GALAXY.load(function() {
		var $sections = $('.o.section'), selected = false;
		if (subNavHashIndex>-1) {
			setTimeout(function() {
				try {
					$subMenus.eq(subNavHashIndex).find('a').trigger('click.subnavi');
				} catch(e){}
			}, 50);
		} else {
			for (var i=0; i<$sections.length; i++) {
				if ($sections.eq(i).offset().top>GALAXY.getScrollTop()+document.documentElement.clientHeight/2) {
					selectSubNavi(Math.max(i-1, 0));
					selected = true;
					break;
				}
			}
			if (!selected) {
				selectSubNavi($sections.length-1);
			}
		}
	});
	
	if (!GALAXY.isGalaxy) {
		$('#subnav p.gnb').remove();
	}
});

})(window.jQuery);