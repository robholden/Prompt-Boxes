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