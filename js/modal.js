const modal = {
  root: document.querySelector('#modal'),
  content: document.querySelector('#modal > .content'),
  tableBody: document.querySelector('#modal > .content table tbody'),
  newPresentation: document.querySelector('#modal > .content table tfoot i[class*=plus]'),
  removeAll: document.querySelector('#modal > .content table tfoot i[class*=eraser]'),
  exportSettings: document.querySelector('#modal > .content table tfoot i[class*=export]'),
  exampleSettings: document.querySelector('#modal > .content table tfoot i[class*=file-code]'),
  totalPresentations: document.querySelector('#modal > .content table tfoot #total-presentations'),
  presentations: document.getElementsByClassName('presentation'),
  defaultEditorsFontSize: document.querySelector('#editors-font-size'),
  currentGroup: document.querySelector('#current-group'),
  groupsList: document.querySelector('#groups-data'),
  addNewGroup: document.querySelector('#add-new-group'),
  newGroupInput: document.querySelector('#new-group-title'),
  listIndex: 0,

  updateLocalStorage: (data) => {
    data = data || { settings: { presentations: [], checkpoint: 1 } };
    localStorage.setItem('dreamer', JSON.stringify(data));
  },
  
  getDefaultPresentationsObject: () => { return { url: '', name: '', editors: { html: false, css: false, js: false, php: false } } },

  createPresentationRow: (index, presentation) => {
    const newRow = document.createElement('tr');
    newRow.id = `row_${index + 1}`;
    newRow.className = 'presentation';

    let checked = {
      html: presentation.editors.html ? 'checked' : '',
      css: presentation.editors.css ? 'checked' : '',
      js: presentation.editors.js ? 'checked' : '',
      php: presentation.editors.php ? 'checked' : '',
    };

    newRow.innerHTML = `
    <td hidden>
        ${index + 1}
    </td>
    <td>
        <i class="fas fa-trash" onclick="removePresentation(event, ${index})"></i>
    </td>
    <td>
        <input type="text" placeholder="Name" value="${presentation.name}" name="name" onkeyup="updateData(event, ${index})"/>
    </td>
    <td>
        <input type="text" placeholder="URL" value="${presentation.url}" name="url" onkeyup="updateData(event, ${index})"/>
    </td>
    <td>
        <input type="checkbox" value="html" name="html" ${checked.html} onclick="updateData(event, ${index})"/>
    </td>
    <td>
        <input type="checkbox" value="css" name="css" ${checked.css} onclick="updateData(event, ${index})"/>
    </td>
    <td>
        <input type="checkbox" value="js" name="js" ${checked.js} onclick="updateData(event, ${index})"/>
    </td>
    <td hidden>
        <input type="checkbox" value="php" name="php" ${checked.php} onclick="updateData(event, ${index})"/>
    </td>`;
    modal.listIndex = index + 1;
    return newRow;
  },

  initPresentationsList: () => {
    dreamerSettings = localStorage.getItem('dreamer');
    if (dreamerSettings) {
      dreamerSettings = JSON.parse(dreamerSettings);
      for (let index in dreamerSettings.settings.presentations) {
        index = parseInt(index, 10);
        let presentation = dreamerSettings.settings.presentations[index];
        modal.tableBody.append(modal.createPresentationRow(index, presentation));
      }
    } else {
      modal.updateLocalStorage();
      dreamerSettings = JSON.parse(localStorage.getItem('dreamer'));
    }
    modal.totalPresentations.innerHTML = modal.presentations.length;
  },

  importSettings: (event) => {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (file => {
        return (e) => {
          if (e.target.result) {
            localStorage.setItem('dreamer', e.target.result);
          }
        };
      })(event.target.files[0]);

      // Read in the image file as a data URL.
      reader.readAsText(event.target.files[0]);
    }
  },

  getDefaultEditorsFontSize: () => {
    let dreamerSettings = localStorage.getItem('dreamer');
    if (dreamerSettings) {
      dreamerSettings = JSON.parse(dreamerSettings);
      return dreamerSettings.hasOwnProperty('editorsFontSize') ? dreamerSettings.editorsFontSize : 12;
    }
  },

  updateDefaultFontSize: (e) => {
    let dreamerSettings = localStorage.getItem('dreamer');
    if (dreamerSettings && e.target.value && Number(e.target.value)) {
      dreamerSettings = JSON.parse(dreamerSettings);
      dreamerSettings.editorsFontSize = Number(e.target.value);
      localStorage.setItem('dreamer', JSON.stringify(dreamerSettings));
    }
  },

  loadGroups: () => {
    let dreamerSettings = localStorage.getItem('dreamer');
    dreamerSettings = JSON.parse(dreamerSettings);
    if (dreamerSettings.hasOwnProperty('groups')) {
      let existingGroups = dreamerSettings.groups;
      for (let groupName in existingGroups.list) {
        let groupOption = document.createElement('option');
        groupOption.innerText = groupName;
        if (existingGroups.hasOwnProperty('selected') && existingGroups.selected === groupName) {
          groupOption.selected = true;
        }
        modal.currentGroup.append(groupOption);

        let groupInList = document.createElement('li');
        groupInList.innerText = groupName;
        let removeGroup = document.createElement('i');
        removeGroup.classList.add('fas', 'fa-trash');
        removeGroup.addEventListener('click', () => {
          groupInList.parentElement.removeChild(groupInList);
          modal.currentGroup.removeChild(groupOption);
          delete dreamerSettings.groups.list[groupName];

          dreamerSettings.groups.selected = modal.currentGroup.value || "General";
          if (Object.keys(dreamerSettings.groups.list).length === 0) {
            delete dreamerSettings.groups;
          }

          modal.updateLocalStorage(dreamerSettings);
        });

        groupInList.append(removeGroup);
        modal.groupsList.querySelector('ul').append(groupInList);
      }
    }
  }
};

