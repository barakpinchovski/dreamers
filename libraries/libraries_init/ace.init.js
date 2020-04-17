let dreamerSettingsDefaultZoom = 12;

let dreamerSettingsGlobal = localStorage.getItem('dreamer');
if (dreamerSettingsGlobal) {
  dreamerSettingsGlobal = JSON.parse(dreamerSettingsGlobal);
  dreamerSettingsDefaultZoom = dreamerSettingsGlobal.hasOwnProperty('editorsFontSize') ? dreamerSettingsGlobal.editorsFontSize : 12;
}

let dreamerSessionStorage = JSON.parse(sessionStorage.getItem('dreamer') || '{}');

let htmlEditor = ace.edit("html");
//editor.setTheme("ace/theme/crimson_editor");
//editor.setTheme("ace/theme/iplastic");
htmlEditor.setTheme("ace/theme/crimson_editor");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

if (dreamerSessionStorage.html) {
  htmlEditor.setValue(dreamerSessionStorage.html);
}

let cssEditor = ace.edit("css");
//editor.setTheme("ace/theme/twilight");
cssEditor.setTheme("ace/theme/dracula");
cssEditor.session.setMode("ace/mode/css");
cssEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

if (dreamerSessionStorage.css) {
  cssEditor.setValue(dreamerSessionStorage.css);
}

let jsEditor = ace.edit("js");
jsEditor.setTheme("ace/theme/chrome");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

if (dreamerSessionStorage.js) {
  jsEditor.setValue(dreamerSessionStorage.js);
}

let examplesHtmlEditor = ace.edit('example-code');
examplesHtmlEditor.setTheme("ace/theme/crimson_editor");
examplesHtmlEditor.session.setMode("ace/mode/html");
examplesHtmlEditor.setReadOnly(true);
examplesHtmlEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

let exerciseCodeEditor = ace.edit("exercise-code-editor");
exerciseCodeEditor.setTheme("ace/theme/crimson_editor");
exerciseCodeEditor.session.setMode("ace/mode/html");
exerciseCodeEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

setTimeout(() => {
  document.querySelectorAll('.gutter').forEach((gutter) => {
    gutter.addEventListener('mouseup', resizeEditors);
  });
}, 0);

let resizeEditors = () => {
  htmlEditor.resize();
  cssEditor.resize();
  jsEditor.resize();
  examplesHtmlEditor.resize();
  exerciseCodeEditor.resize();
};