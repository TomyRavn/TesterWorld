//===========================================================
// Banner
//===========================================================
/**
 * 배너 생성자<br>
 * 리스트 전체가 슬라이드 이동
 *
 * @name Banner
 * @class 배너 생성자
 * @param {String} container 컨테이너 셀렉터
 * @param {Object} [options] 옵션 객체
 * @param {String} [options.listSelector=ul:first] 리스트 영역 셀렉터 (컨테이너 기준)
 * @param {String} [options.thumbSelector=>div.paginate] 썸네일 영역 셀렉터 (컨테이너 기준)
 * @param {String} [options.arrowSelector=>div.set_btn] 좌우 영역 셀렉터 (컨테이너 기준)
 * @param {Boolean} [options.useCircular=true] 인덱스 순환 여부
 * @param {Boolean} [options.useWaitMove=true] 이동 중 동작 대기 여부
 * @param {Boolean} [options.useThumbButton=auto] 썸네일 버튼 사용 여부 [ auto:DOM이 있으면 사용 | true:DOM 생성 | false:DOM 숨김 ]
 * @param {Boolean} [options.useArrowButton=auto] 화살표 버튼 사용 여부 [ auto:DOM이 있으면 사용 | true:DOM 생성 | false:DOM 숨김 ]
 * @param {String} [options.actionType=item] 동작 유형 [ item | page ]
 * @param {String} [options.moveMethod=horizontal] 이동 방법 [ horizontal | vertical ]
 * @param {Number} [options.viewSize=1] 뷰포트 크기 (노출될 아이템 수)
 * @param {Number} [options.pageSize=1] 페이지 크기 (페이지 아이템 수)
 * @param {Number} [options.itemWidth] 아이템 넓이
 * @param {Number} [options.itemHeight] 아이템 높이
 * @param {Number} [options.itemIndex=0] 시작 아이템 인덱스
 * @param {Number} [options.animateDuration=500] 이동 애니메이션 시간
 * @param {String} [options.animateEasing=easeOutQuad] 이동 애니메이션 이징
 * @param {Number} [options.autoInterval=0] 자동 이동 타이머 호출 간격 (0이면 중지)
 */
function Banner() {
	if ( arguments.length ) {
		this._constructor.apply( this, arguments );
	}
};

/**
 * 생성자
 *
 * @private
 * @function
 * @param {String} container 컨테이너 셀렉터
 * @param {Object} [options] 옵션 객체
 */
Banner.prototype._constructor = function( container, options ) {
	//옵션
	this.options = {
		listSelector: 'ul:first',
		thumbSelector: '>div.paginate',
		arrowSelector: '>div.set_btn',
		useCircular: true,
		useWaitMove: true,
		useThumbButton: 'auto',
		useArrowButton: 'auto',
		actionType: 'item',
		moveMethod: 'horizontal',
		viewSize: 1,
		pageSize: 1,
		itemWidth: null,
		itemHeight: null,
		itemIndex: 0,
		animateDuration: 500,
		animateEasing: 'easeOutQuad',
		autoInterval: 0
	};

	//멤버
	this.uuid = Math.random().toString( 36 ).substr( 2, 9 );
	this.$CommonEvent = $( CommonEvent );
	this.$instance = $( this );
	this.$container = $( container );
	this.$list;
	this.$listItems;
	this.bannerThumb = new BannerThumb( container );
	this.bannerArrow = new BannerArrow( container );
	this.pageLength;
	this.pageIndex;
	this.itemIndex;
	this.itemLength;
	this.itemWidth;
	this.itemHeight;
	this.actionSelect;
	this.actionNext;
	this.actionLength;
	this.actionIndex;
	this.actionTimer;
	this.isOver;
	this.isStop;
	this.isInit;

	//리소스 초기화
	this.init( options );
};

/**
 * 옵션 확장
 *
 * @function
 * @param {Object} [options] 옵션 객체
 * @returns {Object} 옵션 객체
 */
Banner.prototype.extendOption = function( options ) {
	return $.extend( this.options, options );
};

/**
 * 리소스 초기화
 *
 * @function
 * @param {Object} [options] 옵션 객체
 */
Banner.prototype.init = function( options ) {
	var self = this,
		opts = this.extendOption( options ),
		$container = this.$container,
		typeLow = opts.actionType.toLowerCase(),
		typeCap = typeLow.substring( 0, 1 ).toUpperCase() + typeLow.substring( 1 );

	if ( typeLow !== 'item' && typeLow !== 'page' ) {
		throw 'options.actionType must be item or page.';
	}

	if ( opts.pageSize > opts.viewSize ) {
		throw 'options.pageSize must be options.viewSize or less.';
	}

	if ( this.isInit ) {
		this.release();
	}

	this.stopAuto();
	this.$list = $container.find( opts.listSelector );
	this.actionSelect = 'select' + typeCap;
	this.actionNext = 'next' + typeCap;
	this.actionLength = typeLow + 'Length';
	this.actionIndex = typeLow + 'Index';
	this.actionTimer = null;
	this.isOver = false;
	this.isStop = false;

	this._initList();
	this.bannerThumb.init( this[ this.actionLength ], options );
	this.bannerArrow.init( this[ this.actionLength ], options );
	this.bindEvent();
	this.isInit = true;

	if ( opts.itemIndex > -1 ) {
		setTimeout( function() {
			self.selectItem( opts.itemIndex, true );
		}, 1 );
	}
};

