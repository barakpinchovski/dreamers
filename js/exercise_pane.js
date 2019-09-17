const exercise = {
  toggle: document.querySelector('div[id="exercise-toggle"]'),
  pane: document.querySelector('#live-exercise'),
  view: document.querySelector('#exercise-view'),

  togglePane: (e) => {
    exercise.pane.classList.toggle('show');
    resizeEditors();
  },

  initContent: () => {
    let dreamerSettings = localStorage.getItem('dreamer');
    if (dreamerSettings) {
      dreamerSettings = JSON.parse(dreamerSettings);
      if (dreamerSettings.exercise) {
        exerciseCodeEditor.setValue(dreamerSettings.exercise.replace(`<script>window.onerror=(e)=>{return true;}</script><script>window.onload=()=>{try{`, '<script>').replace(`}catch(e){}}</script>`, `</script>`));
        exercise.view.srcdoc = dreamerSettings.exercise;
        exerciseCodeEditor.clearSelection();
      }
      else {
        dreamerSettings.exercise = '';
        localStorage.setItem('dreamer', JSON.stringify(dreamerSettings));
      }
    }
  },

  updateContent: (content) => {
    let dreamerSettings = localStorage.getItem('dreamer');
    if (dreamerSettings) {
      dreamerSettings = JSON.parse(dreamerSettings);
      dreamerSettings.exercise = content;
      localStorage.setItem('dreamer', JSON.stringify(dreamerSettings));
    }
  }
};

exercise.toggle.addEventListener('click', exercise.togglePane);

exercise.initContent();

exerciseCodeEditor.on('change', (o) => {
  let content = exerciseCodeEditor.getValue();
  content = content.replace(`</script>`, `}catch(e){}}</script>`);
  content = content.replace('<script>', `<script>window.onerror=(e)=>{return true;}</script><script>window.onload=()=>{try{`);
  exercise.view.srcdoc = content;
  exercise.updateContent(content);
});