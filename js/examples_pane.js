const examplesPane = {
  examplesToggler: document.querySelector('#examples-wrapper i[class*=lightbulb]')
};

examplesPane.examplesToggler.addEventListener('click', (event) => {
  event.target.classList.toggle('expand');
  if (event.target.classList.contains('expand')) {
    splitExamples.setSizes([10, 90]);
    resizeEditors();
  }
  else {
    splitExamples.setSizes([99.5, 0.5]);
    resizeEditors();
  }
});