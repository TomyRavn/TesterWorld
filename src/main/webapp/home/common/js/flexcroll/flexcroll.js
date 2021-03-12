/*
This license text has to stay intact at all times:
fleXcroll Public License Version
Cross Browser Custom Scroll Bar Script by Hesido.
Public version - Free for non-commercial uses.

This script cannot be used in any commercially built
web sites, or in sites that relates to commercial
activities. This script is not for re-distribution.
For licensing options:
Contact Emrah BASKAYA @ www.hesido.com

Derivative works are only allowed for personal uses,
and they cannot be redistributed.

FleXcroll Public Key Code: 20050907122003339
MD5 hash for this license: 9ada3be4d7496200ab2665160807745d

End of license text---
*/
//fleXcroll v2.1.1
var fleXenv = {
    fleXlist: [],
    fleXcrollInit: function () {
        if (document.getElementById) {
            document.write('<style type="text/css">.flexcroll-hide-default {overflow: hidden !important;}</style>')
        };
        this.addTrggr(window, 'load', this.globalInit)
    },
    fleXcrollMain: function (h) {
        var j = document,
            wD = window,
            nV = navigator;
        if (!j.getElementById || !j.createElement) return;
        if (typeof (h) == 'string') h = document.getElementById(h);
        if (h == null || nV.userAgent.indexOf('OmniWeb') != -1 || ((nV.userAgent.indexOf('AppleWebKit') != -1 || nV.userAgent.indexOf('Safari') != -1) && !(typeof (HTMLElement) != 'undefined' && HTMLElement.prototype)) || nV.vendor == 'KDE' || (nV.platform.indexOf('Mac') != -1 && nV.userAgent.indexOf('MSIE') != -1)) {
            if (h != null) classChange(h, 'flexcroll-failed', 'flexcroll-hide-default');
            if (window.onfleXcrollFail) window.onfleXcrollFail(h);
            return
        };
        if (h.fleXcroll) {
            h.fleXcroll.updateScrollBars();
            return
        };
        if (fleXenv.checkHidden(h)) return;
        if (!h.id || h.id == '') {
            var k = 'flex__',
                c = 1;
            while (document.getElementById(k + c) != null) {
                c++
            };
            h.id = k + c
        }
        h.fleXdata = {};
        h.fleXcroll = {};
        var l = h.id,
            sC = h.fleXdata,
            sfU = h.fleXcroll;
        sC.keyAct = {
            _37: ['-1s', 0],
            _38: [0, '-1s'],
            _39: ['1s', 0],
            _40: [0, '1s'],
            _33: [0, '-1p'],
            _34: [0, '1p'],
            _36: [0, '-100p'],
            _35: [0, '+100p']
        };
        sC.wheelAct = ['-2s', '2s'];
        sC.actionVal = {
            stepBack: '-1s',
            stepFwd: '1s',
            pageBack: '-1p',
            pageFwd: '1p'
        };
        sC.touchMul = [1, 1];
        sC.scrollPosition = [
            [false, false],
            [false, false]
        ];
        var m = createDiv('contentwrapper', false, true),
            mDv = createDiv('mcontentwrapper', false, true),
            tDv = createDiv('scrollwrapper', false, true),
            pDv = createDiv('copyholder', false, true);
        var o = createDiv('domfixdiv', false, true),
            fDv = createDiv('zoomdetectdiv', false, true),
            stdMode = false;
        pDv.sY.border = '1px solid blue';
        pDv.fHide();
        h.style.overflow = 'hidden';
        fDv.sY.fontSize = '12px';
        fDv.sY.height = '1em';
        fDv.sY.width = '1em';
        fDv.sY.position = 'absolute';
        fDv.sY.zIndex = '-999';
        fDv.fHide();
        var p = h.offsetHeight,
            brdWidth = h.offsetWidth;
        copyStyles(h, pDv, '0px', ['border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width']);
        var q = h.offsetHeight,
            intlWidth = h.offsetWidth,
            brdWidthLoss = brdWidth - intlWidth,
            brdHeightLoss = p - q;
        var s = (h.scrollTop) ? h.scrollTop : 0,
            oScrollX = (h.scrollLeft) ? h.scrollLeft : 0;
        var t = document.location.href,
            uReg = /#([^#.]*)$/;
        var u = '|TEXTAREA|INPUT|SELECT|OPTION|';
        var w = '|SELECT|OPTION|';
        sC.scroller = [];
        sC.forcedBar = [];
        sC.containerSize = sC.cntRSize = [];
        sC.contentSize = sC.cntSize = [];
        sC.edge = [false, false];
        sC.touchPrevent = false;
        sC.touchFlick = false;
        sC.barSize = [0, 0];
        sC.reqS = [];
        sC.barSpace = [0, 0];
        sC.forcedHide = [];
        sC.forcedPos = [];
        sC.paddings = [];
        sC.externaL = [false, false];
        sC.touchPos = [0, 0];
        sC.moveDelta = [0, 0];
        sC.tooNarrow = [false, false];
        sC.keyProc = 0;
        sC.keyAproc = 0;
        while (h.firstChild) {
            m.appendChild(h.firstChild)
        };
        m.appendChild(o);
        h.appendChild(mDv);
        h.appendChild(pDv);
        var x = getStyle(h, 'position');
        if (x != 'absolute' && x != 'fixed') {
            h.style.position = x = 'relative'
        };
        if (x == 'fixed') h.style.position = 'absolute';
        h.style.outline = "none";
        var y = getStyle(h, 'text-align');
        h.style.textAlign = 'left';
        mDv.sY.width = '100px';
        mDv.sY.height = '100px';
        mDv.sY.top = '0px';
        mDv.sY.left = '0px';
        copyStyles(h, pDv, '0px', ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']);
        var z = h.offsetWidth,
            postHeight = h.offsetHeight,
            mHeight;
        mHeight = mDv.offsetHeight;
        mDv.sY.borderBottom = '2px solid black';
        if (mDv.offsetHeight > mHeight) stdMode = true;
        mDv.sY.borderBottomWidth = '0px';
        copyStyles(pDv, h, false, ['padding-left', 'padding-top', 'padding-right', 'padding-bottom']);
        findPos(mDv);
        findPos(h);
        sC.paddings[0] = mDv.yPos - h.yPos;
        sC.paddings[2] = mDv.xPos - h.xPos;
        h.style.paddingTop = getStyle(h, 'padding-bottom');
        h.style.paddingLeft = getStyle(h, 'padding-right');
        findPos(mDv);
        findPos(h);
        sC.paddings[1] = mDv.yPos - h.yPos;
        sC.paddings[3] = mDv.xPos - h.xPos;
        h.style.paddingTop = getStyle(pDv, 'padding-top');
        h.style.paddingLeft = getStyle(pDv, 'padding-left');
        var A = sC.paddings[2] + sC.paddings[3],
            padHeightComp = sC.paddings[0] + sC.paddings[1];
        h.style.position = x;
        mDv.style.textAlign = y;
        copyStyles(h, mDv, false, ['padding-left', 'padding-right', 'padding-top', 'padding-bottom']);
        tDv.sY.width = h.offsetWidth + 'px';
        tDv.sY.height = h.offsetHeight + 'px';
        mDv.sY.width = z + 'px';
        mDv.sY.height = postHeight + 'px';
        tDv.sY.position = 'absolute';
        tDv.sY.top = '0px';
        tDv.sY.left = '0px';
        sC.tDivZ = tDv.sY.zIndex;
        mDv.appendChild(m);
        h.appendChild(tDv);
        tDv.appendChild(fDv);
        m.sY.position = 'relative';
        mDv.sY.position = 'relative';
        m.sY.top = '0';
        m.sY.width = '100%';
        mDv.sY.overflow = 'hidden';
        mDv.sY.left = '-' + sC.paddings[2] + 'px';
        mDv.sY.top = '-' + sC.paddings[0] + 'px';
        sC.zTHeight = fDv.offsetHeight;
        sC.getContentWidth = function () {
            var a = m.childNodes,
                maxCWidth = compPad = 0,
                DsizE = h.offsetWidth;
            for (var i = 0; i < a.length; i++) {
                if (a[i].offsetWidth) {
                    maxCWidth = Math.max(a[i].offsetWidth, maxCWidth)
                }
            };
            sC.tooNarrow[0] = (DsizE <= sC.barSpace[0]) ? true : false;
            sC.cntRSize[0] = ((sC.reqS[1] && !sC.forcedHide[1] && !sC.tooNarrow[0]) || sC.forcedBar[1]) ? DsizE - sC.barSpace[0] : DsizE;
            sC.cntSize[0] = maxCWidth + A;
            return sC.cntSize[0]
        };
        sC.getContentHeight = function () {
            var a = h.offsetHeight;
            sC.tooNarrow[1] = (a <= sC.barSpace[1]) ? true : false;
            sC.cntRSize[1] = ((sC.reqS[0] && !sC.forcedHide[0] && !sC.tooNarrow[1]) || sC.forcedBar[0]) ? a - sC.barSpace[1] : a;
            sC.cntSize[1] = m.offsetHeight + padHeightComp - 2;
            return sC.cntSize[1]
        };
        sC.fixIEDispBug = function () {
            if (fleXenv.ieDisableFix) return;
            m.sY.display = 'none';
            m.sY.display = 'block'
        };
        sC.setWidth = function () {
            mDv.setSize[0]((stdMode) ? (sC.cntRSize[0] - A - brdWidthLoss) : sC.cntRSize[0])
        };
        sC.setHeight = function () {
            mDv.setSize[1]((stdMode) ? (sC.cntRSize[1] - padHeightComp - brdHeightLoss) : sC.cntRSize[1])
        };
        sC.createScrollBars = function () {
            sC.getContentWidth();
            sC.getContentHeight();
            tDv.vrt = new Array();
            var a = tDv.vrt;
            createScrollBars(a, 'vscroller', 1);
            a.barPadding = [parseInt(getStyle(a.sBr, 'padding-top')), parseInt(getStyle(a.sBr, 'padding-bottom'))];
            a.sBr.sY.padding = '0px';
            a.sBr.curPos = 0;
            a.sBr.vertical = true;
            a.sBr.indx = 1;
            m.vBar = a.sBr;
            prepareScroll(a, 0);
            sC.barSpace[0] = (sC.externaL[1]) ? 0 : Math.min(a.sDv.offsetWidth, sC.cntRSize[0]);
            sC.setWidth();
            tDv.hrz = new Array();
            var b = tDv.hrz;
            createScrollBars(b, 'hscroller', 0);
            b.barPadding = [parseInt(getStyle(b.sBr, 'padding-left')), parseInt(getStyle(b.sBr, 'padding-right'))];
            b.sBr.sY.padding = '0px';
            b.sBr.curPos = 0;
            b.sBr.vertical = false;
            b.sBr.indx = 0;
            m.hBar = b.sBr;
            if (wD.opera) b.sBr.sY.position = 'relative';
            prepareScroll(b, 0);
            sC.barSpace[1] = (sC.externaL[0]) ? 0 : Math.min(b.sDv.offsetHeight, sC.cntRSize[1]);
            sC.setHeight();
            tDv.sY.height = h.offsetHeight + 'px';
            b.jBox = createDiv('scrollerjogbox');
            tDv.appendChild(b.jBox);
            b.jBox.onmousedown = function () {
                b.sBr.scrollBoth = true;
                sC.goScroll = b.sBr;
                b.sBr.clicked = true;
                b.sBr.moved = false;
                tDv.vrt.sBr.moved = false;
                fleXenv.addTrggr(j, 'selectstart', retFalse);
                fleXenv.addTrggr(j, 'mousemove', mMoveBar);
                fleXenv.addTrggr(j, 'mouseup', mMouseUp);
                return false
            }
        };
        sC.goScroll = null;
        sC.createScrollBars();
        this.putAway(o, tDv);
        if (!this.addChckTrggr(h, 'mousewheel', mWheelProc) || !this.addChckTrggr(h, 'DOMMouseScroll', mWheelProc)) {
            h.onmousewheel = mWheelProc
        };
        this.addChckTrggr(h, 'mousewheel', mWheelProc);
        this.addChckTrggr(h, 'DOMMouseScroll', mWheelProc);
        this.addChckTrggr(m, 'touchstart', handleTouch);
        this.addChckTrggr(tDv, 'touchstart', handleTouch);
        h.setAttribute('tabIndex', '-1');
        this.addTrggr(h, 'keydown', function (e) {
            if (!e) {
                var e = wD.event
            };
            var a = e.keyCode,
                cTrgt = (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
            if (cTrgt && cTrgt.nodeName && u.indexOf('|' + cTrgt.nodeName + '|') > -1) return;
            sfU.mDPosFix();
            sC.pkeY = a;
            if (sC.keyAct['_' + a]) {
                sfU.setScrollPos(sC.keyAct['_' + a][0], sC.keyAct['_' + a][1], true);
                sC.keyProc++;
                if (e.preventDefault) e.preventDefault();
                return false
            } else {
                sC.pkeY = "nonval"
            }
        });
        this.addTrggr(h, 'keypress', function (e) {
            if (!e) {
                var e = wD.event
            };
            var a = sC.pkeY,
                cTrgt = (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
            if (cTrgt && cTrgt.nodeName && u.indexOf('|' + cTrgt.nodeName + '|') > -1) return;
            if (sC.keyAct['_' + a]) {
                sC.keyAproc++;
                if (sC.keyProc >= sC.keyAproc) return;
                sfU.setScrollPos(sC.keyAct['_' + a][0], sC.keyAct['_' + a][1], true);
                if (e.preventDefault) e.preventDefault();
                return false
            }
        });
        this.addTrggr(h, 'keyup', function () {
            sC.pkeY = false;
            sC.keyProc = sC.keyAproc = 0
        });
        this.addTrggr(j, 'mouseup', intClear);
        this.addTrggr(h, 'mousedown', handleTextSelect);

        function handleTextSelect(e) {
            if (!e) e = wD.event;
            var a = (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
            if (!a || (a.className && typeof (a.className) == 'string' && a.className.match(RegExp('\\bscrollgeneric\\b')))) return;
            sC.inMposX = e.clientX;
            sC.inMposY = e.clientY;
            pageScrolled();
            findPos(h);
            intClear();
            fleXenv.addTrggr(j, 'mousemove', tSelectMouse);
            sC.mTBox = [h.xPos + 10, h.xPos + sC.cntRSize[0] - 10, h.yPos + 10, h.yPos + sC.cntRSize[1] - 10]
        };

        function tSelectMouse(e) {
            if (!e) e = wD.event;
            var a = e.clientX,
                mY = e.clientY,
                mdX = a + sC.xScrld,
                mdY = mY + sC.yScrld;
            sC.mOnXEdge = (mdX < sC.mTBox[0] || mdX > sC.mTBox[1]) ? 1 : 0;
            sC.mOnYEdge = (mdY < sC.mTBox[2] || mdY > sC.mTBox[3]) ? 1 : 0;
            sC.xAw = a - sC.inMposX;
            sC.yAw = mY - sC.inMposY;
            sC.sXdir = (sC.xAw > 40) ? 1 : (sC.xAw < -40) ? -1 : 0;
            sC.sYdir = (sC.yAw > 40) ? 1 : (sC.yAw < -40) ? -1 : 0;
            if ((sC.sXdir != 0 || sC.sYdir != 0) && !sC.tSelectFunc) sC.tSelectFunc = wD.setInterval(function () {
                if (sC.sXdir == 0 && sC.sYdir == 0) {
                    wD.clearInterval(sC.tSelectFunc);
                    sC.tSelectFunc = false;
                    return
                };
                pageScrolled();
                if (sC.mOnXEdge == 1 || sC.mOnYEdge == 1) sfU.setScrollPos((sC.sXdir * sC.mOnXEdge) + 's', (sC.sYdir * sC.mOnYEdge) + 's', true)
            }, 45)
        };

        function intClear() {
            fleXenv.remTrggr(j, 'mousemove', tSelectMouse);
            if (sC.tSelectFunc) wD.clearInterval(sC.tSelectFunc);
            sC.tSelectFunc = false;
            if (sC.barClickRetard) wD.clearTimeout(sC.barClickRetard);
            if (sC.barClickScroll) wD.clearInterval(sC.barClickScroll)
        };

        function flickClear(a) {
            if (sC.touchFlick) {
                window.clearInterval(sC.touchFlick);
                sC.touchFlick = false
            }
            if (!a) {
                tDv.sY.zIndex = sC.tDivZ;
                sC.moveDelta = [0, 0];
                sC.touchMoved = false
            }
        };

        function pageScrolled() {
            sC.xScrld = (wD.pageXOffset) ? wD.pageXOffset : (j.documentElement && j.documentElement.scrollLeft) ? j.documentElement.scrollLeft : 0;
            sC.yScrld = (wD.pageYOffset) ? wD.pageYOffset : (j.documentElement && j.documentElement.scrollTop) ? j.documentElement.scrollTop : 0
        };
        h.scrollUpdate = sfU.updateScrollBars = function (a) {
            if (tDv.getSize[1]() === 0 || tDv.getSize[0]() === 0) return;
            var b = sC.reqS[0],
                reqV = sC.reqS[1],
                vBr = tDv.vrt,
                hBr = tDv.hrz,
                vUpReq, hUpReq, cPSize = [];
            tDv.sY.width = h.offsetWidth - brdWidthLoss + 'px';
            tDv.sY.height = h.offsetHeight - brdHeightLoss + 'px';
            cPSize[0] = sC.cntRSize[0];
            cPSize[1] = sC.cntRSize[1];
            sC.reqS[0] = sC.getContentWidth() > sC.cntRSize[0];
            sC.reqS[1] = sC.getContentHeight() > sC.cntRSize[1];
            var c = (b != sC.reqS[0] || reqV != sC.reqS[1] || cPSize[0] != sC.cntRSize[0] || cPSize[1] != sC.cntRSize[1]) ? true : false;
            vBr.sDv.setVisibility(sC.reqS[1]);
            hBr.sDv.setVisibility(sC.reqS[0]);
            vUpReq = (sC.reqS[1] || sC.forcedBar[1]);
            hUpReq = (sC.reqS[0] || sC.forcedBar[0]);
            sC.getContentWidth();
            sC.getContentHeight();
            sC.setHeight();
            sC.setWidth();
            if (!sC.reqS[0] || !sC.reqS[1] || sC.forcedHide[0] || sC.forcedHide[1]) hBr.jBox.fHide();
            else hBr.jBox.fShow(); if (vUpReq) updateBarSize(vBr, (hUpReq && !sC.forcedHide[0]) ? sC.barSpace[1] : 0);
            else m.sY.top = '-1px'; if (hUpReq) updateBarSize(hBr, (vUpReq && !sC.forcedHide[1]) ? sC.barSpace[0] : 0);
            else m.sY.left = '-1px'; if (c && !a) sfU.updateScrollBars(true);
            sC.edge[0] = sC.edge[1] = false
        };
        h.contentScroll = sfU.setScrollPos = function (a, b, c, d) {
            var e;
            if ((a || a === 0) && sC.scroller[0]) {
                a = calcCScrollVal(a, 0);
                e = tDv.hrz.sBr;
                e.trgtScrll = (c) ? Math.min(Math.max(e.mxScroll, e.trgtScrll - a), 0) : -a;
                e.realScrollPos()
            }
            if ((b || b === 0) && sC.scroller[1]) {
                b = calcCScrollVal(b, 1);
                e = tDv.vrt.sBr;
                e.trgtScrll = (c) ? Math.min(Math.max(e.mxScroll, e.trgtScrll - b), 0) : -b;
                e.realScrollPos()
            }
            if (!c) sC.edge[0] = sC.edge[1] = false;
            if (h.onfleXcroll && !d) h.onfleXcroll();
            return sC.scrollPosition
        };
        sfU.scrollContent = function (a, b) {
            return sfU.setScrollPos(a, b, true)
        };
        sfU.scrollToElement = function (a) {
            if (a == null || !isddvChild(a)) return;
            var b = findRCpos(a);
            sfU.setScrollPos(b[0] + sC.paddings[2], b[1] + sC.paddings[0], false);
            sfU.setScrollPos(0, 0, true)
        };
        copyStyles(pDv, h, '0px', ['border-left-width', 'border-right-width', 'border-top-width', 'border-bottom-width']);
        this.putAway(pDv, tDv);
        h.scrollTop = 0;
        h.scrollLeft = 0;
        this.fleXlist[this.fleXlist.length] = h;
        classChange(h, 'flexcrollactive', false);
        m.sY.padding = '1px';
        sfU.updateScrollBars();
        sfU.setScrollPos(oScrollX, s, true);
        if (t.match(uReg)) {
            sfU.scrollToElement(j.getElementById(t.match(uReg)[1]))
        };
        sC.sizeChangeDetect = wD.setInterval(function () {
            var n = fDv.offsetHeight;
            if (n != sC.zTHeight) {
                sfU.updateScrollBars();
                sC.zTHeight = n
            }
        }, 2500);

        function calcCScrollVal(v, i) {
            var a = v.toString();
            v = parseFloat(a);
            return parseInt((a.match(/p$/)) ? v * sC.cntRSize[i] * 0.9 : (a.match(/s$/)) ? v * sC.cntRSize[i] * 0.1 : v)
        };

        function getStyle(a, b) {
            return fleXenv.getStyle(a, b)
        };

        function copyStyles(a, b, c, d) {
            var e = new Array();
            for (var i = 0; i < d.length; i++) {
                e[i] = fleXenv.camelConv(d[i]);
                b.style[e[i]] = getStyle(a, d[i], e[i]);
                if (c) a.style[e[i]] = c
            }
        };

        function createDiv(b, c, d, e, f) {
            var g = (e) ? e : j.createElement('div');
            if (!e) {
                g.id = l + '_' + b;
                g.className = (d) ? b : b + ' scrollgeneric'
            };
            g.getSize = [
                function () {
                    return g.offsetWidth
                },
                function () {
                    return g.offsetHeight
                }
            ];
            g.setSize = (f) ? [retFalse, retFalse] : [
                function (a) {
                    g.sY.width = Math.max(a, 1) + 'px'
                },
                function (a) {
                    g.sY.height = Math.max(a, 1) + 'px'
                }
            ];
            g.getPos = [
                function () {
                    return getStyle(g, 'left')
                },
                function () {
                    return getStyle(g, 'top')
                }
            ];
            g.setPos = (f) ? [retFalse, retFalse] : [
                function (a) {
                    g.sY.left = a
                },
                function (a) {
                    g.sY.top = a
                }
            ];
            g.fHide = function () {
                g.sY.visibility = 'hidden'
            };
            g.fShow = function (a) {
                g.sY.visibility = (a) ? getStyle(a, 'visibility') : 'visible'
            };
            g.sY = g.style;
            if (c) g.fleXdata = c;
            return g
        };

        function createScrollBars(a, b, c) {
            var d = document.getElementById(l + '-flexcroll-' + b);
            var e = (d != null) ? true : false;
            a.sFDv = createDiv(b + 'basebeg', {
                action: 'stepBack'
            });
            a.sSDv = createDiv(b + 'baseend', {
                action: 'stepFwd'
            });
            a.sMDv = createDiv(b + 'basemid');
            a.sFBr = createDiv(b + 'barbeg');
            a.sSBr = createDiv(b + 'barend');
            a.sMBr = createDiv(b + 'barmid');
            a.sFFb = createDiv(b + 'fill', {
                action: 'pageBack'
            });
            a.sFRb = createDiv(b + 'rest', {
                action: 'pageFwd'
            });
            if (e) {
                a.sDv = createDiv(false, {
                    action: 'pageBack'
                }, false, d, true);
                sC.externaL[c] = true;
                a.sBr = createDiv(false, false, false, fleXenv.getByClassName(d, 'div', 'flexcroll-scrollbar')[0])
            } else {
                a.sDv = createDiv(b + 'base', {
                    action: 'pageBack'
                });
                a.sBr = createDiv(b + 'bar');
                tDv.appendChild(a.sDv);
                a.sDv.appendChild(a.sBr);
                a.sDv.appendChild(a.sFDv);
                a.sDv.appendChild(a.sSDv);
                a.sDv.appendChild(a.sMDv);
                a.sBr.appendChild(a.sFBr);
                a.sBr.appendChild(a.sMBr);
                a.sBr.appendChild(a.sSBr)
            };
            a.sDv.appendChild(a.sFRb);
            a.sDv.appendChild(a.sFFb)
        };

        function prepareScroll(c, d) {
            var f = c.sDv,
                sBr = c.sBr,
                i = sBr.indx;
            sBr.trgtScrll = 0;
            sBr.minPos = c.barPadding[0];
            c.padLoss = c.barPadding[0] + c.barPadding[1];
            sBr.ofstParent = f;
            sBr.mDv = mDv;
            sBr.scrlTrgt = m;
            sBr.targetSkew = 0;
            updateBarSize(c, d, true);
            sBr.doBarPos = function (a) {
                if (!a) sBr.curPos = parseInt((sBr.trgtScrll * sBr.maxPos) / sBr.mxScroll);
                sBr.curPos = (Math.min(Math.max(sBr.curPos, 0), sBr.maxPos));
                sBr.setPos[i](sBr.curPos + sBr.minPos + 'px');
                if (!sBr.targetSkew) sBr.targetSkew = sBr.trgtScrll - parseInt((sBr.curPos / sBr.sRange) * sBr.mxScroll);
                sBr.targetSkew = (sBr.curPos == 0) ? 0 : (sBr.curPos == sBr.maxPos) ? 0 : (!sBr.targetSkew) ? 0 : sBr.targetSkew;
                if (a) {
                    sBr.trgtScrll = parseInt((sBr.curPos / sBr.sRange) * sBr.mxScroll);
                    m.setPos[i](sBr.trgtScrll + sBr.targetSkew - 1 + 'px');
                    sC.scrollPosition[i] = [-sBr.trgtScrll - sBr.targetSkew, -sBr.mxScroll]
                };
                setFiller((i == 0) ? tDv.hrz : tDv.vrt, i)
            };
            sBr.realScrollPos = function () {
                sBr.curPos = parseInt((sBr.trgtScrll * sBr.sRange) / sBr.mxScroll);
                sBr.curPos = (Math.min(Math.max(sBr.curPos, 0), sBr.maxPos));
                m.setPos[i](sBr.trgtScrll - 1 + 'px');
                sC.scrollPosition[i] = [-sBr.trgtScrll, -sBr.mxScroll];
                sBr.targetSkew = false;
                sBr.doBarPos(false)
            };
            sC.barZ = getStyle(sBr, 'z-index');
            sBr.sY.zIndex = (sC.barZ == 'auto' || sC.barZ == '0' || sC.barZ == 'normal') ? 2 : sC.barZ;
            mDv.sY.zIndex = getStyle(sBr, 'z-index');
            sBr.onmousedown = function () {
                sBr.clicked = true;
                sC.goScroll = sBr;
                sBr.scrollBoth = false;
                sBr.moved = false;
                fleXenv.addTrggr(j, 'selectstart', retFalse);
                fleXenv.addTrggr(j, 'mousemove', mMoveBar);
                fleXenv.addTrggr(j, 'mouseup', mMouseUp);
                return false
            };
            sBr.onmouseover = intClear;
            f.onmousedown = f.ondblclick = function (e) {
                if (!e) {
                    var e = wD.event
                };
                var a = (e.target) ? e.target : (e.srcElement) ? e.srcElement : false;
                if (!a) return;
                var b = [0, 0];
                sfU.mDPosFix();
                findPos(sBr);
                b[sBr.indx] = (a.fleXdata && a.fleXdata.action) ? sC.actionVal[a.fleXdata.action] : 0;
                if (!sC.touchMoved) sfU.setScrollPos(b[0], b[1], true);
                else sC.touchMoved = false; if (e.type != 'dblclick') {
                    intClear();
                    sC.barClickRetard = wD.setTimeout(function () {
                        sC.barClickScroll = wD.setInterval(function () {
                            sfU.setScrollPos(b[0], b[1], true)
                        }, 80)
                    }, 425)
                };
                return false
            };
            f.setVisibility = function (r) {
                if (r) {
                    f.fShow(h);
                    sC.forcedHide[i] = (getStyle(f, 'visibility') == 'hidden' || sC.externaL[i] || sC.tooNarrow[1 - i]) ? true : false;
                    if (sC.tooNarrow[1 - i]) f.fHide();
                    if (!sC.forcedHide[i] || sC.externaL[i]) sBr.fShow(h);
                    else if (!sC.externaL[i]) sBr.fHide();
                    sC.scroller[i] = true;
                    classChange(f, '', 'flexinactive')
                } else {
                    f.fHide();
                    sBr.fHide();
                    sC.forcedBar[i] = (getStyle(f, 'visibility') != 'hidden') ? true : false;
                    sC.scroller[i] = false;
                    sBr.curPos = 0;
                    m.setPos[i]('-1px');
                    sC.scrollPosition[i] = [false, false];
                    classChange(f, 'flexinactive', '')
                };
                mDv.setPos[1 - i]((sC.forcedPos[i] && (r || sC.forcedBar[i]) && !sC.forcedHide[i]) ? sC.barSpace[1 - i] - sC.paddings[i * 2] + 'px' : '-' + sC.paddings[i * 2] + 'px')
            };
            f.onmouseclick = retFalse
        };

        function updateBarSize(a, b, c) {
            var d = a.sDv,
                sBr = a.sBr,
                i = sBr.indx;
            d.setSize[i](tDv.getSize[i]() - b);
            var e = d.getSize[1 - i](),
                sdvi = d.getSize[i]();
            d.setPos[1 - i](tDv.getSize[1 - i]() - e + 'px');
            sC.forcedPos[i] = (parseInt(d.getPos[1 - i]()) === 0) ? true : false;
            a.baseProp = Math.max(parseInt((sdvi - a.padLoss) * 0.75), 5);
            sBr.aSize = Math.min(Math.max(Math.min(parseInt(sC.cntRSize[i] / Math.max(sC.cntSize[i], 1) * sdvi), a.baseProp), 45), a.baseProp);
            sBr.setSize[i](sBr.aSize);
            var f = sBr.getSize[i](),
                ssdvi = a.sSDv.getSize[i](),
                ssbri = a.sSBr.getSize[i]();
            sC.barSize[i] = f;
            sBr.maxPos = sdvi - f - a.padLoss;
            sBr.curPos = Math.min(Math.max(0, sBr.curPos), sBr.maxPos);
            sBr.setPos[i](sBr.curPos + sBr.minPos + 'px');
            sBr.mxScroll = mDv.getSize[i]() - sC.cntSize[i];
            sBr.mxScroll = Math.min(sBr.mxScroll, -1);
            sBr.trgtScrll = Math.max(sBr.trgtScrll, sBr.mxScroll);
            sBr.sRange = sBr.maxPos;
            a.sFDv.setSize[i](sdvi - ssdvi);
            a.sFBr.setSize[i](f - ssbri);
            var g = a.sFBr.getSize[i]();
            a.sSBr.setPos[i](f - ssbri + 'px');
            a.sSDv.setPos[i](sdvi - ssdvi + 'px');
            a.sMBr.setSize[i](f - g - ssbri);
            a.sMBr.setPos[i](g + 'px');
            fillPos = Math.min(sBr.minPos, a.sFDv.getSize[i]());
            midPos = a.sFDv.getSize[i]();
            a.sMDv.setPos[i](midPos + 'px');
            a.sMDv.setSize[i](sdvi - midPos - ssdvi);
            a.sMDv.setSize[1 - i](e);
            a.sFFb.setPos[i](fillPos + 'px');
            a.sFRb.setPos[i](fillPos + 'px');
            a.sFFb.setSize[1 - i](e);
            a.sFRb.setSize[1 - i](e);
            a.sFRb.setSize[i](sdvi - fillPos - (Math.min(a.barPadding[1], ssdvi)));
            sBr.fillComp = sBr.minPos - fillPos;
            if (!c) sBr.realScrollPos();
            sC.fixIEDispBug()
        };

        function setFiller(a, i) {
            a.sFFb.setSize[i](a.sBr.fillComp + a.sBr.curPos + parseInt(sC.barSize[i] / 2))
        };
        sfU.mDPosFix = function () {
            mDv.scrollTop = 0;
            mDv.scrollLeft = 0;
            h.scrollTop = 0;
            h.scrollLeft = 0
        };
        this.addTrggr(wD, 'load', function () {
            if (h.fleXcroll) sfU.updateScrollBars()
        });
        this.addTrggr(wD, 'resize', function () {
            if (h.refreshTimeout) wD.clearTimeout(h.refreshTimeout);
            h.refreshTimeout = wD.setTimeout(function () {
                if (h.fleXcroll) sfU.updateScrollBars()
            }, 80)
        });

        function retFalse() {
            return false
        };

        function mMoveBar(e) {
            if (!e) {
                var e = wD.event
            };
            var a = sC.goScroll,
                movBr, maxx, xScroll, yScroll;
            if (a == null) return;
            if (!fleXenv.w3events && !e.button) mMouseUp();
            maxx = (a.scrollBoth) ? 2 : 1;
            for (var i = 0; i < maxx; i++) {
                movBr = (i == 1) ? a.scrlTrgt.vBar : a;
                if (a.clicked) {
                    if (!movBr.moved) {
                        sfU.mDPosFix();
                        findPos(movBr);
                        findPos(movBr.ofstParent);
                        movBr.pointerOffsetY = e.clientY - movBr.yPos;
                        movBr.pointerOffsetX = e.clientX - movBr.xPos;
                        movBr.inCurPos = movBr.curPos;
                        movBr.moved = true
                    };
                    movBr.curPos = (movBr.vertical) ? e.clientY - movBr.pointerOffsetY - movBr.ofstParent.yPos - movBr.minPos : e.clientX - movBr.pointerOffsetX - movBr.ofstParent.xPos - movBr.minPos;
                    if (a.scrollBoth) movBr.curPos = movBr.curPos + (movBr.curPos - movBr.inCurPos);
                    movBr.doBarPos(true);
                    if (h.onfleXcroll) h.onfleXcroll()
                } else movBr.moved = false
            }
        };

        function mMouseUp() {
            if (sC.goScroll != null) {
                sC.goScroll.clicked = false;
                sC.goScroll.trgtScrll += sC.goScroll.targetSkew
            }
            sC.goScroll = null;
            fleXenv.remTrggr(j, 'selectstart', retFalse);
            fleXenv.remTrggr(j, 'mousemove', mMoveBar);
            fleXenv.remTrggr(j, 'mouseup', mMouseUp)
        };

        function handleTouch(e) {
            if (!e) e = wD.event;
            if (this == tDv) tDv.sY.zIndex = sC.tDivZ;
            if (e.targetTouches.length != 1 || (!sC.scroller[0] && !sC.scroller[1])) {
                handleTouchEnd(e);
                return
            };
            var a = '',
                touchLink = (e.target && (e.target.href || (e.target.nodeType == 3 && e.target.parentNode.href))) ? true : false;
            sC.touchPos = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
            flickClear();
            fleXenv.addChckTrggr(h, 'touchmove', handleTouchMove);
            fleXenv.addChckTrggr(h, 'touchend', handleTouchEnd);
            sC.touchBar = (e.target && e.target.id && e.target.id.match(/_[vh]scrollerba[rs]e?/)) ? true : false
        };

        function handleTouchMove(e) {
            if (!e) e = wD.event;
            if (e.targetTouches.length != 1) {
                handleTouchEnd(e);
                return
            }
            fleXenv.remTrggr(h, 'mousedown', handleTextSelect);
            var a = [e.targetTouches[0].clientX, e.targetTouches[0].clientY];
            sC.touchPrevent = true;
            sC.moveDelta = [sC.touchPos[0] - a[0], sC.touchPos[1] - a[1]];
            if (sC.touchBar) {
                sC.moveDelta[0] *= -(sC.cntSize[0] / sC.cntRSize[0]);
                sC.moveDelta[1] *= -(sC.cntSize[1] / sC.cntRSize[1])
            } else {
                sC.moveDelta[0] *= sC.touchMul[0];
                sC.moveDelta[1] *= sC.touchMul[1]
            };
            sfU.scrollContent(sC.moveDelta[0], sC.moveDelta[1]);
            sC.touchMoved = true;
            sC.touchPos[0] = a[0];
            sC.touchPos[1] = a[1];
            for (var i = 0; i < 2; i++) {
                if (sC.moveDelta[i] !== 0 && sC.scroller[i] && (sC.moveDelta[1 - i] == 0 || !sC.scroller[1 - i])) {
                    if ((sC.moveDelta[i] > 0 && sC.scrollPosition[i][1] == sC.scrollPosition[i][0]) || (sC.moveDelta[i] < 0 && sC.scrollPosition[i][0] == 0)) sC.touchPrevent = false
                };
                if (!sC.scroller[i] && sC.moveDelta[1 - i] !== 0 && Math.abs(sC.moveDelta[i] / sC.moveDelta[1 - i]) > 1.1) sC.touchPrevent = false
            };
            if (sC.touchPrevent) {
                e.preventDefault();
                tDv.sY.zIndex = '9999'
            } else {
                tDv.sY.zIndex = sC.tDivZ
            }
        };

        function handleTouchEnd(e) {
            if (!e) e = wD.event;
            fleXenv.remTrggr(h, 'touchmove', handleTouchMove);
            fleXenv.remTrggr(h, 'touchend', handleTouchEnd);
            if ((sC.scroller[0] && Math.abs(sC.moveDelta[0]) > 6) || (sC.scroller[1] && Math.abs(sC.moveDelta[1]) > 6)) {
                var a = 0;
                flickClear(true);
                sC.touchFlick = window.setInterval(function () {
                    sfU.scrollContent(easeInOut(sC.moveDelta[0], 0, 10, a, 0.3), easeInOut(sC.moveDelta[1], 0, 10, a, 0.3));
                    a++;
                    if (a > 10) flickClear()
                }, 100)
            }
        };

        function mWheelProc(e) {
            if (!e) e = wD.event;
            if (!this.fleXcroll) return;
            var a = (e.target) ? e.target : (e.srcElement) ? e.srcElement : this;
            if (a.nodeName && w.indexOf('|' + a.nodeName + '|') > -1) return;
            var b, hEdge, hoverH = false,
                delta = 0,
                iNDx, scrollState = sC.scrollPosition;
            sfU.mDPosFix();
            if (a.id && a.id.match(/_hscroller/)) hoverH = true;
            if (e.wheelDelta) delta = -e.wheelDelta;
            if (e.detail) delta = e.detail;
            delta = (delta < 0) ? -1 : +1;
            iNDx = (delta < 0) ? 0 : 1;
            sC.edge[1 - iNDx] = false;
            if ((scrollState[1][0] != 0) && (scrollState[1][0] != scrollState[1][1])) sC.edge[0] = sC.edge[1] = false;
            if ((sC.edge[iNDx] && !hoverH) || (!sC.scroller[0] && !sC.scroller[1])) return;
            if (sC.scroller[1] && !hoverH) scrollState = sfU.setScrollPos(false, sC.wheelAct[iNDx], true);
            b = !sC.scroller[1] || hoverH || (sC.scroller[1] && ((scrollState[1][0] == scrollState[1][1] && delta > 0) || (scrollState[1][0] == 0 && delta < 0)));
            if (sC.scroller[0] && (!sC.scroller[1] || hoverH)) scrollState = sfU.setScrollPos(sC.wheelAct[iNDx], false, true);
            hEdge = !sC.scroller[0] || (sC.scroller[0] && sC.scroller[1] && b && !hoverH) || (sC.scroller[0] && ((scrollState[0][0] == scrollState[0][1] && delta > 0) || (scrollState[0][0] == 0 && delta < 0)));
            if (b && hEdge && !hoverH) sC.edge[iNDx] = true;
            else sC.edge[iNDx] = false; if (e.preventDefault) e.preventDefault();
            return false
        };

        function isddvChild(a) {
            while (a.parentNode) {
                a = a.parentNode;
                if (a == h) return true
            }
            return false
        };

        function findPos(a) {
            var b = a,
                curleft = curtop = 0;
            if (b.offsetParent) {
                while (b) {
                    curleft += b.offsetLeft;
                    curtop += b.offsetTop;
                    b = b.offsetParent
                }
            } else if (b.offsetLeft || b.offsetTop) {
                curleft += b.offsetLeft;
                curtop += b.offsetTop
            } else if (b.x) {
                curleft += b.x;
                curtop += b.y
            };
            a.xPos = curleft;
            a.yPos = curtop
        };

        function findRCpos(a) {
            var b = a;
            curleft = curtop = 0;
            while (!b.offsetHeight && b.parentNode && b != m && getStyle(b, 'display') == 'inline') {
                b = b.parentNode
            };
            if (b.offsetParent) {
                while (b != m) {
                    curleft += b.offsetLeft;
                    curtop += b.offsetTop;
                    b = b.offsetParent
                }
            };
            return [curleft, curtop]
        };

        function classChange(a, b, c) {
            fleXenv.classChange(a, b, c)
        };

        function easeInOut(a, b, c, d, e) {
            c = Math.max(c, 1);
            var f = b - a,
                stepp = a + (Math.pow(((1 / c) * d), e) * f);
            return (stepp > 0) ? Math.floor(stepp) : Math.ceil(stepp)
        }
    },
    globalInit: function () {
        if (fleXenv.catchFastInit) window.clearInterval(fleXenv.catchFastInit);
        if (!fleXenv.initialized) fleXenv.addTrggr(document, 'click', fleXenv.globalClickHandle);
        fleXenv.initByClass();
        fleXenv.initialized = true;
        if (window.onfleXcrollRun) window.onfleXcrollRun()
    },
    globalClickHandle: function (e) {
        if (!e) e = wD.event;
        var a = e.target || e.srcElement;
        if (a.nodeType == 3) a = a.parentNode;
        if (!a.href) return;
        var b = /#([^#.]*)$/,
            urlExt = /(.*)#.*$/,
            regExer = /(^|\s)flexcroll-in-page-link($|\s)/,
            matcH, claSS, urlBase = document.location.href;
        if (urlBase.match(urlExt)) urlBase = urlBase.match(urlExt)[1];
        claSS = (a.className) ? a.className : '';
        if (a.href.match(b) && ((a.href.match(urlExt) && urlBase === a.href.match(urlExt)[1]) || claSS.match(regExer))) {
            var c = document.getElementById(a.href.match(b)[1]),
                eScroll = false;
            if (c == null) c = (c = document.getElementsByName(a.href.match(b)[1])[0]) ? c : null;
            if (c != null) {
                var d = c;
                while (d.parentNode) {
                    d = d.parentNode;
                    if (d.fleXcroll) {
                        d.fleXcroll.scrollToElement(c);
                        eScroll = d
                    }
                };
                if (eScroll) {
                    if (e.preventDefault) e.preventDefault();
                    document.location.href = urlBase + '#' + a.href.match(b)[1];
                    eScroll.fleXcroll.mDPosFix();
                    return false
                }
            }
        }
    },
    classChange: function (a, b, c) {
        if (!a.className) a.className = '';
        var d = a.className;
        if (b && !d.match(RegExp('(^|\\s)' + b + '($|\\s)'))) d = d.replace(/(\S$)/, '$1 ') + b;
        if (c) d = d.replace(RegExp('((^|\\s)+' + c + ')+($|\\s)', 'g'), '$2').replace(/\s$/, '');
        a.className = d
    },
    initByClass: function (a) {
        fleXenv.initialized = true;
        var b = fleXenv.getByClassName(document.getElementsByTagName('body')[0], 'div', (a) ? a : 'flexcroll');
        for (var i = 0, tgDiv; tgDiv = b[i]; i++)
            if (!tgDiv.fleXcroll) fleXenv.fleXcrollMain(tgDiv)
    },
    scrollTo: function (a, b) {
        if (typeof (a) == 'string') a = document.getElementById(a);
        if (a == null) return false;
        var c = a;
        while (c.parentNode) {
            c = c.parentNode;
            if (c.fleXcroll) {
                if (b) {
                    document.location.href = '#' + b
                };
                c.fleXcroll.scrollToElement(a);
                c.fleXcroll.mDPosFix();
                return true
            }
        };
        return false
    },
    updateScrollBars: function () {
        for (var i = 0, fleXdiv; fleXdiv = fleXenv.fleXlist[i]; i++) {
            fleXdiv.fleXcroll.updateScrollBars()
        }
    },
    camelConv: function (a) {
        var a = a.split('-'),
            reT = a[0],
            i;
        for (i = 1; parT = a[i]; i++) {
            reT += parT.charAt(0).toUpperCase() + parT.substr(1)
        };
        return reT
    },
    getByClassName: function (a, b, c) {
        if (typeof (a) == 'string') a = document.getElementById(a);
        if (a == null) return false;
        var d = new RegExp('(^|\\s)' + c + '($|\\s)'),
            clsnm, retArray = [],
            key = 0;
        var e = a.getElementsByTagName(b);
        for (var i = 0, pusher; pusher = e[i]; i++) {
            if (pusher.className && pusher.className.match(d)) {
                retArray[key] = pusher;
                key++
            }
        }
        return retArray
    },
    checkHidden: function (a) {
        if (a == null) return true;
        var b;
        while (a.parentNode) {
            b = fleXenv.getStyle(a, 'display');
            if (b == 'none') return true;
            a = a.parentNode
        };
        return false
    },
    getStyle: function (a, b) {
        if (window.getComputedStyle) return window.getComputedStyle(a, null).getPropertyValue(b);
        if (a.currentStyle) return a.currentStyle[fleXenv.camelConv(b)];
        return false
    },
    catchFastInit: window.setInterval(function () {
        var a = document.getElementById('flexcroll-init');
        if (a != null) {
            fleXenv.initByClass();
            window.clearInterval(fleXenv.catchFastInit)
        }
    }, 100),
    putAway: function (a, b) {
        a.parentNode.removeChild(a);
        a.style.display = 'none';
        b.appendChild(a)
    },
    addTrggr: function (a, b, c) {
        if (!fleXenv.addChckTrggr(a, b, c) && a.attachEvent) {
            a.attachEvent('on' + b, c)
        }
    },
    addChckTrggr: function (a, b, c) {
        if (a.addEventListener) {
            a.addEventListener(b, c, false);
            fleXenv.w3events = true;
            window.addEventListener('unload', function () {
                fleXenv.remTrggr(a, b, c)
            }, false);
            return true
        } else return false
    },
    remTrggr: function (a, b, c) {
        if (!fleXenv.remChckTrggr(a, b, c) && a.detachEvent) a.detachEvent('on' + b, c)
    },
    remChckTrggr: function (a, b, c) {
        if (a.removeEventListener) {
            a.removeEventListener(b, c, false);
            return true
        } else return false
    }
};

function CSBfleXcroll(a) {
    fleXenv.fleXcrollMain(a)
};
fleXenv.fleXcrollInit();