let dreamerSettings;
modal.initPresentationsList();
modal.loadGroups();


modal.root.addEventListener('click', (event) => {
  modal.root.classList.remove('show-modal');
});

modal.content.addEventListener('click', (event) => {
  event.stopPropagation();
});

modal.newPresentation.addEventListener('click', (event) => {
  modal.tableBody.append(modal.createPresentationRow(parseInt(modal.listIndex, 10) ,  modal.getDefaultPresentationsObject()));
  modal.totalPresentations.innerHTML = modal.presentations.length;
});

modal.removeAll.addEventListener('click', (event) => {
  if(confirm('Are you sure you want to remove all presentations?')) {
    modal.updateLocalStorage({ settings: { presentations: [], checkpoint: 1 } });
    while (modal.presentations.length) {
      let p = modal.presentations[0];
      p.parentElement.removeChild(p);
    }
    modal.totalPresentations.innerHTML = modal.presentations.length;
  }
});

modal.exportSettings.addEventListener('click', (event) => {
  if (localStorage.getItem('dreamer')) {
    event.target.parentElement.setAttribute('href', `data:text/plain;charset=utf-8, ${encodeURIComponent(localStorage.getItem('dreamer'))}`);
    event.target.parentElement.setAttribute('download', 'dreamerSettings.dat');
    event.target.parentElement.click();
  }
});

updateData = (event, index) => {
  if (dreamerSettings) {
    index = parseInt(index, 10);
    if (!dreamerSettings.settings.presentations[index]) {
      dreamerSettings.settings.presentations[index] = modal.getDefaultPresentationsObject();
    }
    if (event.target.type === 'text') {
      dreamerSettings.settings.presentations[index][event.target.name] = event.target.value;
    }
    else {
      dreamerSettings.settings.presentations[index]['editors'][event.target.name] = event.target.checked;
    }
    modal.updateLocalStorage(dreamerSettings);
  }
};

removePresentation = (event, index) => {
  dreamerSettings = localStorage.getItem('dreamer');
  if (dreamerSettings) {
    dreamerSettings = JSON.parse(dreamerSettings);
    dreamerSettings.settings.presentations.splice(index, 1);
    modal.updateLocalStorage(dreamerSettings);
    while (modal.presentations.length) {
      let p = modal.presentations[0];
      p.parentElement.removeChild(p);
    }
    modal.initPresentationsList();
  }
};

modal.defaultEditorsFontSize.value = modal.getDefaultEditorsFontSize();

