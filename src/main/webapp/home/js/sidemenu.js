$(document).ready(function() {(
	function($, sr) {
		var debounce = function(func, threshold, execAsap) {
			var timeout;
			return function debounced() {
				var obj = this, args = arguments;
				function delayed() {
					if (!execAsap)
						func.apply(obj, args);
					timeout = null;
				}

				if (timeout)
					clearTimeout(timeout);
				else if (execAsap)
					func.apply(obj, args);
				
				timeout = setTimeout(delayed, threshold || 100);
			};
		};

		jQuery.fn[sr] = function(fn) {
			return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
		};
	})(jQuery, 'smartresize');

	var CURRENT_URL = window.location.href.split('#')[0].split('?')[0]
	var $BODY = $('body')
	var $MENU_TOGGLE = $('#menu_toggle')
	var $SIDEBAR_MENU = $('#sidebar-menu')
	var $SIDEBAR_FOOTER = $('.sidebar-footer')
	var $LEFT_COL = $('.left_col')
	var $RIGHT_COL = $('.right_col')
	var $NAV_MENU = $('.nav_menu')
	var $FOOTER = $('footer');

	var setContentHeight = function() {
		// reset height
		$RIGHT_COL.css('min-height', $(window).height());

		var bodyHeight = $BODY.outerHeight()
		var footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height()
		var leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height()
		var contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;

		// normalize content
		contentHeight -= $NAV_MENU.height() + footerHeight;

		$RIGHT_COL.css('min-height', contentHeight);
	};
	
	var upDown = true;
	$SIDEBAR_MENU.find('a').on('click', function(ev) {
		var $li = $(this).parent();

		var CurrentCheck = false;
		$(this).each(function() {
			$(this).parent().find('ul').children().find('a').each(function() {
				if (this.href == CURRENT_URL) {
					CurrentCheck = true;
				}
			});
		});
		
		if ($li.is('.active')) {
			if (!CurrentCheck) {
				$li.removeClass('active active-sm');
				$('ul:first', $li).slideUp(function() {
					setContentHeight();
					upDown = true;
					$li.find('span').removeClass('fa-chevron-up').addClass('fa-chevron-down');
				});
			} else {
				if (upDown) {
					$SIDEBAR_MENU.find('li').removeClass('active active-sm');
					$SIDEBAR_MENU.find('li ul').slideUp();
					$SIDEBAR_MENU.find('a').filter(function() {
						return this.href == CURRENT_URL;
					}).parent('li').addClass('current-page').parents('ul').parent().addClass('active');
					$('ul:first', $li).slideDown(function() {
						setContentHeight();
						upDown = false;
						$li.find('span').removeClass('fa-chevron-down').addClass('fa-chevron-up');
					});
				} else {
					$('ul:first', $li).slideUp(function() {
						setContentHeight();
						upDown = true;
						$li.find('span').removeClass('fa-chevron-up').addClass('fa-chevron-down')
					});
				}
			}
		} else {
			// prevent closing menu if we are on
			// child menu
			if (!$li.parent().is('.child_menu')) {
				$SIDEBAR_MENU.find('li').removeClass('active active-sm');
				$SIDEBAR_MENU.find('li ul').slideUp();
				$SIDEBAR_MENU.find('a').filter(function() {
					return this.href == CURRENT_URL;
				}).parent('li').addClass('current-page').parents('ul').parent().addClass('active');
			} else {
				if ($BODY.is(".nav-sm")) {
					$SIDEBAR_MENU.find("li").removeClass("active active-sm");
					$SIDEBAR_MENU.find("li ul").slideUp();
				}
			}
			$li.addClass('active');
			$('ul:first', $li).slideDown(function() {
				setContentHeight();
				upDown = true;
				$li.find('span').removeClass('fa-chevron-down').addClass('fa-chevron-up')
			});
		}
	});

	// toggle small or large menu
	$MENU_TOGGLE.on('click', function() {
		if ($BODY.hasClass('nav-md')) {
			$SIDEBAR_MENU.find('li.active ul').hide();
			$SIDEBAR_MENU.find('li.active').addClass('active-sm').removeClass('active');
		} else {
			$SIDEBAR_MENU.find('li.active-sm ul').show();
			$SIDEBAR_MENU.find('li.active-sm').addClass('active').removeClass('active-sm');
		}

		$BODY.toggleClass('nav-md nav-sm');

		setContentHeight();

		$('.dataTable').each(function() {
			$(this).dataTable().fnDraw();
		});
	});

	// check active menu
	$SIDEBAR_MENU.find('a[href="' + CURRENT_URL + '"]').parent('li').addClass('current-page');

	$SIDEBAR_MENU.find('a').filter(function() {
		return this.href == CURRENT_URL;
	}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
		setContentHeight();
	}).parent().addClass('active');

	// recompute content when resizing
	$(window).smartresize(function() {
		setContentHeight();
	});

	setContentHeight();

	// fixed sidebar
	if ($.fn.mCustomScrollbar) {
		$('.menu_fixed').mCustomScrollbar({
			autoHideScrollbar : true,
			theme : 'minimal',
			mouseWheel : {
				preventDefault : true
			}
		});
	}
	
	// Switchery
	if ($(".js-switch")[0]) {
		var elems = Array.prototype.slice.call(document.querySelectorAll('.js-switch'));
		elems.forEach(function(html) {
			var switchery = new Switchery(html, { color : '#26B99A' });
		});
	}

	$SIDEBAR_MENU.find('a').each(function() {
		if (this.href == CURRENT_URL){
			upDown = false;
			$(this).parent().parent().prev().find('span').removeClass('fa-chevron-down').addClass('fa-chevron-up')
		}
	})

	$(window).resize(function() {
		$SIDEBAR_MENU.find('a').filter(function() {
			return this.href == CURRENT_URL;
		}).parent('li').addClass('current-page').parents('ul').slideDown(function() {
			setContentHeight();
		}).parent().addClass('active');
	});
});