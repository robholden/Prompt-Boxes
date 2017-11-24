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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0ge1xyXG4gIG9wdHM6IHtcclxuICAgIG1heDogNVxyXG4gIH0sXHJcblxyXG4gIGNvbmZpcm06IGZ1bmN0aW9uIChjYWxsYmFjaywgbXNnLCB5ZXMsIG5vKSB7XHJcbiAgICBpZiAoIW1zZykgbXNnID0gJ0FyZSB5b3Ugc3VyZT8nO1xyXG4gICAgaWYgKCF5ZXMpIHllcyA9ICdZZXMnO1xyXG4gICAgaWYgKCFubykgbm8gPSAnQ2FuY2VsJztcclxuXHJcbiAgICBjb25zdCBvbGRDID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYy1jb25maXJtXCIpO1xyXG4gICAgY29uc3Qgb2xkQiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2MtYmFja2Ryb3BcIik7XHJcbiAgICBpZiAob2xkQykgb2xkQy5yZW1vdmUoKTtcclxuICAgIGlmIChvbGRCKSBvbGRCLnJlbW92ZSgpO1xyXG5cclxuICAgIGNvbnN0IHNjX2JhY2tkcm9wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBzY19jb25maXJtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCBzY19jb25maXJtX21zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1feWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICBjb25zdCBzY19jb25maXJtX25vID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcblxyXG4gICAgc2NfY29uZmlybV9tc2cuaW5uZXJIVE1MID0gbXNnO1xyXG4gICAgc2NfY29uZmlybV9uby5pbm5lckhUTUwgPSBubztcclxuICAgIHNjX2NvbmZpcm1feWVzLmlubmVySFRNTCA9IHllcztcclxuXHJcbiAgICBzY19iYWNrZHJvcC5pZCA9IFwic2MtYmFja2Ryb3BcIjtcclxuICAgIHNjX2NvbmZpcm0uaWQgPSBcInNjLWNvbmZpcm1cIjtcclxuICAgIHNjX2NvbmZpcm1feWVzLmlkID0gXCJzYy1jb25maXJtLXllc1wiO1xyXG4gICAgc2NfY29uZmlybV9uby5pZCA9IFwic2MtY29uZmlybS1ub1wiO1xyXG5cclxuICAgIHZhciBkZXN0cm95ID0gZnVuY3Rpb24ob3V0Y29tZSkge1xyXG4gICAgICBzY19iYWNrZHJvcC5jbGFzc05hbWUgPSAnJztcclxuICAgICAgc2NfY29uZmlybS5jbGFzc05hbWUgPSAnJztcclxuXHJcbiAgICAgIGNhbGxiYWNrKG91dGNvbWUgfHwgZmFsc2UpO1xyXG5cclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICBzY19iYWNrZHJvcC5yZW1vdmUoKTtcclxuICAgICAgICBzY19jb25maXJtLnJlbW92ZSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgc2NfY29uZmlybV95ZXMub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICBkZXN0cm95KHRydWUpO1xyXG4gICAgfVxyXG4gICAgc2NfY29uZmlybV9uby5vbmNsaWNrID0gZnVuY3Rpb24oKSB7IGRlc3Ryb3koKTsgfVxyXG5cclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9tc2cpO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX25vKTtcclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV95ZXMpO1xyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc2NfYmFja2Ryb3ApO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzY19jb25maXJtKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0ub25rZXl1cCA9IGZ1bmN0aW9uIChldikge1xyXG4gICAgICBpZiAoZXYua2V5Q29kZSA9PT0gMjcpXHJcbiAgICAgICAgZGVzdHJveSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHNjX2NvbmZpcm1feWVzLmZvY3VzKCk7XHJcbiAgICAgIHNjX2JhY2tkcm9wLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgc2NfY29uZmlybS5jbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICB9LCA1MCk7XHJcbiAgfSxcclxuICBcclxuICBwcm9tcHQ6IGZ1bmN0aW9uKGNhbGxiYWNrLCBtc2csIHR5cGUsIHN1Ym1pdCwgbm8pIHtcclxuICAgIGlmICghbXNnKSBtc2cgPSAnQXJlIHlvdSBzdXJlPyc7XHJcbiAgICBpZiAoIXR5cGUpIHR5cGUgPSAndGV4dCc7XHJcbiAgICBpZiAoIXN1Ym1pdCkgc3VibWl0ID0gJ1N1Ym1pdCc7XHJcbiAgICBpZiAoIW5vKSBubyA9ICdDYW5jZWwnO1xyXG5cclxuICAgIGNvbnN0IG9sZEMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWNvbmZpcm1cIik7XHJcbiAgICBjb25zdCBvbGRCID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYy1iYWNrZHJvcFwiKTtcclxuICAgIGlmIChvbGRDKSBvbGRDLnJlbW92ZSgpO1xyXG4gICAgaWYgKG9sZEIpIG9sZEIucmVtb3ZlKCk7XHJcblxyXG4gICAgY29uc3Qgc2NfYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybV9tc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCBzY19jb25maXJtX3llcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybV9ubyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIHNjX2NvbmZpcm1faW5wdXQudHlwZSA9IHR5cGU7XHJcbiAgICBzY19jb25maXJtX21zZy5pbm5lckhUTUwgPSBtc2c7XHJcbiAgICBzY19jb25maXJtX25vLmlubmVySFRNTCA9IG5vO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaW5uZXJIVE1MID0gc3VibWl0O1xyXG5cclxuICAgIHNjX2JhY2tkcm9wLmlkID0gXCJzYy1iYWNrZHJvcFwiO1xyXG4gICAgc2NfY29uZmlybS5pZCA9IFwic2MtY29uZmlybVwiO1xyXG4gICAgc2NfY29uZmlybV9pbnB1dC5pZCA9IFwic2MtY29uZmlybS1pbnB1dFwiO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaWQgPSBcInNjLWNvbmZpcm0teWVzXCI7XHJcbiAgICBzY19jb25maXJtX25vLmlkID0gXCJzYy1jb25maXJtLW5vXCI7XHJcblxyXG4gICAgc2NfY29uZmlybV95ZXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHJcbiAgICBjb25zdCBkZXN0cm95ID0gZnVuY3Rpb24gKG91dGNvbWUpIHtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgIHNjX2NvbmZpcm0uY2xhc3NOYW1lID0gJyc7XHJcblxyXG4gICAgICBjYWxsYmFjayhvdXRjb21lIHx8IGZhbHNlKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc2NfYmFja2Ryb3AucmVtb3ZlKCk7XHJcbiAgICAgICAgc2NfY29uZmlybS5yZW1vdmUoKTtcclxuICAgICAgfSwgMTAwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIHNjX2NvbmZpcm1feWVzLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgY29uc3QgdmFsID0gc2NfY29uZmlybV9pbnB1dC52YWx1ZTtcclxuICAgICAgaWYgKHZhbCA9PT0gJycpIHtcclxuICAgICAgICBzY19jb25maXJtX2lucHV0LmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBkZXN0cm95KHZhbCk7XHJcbiAgICB9XHJcbiAgICBzY19jb25maXJtX2lucHV0Lm9ua2V5dXAgPSBmdW5jdGlvbihldikge1xyXG4gICAgICBjb25zdCB2YWwgPSBzY19jb25maXJtX2lucHV0LnZhbHVlO1xyXG4gICAgICBpZiAodmFsID09PSAnJykge1xyXG4gICAgICAgIHNjX2NvbmZpcm1feWVzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNjX2NvbmZpcm1feWVzLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICBcclxuICAgICAgaWYgKGV2LmtleUNvZGUgIT09IDEzKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgIGRlc3Ryb3kodmFsKTtcclxuICAgIH1cclxuICAgIHNjX2NvbmZpcm1fbm8ub25jbGljayA9IGZ1bmN0aW9uKCkgeyBkZXN0cm95KCk7IH1cclxuXHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbXNnKTtcclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9pbnB1dCk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbm8pO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX3llcyk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzY19iYWNrZHJvcCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2NvbmZpcm0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5vbmtleXVwID0gZnVuY3Rpb24oZXYpIHtcclxuICAgICAgaWYgKGV2LmtleUNvZGUgPT09IDI3KVxyXG4gICAgICAgIGRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICBzY19jb25maXJtX2lucHV0LmZvY3VzKCk7XHJcbiAgICAgIHNjX2JhY2tkcm9wLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgICAgc2NfY29uZmlybS5jbGFzc05hbWUgPSAnc2hvdyc7XHJcbiAgICB9LCA1MCk7XHJcbiAgfSxcclxuXHJcbiAgc2hvdzogZnVuY3Rpb24obXNnLCBzdGF0ZSkge1xyXG4gICAgY29uc3QgY2xhc3NOYW1lID0gc3RhdGUgPyAnc3VjY2VzcycgOiAoc3RhdGUgPT09IGZhbHNlID8gJ2Vycm9yJyA6ICdpbmZvJyk7XHJcbiAgICBjb25zdCBjdXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9hc3QnKTtcclxuICAgIGNvbnN0IHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnKTtcclxuICBcclxuICAgIHRvYXN0LmFwcGVuZENoaWxkKHQpO1xyXG4gICAgdG9hc3QuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gIFxyXG4gICAgdG9hc3QuaWQgPSAndG9hc3RfJyArIChuZXcgRGF0ZSkudG9JU09TdHJpbmcoKTtcclxuICAgIHRvYXN0LmNsYXNzTmFtZSA9ICd0b2FzdCc7XHJcbiAgXHJcbiAgICBsZXQgaCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyWyhjdXJyLmxlbmd0aCAtIDEpIC0gaV0uaWQpO1xyXG4gIFxyXG4gICAgICBpZiAoKGkgKyAxKSA8IHRoaXMub3B0cy5tYXgpIHtcclxuICAgICAgICBoICs9IChlbC5jbGllbnRIZWlnaHQgKyAxMCk7XHJcbiAgICAgICAgZWwuc3R5bGUubWFyZ2luVG9wID0gaCArICdweCc7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ3RvYXN0IGdvbmUgJyArIGNsYXNzTmFtZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIFxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZCh0b2FzdCk7XHJcbiAgXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0b2FzdC5jbGFzc05hbWUgPSAndG9hc3Qgc2hvdyAnICsgY2xhc3NOYW1lOyB9LCA1MCk7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyB0b2FzdC5jbGFzc05hbWUgPSAndG9hc3QgZ29uZSAnICsgY2xhc3NOYW1lOyB9LCA1MDAwKTtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHRvYXN0LnJlbW92ZSgpOyB9LCA2MDAwKTtcclxuICB9LFxyXG5cclxuICBzdWNjZXNzOiBmdW5jdGlvbihtc2cpIHtcclxuICAgIHRoaXMuc2hvdyhtc2csIHRydWUpO1xyXG4gIH0sXHJcblxyXG4gIGVycm9yOiBmdW5jdGlvbihtc2cpIHtcclxuICAgIHRoaXMuc2hvdyhtc2csIGZhbHNlKTtcclxuICB9LFxyXG4gIFxyXG4gIGluZm86IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgdGhpcy5zaG93KG1zZyk7XHJcbiAgfVxyXG59IiwidmFyIHBiID0gcmVxdWlyZSgnLi9pbmRleCcpO1xyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXRvYXN0LXN1Y2Nlc3MnKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIuc3VjY2VzcygnVGhpcyBpcyBhbiBleGFtcGxlIHN1Y2Nlc3MgdG9hc3QnKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXRvYXN0LWVycm9yJykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHBiLmVycm9yKCdUaGlzIGlzIGFuIGV4YW1wbGUgZXJyb3IgdG9hc3QnKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXRvYXN0LWluZm8nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIuaW5mbygnVGhpcyBpcyBhbiBleGFtcGxlIGluZm8gdG9hc3QnKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLWNvbmZpcm0nKS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgcGIuY29uZmlybShcclxuICAgIGZ1bmN0aW9uKG91dGNvbWUpIHsgYWxlcnQoJ1lvdSBoYXZlOiAnICsgKG91dGNvbWUgPyAnY29uZmlybWVkJyA6ICdjYW5jZWxsZWQnKSkgfSwgLy8gQ2FsbGJhY2tcclxuICAgICdUaGlzIGlzIGFuIGV4YW1wbGUgY29uZmlybScsIC8vIExhYmVsIHRleHRcclxuICAgICdZZXMnLCAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvbmZpcm0gdGV4dFxyXG4gICAgJ05vJyAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2FuY2VsIHRleHRcclxuICApO1xyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItcHJvbXB0Jykub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gIHBiLnByb21wdChcclxuICAgIGZ1bmN0aW9uKHZhbHVlKSB7IGFsZXJ0KCdZb3UgaGF2ZTogJyArICh2YWx1ZSA/ICdlbnRlcmVkICcgKyB2YWx1ZSA6ICdjYW5jZWxsZWQnKSkgfSwgLy8gQ2FsbGJhY2tcclxuICAgICdUaGlzIGlzIGFuIGV4YW1wbGUgcHJvbXB0JywgIC8vIExhYmVsIHRleHRcclxuICAgICd0ZXh0JywgICAgICAgICAgICAgICAgICAgICAgIC8vIElucHV0IHR5cGVcclxuICAgICdTdWJtaXQnLCAgICAgICAgICAgICAgICAgICAgIC8vIFN1Ym1pdCB0ZXh0XHJcbiAgICAnQ2FuY2VsJyAgICAgICAgICAgICAgICAgICAgICAvLyBDYW5jZWwgdGV4dFxyXG4gICk7XHJcbn0iXX0=
