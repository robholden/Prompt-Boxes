# Prompt-Boxes
A small package I created for my own project so currently there's limited functionality. I will update it as and when I require more functionality (or a request is made).

## Installation
``npm install prompt-boxes --save``

## Screenshots
<img src="https://media.giphy.com/media/oXcJZgdxOLBvy/giphy.gif" width="275"> <img src="https://media.giphy.com/media/OAscHqRSi6a9W/giphy.gif" width="275"> <img src="https://media.giphy.com/media/10BsPpLXKTW67m/giphy.gif" width="275">

## Usage
~~~
var pb = new PromptBoxes();

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

document.getElementById('pb-clear').onclick = function() {
  pb.clear();
}
~~~

## Style Sheet (scss)
The below should work straight out the box. You're welcome to customise it however you like!
~~~
/** Variables **/
$white: #FFF;
$black: #252525;

$light-grey: #EEE;
$grey: #CCC;
$dark-grey: #999;
 
$light-blue: #79bde6;
$blue: #4591bf;
$dark-blue: #366988;

$light-red: #ff7575;
$red: #da4242;
$dark-red: #af3535;

$light-green: #6ed06c;
$green: #51cc50;
$dark-green: #409c3f;

$br: 2px;

body {
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}

.toast, #sc-confirm, #sc-backdrop {
  transition: ease 0.25s;

  a, button, input, textarea, select, div {
    transition: ease 0.25s;
  }
}

/** Toast styles **/
.toast {
  display: inline;
  position: fixed;
  top: 0.25em;
  left: 0;
  right: 0;
  max-width: 400px;
  transform: scale(0);

  margin: {
    right: auto;
    left: auto;
  }
  padding: 1em;
  color: $white;
  border-radius: $br;
  text-align: center;

  z-index: 9999;

  &.success {
    background: $blue;
    border-bottom: 4px solid $dark-blue;
  }

  &.error {
    background: $red;
    border-bottom: 4px solid $dark-red;
  }
  
    &.info {
      color: $black;
      background: $light-grey;
      border-bottom: 4px solid $grey;
    }

  &.show {
    transform: scale(1);
  }

  &.gone {
    transform: scale(0);
  }
}

#sc-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998;
  opacity: 0;
  background: rgba(0, 0, 0, 0.8);

  &.show {
    opacity: 1;
  }
}

#sc-confirm {
  display: inline;
  position: fixed;
  top: 35%;
  left: 0;
  right: 0;
  max-width: 375px;
  transform: scale(0);

  margin: {
    top: -50px;
    right: auto;
    left: auto;
  }
  padding: 1em;
  border-radius: $br;

  background: $white;
  border-bottom: 4px solid $grey;

  z-index: 9999;

  p {
    font-size: 1.05em;
    margin: 0 0 0.75em;
  }

  input {
    display: block;
    width: 100%;
    padding: 0.5em;
    margin-bottom: 1em;
    border: 1px solid $light-grey;
    font-size: 1em;
    border-radius: $br;

    &:focus, &:active {
      outline: none;
      border-color: $grey;
    }
  }

  button {
    display: inline-block;
    background: transparent;
    border-radius: $br;
    border: 1px solid $blue;
    padding: 0.5em 1em;
    color: $blue;
    font-size: 1em;
    outline: none;
    overflow: hidden;
    cursor: pointer;
    background: $white;
    box-shadow: none;
    font-size: 0.9em;

    &:first-of-type {
      color: $red;
      border: none;
      border-bottom: 2px solid $red;

      &:hover, &.active {
        background: $red;
        color: $white;
      }
    }

    &:last-of-type {
      float: right;
      background: $blue;
      color: $white;

      &:hover {
        background: $dark-blue;
      }
      
      &[disabled] {
        opacity: 0.5;
        background: none;
        border-color: $grey;
        color: $dark-grey;
        cursor: not-allowed;
      }
    }
  }

  &.show {
    transform: scale(1);
  }
}
~~~