/**
 * 리소스 해제
 *
 * @function
 */
Banner.prototype.release = function() {
	this.unbindEvent();
	this.isInit = false;
};

/**
 * 리스트 영역 초기화
 *
 * @private
 * @function
 */
Banner.prototype._initList = function() {
	var opts = this.options,
		$list = this.$list,
		$listItems = $list.children(),
		itemLength = $listItems.length,
		itemWidth = opts.itemWidth || $listItems.first().outerWidth( true ),
		itemHeight = opts.itemHeight || $listItems.first().outerHeight( true ),
		moveMethod = opts.moveMethod;

	//멤버 갱신
	this.$listItems = $listItems;
	this.pageLength = Math.ceil( Math.max( 0, itemLength - opts.viewSize ) / opts.pageSize ) + Number( itemLength > 0 );
	this.pageIndex = -1;
	this.itemLength = itemLength;
	this.itemIndex = -1;
	this.itemWidth = itemWidth;
	this.itemHeight = itemHeight;

	//스타일 갱신
	$listItems.each(function( i ) {
		if ( moveMethod === 'vertical' ) {
			$( this ).css({ position:'absolute', top:itemHeight * i, left:0 });
		}
		else {
			$( this ).css({ position:'absolute', top:0, left:itemWidth * i });
		}
	});

	$list.stop( true ).css({
		top: ( moveMethod === 'vertical' ) ? 0 : '',
		left: ( moveMethod !== 'vertical' ) ? 0 : '',
		width: ( moveMethod !== 'vertical' ) ? ( itemWidth * itemLength ) : itemWidth,
		height: ( moveMethod === 'vertical' ) ? ( itemHeight * itemLength ) : itemHeight
	});
};

/**
 * 이벤트 등록
 *
 * @private
 * @function
 */
Banner.prototype.bindEvent = function() {
	var self = this,
		$CommonEvent = this.$CommonEvent,
		$container = this.$container,
		$listItems = this.$list.children(),
		eNameSpace = '.' + this.uuid;

	//자동 이동 타이머 시작/정지
	$CommonEvent.on( CommonEvent.TIMELINE_OPEN + eNameSpace, function() {
		self.stopAuto();
	});

	$CommonEvent.on( CommonEvent.TIMELINE_CLOSE + eNameSpace, function() {
		self.startAuto();
	});

	//컨테이너 호버
	$container.on( 'mouseenter' + eNameSpace, function() {
		if ( ! self.isStop ) {
			self.isOver = true;
			self.stopAuto();
		}
	});

	$container.on( 'mouseleave' + eNameSpace, function() {
		if ( self.isOver ) {
			self.isOver = false;
			self.startAuto();
		}
	});

	//아이템 클릭
	$listItems.on( 'click' + eNameSpace, function() {
		self.selectItem( $listItems.index( this ) );
	});

	//배너 썸네일 클릭
	$( this.bannerThumb ).on( 'SELECT_INDEX' + eNameSpace, function( event, index ) {
		self[ self.actionSelect ]( index );
	});

	//배너 화살표 클릭
	$( this.bannerArrow ).on( 'SELECT_INDEX' + eNameSpace, function( event, index ) {
		self[ self.actionSelect ]( index, true );
	});
};

/**
 * 이벤트 해제
 *
 * @private
 * @function
 */
Banner.prototype.unbindEvent = function() {
	var eNameSpace = '.' + this.uuid;

	this.$CommonEvent.off( eNameSpace );
	this.$container.off( eNameSpace );
	this.$listItems.off( eNameSpace );
	$( this.bannerThumb ).off( eNameSpace );
	$( this.bannerArrow ).off( eNameSpace );
};

/**
 * 인덱스 계산
 *
 * @function
 * @param {String} type 인덱스 유형 [ item | page ]
 * @param {Number} index 계산할 인덱스
 * @returns {Object} 계산된 인덱스 정보
 */
Banner.prototype.calcIndex = function( type, index ) {
	var self = this,
		opts = this.options,
		length = this[ type + 'Length' ],
		saved = this[ type + 'Index' ],
		diff = ( saved < 0 ? 0 : index - saved );

	if ( length === 0 ) {
		index = -1;
	}
	else {
		if ( opts.useCircular ) {
			index = ( ( index % length ) + length ) % length;
		}
		else {
			if ( index < 0 ) {
				index = 0;
			}
			else if ( index > length - 1 ) {
				index = length - 1;
			}
		}
	}

	return {
		length: length,
		saved: saved,
		index: index,
		diff: diff
	};
};

/**
 * 아이템 선택
 *
 * @function
 * @param {Number} index 아이템 인덱스
 * @param {Boolean} [short] 최단 거리 여부
 * @returns {Boolean} 성공 여부
 */
