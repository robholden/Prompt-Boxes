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