(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  opts: {
    max: 5
  },

  confirm: function (callback, msg, yes, no) {
    if (!msg) msg = 'Are you sure?';
    if (!yes) yes = 'Yes';
    if (!no) no = 'Cancel';

    const oldC = document.getElementById("sc-confirm");
    const oldB = document.getElementById("sc-backdrop");
    if (oldC) oldC.remove();
    if (oldB) oldB.remove();

    const sc_backdrop = document.createElement('div');
    const sc_confirm = document.createElement('div');
    const sc_confirm_msg = document.createElement('p');
    const sc_confirm_yes = document.createElement('button');
    const sc_confirm_no = document.createElement('button');

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

    const oldC = document.getElementById("sc-confirm");
    const oldB = document.getElementById("sc-backdrop");
    if (oldC) oldC.remove();
    if (oldB) oldB.remove();

    const sc_backdrop = document.createElement('div');
    const sc_confirm = document.createElement('div');
    const sc_confirm_input = document.createElement('input');
    const sc_confirm_msg = document.createElement('p');
    const sc_confirm_yes = document.createElement('button');
    const sc_confirm_no = document.createElement('button');

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

    const destroy = function (outcome) {
      sc_backdrop.className = '';
      sc_confirm.className = '';

      callback(outcome || false);

      setTimeout(function() {
        sc_backdrop.remove();
        sc_confirm.remove();
      }, 1000);
    };

    sc_confirm_yes.onclick = function() {
      const val = sc_confirm_input.value;
      if (val === '') {
        sc_confirm_input.focus();
        return;
      }

      destroy(val);
    }
    sc_confirm_input.onkeyup = function(ev) {
      const val = sc_confirm_input.value;
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
    const className = state ? 'success' : (state === false ? 'error' : 'info');
    const curr = document.getElementsByClassName('toast');
    const toast = document.createElement('div');
    const t = document.createTextNode(msg);
  
    toast.appendChild(t);
    toast.className = className;
  
    toast.id = 'toast_' + (new Date).toISOString();
    toast.className = 'toast';
  
    let h = 0;
    for (let i = 0; i < curr.length; i++) {
      const el = document.getElementById(curr[(curr.length - 1) - i].id);
  
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL1VzZXJzL3JvYmVydC5ob2xkZW4vQXBwRGF0YS9Sb2FtaW5nL25wbS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiaW5kZXguanMiLCJtYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgb3B0czoge1xyXG4gICAgbWF4OiA1XHJcbiAgfSxcclxuXHJcbiAgY29uZmlybTogZnVuY3Rpb24gKGNhbGxiYWNrLCBtc2csIHllcywgbm8pIHtcclxuICAgIGlmICghbXNnKSBtc2cgPSAnQXJlIHlvdSBzdXJlPyc7XHJcbiAgICBpZiAoIXllcykgeWVzID0gJ1llcyc7XHJcbiAgICBpZiAoIW5vKSBubyA9ICdDYW5jZWwnO1xyXG5cclxuICAgIGNvbnN0IG9sZEMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWNvbmZpcm1cIik7XHJcbiAgICBjb25zdCBvbGRCID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYy1iYWNrZHJvcFwiKTtcclxuICAgIGlmIChvbGRDKSBvbGRDLnJlbW92ZSgpO1xyXG4gICAgaWYgKG9sZEIpIG9sZEIucmVtb3ZlKCk7XHJcblxyXG4gICAgY29uc3Qgc2NfYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1fbXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybV95ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1fbm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBzY19jb25maXJtX21zZy5pbm5lckhUTUwgPSBtc2c7XHJcbiAgICBzY19jb25maXJtX25vLmlubmVySFRNTCA9IG5vO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaW5uZXJIVE1MID0geWVzO1xyXG5cclxuICAgIHNjX2JhY2tkcm9wLmlkID0gXCJzYy1iYWNrZHJvcFwiO1xyXG4gICAgc2NfY29uZmlybS5pZCA9IFwic2MtY29uZmlybVwiO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaWQgPSBcInNjLWNvbmZpcm0teWVzXCI7XHJcbiAgICBzY19jb25maXJtX25vLmlkID0gXCJzYy1jb25maXJtLW5vXCI7XHJcblxyXG4gICAgdmFyIGRlc3Ryb3kgPSBmdW5jdGlvbihvdXRjb21lKSB7XHJcbiAgICAgIHNjX2JhY2tkcm9wLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuICAgICAgY2FsbGJhY2sob3V0Y29tZSB8fCBmYWxzZSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHNjX2JhY2tkcm9wLnJlbW92ZSgpO1xyXG4gICAgICAgIHNjX2NvbmZpcm0ucmVtb3ZlKCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBzY19jb25maXJtX3llcy5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgIGRlc3Ryb3kodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBzY19jb25maXJtX25vLm9uY2xpY2sgPSBmdW5jdGlvbigpIHsgZGVzdHJveSgpOyB9XHJcblxyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX21zZyk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbm8pO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX3llcyk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzY19iYWNrZHJvcCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2NvbmZpcm0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5vbmtleXVwID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgIGlmIChldi5rZXlDb2RlID09PSAyNylcclxuICAgICAgICBkZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgc2NfY29uZmlybV95ZXMuZm9jdXMoKTtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgIH0sIDUwKTtcclxuICB9LFxyXG4gIFxyXG4gIHByb21wdDogZnVuY3Rpb24oY2FsbGJhY2ssIG1zZywgdHlwZSwgc3VibWl0LCBubykge1xyXG4gICAgaWYgKCFtc2cpIG1zZyA9ICdBcmUgeW91IHN1cmU/JztcclxuICAgIGlmICghdHlwZSkgdHlwZSA9ICd0ZXh0JztcclxuICAgIGlmICghc3VibWl0KSBzdWJtaXQgPSAnU3VibWl0JztcclxuICAgIGlmICghbm8pIG5vID0gJ0NhbmNlbCc7XHJcblxyXG4gICAgY29uc3Qgb2xkQyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2MtY29uZmlybVwiKTtcclxuICAgIGNvbnN0IG9sZEIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWJhY2tkcm9wXCIpO1xyXG4gICAgaWYgKG9sZEMpIG9sZEMucmVtb3ZlKCk7XHJcbiAgICBpZiAob2xkQikgb2xkQi5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCBzY19iYWNrZHJvcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybV9pbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XHJcbiAgICBjb25zdCBzY19jb25maXJtX21zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1feWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBzY19jb25maXJtX25vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgc2NfY29uZmlybV9pbnB1dC50eXBlID0gdHlwZTtcclxuICAgIHNjX2NvbmZpcm1fbXNnLmlubmVySFRNTCA9IG1zZztcclxuICAgIHNjX2NvbmZpcm1fbm8uaW5uZXJIVE1MID0gbm87XHJcbiAgICBzY19jb25maXJtX3llcy5pbm5lckhUTUwgPSBzdWJtaXQ7XHJcblxyXG4gICAgc2NfYmFja2Ryb3AuaWQgPSBcInNjLWJhY2tkcm9wXCI7XHJcbiAgICBzY19jb25maXJtLmlkID0gXCJzYy1jb25maXJtXCI7XHJcbiAgICBzY19jb25maXJtX2lucHV0LmlkID0gXCJzYy1jb25maXJtLWlucHV0XCI7XHJcbiAgICBzY19jb25maXJtX3llcy5pZCA9IFwic2MtY29uZmlybS15ZXNcIjtcclxuICAgIHNjX2NvbmZpcm1fbm8uaWQgPSBcInNjLWNvbmZpcm0tbm9cIjtcclxuXHJcbiAgICBzY19jb25maXJtX3llcy5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcImRpc2FibGVkXCIpO1xyXG5cclxuICAgIGNvbnN0IGRlc3Ryb3kgPSBmdW5jdGlvbiAob3V0Y29tZSkge1xyXG4gICAgICBzY19iYWNrZHJvcC5jbGFzc05hbWUgPSAnJztcclxuICAgICAgc2NfY29uZmlybS5jbGFzc05hbWUgPSAnJztcclxuXHJcbiAgICAgIGNhbGxiYWNrKG91dGNvbWUgfHwgZmFsc2UpO1xyXG5cclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBzY19iYWNrZHJvcC5yZW1vdmUoKTtcclxuICAgICAgICBzY19jb25maXJtLnJlbW92ZSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgc2NfY29uZmlybV95ZXMub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBjb25zdCB2YWwgPSBzY19jb25maXJtX2lucHV0LnZhbHVlO1xyXG4gICAgICBpZiAodmFsID09PSAnJykge1xyXG4gICAgICAgIHNjX2NvbmZpcm1faW5wdXQuZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRlc3Ryb3kodmFsKTtcclxuICAgIH1cclxuICAgIHNjX2NvbmZpcm1faW5wdXQub25rZXl1cCA9IGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAgIGNvbnN0IHZhbCA9IHNjX2NvbmZpcm1faW5wdXQudmFsdWU7XHJcbiAgICAgIGlmICh2YWwgPT09ICcnKSB7XHJcbiAgICAgICAgc2NfY29uZmlybV95ZXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgICAgc2NfY29uZmlybV95ZXMucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XHJcbiAgICAgIFxyXG4gICAgICBpZiAoZXYua2V5Q29kZSAhPT0gMTMpXHJcbiAgICAgICAgcmV0dXJuO1xyXG5cclxuICAgICAgZGVzdHJveSh2YWwpO1xyXG4gICAgfVxyXG4gICAgc2NfY29uZmlybV9uby5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IGRlc3Ryb3koKTsgfVxyXG5cclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9tc2cpO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX2lucHV0KTtcclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9ubyk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1feWVzKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2JhY2tkcm9wKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLm9ua2V5dXAgPSBmdW5jdGlvbihldikge1xyXG4gICAgICBpZiAoZXYua2V5Q29kZSA9PT0gMjcpXHJcbiAgICAgICAgZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNjX2NvbmZpcm1faW5wdXQuZm9jdXMoKTtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgIH0sIDUwKTtcclxuICB9LFxyXG5cclxuICBzaG93OiBmdW5jdGlvbihtc2csIHN0YXRlKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSBzdGF0ZSA/ICdzdWNjZXNzJyA6IChzdGF0ZSA9PT0gZmFsc2UgPyAnZXJyb3InIDogJ2luZm8nKTtcclxuICAgIGNvbnN0IGN1cnIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd0b2FzdCcpO1xyXG4gICAgY29uc3QgdG9hc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtc2cpO1xyXG4gIFxyXG4gICAgdG9hc3QuYXBwZW5kQ2hpbGQodCk7XHJcbiAgICB0b2FzdC5jbGFzc05hbWUgPSBjbGFzc05hbWU7XHJcbiAgXHJcbiAgICB0b2FzdC5pZCA9ICd0b2FzdF8nICsgKG5ldyBEYXRlKS50b0lTT1N0cmluZygpO1xyXG4gICAgdG9hc3QuY2xhc3NOYW1lID0gJ3RvYXN0JztcclxuICBcclxuICAgIGxldCBoID0gMDtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3Vyci5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGN1cnJbKGN1cnIubGVuZ3RoIC0gMSkgLSBpXS5pZCk7XHJcbiAgXHJcbiAgICAgIGlmICgoaSArIDEpIDwgdGhpcy5vcHRzLm1heCkge1xyXG4gICAgICAgIGggKz0gKGVsLmNsaWVudEhlaWdodCArIDEwKTtcclxuICAgICAgICBlbC5zdHlsZS5tYXJnaW5Ub3AgPSBoICsgJ3B4JztcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbC5jbGFzc05hbWUgPSAndG9hc3QgZ29uZSAnICsgY2xhc3NOYW1lO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHRvYXN0KTtcclxuICBcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRvYXN0LmNsYXNzTmFtZSA9ICd0b2FzdCBzaG93ICcgKyBjbGFzc05hbWU7IH0sIDUwKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRvYXN0LmNsYXNzTmFtZSA9ICd0b2FzdCBnb25lICcgKyBjbGFzc05hbWU7IH0sIDUwMDApO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgdG9hc3QucmVtb3ZlKCk7IH0sIDYwMDApO1xyXG4gIH0sXHJcblxyXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgdGhpcy5zaG93KG1zZywgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgZXJyb3I6IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgdGhpcy5zaG93KG1zZywgZmFsc2UpO1xyXG4gIH0sXHJcbiAgXHJcbiAgaW5mbzogZnVuY3Rpb24obXNnKSB7XHJcbiAgICB0aGlzLnNob3cobXNnKTtcclxuICB9XHJcbn1cclxuXHJcbkVsZW1lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG4gIHRoaXMucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzKTtcclxufVxyXG5Ob2RlTGlzdC5wcm90b3R5cGUucmVtb3ZlID0gSFRNTENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG4gIGZvcih2YXIgaSA9IHRoaXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgaWYodGhpc1tpXSAmJiB0aGlzW2ldLnBhcmVudEVsZW1lbnQpIHtcclxuICAgICAgICAgIHRoaXNbaV0ucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzW2ldKTtcclxuICAgICAgfVxyXG4gIH1cclxufSIsInZhciBwYiA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYi10b2FzdC1zdWNjZXNzJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHBiLnN1Y2Nlc3MoJ1RoaXMgaXMgYW4gZXhhbXBsZSBzdWNjZXNzIHRvYXN0Jyk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYi10b2FzdC1lcnJvcicpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBwYi5lcnJvcignVGhpcyBpcyBhbiBleGFtcGxlIGVycm9yIHRvYXN0Jyk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYi10b2FzdC1pbmZvJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHBiLmluZm8oJ1RoaXMgaXMgYW4gZXhhbXBsZSBpbmZvIHRvYXN0Jyk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYi1jb25maXJtJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHBiLmNvbmZpcm0oXHJcbiAgICBmdW5jdGlvbihvdXRjb21lKSB7IGFsZXJ0KCdZb3UgaGF2ZTogJyArIChvdXRjb21lID8gJ2NvbmZpcm1lZCcgOiAnY2FuY2VsbGVkJykpIH0sIC8vIENhbGxiYWNrXHJcbiAgICAnVGhpcyBpcyBhbiBleGFtcGxlIGNvbmZpcm0nLCAvLyBMYWJlbCB0ZXh0XHJcbiAgICAnWWVzJywgICAgICAgICAgICAgICAgICAgICAgICAvLyBDb25maXJtIHRleHRcclxuICAgICdObycgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENhbmNlbCB0ZXh0XHJcbiAgKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXByb21wdCcpLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICBwYi5wcm9tcHQoXHJcbiAgICBmdW5jdGlvbih2YWx1ZSkgeyBhbGVydCgnWW91IGhhdmU6ICcgKyAodmFsdWUgPyAnZW50ZXJlZCAnICsgdmFsdWUgOiAnY2FuY2VsbGVkJykpIH0sIC8vIENhbGxiYWNrXHJcbiAgICAnVGhpcyBpcyBhbiBleGFtcGxlIHByb21wdCcsICAvLyBMYWJlbCB0ZXh0XHJcbiAgICAndGV4dCcsICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnB1dCB0eXBlXHJcbiAgICAnU3VibWl0JywgICAgICAgICAgICAgICAgICAgICAvLyBTdWJtaXQgdGV4dFxyXG4gICAgJ0NhbmNlbCcgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FuY2VsIHRleHRcclxuICApO1xyXG59Il19
