/*!
 * AdminLTE v3.0.0-alpha.2 (https://adminlte.io)
 * Copyright 2014-2018 Abdullah Almsaeed <abdullah@almsaeedstudio.com>
 * Licensed under MIT (https://github.com/almasaeed2010/AdminLTE/blob/master/LICENSE)
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.adminlte = {})));
}(this, (function (exports) { 'use strict';

/**
 * --------------------------------------------
 * AdminLTE ControlSidebar.js
 * License MIT
 * --------------------------------------------
 */

const ControlSidebar = ($ => {
  /**
   * Constants
   * ====================================================
   */

  const NAME = 'ControlSidebar';
  const DATA_KEY = 'lte.control.sidebar';
  const JQUERY_NO_CONFLICT = $.fn[NAME];
  const Selector = {
    CONTROL_SIDEBAR: '.control-sidebar',
    DATA_TOGGLE: '[data-widget="control-sidebar"]',
    MAIN_HEADER: '.main-header'
  };

  const ClassName = {
    CONTROL_SIDEBAR_OPEN: 'control-sidebar-open',
    CONTROL_SIDEBAR_SLIDE: 'control-sidebar-slide-open'
  };

  const Default = {
    slide: true

    /**
     * Class Definition
     * ====================================================
     */

  };class ControlSidebar {
    constructor(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
    }

    // Public

    show() {
      // Show the control sidebar
      if (this._config.slide) {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      } else {
        $('body').removeClass(ClassName.CONTROL_SIDEBAR_OPEN);
      }
    }

    collapse() {
      // Collapse the control sidebar
      if (this._config.slide) {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      } else {
        $('body').addClass(ClassName.CONTROL_SIDEBAR_OPEN);
      }
    }

    toggle() {
      this._setMargin();

      const shouldOpen = $('body').hasClass(ClassName.CONTROL_SIDEBAR_OPEN) || $('body').hasClass(ClassName.CONTROL_SIDEBAR_SLIDE);
      if (shouldOpen) {
        // Open the control sidebar
        this.show();
      } else {
        // Close the control sidebar
        this.collapse();
      }
    }

    // Private

    _getConfig(config) {
      return $.extend({}, Default, config);
    }

    _setMargin() {
      $(Selector.CONTROL_SIDEBAR).css({
        top: $(Selector.MAIN_HEADER).outerHeight()
      });
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY);

        if (!data) {
          data = new ControlSidebar(this, $(this).data());
          $(this).data(DATA_KEY, data);
        }

        if (data[operation] === 'undefined') {
          throw new Error(`${operation} is not a function`);
        }

        data[operation]();
      });
    }
  }

  /**
   *
   * Data Api implementation
   * ====================================================
   */
  $(document).on('click', Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    ControlSidebar._jQueryInterface.call($(this), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = ControlSidebar._jQueryInterface;
  $.fn[NAME].Constructor = ControlSidebar;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ControlSidebar._jQueryInterface;
  };

  return ControlSidebar;
})(jQuery);

/**
 * --------------------------------------------
 * AdminLTE Layout.js
 * License MIT
 * --------------------------------------------
 */

