const panesLayoutDrawer = {
  root: document.querySelector('header.content > nav'),
  justify:  document.querySelector('header.content > nav .fa-align-justify'),
  left: document.querySelector('header.content > nav .fa-align-left'),
  center: document.querySelector('header.content > nav .fa-align-center'),
  right: document.querySelector('header.content > nav .fa-align-right')
};

panesLayoutDrawer.root.addEventListener('mouseenter', (event) => {
  panesLayoutDrawer.root.classList.add('expanded');
});

panesLayoutDrawer.root.addEventListener('mouseleave', (event) => {
  panesLayoutDrawer.root.classList.remove('expanded');
});

panesLayoutDrawer.justify.addEventListener('click', () => {
  splitColumns.setSizes([33.333, 33.333, 33.333]);
  resizeEditors();
});

panesLayoutDrawer.left.addEventListener('click', () => {
  splitColumns.setSizes([80, 10, 10]);
  resizeEditors();
});

panesLayoutDrawer.center.addEventListener('click', () => {
  splitColumns.setSizes([40, 50, 10]);
  resizeEditors();
});

panesLayoutDrawer.right.addEventListener('click', () => {
  splitColumns.setSizes([10, 10, 80]);
  resizeEditors();
});