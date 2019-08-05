var splitRows = Split(['header', 'main', 'footer'], {
  gutterSize: 5,
  sizes: [33.333, 33.333, 33.333],
  direction: 'vertical',
  cursor: 'row-resize',
  minSize: [77, 5, 20]
});

var splitColumns = Split(['#html', '#css', '#js'], {
  gutterSize: 5,
  sizes: [33.333, 33.333, 33.333],
  direction: 'horizontal'
});

var splitExamples = Split(['#teaching-wrapper', '#examples-wrapper'], {
  gutterSize: 2,
  sizes: [99.5, 0.5],
  direction: 'horizontal',
  minSize: [190, 0.5]
});

var splitExamplesView = Split(['#code-examples', '#examples-view',  '#examples-list'], {
  gutterSize: 5,
  sizes: [40, 40, 20],
  direction: 'horizontal',
  minSize: [20, 20, 20]
});