Banner.prototype.selectItem = function( index, short ) {
	var self = this,
		opts = this.options,
		stop = this.isStop,
		calc = this.calcIndex( 'item', index ),
		wait = opts.useWaitMove && ( this.$list.is( ':animated' ) || this.$listItems.filter( ':animated' ).length );

	if ( wait || calc.index === calc.saved ) {
		return false;
	}

	this.stopAuto();
	this.itemIndex = calc.index;
	this.updateUI();
	this.$instance.trigger( 'SELECT_ITEM', this.getInfo() );

	if ( ! stop ) {
		this.startAuto();
	}

	this.syncPage( short );
	return true;
};

/**
 * 페이지 선택
 *
 * @function
 * @param {Number} index 페이지 인덱스
 * @param {Boolean} [short] 최단 거리 여부
 * @returns {Boolean} 성공 여부
 */
Banner.prototype.selectPage = function( index, short ) {
	var self = this,
		opts = this.options,
		stop = this.isStop,
		calc = this.calcIndex( 'page', index ),
		wait = opts.useWaitMove && ( this.$list.is( ':animated' ) || this.$listItems.filter( ':animated' ).length );

	if ( wait || calc.index === calc.saved ) {
		return false;
	}

	this.stopAuto();
	this.pageIndex = calc.index;
	this.updateUI();
	this.$instance.trigger( 'SELECT_PAGE', this.getInfo() );

	if ( ! stop ) {
		this.startAuto();
	}

	this._movePage( calc, short );
	return true;
};

/**
 * 페이지 싱크
 *
 * @function
 * @param {Boolean} [short] 최단 거리 여부
 */
Banner.prototype.syncPage = function( short ) {
	var self = this,
		opts = this.options,
		viewSize = opts.viewSize,
		pageSize = opts.pageSize,
		pageLength = this.pageLength,
		pageIndex = Math.max( 0, this.pageIndex ),
		itemLength = this.itemLength,
		itemIndex = this.itemIndex,
		diff = pageLength,
		page = pageIndex;

	if ( itemLength === 0 ) {
		return;
	}

	//페이지별 아이템 범위 계산
	for ( var i = 0; i < pageLength; i += 1 ) {
		var pg = ( pageIndex + i ) % pageLength,
			st = ( pg * pageSize ) % itemLength,
			ed = st + viewSize - 1,
			no = ( itemIndex >= st ) ? itemIndex : ( itemIndex + itemLength );

		//선택된 아이템이 속한 페이지일 경우 최단 거리 계산
		if ( no >= st && no <= ed ) {
			var f = ( pg > pageIndex ) ? ( pg - pageIndex ) : ( pg + pageLength - pageIndex ) % pageLength,
				b = ( pg < pageIndex ) ? ( pageIndex - pg ) : ( pageIndex + pageLength - pg ) % pageLength,
				d = Math.min( f, b );

			if ( d < Math.abs( diff ) ) {
				diff = ( f === d ? d : -d );
				page = pg;
			}
		}

		if ( diff === 0 ) {
			break;
		}
	}

	//페이지 선택
	if ( page !== this.pageIndex ) {
		if ( short ) {
			page = pageIndex + diff;
		}

		this.selectPage( page, short );
	}
};

/**
 * 페이지 이동
 *
 * @private
 * @function
 * @param {Object} calc 계산된 인덱스 정보
 */
Banner.prototype._movePage = function( calc ) {
	var opts = this.options,
		moveMethod = opts.moveMethod,
		itemSize = ( moveMethod === 'vertical' ) ? this.itemHeight : this.itemWidth,
		posAttr = ( moveMethod === 'vertical' ) ? 'top' : 'left',
		posMaxi = -itemSize * Math.max( 0, this.itemLength - opts.viewSize ),
		posNext = -itemSize * opts.pageSize * calc.index,
		posProp = {};

	posProp[ posAttr ] = Math.max( posNext, posMaxi );

	if ( calc.saved < 0 ) {
		this.$list.stop( true ).css( posProp );
	}
	else {
		this.$list.stop( true ).animate( posProp, opts.animateDuration, opts.animateEasing );
	}
};

/**
 * UI 갱신
 *
 * @function
 */
Banner.prototype.updateUI = function() {
	var self = this,
		opts = this.options,
		$listItems = this.$list.children(),
		itemLength = this.itemLength,
		itemIndex = this.itemIndex,
		typeLength = this[ this.actionLength ],
		typeIndex = this[ this.actionIndex ];

	$listItems.removeClass( 'on ').children( 'a' ).removeClass( 'on' );
	if ( itemIndex >= 0 ) {
		var $e = $listItems.filter( function( i ) {
			return i % itemLength === itemIndex;
		});

		$e.addClass( 'on' ).children( 'a' ).addClass( 'on' );
	}

	this.bannerThumb.setIndex( typeIndex );
	this.bannerArrow.setIndex( typeIndex );
};

/**
 * 이전 아이템 선택
 *
 * @function
 * @returns {Boolean} 성공 여부
 */
Banner.prototype.prevItem = function() {
	return this.selectItem( this.itemIndex - 1, true );
};

/**
 * 다음 아이템 선택
 *
 * @function
 * @returns {Boolean} 성공 여부
 */
