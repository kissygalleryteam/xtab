/*!build time : 2014-12-18 5:37:26 PM*/
KISSY.add("kg/xtab/2.0.0/index",function(a,b,c,d,e,f,g){function h(a){var b=this;a&&a.renderTo&&(h.superclass.constructor.call(this),b.cfg=d.mix({maskNode:"",itemsSelector:".xtab-item",duration:300,easing:"ease",scrollDelay:0,mask:!0,headerTitle:"",onShow:function(a){a.pop.style.display="block",a.mask.style.display="block",a.mask.style.opacity=.5},onHide:function(a){a.mask.style.opacity=0,a.pop.style.display="none"}},a),b.init())}var i=b.all,j=d.vendor?d.prefixStyle("transitionEnd"):"transitionend",k=function(a,b){for(var c in b)if(a==b[c])return c};return d.extend(h,c,{init:function(){var a=this,b=a.cfg;a.renderTo=document.querySelector(b.renderTo),a.navContainer=a.renderTo.querySelector(".xtab-nav-container"),a.items=a.navContainer.querySelectorAll(a.cfg.itemsSelector),a.btnSlide=a.renderTo.querySelector(".xtab-btn-slide"),a.itemsLength=a.items.length,a.itemData=[];for(var c=0;c<a.items.length;c++)a.itemData.push(a.items[c].innerHTML);a.xscroll=new e({renderTo:a.navContainer,scrollbarX:!1,scrollbarY:!1,lockY:!0})},switchTo:function(a){var b=this;if(!(void 0===a||0>a||a>=b.itemsLength)){b.prevIndex=b.curIndex;var c=b.items[a],e=b.popItems&&b.popItems[a],f=c.offsetLeft,g=b.xscroll.width,h=b.xscroll.containerWidth-b.xscroll.width,i=f-g/2+c.offsetWidth/2<0?0:f-g/2+c.offsetWidth/2;i=i>h?h:i;for(var j in b.items)d.removeClass(b.items[j],"active"),b.popItems&&b.popItems[j]&&d.removeClass(b.popItems[j],"active");d.addClass(c,"active"),e&&d.addClass(e,"active"),b.cfg.scrollDelay?(window.clearTimeout(b.delayTimer),b.delayTimer=window.setTimeout(function(){b.xscroll.scrollX(i,b.cfg.duration)},b.cfg.scrollDelay)):b.xscroll.scrollX(i,b.cfg.duration),b.curIndex=a,b.fire("switch",{curIndex:a}),b.curIndex!==b.prevIndex&&b.fire("switchchange",{prevIndex:b.prevIndex,curIndex:b.curIndex})}},findParentEl:function(a,b,c){var d=i(a),e=null;if(c=c||document.body,a&&b){for(;!e&&(e=d.parent(b)&&d.parent(b)[0],d[0]!=c);){if(e)return i(e);d=d.parent()}return null}},_bindEvt:function(){var a=this;a._isEvtBind||(a._isEvtBind=!0,a.xscroll.on("click",function(b){b.preventDefault();var c=i(b.target);if(c.hasClass("xtab-item")||(c=a.findParentEl(b.target,".xtab-item",a.xscroll.renderTo)),c){var d=k(c[0],a.items);a.switchTo(d)}}),a.btnSlide&&f.on(a.btnSlide,g.TAP,function(){a.toggleSide()}),a.mask&&a.mask.addEventListener("touchstart",function(b){b.preventDefault(),a.slideUp()}),a.mask&&a.mask.addEventListener("touchmove",function(a){a.preventDefault()}),a.mask&&a.mask.addEventListener(j,function(b){b.target==a.mask&&(a.mask.style.display="none")},!1),a.pop&&a.pop.addEventListener("touchmove",function(a){a.preventDefault()}),a.pop&&f.on(a.pop,g.TAP,function(b){if(b.preventDefault(),"li"==b.target.tagName.toLowerCase()){var c=k(b.target,a.popItems);a.switchTo(c),a.slideUp()}}))},render:function(){var a=this;a.xscroll.render(),a._renderPop(),a.mask&&d.addClass(a.mask,"xtab-mask"),a._bindEvt()},toggleSide:function(){this._isSlideDown?this.slideUp():this.slideDown()},slideDown:function(){var a=this;a._isSlideDown=!0,a.pop&&a.cfg.onShow.call(a,{pop:a.pop,mask:a.mask}),d.addClass(a.renderTo,"xtab-slide-down")},slideUp:function(){var a=this;a._isSlideDown=!1,a.pop&&a.cfg.onHide.call(a,{pop:a.pop,mask:a.mask}),d.removeClass(a.renderTo,"xtab-slide-down")},_renderMask:function(){var a=this;a.cfg.mask&&(a.mask=a.cfg.maskNode&&document.querySelector(a.cfg.maskNode),a.mask||(a.mask=document.createElement("div"),a.mask.style.display="none",a.mask.opacity=0,document.body.appendChild(a.mask)))},_renderPop:function(){var a=this;a._renderMask(),a.pop||(a.pop=document.createElement("div"),a.pop.className="xtab-navpop-container",a.renderTo.appendChild(a.pop));var b="<ul>";for(var c in a.itemData)b+="<li>"+a.itemData[c]+"</li>";a.pop.innerHTML='<span class="xtab-navpop-header">'+(a.cfg.headerTitle||"")+"</span>"+b,a.popItems=a.pop.querySelectorAll("li")}}),h},{requires:["node","kg/xscroll/2.3.1/base","kg/xscroll/2.3.1/util","kg/xscroll/2.3.1/core","kg/xscroll/2.3.1/event","kg/xscroll/2.3.1/tap"]});