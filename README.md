# Prompt-Boxes
A small package I created for my own project so currently there's limited functionality. I will update it as and when I require more functionality (or a request is made).

## Demo
You find a live demo [here](https://iamrobert.co.uk/projects/prompt-boxes)

## Installation
``npm install prompt-boxes --save``

## Screenshots
<img src="https://media.giphy.com/media/oXcJZgdxOLBvy/giphy.gif" width="275"> <img src="https://media.giphy.com/media/OAscHqRSi6a9W/giphy.gif" width="275"> <img src="https://media.giphy.com/media/10BsPpLXKTW67m/giphy.gif" width="275">

## Usage
~~~
var pb = new PromptBoxes({
  toastDir: 'top',        // What position to show the toast (top | bottom)
  toastMax: 5,            // Max number of toasts to display at once
  toastDuration: 5000,    // The duration is milliseconds to show a toast. 0 = never
  toastClose: false,      // Whather to add a close icon to manually close a toast
  promptAsAbsolute: true, // Whether to show prompt as position absolute (fixes ios input bug)
  animationSpeed: 500     // The speed of your animation
});

document.getElementById('pb-toast-close').onclick = function () {
  pb.success('This is a permanent toast with a close option', { duration: 0, showClose: true });
}

document.getElementById('pb-toast-success').onclick = function () {
  pb.success('This is an example success toast');
}

document.getElementById('pb-toast-error').onclick = function () {
  pb.error('This is an example error toast');
}

document.getElementById('pb-toast-info').onclick = function () {
  pb.info('This is an example info toast');
}

document.getElementById('pb-alert').onclick = function () {
  pb.alert(
    function (confirmed) {
      alert('You have: ' + (confirmed ? 'confirmed' : 'cancelled'))
    },
    'This is an example alert',
    'Ok'
  );
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

document.getElementById('pb-clear').onclick = function() {
  pb.clear();
}
~~~

## Style Sheet
There is a default stylesheet that you'll need to include. You're more than welcome to create your own and style it the way you want!