Banner.prototype.nextItem = function() {
	return this.selectItem( this.itemIndex + 1, true );
};

/**
 * 이전 페이지 선택
 *
 * @function
 * @returns {Boolean} 성공 여부
 */
Banner.prototype.prevPage = function() {
	return this.selectPage( this.pageIndex - 1, true );
};

/**
 * 다음 페이지 선택
 *
 * @function
 * @returns {Boolean} 성공 여부
 */
Banner.prototype.nextPage = function() {
	return this.selectPage( this.pageIndex + 1, true );
};

/**
 * 자동 이동 타이머 시작
 *
 * @function
 */
Banner.prototype.startAuto = function() {
	var self = this,
		opts = this.options;

	if ( ! opts.useCircular || this[ this.actionLength ] <= 1 || opts.autoInterval < opts.animateDuration + 100 ) {
		return;
	}

	clearTimeout( this.actionTimer );
	this.actionTimer = setTimeout( function() {
		self[ self.actionNext ]();
	}, opts.autoInterval );
	this.isStop = false;
};

/**
 * 자동 이동 타이머 정지
 *
 * @function
 */
Banner.prototype.stopAuto = function() {
	var self = this;

	clearTimeout( this.actionTimer );
	this.actionTimer = null;
	this.isStop = true;
};

/**
 * 정보 반환
 *
 * @function
 * @return {Object} 배너 정보
 */
Banner.prototype.getInfo = function() {
	return {
		$list: this.$list,
		$items: this.$listItems,
		$selectedItem: this.$listItems.eq( this.itemIndex ),
		pageLength: this.pageLength,
		pageIndex: this.pageIndex,
		itemLength: this.itemLength,
		itemIndex: this.itemIndex
	};
};



//====================================================================================================
// Jump Banner
//====================================================================================================
/**
 * 점프 배너 생성자<br>
 * 선택한 인덱스의 아이템/페이지로 바로 이동<br>
 * 옵션 중 순환 사용 여부는 사용으로 고정<br>
 * 옵션 중 뷰포트 크기는 1로 고정<br>
 * 옵션 중 페이지 크기는 1로 고정
 *
 * @name JumpBanner
 * @extends Banner
 * @class 점프 배너 생성자
 * @param {String} container 컨테이너 셀렉터
 * @param {Object} [options] 옵션 객체
 * @param {String} [options.moveMethod=fadein] 이동 방법 [ fade | fadein | fadeinslide | horizontal | vertical ]
 * @see Banner.options
 */
function JumpBanner() {
	if ( arguments.length ) {
		this._constructor.apply( this, arguments );
	}
};
JumpBanner.prototype = new Banner();
JumpBanner.prototype.constructor = JumpBanner;
JumpBanner.prototype._parent = Banner.prototype;

/**
 * 옵션 확장
 *
 * @override
 * @function
 * @param {Object} [options] 옵션 객체
 * @returns {Object} 옵션 객체
 */
JumpBanner.prototype.extendOption = function( options ) {
	return $.extend( this.options, { moveMethod:'fadein' }, options, { useCircular:true, viewSize:1, pageSize:1 } );
};

/**
 * 리스트 영역 초기화
 *
 * @private
 * @override
 * @function
 */
JumpBanner.prototype._initList = function() {
	//SUPER
	this._parent._initList.apply( this );

	//스타일 갱신
	this.$list.stop( true ).css({ width:this.itemWidth, height:this.itemHeight });
	this.$listItems.stop( true ).css({ display:'none', top:0, left:0, opacity:1 });
	this.$listItems.eq( 0 ).css({ display:'block' });
};

/**
 * 페이지 이동
 *
 * @private
 * @override
 * @function
 * @param {Object} calc 계산된 인덱스 정보
 * @param {Boolean} [short] 최단 거리 여부
 */
JumpBanner.prototype._movePage = function( calc, short ) {
	var opts = this.options,
		$items = this.$listItems,
		$newItem = $items.eq( calc.index ),
		$oldItem = $items.not( $newItem ),
		moveMethod = opts.moveMethod,
		animateDuration = opts.animateDuration,
		animateEasing = opts.animateEasing;

	$items.stop( true );

	if ( calc.saved < 0 ) {
		$newItem.show();
		$oldItem.hide();
		return;
	}

	if ( moveMethod === 'horizontal' || moveMethod === 'vertical' ) {
		var itemSize = ( moveMethod === 'vertical' ) ? this.itemHeight : this.itemWidth,
			posAttr = ( moveMethod === 'vertical' ) ? 'top' : 'left',
			posProp0 = {},
			posProp1 = {},
			posProp2 = {};

		posProp0[ posAttr ] = 0;
		posProp1[ posAttr ] = ( calc.diff < 0 ? -itemSize : itemSize );
		posProp2[ posAttr ] = ( calc.diff < 0 ? itemSize : -itemSize );

		$oldItem.animate( posProp2, animateDuration, animateEasing );
		$newItem.show().css( posProp1 ).animate( posProp0, animateDuration, animateEasing, function() {
			$oldItem.hide();
		});
	}
	else if ( moveMethod === 'fade' ) {
		$oldItem.fadeTo( animateDuration, 0, animateEasing );
		$newItem.fadeTo( animateDuration, 1, animateEasing, function() {
			$oldItem.hide();
		});
	}
	else if ( moveMethod === 'fadeinslide' ) {
		$oldItem.css({ zIndex:1 });
		$newItem.css({ display:'block', zIndex:2, left:20, opacity:0 }).animate({ left:0, opacity:1 }, animateDuration, animateEasing, function() {
			$oldItem.hide();
		});
	}
	else { //moveMethod:fadein
		$oldItem.css({ zIndex:1 });
		$newItem.css({ zIndex:2, opacity:0 }).fadeTo( animateDuration, 1, animateEasing, function() {
			$oldItem.hide();
		});
	}
};



