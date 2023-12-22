/* ===============================================================
 //공통
================================================================*/
//익스8 console 크로스 브라우징
if (typeof console == "undefined") {
	this.console = { log: function () { }, info: function () { } };
}

//selectbox 활성/비활성 및 ie8 크로스 브라우징
$.fn.extend({
	selectDisabled: function (e) {
		var disabled = false;
		$(this).prop('disabled', function () {
			disabled = !$(this).prop('disabled');
			return !$(this).prop('disabled');
		});
		var browser = UI.getBrowser();
		if ((browser.ie8 || browser.ie9 || browser.ie10 || browser.safari)) {
			$(this).select2();
		}
	},
	maxLength: function (maxlength) {
		/*if(maxlength!=undefined){
			$(this).attr("maxlength",maxlength);
		}
		$(this).attr('oninput', "javascript: if ( this.maxLength > -1 &&this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);");*/
		$(this).keydown(function (event) {
			var maxlength = $(this).attr("maxlength");
			var vallength = $(this).val().length;
			var val = $(this).val();
			//console.log(vallength + '|' + maxlength);
			if (maxlength > -1 && vallength >= maxlength && !UI.isWhiteKeyCode(event)) {
				UI.preventDefault(event);
			}
		}).blur(function () {
			var val = $(this).val();
			var maxlength = $(this).attr("maxlength");
			$(this).val(val.slice(0, maxlength));
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				var val = $(_this).val();
				var maxlength = $(_this).attr("maxlength");
				$(_this).val(val.slice(0, maxlength));
			}, 100);
		});
	},
	textCount: function (text) {
		var $text = text == undefined ? $(this).parent().find('.count-words em') : $(text);
		$(this).on('keyup input paste', function (event) {
			var _this = this;
			setTimeout(function () {
				var textLength = $(_this).val().length;
				//console.log(textLength);
				$text.text(textLength);
			}, 100);
		}).blur(function () {
			var length = $(this).val().length;
			if (length != 0) {
				$(this).addClass('on');
			} else {
				$(this).removeClass('on');
			}
		});
	},
	modal: function (param) {
		param = param ? param : {};
		$(this).off('click');
		$(this).click(function () {
			param.modal = $(this).data('modal');
			$.extend(param, $(this).data('modal-param'));
			if ($(this).data('modal-callback')) {
				param.callBack = eval($(this).data('modal-callback'));
			}
			UI.modal(param);
		});
	},
	tooltip: function (param) {
		param = param ? param : {};
		var $tooltipWrap = $(this).closest('.ico-tooltip-wrap');
		$(this).off('click');
		$(this).click(function () {
			if (!$(this).data('init')) { $(this).trigger('init'); }
			param.tooltip = $(this).data('tooltip');
			param.excute = this;
			UI.tooltip(param);
		}).on('init', function () {
			$(this).data('init', true);
			var btn = this;
			var $tooltip = $(btn).parent('.ico-tooltip-wrap').find($(this).data('tooltip'));

			$tooltip.find('.tooltip-close').click(function () {
				$(this).parents('.tooltip-ly').hide();
				$tooltipWrap.hasClass('except') && $(btn).toggleClass('default');
			});
			$('*').on('click', function (e) {
				//console.log('x');
				//var $tooltip = $(btn).parent('.ico-tooltip-wrap').find($(this).data('tooltip'));
				if ($tooltip.css("display") == "block" && e.target != btn) {
					if (!$tooltip.has(e.target).length) {
						$tooltip.hide();
						$tooltipWrap.hasClass('except') && $(btn).toggleClass('default');
					}
				}
			});
		});
	},
	fireFoxKeyUp: function () {
		var interval;
		var val;
		if (UI.getBrowser().firefox) {
			$(this).focus(function () {
				var $this = $(this);
				interval = setInterval(function () {
					var regKorean = /[가-힣ㄱ-ㅎㅏ-ㅣ]/
					//console.log('fireFoxKeyUp:' + regKorean.test($this.val()));
					//console.log('fireFoxKeyUp:' + $this.data('val') + '|' + $this.val());
					if (val != $this.val() && regKorean.test($this.val())) {
						//console.log('fireFoxKeyUp 한글');
						//트리거
						$this.trigger('keyup');
						val = $this.val();
						//$this.data('val',$this.val()); 
					}
				}, 100);
			}).blur(function () {
				clearInterval(interval);
			});

		}
	},
	copyToClipboard: function (url) {
		$(this).click(function () {
			UI.copyToClipboard(url);
		});
	}
});

