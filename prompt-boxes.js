(function (name, context, definition) {
  'use strict'
  if (typeof window.define === 'function' && window.define.amd) { window.define(definition) } else if (typeof module !== 'undefined' && module.exports) { module.exports = definition() } else if (context.exports) { context.exports = definition() } else { context[name] = definition() }
})('PromptBoxes', this, function () {
  'use strict'
  var PromptBoxes = function (options) {
    if (!(this instanceof PromptBoxes)) {
      return new PromptBoxes(options)
    }

    var defaultOptions = {
      toastDir: 'top',
      toastMax: 5,
      toastDuration: 5000,
      toastClose: false,
      promptAsAbsolute: false,
      animationSpeed: 500
    }
    this.options = this.extend(options, defaultOptions)
  }
  PromptBoxes.prototype = {
    extend: function (source, target) {
      if (source == null) { return target }
      for (var k in source) {
        if (source[k] != null && target[k] !== source[k]) {
          target[k] = source[k]
        }
      }
      return target
    },

    clear: function () {
      var that = this;

      // Remove toasts
      var toasts = document.getElementsByClassName('toast');
      for (var i = 0; i < toasts.length; i++) {
        toasts[i].style.display = 'none';
      }

      // Remove prompts/confirms
      var sc_confirm = document.getElementById('sc-confirm');
      if (sc_confirm) {
        sc_confirm.className = '';
        setTimeout(function () {
          try {
            sc_confirm.remove();
          } catch (ex) { }
        }, that.options.animationSpeed);
      }

      // Remove backdrop
      var sc_backdrop = document.getElementById('sc-backdrop');
      if (sc_backdrop) {
        sc_backdrop.className = '';
        setTimeout(function () {
          try {
            sc_backdrop.remove();
            sc_confirm.remove();
          } catch (ex) { }
        }, that.options.animationSpeed);
      }

    },

    rmBackDrop: function (instance) {
      try {
        var oldC = document.querySelector('#sc-confirm' + (instance ? '[data-instance="' + instance + '"]' : ''));
        var oldB = document.querySelector('#sc-backdrop' + (instance ? '[data-instance="' + instance + '"]' : ''));

        if (oldC) oldC.remove();
        if (oldB) oldB.remove();

        document.getElementsByTagName('body')[0].onkeyup = null;
      } catch (ex) { }
    },

    alert: function (callback, msg, ok) {
      if (!msg) msg = 'Are you sure?';
      if (!ok) ok = 'Ok';

      this.rmBackDrop();

      var sc_backdrop = document.createElement('div');
      var sc_confirm = document.createElement('div');
      var sc_confirm_msg = document.createElement('div');
      var sc_confirm_ok = document.createElement('button');

      sc_confirm_msg.innerHTML = msg;
      sc_confirm_ok.innerHTML = ok;

      sc_confirm_msg.className = 'sc-message';
      sc_backdrop.id = 'sc-backdrop';
      sc_confirm.id = 'sc-confirm';
      sc_confirm_ok.id = 'sc-confirm-ok';

      var instance = (new Date).toISOString();
      sc_confirm.setAttribute('data-instance', instance);
      sc_backdrop.setAttribute('data-instance', instance);

      var that = this;
      var destroy = function (outcome) {
        sc_backdrop.className = '';
        sc_confirm.className = '';

        callback(outcome || false);
        setTimeout(function () { that.rmBackDrop(instance); }, that.options.animationSpeed);
      };

      sc_confirm_ok.onclick = function () {
        destroy(true);
      }

      sc_confirm.appendChild(sc_confirm_msg);
      sc_confirm.appendChild(sc_confirm_ok);

      document.getElementsByTagName('body')[0].appendChild(sc_backdrop);
      document.getElementsByTagName('body')[0].appendChild(sc_confirm);
      document.getElementsByTagName('body')[0].onkeyup = function (ev) {
        if (ev.keyCode === 27)
          destroy();
      }

      setTimeout(function () {
        sc_confirm_ok.focus();
        sc_backdrop.className = 'show';
        sc_confirm.className = 'show';
      }, 50);
    },

    confirm: function (callback, msg, yes, no) {
      if (!msg) msg = 'Are you sure?';
      if (!yes) yes = 'Yes';
      if (!no) no = 'Cancel';

      this.rmBackDrop();

      var sc_backdrop = document.createElement('div');
      var sc_confirm = document.createElement('div');
      var sc_confirm_msg = document.createElement('div');
      var sc_confirm_yes = document.createElement('button');
      var sc_confirm_no = document.createElement('button');

      sc_confirm_msg.innerHTML = msg;
      sc_confirm_no.innerHTML = no;
      sc_confirm_yes.innerHTML = yes;

      sc_confirm_msg.classList = 'sc-message';
      sc_backdrop.id = 'sc-backdrop';
      sc_confirm.id = 'sc-confirm';
      sc_confirm_yes.id = 'sc-confirm-yes';
      sc_confirm_no.id = 'sc-confirm-no';

      var instance = (new Date).toISOString();
      sc_confirm.setAttribute('data-instance', instance);
      sc_backdrop.setAttribute('data-instance', instance);

      var that = this;
      var destroy = function (outcome) {
        sc_backdrop.className = '';
        sc_confirm.className = '';

        callback(outcome || false);
        setTimeout(function () { that.rmBackDrop(instance); }, that.options.animationSpeed);
      };

      sc_confirm_yes.onclick = function () {
        destroy(true);
      }
      sc_confirm_no.onclick = function () { destroy(); }

      sc_confirm.appendChild(sc_confirm_msg);
      sc_confirm.appendChild(sc_confirm_no);
      sc_confirm.appendChild(sc_confirm_yes);

      document.getElementsByTagName('body')[0].appendChild(sc_backdrop);
      document.getElementsByTagName('body')[0].appendChild(sc_confirm);
      document.getElementsByTagName('body')[0].onkeyup = function (ev) {
        if (ev.keyCode === 27)
          destroy();
      }

      setTimeout(function () {
        sc_confirm_yes.focus();
        sc_backdrop.className = 'show';
        sc_confirm.className = 'show';
      }, 50);
    },

    prompt: function (callback, msg, type, submit, no) {
      var that = this;

      if (!msg) msg = 'Are you sure?';
      if (!type) type = 'text';
      if (!submit) submit = 'Submit';
      if (!no) no = 'Cancel';

      this.rmBackDrop();

      var baseClass = that.options.promptAsAbsolute === true ? 'absolute' : '';
      var sc_backdrop = document.createElement('div');
      var sc_confirm = document.createElement('div');
      var sc_confirm_input = document.createElement('input');
      var sc_confirm_msg = document.createElement('div');
      var sc_confirm_yes = document.createElement('button');
      var sc_confirm_no = document.createElement('button');

      sc_confirm_input.type = type;
      sc_confirm_msg.innerHTML = msg;
      sc_confirm_no.innerHTML = no;
      sc_confirm_yes.innerHTML = submit;

      sc_confirm_msg.classList = 'sc-message';
      sc_backdrop.id = 'sc-backdrop';
      sc_confirm.id = 'sc-confirm';
      sc_confirm.className = baseClass;
      sc_confirm_input.id = 'sc-confirm-input';
      sc_confirm_yes.id = 'sc-confirm-yes';
      sc_confirm_yes.setAttribute('disabled', 'disabled');
      sc_confirm_no.id = 'sc-confirm-no';

      var instance = (new Date).toISOString();
      sc_confirm.setAttribute('data-instance', instance);
      sc_backdrop.setAttribute('data-instance', instance);

      if (that.options.promptAsAbsolute === true) {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        sc_confirm.style.position = 'absolute';
        sc_confirm.style.top = top + 'px';
      }

      var that = this;
      var destroy = function (outcome) {
        sc_backdrop.className = '';
        sc_confirm.className = baseClass;

        callback(outcome || false);
        setTimeout(function () { that.rmBackDrop(instance); }, that.options.animationSpeed);
      };

      sc_confirm_yes.onclick = function () {
        var val = sc_confirm_input.value;
        if (val === '') {
          sc_confirm_input.focus();
          return;
        }

        destroy(val);
      }

      sc_confirm_input.onkeyup = function (ev) {
        var val = sc_confirm_input.value;
        if (val === '') {
          sc_confirm_yes.setAttribute('disabled', 'disabled');
          return;
        }
        sc_confirm_yes.removeAttribute('disabled');

        if (ev.keyCode !== 13)
          return;

        destroy(val);
      }

      sc_confirm_no.onclick = function () { destroy(); }

      sc_confirm.appendChild(sc_confirm_msg);
      sc_confirm.appendChild(sc_confirm_input);
      sc_confirm.appendChild(sc_confirm_no);
      sc_confirm.appendChild(sc_confirm_yes);

      document.getElementsByTagName('body')[0].appendChild(sc_backdrop);
      document.getElementsByTagName('body')[0].appendChild(sc_confirm);
      document.getElementsByTagName('body')[0].onkeyup = function (ev) {
        if (ev.keyCode === 27)
          destroy();
      }

      setTimeout(function () {
        sc_confirm_input.focus();
        sc_backdrop.className = 'show';
        sc_confirm.className = baseClass + ' show';
      }, 50);
    },

    toast: function (msg, state, opts) {
      var className = state || 'info';
      var curr = document.getElementsByClassName('toast');
      var toast = document.createElement('div');
      var t = document.createTextNode(msg);

      var defaultOps = {
        duration: this.options.toastDuration,
        showClose: this.options.toastClose
      }
      var options = this.extend(opts, defaultOps)

      toast.appendChild(t);
      toast.className = className;

      toast.id = 'toast_' + (new Date).toISOString();
      toast.className = 'toast';

      var that = this;
      var close = function () {
        toast.className = 'toast gone ' + className;
        setTimeout(function () { try { toast.remove(); } catch (ex) { } }, options.duration + that.options.animationSpeed);
      }

      if (options.showClose) {
        var closeBtn = document.createElement('a');
        closeBtn.href = "javascript:void(0)";
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'toast-close';
        closeBtn.onclick = function () { close() };
        toast.appendChild(closeBtn);
        toast.setAttribute('data-close', true);
      }

      var h = 0;
      for (var i = 0; i < curr.length; i++) {
        var el = document.getElementById(curr[(curr.length - 1) - i].id);

        if ((i + 1) < this.options.toastMax) {
          h += (el.clientHeight + 10);
          if (this.options.toastDir === 'bottom') el.style.marginBottom = h + 'px'; else el.style.marginTop = h + 'px';
        } else {
          el.className = 'toast gone ' + className;
        }
      }

      document.getElementsByTagName('body')[0].appendChild(toast);

      setTimeout(function () { toast.className = 'toast show ' + className; }, 50);
      if (options.duration) {
        setTimeout(function () { close(); }, options.duration);
      }
    },

    success: function (msg, opts) {
      this.toast(msg, 'success', opts);
    },

    error: function (msg, opts) {
      this.toast(msg, 'error', opts);
    },

    info: function (msg, opts) {
      this.toast(msg, 'info', opts);
    }
  }
  return PromptBoxes
})

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}