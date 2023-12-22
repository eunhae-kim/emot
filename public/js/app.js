!(function ($) {
  'use strict';

  $(function () {
    // https://github.com/faisalman/ua-parser-js
    let parser = new UAParser();
    let getBrowser = parser.getBrowser();
    let getVersion = parseInt(getBrowser.version);
    // console.log(getBrowser.name, '-', getVersion);
    initUI.setup();
  });

  let initUI = (function (isLoaded) {
    var isLoaded;

    function setup (isLoaded) {
      if (isLoaded) return;
      isLoaded = true;
      
      // registUI('.modal', modal, 'selectMenu');
      registUI('.swiper-thumb', swiperThumb); // 슬라이드 case1
      registUI('.swiper-overlap', swiperOverlap);  // 슬라이드 case2
      registUI('.swiper-per', swiperPer);  // 슬라이드 case3
      registUI('.swiperVisual', swiperVisual);  // 상단 빅배너 컨트롤러
      registUI('.swiperControls', swiperControls);  // 일반 슬라이드 컨트롤러/totle pagination (1/3)
      registUI('.swiperCableTop', swiperCableTop);  // 상단 아이콘메뉴 슬라이드
      registUI('.list-group-accodian', searchAccodian); // 검색 아코디언
      registUI('.accodian-benefit', benefitAccodian); // 혜택 아코디언
      registUI('.my-detailed', moreDetail); // 혜택 상세보기
      registUI('.floating-area', floatingAction);  // 검색 - floating 
      registUI('.sub-store', mapOptionTop);  // 매장찾기(메인) 헤더높이에 따른 option-area top값 변동
      registUI('.store-time', storeTimeAccodian);  // 매장찾기(메인) 매장 정보 시간 accodian 
      registUI('.sub-store-detail', tabScroll);  // 매장찾기(매장상세) 화면 내 tab 이동 
      registUI('.content-info-agree', agreeAccodian); // 매장찾기- 상담예약-광고성 정보 수신 동의 아코디언

    }

    function registUI(el, fn, props) {
      let _inst;

      $(el).each(function (idx, obj) {
        _inst = new fn(props);
        _inst.init(obj, el);
      });
    }

    return {
      setup: setup,
    };
  })();


  /**
   * @name: swiperExample()
   * @description : 
   * @tag : <div class="swiper-slide-case1">
   * @url : modal.html
   */
  let swiperThumb = function () {
    let el,
      swiper

    function init (_el) {
      el = $(_el);

      swiper = new Swiper(_el, {
        speed: 500,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // autoHeight: true, 
        // calculateHeight:true,
      });
      return this;
    }

    return {
      init: init,
    };
  };

  let swiperOverlap = function () {
    let el,
      swiper

    function init (_el) {
      el = $(_el);
      swiper = new Swiper(_el, {
        speed: 500,
        slidesPerView: "auto",
        // spaceBetween: 8,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
      return this;
    }

    return {
      init: init,
    };
  };

  let swiperPer = function () {
    let el,
      swiper

    function init (_el) {
      el = $(_el);
      swiper = new Swiper(_el, {
        speed: 500,
        slidesPerView: "auto",
      //  spaceBetween: 8,
        pagination: {
       //   el: ".swiper-pagination",
       //   dynamicBullets: false,
       //   clickable: false,
        },
      });
      return this;
    }

    return {
      init: init,
    };
  };


  /**
   * @name: visual swiperExample()
   * @description :
   * @tag : <div class="banner-visual">
   * @url : banner.html
   */
   var swiperVisual = function () {
    var el,
      swiper

    function init (_el) {
      el = $(_el);
      $(".swiper-button-play").remove();
      swiper = new Swiper(_el, {
        speed: 4500,//22.11.03 5초 수정
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".visual-pagination", //페이징 태그 클래스 설정
          type: "bullets", //페이징 타입 설정(종류: bullets, fraction, progress, progressbar)
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
        observer: true,
        observeParents: true
      });
      return this;
    }

    //슬라이드 갯수
    var lists = $(".swiperVisual .swiper-slide").length;

    // 배너 오토롤링케이스
    $('#swPlay').hide();

    // 접근성 fcous 이동
    $('.swiperVisual .btn-controller').on('click', 'button', function(event) {
      event.preventDefault();
      var $target = event.target.tagName === 'I' ? $(event.target).closest('button') : $(event.target);
      var $icon = $target.find('i');
      var playStatus = $icon.hasClass('ic-btn-stop2');

      if (playStatus) {
        swiper.autoplay.stop();
        $icon.removeClass('ic-btn-stop2').addClass('ic-play');
        $target.find('.hidden').html('재생');
      } else {
        swiper.autoplay.start();
        $icon.removeClass('ic-play').addClass('ic-btn-stop2');
        $target.find('.hidden').html('정지');
      }
    })

    // 배너 슬라이드 컨트롤러 영역
    if (lists == 1) { //lists 가 1개일때
      //console.log(_this);
      $('#swVisualController').addClass('none');
    }

    return {
      init: init,
    };
  };


  let swiperControls = function () {
    let el,
      swiper

    function init (_el) {
      el = $(_el);
      swiper = new Swiper(_el, {
        speed: 500,
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        },
        pagination: {
          el: ".swiper-pagination", //페이징 태그 클래스 설정
          type: "fraction", //페이징 타입 설정(종류: bullets, fraction, progress, progressbar)
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        }
      });
      return this;
    }

    
    // 배너 오토롤링케이스
    $('#swPlay2').addClass('none');
    var lists = $(".swiperControls .swiper-slide").length;
    
    // start
    $('#swPlay2').click(function(){
      swiper.autoplay.start();
      $('#swPlay2').addClass('none');
      $('#swStop2').removeClass('none');
    });
    
    // stop
    $('#swStop2').click(function(){
      swiper.autoplay.stop();
      $('#swStop2').addClass('none');
      $('#swPlay2').removeClass('none');
    });

    // 배너 슬라이드 컨트롤러 영역
    if (lists == 1) { //lists 가 1개일때
      //console.log(lists);
      $('#swController').addClass('none');
    }

    return {
      init: init,
    };
  };

  let swiperCableTop = function () {
    let el,
      swiper

    function init (_el) {
      el = $(_el);
      swiper = new Swiper(_el, {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: false,
        pagination:false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      return this;
    }

    // 배너 오토롤링케이스
    var lists = $(".swiperCableTop .swiper-slide").length;
    console.log(lists);

 
    return {
      init: init,
    };
  };

  /**
   * @name: searchAccodian()
   * @description : 
   * @tag : <div class="list-group-accodian">
   * @url : .html
  */
  let searchAccodian = function (props) {
    let el,
        ACTIVE;

    function init (_el) {      
      el = $(_el),
      ACTIVE = 'active';

      el.find('button').on('click', function(){
        let _this = $(this),
            _li = _this.closest('li'),
            _sibling = _li.siblings('li'),
            _accodianCont = $('.accodian-cont'),
            _replaceText = _this.find('i span');

        //접힘 펼침
        _li
          .find(_accodianCont)
          .slideToggle(400)
          .end()
          _sibling.find(_accodianCont)
          .slideUp(400);
      
        //아이콘 변화
        _li
          .toggleClass(ACTIVE)
          .end()
          _sibling
          .removeClass(ACTIVE);

        //대체텍스트 변화
        !_li.hasClass(ACTIVE) ? _replaceText.html('펼치기') :  _replaceText.html('접기');
      });

      return this;
    }

    return {
      init: init,
    };
  };

  /**
   * @name: agreeAccodian()
   * @description : 
   * @tag : <div class="content-info-agree">
   * @url : .html
  */
   let agreeAccodian = function (props) {
    let el,
        ACTIVE;

    function init (_el) {      
      el = $(_el),
      ACTIVE = 'active';

      el.find('button').on('click', function(){
        let _this = $(this),
            _parent = _this.closest('.agree-check'),
            _accodianCont = _parent.next('.agree-desc'),
            _replaceText = _this.find('em');

            console.log(_accodianCont);
        //접힘 펼침
        _accodianCont.slideToggle(400);
      
        //아이콘 변화
        _parent.toggleClass(ACTIVE);

        //대체텍스트 변화
        !_parent.hasClass(ACTIVE) ? _replaceText.html('펼치기') :  _replaceText.html('접기');
      });

      return this;
    }

    return {
      init: init,
    };
  };

      /**
   * @name: benefitAccodian()
   * @description : 
   * @tag : <div class="benefit-accodian">
   * @url : .html
  */
    let benefitAccodian = function (props) {
    let el,
        ACTIVE;

    function init (_el) {      
      el = $(_el),
      ACTIVE = 'active';

      el.find('button').on('click', function(){
        let _this = $(this),
            _item = _this.closest('.accodian-item'),
            _sibling = _item.siblings('.accodian-item'),
            _accodianCont = $('.accodian-cont'),
            _replaceText = _this.find('i span');

        //접힘 펼침
        _item
          .find(_accodianCont)
          .slideToggle(400)
          .end()
          _sibling.find(_accodianCont)
          .slideUp(400);
      
        //아이콘 변화
        _item
          .toggleClass(ACTIVE)
          .end()
          _sibling
          .removeClass(ACTIVE);

        //대체텍스트 변화
        !_item.hasClass(ACTIVE) ? _replaceText.html('펼치기') :  _replaceText.html('접기');
      });

      return this;
    }

    return {
      init: init,
    };
  };

      /**
   * @name: moreDetail()
   * @description : 
   * @tag : <div class="my-detailed">
   * @url : .html
  */
       let moreDetail= function (props) {
        let el,
          ACTIVE;

    
        function init (_el) {      
          el = $(_el),
          ACTIVE = 'active',
    
          el.find('.btn-more').on('click',function(){
  
            let _this = $(this),
                _myDetailed = _this.closest('.my-detailed')

            _myDetailed
              .toggleClass(ACTIVE);
  
          });
  
          return this;
        }
    
        return {
          init: init,
        };
      };
  

    /**
   * @name: floating()
   * @description : 
   * @tag : <div class="floating-area">
   * @url : .html
  */
    let floatingAction = function (props) {
      let el,
        ACTIVE,
        OPEN,
        CLOSE;
  
      function init (_el) {      
        el = $(_el),
        ACTIVE = 'active',
        OPEN = 'ic-counsel',
        CLOSE = 'ic-tbar-cls';
  
        el.find('.btn-fix-counsel').on('click',function(){

          let _this = $(this),
              _floatingArea = _this.parent('.floating-area'),
              _replaceText = _this.find('.hidden'),
              _icon = _this.find('i');

          //상당톡 열고 닫힘
          _floatingArea
            .toggleClass(ACTIVE);

          //대체 텍스트 변화
          if( !_floatingArea.hasClass(ACTIVE) ) {
            _icon
            .addClass(OPEN)
            .removeClass(CLOSE)
            .end()
            _replaceText.html('상담톡 열기');
          } else {
            _icon
            .addClass(CLOSE)
            .removeClass(OPEN)
            .end()
            _replaceText.html('상담톡 닫기');
          }

        });

        return this;
      }
  
      return {
        init: init,
      };
    };


     /**
   * @name: tabScroll()
   * @description : 
   * @tag : <div class="sub-store-detail"">
   * @url : .html
  */
      let tabScroll = function (props) {
        let el,
          ACTIVE,
          tabItem,
          tabCont,
          storeInfo,
          storeEvent,
          storeReview;
    
        function init (_el) {      
          el = $(_el),
          ACTIVE = 'active',
          tabItem = el.find('.head-tab-wrap li'),
          tabCont = el.find('.store-detail-cont [class^="common-content"]'),
          storeInfo = el.find('#store-info').offset().top,
          storeEvent = el.find('#store-event').offset().top,
          storeReview = el.find('#store-review').offset().top,
    
          //클릭시 해당 컨텐츠 위치로 이동
          tabItem.find('a').on('click',function(event){
            let _this = $(this).closest('li');
            event.preventDefault();
            
            let targetIndex = _this.index();
            let targetContScroll = tabCont.eq(targetIndex).offset().top;
      
            //window 스크롤 이동
            $('html').animate({scrollTop : targetContScroll - 98 }, 400);
            //활성 tab 클래스(active) 추가
            tabItem.removeClass(ACTIVE);
            _this.addClass(ACTIVE);
  
          });

          //스크롤시 스크롤한 해당 영역 탭에 active
          tabItem.eq(0).addClass(ACTIVE);//스크롤 전에는 첫번째 탭에 항상 active

          $(window).on('scroll',function(){
            let windowScroll = $(window).scrollTop();
            
            tabItem.removeClass(ACTIVE);

            if ( windowScroll >=  0 && windowScroll <= storeInfo) {
              tabItem.eq(0).addClass(ACTIVE);
            } else if( windowScroll >  storeInfo  && windowScroll < storeEvent ) {
              tabItem.eq(1).addClass(ACTIVE);
            } else if( windowScroll >  storeEvent && windowScroll < storeReview ) {
              tabItem.eq(2).addClass(ACTIVE);
            } 
          });

          return this;
        }
    
        return {
          init: init,
        };
      };
      

    /**
     * @name: mapOptionTop()
     * @description : 
     * @tag : <div class="sub-store">
     * @url : .html
     */
    let mapOptionTop = function (props) {
      let el,
      storeHeader,
      storeMapOption,
      headerHeight;

      function init (_el) {
        el = $(_el),
        storeHeader = el.find('.tworld-sub-header'),
        storeMapOption = el.find('.map-option-area'),
        headerHeight = storeHeader.outerHeight();

        storeMapOption.css('top',headerHeight);

        return this;
      }

      return {
        init: init,
      };
    };
    
    /**
   * @name: storeTimeAccodian()
   * @description : 
   * @tag : <div class="store-time">
   * @url : .html
   */
  let storeTimeAccodian = function (props) {
    let el,
    timeAcodiantit,
    timeAccodianCont;

    function init (_el) {
      el = $(_el),
      timeAcodiantit = el.find('button'),
      timeAccodianCont = timeAcodiantit.next('.accodian-content');

      timeAcodiantit.on('click', function(){
        $(this)
        .next(timeAccodianCont).slideToggle(300)
        .end()
        .toggleClass('active');
        
      });

      return this;
    }

    return {
      init: init,
    };
  };

  /**
   * @name: modal()
   * @description : 
   * @tag : <div class="modal">
   * @url : .html
   */
  let modal = function (props) {
    let el,
      _body;

    function init (_el) {
      el = $(_el);
      _body = $('body');
      return this;
    }

    return {
      init: init,
    };
  };

  /**
   * function for developer
   * 개발 전용 메서드 정의
   * window.devFunc 전역 함수로 접근 가능
   */
  window.devFunc = (() => {
    let modal = {},
        floatingAction = {};

    /**
     * @name: devFunc.modal()
     * @description : 
     * @url : 공통
     */
    modal = (() => {
      let state = false,
        open = {},
        close = {};
      
      open = function () { }
      
      close = function () {}

      return {
        state: state,
        open: open,
        close: close,
      };
    })();

    /**
     * @name: devFunc.floatingAction.state()
     * @description : 
     * @url : 
     */
    floatingAction = (() => {
      return {
        state: () => {
          // https://scrollmagic.io/
          let controller = new ScrollMagic.Controller({globalSceneOptions: {duration: 500}});
          new ScrollMagic.Scene({
            triggerElement: ".floatingAction",
            duration: 100
          })
          .setClassToggle(".floating-area", "active-view")
          .addTo(controller);
        }
      }
    })();

    return {
      modal: modal,
      floatingAction: floatingAction,
    };
  })();
  
})(jQuery);
