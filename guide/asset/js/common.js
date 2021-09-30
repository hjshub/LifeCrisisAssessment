//common

'use strict';

var Gb = {};
Gb.popOpen = false;

$(function(){
	$funcCommon().load();
});

function $funcCommon(){
	var funcCommon_ = new Gb.funcCommon();

	return funcCommon_
}

(function($){
	Gb.funcCommon = function(){
		var showCalendar = function(){
			$('.calendar').find('.date').datepicker({
				//regional: "ko",
		  		showOn: "both",
		  		buttonImage: "../asset/img/icon/ico_calender.png",
		  		buttonImageOnly: false,
		  		buttonText: "Select Date",
		  		showWeek : false,
		  		dateFormat: "yy-mm-dd",
		  		showAnim: "slideDown",
      			maxDate : "+1y",
      			hideIfNoPrevNext : true,
		  		beforeShowDay: function(t){ 
		  			var e = t.getDay(),
						d = [e > 0 && 6 > e,""];

		  			return d
		  		}
		  		//gotoCurrent: true
			});
		},

		allCheck = function(){
			var allChk = $('input[type=checkbox][name^=allChk]'),
				disChk = $('input[type=checkbox][name^=disChk]');

			allChk.each(function(){
				var t = $(this),
					tName = t.attr('name').split('_'),
					list = $('input[type=checkbox][name^='+ tName[1] +']');

				t.on('change', function(){
					if(t.prop('checked') == false){
						list.prop('checked',false);
					}else {
						list.prop('checked',true);
					}
				});
			});

			disChk.each(function(){
				var t_ = $(this),
					tName_ = t_.attr('name').split('_'),
					list_ = $('input[type=checkbox][name^='+ tName_[1] +']');

				if(t_.prop('checked') == true){
					list_.prop('checked',false);
					list_.attr('disabled', true);
				}

				t_.on('change', function(){					
					if(t_.prop('checked') == true){
						list_.prop('checked',false);
						list_.attr('disabled', true);
						t_.closest('dd').find('input[type=text]').val('').attr('readonly', true);
					}else {
						list_.attr('disabled', false);
					}
				});
			});

			$('.etcText').each(function(){
				var etc = $(this),
					etcChk = etc.find('input[type=checkbox]'),
					etcTxt = etc.find('input[type=text]');

				if(etcChk.prop('checked') == false){
					etcTxt.attr('readonly', true);
				}

				etcChk.on('change', function(){
					if(etcChk.prop('checked') == true){
						etcTxt.removeAttr('readonly');
					}else {
						etcTxt.val('').attr('readonly', true);
					}
				});
			});
		},

		itemHover = function(){
			var hoverTrg = $('[class*=wrap--]').find('a'),
				_hoverTrg = hoverTrg.not($('.wrap--box02').find('a'));

			hoverTrg.on({
				'mouseenter focusin' : function(){
					$(this).closest('li').addClass('on');
					hoverTrg.not($(this)).closest('li').removeClass('on');
				},
				'mouseleave focusout' : function(){
					$(this).closest('li').removeClass('on');
				}
			});

			_hoverTrg.on({
				'click' : function(){
					$(this).closest('li').addClass('on');
					_hoverTrg.not($(this)).closest('li').removeClass('on');
				}
			});
		},

		itemCheck = function(){
			var checkTrg = $('.wrap--box02').find('a');

			checkTrg.on('click', function(evt){
				evt.preventDefault();
				evt.stopPropagation();

				var $Trg = $(this);

				$Trg.closest('li').addClass('active');
				$('.wrap--box02').find('a').not($Trg).closest('li').removeClass('active');
				$Trg.next('input[type=radio]').prop('checked',true);
			});
		},

		menuOn = function(){
			var btnQmenu = $('#header .topMenu .q--menu a'),
				quickMenu = $('#header .quickMenu');

			btnQmenu.on('click', function(event){
				event.preventDefault();
				event.stopPropagation();

				if($('#header').hasClass('open')){
					menuOff();
				}else {
					$('#header').addClass('open');
					quickMenu.stop().slideDown(300);
					$('body').append('<div class="dimmed_wh"><em class="hiddenTxt">백그라운드 영역</em></div>');
				}
			});

			$(document).on('click', '.dimmed_wh', function(){
				menuOff();
			});

			function menuOff(){
				$('#header').removeClass('open');
				quickMenu.stop().slideUp(300);
				$('.dimmed_wh').remove();
			}

		},

		// 2021.06.24_상담센터 검색 팝업 수정 (mobile)
		openSearchMap = function(){
			var searchMap = $('.search-map').find('div').first(),
				btnSearchMap = $('#btn-searchMap');

			btnSearchMap.on('click', function(){
				searchMap.toggleClass('open');
			});
				
		},

		openPop = function(){
			function openPop(name){
				if(!Gb.popOpen){
					$('.lpop').filter('#'+name).fadeIn(300);
					$('body').append('<div class="dimmed"><em class="hiddenTxt">백그라운드 영역</em></div>');
					$('body').css({
						'overflow':'hidden',
						'height':$('.dimmed').height() + 'px'
					});

					if(name == "searchAgency"){
						$('#searchAgency select').focus();
					}

					Gb.popOpen = true;
				}
			}

			return openPop;
		}(),

		closePop = function(){
			$('.lpop').fadeOut(300);
			$('.dimmed').remove();
			$('body').css({
				'overflow':'visible',
				'height':'auto'
			});
			$('.lpop').find('input').val('');
			$('.lpop').find('textarea').val('');

			Gb.popOpen = false;
		},

		$closePop = function(){
			$(document).on('click', '.dimmed, .lpop-close', function(){
				closePop();
			});
		},

		printCts = function(){
			var currentBrowser = window.navigator.userAgent;

	        if (currentBrowser.indexOf('trident') !== -1 || currentBrowser.indexOf('msie') !== -1) { // ie 
	            document.execCommand('print', false, null);
	        } else { // ie 외 브라우저
	            window.print();
	        }
		},

		printPreview = function(){
			window.open('../print/preview.html', 'preview', 'width=1000, height=1024, top=100, left=100, resizable=yes, menubar=no, location=no, scrollbars=yes, toolbar=no');
		},

		load = function(){
			showCalendar();
			allCheck();
			menuOn();
			$closePop();
			itemHover();
			itemCheck();
			openSearchMap();
		}

		return {
			load : load,
			openPop : openPop,
			closePop : closePop,
			printPreview : printPreview,
			printCts : printCts
		}
	}
})(jQuery);
