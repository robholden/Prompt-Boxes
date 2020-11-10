# Prompt-Boxes
A small package I created for my own project so currently there's limited functionality. I will update it as and when I require more functionality (or a request is made).

#### Demo
You can find a live demo [here](https://iamrobert.co.uk/projects/prompt-boxes). Or, you can download the repo and open the 'index.html' page within the demo folder

#### Installation
``npm install prompt-boxes --save``

#### Screenshots
<img src="https://github.com/robholden/Prompt-Boxes/raw/master/demo/example.PNG" width="400">

#### Add scripts
~~~
<link rel="stylesheet" type="text/css" href="prompt-boxes.min.css">
<script src="prompt-boxes.min.dist.js"></script>
~~~

#### Create instance
~~~
<script>
  var pb = new PromptBoxes({
    attrPrefix: 'pb',
    speeds: {
      backdrop: 500,  // The enter/leaving animation speed of the backdrop
      toasts: 500     // The enter/leaving animation speed of the toast
    },
    alert: {
      okText: 'Ok',           // The text for the ok button
      okClass: '',            // A class for the ok button
      closeWithEscape: false, // Allow closing with escaping
      absolute: false         // Show prompt popup as absolute
    },
    confirm: {
      confirmText: 'Confirm', // The text for the confirm button
      confirmClass: '',       // A class for the confirm button
      cancelText: 'Cancel',   // The text for the cancel button
      cancelClass: '',        // A class for the cancel button
      closeWithEscape: true,  // Allow closing with escaping
      absolute: false         // Show prompt popup as absolute
    },
    prompt: {
      inputType: 'text',      // The type of input 'text' | 'password' etc.
      submitText: 'Submit',   // The text for the submit button
      submitClass: '',        // A class for the submit button
      cancelText: 'Cancel',   // The text for the cancel button
      cancelClass: '',        // A class for the cancel button
      closeWithEscape: true,  // Allow closing with escaping
      absolute: false         // Show prompt popup as absolute
    },
    toasts: {
      direction: 'top',       // Which direction to show the toast  'top' | 'bottom'
      max: 5,                 // The number of toasts that can be in the stack
      duration: 5000,         // The time the toast appears
      showTimerBar: true,     // Show timer bar countdown
      closeWithEscape: true,  // Allow closing with escaping
      allowClose: false,      // Whether to show a "x" to close the toast
    }
  });
</script>
~~~

#### Permanent toast
~~~
  pb.success(
    'This is a permanent toast with a close option',  // Message text
    {
      duration: 0,      // Show permanently
      allowClose: true  // Add manual close button
    }
  );
~~~

#### Success toast
~~~
pb.success(
  'This is an example success toast'  // Message text
  {}                                  // Additional options
);
~~~

#### Error toast
~~~
pb.error(
  'This is an example error toast'    // Message text
  {}                                  // Additional options
);
~~~

#### Info toast
~~~
pb.info(
  'This is an example info toast' // Message text
  {}                              // Additional options
);
~~~

#### Alert dialog
~~~
pb.alert(
  (confirmed) => alert('You have: ' + (confirmed ? 'confirmed' : 'cancelled')),
  'This is an example alert', // Message text
  'Ok',                       // Ok text
  {}                          // Additional options
);
~~~

#### Confirmation dialog
~~~
pb.confirm(
  (outcome) => alert('You have: ' + (outcome ? 'confirmed' : 'cancelled')), // Callback
  'This is an example confirm',   // Message text
  'Yes',                          // Confirm text
  'No'                            // Cancel text
  {}                              // Additional options
);
~~~

#### Prompt dialog
~~~
pb.prompt(
  function (value) { alert('You have: ' + (value ? 'entered ' + value : 'cancelled')) }, // Callback
  'This is an example prompt',    // Message text
  'textarea',                     // Input type
  'A defult value',               // Default value
  'Submit',                       // Submit text
  'Cancel',                       // Cancel text
  {}                              // Additional options
);
~~~

#### Clear instances
~~~
pb.clear();
~~~

#### Style Sheet
There is a default stylesheet that you'll need to include. You're more than welcome to create your own and style it the way you want!

