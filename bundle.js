(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  opts: {
    max: 5
  },

  rmBackDrop: function () {
    try {
      var oldC = document.getElementById("sc-confirm");
      var oldB = document.getElementById("sc-backdrop");
      if (oldC) oldC.remove();
      if (oldB) oldB.remove();
    } catch(ex) {}
  },

  confirm: function (callback, msg, yes, no) {
    if (!msg) msg = 'Are you sure?';
    if (!yes) yes = 'Yes';
    if (!no) no = 'Cancel';

    this.rmBackDrop();

    var sc_backdrop = document.createElement('div');
    var sc_confirm = document.createElement('div');
    var sc_confirm_msg = document.createElement('p');
    var sc_confirm_yes = document.createElement('button');
    var sc_confirm_no = document.createElement('button');

    sc_confirm_msg.innerHTML = msg;
    sc_confirm_no.innerHTML = no;
    sc_confirm_yes.innerHTML = yes;

    sc_backdrop.id = "sc-backdrop";
    sc_confirm.id = "sc-confirm";
    sc_confirm_yes.id = "sc-confirm-yes";
    sc_confirm_no.id = "sc-confirm-no";

    var destroy = function(outcome) {
      sc_backdrop.className = '';
      sc_confirm.className = '';

      callback(outcome || false);

      setTimeout(function() {
        try {
          sc_backdrop.remove();
          sc_confirm.remove();
        } catch(ex) {}
      }, 1000);
    };

    sc_confirm_yes.onclick = function() {
      destroy(true);
    }
    sc_confirm_no.onclick = function() { destroy(); }

    sc_confirm.appendChild(sc_confirm_msg);
    sc_confirm.appendChild(sc_confirm_no);
    sc_confirm.appendChild(sc_confirm_yes);

    document.getElementsByTagName('body')[0].appendChild(sc_backdrop);
    document.getElementsByTagName('body')[0].appendChild(sc_confirm);
    document.getElementsByTagName('body')[0].onkeyup = function (ev) {
      if (ev.keyCode === 27)
        destroy();
    }

    setTimeout(function() {
      sc_confirm_yes.focus();
      sc_backdrop.className = 'show';
      sc_confirm.className = 'show';
    }, 50);
  },
  
  prompt: function(callback, msg, type, submit, no) {
    if (!msg) msg = 'Are you sure?';
    if (!type) type = 'text';
    if (!submit) submit = 'Submit';
    if (!no) no = 'Cancel';

    this.rmBackDrop();

    var sc_backdrop = document.createElement('div');
    var sc_confirm = document.createElement('div');
    var sc_confirm_input = document.createElement('input');
    var sc_confirm_msg = document.createElement('p');
    var sc_confirm_yes = document.createElement('button');
    var sc_confirm_no = document.createElement('button');

    sc_confirm_input.type = type;
    sc_confirm_msg.innerHTML = msg;
    sc_confirm_no.innerHTML = no;
    sc_confirm_yes.innerHTML = submit;

    sc_backdrop.id = "sc-backdrop";
    sc_confirm.id = "sc-confirm";
    sc_confirm_input.id = "sc-confirm-input";
    sc_confirm_yes.id = "sc-confirm-yes";
    sc_confirm_no.id = "sc-confirm-no";

    sc_confirm_yes.setAttribute("disabled", "disabled");

    var destroy = function (outcome) {
      sc_backdrop.className = '';
      sc_confirm.className = '';

      callback(outcome || false);

      setTimeout(function() {
        try {
          sc_backdrop.remove();
          sc_confirm.remove();
        } catch(ex) {}
      }, 1000);
    };

    sc_confirm_yes.onclick = function() {
      var val = sc_confirm_input.value;
      if (val === '') {
        sc_confirm_input.focus();
        return;
      }

      destroy(val);
    }
    sc_confirm_input.onkeyup = function(ev) {
      var val = sc_confirm_input.value;
      if (val === '') {
        sc_confirm_yes.setAttribute("disabled", "disabled");
        return;
      }
      sc_confirm_yes.removeAttribute("disabled");
      
      if (ev.keyCode !== 13)
        return;

      destroy(val);
    }
    sc_confirm_no.onclick = function() { destroy(); }

    sc_confirm.appendChild(sc_confirm_msg);
    sc_confirm.appendChild(sc_confirm_input);
    sc_confirm.appendChild(sc_confirm_no);
    sc_confirm.appendChild(sc_confirm_yes);

    document.getElementsByTagName('body')[0].appendChild(sc_backdrop);
    document.getElementsByTagName('body')[0].appendChild(sc_confirm);
    document.getElementsByTagName('body')[0].onkeyup = function(ev) {
      if (ev.keyCode === 27)
        destroy();
    }

    setTimeout(function() {
      sc_confirm_input.focus();
      sc_backdrop.className = 'show';
      sc_confirm.className = 'show';
    }, 50);
  },

  show: function(msg, state) {
    var className = state ? 'success' : (state === false ? 'error' : 'info');
    var curr = document.getElementsByClassName('toast');
    var toast = document.createElement('div');
    var t = document.createTextNode(msg);
  
    toast.appendChild(t);
    toast.className = className;
  
    toast.id = 'toast_' + (new Date).toISOString();
    toast.className = 'toast';
  
    var h = 0;
    for (var i = 0; i < curr.length; i++) {
      var el = document.getElementById(curr[(curr.length - 1) - i].id);
  
      if ((i + 1) < this.opts.max) {
        h += (el.clientHeight + 10);
        el.style.marginTop = h + 'px';
      } else {
        el.className = 'toast gone ' + className;
      }
    }
  
    document.getElementsByTagName('body')[0].appendChild(toast);
  
    setTimeout(function() { toast.className = 'toast show ' + className; }, 50);
    setTimeout(function() { toast.className = 'toast gone ' + className; }, 5000);
    setTimeout(function() { try { toast.remove(); } catch(ex) {} }, 6000);
  },

  success: function(msg) {
    this.show(msg, true);
  },

  error: function(msg) {
    this.show(msg, false);
  },
  
  info: function(msg) {
    this.show(msg);
  }
}

Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for(var i = this.length - 1; i >= 0; i--) {
      if(this[i] && this[i].parentElement) {
          this[i].parentElement.removeChild(this[i]);
      }
  }
}
},{}],2:[function(require,module,exports){
var pb = require('./index');

document.getElementById('pb-toast-success').onclick = function() {
  pb.success('This is an example success toast');
}

document.getElementById('pb-toast-error').onclick = function() {
  pb.error('This is an example error toast');
}

document.getElementById('pb-toast-info').onclick = function() {
  pb.info('This is an example info toast');
}

document.getElementById('pb-confirm').onclick = function() {
  pb.confirm(
    function(outcome) { alert('You have: ' + (outcome ? 'confirmed' : 'cancelled')) }, // Callback
    'This is an example confirm', // Label text
    'Yes',                        // Confirm text
    'No'                          // Cancel text
  );
}

document.getElementById('pb-prompt').onclick = function() {
  pb.prompt(
    function(value) { alert('You have: ' + (value ? 'entered ' + value : 'cancelled')) }, // Callback
    'This is an example prompt',  // Label text
    'text',                       // Input type
    'Submit',                     // Submit text
    'Cancel'                      // Cancel text
  );
}
},{"./index":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL1VzZXJzL3JvYmVydC5ob2xkZW4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXguanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBvcHRzOiB7XHJcbiAgICBtYXg6IDVcclxuICB9LFxyXG5cclxuICBybUJhY2tEcm9wOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB2YXIgb2xkQyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2MtY29uZmlybVwiKTtcclxuICAgICAgdmFyIG9sZEIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWJhY2tkcm9wXCIpO1xyXG4gICAgICBpZiAob2xkQykgb2xkQy5yZW1vdmUoKTtcclxuICAgICAgaWYgKG9sZEIpIG9sZEIucmVtb3ZlKCk7XHJcbiAgICB9IGNhdGNoKGV4KSB7fVxyXG4gIH0sXHJcblxyXG4gIGNvbmZpcm06IGZ1bmN0aW9uIChjYWxsYmFjaywgbXNnLCB5ZXMsIG5vKSB7XHJcbiAgICBpZiAoIW1zZykgbXNnID0gJ0FyZSB5b3Ugc3VyZT8nO1xyXG4gICAgaWYgKCF5ZXMpIHllcyA9ICdZZXMnO1xyXG4gICAgaWYgKCFubykgbm8gPSAnQ2FuY2VsJztcclxuXHJcbiAgICB0aGlzLnJtQmFja0Ryb3AoKTtcclxuXHJcbiAgICB2YXIgc2NfYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHZhciBzY19jb25maXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB2YXIgc2NfY29uZmlybV9tc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB2YXIgc2NfY29uZmlybV95ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIHZhciBzY19jb25maXJtX25vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgc2NfY29uZmlybV9tc2cuaW5uZXJIVE1MID0gbXNnO1xyXG4gICAgc2NfY29uZmlybV9uby5pbm5lckhUTUwgPSBubztcclxuICAgIHNjX2NvbmZpcm1feWVzLmlubmVySFRNTCA9IHllcztcclxuXHJcbiAgICBzY19iYWNrZHJvcC5pZCA9IFwic2MtYmFja2Ryb3BcIjtcclxuICAgIHNjX2NvbmZpcm0uaWQgPSBcInNjLWNvbmZpcm1cIjtcclxuICAgIHNjX2NvbmZpcm1feWVzLmlkID0gXCJzYy1jb25maXJtLXllc1wiO1xyXG4gICAgc2NfY29uZmlybV9uby5pZCA9IFwic2MtY29uZmlybS1ub1wiO1xyXG5cclxuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24ob3V0Y29tZSkge1xyXG4gICAgICBzY19iYWNrZHJvcC5jbGFzc05hbWUgPSAnJztcclxuICAgICAgc2NfY29uZmlybS5jbGFzc05hbWUgPSAnJztcclxuXHJcbiAgICAgIGNhbGxiYWNrKG91dGNvbWUgfHwgZmFsc2UpO1xyXG5cclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgc2NfYmFja2Ryb3AucmVtb3ZlKCk7XHJcbiAgICAgICAgICBzY19jb25maXJtLnJlbW92ZSgpO1xyXG4gICAgICAgIH0gY2F0Y2goZXgpIHt9XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBzY19jb25maXJtX3llcy5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlc3Ryb3kodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBzY19jb25maXJtX25vLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgZGVzdHJveSgpOyB9XHJcblxyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX21zZyk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbm8pO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX3llcyk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzY19iYWNrZHJvcCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2NvbmZpcm0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5vbmtleXVwID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgIGlmIChldi5rZXlDb2RlID09PSAyNylcclxuICAgICAgICBkZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgc2NfY29uZmlybV95ZXMuZm9jdXMoKTtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgIH0sIDUwKTtcclxuICB9LFxyXG4gIFxyXG4gIHByb21wdDogZnVuY3Rpb24oY2FsbGJhY2ssIG1zZywgdHlwZSwgc3VibWl0LCBubykge1xyXG4gICAgaWYgKCFtc2cpIG1zZyA9ICdBcmUgeW91IHN1cmU/JztcclxuICAgIGlmICghdHlwZSkgdHlwZSA9ICd0ZXh0JztcclxuICAgIGlmICghc3VibWl0KSBzdWJtaXQgPSAnU3VibWl0JztcclxuICAgIGlmICghbm8pIG5vID0gJ0NhbmNlbCc7XHJcblxyXG4gICAgdGhpcy5ybUJhY2tEcm9wKCk7XHJcblxyXG4gICAgdmFyIHNjX2JhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICB2YXIgc2NfY29uZmlybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdmFyIHNjX2NvbmZpcm1faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgdmFyIHNjX2NvbmZpcm1fbXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgdmFyIHNjX2NvbmZpcm1feWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICB2YXIgc2NfY29uZmlybV9ubyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIHNjX2NvbmZpcm1faW5wdXQudHlwZSA9IHR5cGU7XHJcbiAgICBzY19jb25maXJtX21zZy5pbm5lckhUTUwgPSBtc2c7XHJcbiAgICBzY19jb25maXJtX25vLmlubmVySFRNTCA9IG5vO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaW5uZXJIVE1MID0gc3VibWl0O1xyXG5cclxuICAgIHNjX2JhY2tkcm9wLmlkID0gXCJzYy1iYWNrZHJvcFwiO1xyXG4gICAgc2NfY29uZmlybS5pZCA9IFwic2MtY29uZmlybVwiO1xyXG4gICAgc2NfY29uZmlybV9pbnB1dC5pZCA9IFwic2MtY29uZmlybS1pbnB1dFwiO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaWQgPSBcInNjLWNvbmZpcm0teWVzXCI7XHJcbiAgICBzY19jb25maXJtX25vLmlkID0gXCJzYy1jb25maXJtLW5vXCI7XHJcblxyXG4gICAgc2NfY29uZmlybV95ZXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHJcbiAgICB2YXIgZGVzdHJveSA9IGZ1bmN0aW9uIChvdXRjb21lKSB7XHJcbiAgICAgIHNjX2JhY2tkcm9wLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuICAgICAgY2FsbGJhY2sob3V0Y29tZSB8fCBmYWxzZSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICBzY19iYWNrZHJvcC5yZW1vdmUoKTtcclxuICAgICAgICAgIHNjX2NvbmZpcm0ucmVtb3ZlKCk7XHJcbiAgICAgICAgfSBjYXRjaChleCkge31cclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNjX2NvbmZpcm1feWVzLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgdmFyIHZhbCA9IHNjX2NvbmZpcm1faW5wdXQudmFsdWU7XHJcbiAgICAgIGlmICh2YWwgPT09ICcnKSB7XHJcbiAgICAgICAgc2NfY29uZmlybV9pbnB1dC5mb2N1cygpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgZGVzdHJveSh2YWwpO1xyXG4gICAgfVxyXG4gICAgc2NfY29uZmlybV9pbnB1dC5vbmtleXVwID0gZnVuY3Rpb24oZXYpIHtcclxuICAgICAgdmFyIHZhbCA9IHNjX2NvbmZpcm1faW5wdXQudmFsdWU7XHJcbiAgICAgIGlmICh2YWwgPT09ICcnKSB7XHJcbiAgICAgICAgc2NfY29uZmlybV95ZXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2NfY29uZmlybV95ZXMucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoZXYua2V5Q29kZSAhPT0gMTMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgZGVzdHJveSh2YWwpO1xyXG4gICAgfVxyXG4gICAgc2NfY29uZmlybV9uby5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IGRlc3Ryb3koKTsgfVxyXG5cclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9tc2cpO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX2lucHV0KTtcclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9ubyk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1feWVzKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2JhY2tkcm9wKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLm9ua2V5dXAgPSBmdW5jdGlvbihldikge1xyXG4gICAgICBpZiAoZXYua2V5Q29kZSA9PT0gMjcpXHJcbiAgICAgICAgZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNjX2NvbmZpcm1faW5wdXQuZm9jdXMoKTtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgIH0sIDUwKTtcclxuICB9LFxyXG5cclxuICBzaG93OiBmdW5jdGlvbihtc2csIHN0YXRlKSB7XHJcbiAgICB2YXIgY2xhc3NOYW1lID0gc3RhdGUgPyAnc3VjY2VzcycgOiAoc3RhdGUgPT09IGZhbHNlID8gJ2Vycm9yJyA6ICdpbmZvJyk7XHJcbiAgICB2YXIgY3VyciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3RvYXN0Jyk7XHJcbiAgICB2YXIgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHZhciB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnKTtcclxuICBcclxuICAgIHRvYXN0LmFwcGVuZENoaWxkKHQpO1xyXG4gICAgdG9hc3QuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gIFxyXG4gICAgdG9hc3QuaWQgPSAndG9hc3RfJyArIChuZXcgRGF0ZSkudG9JU09TdHJpbmcoKTtcclxuICAgIHRvYXN0LmNsYXNzTmFtZSA9ICd0b2FzdCc7XHJcbiAgXHJcbiAgICB2YXIgaCA9IDA7XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGN1cnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY3VyclsoY3Vyci5sZW5ndGggLSAxKSAtIGldLmlkKTtcclxuICBcclxuICAgICAgaWYgKChpICsgMSkgPCB0aGlzLm9wdHMubWF4KSB7XHJcbiAgICAgICAgaCArPSAoZWwuY2xpZW50SGVpZ2h0ICsgMTApO1xyXG4gICAgICAgIGVsLnN0eWxlLm1hcmdpblRvcCA9IGggKyAncHgnO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICd0b2FzdCBnb25lICcgKyBjbGFzc05hbWU7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQodG9hc3QpO1xyXG4gIFxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdG9hc3QuY2xhc3NOYW1lID0gJ3RvYXN0IHNob3cgJyArIGNsYXNzTmFtZTsgfSwgNTApO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdG9hc3QuY2xhc3NOYW1lID0gJ3RvYXN0IGdvbmUgJyArIGNsYXNzTmFtZTsgfSwgNTAwMCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0cnkgeyB0b2FzdC5yZW1vdmUoKTsgfSBjYXRjaChleCkge30gfSwgNjAwMCk7XHJcbiAgfSxcclxuXHJcbiAgc3VjY2VzczogZnVuY3Rpb24obXNnKSB7XHJcbiAgICB0aGlzLnNob3cobXNnLCB0cnVlKTtcclxuICB9LFxyXG5cclxuICBlcnJvcjogZnVuY3Rpb24obXNnKSB7XHJcbiAgICB0aGlzLnNob3cobXNnLCBmYWxzZSk7XHJcbiAgfSxcclxuICBcclxuICBpbmZvOiBmdW5jdGlvbihtc2cpIHtcclxuICAgIHRoaXMuc2hvdyhtc2cpO1xyXG4gIH1cclxufVxyXG5cclxuRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcbiAgdGhpcy5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xyXG59XHJcbk5vZGVMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBIVE1MQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oKSB7XHJcbiAgZm9yKHZhciBpID0gdGhpcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBpZih0aGlzW2ldICYmIHRoaXNbaV0ucGFyZW50RWxlbWVudCkge1xyXG4gICAgICAgICAgdGhpc1tpXS5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHRoaXNbaV0pO1xyXG4gICAgICB9XHJcbiAgfVxyXG59IiwidmFyIHBiID0gcmVxdWlyZSgnLi9pbmRleCcpO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXRvYXN0LXN1Y2Nlc3MnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIuc3VjY2VzcygnVGhpcyBpcyBhbiBleGFtcGxlIHN1Y2Nlc3MgdG9hc3QnKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXRvYXN0LWVycm9yJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHBiLmVycm9yKCdUaGlzIGlzIGFuIGV4YW1wbGUgZXJyb3IgdG9hc3QnKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXRvYXN0LWluZm8nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIuaW5mbygnVGhpcyBpcyBhbiBleGFtcGxlIGluZm8gdG9hc3QnKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLWNvbmZpcm0nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIuY29uZmlybShcclxuICAgIGZ1bmN0aW9uKG91dGNvbWUpIHsgYWxlcnQoJ1lvdSBoYXZlOiAnICsgKG91dGNvbWUgPyAnY29uZmlybWVkJyA6ICdjYW5jZWxsZWQnKSkgfSwgLy8gQ2FsbGJhY2tcclxuICAgICdUaGlzIGlzIGFuIGV4YW1wbGUgY29uZmlybScsIC8vIExhYmVsIHRleHRcclxuICAgICdZZXMnLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbmZpcm0gdGV4dFxyXG4gICAgJ05vJyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FuY2VsIHRleHRcclxuICApO1xyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItcHJvbXB0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHBiLnByb21wdChcclxuICAgIGZ1bmN0aW9uKHZhbHVlKSB7IGFsZXJ0KCdZb3UgaGF2ZTogJyArICh2YWx1ZSA/ICdlbnRlcmVkICcgKyB2YWx1ZSA6ICdjYW5jZWxsZWQnKSkgfSwgLy8gQ2FsbGJhY2tcclxuICAgICdUaGlzIGlzIGFuIGV4YW1wbGUgcHJvbXB0JywgIC8vIExhYmVsIHRleHRcclxuICAgICd0ZXh0JywgICAgICAgICAgICAgICAgICAgICAgIC8vIElucHV0IHR5cGVcclxuICAgICdTdWJtaXQnLCAgICAgICAgICAgICAgICAgICAgIC8vIFN1Ym1pdCB0ZXh0XHJcbiAgICAnQ2FuY2VsJyAgICAgICAgICAgICAgICAgICAgICAvLyBDYW5jZWwgdGV4dFxyXG4gICk7XHJcbn0iXX0=