const Layout = ($ => {
  /**
   * Constants
   * ====================================================
   */

  const NAME = 'Layout';
  const DATA_KEY = 'lte.layout';
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const Selector = {
    SIDEBAR: '.main-sidebar',
    HEADER: '.main-header',
    CONTENT: '.content-wrapper',
    CONTENT_HEADER: '.content-header',
    WRAPPER: '.wrapper',
    CONTROL_SIDEBAR: '.control-sidebar',
    LAYOUT_FIXED: '.layout-fixed',
    FOOTER: '.main-footer'
  };

  const ClassName = {
    HOLD: 'hold-transition',
    SIDEBAR: 'main-sidebar',
    LAYOUT_FIXED: 'layout-fixed'

    /**
     * Class Definition
     * ====================================================
     */

  };class Layout {
    constructor(element) {
      this._element = element;

      this._init();
    }

    // Public

    fixLayoutHeight() {
      const heights = {
        window: $(window).height(),
        header: $(Selector.HEADER).outerHeight(),
        footer: $(Selector.FOOTER).outerHeight(),
        sidebar: $(Selector.SIDEBAR).height()
      };
      const max = this._max(heights);

      $(Selector.CONTENT).css('min-height', max - heights.header);
      $(Selector.SIDEBAR).css('min-height', max - heights.header);
    }

    // Private

    _init() {
      // Enable transitions
      $('body').removeClass(ClassName.HOLD);

      // Activate layout height watcher
      this.fixLayoutHeight();
      $(Selector.SIDEBAR).on('collapsed.lte.treeview expanded.lte.treeview collapsed.lte.pushmenu expanded.lte.pushmenu', () => {
        this.fixLayoutHeight();
      });

      $(window).resize(() => {
        this.fixLayoutHeight();
      });

      $('body, html').css('height', 'auto');
    }

    _max(numbers) {
      // Calculate the maximum number in a list
      let max = 0;

      Object.keys(numbers).forEach(key => {
        if (numbers[key] > max) {
          max = numbers[key];
        }
      });

      return max;
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Layout(this);
          $(this).data(DATA_KEY, data);
        }

        if (operation) {
          data[operation]();
        }
      });
    }
  }

  /**
   * Data API
   * ====================================================
   */
  $(window).on('load', () => {
    Layout._jQueryInterface.call($('body'));
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Layout._jQueryInterface;
  $.fn[NAME].Constructor = Layout;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Layout._jQueryInterface;
  };

  return Layout;
})(jQuery);

/**
 * --------------------------------------------
 * AdminLTE PushMenu.js
 * License MIT
 * --------------------------------------------
 */

const PushMenu = ($ => {
  /**
   * Constants
   * ====================================================
   */

  const NAME = 'PushMenu';
  const DATA_KEY = 'lte.pushmenu';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const Event = {
    COLLAPSED: `collapsed${EVENT_KEY}`,
    SHOWN: `shown${EVENT_KEY}`
  };

  const Default = {
    screenCollapseSize: 768
  };

  const Selector = {
    TOGGLE_BUTTON: '[data-widget="pushmenu"]',
    SIDEBAR_MINI: '.sidebar-mini',
    SIDEBAR_COLLAPSED: '.sidebar-collapse',
    BODY: 'body',
    OVERLAY: '#sidebar-overlay',
    WRAPPER: '.wrapper'
  };

  const ClassName = {
    SIDEBAR_OPEN: 'sidebar-open',
    COLLAPSED: 'sidebar-collapse',
    OPEN: 'sidebar-open',
    SIDEBAR_MINI: 'sidebar-mini'

    /**
     * Class Definition
     * ====================================================
     */

  };class PushMenu {
    constructor(element, options) {
      this._element = element;
      this._options = $.extend({}, Default, options);

      if (!$(Selector.OVERLAY).length) {
        this._addOverlay();
      }
    }

    // Public

    show() {
      $(Selector.BODY).addClass(ClassName.OPEN).removeClass(ClassName.COLLAPSED);

      const shownEvent = $.Event(Event.SHOWN);
      $(this._element).trigger(shownEvent);
    }

    collapse() {
      $(Selector.BODY).removeClass(ClassName.OPEN).addClass(ClassName.COLLAPSED);

      const collapsedEvent = $.Event(Event.COLLAPSED);
      $(this._element).trigger(collapsedEvent);
    }

    toggle() {
      let isShown;
      if ($(window).width() >= this._options.screenCollapseSize) {
        isShown = !$(Selector.BODY).hasClass(ClassName.COLLAPSED);
      } else {
        isShown = $(Selector.BODY).hasClass(ClassName.OPEN);
      }

      if (isShown) {
        this.collapse();
      } else {
        this.show();
      }
    }

    // Private
    _addOverlay() {
      const overlay = $('<div />', {
        id: 'sidebar-overlay'
      });

      overlay.on('click', () => {
        this.collapse();
      });

      $(Selector.WRAPPER).append(overlay);
    }

    // Static

    static _jQueryInterface(operation) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY);

        if (!data) {
          data = new PushMenu(this);
          $(this).data(DATA_KEY, data);
        }

        if (operation) {
          data[operation]();
        }
      });
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.TOGGLE_BUTTON, event => {
    event.preventDefault();

    let button = event.currentTarget;

    if ($(button).data('widget') !== 'pushmenu') {
      button = $(button).closest(Selector.TOGGLE_BUTTON);
    }

    PushMenu._jQueryInterface.call($(button), 'toggle');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = PushMenu._jQueryInterface;
  $.fn[NAME].Constructor = PushMenu;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return PushMenu._jQueryInterface;
  };

  return PushMenu;
})(jQuery);

