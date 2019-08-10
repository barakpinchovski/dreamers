let editorsZoom = {
  in: document.querySelector('#editors-zoom [class*=plus]'),
  default: document.querySelector('#editors-zoom [class~="fa-search"]'),
  out: document.querySelector('#editors-zoom [class*=minus]'),

  editors: [
    htmlEditor, jsEditor, cssEditor, examplesHtmlEditor, exerciseCodeEditor
  ],

  applyEditorZoom: (e) => {
    for (let i = 0; i < editorsZoom.editors.length; i++) {
      let currentFontSize = editorsZoom.editors[i].getFontSize();
      let level = e.target.classList.contains('fa-search-plus') ? 2 : e.target.classList.contains('fa-search-minus') ? -2 : 0;
        let newFontSize =   !level ? 12 : currentFontSize + level;
      editorsZoom.editors[i].setFontSize(newFontSize);
    }
  }
};



editorsZoom.in.addEventListener('click', editorsZoom.applyEditorZoom);
editorsZoom.default.addEventListener('click', editorsZoom.applyEditorZoom);
editorsZoom.out.addEventListener('click', editorsZoom.applyEditorZoom);


