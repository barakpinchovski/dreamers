const examplesList = {
  exampleCode: document.querySelector('div[id="example-code"]'),
  iframeView: document.querySelector('iframe[name="iframe-view"]'),
  examplesLists: document.querySelector('.examples'),
  lastClickedExample: undefined
};

examplesList.examplesListLinks = examplesList.examplesLists.getElementsByTagName('a');

for (let link of examplesList.examplesListLinks) {
  link.target = 'iframe-view';
  link.addEventListener('click', setIframeView);
}

function setIframeView(event) {
  if (examplesList.lastClickedExample) {
    examplesList.lastClickedExample.classList.remove('selected-example');
  }
  setTimeout(() => {
    const html = `<!DOCTYPE html>
<html lang="en">
${examplesList.iframeView.contentDocument.querySelector('html').innerHTML}
</html>`;
    examplesHtmlEditor.setValue(html);
    examplesHtmlEditor.clearSelection();
    event.target.classList.add('selected-example');
    examplesList.lastClickedExample = event.target;
  }, 50);
}