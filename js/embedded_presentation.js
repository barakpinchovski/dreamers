const presentation = {
  root: document.querySelector('#embedded_presentation'),
  settings: document.querySelector('#embedded_presentation .fa-cog'),
  prevPresentation: document.querySelector('#embedded_presentation .fa-arrow-left'),
  currentPresentation: document.getElementById('presentation-selector'),
  nextPresentation: document.querySelector('#embedded_presentation .fa-arrow-right'),
  toggle: document.querySelector('#embedded_presentation .fa-eye'),
  expand: document.querySelector('#embedded_presentation .fa-expand-arrows-alt'),
  currentPresentationName: document.querySelector('#current-presentation-name'),
  iframe: document.querySelector('#embedded_presentation > iframe'),
  modal: document.querySelector('#modal'),

  getCheckpoint: () => {
    let dreamerSettings = localStorage.getItem('dreamer');
    const checkpoint = dreamerSettings ? JSON.parse(dreamerSettings).settings.checkpoint : '1';
    presentation.triggerOnChange();
    return checkpoint;
  },

  getPresentations: () => {
    let dreamerSettings = localStorage.getItem('dreamer');
    return dreamerSettings ? JSON.parse(dreamerSettings).settings.presentations : [];
  },

  triggerOnChange: () => {
    const event = document.createEvent('HTMLEvents');
    event.initEvent('change', false, true);
    setTimeout(() => { presentation.currentPresentation.dispatchEvent(event) }, 0);
  },

  updateCheckpoint: (checkpoint) => {
    let dreamerSettings = localStorage.getItem('dreamer');
    dreamerSettings = JSON.parse(dreamerSettings);
    dreamerSettings.settings.checkpoint = checkpoint;
    localStorage.setItem('dreamer', JSON.stringify(dreamerSettings));
    presentation.currentPresentationName.innerHTML = dreamerSettings.settings.presentations[checkpoint-1].name;
  }
};

presentation.currentPresentation.value = presentation.getCheckpoint();

presentation.settings.addEventListener('click', () => {
  presentation.modal.classList.add('show-modal');
});

presentation.prevPresentation.addEventListener('click', event => {
  let presentations = presentation.getPresentations();
  if (presentations.length && parseInt(presentation.currentPresentation.value, 10)> 1) {
    presentation.currentPresentation.value -= 1;
    presentation.triggerOnChange();
  }
});

presentation.currentPresentation.addEventListener('change', event => {
  let presentationNumber = parseInt(event.target.value, 10);
  if (Number(presentationNumber) && presentationNumber >= 1) {
    let presentations = presentation.getPresentations();
    if (presentations.length && presentationNumber <= presentations.length) {
      presentation.iframe.src = presentations[presentationNumber - 1].url;
      presentation.updateCheckpoint(presentationNumber);
      setEditorsSizesByPresentation(presentationNumber);
    }
  }
});

presentation.nextPresentation.addEventListener('click', event => {
  let presentations = presentation.getPresentations();
  if (presentations.length && parseInt(presentation.currentPresentation.value, 10) < presentations.length) {
    presentation.currentPresentation.value = parseInt(presentation.currentPresentation.value, 10) + 1;
    presentation.triggerOnChange();
  }
});

let sizeMemory;
presentation.toggle.addEventListener('click', (event) => {
  let element = event.target;
  element.classList.toggle('hidden');

  if (!sizeMemory) {
    sizeMemory = splitRows.getSizes();
  }
  if (element.classList.contains('hidden')) {
    splitRows.collapse(2);
  }
  else {
    splitRows.setSizes(sizeMemory);
    resizeEditors();
  }
});


presentation.expand.addEventListener('click', (event) => {
  presentation.root.classList.toggle('expanded');
});

setEditorsSizesByPresentation = (presentationNumber) => {
  let dreamerSettings = localStorage.getItem('dreamer');
  if (dreamerSettings) {
    dreamerSettings = JSON.parse(dreamerSettings);
    let presentationEditors = dreamerSettings.settings.presentations[presentationNumber - 1].editors;
    let sizes = [33.333, 33.333, 33.333];
    if (!presentationEditors.css && !presentationEditors.js) {
      sizes = [80, 10, 10];
    }
    else if (presentationEditors.css && !presentationEditors.js) {
      sizes = [40, 50, 10];
    }
    else if (!presentationEditors.css && presentationEditors.js) {
      sizes = [40, 10, 50];
    }
    splitColumns.setSizes(sizes);
    resizeEditors();
  }
};