var numId = 1;
//UI 공통 스크립트
var UI = {
	init: function () {
		this.selectBoxInit();
		this.tab();
		this.numberFormAll();
		this.telFormAll();
		this.telWifiFormAll();
		this.cardFormAll();
		this.corpFormAll();
		this.compFormAll();
		this.foreignerFormAll();
		this.residentFormAll();
		this.accountFormAll();
		this.noKoreanFormAll();
		this.minusFormAll();
		this.plusFormAll();
		this.modalAll();
		this.tooltipAll();
		//$('input[type=text][maxlength],input[type=password][maxlength],textarea[maxlength]').maxLength();
		$('textarea[maxlength]').maxLength();
		$('textarea[maxlength]').textCount();
		$('input, textarea').placeholder({ customClass: 'my-placeholder' });
		$('input').fireFoxKeyUp();
		$('.url-copy button').click(function () { UI.copyToClipboard($(this).parents('.url-copy').find('input').val()); });
		this.sticky();
		this.global();
		this.fileFormAll();
		this.gnb.init();
		this.focusScroll();
		this.goldNumberIntro.init();
	},
	fileFormAll: function () {
		//파일첨부
		$('input[type=file]').on('change', function () {
			$(this).parent('.form-group').find('input[type=text]').val($(this).val().replace('C:\\fakepath\\', ''));
		});
	},
	getBrowser: function () {
		var agent = navigator.userAgent.toLowerCase();
		//console.log(agent);
		Browser = {
			ie: /*@cc_on true || @*/ false,
			ie6: agent.indexOf('msie 6') != -1,
			ie7: agent.indexOf('msie 7') != -1,
			ie8: agent.indexOf('msie 8') != -1,
			ie9: agent.indexOf('msie 9') != -1,
			ie10: agent.indexOf('msie 10') != -1,
			ie11: agent.indexOf('rv:11.0') != -1,
			opera: !!window.opera,
			safari: agent.indexOf('safari') != -1,
			safari3: agent.indexOf('applewebkit/5') != -1,
			mac: agent.indexOf('mac') != -1,
			chrome: agent.indexOf('chrome') != -1,
			firefox: agent.indexOf('firefox') != -1,
			name: 'unkown'
		}

		if (Browser.chrome) {
			//console.log("It is chrome browser");
			Browser.name = 'chrome';
		} else if (Browser.ie6) {
			//console.log("It is ie6 browser");
			Browser.name = 'ie6';
		} else if (Browser.ie7) {
			//console.log("It is ie7 browser");
			Browser.name = 'ie7';
		} else if (Browser.ie8) {
			//console.log("It is ie8 browser");
			Browser.name = 'ie8';
		} else if (Browser.ie9) {
			//console.log("It is ie9 browser");
			Browser.name = 'ie9';
		} else if (Browser.ie10) {
			//console.log("It is ie10 browser");
			Browser.name = 'ie10';
		} else if (Browser.ie11) {
			//console.log("It is ie11 browser");
			Browser.name = 'ie11';
		} else if (Browser.opera) {
			//console.log("It is opera browser");
			Browser.name = 'opera';
		} else if (Browser.safari) {
			//console.log("It is safari browser");
			Browser.name = 'safari';
		} else if (Browser.safari3) {
			//console.log("It is safari3 browser");
			Browser.name = 'safari3';
		} else if (Browser.mac) {
			//console.log("It is mac browser");
			Browser.name = 'mac';
		} else if (Browser.firefox) {
			//console.log("It is firefox browser");
			Browser.name = 'firefox';
		} else {
			//console.log("It is maybe ie");
			Browser.name = 'ie';
			Browser.ie = true;
		}
		//console.log(Browser);
		return Browser;
	},
	tab: function () {
		var tabGroup = [];
		$('[data-tab]').each(function (key, value) {
			if ($.inArray($(this).data('tab'), tabGroup) == -1) {
				tabGroup.push($(this).data('tab'));
			}
		});

		$.each(tabGroup, function (key, value) {
			var $tab = $('[data-tab=' + value + ']');
			var $content = $('[data-tab-content=' + value + ']');
			var onIndex = $tab.index($tab.filter('.on'));
			$content.hide();
			$content.eq(onIndex).show();
			$tab.click(function () {
				var index = $(this).index();
				$tab.removeClass('on');
				$tab.eq(index).addClass('on');
				$content.hide();
				$content.eq(index).show();

				var txt = $(this).find("a").text();
				var $tgArea = $(this).parents('.tab-sub-wrap').find('.g-invisible');
				$tgArea.text(txt);
			});
		});
		this.tabBookMark();
	},
	tabBookMark: function () {
		var hash = location.hash;
		var tabGroup = [];
		$('[data-tab]').each(function (key, value) {
			if ($.inArray($(this).data('tab'), tabGroup) == -1) {
				tabGroup.push($(this).data('tab'));
			}
		});

		$.each(tabGroup, function (key, value) {
			var $tab = $('[data-tab=' + value + ']');
			var $content = $('[data-tab-content=' + value + ']');
			var onIndex = $tab.index($tab.filter('.on'));
			var contentIndex = $content.index($content.find(hash).parents('[data-tab-content=' + value + ']'));
			var index = contentIndex > -1 ? contentIndex : onIndex;
			$tab.eq(index).trigger('click');
		});
	},
	popup: function (url, param, name) {
		//기본 md
		param = $.extend({}, param);
		var defaultOptions = {
			width: '700',
			height: '600',
			scrollbars: 'yes',
			resizable: 'no',
			toolbar: 'no'
		}
		//var tmp = param == undefined ? defaultOptions : param;
		var mode = param.mode;
		delete param.mode;
		if (mode == 'sm') {
			defaultOptions.width = 480;
			defaultOptions.height = 436;
		}
		var tmp = $.extend({}, defaultOptions, param);
		var options = '';
		var i = 0;
		$.each(tmp, function (key, value) {
			comma = i > 0 ? ',' : '';
			//console.log(key);
			//console.log(value);
			options += comma + key + '=' + value
			i++;
		});
		if (name == '_blank') { options = ''; }
		return window.open(url, name, options);
	},
	selectBoxInit: function () {
		//기본 검색기능 제외
		$.fn.select2.defaults.set("minimumResultsForSearch", "Infinity");

		//data-placeholder 빈옵션 추가 및 selected 적용
		$('.c-select-outline select[data-placeholder], .c-select select[data-placeholder]').each(function () {
			var selected = false;
			$(this).find('option').each(function () {
				if ($(this).attr('selected') == "selected") {
					//console.log($(this).val());
					selected = true;
				}
			});
			if (selected) {
				$(this).val($(this).find('option:selected').val());
			} else {
				$(this).val('');
			}
		});

		//select2 실행
		//$('.c-select-outline select, .c-select select').select2();
		$('.c-select-outline select, .c-select select').each(function () {
			var option = {};
			//data-select-class 적용
			if ($(this).data('select-class') == 'sm') {
				option.containerCssClass = 'c-select-outline-sm';
				option.dropdownCssClass = 'c-select-outline-sm-dr';
			} else if ($(this).data('select-class') == 'lg') {
				option.containerCssClass = 'c-select-outline-lg';
				option.dropdownCssClass = 'c-select-outline-lg-dr';
			}
			$(this).select2(option);
		});
		$('.c-select-outline select[data-select-link], .c-select select[data-select-link]').each(function () {
			$(this).on('change', function () {
				//console.log($(this).find(':selected').val());
				var url = $(this).find(':selected').val();
				UI.popup(url, '', $(this).data('select-link'));
			})
		});
	},
	preventDefault: function (e) {
		if (e.preventDefault) {
			return e.preventDefault();
		} else {
			return e.returnValue = false;
		}
	},
	isWhiteKeyCode: function (event, mode) {
		var keyCode = [];
		var str = '';
		//일단고정값으로
		mode = mode == undefined ? 'include' : mode;
		if (mode == 'include') {
			keyCode = [
				37, 39 //방향키 좌우
				, 8 //백스페이스
				, 9 //TAB
				, 46 //DEL
				, 35 //홈
				, 36 //엔드
				, 13 //엔터
				, 116 //F5
				, 123 //F12
				, 16 //쉬프트
			];
		}

		$.each(keyCode, function (key, value) {
			//console.log(value);
			str += key > 0 ? ' || ' : '';
			str += 'event.keyCode == ' + value;
		});
		if (eval(str)) {
			return true;
		} else {
			return false;
		}
		//return (event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode== 46 || event.keyCode == 35 || event.keyCode == 36 || event.keyCode == 13);
	},
	_whiteCombinationKey: { ok: false },
	isWhiteCombinationKeyDown: function (event) {
		//ctrl(17)
		if (event.keyCode == 17) {
			this._whiteCombinationKey.ctrl = true;
		}
		//shift(16)
		if (event.keyCode == 16) {
			this._whiteCombinationKey.shift = true;
		}

		//ctrl(17)-v(86), a(65), c(67), x(88)
		if (this._whiteCombinationKey.ctrl && (event.keyCode == 86 || event.keyCode == 65 || event.keyCode == 67 || event.keyCode == 88)) {
			this._whiteCombinationKey.ok = true;
		}

		//shift(16)-tab(9)
		if (this._whiteCombinationKey.shift && (event.keyCode == 9)) {
			this._whiteCombinationKey.ok = true;
		}
		return this._whiteCombinationKey.ok;
	},
	setWhiteCombinationKeyUp: function (event) {
		//ctrl(17)
		if (event.keyCode == 17) {
			this._whiteCombinationKey.ctrl = false;
		}
		//shift(16)
		if (event.keyCode == 16) {
			this._whiteCombinationKey.shift = false;
		}
		this._whiteCombinationKey.ok = false;
	},
	setNumberOnlyKeyDown: function (event) {
		if ((!(event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) && !(event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
			&& !UI.isWhiteKeyCode(event) && !UI.isWhiteCombinationKeyDown(event)) {
			//ie8 버전등에서 event.preventDefault 지원 안됨.
			return UI.preventDefault(event);
		}
	},
	setNumberOnlyKeyUp: function (event, _this) {
		UI.setWhiteCombinationKeyUp(event);
		//허용키시 포커스 유지
		if (!UI.isWhiteKeyCode(event)) {
			if ($(_this).val() != $(_this).val().replace(/[^0-9]/g, "")) {
				$(_this).val($(_this).val().replace(/[^0-9]/g, ""));
			}
		}
	},
	setNumberOnlyPaste: function (_this) {
		setTimeout(function () {
			if ($(_this).val() != $(_this).val().replace(/[^0-9]/g, "")) {
				$(_this).val($(_this).val().replace(/[^0-9]/g, ""));
			}
		}, 100);
	},
	numberFormAll: function () {
		$('input[type=text][data-mode=number], input[type=password][data-mode=number]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
		}).keyup(function (event) {
			UI.setNumberOnlyKeyUp(event, this);
		}).blur(function () {
			$(this).val($(this).val().replace(/[^0-9]/g, ""));
		}).on('paste', function () {
			UI.setNumberOnlyPaste(this);
		});
	},
	telFormAll: function () {
		$('input[type=text][data-mode=tel]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
		}).keyup(function (event) {
			UI.setNumberOnlyKeyUp(event, this);
			var endIdx = UI.getCursorPosition($(this)[0]);
			if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
				$(this)[0].selectionEnd = endIdx;
			}
			//전화번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
			$(this).val($(this).val().replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, "$1-$2-$3"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				var endIdx = UI.getCursorPosition($(_this)[0]);

				//var val = $(_this).val();
				$(_this).val($(_this).val().replace(/[^0-9]/g, ""));

				if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
					$(_this)[0].selectionEnd = endIdx;
				}
			}, 100);
		});
	},
	telWifiFormAll: function () {
		$('input[type=text][data-mode=wifi]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
		}).keyup(function (event) {
			UI.setNumberOnlyKeyUp(event, this);
			var endIdx = UI.getCursorPosition($(this)[0]);
			if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
				$(this)[0].selectionEnd = endIdx;
			}
			//전화번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]+)([0-9]{4})/, "$1-$2"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/[^0-9]/g, ''));
			}
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				var endIdx = UI.getCursorPosition($(_this)[0]);

				//var val = $(_this).val();
				$(_this).val($(_this).val().replace(/[^0-9]/g, ""));

				if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
					$(_this)[0].selectionEnd = endIdx;
				}
			}, 100);
		});
	},
	// 카드번호
	cardFormAll: function () {
		$('input[data-mode=card]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
			selection = UI.getCursorPositions($(this)[0]);
		}).keyup(function (event) {
			var endIdx = UI.getCursorPosition($(this)[0]);
			UI.setWhiteCombinationKeyUp(event);
			if (!UI.isWhiteKeyCode(event)) {
				var val = $(this).val();
				$(this).val(val.replace(/[^*0-9]/g, ""));
			}

			if (((event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) || (event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
				|| event.keyCode == 46 || event.keyCode == 8) { //del,backspace
				var val = $(this).val();
				var dataVal = $(this).data('val') ? $(this).data('val') : '';
				var mergeVal = '';
				var newVal;
				if (val.length > dataVal.length) {//입력
					newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
					mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(startIdx);
				} else if (val.length < dataVal.length) {//삭제
					if (startIdx == endIdx) {//del
						if (selection.start != selection.end) {
							newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						} else {
							mergeVal = dataVal.substring(0, startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
						}
					} else if (startIdx < endIdx) {//드래그 입력
						newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
						mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(endIdx + dataVal.length - val.length);
					} else if (startIdx > endIdx) {//백스페이스 / 드래그 삭제
						//ie8 crossbrowsing
						if (UI.getBrowser().ie8) {
							if (selection.start != selection.end && !UI.isWhiteKeyCode(event)) { //드래그
								newVal = $(this).val().substr(selection.start, 1).replace(/([^0-9])/g, '');
								mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
							} else {
								mergeVal = dataVal.substring(0, endIdx) + dataVal.substring(startIdx);
							}

						} else {
							mergeVal = dataVal.substring(0, endIdx) + dataVal.substring(startIdx);
						}
					}

				} else { //val.length == dataVal.length
					//mergeVal = dataVal;
					if (startIdx == endIdx) {
						//ie8 crossbrowsing
						if (selection.start != selection.end) {
							newVal = $(this).val().substring(selection.start, selection.end).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						} else {
							mergeVal = dataVal;
						}
					} else {
						if (event.keyCode == 16) {//쉬프트
							mergeVal = dataVal;
						} else {
							newVal = $(this).val().substring(selection.start, selection.end).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						}
					}
				}
				$(this).data('val', mergeVal);
				if ($("#" + this.id + "Num").length > 0) {
					$("#" + this.id + "Num").val(mergeVal);
				}

				var newDataVal1 = mergeVal.substring(0, 4);
				var newDataVal2 = mergeVal.substring(4, 12);
				var newDataVal3 = mergeVal.substring(12);
				var maskStr = '';
				for (var i = 0; i < newDataVal2.length; i++) {
					maskStr += '*';
				}

				if (!(event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 16)) {
					$(this).val(newDataVal1 + maskStr + newDataVal3);
					UI.setCursorPosition($(this)[0], newVal != '' ? endIdx : startIdx);
				}
			}
			startIdx = UI.getCursorPosition($(this)[0]);
		}).focus(function () {
			var _this = this;
			setTimeout(function () {
				startIdx = UI.getCursorPosition($(_this)[0]);
				$(_this).val($(_this).val().replace(/([^*0-9])/g, ''));
				if ($("#" + _this.id + "Num").length > 0) {
					$('#' + _this.id + 'Num').val($('#' + _this.id + 'Num').val().replace(/([^*0-9])/g, ''));
				}
			}, 1);
		}).blur(function () {
			$(this).val($(this).val().replace(/([^*0-9])/g, '').replace(/([0-9]{4})([*]{4})([*]{4})([0-9]+)/, "$1-$2-$3-$4"));
			if ($("#" + this.id + "Num").length > 0) {
				$("#" + this.id + "Num").val($("#" + this.id + "Num").val().replace(/([0-9]{4})([0-9]{4})([0-9]{4})([0-9]+)/, "$1-$2-$3-$4"));
			}
		}).on('paste cut', function (event) {
			event.preventDefault();
		});
	},
	//법인등록번호
	corpFormAll: function () {
		$('input[type=text][data-mode=corp]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
		}).keyup(function (event) {
			UI.setNumberOnlyKeyUp(event, this);
			var endIdx = UI.getCursorPosition($(this)[0]);

			if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
				$(this)[0].selectionEnd = endIdx;
			}
			// 법인등록번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]{6})([0-9]+)/, "$1-$2"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				var endIdx = UI.getCursorPosition($(_this)[0]);

				//var val = $(_this).val();
				$(_this).val($(_this).val().replace(/[^0-9]/g, ""));

				if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
					$(_this)[0].selectionEnd = endIdx;
				}
			}, 100);
		});
	},
	//사업자등록번호
	compFormAll: function () {
		$('input[type=text][data-mode=comp]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
		}).keyup(function (event) {
			UI.setNumberOnlyKeyUp(event, this);
			var endIdx = UI.getCursorPosition($(this)[0]);

			if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
				$(this)[0].selectionEnd = endIdx;
			}
			// 사업자등록번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]{3})([0-9]{2})([0-9]+)/, "$1-$2-$3"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				var endIdx = UI.getCursorPosition($(_this)[0]);

				//var val = $(_this).val();
				$(_this).val($(_this).val().replace(/[^0-9]/g, ""));

				if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
					$(_this)[0].selectionEnd = endIdx;
				}
			}, 100);
		});
	},
	//외국인등록번호
	foreignerFormAll: function () {
		$('input[type=text][data-mode=foreigner]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
		}).keyup(function (event) {
			UI.setNumberOnlyKeyUp(event, this);
			var endIdx = UI.getCursorPosition($(this)[0]);

			if ($(this)[0].selectionEnd || $(this)[0].selectionEnd === 0) {
				$(this)[0].selectionEnd = endIdx;
			}
			// 외국인등록번호형식 변환
		}).blur(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
			$(this).val($(this).val().replace(/([0-9]{6})([0-9]+)/, "$1-$2"));
		}).focus(function () {
			if ($(this).val() != null && $(this).val() != '') {
				$(this).val($(this).val().replace(/([^0-9])/g, ''));
			}
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				var endIdx = UI.getCursorPosition($(_this)[0]);

				//var val = $(_this).val();
				$(_this).val($(_this).val().replace(/[^0-9]/g, ""));

				if ($(_this)[0].selectionEnd || $(_this)[0].selectionEnd === 0) {
					$(_this)[0].selectionEnd = endIdx;
				}
			}, 100);
		});
	},
	//주민등록번호
	residentFormAll: function () {
		$('input[data-mode=resident]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
			selection = UI.getCursorPositions($(this)[0]);
		}).keyup(function (event) {
			var endIdx = UI.getCursorPosition($(this)[0]);
			UI.setWhiteCombinationKeyUp(event);
			if (!UI.isWhiteKeyCode(event)) {
				var val = $(this).val();
				$(this).val(val.replace(/[^*0-9]/g, ""));
			}

			if (((event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) || (event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
				|| event.keyCode == 46 || event.keyCode == 8) { //del,backspace
				var val = $(this).val();
				var dataVal = $(this).data('val') ? $(this).data('val') : '';
				var mergeVal = '';
				var newVal;
				if (val.length > dataVal.length) {//입력
					newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
					mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(startIdx);
				} else if (val.length < dataVal.length) {//삭제
					if (startIdx == endIdx) {//del
						if (selection.start != selection.end) {
							newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						} else {
							mergeVal = dataVal.substring(0, startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
						}
					} else if (startIdx < endIdx) {//드래그 입력
						newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
						mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(endIdx + dataVal.length - val.length);
					} else if (startIdx > endIdx) {//백스페이스 / 드래그 삭제
						//ie8 crossbrowsing
						if (UI.getBrowser().ie8) {
							if (selection.start != selection.end && !UI.isWhiteKeyCode(event)) { //드래그
								newVal = $(this).val().substr(selection.start, 1).replace(/([^0-9])/g, '');
								mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
							} else {
								mergeVal = dataVal.substring(0, endIdx) + dataVal.substring(startIdx);
							}

						} else {
							mergeVal = dataVal.substring(0, endIdx) + dataVal.substring(startIdx);
						}
					}

				} else { //val.length == dataVal.length
					//mergeVal = dataVal;
					if (startIdx == endIdx) {
						//ie8 crossbrowsing
						if (selection.start != selection.end) {
							newVal = $(this).val().substring(selection.start, selection.end).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						} else {
							mergeVal = dataVal;
						}
					} else {
						if (event.keyCode == 16) {//쉬프트
							mergeVal = dataVal;
						} else {
							newVal = $(this).val().substring(selection.start, selection.end).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						}
					}
				}
				$(this).data('val', mergeVal);
				if ($("#" + this.id + "Num").length > 0) {
					$("#" + this.id + "Num").val(mergeVal);
				}

				var newDataVal1 = mergeVal.substring(0, 7);
				var newDataVal2 = mergeVal.substring(7);
				var maskStr = '';
				for (var i = 0; i < newDataVal2.length; i++) {
					maskStr += '*';
				}

				if (!(event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 16)) {
					$(this).val(newDataVal1 + maskStr);
					UI.setCursorPosition($(this)[0], newVal != '' ? endIdx : startIdx);
				}
			}
			startIdx = UI.getCursorPosition($(this)[0]);
		}).focus(function () {
			var _this = this;
			setTimeout(function () {
				startIdx = UI.getCursorPosition($(_this)[0]);
				$(_this).val($(_this).val().replace(/([^*0-9])/g, ''));
				if ($("#" + _this.id + "Num").length > 0) {
					$('#' + _this.id + 'Num').val($('#' + _this.id + 'Num').val().replace(/([^*0-9])/g, ''));
				}
			}, 1);
		}).blur(function () {
			$(this).val($(this).val().replace(/([^*0-9])/g, '').replace(/([0-9]{6})([0-9]{1}[*]{6})/g, "$1-$2"));
			if ($("#" + this.id + "Num").length > 0) {
				$('#' + this.id + 'Num').val($('#' + this.id + 'Num').val().replace(/([0-9]{6})([0-9]{7})/g, "$1-$2"));
			}
		}).on('paste cut', function (event) {
			event.preventDefault();
		});
	},
	startIdx: 0,	// 포커스 시작점
	//계좌번호
	accountFormAll: function () {
		$('input[data-mode=account]').keydown(function (event) {
			UI.setNumberOnlyKeyDown(event);
			selection = UI.getCursorPositions($(this)[0]);
			//console.log(UI.getCursorPositions($(this)[0]).start + '||' + UI.getCursorPositions($(this)[0]).end);
		}).keyup(function (event) {
			//endIdx = event.target.selectionEnd;
			var endIdx = UI.getCursorPosition($(this)[0]);
			//console.log(selection.start + '||' + selection.end);
			UI.setWhiteCombinationKeyUp(event);
			if (!UI.isWhiteKeyCode(event)) {
				var val = $(this).val();
				//$(this).val(val.replace(/[^●0-9]/g,""));
				$(this).val(val.replace(/[^*0-9]/g, ""));
			}
			//console.log(startIdx+'|'+endIdx);
			//if(!(event.keyCode == 35 || event.keyCode == 36 || event.keyCode == 37 || event.keyCode == 39 || event.keyCode== 16)){ //home, end, left, right, shift
			if (((event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) || (event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
				|| event.keyCode == 46 || event.keyCode == 8) { //del,backspace
				var val = $(this).val();
				var dataVal = $(this).data('val') ? $(this).data('val') : '';
				var mergeVal = '';
				var newVal;
				if (val.length > dataVal.length) {//입력
					newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
					mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(startIdx);
				} else if (val.length < dataVal.length) {//삭제
					if (startIdx == endIdx) {//del
						if (selection.start != selection.end) {
							newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						} else {
							mergeVal = dataVal.substring(0, startIdx) + dataVal.substring(startIdx + dataVal.length - val.length);
						}
					} else if (startIdx < endIdx) {//드래그 입력
						newVal = $(this).val().substring(startIdx, endIdx).replace(/([^0-9])/g, '');
						mergeVal = dataVal.substring(0, startIdx) + newVal + dataVal.substring(endIdx + dataVal.length - val.length);
					} else if (startIdx > endIdx) {//백스페이스 / 드래그 삭제
						//ie8 crossbrowsing
						if (UI.getBrowser().ie8) {
							if (selection.start != selection.end && !UI.isWhiteKeyCode(event)) { //드래그
								newVal = $(this).val().substr(selection.start, 1).replace(/([^0-9])/g, '');
								mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
							} else {
								mergeVal = dataVal.substring(0, endIdx) + dataVal.substring(startIdx);
							}

						} else {
							mergeVal = dataVal.substring(0, endIdx) + dataVal.substring(startIdx);
						}
					}

				} else { //val.length == dataVal.length
					//mergeVal = dataVal;
					if (startIdx == endIdx) {
						//ie8 crossbrowsing
						if (selection.start != selection.end) {
							newVal = $(this).val().substring(selection.start, selection.end).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						} else {
							mergeVal = dataVal;
						}
					} else {
						if (event.keyCode == 16) {//쉬프트
							mergeVal = dataVal;
						} else {
							newVal = $(this).val().substring(selection.start, selection.end).replace(/([^0-9])/g, '');
							mergeVal = dataVal.substring(0, selection.start) + newVal + dataVal.substring(selection.end);
						}
					}
				}

				$(this).data('val', mergeVal);
				if ($("#" + this.id + "Num").length > 0) {
					$("#" + this.id + "Num").val(mergeVal);
				}

				var newDataVal1 = mergeVal.substring(0, 8);
				var newDataVal2 = mergeVal.substring(8);
				var newDataVal3 = newDataVal2.substr(0, newDataVal2.length < 3 ? 0 : newDataVal2.length - 3);

				var maskStr = '';

				for (var i = 0; i < newDataVal2.length - newDataVal3.length; i++) {
					maskStr += '*';
				}

				//if(!UI.isWhiteKeyCode(event) ){
				if (!(event.keyCode == 37 || event.keyCode == 39 || event.keyCode == 16)) {
					$(this).val(newDataVal1 + newDataVal3 + maskStr);
					UI.setCursorPosition($(this)[0], newVal != '' ? endIdx : startIdx);
				}
			}

			startIdx = UI.getCursorPosition($(this)[0]);
		}).blur(function () {
			$(this).val($(this).val().replace(/([^*0-9])/g, ''));
			if ($("#" + this.id + "Num").length > 0) {
				$("#" + this.id + "Num").val($("#" + this.id + "Num").val().replace(/([^0-9]+)/, "$1"));
			}
		}).focus(function () {
			var _this = this;
			setTimeout(function () {
				startIdx = UI.getCursorPosition($(_this)[0]);
			}, 1);
		}).on('paste cut', function (event) {
			event.preventDefault();
		});
	},
	// 한글 금지
	noKoreanFormAll: function () {
		$('input[type=text][data-mode=noKorean]').keydown(function (event) {
			if (((!(event.keyCode >= 48 && event.keyCode <= 57 && !UI._whiteCombinationKey.shift) && !(event.keyCode >= 96 && event.keyCode <= 105 && !UI._whiteCombinationKey.shift))
				&& !(event.keyCode >= 65 && event.keyCode <= 90)
				&& !UI.isWhiteKeyCode(event) && !UI.isWhiteCombinationKeyDown(event)) || event.keyCode == 229) {
				//ie8 버전등에서 event.preventDefault 지원 안됨.
				return UI.preventDefault(event);
			}
		}).keyup(function (event) {
			var _this = this;
			UI.setWhiteCombinationKeyUp(event);
			//허용키시 포커스 유지
			if (!UI.isWhiteKeyCode(event)) {
				if ($(_this).val() != $(_this).val().replace(/[^a-zA-Z0-9]/g, "")) {
					$(_this).val($(_this).val().replace(/[^a-zA-Z0-9]/g, ""));
				}
			}
		}).on('paste', function () {
			var _this = this;
			setTimeout(function () {
				var val = $(_this).val();
				$(_this).val(val.replace(/[^a-zA-Z0-9]/g, ''));
			}, 100);
		});
	},
	accountValidityCheckBtnChange: function (flag, id) {
		if (flag) {
			$('#' + id).removeClass('disabled');
		} else {
			$('#' + id).addClass('disabled');
		}
	}
	, showObj: function (obj) {
		var str = "";
		for (key in obj) {
			str += key + "=" + obj[key] + "\n";
		}
		//console.log(str);
	},
	objectDebug: function (obj, depth) {
		var str = "depth: " + depth + " ";
		var index = 0;
		jQuery.each(obj, function (key, value) {
			if (index == 0) { for (var i = 0; i < depth * 4; i++) { str = str + ' '; } }
			if (typeof (value) == "object") {
				//console.log(str + 'type: [' + typeof obj[key] + '], key: [' + key + '] ---->');
				if (key == 'target') {
					UI.object(obj[key], depth + 1);
				}
				//UI.object(obj[key],depth+1);
				return true;
			}
			index++;
			//console.log(str + 'type: [' + typeof obj[key] + '], key: [' + key + '], value: [' + obj[key] + ']');
		});
	},
	getCursorPosition: function ($element) {
		var position = 0,
			selection;

		if (document.selection) {
			// IE Support
			$element.focus();
			selection = document.selection.createRange();
			selection.moveStart('character', -$element.value.length);
			position = selection.text.length;
			/*$element.focus(); 

			var r = document.selection.createRange(); 
			if (r == null) { 
				return 0; 
			} 

			var re = $element.createTextRange(), 
				rc = re.duplicate(); 
			re.moveToBookmark(r.getBookmark()); 
			rc.setEndPoint('EndToStart', re); 

			position = rc.text.length; */

		} else if ($element.selectionStart || $element.selectionStart === 0) {
			position = $element.selectionStart;
		}

		return position;
	},
	setCursorPosition: function ($element, position) {
		var selection;

		if (document.selection) {
			// IE Support
			$element.focus();
			selection = document.selection.createRange();
			selection.moveStart('character', -$element.value.length);
			selection.moveStart('character', position);
			selection.moveEnd('character', 0);
			selection.collapse();
			selection.select();
			/*var inputRange = $element.createTextRange ();
			inputRange.moveStart ("character", position);
			inputRange.collapse ();
			inputRange.moveEnd ("character", position);
			inputRange.select ();*/
		} else if ($element.selectionStart || $element.selectionStart === 0) {
			$element.selectionStart = position;
			$element.selectionEnd = position;
			$element.focus();
		}
	},
	getX: function (inputBox) {
		if ("selectionStart" in inputBox) {
			return {
				start: inputBox.selectionStart,
				end: inputBox.selectionEnd
			}
		}

		//and now, the blinkered IE way
		var bookmark = document.selection.createRange().getBookmark()
		var selection = inputBox.createTextRange()
		selection.moveToBookmark(bookmark)

		var before = inputBox.createTextRange()
		before.collapse(true)
		before.setEndPoint("EndToStart", selection)

		var beforeLength = before.text.length
		var selLength = selection.text.length

		return {
			start: beforeLength,
			end: beforeLength + selLength
		}
	},
	getCursorPositions: function (ctrl) {
		// IE < 9 Support
		if (document.selection) {
			ctrl.focus();
			var range = document.selection.createRange();
			var rangelen = range.text.length;

			range.moveStart('character', -ctrl.value.length);
			var start = range.text.length - rangelen;

			return { 'start': start, 'end': start + rangelen };
		}
		// IE >=9 and other browsers
		else if (ctrl.selectionStart || ctrl.selectionStart == '0') {
			return { 'start': ctrl.selectionStart, 'end': ctrl.selectionEnd };
		} else {
			return { 'start': 0, 'end': 0 };
		}
	},
	copyToClipboard: function (val) {
		val = val == undefined ? location.href : val;
		//var clipboardData;

		if (this.getBrowser().name == 'chrome') {
			var t = document.createElement("textarea");
			document.body.appendChild(t);
			t.value = val;
			t.select();
			document.execCommand('copy');
			document.body.removeChild(t);
		} else if (this.getBrowser().name == 'firefox') {
			var t = document.createElement("a");
			document.body.appendChild(t);
			t.text = val;
			var range = document.createRange();
			range.selectNode(t);
			window.getSelection().addRange(range);
			document.execCommand('copy');
			window.getSelection().removeAllRanges();
		} else if (this.getBrowser().name == 'safari') {
			//window.prompt("아래의 URL을 복사(Ctrl+C)하여\n원하는 곳에 붙여넣기(Ctrl+V)하세요", val);
			$('.url-copy input').focus();
			alert('URL을 복사하여 원하는 곳에 붙여넣기 하세요.');

		} else {
			window.clipboardData.setData("Text", val);
		}

		if (this.getBrowser().name != 'safari') {
			alert('주소가 복사되었습니다.\n원하는 곳에 붙여넣기 해주세요.');
		}
	},
	// 마이너스 버튼
	minusFormAll: function () {
		$('.btn-minus').on('click', function () {
			//debugger;
			//console.dir($(this).next('input').val());
			var val = Number($(this).next('input').val()) - 1;
			if (val < 2) {
				val = 1;
			}
			$(this).next('input').val(val);
		});
	},
	// 플러스 버튼
	plusFormAll: function () {
		$('.btn-plus').on('click', function () {
			//debugger;
			//console.dir($(this).prev('input').val());
			var val = Number($(this).prev('input').val()) + 1;

			// 임시로 10까지만 증가 해당 제품의 재고 수량 만큼만 증가하게 수정 필요
			if (val > 10) {
				val = 10;
			}
			$(this).prev('input').val(val);
		});
	},
	modal: function (param) {

		if (param.execute) {
			$(param.execute).off('click');
			$(param.execute).click(function () {
				UI.modal(param);
			});
		}

		var modal = param.modal;

		var button = param.button;
		if (param.buttonType == 'alert') {
			button = '<button type="button" class="btn-primary btn-md">확인</button>';
		} else if (param.buttonType == 'confirm') {
			button = '<button type="button" class="btn-semi btn-md">취소</button><button type="button" class="btn-primary btn-md">확인</button>';
		} else if (param.buttonType == 'yesno') {
			button = '<button type="button" class="btn-semi btn-md">아니오</button><button type="button" class="btn-primary btn-md">예</button>';
		}

		if ($(modal).length == 0 || param.modalType != undefined) {
			if ($(modal).length > 0) $(modal).remove();
			var modalType = param.modalType == undefined ? 'alert' : param.modalType;
			var modalId = modal.replace('#', '');
			var html = '';
			if (modalType == 'alert') {
				html += '<div class="modal modal-alert modal-overlay" id="' + modalId + '" role="dialog" aria-modal="true">';
				html += '<div class="modal-dialog" role="document">';
				html += '<div class="modal-inner">';
				html += '<div class="modal-body">';
				html += '<div class="modal-header">';
				html += '<h1 class="modal-title"></h1>';
				html += '</div>';
				html += '<div class="modal-content">';
				html += '</div>';
				html += '<div class="modal-footer">';
				html += '<div class="btn-area">';
				html += '</div>';
				html += '</div>';
				html += '<button type="button" class="btn-close">';
				html += '<span class="ico-close">팝업 닫기</span>';
				html += '</button>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '<div class="dimmed"><iframe frameborder="0" src="about:blank" title="버그픽스용" class="iframe-bugfix"></iframe></div>';
				html += '</div>';
			} else if (modalType == 'normal') {
				html += '<div class="modal modal-overlay" id="' + modalId + '" role="dialog" aria-modal="true">';
				html += '<div class="modal-dialog" role="document">';
				html += '<div class="modal-inner">';
				html += '<div class="modal-body">';
				html += '<div class="modal-header">';
				html += '<h1 class="modal-title"></h1>';
				html += '</div>';
				html += '<div class="modal-content">';
				html += '</div>';
				html += '<div class="modal-footer">';
				html += '<div class="btn-area">';
				html += '</div>';
				html += '</div>';
				html += '<button type="button" class="btn-close">';
				html += '<span class="ico-close">팝업 닫기</span>';
				html += '</button>';
				html += '</div>';
				html += '</div>';
				html += '</div>';
				html += '<div class="dimmed"><iframe frameborder="0" src="about:blank" title="버그픽스용" class="iframe-bugfix"></iframe></div>';
				html += '</div>';
			}

			$('body').append(html);
		}

		$(modal).find('.modal-title').html(param.title);
		$(modal).find('.modal-content').html(param.content);
		$(modal).find('.modal-footer .btn-area').html(button);

		$(modal).find('.modal-footer .btn-area').children().click(function () {
			$(modal).hide();
			$('body').removeClass('js-noscroll');
		});

		// tworld 비회원 주문조회이관 '인증하기' 팝업
		if ($(modal).hasClass('modal-tworld-order-certify')) {
			$(modal + ' .modal-footer .btnS.c-grey').on('click', function () {
				$(modal).hide();
				$('body').removeClass('js-noscroll');
			});
		}

		$(modal + ' .btn-close').on('click', function () {
			$(modal).hide();
			$('body').removeClass('js-noscroll');
		});

		$(modal).click(function (e) {
			if (!$('.modal-body').has(e.target).length) {
				$(modal).hide();
				$('body').removeClass('js-noscroll');
			}
		});

		if (param.callBack) {
			param.callBack(modal, param);
		}

		$(modal).show();
		$('body').addClass('js-noscroll');
	},
	modalAll: function () {
		$('[data-modal]').modal();
	},
	tooltip: function (param) {
		//var $tooltip = $(param.tooltip);
		var btn = param.excute;
		var $tooltip = $(btn).parent('.ico-tooltip-wrap').find(param.tooltip);
		var $tooltipWrap = $(btn).closest('.ico-tooltip-wrap');
		$tooltip.toggle();
		$tooltipWrap.hasClass('except') && $(btn).toggleClass('default');
	},
	tooltipAll: function () {
		$('[data-tooltip]').tooltip();
	},
	sticky: function () {
		//GNB2
		$(window).on('scroll resize', function () {
			//console.log($(this).scrollTop());
			var left = $(this).scrollLeft();
			var wWidth = $(this).outerWidth();
			//GNB2
			if ($('#header .h_lnb_wrap #gnb2').length > 0) {

				if ($(this).scrollTop() > 70) {
					$('#header .h_lnb_wrap #gnb2').css({ 'top': '0px', 'left': -left, 'position': 'fixed' });

				} else {
					$('#header .h_lnb_wrap #gnb2').css({ 'top': '', 'left': '', 'position': '' });
				}
				$('#header .h_lnb_wrap #gnb2 .lnb_wrap').css('margin-left', $('#header .gnb_wrap').css('margin-left'));
			}


			//상품 Mobile > detail > 하단 주문하기 레이어 (mobile_detail)
			if ($('.checkpoint-wrap').offset() && $('.sticky-detail-wrap .sticky-detail').length > 0) {
				if ($(this).scrollTop() >= $('.checkpoint-wrap').offset().top - $(this).outerHeight()) {
					$('.sticky-detail-wrap .sticky-detail').removeClass('sticky-on');
					$('.sticky-detail-wrap .sticky-detail').css({ 'left': '' });
				} else {
					$('.sticky-detail-wrap .sticky-detail').addClass('sticky-on');
					$('.sticky-detail-wrap .sticky-detail').css({ 'left': -left });
				}
				$('.sticky-detail-wrap .sticky-detail .l-grid').css('margin-left', $('#header .gnb_wrap').css('margin-left'));
			}

			/*2020부가서비스 수정 0111*/
			//부가상품 가입 하단 담기 레이어 (sticky-add-service)
			if ($('.wrap .footer').offset() && $('.sticky-add-service-wrap .sticky-add-service').length > 0) {
				if ($(this).scrollTop() >= $('.wrap .footer').offset().top - $(this).outerHeight()) {
					$('.sticky-add-service-wrap .sticky-add-service').removeClass('sticky-on');
					$('.sticky-add-service-wrap .sticky-add-service').css({ 'left': '' });
				} else {
					$('.sticky-add-service-wrap .sticky-add-service').addClass('sticky-on');
					$('.sticky-add-service-wrap .sticky-add-service').css({ 'left': -left });
				}
				$('.sticky-add-service-wrap .sticky-add-service .l-grid').css('margin-left', $('#header .gnb_wrap').css('margin-left'));
			}
			/*//2020부가서비스 수정 0111*/

			//공시지원금 > 목록 > 하단 공시지원금 변동 알림 레이어(disclosure_list)
			if ($('.checkpoint-wrap').offset() && $('.sticky-disclosure-wrap .disclosure-notice-wrap').length > 0) {
				//var left 
				if ($(this).scrollTop() >= $('.checkpoint-wrap').offset().top - $(this).outerHeight()) {
					$('.sticky-disclosure-wrap .disclosure-notice-wrap').removeClass('sticky-on');
					$('.sticky-disclosure-wrap .disclosure-notice-wrap .l-grid').css({ 'left': '' });

				} else {
					$('.sticky-disclosure-wrap .disclosure-notice-wrap').addClass('sticky-on');
					$('.sticky-disclosure-wrap .disclosure-notice-wrap .l-grid').css({ 'left': wWidth < 1200 ? 10 - left : 0 - left });
				}
			}

			//T안심보안보안 (t-relax-security)
			if ($('.wrap .footer').offset() && $('.security-floating-area .security-floating').length > 0) {
				if ($(this).scrollTop() >= $('.wrap .footer').offset().top - $(this).outerHeight()) {
					$('.security-floating-area .security-floating').removeClass('sticky-on');
					$('.security-floating-area .security-floating').css({ 'left': '' });
				} else {
					$('.security-floating-area .security-floating').addClass('sticky-on');
					$('.security-floating-area .security-floating').css({ 'left': -left });
				}
				$('.security-floating-area .security-floating .l-grid').css('margin-left', $('#header .gnb_wrap').css('margin-left'));
			}

			//주문서작성
			if ($('.purchase-cont').offset() && $('.purchase-wrap :not(.agree-grid) .purchase-spot').length > 0) {
				var left = $('.purchase-cont').width() + $('.purchase-cont').offset().left + 56 - $(this).scrollLeft();
				if ($(this).scrollTop() >= $('.purchase-wrap').offset().top - 70) {
					if ($(this).scrollTop() >= $('.last-btn-area').offset().top - $('.purchase-wrap .purchase-spot').outerHeight() + 110) {//하단에서 플로팅
						var top = $('.last-btn-area').offset().top - $('.purchase-wrap .purchase-spot').outerHeight() - $(this).scrollTop() + 130;
						$('.purchase-wrap .purchase-spot').css({ 'top': top, 'left': left, 'position': 'fixed' });
					} else {//상단에서 플로팅
						$('.purchase-wrap .purchase-spot').css({ 'top': '71px', 'left': left, 'position': 'fixed' });
					}
				} else {
					$('.purchase-wrap .purchase-spot').css({ 'position': '' });

				}
			}

			//약관동의
			if ($('.purchase-cont').offset() && $('.purchase-wrap .agree-grid .purchase-spot').length > 0) {
				var left = $('.purchase-cont').width() + $('.purchase-cont').offset().left + 30 - $(this).scrollLeft();
				var agreeHeight = $('.agree-grid .agree-desc').outerHeight();
				var $aside = $('.purchase-wrap .purchase-spot');

				if ($aside.outerHeight() > $('.purchase-cont').outerHeight()) {
					$aside.css({ 'position': '' });
					return false;
				}

				if ($(this).scrollTop() >= $('.purchase-wrap').offset().top - 70 + agreeHeight + 62) {
					if ($(this).scrollTop() >= $('.last-btn-area').offset().top - $aside.outerHeight() - 170) {//하단에서 플로팅
						var top = $('.last-btn-area').offset().top - $aside.outerHeight() - $(this).scrollTop() - 100;
						$aside.css({ 'top': top, 'left': left, 'position': 'fixed' });
					} else {//상단에서 플로팅
						$aside.css({ 'top': '71px', 'left': left, 'position': 'fixed' });
					}
				} else {
					$aside.css({ 'position': '' });
				}
			}

			//주문서 상품이미지
			if ($('.mobile-detail-content .product-spot-wrap .product-spot-img').offset() && $('.mobile-detail-content .product-spot-wrap .product-spot-img').length > 0) {
				var left = $('.product-spot-wrap .l-grid').offset().left - $(this).scrollLeft();
				if (!$('.product-spot-info').height() < $('.product-spot-img').height()) {
					if ($(this).scrollTop() >= $('.product-spot-wrap .l-grid').offset().top - 70) {
						if ($(this).scrollTop() >= $('.product-spot-wrap').outerHeight() - $('.product-spot-img').outerHeight()) {//하단에서 플로팅
							//console.log('aa');
							var top = $('.product-spot-wrap .l-grid').offset().top + $('.product-spot-wrap .l-grid').outerHeight() - $('.product-spot-img').outerHeight() - $(this).scrollTop();
							$('.product-spot-img').css({ 'top': top, 'left': left, 'position': 'fixed' });
						} else {//상단에서 플로팅
							//console.log('aaa');
							$('.mobile-detail-content .product-spot-wrap .product-spot-img').css({ 'top': '71px', 'left': left, 'position': 'fixed' });
						}
					} else {
						$('.product-spot-img').css({ 'position': '' });

					}
				}
			}

			//상품 Mobile > 요금계산기 > 하단 레이어 (product_internet_iptv_fee_calculator)
			var $floatPoint = $('.iptv-content .lr-wrap.type-period');
			var $floatingObj = $('.iptv-content .calculate-price-area');
			//var $floatingInner = $floatingObj.find('.calculate-price-list');

			//console.log($floatPoint.offset().top + $floatPoint.outerHeight() + $floatingObj.outerHeight() - $(this).outerHeight());
			if ($floatPoint.offset() && $floatingObj.length > 0) {
				if ($(this).scrollTop() >= $floatPoint.offset().top + $floatPoint.outerHeight() + $floatingObj.outerHeight() - $(this).outerHeight()) {
					$floatingObj.css({ 'left': '', 'position': '', bottom: '', right: '' });
				} else {
					$floatingObj.css({ 'left': -left, 'position': 'fixed', bottom: '0', right: '0' });
					//$('.calculate-price-area .calculate-price-list').css('margin-left',$('#header .gnb_wrap').css('margin-left'));
					//$('.calculate-price-area .calculate-price-list').css('margin-right',$('#header .gnb_wrap').css('margin-right'));
				}
			}
		});
		$(window).on('scroll', function () {
			//MENU 스크롤시에만 닫기
			$('#header .h_lnb_allwrap').hide();
			$('#header .h_lnb_allmenu:visible').hide();
			$('.wrap #dimed').hide();
			//myT 스크롤시에만 닫기
			$('#header .aside_wrap .g_myt').find('.layer_con_aside').slideUp(100);
			$('#header .aside_wrap .g_myt').removeClass('over');
			if ($(this).scrollTop() > 400) {
				$('.btn-area-add-service .btn-top').show();
			} else {
				$('.btn-area-add-service .btn-top').hide();
			}
		});
		$(window).on('resize', function () {
			var left = $(this).scrollLeft();
			//MENU플로팅 
			if ($('#header .h_lnb_allwrap').length > 0 && $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset()) {
				if ($(this).scrollTop() > 70) {
					$('#header .h_lnb_allwrap').css({ 'top': '47px', 'left': $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset().left - left, 'position': 'fixed' });
				} else {
					$('#header .h_lnb_allwrap').css({ 'top': '', 'left': '', 'position': '' });
				}
			}
		});
		$(window).trigger('scroll');
	},
	global: function () {
		/* ===============================================================
		Form
		================================================================*/
		//Designed html selectbox
		if ($('.c-select, .c-select-outline').has('.select-list').length > 0) {
			$('.c-select, .c-select-outline').on('click', function (e) {
				//ie crossbrowsing (css pointer-events: none;)
				if ($(this).hasClass('disabled')) {
					return false;
				}
				//firefox crossbrowsing
				if ($(this).data('keydown') == 32) {
					$(this).addClass('active');
				} else {
					var ev = jQuery.Event("keydown");
					ev.keyCode = 13; // # Some key code value
					$(this).trigger(ev);
				}
				$(this).data('keydown', false);
				$(this).find('button.head').focus();
			}).keydown(function (e) {
				if (!$(this).data('init')) { $(this).trigger('init'); }
				if (e.keyCode != 9) {
					e.preventDefault();
				}
				$(this).data('keydown', e.keyCode);
				if ($(this).hasClass('active')) {
					var length = $(this).find('.select-item').length;
					var activeIndex = $(this).data('active-index');
					var index = activeIndex > -1 ? activeIndex : $(this).find('.select-item').index($(this).find('.select-item .item.hover'));
					var itemHeight = 0;
					var listHeight = $(this).find('.select-list').height();
					var listScrollTop = $(this).find('.select-list').scrollTop();
					if (e.keyCode == 38) {//위
						index = index < 1 ? 0 : index - 1;
						$(this).find('.select-item').find('.item').removeClass('hover');
						$(this).find('.select-item').eq(index).find('.item').addClass('hover');
						$(this).data('active-index', index);
						$(this).find('.select-item:lt(' + (index) + ')').each(function () {
							itemHeight += $(this).height();
						});
						if (listScrollTop > itemHeight) {
							$(this).find('.select-list').scrollTop(itemHeight);
						}

						if (listHeight <= itemHeight - listScrollTop) {
							$(this).find('.select-list').scrollTop(itemHeight - listHeight + $(this).find('.select-item').eq(index).height());
						}

					} else if (e.keyCode == 40) {//아래
						index = index + 1 < length ? index + 1 : index;
						$(this).find('.select-item').find('.item').removeClass('hover');
						$(this).find('.select-item').eq(index).find('.item').addClass('hover');
						$(this).data('active-index', index);
						$(this).find('.select-item:lt(' + (index + 1) + ')').each(function () {
							itemHeight += $(this).height();
						});
						if (itemHeight >= listHeight) {
							$(this).find('.select-list').scrollTop(itemHeight - listHeight);
						}

						if (itemHeight < listScrollTop) {
							$(this).find('.select-list').scrollTop(itemHeight - $(this).find('.select-item').eq(index).height());
						}
					} else if (e.keyCode == 13) { //enter
						if (index == -1) {
							$(this).removeClass('active');
						} else {
							$(this).find('.select-item').eq(index).trigger('click');
						}
					} else if (e.keyCode == 32) {//spacebar
						return false;
					} else if (e.keyCode == 27) {//esc
						$(this).find('.select-item').find('.item').removeClass('hover');
						$(this).removeData('active-index');
						$(this).removeClass('active');
					} else if (e.keyCode == 9) {	//tab
						$(this).find('.select-item').find('.item').removeClass('hover');
						$(this).removeData('active-index');
						$(this).removeClass('active');
						e.preventDefault();
					}

				} else {
					if (e.keyCode == 13) {//enter
						$(this).addClass('active');
					} else if (e.keyCode == 32) {//spacebar
						$(this).addClass('active');
					}
				}
			}).on('init', function () {
				$(this).data('init', true);
				var _this = this;
				$('*').on('click', function (e) {
					if ($(_this).hasClass('active') && e.target != _this) {
						if (!$(_this).has(e.target).length) {
							$(_this).removeClass('active');
						}
					}

				});

				UI.activateSelection(_this);
			});
		}

		//CHECKBOX
		//$('.c-chk input:checkbox, .c-ick-btn .label, .c-ick-var .label').on('click', function(e) {
		$(document).off('click.agreement').on('click.agreement', '.c-chk input:checkbox, .c-ick-btn .label, .c-ick-var .label, .mysec-chk input:checkbox', function (e) {
			var requiredTermsArray = Array.prototype.slice.call($('.check-all-native .agree-checkbox').not('.agree-checkbox:first'));
			var requiredTermsArrayWireline = Array.prototype.slice.call($('.check-all-native-wireline .agree-checkbox').not('.agree-checkbox:first'));
			var requiredTermsArrayWirePass = Array.prototype.slice.call($('.check-all-native.pass .c-chk input:checkbox'));
			var requiredTermsArrayWireCard = Array.prototype.slice.call($('.check-all-native.card .c-chk input:checkbox'));
			console.log('checkbox click');
			//.disabled pointer-events: none; ie8 미작동 
			//ie crossbrowsing (css pointer-events: none;)
			if ($(this).parent('span').hasClass('disabled')) {
				return false;
			}
			if ($(this).is(':radio')) {
				$(this).parent().addClass('checked');
				$(this).parent().siblings().removeClass('checked');
			} else if ($(this).prev().is(':radio') || $(this).parent().attr('role') == "tab") {
				if ($(this).parent().attr('aria-controls') == '_mbrClsPnl3') {
					UI.modal({ modal: '#modalAlert', title: '알림', content: '휴대폰 구매를 원하시는 법인 고객님께서는 전화상담 주문을 이용하세요. (국번없이 1599-0111)', buttonType: 'alert' });
					return false;
				}
				$(this).parent().addClass('checked');
				$(this).parent().siblings().removeClass('checked');
			} else if ($(this).attr('id') === 'chk_agree222' && !requiredTermsArray.some(function (element) {
				return element['checked'];
			})) {
				alert("'혜택 제공을 위한 제3자 제공(재제공)동의 (선택)' 약관에 먼저 동의해주세요.");
				return false;
			//유선고도화약관동의 추가(2022.06.16)				
			} else if ($(this).attr('id') === 'chk_agree921' && !requiredTermsArrayWireline.some(function (element) {
				return element['checked'];
			})) {
				alert("'(B tv) 다양한 서비스 안내를 위한 제휴사 정보 제공 동의(선택)’ 약관에 먼저 동의해주세요.");
				return false;
			//유선고도화 본인인증 약관동의 추가(2022.07.27)	
			} else if ($(this).attr('id') === '_checkPassagree' && !requiredTermsArrayWirePass.some(function (element) {
				return element['checked'];
			})) {
				alert("‘(선택) 주문 중단/취소 고객 개인정보 수집/이용 동의’ 약관에 먼저 동의해주세요.");
				return false;
			} else if ($(this).attr('id') === '_checkCardagree' && !requiredTermsArrayWireCard.some(function (element) {
				return element['checked'];
			})) {
				alert("‘(선택) 주문 중단/취소 고객 개인정보 수집/이용 동의’ 약관에 먼저 동의해주세요.");
				return false;
			} else {
				$(this).parent().toggleClass('checked');
			}
		});

		$(document).on('allunchecked', '.c-chk input:checkbox, .c-ick-btn input:checkbox, .c-ick-var input:checkbox, .mysec-chk input:checkbox', function (e) {
			$(this).filter(':checked').trigger('click');
			//$(this).parent().removeClass('checked');
			//$(this).prop('checked',false);
		});

		$(document).on('allchecked', '.c-chk input:checkbox, .c-ick-btn input:checkbox, .c-ick-var input:checkbox, .mysec-chk input:checkbox', function (e) {
			$(this).not(':checked').trigger('click');
			//$(this).parent().addClass('checked');
			//$(this).prop('checked',true);
		});

		//RADIO
		$(document).on('change', '.c-rdo input:radio, .c-ick-btn input:radio, .c-ick-var input:radio, .mysec-rdo input:radio', function () {
			//console.log('radio chagnge');
			var thisName = $(this).attr('name');
			var thisGroup = $('input[name=' + thisName + ']:radio');

			if ($(this).is(':checked')) {
				$(this).parent().addClass('checked');
			}

			$(thisGroup).not(this).each(function () {
				$(this).parent().removeClass('checked');
			});
		})
		$(document).on('click', '.c-rdo input:radio, .c-ick-btn input:radio, .c-ick-var input:radio, .mysec-rdo input:radio', function () {
			//console.log('radio click');
			var thisName = $(this).attr('name');
			var thisGroup = $('input[name=' + thisName + '][data-radio=unchecked]:radio');
			var index = thisGroup.index(this);

			if ($(this).is('input[data-radio=unchecked]:radio')) {
				if ($(this).data('radio-chckedindex') == index) {
					$(this).prop('checked', false);
					$(this).parent().removeClass('checked');
					thisGroup.removeData('radio-chckedindex');
				} else {
					thisGroup.data('radio-chckedindex', index);
				}
				//console.log($(this).data('radio-chckedindex'));
			}
		});

		//INPUT FOCUS
		$('.c-input input, .c-input-outline input').on('focus', function () { $(this).parent().addClass('focus'); }).on('focusout', function () { $(this).parent().removeClass('focus'); });

		// //2019-06-25 주석처리 이상 없을 시 삭제요망
		// //약관동의
		// //이미 개발된 페이지에 prop checked된 부분이 있어 일단 prop checked 주석처리
		// //$checkAllInput.on('click', function() {
		// $(document).on('click','.agree-area:not(.improvement):not(.except) .agree-item.check-all .c-chk' ,function(){
		// 	var $checkAllInput = $('.agree-item.check-all').find('.c-chk');
		// 	var $checkSingle   = $checkAllInput.parents('.agree-area').find('.agree-list .c-chk');
		// 	if ($(this).hasClass('checked')) {
		// 		$checkSingle.each(function() {
		// 			$(this).addClass('checked');
		// 			//$(this).find('input:checkbox').prop('checked',true);
		// 		});
		// 	} else {
		// 		$checkSingle.each(function() {
		// 			$(this).removeClass('checked');
		// 			//$(this).find('input:checkbox').prop('checked',false);
		// 		});
		// 	}
		// });

		// //$checkSingle.on('click', function () {
		// $(document).on('click','.agree-area:not(.improvement):not(.except) .agree-list .c-chk',function(){
		// 	var $checkAllInput = $('.agree-item.check-all').find('.c-chk');
		// 	var $checkSingle   = $checkAllInput.parents('.agree-area').find('.agree-list .c-chk');
		// 	if ($(this).hasClass('checked')) {
		// 		var $isAllChecked = 0;

		// 		$checkSingle.each(function() {
		// 			if (!$(this).hasClass('checked')) {
		// 				$isAllChecked = 1;
		// 			}
		// 		});

		// 		if ($isAllChecked == 0) {
		// 			//개별 input 전체 체크시
		// 			$checkAllInput.addClass('checked');
		// 			//$checkAllInput.find('input:checkbox').prop('checked',true);
		// 		}
		// 	} else {
		// 		//개별 input 체크 해제시
		// 		$checkAllInput.removeClass('checked');
		// 		//$checkAllInput.find('input:checkbox').prop('checked',false);
		// 	}
		// });

		//개선된 약관동의
		$(document).on('click', '.agree-area .agree-item.check-all .c-chk :checkbox', function () {
			// console.log('약관 전체 동의');
			var $thisCheckbox = $(this);
			var $thisAgreeArea = $thisCheckbox.closest('.agree-area');
			var $checkSingle = $thisAgreeArea.find('.agree-list .c-chk :checkbox');
			if ($thisCheckbox.prop('checked')) {
				$checkSingle.not(':checked').closest('.c-chk').addClass('checked');
				$checkSingle.not(':checked').prop('checked', true).trigger('change');
			} else {

				$checkSingle.filter(':checked').closest('.c-chk').removeClass('checked');
				$checkSingle.filter(':checked').prop('checked', false).trigger('change');
			}

			if ($thisAgreeArea.has('.check-all-native').length) {
				checkMainAgree(this);
			}
			// 유선고도화약관추가(2022.06.17)
			if ($thisAgreeArea.has('.check-all-native-wireline').length) {
				checkMainAgreeWireline(this);
			}

			//약관 내 개별동의 체크박스 동작
			if ($(this).closest('.agree-area').has('.c-term .sub-agree-checkbox').length) {
				if ($(this).prop('checked')) {
					$(this).closest('.agree-area').find('.sub-agree-checkbox').each(function () {
						$(this).prop('checked', true).trigger('change');
					});
				} else {
					$(this).closest('.agree-area').find('.sub-agree-checkbox').each(function () {
						$(this).prop('checked', false).trigger('change');
					});
				}
			}
		});
		//선택약관 전체동의
        $(document).on('click', '.agree-area .agree-item.sub-check-all:nth-child(2) .agree-title .c-chk :checkbox', function () {
            // console.log('선택약관 전체동의');
            //약관 내 개별동의 체크박스 동작
            if ($(this).closest('.agree-area').has('.c-term .agree-checkbox').length) {
                if ($(this).prop('checked')) {
                    $(this).closest('.agree-area').find('.agree-checkbox').each(function () {
                        $(this).prop('checked', true).trigger('change');
                    });
                } else {
                    $(this).closest('.agree-area').find('.agree-checkbox').each(function () {
                        $(this).prop('checked', false).trigger('change');
                    });
                }
            }
        });

		//$checkSingle.on('click', function () {
		$(document).on('click', '.agree-area:not(.separate) .agree-list .c-chk :checkbox', function () {
			// console.log('약관 개별 동의');
			var $thisCheckbox = $(this);
			var $thisAgreeArea = $thisCheckbox.closest('.agree-area');
			var $checkAllInput = $thisAgreeArea.find('.agree-item.check-all .c-chk :checkbox');
			var $checkSingle = $thisAgreeArea.find('.agree-list .c-chk :checkbox');
			var $advertisingReceptionTerm = $('#chk_agree222');
			var $advertisingReceptionTermWire = $('#chk_agree921'); //유선고도화약관동의 추가(2022.06.16)
			var $advertisingReceptionTermWirePass = $('#_checkPassagree'); //유선고도화 본인인증 약관동의 추가(2022.07.27)	
			var $advertisingReceptionTermWireCard = $('#_checkCardagree'); //유선고도화 본인인증 약관동의 추가(2022.07.27)	
			if ($thisCheckbox.prop('checked')) {
				var $isAllChecked = 0;

				$checkSingle.each(function () {
					if (!$(this).prop('checked')) {
						$isAllChecked = 1;
					}
				});

				if ($isAllChecked == 0) {
					//개별 input 전체 체크시
					$checkAllInput.closest('.c-chk').addClass('checked');
					$checkAllInput.prop('checked', true).trigger('change');
				}
			} else {
				//개별 input 체크 해제시
				$checkAllInput.closest('.c-chk').removeClass('checked');
				$checkAllInput.prop('checked', false).trigger('change');
			}

			if ($thisCheckbox.parents('.agree-item').hasClass('check-all-native')) {
				$('#chk-all').click();
				if (!$thisCheckbox.prop('checked')) {
					$advertisingReceptionTerm.prop('checked', false);
					$advertisingReceptionTerm.parent('.c-chk').removeClass('checked');
					//유선고도화 본인인증 약관동의 추가(2022.07.27)	
					$advertisingReceptionTermWirePass.prop('checked', false);
					$advertisingReceptionTermWirePass.parent('.c-chk').removeClass('checked');
					$advertisingReceptionTermWireCard.prop('checked', false);
					$advertisingReceptionTermWireCard.parent('.c-chk').removeClass('checked');
				}
			} 
			if ($thisCheckbox.parents('.agree-item').hasClass('check-all-native-wireline')) {
				$('#chk-all-wireline').click();
				if (!$thisCheckbox.prop('checked')) {
					$advertisingReceptionTermWire.prop('checked', false);
					$advertisingReceptionTermWire.parent('.c-chk').removeClass('checked');
				}
			}

			//약관 내 개별동의 체크박스 동작
			if ($(this).closest('.agree-item').has('.c-term .sub-agree-checkbox')) {
				if ($(this).prop('checked')) {
					$(this).closest('.agree-item').find('.sub-agree-checkbox').each(function () {
						$(this).prop('checked', true).trigger('change');
					});
				} else {
					$(this).closest('.agree-item').find('.sub-agree-checkbox').each(function () {
						$(this).prop('checked', false).trigger('change');
					});
				}
			}
		});

		//하위약관 전체동의 기본체크박스 
		$(document).on('click', '.check-all-native .agree-checkbox', function (e) {
			var $checkAgreeAll = $('.check-all-native .agree-checkbox:first');
			var $checkUpperAgreeItem = $('.check-all-native .c-chk');
			var $checkAgreeItem = $('.check-all-native .agree-checkbox').not('.agree-checkbox:first');
			var requiredTermsArray = Array.prototype.slice.call($checkAgreeItem);
			var $advertisingReceptionTerm = $('#chk_agree222');
			var $advertisingReceptionTermPass = $('#_checkPassagree');//유선고도화 본인인증 약관동의 추가(2022.07.27)	
			var $advertisingReceptionTermCard = $('#_checkCardagree');//유선고도화 본인인증 약관동의 추가(2022.07.27)	
			var $this = $(this);
			var $thisChkAreaSub = $this.closest(".agree-item.sub-check-all");
			var $subChkAll = $thisChkAreaSub.find(".agree-title .c-chk :checkbox");
			var $thisChkAreaAll = $(".agree-item.check-all");
			var $ChkAll = $thisChkAreaAll.find(".agree-title .c-chk :checkbox");

			if($this.prop('checked') && $checkUpperAgreeItem.prop('checked')){
				$subChkAll.not(':checked').closest('.c-chk').addClass('checked');
				$subChkAll.not(':checked').prop('checked', true).trigger('change');
				$ChkAll.not(':checked').closest('.c-chk').addClass('checked');
				$ChkAll.not(':checked').prop('checked', true).trigger('change');
			}else {
				$subChkAll.filter(':checked').closest('.c-chk').removeClass('checked');
				$subChkAll.filter(':checked').prop('checked', false).trigger('change');
				$ChkAll.filter(':checked').closest('.c-chk').removeClass('checked');
				$ChkAll.filter(':checked').prop('checked', false).trigger('change');
			}

			//전체동의 체크박스 클릭 시
			if ($(this).get(0) === $checkAgreeAll.get(0)) {
				if ($(this).prop('checked')) {

					$checkAgreeItem.each(function () {
						$(this).prop('checked', true);
					});

					$checkUpperAgreeItem.addClass('checked');
					$checkUpperAgreeItem.children('input:checkbox').prop('checked', true);
				} else {
					$checkAgreeItem.each(function () {
						$(this).prop('checked', false);
					});

					$checkUpperAgreeItem.removeClass('checked');
					$checkUpperAgreeItem.children('input:checkbox').prop('checked', false);
					$advertisingReceptionTerm.prop('checked', false);
					//유선고도화 본인인증 약관동의 추가(2022.07.27)
					$advertisingReceptionTerm.parent('.c-chk').removeClass('checked');
					$advertisingReceptionTermPass.prop('checked', false);
					$advertisingReceptionTermPass.parent('.c-chk').removeClass('checked');
					$advertisingReceptionTermCard.prop('checked', false);
					$advertisingReceptionTermCard.parent('.c-chk').removeClass('checked');
				}
			}
			//개별동의 항목 체크박스 클릭 시
			else {
				$checkAgreeItem.each(function () {
					if ($(this).prop('checked')) {
						$checkUpperAgreeItem.addClass('checked');
						$checkUpperAgreeItem.children('input:checkbox').prop('checked', true);
					} else {
						$advertisingReceptionTerm.prop('checked', false);
						$advertisingReceptionTerm.parent('.c-chk').removeClass('checked');
						//유선고도화 본인인증 약관동의 추가(2022.07.27)
						$advertisingReceptionTermPass.prop('checked', false);
						$advertisingReceptionTermPass.parent('.c-chk').removeClass('checked');
						$advertisingReceptionTermCard.prop('checked', false);
						$advertisingReceptionTermCard.parent('.c-chk').removeClass('checked');
						if (requiredTermsArray.every(function (element) {
							return !element['checked'];
						})) {
							$advertisingReceptionTerm.prop('checked', false);
							$advertisingReceptionTerm.parent('.c-chk').removeClass('checked');
							//유선고도화 본인인증 약관동의 추가(2022.07.27)
							$advertisingReceptionTermPass.prop('checked', false);
							$advertisingReceptionTermPass.parent('.c-chk').removeClass('checked');
							$advertisingReceptionTermCard.prop('checked', false);
							$advertisingReceptionTermCard.parent('.c-chk').removeClass('checked');
						}
						$checkAgreeAll.prop('checked', false);
						$checkUpperAgreeItem.removeClass('checked');
						$checkUpperAgreeItem.children('input:checkbox').prop('checked', false);

						return false;
					}
					$checkAgreeAll.prop('checked', true);
				});
			}

			checkMainAgree();
		});

		//하위약관 전체동의 기본체크박스 - 유선고도화약관동의 추가(2022.06.16)
		$(document).on('click', '.check-all-native-wireline .agree-checkbox', function (e) {
			var $checkAgreeAll = $('.check-all-native-wireline .agree-checkbox:first');
			var $checkUpperAgreeItem = $('.check-all-native-wireline .c-chk');
			var $checkAgreeItem = $('.check-all-native-wireline .agree-checkbox').not('.check-all-native-wireline .agree-checkbox:first');
			var requiredTermsArray = Array.prototype.slice.call($checkAgreeItem);
			var $advertisingReceptionTermWire = $('#chk_agree921'); //유선고도화약관동의 추가(2022.06.16)
			var $this = $(this);
			var $thisChkAreaSub = $this.closest(".agree-item.sub-check-all");
			var $subChkAll = $thisChkAreaSub.find(".agree-title .c-chk :checkbox");
			var $thisChkAreaAll = $(".agree-item.check-all");
			var $ChkAll = $thisChkAreaAll.find(".agree-title .c-chk :checkbox");

			if($this.prop('checked') && $checkUpperAgreeItem.prop('checked')){
				$subChkAll.not(':checked').closest('.c-chk').addClass('checked');
				$subChkAll.not(':checked').prop('checked', true).trigger('change');
				$ChkAll.not(':checked').closest('.c-chk').addClass('checked');
				$ChkAll.not(':checked').prop('checked', true).trigger('change');
			}else {
				$subChkAll.filter(':checked').closest('.c-chk').removeClass('checked');
				$subChkAll.filter(':checked').prop('checked', false).trigger('change');
				$ChkAll.filter(':checked').closest('.c-chk').removeClass('checked');
				$ChkAll.filter(':checked').prop('checked', false).trigger('change');
			}
			//전체동의 체크박스 클릭 시
			if ($(this).get(0) === $checkAgreeAll.get(0)) {
				if ($(this).prop('checked')) {

					$checkAgreeItem.each(function () {
						$(this).prop('checked', true);
					});

					$checkUpperAgreeItem.addClass('checked');
					$checkUpperAgreeItem.children('input:checkbox').prop('checked', true);
				} else {
					$checkAgreeItem.each(function () {
						$(this).prop('checked', false);
					});

					$checkUpperAgreeItem.removeClass('checked');
					$checkUpperAgreeItem.children('input:checkbox').prop('checked', false);
					$advertisingReceptionTermWire.prop('checked', false);
					$advertisingReceptionTermWire.parent('.c-chk').removeClass('checked');
				}
				
			}
			//개별동의 항목 체크박스 클릭 시
			else {
				$checkAgreeItem.each(function () {
					if ($(this).prop('checked')) {
						$checkUpperAgreeItem.addClass('checked');
						$checkUpperAgreeItem.children('input:checkbox').prop('checked', true);
					} else {
						console.log(requiredTermsArray);
						$advertisingReceptionTermWire.prop('checked', false);
						$advertisingReceptionTermWire.parent('.c-chk').removeClass('checked');
						if (requiredTermsArray.every(function (element) {
							return !element['checked'];
						})) {
							
							$advertisingReceptionTermWire.prop('checked', false);
							$advertisingReceptionTermWire.parent('.c-chk').removeClass('checked');
						}
						$checkAgreeAll.prop('checked', false);
						$checkUpperAgreeItem.removeClass('checked');
						$checkUpperAgreeItem.children('input:checkbox').prop('checked', false);

						return false;
					}
					$checkAgreeAll.prop('checked', true);
				});
			}

			checkMainAgreeWireline();
		});

		//상위약관전체동의 > 개별약관(.agree-list > .agree-item) 순회 함수
		function checkMainAgree($eachLowerAgreeItem) {
			var $checkAgreeAll = $('.check-all .c-chk');
			var $eachAgreeItemCheckbox = $('.check-all').next('.agree-field').find('.agree-item .c-chk');
			var $checkLowerAgreeAll = $('#chk-all');
			var $checkLowerAgreeItem = $('.agree-checkbox').not('.agree-checkbox:first');
			var $agreeItemCheckbox = $('.check-all-native .c-chk');

			$eachAgreeItemCheckbox.each(function () {
				if (!$(this).hasClass('checked')) {
					$checkAgreeAll.removeClass('checked');
					$checkAgreeAll.children('input:checkbox').prop('checked', false);

					return false;
				}

				$checkAgreeAll.addClass('checked');
				$checkAgreeAll.children('input:checkbox').prop('checked', true);
			});

			if ($agreeItemCheckbox.hasClass('checked') && $agreeItemCheckbox.children('input:checkbox').prop('checked')) {
				
				if (!$checkLowerAgreeAll.prop('checked')) {
					$checkLowerAgreeAll.prop('checked', true);

					$checkLowerAgreeItem.filter(function () {
						return !$(this).prop('checked');
					}).each(function () {
						$(this).prop('checked', true);
					});
				}
			} else {
				$checkLowerAgreeAll.prop('checked', false);
				if (!($eachLowerAgreeItem === undefined)) {
					$checkLowerAgreeItem.each(function () {
						$(this).prop('checked', false);
					});
				}
			}
		}
		//상위약관전체동의 > 개별약관(.agree-list > .agree-item) 순회 - 함수 유선고도화약관동의 추가(2022.06.16)
		function checkMainAgreeWireline($eachLowerAgreeItem) {
			var $checkAgreeAll = $('.check-all .c-chk');
			var $eachAgreeItemCheckbox = $('.check-all').next('.agree-field').find('.agree-item .c-chk');
			var $checkLowerAgreeAll = $('#chk-all-wireline');
			var $checkLowerAgreeItem = $('.agree-checkbox').not('.agree-checkbox:first');
			var $agreeItemCheckbox = $('.check-all-native-wireline .c-chk');
			
			$eachAgreeItemCheckbox.each(function () {
				if (!$(this).hasClass('checked')) {
					$checkAgreeAll.removeClass('checked');
					$checkAgreeAll.children('input:checkbox').prop('checked', false);

					return false;
				}

				$checkAgreeAll.addClass('checked');
				$checkAgreeAll.children('input:checkbox').prop('checked', true);
			});

			if ($agreeItemCheckbox.hasClass('checked') && $agreeItemCheckbox.children('input:checkbox').prop('checked')) {
				
				if (!$checkLowerAgreeAll.prop('checked')) {
					$checkLowerAgreeAll.prop('checked', true);

					$checkLowerAgreeItem.filter(function () {
						return !$(this).prop('checked');
					}).each(function () {
						$(this).prop('checked', true);
					});
				}
			} else {
				$checkLowerAgreeAll.prop('checked', false);
				if (!($eachLowerAgreeItem === undefined)) {
					$checkLowerAgreeItem.each(function () {
						$(this).prop('checked', false);
					});
				}
			}
		}

		//약관 내 개별동의 체크박스
		$(document).on('click', '.c-term .sub-agree-checkbox', function (e) {
			var $thisCheckbox = $(this);
			var $thisAgreeItem = $thisCheckbox.closest('.agree-item');
			var $thisAgreeItemCheckbox = $thisAgreeItem.find('.c-chk');
			var $eachCheckboxes = $thisAgreeItem.find('.sub-agree-checkbox');
			var isAllChecked = false;

			if ($thisCheckbox.prop('checked')) {
				$eachCheckboxes.each(function () {
					if (!$(this).prop('checked')) {
						isAllChecked = false;
						return false;
					}

					isAllChecked = true;
				});
			}

			if (isAllChecked) {
				$thisAgreeItemCheckbox.addClass('checked');
				$thisAgreeItemCheckbox.children('input:checkbox').prop('checked', true);
			} else {
				$thisAgreeItemCheckbox.removeClass('checked');
				$thisAgreeItemCheckbox.children('input:checkbox').prop('checked', false);
			}

			checkMainAgree();
			checkMainAgreeWireline();
		});

		//$checkAllFold.on('click', function () {
		$(document).on('click', '.btn-trigger-all', function () {
			var $checkAllFold = $('.btn-trigger-all');
			var $checkSingleFold = $('.btn-trigger');
			var $agreeItem = $checkSingleFold.parents('.agree-item');
			var $checkAllBtn = $(this).parents('.agree-item.check-all');
			var $checkAllList = $checkAllBtn.next('.agree-list');

			$checkAllBtn.toggleClass('active');
			$checkAllFold.attr('aria-expanded',
				$checkAllFold.attr('aria-expanded') == 'false' ? 'true' : 'false'
			);
			$checkAllList.toggle();

			if ($checkAllList.children('.agree-item').length < 3) {
				$agreeItem.addClass('active');
				$checkSingleFold.attr('aria-expanded',
					$checkSingleFold.attr('aria-expanded') == 'false' ? 'true' : 'false'
				);
			}
		});

		function triggerGroup($btnTrigger, $parentEl) {
			//$($btnTrigger).on('click', function () {
			$(document).on('click', $btnTrigger, function () {
				if ($parentEl.length) {
					var $this = $(this);
					var $parentCur = $this.closest($parentEl);

					//console.log($parentCur);

					$parentCur.toggleClass('active');
					$this.attr('aria-expanded',
						$this.attr('aria-expanded') == 'false' ? 'true' : 'false'
					);
				}

				if ($btnTrigger == '.purchase-spot .btn-trigger') {
					$(window).trigger('scroll');
				}
			});
		}
		triggerGroup('.agree-area .btn-trigger', '.agree-item');
		triggerGroup('.purchase-spot .btn-trigger', '.purchase-spot');

		/* ===============================================================
		//쇼핑가이드 구매후기
		================================================================*/
		$('.review-wrap .btn-more').on('click', function () {
			$(this).parents('li').toggleClass('active')
		});

		$('.category a').on('click', function () {
			$('.cont').hide();
			$('#category').show();
		});

		$('.openup a').on('click', function () {
			$('.cont').hide();
			$('#openup').show();
		});

		$('.commission a').on('click', function () {
			$('.cont').hide();
			$('#commission').show();
		});


		//my 문의하기
		$('.inquiry-list-wrap .btn-more').on('click', function () {
			$(this).parent().parent().toggleClass('active')
		});

		/* ===============================================================
		//공통 플로팅
		================================================================*/
		$('.fixed-btn-area .btn-close').on('click', function () {
			$(this).parent().removeClass('open');
		});
		$('.fixed-btn-area .btn-tit').on('click', function () {
			$(this).parent().addClass('open');
		});

		/* ===============================================================
		//구매프로세스
		================================================================*/
		function rdoTab($parent, $input, $expand) {
			var $tabItemInput = $($parent).find($input);
			$($tabItemInput).each(function () {
				var $tabItem = $(this).closest('.c-rdo');
				var $tabPanel = $($tabItem).closest($parent).find($expand);

				if ($($tabItem).hasClass('checked')) {
					$tabPanel.hide().eq($tabItem.index()).show();
				}

				$($(this)).on('click', function () {
					$tabPanel.hide().eq($tabItem.index()).show();
				});
			});
		}

		rdoTab('.td-auth', '.fluid-types input', '.expand-panel'); //본인인증 방법
		rdoTab('.td-usim', '.fluid-types input', '.expand-panel'); //USIM
		rdoTab('.td-attached-minor', '.fluid-types input', '.expand-panel'); //미성년자 첨부서류

		//팝업닫기
		$('.popup .popup-body .popup-footer .btn-area button, .popup.popup-cousel-finish .popup-body button').click(function () {
			if ($(this).text() == '확인') {
				self.close();
			}
		});
	},
	activateSelection: function (selector, isPassValue) {
		$(selector).find('.select-item').off('hover').hover(
			function () {
				var index = $(selector).find('.select-item').index(this);
				$(this).siblings().find('.item').removeClass('hover');
				$(this).find('.item').addClass('hover');
				$(selector).data('active-index', index);
			}
		).click(function (e) {
			//셀렉트 선택했을때 처리부분
			setTimeout(function () { $(selector).removeClass('active'); }, 100);
			var index = $(this).index();
			$(selector).data('selected-index', index);
			//console.log($this.data('selected-index'));
			$(selector).find('.select-item').find('.item').removeClass('hover');
			$(selector).removeData('active-index');
			$(this).find('button.head').focus();

			// 선택 값 노출
			if (isPassValue) {
				$(selector).find('.head').html($(this).children('.item').html());
			}
			return false;
		});
	},
	componentInitSwipers: function (obj) {
		return obj.find('.swiper-config-pagination.swiper-container').parent().attr('visibility', 'hidden');
	},
	componentBindingEvent: function (obj, callback) {
		UI.componentBindingCallback.callback = callback;
		var result = [];
		obj.find('.swiper-config-pagination.swiper-container').each(function (index) {
			//console.log(index);
			//var numIdTmp = [];
			/* $('[id^=pagination]').each(function(){
				numIdTmp.push($('[id^=pagination]').attr('id').replace('pagination',''));
			}); */
			// var numId = numIdTmp.length > 0 ?  Math.max.apply(Math,numIdTmp) + 1 : 1;
			// var numId = numIdTmp.length > 0 ?  index + 1 : 1;
			var paginationId = '';
			var _this = this;
			var sildeLength = $(this).find('.swiper-slide').length;
			//console.log(sildeLength);
			var loop = true;

			//console.log(numId);

			if ($(this).find('.pagination').length > 0) {
				paginationId = 'pagination' + numId;
				$(this).find('.pagination').attr('id', paginationId);
				//console.log(paginationId);
			} else if ($(this).next('.pagination').length > 0) {
				paginationId = 'pagination' + numId;
				$(this).next('.pagination').attr('id', paginationId);
				//console.log(paginationId);
			} else if ($(this).next().find('.pagination').length > 0) {
				paginationId = 'pagination' + numId;
				$(this).next().find('.pagination').attr('id', paginationId);
			}
			numId++;
			if (sildeLength == 1) {
				loop = false;
				$(this).find('.pagination').hide();
				$(this).next('.pagination').hide();
				$(this).next('.swiper-btn-bottom').hide();
			}
			//swipers[0].startAutoplay();
			//swipers[0].stopAutoplay();

			result.push(
				new Swiper(this, {
					pagination: paginationId ? '#' + paginationId : '',
					loop: loop,
					paginationClickable: true,
					grabCursor: true,
					autoplay: 5000,
					autoplayDisableOnInteraction: false,
					slidesPerView: 1,
					//initialSlide : 1,
					onFirstInit: function (swiper) {
						//console.log(swiper);
						//console.log($(swiper.getSlide(1)).data('tos-loadurl'));
						UI.componentBindingCallback.swiperInit(swiper);
						//setTimeout(function(){swiper.swipeTo(2)},1);
						/*if(swiper.slides.length>0){
							sildeLength = swiper.slides.length - 2;
							console.log(sildeLength);
							if(sildeLength==1){
								console.log(swiper.paginationContainer);
								$(swiper.paginationContainer).hide();
							}
						}*/
					},
					onSlideClick: function (swiper) {
						//console.log('onSlideClick:' + swiper.clickedSlideIndex);
						//$(_this).find('[data-tos-clickurl]:not([data-tos-clickurl=""])').eq(swiper.clickedSlideIndex+1).trigger('onSlideClick');
						//console.log(swiper.clickedSlide);
						//console.log($(swiper.clickedSlide).find('[data-tos-clickurl]').data('tos-clickurl'));
						if (UI.componentBindingCallback.isClick) {
							var param = $(swiper.clickedSlide).find('[data-tos-click-params]').data('tos-click-params');
							UI.componentBindingCallback.excute(param);
							UI.componentBindingCallback.isClick = false;
						}
					},
					onTouchEnd: function () {
						//console.log('onTouchEnd');
					},
					onImagesReady: function (swiper) {
						//console.log(swiper.paginationContainer);
						if ($(_this).parent().css('visibility') == 'hidden') {
							swiper.swipeReset();
							$(_this).parent().hide();
							$(_this).parent().css('visibility', 'visible');
							$(_this).parent().fadeIn();
						}
					}
				})
			);
			$(this).find('[data-tos-click-params]:not([data-tos-click-params=""])').click(function () {
				//console.log('click');
				UI.componentBindingCallback.isClick = true;
			});

			if ($(this).has('.swiper-button-prev').length) {
				$(this).find('.swiper-button-prev').on('click', function () {
					result[index].swipePrev();
				});
				$(this).find('.swiper-button-next').on('click', function () {
					result[index].swipeNext();
				});
				if (sildeLength == 1 && !$(this).find('.swiper-button-prev, .swiper-button-next').is('.js-nothidden')) {
					$(this).find('.swiper-button-prev, .swiper-button-next').hide();
				}

			} else {
				$(this).nextAll('.swiper-button-prev').on('click', function () {
					result[index].swipePrev();
				});
				$(this).nextAll('.swiper-button-next').on('click', function () {
					result[index].swipeNext();
				});
				if (sildeLength == 1 && !$(this).nextAll('.swiper-button-prev, .swiper-button-next').is('.js-nothidden')) {
					$(this).nextAll('.swiper-button-prev, .swiper-button-next').hide();
				}
			}

			//autoplay
			result[index].stopAutoplay();
			if ($(this).nextAll('.swiper-btn-bottom').find('.swiper-btn-play').length > 0 && $(this).nextAll('.swiper-btn-bottom').find('.swiper-btn-stop').length > 0) {
				var sbbWidth = $(this).next('.swiper-btn-bottom').find('.pagination').width() + 38;
				$(this).nextAll('.swiper-btn-bottom').css({ width: sbbWidth, 'margin-left': -sbbWidth / 2, left: '50%' });
				result[index].startAutoplay();
				$(this).nextAll().find('.swiper-btn-play').click(function () {
					$(this).hide().siblings('.swiper-btn-stop').show();
					result[index].startAutoplay();
				});
				$(this).nextAll().find('.swiper-btn-stop').click(function () {
					$(this).hide().siblings('.swiper-btn-play').show();
					result[index].stopAutoplay();
				});
			}

		});

		//일반타입
		obj.find('.component-binding-event').each(function (index) {
			$(this).find('[data-tos-load-params]:not([data-tos-load-params=""])').each(function () {
				var loadParam = $(this).data('tos-load-params');
				UI.componentBindingCallback.excute(loadParam);
			});

			$(this).find('[data-tos-click-params]:not([data-tos-click-params=""])').click(function () {
				var clickParam = $(this).data('tos-click-params');
				UI.componentBindingCallback.excute(clickParam);
			});

		});

		// 20221017 메인 coverflow카드 스와이퍼 추가
		if( obj.hasClass('home-flowcard-wrap') || obj.find('.home-flowcard-wrap').length ) {
			initHomeflowcard();
		}


		return result;
	},
	componentNewProduct: function (obj) {
		//홈-다이렉트샵 최신휴대폰
		obj.find('.new-product:first').show();
		obj.find('.link-rank').on('click', function (e) {
			$(this).addClass('active').parent('li').siblings('li').find('a.active').removeClass('active');
			$(this).next('.new-product').show().parent('li').siblings('li').find('.new-product').hide();
			e.preventDefault();
		});
	},
	componentBindingCallback: {
		callback: '',
		isClick: false,
		isExcute: [],
		swiperInit: function (swiper) {
			var param = $(swiper.getSlide(1)).data('tos-load-params');
			param = param ? param : $(swiper.getSlide(1)).find('[data-tos-load-params]').data('tos-load-params');
			this.excute(param);
			swiper.addCallback('SlideChangeEnd', function (swiper) {
				var param = $(swiper.visibleSlides[0]).data('tos-load-params');
				param = param ? param : $(swiper.visibleSlides[0]).find('[data-tos-load-params]').data('tos-load-params');
				UI.componentBindingCallback.excute(param);
			});
		},
		excute: function (param) {
			if (param && $.inArray(param, this.isExcute) == -1) {
				//console.log('ajax slide 1');
				//console.log(param);
				if ($.isFunction(this.callback)) {
					this.callback(param);
				}
				this.isExcute.push(param);
				/*var scr = document.createElement( "SCRIPT" );
				scr.src = url;
				document.body.appendChild( scr );*/
				/*$.ajax({
					url: url,
					dataType: 'post'
				}).done(function(){
					//console.log('done');
				}).fail(function(){
					//console.log('fail');
				});*/
			}
		}
	},
	gnb: {
		isAutoMyT: false,
		isOnMyT: false,
		init: function () {
			this.depth1();
			this.depth2();
			this.depth2List();

		},
		depth1: function () {
			$('#header .header_con .h_gnb .gnb_wrap ul.gnb li a').hover(function () {
				$(this).closest('.gnb').addClass('f_action');
			}, function () {
				$(this).closest('.gnb').removeClass('f_action');
			});
			//더보기
			$('#header .gnb_wrap .g_more').hover(
				function () {
					$(this).addClass('over');
					$(this).find('a').next('.snb_wrap').show();
					$(this).parent('.gnb').addClass('f_action');
				},
				function () {
					$(this).removeClass('over');
					$(this).find('a').next('.snb_wrap').slideUp(100);
					$(this).parent('.gnb').removeClass('f_action');
				}
			);

			//검색
			$('#header .aside_wrap .g_srch a').click(function () {
				//메뉴닫고
				$('#header .h_lnb_allwrap').hide();
				$('.wrap #dimed').hide();

				$(this).toggleClass('close');
				$('#header .t_srch_wrap').toggle();
				$('#header .t_srch_wrap .sch_right .popular_word').hover(
					function () {
						$(this).addClass('on');
					},
					function () {
						$(this).removeClass('on');
					}
				);

			});

			//myt
			$('#header .aside_wrap .g_myt').on('mouseenter mouseleave focusin focusout', function (e) {
				if (e.type === 'mouseenter' || e.type === 'focusin') {
					UI.isOnMyT = true;
					e.preventDefault();
					$(this).find('.layer_con_aside').show();
					$(this).addClass('over');
				} else if ((e.type === 'mouseleave' || e.type === 'focusout')) {


				}
			}).hover(function () {

			}, function (e) {
				e.preventDefault();
				UI.isOnMyT = false;
				var _this = this;
				setTimeout(function () {
					if (UI.isOnMyT == false) {
						$(_this).find('.layer_con_aside').slideUp(100, function () { });
						$(_this).removeClass('over');
						UI.isOnMyT == false;
					}
				}, 50);
			});

			//myT 로그인 상태 메뉴 클릭
			$('#header .typeB .my_mbox_menus_wrapB1 .my_mbox_menus > ul > li > a').click(function (e) {
				/*var _this = this;
				//$(this).closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').css('margin-left','-200px');
				//$(this).closest('.my_mbox_menus_wrapB1').addClass('menus_open').css('width','100%');
				$(this).closest('.my_mbox_menus_wrapB1').addClass('menus_open').animate({'width':'100%'},200,function(){
					$(_this).closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').animate({'margin-left':'-200px'},200);
				});
				
				
				$(this).closest('.my_mbox_menus').addClass('f_action');
				$(this).closest('li').siblings().removeClass('on');
				$(this).closest('li').addClass('on');
				$(this).closest('ul').find('a').next('.smenu_dep2').hide();
				$(this).next('.smenu_dep2').show();
				
				$(this).next('.smenu_dep2').find('> div > ul').eq(0).find('a').css({'position': 'relative', 'marginLeft': '-100%', 'opacity': 0}).each(function (index, ele) {
					$(ele).animate({'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
				});
				$(this).next('.smenu_dep2').find('> div > ul').eq(1).find('a').css({'position': 'relative', 'marginLeft': '-100%', 'opacity': 0}).each(function (index, ele) {
					$(ele).animate({'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
				});*/


				e.preventDefault();
				var _that = {}
				_that.slideTime = 100;
				var _this = $(this),
					_parentMenu = _this.closest('.my_mbox_menus_wrapB1'),
					_3depthMenu = _this.siblings('.smenu_dep2');

				_that.mytIndex = $(this).parent().index();

				if (_parentMenu.hasClass('menus_open')) {
					if (!_this.parent().hasClass('on')) {
						_this.parent().siblings('li').removeClass('on').find('.smenu_dep2').hide();
						_this.parent().addClass('on').parent().parent().addClass('f_action');
						_3depthMenu.show().find('ul').css({ 'overflow': 'hidden' }).find('a').show();
						_3depthMenu.find('> div > ul').eq(0).find('a').css({ 'position': 'relative', 'marginLeft': '-100%', 'opacity': 0 }).each(function (index, ele) {
							$(ele).animate({ 'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
						});
						_3depthMenu.find('> div > ul').eq(1).find('a').css({ 'position': 'relative', 'marginLeft': '-100%', 'opacity': 0 }).each(function (index, ele) {
							$(ele).animate({ 'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
						});
					}
				} else {
					$('.my_mbox_other').hide();
					_this.parent().addClass('on').parent().parent().addClass('f_action');
					_parentMenu.addClass('menus_open').animate({ 'width': '100%' }, _that.slideTime);
					_parentMenu.siblings('.my_mbox_info').animate({
						'margin-left': '-200px'
					}, _that.slideTime, function () {
						_parentMenu.siblings('.my_mbox_info').css({ 'visibility': 'hidden' }).attr('aria-hidden', true);
						$('.btn_back').css({ 'display': 'block', 'left': '0px' }).animate({
							'left': '-39px'
						}, _that.slideTime, function () {
							_3depthMenu.show().find('ul').css({ 'overflow': 'hidden' }).find('a').show();
							_3depthMenu.find('> div > ul').eq(0).find('a').css({ 'position': 'relative', 'margin-left': '-100%', 'opacity': 0.5 }).each(function (index, ele) {
								$(ele).animate({ 'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
							});
							_3depthMenu.find('> div > ul').eq(1).find('a').css({ 'position': 'relative', 'margin-left': '-100%', 'opacity': 0.5 }).each(function (index, ele) {
								$(ele).animate({ 'marginLeft': '0%', 'opacity': 1 }, (index + 1) * 50);
							});
						});
					});
				}
			});

			//myT 로그인 상태 메뉴 back버튼
			$('#header .typeB .my_mbox_menus_wrapB1 .my_mbox_menus .btn_back').click(function (e) {
				/*var $this = $(this).closest('.my_mbox_menus').find('ul li a');
				$this.next('.smenu_dep2').hide();
				//$this.closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').css('margin-left','');
				$this.closest('.my_mbox_menus_wrapB1').prev('.my_mbox_info').animate({'margin-left': '0px'},200);
				$('.my_mbox_other').css({'margin-left': '-205px', 'display': 'block'}).animate({
					'margin-left': '0px'
				}, 200);
	
				$this.closest('.my_mbox_menus_wrapB1').removeClass('menus_open').css('width','');
				$this.closest('.my_mbox_menus').removeClass('f_action');
				$this.closest('li').removeClass('on');*/


				e.preventDefault();
				var _that = {}
				_that.slideTime = 100;
				var _this = $(this),
					_parentMenu = _this.closest('.my_mbox_menus_wrapB1'),
					_3depthMenu = _this.siblings('ul').find('li.on > .smenu_dep2');

				_3depthMenu.hide();
				_this.animate({
					'marginLeft': '0px'
				}, _that.slideTime, function () {
					_parentMenu.siblings('.my_mbox_info').animate({
						'marginLeft': '0px'
					}, _that.slideTime, function () {
						_parentMenu.siblings('.my_mbox_info').css({ 'visibility': '' }).attr('aria-hidden', false).css('margin-left', '');
					});
					_parentMenu.animate({ 'width': '407px' }, _that.slideTime, function () {
						_parentMenu.removeClass('menus_open').css('width', '');
						_this.siblings('ul').find('li.on').removeClass('on').parent().parent().removeClass('f_action');
						$('.my_mbox_other').css({ 'margin-left': '-205px', 'display': 'block' }).animate({
							'marginLeft': '0px'
						}, _that.slideTime);
					});

					//$(_that.loginId).find('.my_mbox_menus > ul > li > a').eq(_that.mytIndex).focus();
				});


			});

			//myT 전체 메뉴 보기
			//, #header .h_lnb_wrap .btn_allmenu
			$('#header .typeB .my_mbox_menus_wrapB1 .my_mbox_foot').click(function () {
				$('#header .aside_wrap .g_myt').find('.layer_con_aside').hide();
				$('#header .aside_wrap .g_myt').removeClass('over');
				$('#header .h_lnb_allwrap').show();
				$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').show();
				$('.wrap #dimed').show();
				$('#header .aside_wrap .g_srch a').removeClass('close');
				$('#header .t_srch_wrap').hide();
				UI.gnb.isAutoMyT = false; // 기능해제
			});

			//myT 전체 메뉴 3뎁스
			$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7 .wrap_innr .m_list .view_smenu').click(function () {
				$(this).next('.smenu').toggle();
				$(this).find('a').toggleClass('down');
				$(this).find('a').find('em').text($(this).find('a').find('em').text() == '하위메뉴 열기' ? '하위메뉴 닫기' : '하위메뉴 열기');

				//단독토글
				//$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7 .wrap_innr .m_list .view_smenu').not(this).find('a').removeClass('down').find('em').text('하위메뉴 열기');
				//$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7 .wrap_innr .m_list .view_smenu').not(this).next('.smenu').hide();
			});

			//myT 활성화 다른데 클릭
			$(document).click(function (e) {
				//console.log(e.target);
				if (!$('#header #gnb_login .typeB').has(e.target).length > 0 && !$('#header .h_lnb_allmenu .btn_m_close').has(e.target).length > 0 && !$('#dimed').has(e.target).length > 0) {
					$('#header .aside_wrap .g_myt').find('.layer_con_aside').hide();
					$('#header .aside_wrap .g_myt').removeClass('over');

				}
			});

		},
		depth2: function () {
			//메뉴 열기
			$('#header .h_lnb_wrap .btn_allmenu').on('click', function () {
				var left = $(this).scrollLeft();
				if ($('#header .h_lnb_allwrap').length > 0 && $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset()) {
					if ($(window).scrollTop() > 70) {
						$('#header .h_lnb_allwrap').css({ 'top': '47px', 'left': $('#header .header_con .h_lnb_wrap .h_lnb .lnb').offset().left - left, 'position': 'fixed' });
					} else {
						$('#header .h_lnb_allwrap').css({ 'top': '', 'left': '', 'position': '' });
					}
				}

				//토글
				/*if($('#header .h_lnb_allwrap').css('display')=='block' && $('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').css('display') == 'block'){
					$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').hide();
				}else{
					$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').hide();
					$('#header .h_lnb_allwrap').toggle();
					$('.wrap #dimed').toggle();
				}*/
				$('#header .h_lnb_allwrap .h_lnb_allmenu.menu7.u7').hide();
				$('#header .h_lnb_allwrap, #header .h_lnb_allmenu.menu2.u2').show();
				$('.wrap #dimed').show();


			});

			//메뉴 닫기
			$('#header .h_lnb_allmenu .btn_m_close').on('click', function (e) {
				e.preventDefault();
				e.stopPropagation();
				$('#header .h_lnb_allmenu:visible').slideUp(100, function () { $('#header .h_lnb_allwrap').hide(); });
				$('.wrap #dimed').hide();
				if (UI.gnb.isAutoMyT == true) {
					$('#header .aside_wrap .g_myt').find('.layer_con_aside').show();
					$('#header .aside_wrap .g_myt').addClass('over');
					UI.gnb.isAutoMyT = false;
				}

			});

			//딤드 클릭시 (사이트 전체 딤드 인터렉션으로 닫힘으로 정리)
			$('.wrap #dimed').click(function (e) {
				e.preventDefault();
				e.stopPropagation();
				$('#header .h_lnb_allmenu:visible').slideUp(100, function () { $('#header .h_lnb_allwrap').hide(); });
				$('.wrap #dimed').hide();

				//마이티 재활성화
				//$('#header .aside_wrap .g_myt').find('.layer_con_aside').show();
				//$('#header .aside_wrap .g_myt').addClass('over');
			});



		},
		depth2List: function () {
			var timer;
			//gnb2 hover
			$('#gnb2 .lnb_wrap .lnb .lnb_list li.nb').off('mouseenter mouseleave').hover(
				function () {
					var _this = this;
					timer = setTimeout(function () {
						$(_this).addClass('on');
						$(_this).find('.snb_wrap').show();
					}, 100);

				},
				function () {
					clearTimeout(timer);
					$(this).removeClass('on');
					$(this).find('.snb_wrap').stop().slideUp(100);
				}
			);
		}
	},
	loading: {
		sample: function () {
			$(document).on('click', '.filter-body input:checkbox', function () {
				UI.loading.start();
				UI.loading.end();
			});
		},
		start: function () {
			$('.js-transition').stop(true, true).fadeIn(150);
		},
		end: function () {
			$('.js-transition').stop(true, true).fadeOut(150);
		},

		show: function () {
			if ($('.loading').length) {
				if ($('.loading').is(':hidden')) {
					$('.loading').show();
					$(document.body).addClass('js-noscroll');
				}

				return;
			}

			var $body = $(document.body);
			var $fragment = $(document.createDocumentFragment());
			var loadingTemplate = '';

			loadingTemplate += '<div class="loading" style="display: block">';
			loadingTemplate += '<div class="loading-screen"></div>';
			loadingTemplate += '<div class="dimmed darken"><iframe frameborder="0" src="about:blank" title="버그픽스용" class="iframe-bugfix"></iframe></div>';
			loadingTemplate += '</div>';

			$fragment.append(loadingTemplate);
			$body.addClass('js-noscroll').append($fragment);
		},

		hide: function () {
			$(document.body).removeClass('js-noscroll');
			$('.loading').hide();
		}
	},
	//포커스시 상단fixed메뉴에 가려질때 스크롤
	focusScroll: function () {
		$("input, textarea").focus(function (e) {
			//console.log('focusScroll');
			if ($(this).offset().top - 47 < $(window).scrollTop()) {
				//window.scrollBy(0, -100);	
				$(window).scrollTop($(window).scrollTop() - 100);
			}
		});
	},
	goldNumberIntro: {
		init: function () {
			if ($('.goldnumber_intro_wrap').length) {
				this.$gn_btn_area = $(".gn_btn_area").find(".selected-number");
				this.gnRadio();
				this.gnPagination();
				this.gnList();
				this.gnGlobal();
				//this.gnWording();
			}
		},
		gnRadio: function () {
			var self = this;
			$('.gn_radio input[type=radio]').each(function () {
				var $wrap = $(this).closest(".gn_radio");
				$(this).off('change.gn_radio').on('change.gn_radio', function () {
					if ($(this).prop('checked')) {
						$wrap.closest('.gn_type').find(".gn_radio").removeClass('checked');
						$wrap.addClass('checked');
						self.$gn_btn_area.empty();

						if ($(this).closest('.gn_step1_2').length && $('.gn_list').hasClass('noselect')) {
							$('.gn_list').removeClass('noselect');
							$('.gn_list .inner').fadeIn();
						}
					}
				});
			});
		},
		gnList: function () {
			var self = this;
			$(".gn_list input[type='radio']").each(function () {
				$(this).off("change.gn_list").on("change.gn_list", function () {
					if ($(this).prop('checked')) {
						var $labelText = $(this).next().text().split('-').join(" - ");
						self.$gn_btn_area.html($('<strong>' + $labelText + '</strong>'));
					}
				});
			});
		},
		gnPagination: function () {
			$('.gn_pagination > li').each(function () {
				$(this).off('click.gn_pagination').on('click.gn_pagination', function (e) {
					e.preventDefault();
					if ($(this).hasClass('first') || $(this).hasClass('prev') || $(this).hasClass('next') || $(this).hasClass('last')) return;
					$(this).addClass('active').siblings().removeClass('active');
				});
			});
		},
		gnGlobal: function () {
			$(".gn-way__more").off("click.gn-way").on("click.gn-way", function () {
				$(this).toggleClass("active");
			});
		},
		gnWording: function () {
			$('.goldnumber_schedule .hidden_cont').children('ul:eq(1)').children('li:first').after('<li><strong>외국인 고객은 오프라인 대리점/지점에서 신청 가능합니다.</strong></li>');
			$('.goldnumber_schedule .hidden_cont').children('ul:eq(1)').children('li:eq(1)').after('<li><strong>번호 변경은 오프라인 대리점/지점을 통해서만 취득이 가능합니다.</strong></li>');
			$('.goldnumber_schedule .hidden_cont').children('ul:eq(1)').children('li:eq(2)').after('<li><strong>만 4세 미만 고객은 신청하실 수 없습니다.</strong></li>');
			$('.goldnumber_schedule .hidden_cont').children('ul:eq(1)').children('li:eq(5)').text('T world 다이렉트를 통해 응모하신 경우 T world 다이렉트를 통해서만 당첨 여부 확인 가능하며, T world 공식인증 대리점 및 지점을 통해 응모하신 경우 T world 공식인증 대리점 및 지점을 통해서만 당첨 여부 확인 가능합니다.');
		}
	}
}
UI.init();
/* ===============================================================
 //2023 TWD GNB 개편 
================================================================*/
// header 2023
$(document).ready(function () {
	//id 값 추가
	$('div.wrap').attr('id', 'wrap'); //페이지에 id 값 추가
	$('div.popup').wrap('<div id="wrap"></div>'); // 새창 팝업에 id 값 추가
	
	function haederFunction_2023() {
		;'use strict';
		var lastScroll = 0;
		// tWD 소스 반영 2023-06-09
		// util: add multiple attribute;
		Element.prototype.setAttr = function(arr) {
			var elem = this;
			try {
				for(key in arr){
					var attr = key;
					var val = arr[key];
					elem.setAttribute(attr, val);
				}
			} catch(err) {
				console.log(err)
			}
		}
	
		// util: add multiple event listener
		function addMultipleEventListener(element, events, handler) {
			events.forEach(function(e) {
				element.addEventListener(e, handler);
			})
		}
	
		// util: add multiple style
		Element.prototype.styles = function(css) {
			var elem = this;
	
			try {
				for(key in css){
					var attr = key;
					var val = css[key];
	
					elem.style[attr] = val;
				}
			} catch(err) {
				console.log(err)
			}
		}
	
		/** 개발팀 추가.  2023.04.05 start */
		// (function ($) {
	
		//   $.GNB = {};
		//   //gnb 생성 함수
		//   $.GNB.init = function (_channel, _ucode, _title, _svcChgType) {
	
		//       var _gnb = function () {
		//           let params = {
		//               channel : _channel,
		//               ucode : _ucode,
		//               title : _title,
		//               svcChgType : _svcChgType,
		//           }
	
		//           let headers = {'content-type': 'application/json; charset=UTF-8', 'scrnTmpltId': 'TPL_01_0024'}
	
		//           $.ajaxSetup({ cache: true });
		//           $.ajax({
		//             type: "post",
		//               dataType: "text",
		//               url: "/web/template/common",
		//               data : JSON.stringify(params),
		//               headers: headers,
		//               beforeSend: function (xhr) {
		//                   xhr.overrideMimeType('text/html; charset=UTF-8');
		//               },
		//               success: function (result) {
		//                   $("#header").html(result);
		//               },
		//               complete: function (result) {
		//                   commonToggle.init();
		//                   getHeaderHeight();
		//               }
		//           });
		//           $.ajaxSetup({ cache: false });
		//       };
	
		//       var _footer = function () {
		//         let params = {
		//                   channel : _channel,
		//                   ucode : _ucode,
		//                   title : _title,
		//                   svcChgType : _svcChgType,
		//           }
		//         let headers = {'content-type': 'application/json; charset=UTF-8', 'scrnTmpltId': 'TPL_01_0025'}
	
		//           $.ajaxSetup({ cache: true });
		//           $.ajax({
		//             type: "post",
		//               dataType: "text",
		//               url: "/web/template/common",
		//               data : JSON.stringify(params),
		//               headers: headers,
		//               beforeSend: function (xhr) {
		//                   xhr.overrideMimeType('text/html; charset=UTF-8');
		//               },
		//               success: function (result) {
		//                   $('div#footer').html(result);
		//               },
		//               complete: function (result) {
		//               }
		//           });
		//           $.ajaxSetup({ cache: false });
		//       }
	
		//       _gnb();		//gnb생성
		//       _footer(); 	//footer 삽입
		//   };
	
		// }(gnbJquery));
		/** 개발팀 추가.  2023.04.05 End */
	
		// common toggle(hover)
		var commonToggle = (function () {
			var elements = {
				wrap: '[data-element="commonToggle"]',
				button: '[data-element="commonToggle__button"]',
				layer: '[data-element="commonToggle__layer"]',
			};
			var options = {}
	
			function toggleSet(elem, i) {
				var wrap = elem;
				var button = wrap.querySelector(elements.button);
				var layer = wrap.querySelector(elements.layer);
				var anchors = layer.querySelectorAll('a, button');
				var _len = anchors.length;
				var status = false;
				var saveKey = false;
	
				button.setAttr({
					'aria-expanded': false,
					'aria-controls': `commonToggle_layer_${i}`,
					'id': `commonToggle_button_${i}`
				});
				layer.setAttr({
					'id': `commonToggle_layer_${i}`,
					'aria-labelledby': `commonToggle_button_${i}`
				});
	
				function toggleElement(stat, clickElem = null) {
					if (!(clickElem && (stat === false || stat === 'false'))) {
						if (stat === 'true' || stat) {
							button.setAttribute('aria-expanded', true);
							wrap.classList.add('is-focus');
							layer.setAttribute('aria-hidden', false);
						} else {
							button.setAttribute('aria-expanded', false);
							wrap.classList.remove('is-focus');
							layer.setAttribute('aria-hidden', true);
						}
					}
				}
	
				function toggleEvents() {
					addMultipleEventListener(button, ['focus', 'mouseenter', 'click'], function(e) {
						var clickElem = e.target;
						status = true;
						toggleElement(status, clickElem);
					});
	
					anchors.forEach((el, i) => {
						if (i === _len - 1) {
							el.addEventListener('blur', (e, i) => {
								status = false;
								toggleElement(status);
							});
						};
						el.addEventListener('click', (e, i) => {
							var clickElem = e.target;
							status = false;
							toggleElement(status, clickElem);
						});
						el.addEventListener('keydown', function(e) {
							if (e.shiftKey) {
								saveKey = true;
							}
						});
					});
	
					document.addEventListener('click', (e, i) => {
						var clickElem = e.target;
						status = false;
						toggleElement(status, clickElem);
					});
	
					wrap.addEventListener('keydown', function(e) {
						if (
							(e.shiftKey && e.key === 'Tab') &&
							(e.target.getAttribute('aria-expanded') === 'true' || e.target.getAttribute('aria-expanded') === true)
						) {
							status = false;
							saveKey = false;
							toggleElement(status);
						}
					});
	
					wrap.addEventListener('mouseleave', function() {
						status = false;
						toggleElement(status);
					});
				}
	
				toggleEvents();
			}
	
			function clickSet(el, i) {
				var wrap = el
				var button = wrap.querySelector(elements.button);
				var layer = wrap.querySelector(elements.layer);
				var status = false;
				// console.log(element)
	
				button.setAttr({
					'aria-expanded': false,
					'aria-controls': `commonToggle_layer_click_${i}`,
					'id': `commonToggle_button_click_${i}`
				});
				layer.setAttr({
					'id': `commonToggle_layer_click_${i}`,
					'aria-labelledby': `commonToggle_button_click_${i}`
				});
	
				// element.
				button.onclick = () => {
					// console.log('asdasd')
					// console.log(status)
					if (status) {
						status = false;
						button.setAttribute('aria-expanded', false);
						wrap.classList.remove('is-focus');
						layer.setAttribute('aria-hidden', true);
					} else {
						status = true;
						button.setAttribute('aria-expanded', true);
						wrap.classList.add('is-focus');
						layer.setAttribute('aria-hidden', false);
					}
					if (status) {
						layer.querySelectorAll('a').forEach(function(anchor) {
							anchor.addEventListener('click', function() {
								wrap.classList.remove('is-focus')
								status = false;
							})
						})
					}
				}
				document.addEventListener('click', (e, i) => {
					var clickElem = e.target;
	
					if (!!!clickElem.closest(elements.wrap)) {
						status = false
						button.setAttribute('aria-expanded', false);
						wrap.classList.remove('is-focus');
						layer.setAttribute('aria-hidden', true);
					}
				});
			}
	
			return {
				init() {
					document.querySelectorAll(elements.wrap).forEach(function(el, i) {
						var opt = el.getAttribute('data-option')
						var opts = {...options, ...JSON.parse(opt)};
	
						if (opts.type === 'click') {
							clickSet(el, i)
						} else {
							toggleSet(el, i)
						}
					})
				}
			}
		})();
	
		// header search 
		var headerSearch = (function() {
			var elements = {
				element: '[data-element="headerSearch"]',
				button: '[data-element="headerSearch__button"]',
				layer: '[data-element="headerSearch__layer"]',
				close: '[data-element="headerSearch__close"]',
			};
			var activeClass = 'active-search';
			var elem = {};
	
			function openSearch() {
				elem.button.setAttribute('aria-expanded', true);
				elem.status = true;
				elem.body.classList.add(activeClass);
				elem.layer.style.display = 'block';
				var button = elem.layer.querySelector('.search-button .button');
				var input = elem.layer.querySelector('.search-input');
				// setTimeout(function() {
				//   elem.layer.style.height = elem.layer.getAttribute('data-height');
				// }, 0);
				elem.layer.styles({
					'overflow': 'visible',
					// 'minHeight': elem.layer.getAttribute('data-height'),
					// 'height': 'auto'
				})
				// setTimeout(function() {
				// }, 300);
				button.classList.add('hidden');
	
				button.addEventListener('click', function() {
					input.value = '';
					input.focus();
					button.classList.add('hidden');
				})
	
				input.addEventListener('keyup', function(e) {
					if (e.target.value.length > 0) {
						button.classList.remove('hidden');
					} else {
						button.classList.add('hidden');
					}
				})
			}
	
			function closeSearch() {
				elem.body.classList.remove(activeClass);
				elem.status = false;
	
				elem.layer.styles({
					'display': 'none',
				});
	
				setTimeout(function() {
					elem.layer.style.display = 'none';
					if (elem.button.getAttribute('aria-expanded') === true || elem.button.getAttribute('aria-expanded') === 'true') {
						elem.button.setAttribute('aria-expanded', false);
						elem.button.focus();
					}
				});
			}
	
			function setEvent() {
				elem.button.addEventListener('click', function(e) {
					var button = e.target;
					var status = button.getAttribute('aria-expanded');
	
					status === true || status === 'true' ? closeSearch() : openSearch();
				});
	
				elem.close.addEventListener('click', function(e) {
					closeSearch();
				});
	
				elem.body.addEventListener('click',function(e) {
					var area = !!e.target.closest('.main-header__inner');
					if (elem.status === true || elem.status === "true") {
						area || closeSearch();
					}
				});
	
				elem.wrap.addEventListener('keydown', function(e) {
					if (elem.status === true || elem.status === 'true') {
						if (e.shiftKey && e.key === 'Tab' && e.target === elem.button) {
							e.preventDefault();
							elem.close.focus();
						} else if (e.key === 'Tab' && !e.shiftKey && e.target === elem.close) {
							e.preventDefault();
							elem.button.focus();
						}
					}
				});
			}
	
			function searchSet() {
				elem = {
					body: document.querySelector('body'),
					wrap: document.querySelector(elements.element),
					button: this.wrap.querySelector(elements.button),
					layer: this.wrap.querySelector(elements.layer),
					close: this.wrap.querySelector(elements.close),
					status: 'false',
				}
	
				if (!!document.querySelector(elements.element)) {
					elem.button.setAttr({
						'aria-expanded': false,
						'aria-controls': 'headerSearch_layer',
						'id': 'headerSearch_button'
					});
					elem.layer.setAttr({
						// 'data-height': elem.layer.offsetHeight + 'px',
						'id': 'headerSearch_layer',
						'aria-labelledby': 'headerSearch_button'
					});
	
					elem.layer.styles({
						// 'height': '0',
						'display': 'none',
						'opacity': '1'
					});
	
					setEvent();
				}
			}
	
			return {
				init() {
					!!document.querySelector(elements.element) && (searchSet());
				},
				close() {
					closeSearch();
				},
				getStatus() {
					return elem.status;
				}
			}
		})();
	
		function isHidden(el) {
			return !!el ? (el.offsetHeight >= 50) : false;
		}
		
		
		// header height
		function getHeaderHeight() {
			if (document.querySelector('#header')) {
				var header = document.querySelector('#header');
				var headerElem = header.querySelector('.main-header__inner') ? header.querySelector('.main-header__inner') : header;
	
				header.style.height = headerElem.clientHeight + 'px';
			}
		}
	
		function easeOutQuart(x) {
			return 1 - Math.pow(1 - x, 4);
		}
	
		(function goTop() {
			const duration = 500;
			const topBtn = document.querySelector('.footer__go-top');
			const wrap = document.querySelector('body');
	
			const scrollToTarget = function (target) {
				const top = target.getBoundingClientRect().top;
				const startPos = window.pageYOffset;
				const diff = top;
	
				let startTime = null;
				let requestId;
	
				const loop = function (currentTime) {
					if (!startTime) {
						startTime = currentTime;
					}
	
					const time = currentTime - startTime;
	
					const percent = Math.min(time / duration, 1);
					window.scrollTo(0, startPos + diff * easeOutQuart(percent));
	
					if (time < duration) {
						// Continue moving
						requestId = window.requestAnimationFrame(loop);
					} else {
						window.cancelAnimationFrame(requestId);
					}
				};
				requestId = window.requestAnimationFrame(loop);
			};
	
			!!topBtn && topBtn.addEventListener('click',(e) => {
				e.preventDefault();
				topBtn.blur();
				scrollToTarget(wrap)
			})
		})();
	
		function setUcode() {
			const uCode = document.querySelectorAll('[ucode]');
	
			!!uCode && uCode.forEach((el) => {
				const url = el.getAttribute('ucode')
	
				el.setAttribute('href', `javascript:poclink('${url}')`);
			})
		}
	
		// scroll event
		window.onscroll = function(){
			var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
			var subDepth = document.querySelector('.main-header__lnb');
	
			isHidden(subDepth) && document.querySelector('body').classList.add('sub-depth');
			if (!!document.querySelector('#content') && document.querySelector('#content').matches('.my-content')) {
				document.querySelector('#header').style.background = '#f5f5f7';
			}
	
			if (currentScroll > lastScroll) {
				if (isHidden(subDepth) && headerSearch.getStatus()) {
					headerSearch.close();
				} else {
					document.querySelector('body').classList.add('scroll-down');
					document.querySelector('body').classList.remove('scroll-up');
				}
			} else if (currentScroll === lastScroll) {
				document.querySelector('body').classList.add('scroll-down');
				document.querySelector('body').classList.remove('scroll-up');
			} else {
				document.querySelector('body').classList.remove('scroll-down');
				document.querySelector('body').classList.add('scroll-up');
			}
			lastScroll = currentScroll <= 0 ? 0 : currentScroll;
			setTimeout(() => {
				if (window.pageYOffset === 0 || document.documentElement.scrollTop === 0) {
					document.querySelector('body').classList.remove('scroll-down');
					document.querySelector('body').classList.add('scroll-up');
				}
			}, 100);
		};
	
		var renewGnb = (function(){
			return {
				init() {
					getHeaderHeight();
					commonToggle.init();
					headerSearch.init();
				}
			}
		})();
	
		getHeaderHeight();
		commonToggle.init();
		headerSearch.init();

	} haederFunction_2023();
});

/* ===============================================================
 //Modal
================================================================*/
/*$('.modal .js-modal-close, .modal .btn-close').on('click', function() {
	$('.modal').hide();
	$('body').removeClass('js-noscroll');
});

function modalGroup($modalBtn, $modalOpenGroup) {
	$($modalBtn).on('click', function() {
		$($modalOpenGroup).show();
		$('body').addClass('js-noscroll');
	});
}*/
//modalGroup('.js-modal-disclosure-notice', '.modal-disclosure-notice');
//modalGroup('.disclosure-notice-wrap .btn-area .btn-secondary', '.modal-disclosure-notice'); //단말지원금 변동알림
//modalGroup('.js-modal-delivery', '.modal-delivery'); 						   //상세 주문하기전확인(수령)
//modalGroup('.js-modal-delivery2', '.modal-delivery2'); 						   //상세 주문하기전확인(입고알림)
//modalGroup('.js-modal-login-guide', '.modal-login-guide'); 					   //상세 로그인가이드
//modalGroup('.js-modal-device-failure', '.modal-device-failure');    		   //단말확인 실패
//modalGroup('.js-modal-device-serial', '.modal-device-serial');      		   //일련번호 입력
//modalGroup('.js-modal-personal-failure', '.modal-personal-failure');		   //본인인증 실패
//modalGroup('.js-modal-agreement', '.modal-agreement'); 						   //약관 동의
//modalGroup('.js-modal-credit-personal', '.modal-credit-personal');  		   //신용카드 본인인증 안내
//modalGroup('.js-modal-check-required', '.modal-check-required');    		   //필수항목 입력
//modalGroup('.js-modal-unused-info', '.modal-unused-info'); 					   //공기계 정보
//modalGroup('.js-modal-my-nonmembers', '.modal-my-nonmembers'); 				   //비회원 주문조회
//modalGroup('.js-modal-my-return', '.modal-my-return'); 						   //계좌 확인
//modalGroup('.js-modal-my-inform', '.modal-my-inform'); 						   //반품안내
//modalGroup('.js-modal-my-refund', '.modal-my-refund'); 						   //환불안내
//modalGroup('.product-internet-section .link-block', '.modal-internet-detail'); //internet,iptv detail

//modalGroup('.js-modal-repayment-fee', '.modal-repayment-fee');
//modalGroup('.sticky-detail .btn-text', '.modal-repayment-fee');  			   //분할상환 수수료 조회하기
//modalGroup('.js-modal-process-detail1', '#_modalOrderDetail1');  			   //주문상세: 기기변경
//modalGroup('.js-modal-process-detail2', '#_modalOrderDetail2');  			   //주문상세: 번호이동
//modalGroup('.js-modal-process-detail3', '#_modalOrderDetail3');  			   //주문상세: 신규가입
//modalGroup('.js-modal-phone-return', '.modal-phone-return');  			       //구매프로세스 > 쓰던 폰 반납
//modalGroup('.js-modal-process-detail-used1', '#_modalOrderDetailUsed1');  	   //공기계/중고폰: 주문상세: 기기변경
//modalGroup('.js-modal-process-detail-used2', '#_modalOrderDetailUsed2');  	   //공기계/중고폰: 주문상세: 번호이동
//modalGroup('.js-modal-process-detail-used3', '#_modalOrderDetailUsed3');  	   //공기계/중고폰: 주문상세: 신규가입
//modalGroup('.js-modal-check-address', '.modal-check-address');  	   //공기계/중고폰: IMEI,Wi-Fi MAC address 확인방법
//modalGroup('.js-modal-pay', '.modal-pay'); 						 			   //결제하기
//modalGroup('.js-modal-penalty-noti', '.modal-penalty-noti');	 			   //해지위약금 안내
//modalGroup('.js-modal-usim', '.modal-usim'); 					 			   //USIM카드 일련번호란?
//modalGroup('.js-modal-pay-acc', '.modal-pay-acc'); 				 			   //acc: 결제하기
//modalGroup('.js-modal-request-noti', '.modal-request-noti');        		   //acc: 입고 알림 신청하기
//modalGroup('.js-modal-request-noti-complete', '.modal-request-noti-complete'); //acc: 입고 알림 신청 완료
//modalGroup('.js-modal-process-detail-acc', '#_modalOrderDetailAcc');  		   //acc: 주문상세
//modalGroup('.js-modal-share', '.modal-share');  		   //기획전상세: 공유하기
//modalGroup('.js-modal-address', '.modal-address');  		   //주소찾기

/* ===============================================================
Library - Swiper
================================================================*/
/*var swiperHomeiot = new Swiper('.slider-homeiot .swiper-container', {
	pagination: '.pagination',
	loop: true,
	grabCursor: true,
	paginationClickable: true,
	//autoplay: 5000,
	//autoplayDisableOnInteraction: false,
	onFirstInit : function(swiper){
		if($('.slider-homeiot .swiper-container').parent().css('visibility') == 'hidden'){
			$('.slider-homeiot .swiper-container').parent().hide();
			$('.slider-homeiot .swiper-container').parent().css('visibility','visible');
			$('.slider-homeiot .swiper-container').parent().fadeIn();
			UI.componentBindingCallback.callback = function(param){console.log(param)}
			UI.componentBindingCallback.swiperInit(swiper);
		}
	},
	onSlideClick : function(swiper){
		if(UI.componentBindingCallback.isClick){
			var param = $(swiper.clickedSlide).find('[data-tos-click-params]').data('tos-click-params');
			UI.componentBindingCallback.excute(param);
			UI.componentBindingCallback.isClick = false;
		}
	}
});

$('.slider-homeiot .swiper-container').find('[data-tos-click-params]:not([data-tos-click-params=""])').click(function(){
	UI.componentBindingCallback.isClick = true;
});
swiperBtn('.slider-homeiot', swiperHomeiot);*/
var swiperHomeiot = UI.componentBindingEvent($('.iot-list-content'), function (param) {/*console.log(param);*/ });

/*var swiperAcc = new Swiper('.slider-acc .swiper-container', {
	pagination: '.pagination',
	loop: true,
	grabCursor: true,
	paginationClickable: true
});
swiperBtn('.slider-acc', swiperAcc);
*/
function swiperBtn($parent, $swiperName) {
	$($parent).find('.swiper-button-prev').on('click', function () {
		$swiperName.swipePrev();
	});

	$($parent).find('.swiper-button-next').on('click', function () {
		$swiperName.swipeNext();
	});
}





//스와이프 테스트
//var html = '<div class="swiper-slide"><div class="ct"><a href="#none" class="btn-delete">삭제</a><span class="thumb"><img src="../img/@tmp_disclosure_01.jpg" alt="갤럭시 노트 9"></span><span class="device-area"><span class="device"><em class="name">Galaxy 9</em></span></span></div></div>';
//슬라이드 제거
//swiperNoti.removeSlide(1);
//슬라이드 추가
//swiperNoti.appendSlide(slides);
var swiperNoti = swiperNoti = new Swiper('.notice-panel .swiper-container', {
	slidesPerView: 6,
	loop: false
});

swiperBtn('.disclosure-notice-wrap', swiperNoti);

$('.disclosure-notice-wrap .notice-arrow').on('click', function () {
	$(this).parent().parent().toggleClass("active");
	/*if(!swiperNoti){
		swiperNoti = new Swiper('.notice-panel .swiper-container', {
			slidesPerView: 6,
			loop: false
		});
	}
	swiperBtn('.disclosure-notice-wrap', swiperNoti);*/
});

/*var swiperMainVisual = new Swiper('.home-visual-wrap .swiper-container', {
	pagination: '.pagination',
	loop: false,
	paginationClickable: true
});
swiperBtn('.home-visual-wrap', swiperMainVisual);*/

/*var swiperOfferingVisual = new Swiper('.home-offering-wrap .swiper-container', {
	pagination: '.pagination',
	loop: false,
	paginationClickable: true
});
swiperBtn('.home-offering-wrap', swiperOfferingVisual);*/

/*var swiperBrand = new Swiper('.home-brand-wrap .swiper-container', {
	pagination: '.pagination',
	loop: false,
	paginationClickable: true
});
swiperBtn('.home-brand-wrap', swiperBrand);*/








/* ===============================================================
Layout
================================================================*/
/*$('.header .gnb-btn-hamburger').on('click', function() {
	$('.gnb-drawer').toggle();
});

$('.header .gnb-drawer .btn-close').on('click', function() {
	$('.gnb-drawer').toggle();
});

$('.header .lnb .main-item.has-sub > .link-block').hover(
	function() {
		$(this).closest('.main-item.has-sub').addClass('active');
	}, function() {
		$(this).closest('.main-item.has-sub').removeClass('active');
	}
);*/


/* ===============================================================
//공시지원금
================================================================*/
$('.notice-panel .btn-delete').on('click', function () {
	//$(this).parent().parent().hide();
	var index = $('.notice-panel .btn-delete').index($(this));
	swiperNoti.removeSlide(index);
});

/* ===============================================================
//상품상세
================================================================*/
$('.product-option-item #_payType12,.product-option-item #_payType24,.product-option-item #_payType30').on('click', function () {
	$('#_layerPayType').show();
	$('#_layerPayTypeSingle').hide();
});

$('.product-option-item #_payTypeSingle').on('click', function () {
	$('#_layerPayType').hide();
	$('#_layerPayTypeSingle').show();
});

$('.product-option-item #_optDiscount1 + .label').on('click', function () {
	$('.product-option-item .discount-cont').hide();
	$('.product-option-item #_optDiscount1Cont').show();
});
$('.product-option-item #_optDiscount2 + .label').on('click', function () {
	$('.product-option-item .discount-cont').hide();
	$('.product-option-item #_optDiscount2Cont').show();
});
$('.product-option-item #_optDiscount3 + .label').on('click', function () {
	$('.product-option-item .discount-cont').hide();
	$('.product-option-item #_optDiscount3Cont').show();
});
$('.product-option-item #_optDiscount4 + .label').on('click', function () {
	$('.product-option-item .discount-cont').hide();
	$('.product-option-item #_optDiscount4Cont').show();
});

$('.product-detail-wrap .btn-more-product').on('click', function () {
	$('.product-detail-wrap .product-detail').removeClass('fewer');
	$(this).closest('.btn-more-area').hide();
});

$('.sticky-bar-detail .counsel-group .btn-light').on('click', function () {
	$('.sticky-bar-detail .counsel-layer').toggle();
});

/* ===============================================================
//tooltip
================================================================*/
/*$('.js-modal-tooltip').on('click', function() {
	$(this).siblings('.tooltip-ly').toggle();
});
$('.tooltip-ly .tooltip-close').on('click', function() {
	$(this).parent('.tooltip-ly').hide();
});*/


/* ===============================================================
//my 구매후기
================================================================*/
$('.my-review-list-wrap .btn-more').on('click', function () {
	$(this).parent().parent().toggleClass('active')
});

//my 구매후기 작성
$('.modal-sub-tit .star').on('click', function () {
	var star = $(this).find('em').html();
	$('.modal-sub-tit .rating-point').removeClass().addClass('rating-point')
	$('.modal-sub-tit .rating-point').addClass('point' + star).find('em').html(star)
});



/* ===============================================================
//자급제/중고/해외직구폰 개통 조회
================================================================*/
//##NOTUSE .unused-cont 없음
$(".unused-cont .btn-default").on("click", function () {
	$(this).parent().find(".list-layer").toggleClass("active");
});

/*var tabWrapper = $('.tab-sub-wrap'),
	tabMnu = tabWrapper.find('.tab-sub li'),
	tabContent = tabWrapper.find('.tab-area > .tab-con');

tabContent.not(':first-child').hide();

tabMnu.each(function(i){
	$(this).attr('data-tab','tab'+i);
});
tabContent.each(function(i){
	$(this).attr('data-tab','tab'+i);
});

tabMnu.click(function(){
	var tabData = $(this).data('tab');
	tabWrapper.find(tabContent).hide();
	tabWrapper.find(tabContent).filter('[data-tab='+tabData+']').show();
});*/

/*$('.tab-sub > li').click(function(){
	var before = $('.tab-sub li.on');
	before.removeClass('on');
	$(this).addClass('on');

	$(before).click(function(){
		var txt = $(this).find("a").text(),
			tgArea = $(this).parent().next();
		tgArea.text(txt);
	});
});*/

function tabGroup($tabList, $tabItem, $active) {
	$($tabList).find($tabItem).on('click', function () {
		var index = $($tabItem).index(this);
		if ($(this).is('[type=button]') && index != 2) {
			if ($(this).siblings().hasClass($active)) {
				$(this).addClass($active).siblings().removeClass($active);
			}

			$(this).attr('aria-selected', true).siblings().attr('aria-selected', false);

			var $tabPanel = $(this).attr('aria-controls');
			var $tabPanelOn = $("#" + $tabPanel);
			$(this).parents($tabList).parents('.h-area').nextAll('[role=tabpanel]').attr('aria-hidden', true);
			$tabPanelOn.attr('aria-hidden', false);
		} else {
			UI.modal({ modal: '#modalAlert', title: '알림', content: '휴대폰 구매를 원하시는 법인 고객님께서는 전화상담 주문을 이용하세요. (국번없이 1599-0111)', buttonType: 'alert' });
			return false;
		}
	});
}
tabGroup('.h-area .fluid-types', '[class^=c-]', 'checked');

//주문서작성 > 다회선 통합청구 여부 토글
function btnFold($btn, $parent, $unfoldItem) {
	$($btn).on('click', function () {
		var $item = $(this).closest($parent).find($unfoldItem);

		if (!$(this).closest('.c-chk').hasClass('checked')) {
			$item.show();
		} else {
			$item.hide();
		}
	});
}
btnFold('.section-bill .c-chk input:checkbox', 'td', '.expand-panel');

/* 구매프로세스 스크롤 업 & 다운시 sticky
var sidebar = document.getElementById('_purchaseAside');

var stickySidebar = new StickySidebar(sidebar, {
	topSpacing: 20,
	bottomSpacing: 0,
	containerSelector: '.purchase-wrap .l-grid',
	innerWrapperSelector: '.purchase-spot .aside-wrap',
	resizeSensor: false,
	stickyClass: 'sticky-on'
});
*/
function foldTitGroup($btn, $parentEl, $foldTit, $foldCon) {
	if ($($parentEl).hasClass('not-accordion')) {
		$($parentEl).find($foldTit).addClass('active').next($foldCon).show();
	}
	$($btn).on('click', function () {
		var $parentCur = $(this).parents($parentEl);
		var $toggledItem = $(this).closest($foldTit);

		if ($parentCur.length) {
			if ($($parentEl).hasClass('popup-imei') || $($parentEl).hasClass('toggle-accordion')) {
				$toggledItem.siblings().removeClass('active').next($foldCon).hide();
				$toggledItem.toggleClass('active').next($foldCon).toggle();
			} else {
				if (!$($parentEl).hasClass('not-accordion')) {
					$($foldTit).removeClass('active').next($foldCon).hide();
				}
				$toggledItem.toggleClass('active').next($foldCon).toggle();
			}

		}
	});
}
foldTitGroup('.btn-trigger', '#_modalOrderDetail1', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetail2', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetail3', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailAcc', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailUsed1', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailUsed2', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '#_modalOrderDetailUsed3', '.h-area', '.cont-area');
foldTitGroup('.btn-trigger', '.popup-insurance-join', '.h-area', '.cont-area');

if ($('.popup-imei').length) { foldTitGroup('.btn-trigger', '.popup-imei', '.fold-tit', '.fold-con'); }
if ($('.popup-optional-service').length) { foldTitGroup('.btn-trigger', '.popup-optional-service', '.fold-tit', '.fold-con'); }
foldTitGroup('.popup-tgift', '.s-checkpoint-wrap', '.s-checkpoint-cont', '.btn-toggle');

//자급제/중고/해외직구폰 개통 > 모델명 자동완성 레이어 테스트
$('.used-wrap .c-input-outline').next('.list-layer').prev('.c-input-outline').find('input').keyup(function () {
	//console.log($(this).val());
	if ($(this).val() == '' || $(this).val() == null) {
		$(this).parent('span').next('.list-layer').hide();
		$(this).parents('.form-inner').next('button').addClass('disabled');
		$(this).parents('.form-inner').next('button').prop('disabled', true);
	} else {
		$(this).parent('span').next('.list-layer').show();
		$(this).parents('.form-inner').next('button').removeClass('disabled');
		$(this).parents('.form-inner').next('button').prop('disabled', false);
	}
}).focus(function () {
	if ($(this).val() == '' || $(this).val() == null) {
		$(this).parents('.form-inner').next('button').addClass('disabled');
		$(this).parents('.form-inner').next('button').prop('disabled', true);
	} else {
		$(this).parent('span').next('.list-layer').show();
		$(this).parents('.form-inner').next('button').removeClass('disabled');
		$(this).parents('.form-inner').next('button').prop('disabled', false);
	}
}).blur(function () {
	var _this = this;
	setTimeout(function () { $(_this).parent('span').next('.list-layer').hide(); }, 100);
	if ($(this).val() == '' || $(this).val() == null) {
		$(this).parents('.form-inner').next('button').addClass('disabled');
		$(this).parents('.form-inner').next('button').prop('disabled', true);
	} else {
		$(this).parents('.form-inner').next('button').removeClass('disabled');
		$(this).parents('.form-inner').next('button').prop('disabled', false);
	}
});

$('.used-wrap .c-input-outline').next('.list-layer').find('.list-item a').on('click', function () {
	$(this).parents('.list-layer').prev('.c-input-outline').find('input').val($(this).text());
});

$('.used-wrap .c-input-outline input').keyup(function () {
	if ($(this).val() == '' || $(this).val() == null) {
		$(this).parent('span').next('button').addClass('disabled');
		$(this).parent('span').next('button').prop('disabled', true);
	} else {
		$(this).parent('span').next('button').removeClass('disabled');
		$(this).parent('span').next('button').prop('disabled', false);
	}
}).focus(function () {
	if ($(this).val() == '' || $(this).val() == null) {
		$(this).parent('span').next('button').addClass('disabled');
		$(this).parent('span').next('button').prop('disabled', true);
	} else {
		$(this).parent('span').next('button').removeClass('disabled');
		$(this).parent('span').next('button').prop('disabled', false);
	}
}).blur(function () {
	if ($(this).val() == '' || $(this).val() == null) {
		$(this).parent('span').next('button').addClass('disabled');
		$(this).parents('.form-inner').next('button').prop('disabled', true);
	} else {
		$(this).parent('span').next('button').removeClass('disabled');
		$(this).parent('span').next('button').prop('disabled', false);
	}
});

/*function popMd(url, name) {
	popupWindow = window.open(url, name,'width=700, height=600, scrollbars=yes, resizable=no, toolbar=no');
}

function popSm(url, name) {
	popupWindow = window.open(url, name,'width=480, height=436, scrollbars=yes, resizable=no, toolbar=no');
}*/

//쓰던 폰 반납
if ($('.popup-phone-return').length) {
	$('.return-request .c-rdo:eq(0)').on('click', function () {
		$('.rating-check').show();
	});

	$('.return-request .c-rdo:eq(1)').on('click', function () {
		$('.rating-check').hide();
	});

	$('#_qTab1').closest('.c-rdo').on('click', function () {
		$('#_qPanel1').show();
		$('#_qPanel2').hide();
	});

	$('#_qTab2').closest('.c-rdo').on('click', function () {
		$('#_qPanel1').hide();
		$('#_qPanel2').show();
	});

	$('.rating-check .btn-area .btn-primary').on('click', function () {
		$('.rating-check .btn-area').hide();
		$('.rating-check .result-area').show();
	});
}

//매장검색
$('.search-result-wrap .btn-trigger').on('click', function () {
	$(this).closest('.h-area').toggleClass('active');
	$(this).closest('.h-area').next('.cont-area').toggle();
});

$('.search-filter-area .auto-complete li.result-item a').on('click', function () {
	$(this).parents('.search-filter-area').find('.c-input-outline input').val($(this).text());
});


//요금제선택
$('.add-service .form-group > .c-rdo').each(function () {
	var radioNum = $(this).index();
	$(this).find('>input').click(function () {
		$(this).parent().parent().find('.tab-radio-con').removeClass('active').eq(radioNum).addClass('active');
	});
});

//요금제선택 checkbox
$('.add-service .form-group > .c-chk').each(function () {
	var radioNum = $(this).index();
	$(this).find('>input').click(function () {
		if (this.checked) {
			$(this).parent().parent().find('.tab-radio-con').removeClass('active').eq(radioNum).addClass('active');
		}
	});
});

$('.charge-area > .c-rdo').click(function () {
	$(this).parent().parent().addClass('active').siblings('li').removeClass('active');
});

$('.popup-phone-charge .service-detail-wrap .btn-trigger').on('click', function () {
	$(this).closest('.service-detail-wrap').toggleClass('active');
});

$('.phone-charge-type li').click(function () {
	$(this).toggleClass('on');
	$(this).siblings('li').removeClass('on');
	var text = $(this).children('a').text();
	if (!$(this).hasClass('on') && text == '#프리미엄') {
		text = 'ALL'
	};
	//console.log(text);
	$(this).parent('ul').next('h3.phone-charge-type').text(text);
});

//ui-components sample
$('.ui-font-test h3').on('click', function () {
	$(this).parents('.ui-font-test').toggleClass('active');
});

/* ===============================================================
//우편번호 조회 팝업에서 input 텍스트 입력시 검색어 삭제 버튼 UI
================================================================*/
if ($('.c-input-outline input').val()) {
	$('.c-input-outline .btn-delete').show();
}

$('.c-input-outline input').on('input', function () {
	$('.c-input-outline .btn-delete').toggle(!!this.value);
});

$('.c-input-outline .btn-delete').on('touchstart click', function () {
	$('.c-input-outline input').val('').trigger('input');
});

(function () {
	if ($('.popup-zipcode').length) {
		var $addr_list = $('.address-list');
		var $link_block = $addr_list.find(".link-block");
		var $select = $(".c-select-outline select");

		$addr_list.off('click.address-list').on('click.address-list', '.link-block', function (e) {
			var siblingsItems = $(this).closest('li').siblings('li');

			if ($(this).hasClass("is-active")) {
				$(this).removeClass("is-active");
				siblingsItems.show();
			} else {
				$(this).addClass("is-active");
				siblingsItems.hide();
			}
			e.preventDefault();
		});

		$select.off("change.result-cpation").on("change.result-cpation", function () {
			$link_block.removeClass("is-active");
		});
	}
})();

//내가고른 보안패키지
$('.filter-item').on('click', function () {
	if ($(this).siblings().hasClass('active')) {
		$(this).addClass('active').siblings().removeClass('active');
	}
});

/*  s: 2019-06-11 통합페이 수정 */
//t-pay
$(document).on('click', '.modal-pay .c-rdo input[type="radio"], .modal-pay-acc .c-rdo input[type="radio"], .modal-pay-iot .c-rdo input[type="radio"]', function () {
	var $ft_btn = $('.modal-pay .modal-footer button, .modal-pay-acc .modal-footer button, .modal-pay-iot .modal-footer button');
	var $c_chk = $('.modal-pay .agree-area .c-chk, .modal-pay-acc .agree-area .c-chk, .modal-pay-iot .agree-area .c-chk');
	if ($(this).parent().next().is('.agree-area')) {
		$c_chk.removeClass("no-active");
		$ft_btn.addClass("disabled").prop('disabled', true);
		$c_chk.removeClass("checked");
		$c_chk.find("input[type='checkbox']").prop("checked", false);
	} else {
		$c_chk.addClass("no-active");
		$(".modal-pay .agree-item, .modal-pay-acc .agree-item, .modal-pay-iot .agree-item").removeClass("active");
		$ft_btn.removeClass("disabled").prop('disabled', false);
	}
});

$(document).on('click', '.modal-pay .agree-title .c-chk input[type="checkbox"], .modal-pay-acc .agree-title .c-chk input[type="checkbox"], .modal-pay-iot .agree-title .c-chk input[type="checkbox"]', function () {
	var $ft_btn = $('.modal-pay .modal-footer button, .modal-pay-acc .modal-footer button, .modal-pay-iot .modal-footer button');
	if (!$(this).parents(".agree-area").prev().hasClass("checked")) {
		return;
	} else {
		if ($(this).is(":checked")) {
			$ft_btn.removeClass("disabled").prop('disabled', false);
		} else {
			$ft_btn.addClass("disabled").prop('disabled', true);
		}
	}
});
/* e: 2019-06-11 통합페이 수정 */

//appleWatch gate pop FAQ wrap
(function () {
	var faqWrap = $("#faq_wrap");
	var faqSelect = faqWrap.find(".faq_select");
	var btnFS = faqSelect.find("button");
	var fsList = faqSelect.find("ul");
	var fsItem = fsList.find("li");
	var faqCont = faqWrap.find(".faq_cont");

	btnFS.on("click", function () {
		settingBtn();

		return false;
	})
	fsItem.find("a").on("click", function () {
		var contId = $(this).attr("href").split("#")[1];

		faqCont.hide();
		if ($("#" + contId).size() > 0) {
			$("#" + contId).show();
		}

		fsItem.find("a").removeClass("on");
		$(this).addClass("on");

		btnFS.text($(this).text());
		settingBtn();

		return false;
	})
	function settingBtn() {
		if (btnFS.hasClass("on") == false) {
			btnFS.addClass("on");
			fsList.slideDown(200);
		} else if (btnFS.hasClass("on") == true) {
			btnFS.removeClass("on");
			fsList.hide();
		}
	}
})();

//appleWatch gate pop faq accordion
(function () {
	var doc = $(window.document); // document
	var arc = doc.find('ul.arcBox');

	arc.children('li').each(function (index) {
		$(this).children('a').bind('click', function (e) {
			//e.preventDefault();
			var thisLi = $(this).parent();
			if (thisLi.hasClass('on')) {
				thisLi.removeClass('on').find('> a').attr('title', '열기');
			} else {
				thisLi.closest('ul.arcBox').find("li.on").removeClass('on').find('> a').attr('title', '열기');
				thisLi.addClass('on').find('> a').attr('title', '닫기');
			}
			//#개선 UI
			var _href = $(this).attr('href');
			if (_href == "#") {
				e.preventDefault();
			}
		});
	});
})();

//구매팁 개편 QA 아코디언 리스트
$('.benefit-qna-wrap .qa-wrap .qa-link').on('click.qa-link', function (e) {
	e.preventDefault();
	$(this).closest(".qa-item").siblings().removeClass("active");
	$(this).closest(".qa-item").toggleClass('active');
	var target = $(this.hash).offset().top - 210;
	$("html, body").scrollTop(target);
});
$(".qa-wrap .go-move").on("click", function (e) {
	$(".qa-wrap [href='#T3_3']").trigger('click');
});

//구매팁 외부 링크에 따른 탭 활성화 처리
(function () {
	var url_hash = location.hash;
	var idx = url_hash.substr(url_hash.length - 1);
	if (url_hash.indexOf('qna_tab') != -1) {
		$(".qna-top__list li").eq(idx - 1).find("a").trigger("click");
	}
})();

/* iphone 예판 */
$('.pre-srv-list dt > a').on('click', function (e) {
	e.preventDefault();
	$(this).closest(".pre-srv-item").siblings().removeClass("active");
	$(this).closest(".pre-srv-item").toggleClass('active');
});

//twd2020 구매조건비교하기 고도화
$(function () {

	//var compare = $('.wrap.compare-wrap'); 		//페이지 공통 클래스 전역 변수

	var tdirect_compare = {
		init: function () {
			//this.tab_target(); //탭 이동
			this.min_height();	//높이값 조정
			this.switch_btn(); //스위치 푸시 버튼
			//this.tbl_click();	//클릭
			this.acco_info();	//안내사항 보기
			this.check_icon();	//아이콘 체크
			this.radio_trigger();	//팝업 라디오
		},
		// tab_target: function () {
		// 	function target_blank(){
		// 		var _offset = $(".compare-tab-wrap").offset();
		// 		$('.target').on('click',function() {
		// 			$('html, body').animate({scrollTop : _offset.top + 202}, 300);
		// 		});
		// 	}
		// 	target_blank();
		// },
		// tbl_click: function () {
		// 	$('.sale .tbl-item').each(function () {
		// 		$(this).find('.tbl-info,.tbl-info2').on('click', function () {
		// 			$(this).toggleClass('on');
		// 		});
		// 	});
		// },
		switch_btn: function () {
			$('.btn-switch-toggle').not('.disabled').on('click', function () {
				$(this).toggleClass('on');
			});
		},
		acco_info: function () {
			$('.desc-info-toggle').on('click', function () {
				$(this).toggleClass('on');
			});
		},
		check_icon: function () {
			$('.compare-cont .select-box-item,.compare-table .select-box-item').each(function () {
				$(this).on('click', function (e) {
					$(this).siblings().removeClass('on');
					$(this).addClass('on');
					e.preventDefault()
				});
			});
		},
		min_height: function () {
			$('.compare-table .compare').each(function () {
				var def = 0;
				$(this).find('.tbl-info').each(function () {
					thisHeight = $(this).height();
					if (thisHeight > def) {
						def = thisHeight;
					}
				});
				$(this).find('.tbl-info').height(def);
				$(this).find('.tbl-info2').each(function () {
					thisHeight = $(this).height();
					if (thisHeight > def) {
						def = thisHeight;
					}
				});
				$(this).find('.tbl-info2').height(def);
			});
			$('.compare-table .sale').each(function () {
				var def = 0;
				$(this).find('.tbl-info').each(function () {
					thisHeight = $(this).height();
					if (thisHeight > def) {
						def = thisHeight;
					}
				});
				$(this).find('.tbl-info').height(def);
				$(this).find('.tbl-info2').each(function () {
					thisHeight = $(this).height();
					if (thisHeight > def) {
						def = thisHeight;
					}
				});
				$(this).find('.tbl-info2').height(def);
			});
		},
		radio_trigger: function () {
			$('.modal-phone-charge .service-detail-wrap .btn-trigger').on('click', function () {
				$(this).closest('.service-detail-wrap').toggleClass('active');
			});
		},
	};

	tdirect_compare.init();
});

//twd2020 2020-08-05 다이렉트 호출 처리 -> 220209
function min_height() {

	var _cDiv = $("#compareDiv")
	var flag = _cDiv.css("display") == "none" ? "hidden" : "show"; //flag가 true이면 1번 탭이 숨겨져있는 상태 ( 디폴트탭 변경으로 인한 수정)
	if (flag == "hidden") {
		_cDiv.show();
	}

	$('.compare-table .compare').each(function () {
		var def = 0;
		$(this).find('.tbl-info').each(function () {
			thisHeight = $(this).height();
			if (thisHeight > def) {
				def = thisHeight;
			}
		});
		$(this).find('.tbl-info').height(def);
		$(this).find('.tbl-info2').each(function () {
			thisHeight = $(this).height();
			if (thisHeight > def) {
				def = thisHeight;
			}
		});
		$(this).find('.tbl-info2').height(def);
	});
	$('.compare-table .sale').each(function () {
		var def = 0;
		$(this).find('.tbl-info').each(function () {
			thisHeight = $(this).height();
			if (thisHeight > def) {
				def = thisHeight;
			}
		});
		$(this).find('.tbl-info').height(def);
		$(this).find('.tbl-info2').each(function () {
			thisHeight = $(this).height();
			if (thisHeight > def) {
				def = thisHeight;
			}
		});
		$(this).find('.tbl-info2').height(def);
	});

	if (flag == "hidden") {
		$("#compareDiv").hide();
	}
}
min_height();

//tds 2022.04.20 구매조건비교하기_버튼연결탭변경
function target_blank(targetInfo) {
	var _offset = targetInfo;
	$('.target').on('click', function () {
		$('html, body').animate({ scrollTop: _offset.offset().top + 202 }, 300);

		$(".tab-item:nth-of-type(2) ", ".compare-tab-wrap").removeClass('on');
		$("#compare02", ".compare-tab-wrap").hide();
    $(".tab-item:nth-of-type(3) ", ".compare-tab-wrap").removeClass('on');
		$("#compare03", ".compare-tab-wrap").hide();

		$("#compareDiv,#compare01", ".compare-tab-wrap").show();
		$(".tab-item:first-child", ".compare-tab-wrap").addClass('on');

	});
}
target_blank($(".compare-tab-wrap"));

/* twd2020 오늘도착 전국배송 */
$('.delivery-option-wrap').each(function () {
	var $this = $(this);
	var $tabTitle = $this.find('.tab-title > a');
	var $itemAccordion = $this.find('.item-accordion');
	var $openedArea = $this.find('.opened-area');
	var $btnTrigger = $this.find('.btn-trigger');
	var tabActivateState = false;

	function tabClose() {
		$tabTitle.removeClass('on');
		$openedArea.hide();
	}

	$tabTitle.on('click', function (e) {
		e.preventDefault();
		tabClose();
		$openedArea.filter(this.hash).show();
		$(this).addClass('on');
		$itemAccordion.addClass('opened');
		tabActivateState = true;
	});

	$btnTrigger.on('click', function () {
		if (tabActivateState) {
			tabClose();
			$itemAccordion.removeClass('opened');
			tabActivateState = false;
		} else {
			$tabTitle.eq(0).trigger('click');
			$itemAccordion.addClass('opened');
			tabActivateState = true;
		}
	});
});

foldTitGroup('.btn-trigger', '#_modalOrderDetail4', '.h-area', '.cont-area');

var additionServStickerSwiperInit = (function ($el, callback) {
	var slidesPerView = 3.35;
	var additionServStickerSwiper = new Swiper($el, {
		slidesPerView: slidesPerView,
		calculateHeight: true,
		onSlideChangeEnd: function (swiper) {
			var currentIndex = swiper.activeIndex;
			if ($.isFunction(callback)) {
				callback(swiper, currentIndex);
			}
		},
		onSlideClick: function (swiper) {
			var currentIndex = swiper.clickedSlideIndex;
			$(swiper.getSlide(currentIndex)).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
			swiper.activeIndex = currentIndex;
			if ($.isFunction(callback)) {
				callback(swiper, currentIndex);
			}
		}
	});
	if ($($el).parent().find('.swiper-button-prev').length > 0) {
		$($el).parent().find('.swiper-button-prev').on('click', function () {
			additionServStickerSwiper.swipePrev();
		});
	}

	if ($($el).parent().find('.swiper-button-next').length > 0) {
		$($el).parent().find('.swiper-button-next').on('click', function () {
			if (additionServStickerSwiper.activeIndex <= (additionServStickerSwiper.slides.length - slidesPerView)) {
				additionServStickerSwiper.swipeNext();
			}
		});
	}
	return additionServStickerSwiper;
});

var partnershipServCardSwiperInit = (function ($el, callback) {
	var partnershipServCardSwiper = new Swiper($el, {
		slidesPerView: 'auto',
		centeredSlides: true,
		calculateHeight: true,
		onSlideChangeEnd: function (swiper) {
			var currentIndex = swiper.activeIndex;
			if ($.isFunction(callback)) {
				callback(swiper, currentIndex);
			}
		},
		onSlideClick: function (swiper) {
			var clickedSlideIdx = swiper.clickedSlideIndex,
				activeIndex = swiper.activeIndex;
			if (clickedSlideIdx === activeIndex) return;
			else if (clickedSlideIdx > activeIndex) swiper.swipeNext();
			else swiper.swipePrev();
		}
	});
	return partnershipServCardSwiper;
});

var subscribeSwiperInit = (function ($el, callback) {
	var slidesPerView = 2;
	var subscribeSwiper = new Swiper($el, {
		slidesPerView: slidesPerView,
		calculateHeight: true,
		onSlideChangeEnd: function (swiper) {
			var currentIndex = swiper.activeIndex;
			if ($.isFunction(callback)) {
				callback(swiper, currentIndex);
			}
		},
		onSlideClick: function (swiper) {
			var currentIndex = swiper.clickedSlideIndex;
			$(swiper.getSlide(currentIndex)).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');
			swiper.activeIndex = currentIndex;
			if ($.isFunction(callback)) {
				callback(swiper, currentIndex);
			}
		}
	});
	if ($($el).parent().find('.swiper-button-prev').length > 0) {
		$($el).parent().find('.swiper-button-prev').on('click', function () {
			subscribeSwiper.swipePrev();
		});
	}

	if ($($el).parent().find('.swiper-button-next').length > 0) {
		$($el).parent().find('.swiper-button-next').on('click', function () {
			if (subscribeSwiper.activeIndex <= (subscribeSwiper.slides.length - slidesPerView)) {
				subscribeSwiper.swipeNext();
			}
		});
	}
	return subscribeSwiper;
});

var orderOptionSwiperInit = (function ($el, callback) {
	var slidesPerView = 3.3927;
	var intSlidesPerView = parseInt(slidesPerView);
	var $navButton = $($el).parent().find('[class*=swiper-button]');
	var $prevButton = $navButton.first();
	var $nextButton = $navButton.last();
	var orderOptionSwiper = new Swiper($el, {
		slidesPerView: slidesPerView,
		calculateHeight: true,
		grabCursor: true,
		slideActiveClass: 'visible-first',
		onSlideReset: function (swiper) {
			swiper.activeIndex = $(swiper.slides).index($($el).find('.swiper-slide-active'));
		},
		onFirstInit: function (swiper) {
			swiper.slides.length > intSlidesPerView ? $navButton.show() : $navButton.hide();
			swiper.activeIndex = 0;
			$(swiper.getFirstSlide()).addClass('swiper-slide-active');
			$prevButton.addClass('disabled');
		},
		onSlideChangeEnd: function (swiper) {
			swiper.activeIndex = $(swiper.slides).index($($el).find('.swiper-slide-active'));

			updateNavButton(swiper);

			if ($.isFunction(callback)) {
				callback(swiper, swiper.activeIndex);
			}
		},
		onSlideClick: function (swiper) {
			swiper.activeIndex = swiper.clickedSlideIndex;
			$(swiper.getSlide(swiper.activeIndex)).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');

			if (orderOptionSwiper.activeIndex === $(orderOptionSwiper.slides).index($($el).find('.visible-first')) + intSlidesPerView || orderOptionSwiper.activeIndex === $(orderOptionSwiper.slides).index($($el).find('.visible-first')) - 1) {
				orderOptionSwiper.swipeTo(orderOptionSwiper.activeIndex);
			}

			updateNavButton(swiper);

			if ($.isFunction(callback)) {
				callback(swiper, swiper.activeIndex);
			}
		},
		onTouchEnd: function (swiper) {
			updateNavButton(swiper);
		}
	});

	function updateNavButton(swiper) {
		if (swiper.activeIndex <= 0) {
			$prevButton.addClass('disabled');
			$nextButton.removeClass('disabled');
		} else if (swiper.activeIndex >= swiper.slides.length - 1) {
			$nextButton.addClass('disabled');
			$prevButton.removeClass('disabled');
		} else {
			$prevButton.removeClass('disabled');
			$nextButton.removeClass('disabled');
		}
	}

	if ($($el).parent().find('.swiper-button-prev').length > 0) {
		$($el).parent().find('.swiper-button-prev').on('click', function () {
			if (orderOptionSwiper.activeIndex <= 0) {
				orderOptionSwiper.swipeTo(orderOptionSwiper.activeIndex);

				return;
			}

			orderOptionSwiper.activeIndex -= 1;
			$(orderOptionSwiper.getSlide(orderOptionSwiper.activeIndex)).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');

			if (orderOptionSwiper.activeIndex >= $(orderOptionSwiper.slides).index($($el).find('.visible-first')) + intSlidesPerView || orderOptionSwiper.activeIndex < $(orderOptionSwiper.slides).index($($el).find('.visible-first'))) {
				orderOptionSwiper.swipeTo(orderOptionSwiper.activeIndex);
			}

			updateNavButton(orderOptionSwiper);

			if ($.isFunction(callback)) {
				callback(orderOptionSwiper, orderOptionSwiper.activeIndex);
			}
		});
	}

	if ($($el).parent().find('.swiper-button-next').length > 0) {
		$($el).parent().find('.swiper-button-next').on('click', function () {
			if (orderOptionSwiper.activeIndex >= orderOptionSwiper.slides.length - 1) {
				orderOptionSwiper.swipeTo(orderOptionSwiper.activeIndex);
				orderOptionSwiper.activeIndex = orderOptionSwiper.slides.length;

				return;
			}

			orderOptionSwiper.activeIndex += 1;
			$(orderOptionSwiper.getSlide(orderOptionSwiper.activeIndex)).addClass('swiper-slide-active').siblings().removeClass('swiper-slide-active');

			if (orderOptionSwiper.activeIndex >= $(orderOptionSwiper.slides).index($($el).find('.visible-first')) + intSlidesPerView || orderOptionSwiper.activeIndex < $(orderOptionSwiper.slides).index($($el).find('.visible-first'))) {
				orderOptionSwiper.swipeTo(orderOptionSwiper.activeIndex);
			}

			updateNavButton(orderOptionSwiper);
			if ($.isFunction(callback)) {
				callback(orderOptionSwiper, orderOptionSwiper.activeIndex);
			}
		});
	}

	return orderOptionSwiper;
});

var orderOptionSwipeTo = function (swiper, idx) {
	if (!idx && idx !== 0) return;

	swiper.swipeTo(idx);
	$(swiper.slides).filter('.swiper-slide-active').each(function (idx, item) {
		$(item).removeClass('swiper-slide-active');
	});
	$(swiper.getSlide(idx)).addClass('swiper-slide-active');
	swiper.activeIndex = idx;
}

UI.reInitSwiper = function (swiper, slideItems, slidesPerView) {
	var $navButton = $(swiper.wrapper).parent().siblings('[class*=swiper-button]');

	swiper.removeAllSlides();
	$.each(slideItems, function (idx, item) {
		var newSlide = swiper.createSlide(item);
		swiper.appendSlide(newSlide);
	});
	swiper.reInit();
	swiper.swipeTo(0);

	if ($navButton && slidesPerView) {
		swiper.slides.length > parseInt(slidesPerView) ? $navButton.show() : $navButton.hide();
	}
};

UI.utube = function () {
	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	var utubeInstanceArr = [];

	window.onYouTubeIframeAPIReady = function () {
		$('.utube-component').each(function (idx) {
			var $this = $(this);
			var $utubeFrame = $('.utube-frame', $this);
			var $utubeThumb = $('.utube-thumb', $this);
			var $utubeBtn = $('.utube-btn', $this);
			var id = $utubeFrame.data('utube-id');
			var animationTime = 600;

			utubeInstanceArr[idx] = new YT.Player($utubeFrame[0], {
				//width: 940,
				//height: 530,
				videoId: id,
				events: {
					'onReady': onPlayerReady,
					'onStateChange': onPlayerStateChange
				}
			});
			function onPlayerReady() {
				$utubeThumb.css({
					'background-image': 'url(https://img.youtube.com/vi/' + id + '/maxresdefault.jpg)'
				});
				$utubeBtn.on('click', function () {
					$utubeThumb.fadeOut(animationTime);
					utubeInstanceArr[idx].playVideo();
				});
			}
			function onPlayerStateChange(event) {
				if (event.data === 0) { //동영상 정지시
					$utubeThumb.fadeIn(animationTime);
				}
			}
		});
	};
	return utubeInstanceArr;
};

(function (global) {
	function SvgCircle(el) {
		this.$el = null;
		this.radius = null;
		this.strokeDashoffset = null;
		this.percent = null;
		this.animationTime = 1000;
		this.progress = null;
		this.init(el);
	}
	SvgCircle.prototype.init = function (el) {
		this.$el = $(el);
		this.radius = this.$el.attr('r');
		this.strokeDashoffset = (this.radius * 2) * Math.PI;
	};
	SvgCircle.prototype.draw = function (percentNum, animationTime) {
		this.percent = percentNum || this.$el.data('progress-percent');
		this.animationTime = animationTime || this.animationTime;
		this.progress = ((100 - Math.round(this.percent)) / 100) * this.strokeDashoffset;
		this.animate();
	};
	SvgCircle.prototype.setValue = function () {
		this.$el.css({ strokeDashoffset: this.progress });
	}
	SvgCircle.prototype.animate = function () {
		this.$el.stop().animate({
			strokeDashoffset: this.progress
		}, this.animationTime);
	};
	SvgCircle.prototype.reDraw = function () {
		this.$el.css({ strokeDashoffset: this.strokeDashoffset });
		this.animate();
	}
	global.SvgCircle = SvgCircle;
})(window);
var svgCircle1 = new SvgCircle('#svgCircle1');
svgCircle1.draw();
var svgCircle2 = new SvgCircle('#svgCircle2');
svgCircle2.draw();

// 구독형 scm 관련
(function () {
	var $subscribeAccordionCont = $('.scm-accordion');
	var $subscribeContSCM = $('.subscribe-cont');

	// Accordion;
	$subscribeAccordionCont.on('click', '.accordion-button', function (e) {
		if (!$(this).parent().hasClass('active')) {
			$('.scm-accordion .accordion-body').slideUp(200);
			$('.scm-accordion .accordion-header').removeClass('active');
			$(this).parent().addClass('active');
			$(this).parent().siblings('.scm-accordion .accordion-body').slideDown(200);
		} else {
			$(this).parent().removeClass('active');
			$(this).parent().siblings('.scm-accordion .accordion-body').slideUp(200);
		}
	});

	// tab dropdown layer
	$subscribeContSCM.on('click', '.tabs .tab-link a', function (e) {
		e.preventDefault();
		$('.subscribe-cont .tabs .tab-link').removeClass('current');
		$(this).parent().addClass('current');
	});

	$subscribeContSCM.on('click', '.tab-content .btn-close-layer', function (e) {
		$('.subscribe-cont .tabs .tab-link').removeClass('current');
	});
}());

/* ===============================================================
// 부가상품가입 모아보기 버튼 2021.10.28
================================================================*/
$('.tab-allmenu button').on('click', function () {
	$(".layer-allmenu-wrap").toggle();
	$(".layer-allmenu-wrap .btn-m-close").on('click', function () {
		$(".layer-allmenu-wrap").hide();
	});
});
//input 영역 숫자만 (번호인증)
$("input:text[numberOnly]").on("keyup", function () {
	$(this).val($(this).val().replace(/[^0-9]/g, ""));
});

// 모달팝업 토글 - 고도화 2022
$('.btn-toggle').on('click', function () {
    $(this).parents().parents().toggleClass('active')
});

// 옵션변경 모달팝업 - 선택한 옵션 삭제
$(document).on("click",".btn-option-del button",function(e){
e.stopPropagation();
$(this).parent('.btn-option-del').parent('.selected-acc-row').remove();
}); 

// 판매기능고도화 2차
// 구매후기 필터 팝업 초기화
$('.modal-filter .btn-reset').click(function () {
	$(this).parents('body').find('input:checkbox').prop("checked", true);
	$(this).parents('body').find('.filter-all-chk').prop("checked", true);
});

$('.modal-filter .btn-apply').click(function () {
  var filterAllChk = $(this).parents('.modal-filter').find('.filter-all-chk').length;
  var filterAllChked = $(this).parents('.modal-filter').find('.filter-all-chk:checked').length;
  if (filterAllChked < filterAllChk) {
    $(this).parents('body').find('.purchase-review-wrap .btn-filter').addClass('on');
  } else {
    $(this).parents('body').find('.purchase-review-wrap .btn-filter').removeClass('on');
  } 
});


//구매후기 모달팝업 썸네일 클릭
$('.modal-review-detail .small-thumb').click(function(){
  $('.modal-review-detail .small-thumb').removeClass('on');
  $(this).addClass('on');
  var imgSrc = $(this).find('img').attr('src');
  $(this).parents('.photo_video_area').find('.big-box img').attr('src', imgSrc);
});



//2022_메인전시_단말컨포넌트UI개선
var hometab = (function() {
	var SELECTOR = {
		tabitem : '[data-ui="tab"]',
		tabbtn : '[data-ui="tab"] [role="tab"]',
		tabpanel : '[data-ui="tabpanel"]',
	};

	var tabGroup = [];
	
	function init() {
		if( !$(SELECTOR.tabitem).length ) {
			return;
		}

		$(SELECTOR.tabitem).each(function (key, value) {
			if ($.inArray($(this).data('tab-name'), tabGroup) == -1) {
				tabGroup.push($(this).data('tab-name'));
			}
		});
		
		$.each(tabGroup, function (key, value) {
			setup( $(SELECTOR.tabitem).filter('[data-tab-name="' + value + '"]') );
		});

		$(document).off('click.uihometab').on('click.uihometab', SELECTOR.tabbtn, function() {
			open( $(this).parent(SELECTOR.tabitem) );
		});
	}

	function setup(element) {
		$(element).each(function(i) {
			var el = _getElementData(this);
			var tabitem_id = el.$tabbtn.attr('id') || el.$tabitem.data('tab-name') + '__TAB__' + i;
			var tabpanel_id = el.$tabpanel.attr('id') || el.$tabpanel.data('tabpanel-name') + '__TABPANEL__' + i;
			
			el.$tabbtn.attr('id', tabitem_id );
			el.$tabbtn.attr('aria-controls', tabpanel_id );

			el.$tabpanel.attr('id', tabpanel_id);
			el.$tabpanel.attr('aria-labelledby', tabitem_id);

			el.$tabbtn.attr('aria-selected', false);
			el.$tabpanel.attr('aria-hidden', true);
			el.$tabpanel.attr('tabindex', -1);

			if( el.$tabitem.hasClass('on') ) {
				el.$tabbtn.attr('aria-selected', true);
				el.$tabpanel.attr('aria-hidden', false);
				el.$tabpanel.attr('tabindex', 0);

				el.$tabitem.addClass('on');
				el.$tabpanel.addClass('on');
			}
		});
	}

	function open(element) {
		var el = _getElementData(element);

		if( el.tabitem_name !== el.tabpanel_name ) {
			return;
		}

		el.$tabbtn.attr('aria-selected', true);
		el.$tabpanel.attr('aria-hidden', false);
		el.$tabpanel.attr('tabindex', 0);
		
		el.$tabitem.addClass('on');
		el.$tabpanel.addClass('on');
		
		el.$tabitem.siblings().each(function() {
			close($(this));
		});
	}

	function close(element) {
		var el = _getElementData(element);

		if( el.tabitem_name !== el.tabpanel_name ) {
			return;
		}

		el.$tabbtn.attr('aria-selected', false);
		el.$tabpanel.attr('aria-hidden', true);
		el.$tabpanel.attr('tabindex', -1);

		el.$tabitem.removeClass('on');
		el.$tabpanel.removeClass('on');
	}

	function _getElementData(element) {
		var el = {};

		el.$tabitem = $(element);
		el.tabitem_index = el.$tabitem.index();
		el.tabitem_name = el.$tabitem.data('tab-name');

		el.$tabbtn = el.$tabitem.children();
		if( el.$tabbtn.attr('aria-controls') ) {
			el.$tabpanel = $('#' + el.$tabbtn.attr('aria-controls'))
		} else {
			el.$tabpanel = $(SELECTOR.tabpanel).filter('[data-tabpanel-name="'+ el.$tabitem.data('tab-name') +'"]:eq('+ el.$tabitem.index() +')');
		}

		el.tabpanel_name = el.$tabpanel.data('tabpanel-name');

		return el;
	}

	// init();

	return {
		init : init,
		setup : setup,
		open : open,
		close : close,
	}
})();

var homeflowcard = {};
homeflowcard.flipcard = (function() {
	var SELECTOR = {
		card : '.flipcard',
		btn : '.flip-btn',
	};

	
	function init() {
		if( !$(SELECTOR.card).length ) {
			return;
		}

		$(document).off('click.flipcard').on('click.flipcard', SELECTOR.btn, function() {
			var $element = $(this).closest(SELECTOR.card);
	
			if( $element.hasClass('is-flipped') ) {
				filpOff($element);
			} else {
				filpOn($element);
			}
		});
	}

	function filpOn(element) {
		var $element = $(element);
		var $swiperFlipCard = $element.closest('.swiper-slide');

		if( $swiperFlipCard.length ) {
			$swiperFlipCard.siblings().filter('[data-idx="'+ $swiperFlipCard.attr('data-idx') +'"]').find(SELECTOR.card).addClass('is-flipped');
		}

		$element.removeClass('is-flipre');
		$element.addClass('is-flipped');
	}

	function filpOff(element) {
		var $element = $(element);
		var $swiperFlipCard = $element.closest('.swiper-slide');

		if( $swiperFlipCard.length ) {
			$swiperFlipCard.siblings().filter('[data-idx="'+ $swiperFlipCard.attr('data-idx') +'"]').find(SELECTOR.card).removeClass('is-flipped');
		}

		$element.removeClass('is-flipped');
	}
	
	function flipReset(element) {
		var $element = $(element);
		if( $element.hasClass('is-flipped') ) {
			$element.addClass('is-flipre');
			setTimeout(function(){
				$element.removeClass('is-flipped');
			}, 0);
		}
	}

	// init();

	return {
		init : init,
		filpOn : filpOn,
		filpOff : filpOff,
		flipReset : flipReset,
	}
})();

homeflowcard.flowswiper = (function() {
	var SELECTOR = {
		swiper : '.home-flowcard-wrap .swiper-container.type-coverflow',
	};

	var mySwiper = [];
	
	function init() {
		if( !$(SELECTOR.swiper).length ) {
			return;
		}

		/*
		* Swiper 3D Flow 2.0
		* Plugin for Swiper 2.0+
		* http://www.idangero.us/sliders/swiper/
		*
		* Copyright 2012-2013, Vladimir Kharlampidi
		* The iDangero.us
		* http://www.idangero.us/
		*
		* Licensed under GPL & MIT
		*
		* Released on: June 9, 2012
		*/
		Swiper.prototype.plugins.tdFlow = function(swiper, params) {
			if (!swiper.support.transforms3d) return;
			var slides, wrapperSize, slideSize, initialized;
			var isH = swiper.params.mode == 'horizontal';
			if(!params) return;
			/*=========================
			Default Parameters
			===========================*/
			var defaults = {
				rotate : 50,
				stretch :0,
				depth: 100,
				modifier : 1,
				shadows : true,
				loopAddsNum : 0,
			}
			params = params || {};	
			for (var prop in defaults) {
				if (! (prop in params)) {
					params[prop] = defaults[prop]	
				}
			}
			
			
			function init() {
				initialized = true;
				slides = swiper.slides
				for (var i=0; i<slides.length; i++) {
					swiper.setTransition(slides[i], 0)
				}
				
				if (isH) {
					wrapperSize = swiper.h.getWidth(swiper.wrapper);
					slideSize = wrapperSize/slides.length;
					
					for (var i=0; i<slides.length; i++) {
						slides[i].swiperSlideOffset = slides[i].offsetLeft
					}
				}
				else {
					wrapperSize = swiper.h.getHeight(swiper.wrapper);
					slideSize = wrapperSize/slides.length;
					for (var i=0; i<slides.length; i++) {
						slides[i].swiperSlideOffset = slides[i].offsetTop
					}
				}
			}
			
			function threeDSlides(transform) {
				if (!initialized) return;
				var transform = transform || {x:0, y:0, z:0};
				var center = isH ? -transform.x+swiper.width/2 : -transform.y+swiper.height/2 ;
				
				var rotate = isH ? params.rotate : -params.rotate;
				var translate = params.depth;

				//Each slide offset from center
				for (var i=0; i<swiper.slides.length; i++) {
					
					var slideOffset = swiper.slides[i].swiperSlideOffset
					var offsetMultiplier = (center - slideOffset - slideSize/2)/slideSize*params.modifier;
					
					var rotateY = isH ? rotate*offsetMultiplier : 0;
					var rotateX = isH ? 0 : rotate*offsetMultiplier;
					// var rotateZ = 0
					var translateZ = -translate*Math.abs(offsetMultiplier);
					
					var translateY = isH ? 0 : params.stretch*(offsetMultiplier)
					var translateX = isH ? params.stretch*(offsetMultiplier) : 0;
					
					//Fix for ultra small values
					if (Math.abs(translateX)<0.001) translateX = 0;
					if (Math.abs(translateY)<0.001) translateY = 0;
					if (Math.abs(translateZ)<0.001) translateZ = 0;
					if (Math.abs(rotateY)<0.001) rotateY = 0;
					if (Math.abs(rotateX)<0.001) rotateX = 0;
					
					if (params.loopAddsNum) {
						if( Math.abs(Math.round(offsetMultiplier)) > params.loopAddsNum ) {
							if( translateX > 0 ) {
								translateX = (center - slideOffset - slideSize/2) -(slideSize*(params.loopAddsNum-1));
							} else {
								translateX = (center - slideOffset - slideSize/2) +(slideSize*(params.loopAddsNum-1));
								
							}
							swiper.slides[i].style.opacity = 0;
							swiper.slides[i].style.visibility = "hidden";
						} else {
							swiper.slides[i].style.opacity = 1;
							swiper.slides[i].style.visibility = "inherit";
						}
					}

					var slideTransform = 'translate3d('+translateX+'px,'+translateY+'px,'+translateZ+'px)  rotateX('+rotateX+'deg) rotateY('+rotateY+'deg)';


					swiper.setTransform(swiper.slides[i], slideTransform);
					swiper.slides[i].style.zIndex =-Math.abs(Math.round(offsetMultiplier))+1
					if (params.shadows) {
						//Set shadows
						var shadowBefore = isH ? swiper.slides[i].querySelector('.swiper-slide-shadow-left') : swiper.slides[i].querySelector('.swiper-slide-shadow-top');
						var shadowAfter = isH ? swiper.slides[i].querySelector('.swiper-slide-shadow-right') : swiper.slides[i].querySelector('.swiper-slide-shadow-bottom');
						shadowAfter.style.opacity = (-offsetMultiplier)>0 ? (-offsetMultiplier) : 0;
						shadowBefore.style.opacity = offsetMultiplier>0 ? offsetMultiplier : 0;
					}
				}
				
				//Set correct perspective for IE10		
				if (swiper.ie10) {
					var ws = swiper.wrapper.style;
					ws.perspectiveOrigin = center+'px 50%'
				}
				
			}
			
			//Plugin Hooks
			var hooks = {
				onFirstInit : function(args){
					slides = swiper.slides;
					if (params.shadows) {
						//Add Shadows
						var shadowEl1 = document.createElement('div')
						var shadowEl2 = document.createElement('div')
						shadowEl1.className = isH ? 'swiper-slide-shadow-left' : 'swiper-slide-shadow-top'
						shadowEl2.className = isH ? 'swiper-slide-shadow-right' : 'swiper-slide-shadow-bottom'
						for (var i=0; i<slides.length; i++) {
							slides[i].appendChild(shadowEl1.cloneNode())
							slides[i].appendChild(shadowEl2.cloneNode())
						}
					}
					//Update Dimensions
					init();
					//Set in 3D
					threeDSlides({x:swiper.getWrapperTranslate('x'), y:swiper.getWrapperTranslate('y'), z:swiper.getWrapperTranslate('z')});
				},
				onInit : function(args) {
					init();
					//Set in 3D
					threeDSlides({x:swiper.getWrapperTranslate('x'), y:swiper.getWrapperTranslate('y'), z:swiper.getWrapperTranslate('z')});
				},
				onSetWrapperTransform: function(transform){
					threeDSlides(transform);
				},
				onSetWrapperTransition: function(args){
					
					for (var i=0; i<swiper.slides.length; i++) {
						swiper.setTransition(swiper.slides[i], args.duration)
						if (isH && params.shadows) {
							swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-left'), args.duration)
							swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-right'), args.duration)
						}
						else if(params.shadows) {
							swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-top'), args.duration)
							swiper.setTransition(swiper.slides[i].querySelector('.swiper-slide-shadow-bottom'), args.duration)
						}
					}
			
					
				}
			}
			return hooks
		}

		$(SELECTOR.swiper).each(function(i) {
	
			var _this = this;

			if( $(_this).data('init') == true ) {
				return;
			}
	
			$(_this).data('slide-length', $(_this).find('.swiper-slide').length)
	
			var tdFlow = {
				rotate : 0,
				stretch : 50,
				depth: 150,
				modifier: 1,
				shadows: true,
				loopAddsNum: $(_this).data('visible-num') ? Math.round(($(_this).data('visible-num')-1) / 2) : 2,
			}
			
			if( UI.getBrowser().ie10 | UI.getBrowser().ie11 ) {
				tdFlow = false;
			}

			mySwiper[i] = $(this).swiper({
				speed: 500,
				slidesPerView:'auto',
				centeredSlides: true,
				loop: true,
				loopAdditionalSlides: $(_this).data('slide-length'),
				loopedSlides : $(_this).data('slide-length'),
				calculateHeight: false,
				pagination: $(this).find('.swiper-pagination')[0] || false,
				paginationClickable: true,
				preventLinks: true,
				preventLinksPropagation: true,
				grabCursor: true,
				touchRatio: 0.5,
				tdFlow: tdFlow,
				onImagesReady : function(swiper) {
					$(swiper.container).removeClass('is-ready');
				},
				onSwiperCreated: function(swiper) {
					$(swiper.container).removeClass('is-ready');

					$(swiper.slides).each(function(i) {
						$(this).attr('data-idx', (i % $(_this).data('slide-length')));

						if( $(this).hasClass('swiper-slide-visible') ) {
							$(this).attr('tabindex', 0);
							$(this).attr('aria-hidden', false);
						} else {
							$(this).attr('tabindex', -1);
							$(this).attr('aria-hidden', true);
						}
					});
	
					$(swiper.slides[swiper.activeIndex]).attr('data-active', true);

					$(swiper.container).find('.swiper-button-prev').on('click', function(e) {
						e.preventDefault();
						swiper.swipePrev();
					});
					$(swiper.container).find('.swiper-button-next').on('click', function(e) {
						e.preventDefault();
						swiper.swipeNext();
					});
				},
				onSlideChangeStart : function(swiper) {
					$(swiper.slides).each(function(i) {
						if( $(swiper.slides[swiper.activeIndex]).data('idx') ==  $(this).data('idx')) {
							$(this).attr('data-active', true);
						} else {
							$(this).attr('data-active', false);
						}
	
						$(this).attr('data-idx', (i % $(_this).data('slide-length')));

						if( $(this).hasClass('swiper-slide-visible') ) {
							$(this).attr('tabindex', 0);
							$(this).attr('aria-hidden', false);
						} else {
							$(this).attr('tabindex', -1);
							$(this).attr('aria-hidden', true);
						}
					});

					var $flipped_card = $(swiper.slides).find('.flipcard');
	
					if( $flipped_card.length ) {
						homeflowcard.flipcard.filpOff($flipped_card);
					}
				},
				onTouchMove : function(swiper) {
					$(swiper.slides[swiper.activeIndex]).css('pointer-events', 'none');
				},
				onTouchEnd : function(swiper) {
					$(swiper.slides).css('pointer-events', '');
				},
				onSlideChangeEnd : function(swiper) {
					$(swiper.slides).css('pointer-events', '');
				}
			});

			$(_this).data('init', true);
		});
	}

	// init();

	return {
		init : init,
		mySwiper : mySwiper,
	}
})();

homeflowcard.flowtab = (function() {
	var SELECTOR = {
		tabitem : '[data-ui="tab"][data-tab-name="new-homeflowcard"]',
		tabbtn : '[data-ui="tab"][data-tab-name="new-homeflowcard"] [role="tab"]',
	};

	function init() {
		if( !$(SELECTOR.tabitem).length ) {
			return;
		}
		
		$(document).off('click.flowtab').on('click.flowtab', SELECTOR.tabbtn, function() {
			var $tabitem = $(this).parent(SELECTOR.tabitem);
			var $tabbtn = $tabitem.children();
			var $tabpanel = $('#' + $tabbtn.attr('aria-controls'));
			var tabitem_index = $tabitem.index();
	
			if( $tabpanel.find('.swiper-container.type-coverflow').length ) {
	
				// 탭 이동시 처음 슬라이드 위치로 이동
				homeflowcard.flipcard.flipReset($tabpanel.find('.flipcard'));
				homeflowcard.flowswiper.mySwiper[tabitem_index].reInit();
				homeflowcard.flowswiper.mySwiper[tabitem_index].swipeTo(0, 0);
	
				// 탭 이동시 변경한 슬라이드 위치 변동 없음
				// homeflowcard.flipcard.flipReset($this_tabcontent.find('.flipcard'));
				// homeflowcard.flowswiper.mySwiper[tabitem_index].resizeFix()
			}
		});
	}

	// init();

	return {
		init : init,
	}
})();

function initHomeflowcard() {

	if( !$('.home-flowcard-wrap').length || $('.home-flowcard-wrap').data('init') === true ) {
		return;
	}

	$(document).ready(function() {
		hometab.init();
		homeflowcard.flipcard.init();
		homeflowcard.flowswiper.init();
		homeflowcard.flowtab.init();
	});

	$('.home-flowcard-wrap').data('init', true);
}
//end 2022_메인전시_단말컨포넌트UI개선


// 2022_메인전시_3차UI개선
function initHomepaysys() {
	if( !$('.home-paysys-wrap').length || $('.home-paysys-wrap').data('init') === true ) {
		return;
	}

	var SELECTOR = {
		tabitem : '.tab-item[data-tab="new-homepaysys"]',
		cardslider : '.swiper-container[data-homepaysys="cardslider"]',
	};

	var current_tabitem_index = 0;
	var swiper_cardslider = [];

	$(SELECTOR.cardslider).each(function(i) {
		swiper_cardslider[i] = $(this).swiper({
			slidesPerView: "auto",
			loop: false,
			pagination: $(this).find('.swiper-pagination')[0],
			paginationClickable: true,
			onSwiperCreated: function(swiper) {
				_setPagerButton(swiper);
				_setPagination(swiper);
				
				$(swiper.container).find('.swiper-button-prev').on('click', function(e) {
					e.preventDefault();
					swiper.swipePrev();
				});
				$(swiper.container).find('.swiper-button-next').on('click', function(e) {
					e.preventDefault();
					swiper.swipeNext();
				});
			},
			onSlideChangeStart : function(swiper) {
				_setPagerButton(swiper);
			}
		});
	});

	function _setPagination(swiper) {
		var $more_slide = $(swiper.slides).filter('.swiper-slide-more');

		if( $more_slide.length ) {
			$(swiper.container).find('.swiper-pagination').addClass('has-more');
		} else {
			$(swiper.container).find('.swiper-pagination').removeClass('has-more');
		}
	}

	function _setPagerButton(swiper) {
		var active_slide = swiper.activeSlide();
		var first_slide = swiper.getFirstSlide();
		var last_slide = $(swiper.slides).filter(':not(.swiper-slide-more)').last()[0];

		if( active_slide == first_slide ) {
			$(swiper.container).find('.swiper-button-prev').attr('disabled', true);
		} else {
			$(swiper.container).find('.swiper-button-prev').attr('disabled', false);
		}
		if( active_slide == last_slide ) {
			$(swiper.container).find('.swiper-button-next').attr('disabled', true);
		} else {
			$(swiper.container).find('.swiper-button-next').attr('disabled', false);
		}
	}

	$(SELECTOR.tabitem).off('click.homepaysys.tabitem').on('click.homepaysys.tabitem', function() {
		var this_tabitem_index = $(this).index();
		var this_swiper_index = $(SELECTOR.cardslider).index($(this).find(SELECTOR.cardslider));

		if( current_tabitem_index == this_tabitem_index ) {
			return;
		}

		if( this_swiper_index != -1 ) {
			swiper_cardslider[this_swiper_index].container.scrollLeft = 0;
			swiper_cardslider[this_swiper_index].swipeTo(0, 0);
		}

		current_tabitem_index = this_tabitem_index;
	});

	$('.home-paysys-wrap').data('init', true);
}
//end 2022_메인전시_3차UI개선


// 2023_메인개편_1차
//타이머, 프로그레스바
$( window ).on( "load", function() {
  // const timeLine = document.querySelector('.time-line-area');
  // const day = document.querySelector('.day');
  // const hour = document.querySelector('.hour');
  // const min = document.querySelector('.min');
  // const mark = document.querySelector('.day-mark');
  // let move;
  
  // function getTime(start, stop){
  //   const time = new Date();
  //   //const startTime = new Date("2023-01-16T00:00+0900"); //시작시간
  //   //const setTime = new Date("2023-01-31T00:00:00+0900"); //종료시간
  //   const startTime = new Date(start); //시작시간
  //   const setTime = new Date(stop); //종료시간
  //   const diff = setTime - time; 
  //   const diff2 = setTime - startTime; 
  //   let diffDay = Math.floor(diff / (1000*60*60*24)); 
  //   let diffHour =Math.floor((diff / (1000*60*60)) % 24); 
  //   let diffMin = Math.floor((diff / (1000*60)) % 60); 
  //   let allTime = Math.floor(diff2 / (1000*60)); 
  //   let remainTime = Math.floor((diff / (1000*60)) + 1); 
  //   //const allWidth = document.querySelector('.progress').clientWidth;
  //   const allWidth = 1030;
  //   let one = allWidth / allTime;
  //   let per =  allWidth -(remainTime * one); 
    
  //   if (diffMin === 59) {
  //     diffHour += 1;
  //     diffMin = 0;
  //   } else {
  //     diffMin += 1;
  //   }
  
  //   // day.innerText = `${diffDay<10 ? `0${diffDay}`:diffDay}`;
  //   day.innerText = diffDay;
  //   hour.innerText = `${diffHour<10 ? `0${diffHour}`:diffHour}`;
  //   min.innerText = `${diffMin<10 ? `0${diffMin}`:diffMin}`;
  
  
  //   if(diffDay <= 0) {
  //     day.innerText = 'DAY';
  //     //mark.style.display = 'none'; 
  //     document.querySelector('.progress-wrap').classList.add('on')
  //   }  
  
  //   if(diffHour < 0) {
  //     clearInterval(move);
  //     timeLine.style.display = 'none';
  //     document.querySelector('.stretch-banner').classList.add('top-space');
  //   }
  
  //   let elem = document.querySelector(".progress-bar");
  //   elem.style.width = (per - 4) + 'px';

  //   // setInterval(function() {
  //   //   elem.classList.add('line')
  //   // }, 2000);
    
  //   //console.log(diffHour);
  // };


  
  
  
  // //let move = setInterval(getTime, 1000, "2023-01-16T00:00+0900", "2023-01-31T00:00:00+0900");
  
  // function startTimer (start, stop){
  //   getTime(start, stop);
  //   move =  setInterval(getTime, 1000, start, stop);
  // }
  
  // startTimer("2023-07-01T18:01+0900", "2023-07-21T18:10:00+0900");

 
  
  
  //배너 늘어남
  let itemEl = $('.stretch-banner .banner-item');
  
  itemEl.hover(function(){
    itemEl.removeClass('wide');
    $(this).addClass('wide');
  });
  
  // 사전예약 스와이퍼
  // var benefitSwiper = new Swiper(".only-benefit-list .swiper-container", {
  //   loop: true,
  //   loopedSlides: 9,
  //   loopAdditionalSlides: 9,
  //   autoplay: {
  //     delay: 4000,
  //     disableOnInteraction: false,
  //   },
  //   speed : 3000,
  //   slidesPerView:3,
  //   autoplayDisableOnInteraction:false,
  // });
  
  // $('.only-benefit-list').on('mouseover', function(){
  //     benefitSwiper.stopAutoplay();
  // });
  // $('.only-benefit-list').on('mouseout', function(){
  //   benefitSwiper.startAutoplay();
  // });
  
  }); 

// 자급제폰 등록 페이지 js 추가 
var imeiCheckSpanEl = $('.used-wrap .used-cont > li.imei-item .imei-check-area .c-chk');
imeiCheckSpanEl.on('click', function(){
  if (imeiCheckSpanEl.hasClass('checked')) {
    $(this).parents('.used-cont').find('.hidden-item').removeClass('show');     
    $(this).parent('.imei-check-area').find('.imei-checked').removeClass('show').siblings().addClass('show'); 
  } else {
    $(this).parents('.used-cont').find('.hidden-item').addClass('show');      
    $(this).parent('.imei-check-area').find('.imei-unchecked').removeClass('show').siblings().addClass('show');
  }
});