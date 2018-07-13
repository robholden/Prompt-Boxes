# Prompt-Boxes
A small package I created for my own project so currently there's limited functionality. I will update it as and when I require more functionality (or a request is made).

##### Migrating from version <2.0 to 2.0
`I've re-written a lot of mechanics. There are a lot more options available to each instance. Please review the ReadMe and update your current implementation accordingly.`

#### Demo
You can find an old demo [here](https://iamrobert.co.uk/projects/prompt-boxes). For a better demo, download the repo and open the 'index.html' page within the demo folder

#### Installation
``npm install prompt-boxes --save``

#### Screenshots
<img src="https://media.giphy.com/media/oXcJZgdxOLBvy/giphy.gif" width="275"> <img src="https://media.giphy.com/media/OAscHqRSi6a9W/giphy.gif" width="275"> <img src="https://media.giphy.com/media/10BsPpLXKTW67m/giphy.gif" width="275">

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
  {}                                  // Addition options
);
~~~

#### Error toast
~~~
pb.error(
  'This is an example error toast'    // Message text
  {}                                  // Addition options
);
~~~

#### Info toast
~~~
pb.info(
  'This is an example info toast' // Message text
  {}                              // Addition options
);
~~~

#### Alert dialogue
~~~
pb.alert(
  (confirmed) => alert('You have: ' + (confirmed ? 'confirmed' : 'cancelled')),
  'This is an example alert', // Message text
  'Ok',                       // Ok text
  {}                          // Addition options
);
~~~

#### Confirmation dialogue
~~~
pb.confirm(
  (outcome) => alert('You have: ' + (outcome ? 'confirmed' : 'cancelled')), // Callback
  'This is an example confirm',   // Message text
  'Yes',                          // Confirm text
  'No'                            // Cancel text
  {}                              // Addition options
);
~~~

#### Prompt dialogue
~~~
pb.prompt(
  function (value) { alert('You have: ' + (value ? 'entered ' + value : 'cancelled')) }, // Callback
  'This is an example prompt',    // Message text
  'text',                         // Input type
  'Submit',                       // Submit text
  'Cancel',                       // Cancel text
  {}                              // Addition options
);
~~~

#### Clear instances
~~~
pb.clear();
~~~

#### Style Sheet
There is a default stylesheet that you'll need to include. You're more than welcome to create your own and style it the way you want!