//====================================================================================================
// Loop Banner
//====================================================================================================
/**
 * 루프 배너 생성자<br>
 * 리스트 전체가 슬라이드 이동<br>
 * 옵션 중 순환 사용 여부는 사용으로 고정
 *
 * @name LoopBanner
 * @extends Banner
 * @class 루프 배너 생성자
 * @param {String} container 컨테이너 셀렉터
 * @param {Object} [options] 옵션 객체
 * @see Banner.options
 */
function LoopBanner() {
	if ( arguments.length ) {
		this._constructor.apply( this, arguments );
	}
};
LoopBanner.prototype = new Banner();
LoopBanner.prototype.constructor = LoopBanner;
LoopBanner.prototype._parent = Banner.prototype;

/**
 * 옵션 확장
 *
 * @override
 * @function
 * @param {Object} [options] 옵션 객체
 * @returns {Object} 옵션 객체
 */
LoopBanner.prototype.extendOption = function( options ) {
	return $.extend( this.options, options, { useCircular:true } );
};

/**
 * 리스트 영역 초기화
 *
 * @private
 * @override
 * @function
 */
LoopBanner.prototype._initList = function() {
	var self = this,
		opts = this.options,
		$list = this.$list,
		$listItems = $list.children( ':not(.fake)' ),
		itemLength = $listItems.length,
		itemWidth = opts.itemWidth || $listItems.first().outerWidth( true ),
		itemHeight = opts.itemHeight || $listItems.first().outerHeight( true ),
		viewSize = opts.viewSize,
		pageSize = opts.pageSize,
		moveMethod = opts.moveMethod;

	//페이크 아이템 제거
	$list.children( '.fake' ).remove();

	//페이크 아이템 생성
	if ( itemLength > viewSize ) {
		for ( var i = 0; i < viewSize; i += 1 ) {
			var $e = $listItems.eq( i % itemLength ).clone( true );

			$list.append( $e.removeAttr( 'id' ).addClass( 'fake' ) );
		}
	}

	//멤버 갱신
	this.$listItems = $listItems;
	this.pageLength = ( itemLength <= viewSize ) ? 1 : ( ( itemLength % pageSize === 0 ) ? ( itemLength / pageSize ) : itemLength );
	this.pageIndex = -1;
	this.itemLength = itemLength;
	this.itemIndex = -1;
	this.itemWidth = itemWidth;
	this.itemHeight = itemHeight;

	//스타일 갱신
	$list.children().each(function( i ) {
		if ( moveMethod === 'vertical' ) {
			$( this ).css({ position:'absolute', top:itemHeight * i, left:0 });
		}
		else {
			$( this ).css({ position:'absolute', top:0, left:itemWidth * i });
		}
	});

	$list.stop( true ).css({
		top: ( moveMethod === 'vertical' ) ? 0 : '',
		left: ( moveMethod !== 'vertical' ) ? 0 : '',
		width: ( moveMethod !== 'vertical' ) ? ( itemWidth * $list.children().length ) : itemWidth,
		height: ( moveMethod === 'vertical' ) ? ( itemHeight * $list.children().length ) : itemHeight
	});

	$list.data({ top:0, left:0 });
};

/**
 * 페이지 이동
 *
 * @private
 * @override
 * @function
 * @param {Object} calc 계산된 페이지 인덱스 정보
 * @param {Boolean} [short] 최단 거리 여부
 */
LoopBanner.prototype._movePage = function( calc, short ) {
	var opts = this.options,
		$list = this.$list,
		moveMethod = opts.moveMethod,
		itemSize = ( moveMethod === 'vertical' ) ? this.itemHeight : this.itemWidth,
		posAttr = ( moveMethod === 'vertical' ) ? 'top' : 'left',
		posTotl = itemSize * opts.pageSize * this.pageLength,
		posMaxi = itemSize * this.itemLength,
		posFake = $list.data( posAttr ),
		posNext = -itemSize * opts.pageSize * ( calc.saved + calc.diff ),
		posMove = posNext - posFake;

	if ( calc.saved < 0 ) {
		var fake = ( -itemSize * opts.pageSize * calc.index ) % posTotl,
			real = ( fake - posMaxi ) % posMaxi;

		$list.stop( true ).css( posAttr, real );
		$list.data( posAttr, fake );
	}
	else {
		$list.stop( true ).prop({ temp:0 }).animate({ temp:posMove }, {
			duration: opts.animateDuration,
			easing: opts.animateEasing,
			step: function( now ) {
				var fake = ( posFake + now - posTotl ) % posTotl,
					real = ( fake - posMaxi ) % posMaxi;

				$list.css( posAttr, real );
				$list.data( posAttr, fake );
			}
		});
	}
};



