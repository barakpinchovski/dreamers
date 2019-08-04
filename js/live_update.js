const liveUpdate = {
  editors: document.querySelectorAll('#html.editor, #css.editor, #js.editor'),
  css: document.querySelector('#live-update-css'),
  main: document.querySelector('#live-update'),
  js: document.querySelector('#live-update-js')
};

for (let editor of liveUpdate.editors) {
  editor.addEventListener('keyup', event => liveUpdate.sync(editor.id, event));
}

liveUpdate.sync = (editorId, event) => {
  const editorContent = event.target.parentElement.querySelector('.ace_content').innerText;

  switch (editorId) {
    case 'html':
      liveUpdate.main.innerHTML = editorContent;
      break;
    case 'css':
      liveUpdate.css.innerHTML = editorContent.replace("body", "#live-update");
      break;
    case 'js':
      if (event.ctrlKey && event.key === "Enter") {
        let newJs = document.createElement('script');
        newJs.innerHTML = ` try { let liveUpdateExec = (data) => { ${editorContent.replace("body", "#live-update")} }; liveUpdateExec(); } catch (err) {}`;
        document.body.replaceChild(newJs, liveUpdate.js);
        liveUpdate.js = newJs;
        console.log('%cJavaScript was executed.', 'background: #ffffc6; color: #8b8b00;');
      }
      break;
  }
};