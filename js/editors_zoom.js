let editorsZoom = {
  in: document.querySelector('#editors-zoom [class*=plus]'),
  default: document.querySelector('#editors-zoom [class~="fa-search"]'),
  out: document.querySelector('#editors-zoom [class*=minus]'),

  editors: [
    htmlEditor, jsEditor, cssEditor, examplesHtmlEditor, exerciseCodeEditor
  ],

  applyEditorZoom: (e) => {
    let defaultZoom = 12;
    let dreamerSettings = localStorage.getItem('dreamer');
    if (dreamerSettings) {
      dreamerSettings = JSON.parse(dreamerSettings);
      defaultZoom = dreamerSettings.hasOwnProperty('editorsFontSize') ? dreamerSettings.editorsFontSize : 12;
    }
    for (let i = 0; i < editorsZoom.editors.length; i++) {
      let currentFontSize = editorsZoom.editors[i].getFontSize();
      let level = e.target.classList.contains('fa-search-plus') ? 2 : e.target.classList.contains('fa-search-minus') ? -2 : 0;
      let newFontSize =   !level ? defaultZoom : currentFontSize + level;
      editorsZoom.editors[i].setFontSize(newFontSize);
    }
    resizeEditors();
  }
};

editorsZoom.in.addEventListener('click', editorsZoom.applyEditorZoom);
editorsZoom.default.addEventListener('click', editorsZoom.applyEditorZoom);
editorsZoom.out.addEventListener('click', editorsZoom.applyEditorZoom);


