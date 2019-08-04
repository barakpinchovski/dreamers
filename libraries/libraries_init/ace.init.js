let htmlEditor = ace.edit("html");
//editor.setTheme("ace/theme/crimson_editor");
//editor.setTheme("ace/theme/iplastic");
//editor.setTheme("ace/theme/sqlserver");
htmlEditor.setTheme("ace/theme/crimson_editor");
htmlEditor.session.setMode("ace/mode/html");

let cssEditor = ace.edit("css");
//editor.setTheme("ace/theme/twilight");
cssEditor.setTheme("ace/theme/dracula");
cssEditor.session.setMode("ace/mode/css");

let jsEditor = ace.edit("js");
jsEditor.setTheme("ace/theme/chrome");
jsEditor.session.setMode("ace/mode/javascript");