/**
 * --------------------------------------------
 * AdminLTE Treeview.js
 * License MIT
 * --------------------------------------------
 */

const Treeview = ($ => {
  /**
   * Constants
   * ====================================================
   */

  const NAME = 'Treeview';
  const DATA_KEY = 'lte.treeview';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const Event = {
    SELECTED: `selected${EVENT_KEY}`,
    EXPANDED: `expanded${EVENT_KEY}`,
    COLLAPSED: `collapsed${EVENT_KEY}`,
    LOAD_DATA_API: `load${EVENT_KEY}`
  };

  const Selector = {
    LI: '.nav-item',
    LINK: '.nav-link',
    TREEVIEW_MENU: '.nav-treeview',
    OPEN: '.menu-open',
    DATA_WIDGET: '[data-widget="treeview"]'
  };

  const ClassName = {
    LI: 'nav-item',
    LINK: 'nav-link',
    TREEVIEW_MENU: 'nav-treeview',
    OPEN: 'menu-open'
  };

  const Default = {
    trigger: `${Selector.DATA_WIDGET} ${Selector.LINK}`,
    animationSpeed: 300,
    accordion: true

    /**
     * Class Definition
     * ====================================================
     */
  };class Treeview {
    constructor(element, config) {
      this._config = config;
      this._element = element;
    }

    // Public

    init() {
      this._setupListeners();
    }

    expand(treeviewMenu, parentLi) {
      const expandedEvent = $.Event(Event.EXPANDED);

      if (this._config.accordion) {
        const openMenuLi = parentLi.siblings(Selector.OPEN).first();
        const openTreeview = openMenuLi.find(Selector.TREEVIEW_MENU).first();
        this.collapse(openTreeview, openMenuLi);
      }

      treeviewMenu.slideDown(this._config.animationSpeed, () => {
        parentLi.addClass(ClassName.OPEN);
        $(this._element).trigger(expandedEvent);
      });
    }

    collapse(treeviewMenu, parentLi) {
      const collapsedEvent = $.Event(Event.COLLAPSED);

      treeviewMenu.slideUp(this._config.animationSpeed, () => {
        parentLi.removeClass(ClassName.OPEN);
        $(this._element).trigger(collapsedEvent);
        treeviewMenu.find(`${Selector.OPEN} > ${Selector.TREEVIEW_MENU}`).slideUp();
        treeviewMenu.find(Selector.OPEN).removeClass(ClassName.OPEN);
      });
    }

    toggle(event) {
      const $relativeTarget = $(event.currentTarget);
      const treeviewMenu = $relativeTarget.next();

      if (!treeviewMenu.is(Selector.TREEVIEW_MENU)) {
        return;
      }

      event.preventDefault();

      const parentLi = $relativeTarget.parents(Selector.LI).first();
      const isOpen = parentLi.hasClass(ClassName.OPEN);

      if (isOpen) {
        this.collapse($(treeviewMenu), parentLi);
      } else {
        this.expand($(treeviewMenu), parentLi);
      }
    }

    // Private

    _setupListeners() {
      $(document).on('click', this._config.trigger, event => {
        this.toggle(event);
      });
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY);
        const _config = $.extend({}, Default, $(this).data());

        if (!data) {
          data = new Treeview($(this), _config);
          $(this).data(DATA_KEY, data);
        }

        if (config === 'init') {
          data[config]();
        }
      });
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(window).on(Event.LOAD_DATA_API, () => {
    $(Selector.DATA_WIDGET).each(function () {
      Treeview._jQueryInterface.call($(this), 'init');
    });
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Treeview._jQueryInterface;
  $.fn[NAME].Constructor = Treeview;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Treeview._jQueryInterface;
  };

  return Treeview;
})(jQuery);

