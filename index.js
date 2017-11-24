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