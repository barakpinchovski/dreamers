let dreamerSettingsDefaultZoom = 12;

let dreamerSettingsGlobal = localStorage.getItem('dreamer');
if (dreamerSettingsGlobal) {
  dreamerSettingsGlobal = JSON.parse(dreamerSettingsGlobal);
  dreamerSettingsDefaultZoom = dreamerSettingsGlobal.hasOwnProperty('editorsFontSize') ? dreamerSettingsGlobal.editorsFontSize : 12;
}

let htmlEditor = ace.edit("html");
//editor.setTheme("ace/theme/crimson_editor");
//editor.setTheme("ace/theme/iplastic");
htmlEditor.setTheme("ace/theme/crimson_editor");
htmlEditor.session.setMode("ace/mode/html");
htmlEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

let cssEditor = ace.edit("css");
//editor.setTheme("ace/theme/twilight");
cssEditor.setTheme("ace/theme/dracula");
cssEditor.session.setMode("ace/mode/css");
cssEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

let jsEditor = ace.edit("js");
jsEditor.setTheme("ace/theme/chrome");
jsEditor.session.setMode("ace/mode/javascript");
jsEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

let examplesHtmlEditor = ace.edit('example-code');
examplesHtmlEditor.setTheme("ace/theme/crimson_editor");
examplesHtmlEditor.session.setMode("ace/mode/html");
examplesHtmlEditor.setReadOnly(true);
examplesHtmlEditor.setFontSize(Number(dreamerSettingsDefaultZoom));

let exerciseCodeEditor = ace.edit("exercise-code-editor");
exerciseCodeEditor.setTheme("ace/theme/crimson_editor");
exerciseCodeEditor.session.setMode("ace/mode/html");
exerciseCodeEditor.setFontSize(Number(dreamerSettingsDefaultZoom));