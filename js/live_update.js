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
  let editorContent = event.target.parentElement.querySelector('.ace_content').innerText;

  switch (editorId) {
    case 'html':
      liveUpdate.main.innerHTML = editorContent;
      break;
    case 'css':
      liveUpdate.css.innerHTML =
        editorContent.replace(/body/g, "").replace(/.+{/g, "#live-update $&")
          .replace(/#live-update (\@(.*?)\{)(?!({))+/gi, (media) => {
            return (media.substr('#live-update'.length));
          });
      break;
    case 'js':
      if (event.ctrlKey && event.key === "Enter") {
        let newJs = document.createElement('script');
        newJs.id =  "live-update-js";
        editorContent =
          editorContent
          // Replaces body with #live-update because the <main id="live-update"> element is instead of the body
            .replace(/document\.querySelector\('body'\)/g, "document.getElementById('live-update')")
            .replace(/document\.querySelector\("body"\)/g, "document.getElementById('live-update')")
            .replace(/document\.querySelectorAll\('body'\)/g, "document.getElementById('live-update')")
            .replace(/document\.querySelectorAll\("body"\)/g, "document.getElementById('live-update')")
            .replace(/document\.body/g, "document.getElementById('live-update')")
            .replace(/document\.getElementsByTagName\('body'\)/g, "document.getElementById('live-update')")
            .replace(/document\.getElementsByTagName\("body"\)/g, "document.getElementById('live-update')")

            // Specifically selects the desired elements from the <main id="live-update"> element as parent
            .replace(/document\.querySelector\(/g, "document.querySelector('#live-update').querySelector(")
            .replace(/document\.querySelectorAll\(/g, "document.querySelector('#live-update').querySelectorAll(")
            .replace(/document\.getElementById\(/g, "document.querySelector('#live-update').getElementById(")
            .replace(/document\.getElementsByTagName\(/g, "document.querySelector('#live-update').getElementsByTagName(")
            .replace(/document\.getElementsByClassName\(/g, "document.querySelector('#live-update').getElementsByClassName(")
            .replace(/document\.getElementsByName\(/g, "document.querySelector('#live-update').getElementsByName(");
        newJs.innerHTML = ` try { let liveUpdateExec = (data) => { ${editorContent}}; liveUpdateExec(); } catch (err) {}`;
        document.body.replaceChild(newJs, liveUpdate.js);
        liveUpdate.js = newJs;
        console.log('%cJavaScript was executed.', 'background: #ffffc6; color: #8b8b00;');
      }
      break;
  }
};