/**
 * --------------------------------------------
 * AdminLTE Widget.js
 * License MIT
 * --------------------------------------------
 */

const Widget = ($ => {
  /**
   * Constants
   * ====================================================
   */

  const NAME = 'Widget';
  const DATA_KEY = 'lte.widget';
  const EVENT_KEY = `.${DATA_KEY}`;
  const JQUERY_NO_CONFLICT = $.fn[NAME];

  const Event = {
    EXPANDED: `expanded${EVENT_KEY}`,
    COLLAPSED: `collapsed${EVENT_KEY}`,
    REMOVED: `removed${EVENT_KEY}`
  };

  const Selector = {
    DATA_REMOVE: '[data-widget="remove"]',
    DATA_COLLAPSE: '[data-widget="collapse"]',
    CARD: '.card',
    CARD_HEADER: '.card-header',
    CARD_BODY: '.card-body',
    CARD_FOOTER: '.card-footer',
    COLLAPSED: '.collapsed-card'
  };

  const ClassName = {
    COLLAPSED: 'collapsed-card'
  };

  const Default = {
    animationSpeed: 'normal',
    collapseTrigger: Selector.DATA_COLLAPSE,
    removeTrigger: Selector.DATA_REMOVE
  };

  class Widget {
    constructor(element, settings) {
      this._element = element;
      this._parent = element.parents(Selector.CARD).first();
      this._settings = $.extend({}, Default, settings);
    }

    collapse() {
      this._parent.children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`).slideUp(this._settings.animationSpeed, () => {
        this._parent.addClass(ClassName.COLLAPSED);
      });

      const collapsed = $.Event(Event.COLLAPSED);

      this._element.trigger(collapsed, this._parent);
    }

    expand() {
      this._parent.children(`${Selector.CARD_BODY}, ${Selector.CARD_FOOTER}`).slideDown(this._settings.animationSpeed, () => {
        this._parent.removeClass(ClassName.COLLAPSED);
      });

      const expanded = $.Event(Event.EXPANDED);

      this._element.trigger(expanded, this._parent);
    }

    remove() {
      this._parent.slideUp();

      const removed = $.Event(Event.REMOVED);

      this._element.trigger(removed, this._parent);
    }

    toggle() {
      if (this._parent.hasClass(ClassName.COLLAPSED)) {
        this.expand();
        return;
      }

      this.collapse();
    }

    // Private

    _init(card) {
      this._parent = card;

      $(this).find(this._settings.collapseTrigger).click(() => {
        this.toggle();
      });

      $(this).find(this._settings.removeTrigger).click(() => {
        this.remove();
      });
    }

    // Static

    static _jQueryInterface(config) {
      return this.each(function () {
        let data = $(this).data(DATA_KEY);

        if (!data) {
          data = new Widget($(this), data);
          $(this).data(DATA_KEY, typeof config === 'string' ? data : config);
        }

        if (typeof config === 'string' && config.match(/remove|toggle/)) {
          data[config]();
        } else if (typeof config === 'object') {
          data._init($(this));
        }
      });
    }
  }

  /**
   * Data API
   * ====================================================
   */

  $(document).on('click', Selector.DATA_COLLAPSE, function (event) {
    if (event) {
      event.preventDefault();
    }

    Widget._jQueryInterface.call($(this), 'toggle');
  });

  $(document).on('click', Selector.DATA_REMOVE, function (event) {
    if (event) {
      event.preventDefault();
    }

    Widget._jQueryInterface.call($(this), 'remove');
  });

  /**
   * jQuery API
   * ====================================================
   */

  $.fn[NAME] = Widget._jQueryInterface;
  $.fn[NAME].Constructor = Widget;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Widget._jQueryInterface;
  };

  return Widget;
})(jQuery);

exports.ControlSidebar = ControlSidebar;
exports.Layout = Layout;
exports.PushMenu = PushMenu;
exports.Treeview = Treeview;
exports.Widget = Widget;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=adminlte.js.map
