(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  opts: {
    max: 5
  },

  confirm: function(callback, msg = 'Are you sure?', yes = 'Yes', no = 'Cancel') {
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

    const destroy = (outcome) => {
      sc_backdrop.className = '';
      sc_confirm.className = '';

      callback(outcome || false);

      setTimeout(() => {
        sc_backdrop.remove();
        sc_confirm.remove();
      }, 1000);
    };

    sc_confirm_yes.onclick = () => {
      destroy(true);
    }
    sc_confirm_no.onclick = () => destroy();

    sc_confirm.appendChild(sc_confirm_msg);
    sc_confirm.appendChild(sc_confirm_no);
    sc_confirm.appendChild(sc_confirm_yes);

    document.getElementsByTagName('body')[0].appendChild(sc_backdrop);
    document.getElementsByTagName('body')[0].appendChild(sc_confirm);
    document.getElementsByTagName('body')[0].onkeyup = (ev) => {
      if (ev.keyCode === 27)
        destroy();
    }

    setTimeout(() => {
      sc_confirm_yes.focus();
      sc_backdrop.className = 'show';
      sc_confirm.className = 'show';
    }, 50);
  },
  
  prompt: function(callback, msg, type = 'text', submit = 'Submit', no = 'Cancel') {
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

    const destroy = (outcome) => {
      sc_backdrop.className = '';
      sc_confirm.className = '';

      callback(outcome || false);

      setTimeout(() => {
        sc_backdrop.remove();
        sc_confirm.remove();
      }, 1000);
    };

    sc_confirm_yes.onclick = () => {
      const val = sc_confirm_input.value;
      if (val === '') {
        sc_confirm_input.focus();
        return;
      }

      destroy(val);
    }
    sc_confirm_input.onkeyup = (ev) => {
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
    sc_confirm_no.onclick = () => destroy();

    sc_confirm.appendChild(sc_confirm_msg);
    sc_confirm.appendChild(sc_confirm_input);
    sc_confirm.appendChild(sc_confirm_no);
    sc_confirm.appendChild(sc_confirm_yes);

    document.getElementsByTagName('body')[0].appendChild(sc_backdrop);
    document.getElementsByTagName('body')[0].appendChild(sc_confirm);
    document.getElementsByTagName('body')[0].onkeyup = (ev) => {
      if (ev.keyCode === 27)
        destroy();
    }

    setTimeout(() => {
      sc_confirm_input.focus();
      sc_backdrop.className = 'show';
      sc_confirm.className = 'show';
    }, 50);
  },

  show: function(msg, state) {
    const className = `${ state ? 'success' : (state === false ? 'error' : 'info') }`;
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
        el.style.marginTop = `${ h }px`;
      } else {
        el.className = `toast gone ${ className }`;
      }
    }
  
    document.getElementsByTagName('body')[0].appendChild(toast);
  
    setTimeout(() => toast.className = `toast show ${ className }`, 50);
    setTimeout(() => toast.className = `toast gone ${ className }`, 5000);
    setTimeout(() => toast.remove(), 6000);
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

document.getElementById('pb-toast-success').onclick = () => {
  pb.success('This is an example success toast');
}

document.getElementById('pb-toast-error').onclick = () => {
  pb.error('This is an example error toast');
}

document.getElementById('pb-toast-info').onclick = () => {
  pb.info('This is an example info toast');
}

document.getElementById('pb-confirm').onclick = () => {
  pb.confirm((outcome) => alert(`You have: ${ outcome ? 'confirmed' : 'cancelled' }`),'This is an example confirm');
}

document.getElementById('pb-prompt').onclick = () => {
  pb.prompt((value) => alert(`You have: ${ value ? `entered ${ value }` : 'cancelled' }`),'This is an example prompt');
}
},{"./index":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsIm1haW4uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgb3B0czoge1xyXG4gICAgbWF4OiA1XHJcbiAgfSxcclxuXHJcbiAgY29uZmlybTogZnVuY3Rpb24oY2FsbGJhY2ssIG1zZyA9ICdBcmUgeW91IHN1cmU/JywgeWVzID0gJ1llcycsIG5vID0gJ0NhbmNlbCcpIHtcclxuICAgIGNvbnN0IG9sZEMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWNvbmZpcm1cIik7XHJcbiAgICBjb25zdCBvbGRCID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYy1iYWNrZHJvcFwiKTtcclxuICAgIGlmIChvbGRDKSBvbGRDLnJlbW92ZSgpO1xyXG4gICAgaWYgKG9sZEIpIG9sZEIucmVtb3ZlKCk7XHJcblxyXG4gICAgY29uc3Qgc2NfYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1fbXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybV95ZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1fbm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuXHJcbiAgICBzY19jb25maXJtX21zZy5pbm5lckhUTUwgPSBtc2c7XHJcbiAgICBzY19jb25maXJtX25vLmlubmVySFRNTCA9IG5vO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaW5uZXJIVE1MID0geWVzO1xyXG5cclxuICAgIHNjX2JhY2tkcm9wLmlkID0gXCJzYy1iYWNrZHJvcFwiO1xyXG4gICAgc2NfY29uZmlybS5pZCA9IFwic2MtY29uZmlybVwiO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaWQgPSBcInNjLWNvbmZpcm0teWVzXCI7XHJcbiAgICBzY19jb25maXJtX25vLmlkID0gXCJzYy1jb25maXJtLW5vXCI7XHJcblxyXG4gICAgY29uc3QgZGVzdHJveSA9IChvdXRjb21lKSA9PiB7XHJcbiAgICAgIHNjX2JhY2tkcm9wLmNsYXNzTmFtZSA9ICcnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICcnO1xyXG5cclxuICAgICAgY2FsbGJhY2sob3V0Y29tZSB8fCBmYWxzZSk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICBzY19iYWNrZHJvcC5yZW1vdmUoKTtcclxuICAgICAgICBzY19jb25maXJtLnJlbW92ZSgpO1xyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH07XHJcblxyXG4gICAgc2NfY29uZmlybV95ZXMub25jbGljayA9ICgpID0+IHtcclxuICAgICAgZGVzdHJveSh0cnVlKTtcclxuICAgIH1cclxuICAgIHNjX2NvbmZpcm1fbm8ub25jbGljayA9ICgpID0+IGRlc3Ryb3koKTtcclxuXHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbXNnKTtcclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9ubyk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1feWVzKTtcclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2JhY2tkcm9wKTtcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybSk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLm9ua2V5dXAgPSAoZXYpID0+IHtcclxuICAgICAgaWYgKGV2LmtleUNvZGUgPT09IDI3KVxyXG4gICAgICAgIGRlc3Ryb3koKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgc2NfY29uZmlybV95ZXMuZm9jdXMoKTtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgIH0sIDUwKTtcclxuICB9LFxyXG4gIFxyXG4gIHByb21wdDogZnVuY3Rpb24oY2FsbGJhY2ssIG1zZywgdHlwZSA9ICd0ZXh0Jywgc3VibWl0ID0gJ1N1Ym1pdCcsIG5vID0gJ0NhbmNlbCcpIHtcclxuICAgIGNvbnN0IG9sZEMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNjLWNvbmZpcm1cIik7XHJcbiAgICBjb25zdCBvbGRCID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYy1iYWNrZHJvcFwiKTtcclxuICAgIGlmIChvbGRDKSBvbGRDLnJlbW92ZSgpO1xyXG4gICAgaWYgKG9sZEIpIG9sZEIucmVtb3ZlKCk7XHJcblxyXG4gICAgY29uc3Qgc2NfYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGNvbnN0IHNjX2NvbmZpcm1faW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybV9tc2cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICBjb25zdCBzY19jb25maXJtX3llcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgY29uc3Qgc2NfY29uZmlybV9ubyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG5cclxuICAgIHNjX2NvbmZpcm1faW5wdXQudHlwZSA9IHR5cGU7XHJcbiAgICBzY19jb25maXJtX21zZy5pbm5lckhUTUwgPSBtc2c7XHJcbiAgICBzY19jb25maXJtX25vLmlubmVySFRNTCA9IG5vO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaW5uZXJIVE1MID0gc3VibWl0O1xyXG5cclxuICAgIHNjX2JhY2tkcm9wLmlkID0gXCJzYy1iYWNrZHJvcFwiO1xyXG4gICAgc2NfY29uZmlybS5pZCA9IFwic2MtY29uZmlybVwiO1xyXG4gICAgc2NfY29uZmlybV9pbnB1dC5pZCA9IFwic2MtY29uZmlybS1pbnB1dFwiO1xyXG4gICAgc2NfY29uZmlybV95ZXMuaWQgPSBcInNjLWNvbmZpcm0teWVzXCI7XHJcbiAgICBzY19jb25maXJtX25vLmlkID0gXCJzYy1jb25maXJtLW5vXCI7XHJcblxyXG4gICAgc2NfY29uZmlybV95ZXMuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJkaXNhYmxlZFwiKTtcclxuXHJcbiAgICBjb25zdCBkZXN0cm95ID0gKG91dGNvbWUpID0+IHtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJyc7XHJcbiAgICAgIHNjX2NvbmZpcm0uY2xhc3NOYW1lID0gJyc7XHJcblxyXG4gICAgICBjYWxsYmFjayhvdXRjb21lIHx8IGZhbHNlKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHNjX2JhY2tkcm9wLnJlbW92ZSgpO1xyXG4gICAgICAgIHNjX2NvbmZpcm0ucmVtb3ZlKCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBzY19jb25maXJtX3llcy5vbmNsaWNrID0gKCkgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBzY19jb25maXJtX2lucHV0LnZhbHVlO1xyXG4gICAgICBpZiAodmFsID09PSAnJykge1xyXG4gICAgICAgIHNjX2NvbmZpcm1faW5wdXQuZm9jdXMoKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGRlc3Ryb3kodmFsKTtcclxuICAgIH1cclxuICAgIHNjX2NvbmZpcm1faW5wdXQub25rZXl1cCA9IChldikgPT4ge1xyXG4gICAgICBjb25zdCB2YWwgPSBzY19jb25maXJtX2lucHV0LnZhbHVlO1xyXG4gICAgICBpZiAodmFsID09PSAnJykge1xyXG4gICAgICAgIHNjX2NvbmZpcm1feWVzLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICAgIHNjX2NvbmZpcm1feWVzLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xyXG4gICAgICBcclxuICAgICAgaWYgKGV2LmtleUNvZGUgIT09IDEzKVxyXG4gICAgICAgIHJldHVybjtcclxuXHJcbiAgICAgIGRlc3Ryb3kodmFsKTtcclxuICAgIH1cclxuICAgIHNjX2NvbmZpcm1fbm8ub25jbGljayA9ICgpID0+IGRlc3Ryb3koKTtcclxuXHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbXNnKTtcclxuICAgIHNjX2NvbmZpcm0uYXBwZW5kQ2hpbGQoc2NfY29uZmlybV9pbnB1dCk7XHJcbiAgICBzY19jb25maXJtLmFwcGVuZENoaWxkKHNjX2NvbmZpcm1fbm8pO1xyXG4gICAgc2NfY29uZmlybS5hcHBlbmRDaGlsZChzY19jb25maXJtX3llcyk7XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5hcHBlbmRDaGlsZChzY19iYWNrZHJvcCk7XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYm9keScpWzBdLmFwcGVuZENoaWxkKHNjX2NvbmZpcm0pO1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2JvZHknKVswXS5vbmtleXVwID0gKGV2KSA9PiB7XHJcbiAgICAgIGlmIChldi5rZXlDb2RlID09PSAyNylcclxuICAgICAgICBkZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHNjX2NvbmZpcm1faW5wdXQuZm9jdXMoKTtcclxuICAgICAgc2NfYmFja2Ryb3AuY2xhc3NOYW1lID0gJ3Nob3cnO1xyXG4gICAgICBzY19jb25maXJtLmNsYXNzTmFtZSA9ICdzaG93JztcclxuICAgIH0sIDUwKTtcclxuICB9LFxyXG5cclxuICBzaG93OiBmdW5jdGlvbihtc2csIHN0YXRlKSB7XHJcbiAgICBjb25zdCBjbGFzc05hbWUgPSBgJHsgc3RhdGUgPyAnc3VjY2VzcycgOiAoc3RhdGUgPT09IGZhbHNlID8gJ2Vycm9yJyA6ICdpbmZvJykgfWA7XHJcbiAgICBjb25zdCBjdXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndG9hc3QnKTtcclxuICAgIGNvbnN0IHRvYXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBjb25zdCB0ID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobXNnKTtcclxuICBcclxuICAgIHRvYXN0LmFwcGVuZENoaWxkKHQpO1xyXG4gICAgdG9hc3QuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xyXG4gIFxyXG4gICAgdG9hc3QuaWQgPSAndG9hc3RfJyArIChuZXcgRGF0ZSkudG9JU09TdHJpbmcoKTtcclxuICAgIHRvYXN0LmNsYXNzTmFtZSA9ICd0b2FzdCc7XHJcbiAgXHJcbiAgICBsZXQgaCA9IDA7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnIubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjdXJyWyhjdXJyLmxlbmd0aCAtIDEpIC0gaV0uaWQpO1xyXG4gIFxyXG4gICAgICBpZiAoKGkgKyAxKSA8IHRoaXMub3B0cy5tYXgpIHtcclxuICAgICAgICBoICs9IChlbC5jbGllbnRIZWlnaHQgKyAxMCk7XHJcbiAgICAgICAgZWwuc3R5bGUubWFyZ2luVG9wID0gYCR7IGggfXB4YDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBlbC5jbGFzc05hbWUgPSBgdG9hc3QgZ29uZSAkeyBjbGFzc05hbWUgfWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICBcclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdib2R5JylbMF0uYXBwZW5kQ2hpbGQodG9hc3QpO1xyXG4gIFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB0b2FzdC5jbGFzc05hbWUgPSBgdG9hc3Qgc2hvdyAkeyBjbGFzc05hbWUgfWAsIDUwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdG9hc3QuY2xhc3NOYW1lID0gYHRvYXN0IGdvbmUgJHsgY2xhc3NOYW1lIH1gLCA1MDAwKTtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4gdG9hc3QucmVtb3ZlKCksIDYwMDApO1xyXG4gIH0sXHJcblxyXG4gIHN1Y2Nlc3M6IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgdGhpcy5zaG93KG1zZywgdHJ1ZSk7XHJcbiAgfSxcclxuXHJcbiAgZXJyb3I6IGZ1bmN0aW9uKG1zZykge1xyXG4gICAgdGhpcy5zaG93KG1zZywgZmFsc2UpO1xyXG4gIH0sXHJcbiAgXHJcbiAgaW5mbzogZnVuY3Rpb24obXNnKSB7XHJcbiAgICB0aGlzLnNob3cobXNnKTtcclxuICB9XHJcbn0iLCJ2YXIgcGIgPSByZXF1aXJlKCcuL2luZGV4Jyk7XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItdG9hc3Qtc3VjY2VzcycpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgcGIuc3VjY2VzcygnVGhpcyBpcyBhbiBleGFtcGxlIHN1Y2Nlc3MgdG9hc3QnKTtcclxufVxyXG5cclxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BiLXRvYXN0LWVycm9yJykub25jbGljayA9ICgpID0+IHtcclxuICBwYi5lcnJvcignVGhpcyBpcyBhbiBleGFtcGxlIGVycm9yIHRvYXN0Jyk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYi10b2FzdC1pbmZvJykub25jbGljayA9ICgpID0+IHtcclxuICBwYi5pbmZvKCdUaGlzIGlzIGFuIGV4YW1wbGUgaW5mbyB0b2FzdCcpO1xyXG59XHJcblxyXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGItY29uZmlybScpLm9uY2xpY2sgPSAoKSA9PiB7XHJcbiAgcGIuY29uZmlybSgob3V0Y29tZSkgPT4gYWxlcnQoYFlvdSBoYXZlOiAkeyBvdXRjb21lID8gJ2NvbmZpcm1lZCcgOiAnY2FuY2VsbGVkJyB9YCksJ1RoaXMgaXMgYW4gZXhhbXBsZSBjb25maXJtJyk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwYi1wcm9tcHQnKS5vbmNsaWNrID0gKCkgPT4ge1xyXG4gIHBiLnByb21wdCgodmFsdWUpID0+IGFsZXJ0KGBZb3UgaGF2ZTogJHsgdmFsdWUgPyBgZW50ZXJlZCAkeyB2YWx1ZSB9YCA6ICdjYW5jZWxsZWQnIH1gKSwnVGhpcyBpcyBhbiBleGFtcGxlIHByb21wdCcpO1xyXG59Il19