//====================================================================================================
// Banner Thumb
//====================================================================================================
/**
 * 배너 썸네일 생성자
 *
 * @name BannerThumb
 * @class 배너 썸네일 생성자
 * @param {String} container 컨테이너 셀렉터
 * @param {Object} [options] 옵션 객체
 * @param {String} [options.thumbSelector=>div.paginate] 썸네일 영역 셀렉터 (컨테이너 기준)
 * @param {Boolean} [options.useThumbButton=auto] 썸네일 버튼 사용 여부 [ auto:DOM이 있으면 사용 | true:DOM 생성 | false:DOM 숨김 ]
 * @param {Boolean} [options.useCircular=true] 인덱스 순환 여부
 * @param {Boolean} [options.useStandalone=false] 자립 모드 여부 [ true:선택 시 인덱스 갱신 | false:선택 시 이벤트 발생 ]
 */
function BannerThumb( container, options ) {
	//옵션
	this.options = $.extend( {
		thumbSelector: '>div.paginate',
		useThumbButton: 'auto',
		useCircular: true,
		useStandalone: false
	}, options );

	//멤버
	this.$instance = $( this );
	this.$container = $( container );
	this.$thumb;
	this.$thumbItems;
	this.totalLength;
	this.savedIndex;
	this.isInit;
};

/**
 * 리소스 초기화
 *
 * @function
 * @param {Number} totalLength 전체 개수
 * @param {Object} [options] 옵션 객체
 */
BannerThumb.prototype.init = function( totalLength, options ) {
	var opts = $.extend( this.options, options );

	if ( this.isInit ) {
		this.release();
	}

	this.$thumb = this.$container.find( opts.thumbSelector );
	this.totalLength = totalLength;
	this.savedIndex = -1;
	this._createDOM();
	this.bindEvent();
	this.updateUI();
	this.isInit = true;
};

/**
 * 리소스 해제
 *
 * @function
 */
BannerThumb.prototype.release = function() {
	this.unbindEvent();
	this.isInit = false;
};

/**
 * 이벤트 등록
 *
 * @function
 */
BannerThumb.prototype.bindEvent = function() {
	var $instance = this.$instance,
		$thumbItems = this.$thumbItems,
		useStandalone = this.options.useStandalone;

	//썸네일 버튼 클릭
	this.$thumb.on( 'click', 'a', function( event ) {
		event.preventDefault();

		if ( useStandalone ) {
			self.setIndex( $thumbItems.index( this ) );
		}
		else {
			$instance.trigger( 'SELECT_INDEX', $thumbItems.index( this ) );
		}
	});
};

/**
 * 이벤트 해제
 *
 * @function
 */
BannerThumb.prototype.unbindEvent = function() {
	this.$thumb.off();
};

/**
 * DOM 생성
 *
 * @private
 * @function
 */
BannerThumb.prototype._createDOM = function() {
	var $thumb = this.$thumb,
		useThumbButton = this.options.useThumbButton,
		totalLength = this.totalLength;

	if ( useThumbButton === true && totalLength > 0 ) {
		$thumb.remove();
		$thumb = this.$thumb = $( '<div class="paginate"><span class="page_num"></span></div>' );
		$thumb.appendTo ( this.$container );

		for ( var i = 0, $n = $thumb.children(); i < totalLength; i += 1 ) {
			$n.append( '<a href="#">' + ( i + 1 ) + '</a>' );
		}
	}

	if ( useThumbButton === false || totalLength <= 1 ) {
		$thumb.hide();
	}
	else {
		$thumb.show();
	}

	this.$thumbItems = $thumb.find( 'a' );
};

/**
 *  인덱스 설정
 *
 * @function
 * @param {Number} index 인덱스
 */
BannerThumb.prototype.setIndex = function( index ) {
	var useCircular = this.options.useCircular,
		totalLength = this.totalLength;

	if ( useCircular ) {
		index = ( ( index % totalLength ) + totalLength ) % totalLength;
	}
	else {
		if ( index < 0 ) {
			index = 0;
		}
		else if ( index > totalLength - 1 ) {
			index = totalLength - 1;
		}
	}

	if ( index !== this.savedIndex ) {
		this.savedIndex = index;
		this.updateUI();
		this.$instance.trigger( 'CHANGE_INDEX', index );
	}
};

/**
 * UI 갱신
 *
 * @function
 */
BannerThumb.prototype.updateUI = function() {
	var $thumbItems = this.$thumbItems,
		savedIndex = this.savedIndex;

	$thumbItems.removeClass( 'on' );

	if ( savedIndex > -1 ) {
		$thumbItems.eq( savedIndex ).addClass( 'on' );
	}
};