modal.defaultEditorsFontSize.addEventListener('change', modal.updateDefaultFontSize);

modal.exampleSettings.addEventListener('click', () => {
  const exampleSettings = '{"settings":{"presentations":[{"url":"https://onedrive.live.com/embed?cid=93284563204F980C&resid=93284563204F980C%21226&authkey=AD5XM3A4SADXtSA&em=2","name":"Course Intro","editors":{"html":false,"css":false,"js":false,"php":false}},{"url":"https://onedrive.live.com/embed?cid=93284563204F980C&resid=93284563204F980C%21227&authkey=ABu34ud-GpuJXDc&em=2","name":"Intro to Web","editors":{"html":false,"css":false,"js":false,"php":false}},{"url":"https://onedrive.live.com/embed?cid=93284563204F980C&resid=93284563204F980C%21232&authkey=AGEzgK9R8MS08FE&em=2","name":"HTML5","editors":{"html":true,"css":false,"js":false,"php":false}},{"url":"https://onedrive.live.com/embed?cid=93284563204F980C&resid=93284563204F980C%21228&authkey=AHrBdJ9VjGNgTzY&em=2","name":"CSS3","editors":{"html":true,"css":true,"js":false,"php":false}},{"url":"https://onedrive.live.com/embed?cid=93284563204F980C&resid=93284563204F980C%21229&authkey=AFJmGBOgf6evnB4&em=2","name":"JavaScript","editors":{"html":true,"css":false,"js":true,"php":false}},{"url":"https://onedrive.live.com/embed?cid=93284563204F980C&resid=93284563204F980C%21230&authkey=ABjQU5k2Q7PgVdM&em=2","name":"PHP7","editors":{"html":true,"css":false,"js":false,"php":true}},{"url":"https://onedrive.live.com/embed?cid=93284563204F980C&resid=93284563204F980C%21231&authkey=AJEpFvtejnqsJsU&em=2","name":"The Next Episode","editors":{"html":true,"css":false,"js":true,"php":false}}],"checkpoint":6},"exercise":"","editorsFontSize":16}';
  dreamerSettings = localStorage.setItem('dreamer', exampleSettings);
  document.location.reload();
});

modal.currentGroup.addEventListener('change', (s) => {
  let dreamerSettings = localStorage.getItem('dreamer');
  dreamerSettings = JSON.parse(dreamerSettings);
  dreamerSettings.groups.selected = s.target.value;
  modal.updateLocalStorage(dreamerSettings);
  document.location.reload();
});

modal.addNewGroup.addEventListener('click', () => {
  let dreamerSettings = localStorage.getItem('dreamer');
  dreamerSettings = JSON.parse(dreamerSettings);

  let groupName = modal.newGroupInput.value;
  if (groupName && (!dreamerSettings.groups || dreamerSettings.groups && !dreamerSettings.groups.list[groupName])) {
    let groupElm = document.createElement('li');
    groupElm.innerText = groupName;

    let removeGroup = document.createElement('i');
    removeGroup.classList.add('fas', 'fa-trash');
    removeGroup.addEventListener('click', ()=> {
      groupElm.parentElement.removeChild(groupElm);
      modal.currentGroup.removeChild(groupSelect);
      delete dreamerSettings.groups.list[groupName];
      dreamerSettings.groups.selected = modal.currentGroup.value || "General";
      if (Object.keys(dreamerSettings.groups.list).length === 0) {
        delete dreamerSettings.groups;
      }
      modal.updateLocalStorage(dreamerSettings);
    });

    groupElm.append(removeGroup);
    modal.groupsList.querySelector('ul').append(groupElm);

    let groupSelect = document.createElement('option');
    groupSelect.innerText = groupName;
    modal.currentGroup.append(groupSelect);

    // add to localstorage
    if (!dreamerSettings.hasOwnProperty('groups')) {
      dreamerSettings.groups = { list: {}, selected: 'General'};
    }
    dreamerSettings.groups.list[groupName] = {};
    dreamerSettings.groups.list[groupName].exercise = exerciseCodeEditor.getValue();

    modal.updateLocalStorage(dreamerSettings);

    modal.newGroupInput.value = '';
  }
});