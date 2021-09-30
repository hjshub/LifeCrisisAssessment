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
		  		showOn: "button",
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
			var allChk = $('input[type=checkbox][name^=allChk]');

			allChk.each(function(){

				$(this).on('change', function(){
					var t = $(this),
						tName = t.attr('name').split('_'),
						list = $('input[type=checkbox][name^='+ tName[1] +']');

					if(t.prop('checked') == false){
						list.prop('checked',false);
					}else {
						list.prop('checked',true);
					}
				});
			});
		},

		menuOn = function(){
			var link = $('.gnb ul li a'),
				Loc = document.location.href.split('/'),
				last = $(Loc).length - 2;

			link.each(function(){
				var Arr = $(this).attr('href').split('/'),
					$last = $(Arr).length - 2;

				if(Loc[last] == Arr[$last])
					$(this).closest('li').addClass('active');
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

		submit = function(){
			$('.btn-regist').on('click', function(){ // 기관등록
				if(confirm('기관 등록하시겠습니까?')){
					alert('기관 등록이 완료 되었습니다.');
					closePop();

					return
				}
			});

			$('.btn-modify').on('click', function(e){ // 기관정보 수정
				e.preventDefault();
				e.stopPropagation();

				if(confirm('기관 정보를 수정 하시겠습니까?')){
					alert('기관 내용이 수정 되었습니다.');
					closePop();

					return
				}
			});

			$('.btn-pw-modify').on('click', function(e){ // 비밀번호 수정
				e.preventDefault();
				e.stopPropagation();

				if(confirm('비밀번호를 수정하시겠습니까?')){
					alert('비밀번호 수정이 완료되었습니다.');
					closePop();

					return
				}
			});

			$('.btn-id-delete').on('click', function(e){ // 계정 삭제
				e.preventDefault();
				e.stopPropagation();

				if(confirm('계정을 삭제 하시겠습니까?')){
					alert('계정 삭제가 완료되었습니다!');
					closePop();

					return
				}
			});

			$(document).on('click', '.dimmed, .lpop-close, .btn-cancel', function(){ // 취소
				closePop();
			});
		},

		load = function(){
			showCalendar();
			allCheck();
			menuOn();
			submit();
		}

		return {
			load : load,
			openPop : openPop
		}
	}
})(jQuery);