//====================================================================================================
// Banner Arrow
//====================================================================================================
/**
 * 배너 화살표 생성자
 *
 * @name BannerArrow
 * @class 배너 화살표 생성자
 * @param {String} container 컨테이너 셀렉터
 * @param {Object} [options] 옵션 객체
 * @param {String} [options.arrowSelector=>div.set_btn] 화살표 영역 셀렉터 (컨테이너 기준)
 * @param {Boolean} [options.useArrowButton=auto] 화살표 버튼 사용 여부 [ auto:DOM이 있으면 사용 | true:DOM 생성 | false:DOM 숨김 ]
 * @param {Boolean} [options.useCircular=true] 인덱스 순환 여부
 * @param {Boolean} [options.useStandalone=false] 자립 모드 여부 [ true:선택 시 인덱스 갱신 | false:선택 시 이벤트 발생 ]
 */
function BannerArrow( container, options ) {
	//옵션
	this.options = $.extend( {
		arrowSelector: '>div.set_btn',
		useArrowButton: 'auto',
		useCircular: true,
		useStandalone: false
	}, options);

	//멤버
	this.$instance = $( this );
	this.$container = $( container );
	this.$arrow;
	this.$arrowPrev;
	this.$arrowNext;
	this.totalLength;
	this.savedIndex;
	this.isInit;
};

/**
 * 리소스 초기화
 *
 * @function
 * @param {Number} totalLength 전체 개수
 * @param {Object} [options] 옵션 객체
 */
BannerArrow.prototype.init = function( totalLength, options ) {
	var opts = $.extend( this.options, options );

	if ( this.isInit ) {
		this.release();
	}

	this.$arrow = this.$container.find( opts.arrowSelector );
	this.totalLength = totalLength;
	this.savedIndex = -1;
	this._createDOM();
	this.bindEvent();
	this.updateUI();
	this.isInit = true;
};

/**
 * 리소스 해제
 *
 * @function
 */
BannerArrow.prototype.release = function() {
	this.unbindEvent();
	this.isInit = false;
};

/**
 * 이벤트 등록
 *
 * @function
 */
BannerArrow.prototype.bindEvent = function() {
	var self = this,
		$instance = this.$instance,
		$arrowPrev = this.$arrowPrev,
		$arrowNext = this.$arrowNext,
		useCircular = this.options.useCircular,
		useStandalone = this.options.useStandalone;

	//좌측 버튼 클릭,호버
	$arrowPrev.on({
		click: function() {
			if ( useStandalone ) {
				self.setIndex( self.savedIndex - 1 );
			}
			else {
				$instance.trigger( 'SELECT_INDEX', self.savedIndex - 1 );
			}
		},
		mouseenter: function() {
			if ( self.totalLength > 1 && ( useCircular || self.savedIndex > 0 ) ) {
				$arrowPrev.addClass( 'over' );
			}
		},
		mouseleave: function() {
			$arrowPrev.removeClass( 'over' );
		}
	});

	//우측 버튼 클릭,호버
	$arrowNext.on({
		click: function() {
			if ( useStandalone ) {
				self.setIndex( self.savedIndex + 1 );
			}
			else {
				$instance.trigger( 'SELECT_INDEX', self.savedIndex + 1 );
			}
		},
		mouseenter: function() {
			if ( self.totalLength > 1 && ( useCircular || self.savedIndex < self.totalLength - 1 ) ) {
				$arrowNext.addClass( 'over' );
			}
		},
		mouseleave: function() {
			$arrowNext.removeClass( 'over' );
		}
	});
};

/**
 * 이벤트 해제
 *
 * @function
 */
BannerArrow.prototype.unbindEvent = function() {
	this.$arrowPrev.off();
	this.$arrowNext.off();
};

/**
 * DOM 생성
 *
 * @private
 * @function
 */
BannerArrow.prototype._createDOM = function() {
	var $arrow = this.$arrow,
		useArrowButton = this.options.useArrowButton,
		totalLength = this.totalLength;

	if ( useArrowButton === true && totalLength > 0 ) {
		$arrow.remove();
		$arrow = this.$arrow = $(
			'<div class="set_btn type02">' +
			'	<button type="button" class="btn_ico move22 prev"><span><span>이전 페이지</span></span></button>' +
			'	<button type="button" class="btn_ico move22 next"><span><span>다음 페이지</span></span></button>' +
			'</div>'
		);
		$arrow.appendTo( this.$container );
	}

	if ( useArrowButton === false || totalLength <= 1 ) {
		$arrow.hide();
	}
	else {
		$arrow.show();
	}


	this.$arrowPrev = $arrow.find( '.prev' );
	this.$arrowNext = $arrow.find( '.next' );
};

/**
 * 인덱스 설정
 *
 * @function
 * @param {Number} index 인덱스
 */
BannerArrow.prototype.setIndex = function( index ) {
	var useCircular = this.options.useCircular,
		totalLength = this.totalLength;

	if ( useCircular ) {
		index = ( ( index % totalLength ) + totalLength ) % totalLength;
	}
	else {
		if ( index < 0 ) {
			index = 0;
		}
		else if ( index > totalLength - 1 ) {
			index = totalLength - 1;
		}
	}

	if ( index !== this.savedIndex ) {
		this.savedIndex = index;
		this.updateUI();
		this.$instance.trigger( 'CHANGE_INDEX', index );
	}
};

