define('kg/xtab/1.0.0/index',["kg/xscroll/2.3.0/base","kg/xscroll/2.3.0/util","kg/xscroll/2.3.0/core","kg/xscroll/2.3.0/event","kg/xscroll/2.3.0/tap","node"],function(require, exports, module) {
/**
 * @fileoverview
 * @author 伯才<xiaoqi.huxq@alibaba-inc.com>
 * @module xslide
 **/
var Base = require('kg/xscroll/2.3.0/base');
var Util = require('kg/xscroll/2.3.0/util');
var XScroll = require('kg/xscroll/2.3.0/core');
var Event = require('kg/xscroll/2.3.0/event');
var Tap = require('kg/xscroll/2.3.0/tap');
var $ = require('node').all;
var indexOf = function(el, list) {
    for (var i in list) {
        if (el == list[i]) {
            return i;
        }
    }
};
function XTab(cfg) {
    var self = this;
    if (!cfg || !cfg.renderTo) return;
    XTab.superclass.constructor.call(this)
    self.cfg = Util.mix({
        maskNode: "",
        itemsSelector: ".xtab-item",
        duration: 300,
        easing: "ease",
        headerTitle: ""
    }, cfg);
    self.init();
}

Util.extend(XTab, Base, {
    init: function() {
        var self = this;
        var cfg = self.cfg;
        self.renderTo = document.querySelector(cfg.renderTo);
        //导航
        self.navContainer = self.renderTo.querySelector(".xtab-nav-container");
        self.items = self.navContainer.querySelectorAll(self.cfg.itemsSelector);
        self.btnSlide = self.renderTo.querySelector(".xtab-btn-slide");
        self.itemsLength = self.items.length;
        self.itemData = [];
        for (var i = 0; i < self.items.length; i++) {
            self.itemData.push(self.items[i].innerHTML);
        }
        self.xscroll = new XScroll({
            renderTo: self.navContainer,
            scrollbarX: false,
            scrollbarY: false,
            lockY: true
        });
    },
    switchTo: function(index) {
        var self = this;
        if (index === undefined || index < 0 || index >= self.itemsLength) return;
        self.prevIndex = self.curIndex;
        var item = self.items[index];
        var popItem = self.popItems[index];
        var offsetLeft = item.offsetLeft;
        var width = self.xscroll.width;
        var br = self.xscroll.containerWidth - self.xscroll.width;
        var offset = offsetLeft - width / 2 + item.offsetWidth / 2 < 0 ? 0 : offsetLeft - width / 2 + item.offsetWidth / 2;
        offset = offset > br ? br : offset;
        for (var i in self.items) {
            Util.removeClass(self.items[i], "active");
            Util.removeClass(self.popItems[i], "active");
        }
        Util.addClass(item, "active");
        Util.addClass(popItem, "active");
        self.xscroll.scrollX(offset, self.cfg.duration);
        self.curIndex = index;
        self.fire("switch", {
            curIndex: index
        });
        if (self.curIndex !== self.prevIndex) {
            self.fire("switchchange", {
                prevIndex: self.prevIndex,
                curIndex: self.curIndex
            })
        }
    },
    findParentEl: function(el, selector, rootNode) {
        var $el = $(el);
        var rs = null;
        rootNode = rootNode || document.body;
        if (!el || !selector) return;
        while (!rs) {
            rs = $el.parent(selector) && $el.parent(selector)[0];
            if ($el[0] == rootNode) break;
            if (rs) {
                return $(rs);
                break;
            } else {
                $el = $el.parent();
            }
        }
        return null;
    },
    _bindEvt: function() {
        var self = this;
        if (self._isEvtBind) return;
        self._isEvtBind = true;
        self.xscroll.on("click", function(e) {
            e.preventDefault();
            var $tgt = $(e.target);
            if (!$tgt.hasClass("xtab-item")) {
                $tgt = self.findParentEl(e.target, ".xtab-item", self.xscroll.renderTo);
            }
            if (!$tgt) return;
            var index = indexOf($tgt[0], self.items);
            self.switchTo(index);
        });

        self.btnSlide && Event.on(self.btnSlide,Tap.TAP, function(e) {
            self.toggleSide();
        })

        self.mask && self.mask.addEventListener("touchstart", function(e) {
            e.preventDefault();
            self.slideUp();
        });

        self.mask && self.mask.addEventListener("touchmove", function(e) {
            e.preventDefault();
        });

        self.mask && self.mask.addEventListener("webkitTransitionEnd", function(e) {
            if (e.target == self.mask) {
                self.mask.style.display = "none";
            }
        }, false);

        self.pop && self.pop.addEventListener("touchmove", function(e) {
            e.preventDefault();
        });

        self.pop && Event.on(self.pop,Tap.TAP,function(e) {
            e.preventDefault();
            if (e.target.tagName.toLowerCase() == "li") {
                var index = indexOf(e.target, self.popItems);
                self.switchTo(index);
                self.slideUp();
            }
        });
    },
    render: function() {
        var self = this;
        self.xscroll.render();
        self._renderPop();
        Util.addClass(self.mask, "xtab-mask");
        self._bindEvt();
    },
    toggleSide: function() {
        this._isSlideDown ? this.slideUp() : this.slideDown();
    },
    slideDown: function() {
        var self = this;
        self._isSlideDown = true;
        self.mask.style.display = "block";
        self.mask.style.opacity = 0.5;
        self.pop.style.display = "block";
        Util.addClass(self.renderTo, "xtab-slide-down");
    },
    slideUp: function() {
        var self = this;
        self._isSlideDown = false;
        self.mask.style.opacity = 0;
        self.pop.style.display = "none";
        Util.removeClass(self.renderTo, "xtab-slide-down");
    },
    _renderMask: function() {
        var self = this;
        self.mask = self.cfg.maskNode && document.querySelector(self.cfg.maskNode);
        if (!self.mask) {
            self.mask = document.createElement("div");
            self.mask.style.display = "none";
            self.mask.opacity = 0;
            document.body.appendChild(self.mask);
        }
    },
    _renderPop: function() {
        var self = this;
        self._renderMask();
        if (!self.pop) {
            self.pop = document.createElement("div");
            self.pop.className = "xtab-navpop-container";
            self.renderTo.appendChild(self.pop);
        }
        var html = '<ul>';
        for (var i in self.itemData) {
            html += '<li>' + self.itemData[i] + '</li>';
        }
        self.pop.innerHTML = '<span class="xtab-navpop-header">' + (self.cfg.headerTitle || "") + '</span>' + html;
        self.popItems = self.pop.querySelectorAll("li");
    }
});

module.exports = XTab;
});