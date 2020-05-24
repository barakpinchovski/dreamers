const liveUpdate = {
  editors: document.querySelectorAll('#html.editor, #css.editor, #js.editor'),
  css: document.querySelector('#live-update-css'),
  main: document.querySelector('#live-update'),
  iframe: document.querySelector('#live-update-iframe').contentDocument,
  js: document.querySelector('#live-update-js')
};

for (let editor of liveUpdate.editors) {
  editor.addEventListener('keyup', event => {
    let editorId = editor.getAttribute('data-id') || editor.id;
    liveUpdate.sync(editor.id, event);

    if (editorId !== 'php' || event.key === 'Enter' && event.ctrlKey) {
      saveToSession();
      liveUpdate.sync(editorId, event);
    }
  });
}

liveUpdate.sync = (editorId, event) => {
  let editorContent;

  if (editorId !== 'php' && document.querySelector('#live-update-iframe').src) {
    document.querySelector('#live-update-iframe').removeAttribute('src');
  }

  switch (editorId) {
    case 'html':
      editorContent =  htmlEditor.getValue();
      let html = document.createElement('html');
      html.innerHTML = editorContent;
      liveUpdate.iframe = document.querySelector('#live-update-iframe').contentDocument;
      liveUpdate.iframe.body.innerHTML = html.querySelector('body').innerHTML;
      break;
    case 'css':
      editorContent =  cssEditor.getValue();
      let styleElm =  liveUpdate.iframe.head.querySelector('style');

      if (styleElm) {
        styleElm.innerHTML = editorContent;
      }
      else {
        let style = document.createElement('style');
        style.innerHTML = editorContent;
        liveUpdate.iframe.head.appendChild(style);
      }
      break;
    case 'js':
      if (event.ctrlKey && event.key === "Enter") {
        editorContent =  jsEditor.getValue();
        let scriptElm =  liveUpdate.iframe.querySelector('script');

        let newScript = document.createElement('script');
        newScript.innerHTML = `(function() {${editorContent} })();`;

        if (scriptElm) {
          liveUpdate.iframe.documentElement.replaceChild(newScript, scriptElm);
        }
        else {
          liveUpdate.iframe.documentElement.appendChild(newScript)
        }
        console.log('%cJavaScript was executed.', 'background: #ffffc6; color: #8b8b00;');
      }
      break;
  }
};

if (liveUpdate.editors[0].getAttribute('data-id') === 'php') {
  liveUpdate.sync('php', { key: 'Enter', ctrlKey: true });
}
else {
  liveUpdate.sync('html', { key: 'Enter', ctrlKey: true });
  liveUpdate.sync('css', { key: 'Enter', ctrlKey: true });
  liveUpdate.sync('js', { key: 'Enter', ctrlKey: true });
}

function saveToSession() {
  let storage = {
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: jsEditor.getValue()
  };
  sessionStorage.setItem('dreamer', JSON.stringify(storage));
}