/**
 * UI 갱신
 *
 * @function
 */
BannerArrow.prototype.updateUI = function() {
	var useCircular = this.options.useCircular,
		totalLength = this.totalLength,
		savedIndex = this.savedIndex;

	if ( ! useCircular && savedIndex <= 0 ) {
		this.$arrowPrev.removeClass( 'over' );
	}

	if ( ! useCircular && savedIndex >= totalLength - 1 ) {
		this.$arrowNext.removeClass( 'over' );
	}
};



//====================================================================================================
//Flow Banner
//====================================================================================================
/**
* 플로우 배너 생성자
*
* @name FlowBanner
* @class 플로우 배너 생성자
* @param {Mixed} container 컨테이너 셀렉터
* @param {Object} [options] 옵션 객체
* @param {String} [options.listSelector=ul:first] 리스트 영역 셀렉터 (컨테이너 기준)
* @param {String} [options.itemWidth=null] 아이템 넓이
* @param {String} [options.itemHeight=null] 아이템 높이
* @param {Number} [options.animateDuration=1000] 이동 애니메이션 시간
* @param {Number} [options.animateFrame=60] 이동 애니메이션 프레임 수
*/
function FlowBanner( container, options ) {
	this.options = {
		listSelector: 'ul:first',
		itemWidth: null,
		itemHeight: null,
		animateDuration: 1000,
		animateFrame: 60
	};

	this.uuid = Math.random().toString( 36 ).substr( 2, 9 );
	this.$CommonEvent = $( CommonEvent );
	this.$instance = $( this );
	this.$container = $( container );
	this.$list;
	this.$items;
	this.listWidth;
	this.itemLength;
	this.itemWidth;
	this.itemHeight;
	this.autoInterval;
	this.autoDistance;
	this.autoTimer;

	this.init( options );
};

/**
* 인스턴스 초기화
*
* @function
* @param {Object} [options] 옵션 객체
*/
FlowBanner.prototype.init = function( options ) {
	var opts = $.extend( this.options, options ),
		$list = this.$container.find( opts.listSelector ),
		$items = $list.children( ':not(.fake)' ),
		$first = $items.first(),
		itemLength = $items.length,
		itemWidth = opts.itemWidth || $first.outerWidth( true ),
		itemHeight = opts.itemHeight || $first.outerHeight( true );

	if ( this.$list ) {
		this.release();
	}

	this.$list = $list;
	this.$items = $items;
	this.listWidth = itemWidth * itemLength;
	this.itemLength = itemLength;
	this.itemWidth = itemWidth;
	this.itemHeight = itemHeight;
	this.autoInterval = opts.animateDuration / opts.animateFrame;
	this.autoDistance = itemWidth / opts.animateFrame;

	$list.append( $first.clone( true ).removeAttr( 'id' ).addClass( 'fake' ) );
	$list.stop( true ).css({ left:0, width:( itemWidth * $list.children().length ), height:itemHeight });

	this.bindEvent();
};

/**
* 인스턴스 해제
*
* @function
*/
FlowBanner.prototype.release = function() {
	this.unbindEvent();
	this.stopAuto();
	this.$list.children( '.fake' ).remove();
};

/**
* 이벤트 등록
*
* @function
*/
FlowBanner.prototype.bindEvent = function() {
	var self = this,
		$CommonEvent = this.$CommonEvent,
		$container = this.$container,
		eNameSpace = '.' + this.uuid;

	//타임라인 여닫이
	$CommonEvent.on( CommonEvent.TIMELINE_OPEN + eNameSpace, function() {
		self.stopAuto();
	});
	$CommonEvent.on( CommonEvent.TIMELINE_CLOSE + eNameSpace, function() {
		self.startAuto();
	});

	//컨테이너 호버
	$container.on( 'mouseenter' + eNameSpace, function() {
		self.startAuto();
	});
	$container.on( 'mouseleave' + eNameSpace, function() {
		self.stopAuto();
	});
};

/**
* 이벤트 해제
*
* @function
*/
FlowBanner.prototype.unbindEvent = function() {
	var eNameSpace = '.' + this.uuid;

	this.$CommonEvent.off( eNameSpace );
	this.$container.off( eNameSpace );
};

/**
* 자동 이동 시작
*
* @function
* @param {Boolean} [isRestart] 재시작 여부
*/
FlowBanner.prototype.startAuto = function( isRestart ) {
	var $list = this.$list,
		maxX = this.listWidth,
		perX = this.autoDistance,
		curX = isRestart ? 0 : parseInt( $list.css( 'left' ), 10 );

	clearInterval( this.autoTimer );
	$list.css({ left:curX });

	this.autoTimer = setInterval( function() {
		curX = ( curX - perX ) % maxX;
		$list.css({ left:curX })
	}, this.autoInterval );
};

/**
* 자동 이동 정지
*
* @function
*/
FlowBanner.prototype.stopAuto = function() {
	clearInterval( this.autoTimer );
	this.autoTimer = null;
};
