const modal = {
  root: document.querySelector('#modal'),
  content: document.querySelector('#modal > .content'),
  tableBody: document.querySelector('#modal > .content table tbody'),
  newPresentation: document.querySelector('#modal > .content table tfoot i[class*=plus]'),
  removeAll: document.querySelector('#modal > .content table tfoot i[class*=eraser]'),
  totalPresentations: document.querySelector('#modal > .content table tfoot #total-presentations'),
  presentations: document.getElementsByClassName('presentation'),
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
    <td>
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
  }
};

let dreamerSettings;
modal.initPresentationsList();


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
    modal.updateLocalStorage(modal.getDefaultPresentationsObject());
    modal.totalPresentations.innerHTML = modal.presentations.length;
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