(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  opts: {
    max: 5
  },

  confirm: function (callback, msg, yes, no) {
    if (!msg) msg = 'Are you sure?';
    if (!yes) yes = 'Yes';
    if (!no) no = 'Cancel';

    var oldC = document.getElementById("sc-confirm");
    var oldB = document.getElementById("sc-backdrop");
    if (oldC) oldC.remove();
    if (oldB) oldB.remove();

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
        sc_backdrop.remove();
        sc_confirm.remove();
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

    var oldC = document.getElementById("sc-confirm");
    var oldB = document.getElementById("sc-backdrop");
    if (oldC) oldC.remove();
    if (oldB) oldB.remove();

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
        sc_backdrop.remove();
        sc_confirm.remove();
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
    setTimeout(function() { toast.remove(); }, 6000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcclxuICBvcHRzOiB7XHJcbiAgICBtYXg6IDVcclxuICB9LFxyXG5cclxuICBjb25maXJtOiBmdW5jdGlvbiAoY2FsbGJhY2ssIG1zZywgeWVzLCBubykge1xyXG4gICAgaWYgKCFtc2cpIG1zZyA9ICdBcmUgeW91IHN1cmU/JztcclxuICAgIGlmICgheWVzKSB5ZXMgPSAnWWVzJztcclxuICAgIGlmICghbm8pIG5vID0gJ0NhbmNlbCc7XHJcblxyXG4gICAgdmFyIG9sZEMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWNvbmZpcm1cIik7XHJcbiAgICB2YXIgb2xkQiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2MtYmFja2Ryb3BcIik7XHJcbiAgICBpZiAob2xkQykgb2xkQy5yZW1vdmUoKTtcclxuICAgIGlmIChvbGRCKSBvbGRCLnJlbW92ZSgpO1xyXG5cclxuICAgIHZhciBzY19iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdmFyIHNjX2NvbmZpcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHZhciBzY19jb25maXJtX21zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHZhciBzY19jb25maXJtX3llcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdmFyIHNjX2NvbmZpcm1fbm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBzY19jb25maXJtX21zZy5pbm5lckhUTUwgPSBtc2c7XHJcbiAgICBzY19jb25maXJtX25vLmlubmVySFRNTCA9IG5vO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaW5uZXJIVE1MID0geWVzO1xyXG5cclxuICAgIHNjX2JhY2tkcm9wLmlkID0gXCJzYy1iYWNrZHJvcFwiO1xyXG4gICAgc2NfY29uZmlybS5pZCA9IFwic2MtY29uZmlybVwiO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaWQgPSBcInNjLWNvbmZpcm0teWVzXCI7XHJcbiAgICBzY19jb25maXJtX25vLmlkID0gXCJzYy1jb25maXJtLW5vXCI7XHJcblxyXG4gICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbihvdXRjb21lKSB7XHJcbiAgICAgIHNjX2JhY2tkcm9wLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuICAgICAgY2FsbGJhY2sob3V0Y29tZSB8fCBmYWxzZSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjX2JhY2tkcm9wLnJlbW92ZSgpO1xyXG4gICAgICAgIHNjX2NvbmZpcm0ucmVtb3ZlKCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBzY19jb25maXJtX3llcy5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlc3Ryb3kodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBzY19jb25maXJtX25vLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgZGVzdHJveSgpOyB9XHJcblxyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX21zZyk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbm8pO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX3llcyk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzY19iYWNrZHJvcCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2NvbmZpcm0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5vbmtleXVwID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgIGlmIChldi5rZXlDb2RlID09PSAyNylcclxuICAgICAgICBkZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgc2NfY29uZmlybV95ZXMuZm9jdXMoKTtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgIH0sIDUwKTtcclxuICB9LFxyXG4gIFxyXG4gIHByb21wdDogZnVuY3Rpb24oY2FsbGJhY2ssIG1zZywgdHlwZSwgc3VibWl0LCBubykge1xyXG4gICAgaWYgKCFtc2cpIG1zZyA9ICdBcmUgeW91IHN1cmU/JztcclxuICAgIGlmICghdHlwZSkgdHlwZSA9ICd0ZXh0JztcclxuICAgIGlmICghc3VibWl0KSBzdWJtaXQgPSAnU3VibWl0JztcclxuICAgIGlmICghbm8pIG5vID0gJ0NhbmNlbCc7XHJcblxyXG4gICAgdmFyIG9sZEMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWNvbmZpcm1cIik7XHJcbiAgICB2YXIgb2xkQiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2MtYmFja2Ryb3BcIik7XHJcbiAgICBpZiAob2xkQykgb2xkQy5yZW1vdmUoKTtcclxuICAgIGlmIChvbGRCKSBvbGRCLnJlbW92ZSgpO1xyXG5cclxuICAgIHZhciBzY19iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdmFyIHNjX2NvbmZpcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIHZhciBzY19jb25maXJtX2lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcclxuICAgIHZhciBzY19jb25maXJtX21zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHZhciBzY19jb25maXJtX3llcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgdmFyIHNjX2NvbmZpcm1fbm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBzY19jb25maXJtX2lucHV0LnR5cGUgPSB0eXBlO1xyXG4gICAgc2NfY29uZmlybV9tc2cuaW5uZXJIVE1MID0gbXNnO1xyXG4gICAgc2NfY29uZmlybV9uby5pbm5lckhUTUwgPSBubztcclxuICAgIHNjX2NvbmZpcm1feWVzLmlubmVySFRNTCA9IHN1Ym1pdDtcclxuXHJcbiAgICBzY19iYWNrZHJvcC5pZCA9IFwic2MtYmFja2Ryb3BcIjtcclxuICAgIHNjX2NvbmZpcm0uaWQgPSBcInNjLWNvbmZpcm1cIjtcclxuICAgIHNjX2NvbmZpcm1faW5wdXQuaWQgPSBcInNjLWNvbmZpcm0taW5wdXRcIjtcclxuICAgIHNjX2NvbmZpcm1feWVzLmlkID0gXCJzYy1jb25maXJtLXllc1wiO1xyXG4gICAgc2NfY29uZmlybV9uby5pZCA9IFwic2MtY29uZmlybS1ub1wiO1xyXG5cclxuICAgIHNjX2NvbmZpcm1feWVzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcblxyXG4gICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbiAob3V0Y29tZSkge1xyXG4gICAgICBzY19iYWNrZHJvcC5jbGFzc05hbWUgPSAnJztcclxuICAgICAgc2NfY29uZmlybS5jbGFzc05hbWUgPSAnJztcclxuXHJcbiAgICAgIGNhbGxiYWNrKG91dGNvbWUgfHwgZmFsc2UpO1xyXG5cclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBzY19iYWNrZHJvcC5yZW1vdmUoKTtcclxuICAgICAgICBzY19jb25maXJtLnJlbW92ZSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgc2NfY29uZmlybV95ZXMub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICB2YXIgdmFsID0gc2NfY29uZmlybV9pbnB1dC52YWx1ZTtcclxuICAgICAgaWYgKHZhbCA9PT0gJycpIHtcclxuICAgICAgICBzY19jb25maXJtX2lucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkZXN0cm95KHZhbCk7XHJcbiAgICB9XHJcbiAgICBzY19jb25maXJtX2lucHV0Lm9ua2V5dXAgPSBmdW5jdGlvbihldikge1xyXG4gICAgICB2YXIgdmFsID0gc2NfY29uZmlybV9pbnB1dC52YWx1ZTtcclxuICAgICAgaWYgKHZhbCA9PT0gJycpIHtcclxuICAgICAgICBzY19jb25maXJtX3llcy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG4gICAgICBzY19jb25maXJtX3llcy5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgXHJcbiAgICAgIGlmIChldi5rZXlDb2RlICE9PSAxMylcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICBkZXN0cm95KHZhbCk7XHJcbiAgICB9XHJcbiAgICBzY19jb25maXJtX25vLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgZGVzdHJveSgpOyB9XHJcblxyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX21zZyk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1faW5wdXQpO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX25vKTtcclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV95ZXMpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc2NfYmFja2Ryb3ApO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzY19jb25maXJtKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0ub25rZXl1cCA9IGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgIGlmIChldi5rZXlDb2RlID09PSAyNylcclxuICAgICAgICBkZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgc2NfY29uZmlybV9pbnB1dC5mb2N1cygpO1xyXG4gICAgICBzY19iYWNrZHJvcC5jbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICAgIHNjX2NvbmZpcm0uY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgfSwgNTApO1xyXG4gIH0sXHJcblxyXG4gIHNob3c6IGZ1bmN0aW9uKG1zZywgc3RhdGUpIHtcclxuICAgIHZhciBjbGFzc05hbWUgPSBzdGF0ZSA/ICdzdWNjZXNzJyA6IChzdGF0ZSA9PT0gZmFsc2UgPyAnZXJyb3InIDogJ2luZm8nKTtcclxuICAgIHZhciBjdXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9hc3QnKTtcclxuICAgIHZhciB0b2FzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgdmFyIHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2cpO1xyXG4gIFxyXG4gICAgdG9hc3QuYXBwZW5kQ2hpbGQodCk7XHJcbiAgICB0b2FzdC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgXHJcbiAgICB0b2FzdC5pZCA9ICd0b2FzdF8nICsgKG5ldyBEYXRlKS50b0lTT1N0cmluZygpO1xyXG4gICAgdG9hc3QuY2xhc3NOYW1lID0gJ3RvYXN0JztcclxuICBcclxuICAgIHZhciBoID0gMDtcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3Vyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyWyhjdXJyLmxlbmd0aCAtIDEpIC0gaV0uaWQpO1xyXG4gIFxyXG4gICAgICBpZiAoKGkgKyAxKSA8IHRoaXMub3B0cy5tYXgpIHtcclxuICAgICAgICBoICs9IChlbC5jbGllbnRIZWlnaHQgKyAxMCk7XHJcbiAgICAgICAgZWwuc3R5bGUubWFyZ2luVG9wID0gaCArICdweCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ3RvYXN0IGdvbmUgJyArIGNsYXNzTmFtZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZCh0b2FzdCk7XHJcbiAgXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0b2FzdC5jbGFzc05hbWUgPSAndG9hc3Qgc2hvdyAnICsgY2xhc3NOYW1lOyB9LCA1MCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0b2FzdC5jbGFzc05hbWUgPSAndG9hc3QgZ29uZSAnICsgY2xhc3NOYW1lOyB9LCA1MDAwKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRvYXN0LnJlbW92ZSgpOyB9LCA2MDAwKTtcclxuICB9LFxyXG5cclxuICBzdWNjZXNzOiBmdW5jdGlvbihtc2cpIHtcclxuICAgIHRoaXMuc2hvdyhtc2csIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIGVycm9yOiBmdW5jdGlvbihtc2cpIHtcclxuICAgIHRoaXMuc2hvdyhtc2csIGZhbHNlKTtcclxuICB9LFxyXG4gIFxyXG4gIGluZm86IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgdGhpcy5zaG93KG1zZyk7XHJcbiAgfVxyXG59XHJcblxyXG5FbGVtZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuICB0aGlzLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbn1cclxuTm9kZUxpc3QucHJvdG90eXBlLnJlbW92ZSA9IEhUTUxDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuICBmb3IodmFyIGkgPSB0aGlzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGlmKHRoaXNbaV0gJiYgdGhpc1tpXS5wYXJlbnRFbGVtZW50KSB7XHJcbiAgICAgICAgICB0aGlzW2ldLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpc1tpXSk7XHJcbiAgICAgIH1cclxuICB9XHJcbn0iLCJ2YXIgcGIgPSByZXF1aXJlKCcuL2luZGV4Jyk7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItdG9hc3Qtc3VjY2VzcycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBwYi5zdWNjZXNzKCdUaGlzIGlzIGFuIGV4YW1wbGUgc3VjY2VzcyB0b2FzdCcpO1xyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItdG9hc3QtZXJyb3InKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIuZXJyb3IoJ1RoaXMgaXMgYW4gZXhhbXBsZSBlcnJvciB0b2FzdCcpO1xyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItdG9hc3QtaW5mbycpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBwYi5pbmZvKCdUaGlzIGlzIGFuIGV4YW1wbGUgaW5mbyB0b2FzdCcpO1xyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItY29uZmlybScpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBwYi5jb25maXJtKFxyXG4gICAgZnVuY3Rpb24ob3V0Y29tZSkgeyBhbGVydCgnWW91IGhhdmU6ICcgKyAob3V0Y29tZSA/ICdjb25maXJtZWQnIDogJ2NhbmNlbGxlZCcpKSB9LCAvLyBDYWxsYmFja1xyXG4gICAgJ1RoaXMgaXMgYW4gZXhhbXBsZSBjb25maXJtJywgLy8gTGFiZWwgdGV4dFxyXG4gICAgJ1llcycsICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ29uZmlybSB0ZXh0XHJcbiAgICAnTm8nICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBDYW5jZWwgdGV4dFxyXG4gICk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYi1wcm9tcHQnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIucHJvbXB0KFxyXG4gICAgZnVuY3Rpb24odmFsdWUpIHsgYWxlcnQoJ1lvdSBoYXZlOiAnICsgKHZhbHVlID8gJ2VudGVyZWQgJyArIHZhbHVlIDogJ2NhbmNlbGxlZCcpKSB9LCAvLyBDYWxsYmFja1xyXG4gICAgJ1RoaXMgaXMgYW4gZXhhbXBsZSBwcm9tcHQnLCAgLy8gTGFiZWwgdGV4dFxyXG4gICAgJ3RleHQnLCAgICAgICAgICAgICAgICAgICAgICAgLy8gSW5wdXQgdHlwZVxyXG4gICAgJ1N1Ym1pdCcsICAgICAgICAgICAgICAgICAgICAgLy8gU3VibWl0IHRleHRcclxuICAgICdDYW5jZWwnICAgICAgICAgICAgICAgICAgICAgIC8vIENhbmNlbCB0ZXh0XHJcbiAgKTtcclxufSJdfQ==
