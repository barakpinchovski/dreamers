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

// let sizes = localStorage.getItem('split-sizes')
//
// if (sizes) {
//   sizes = JSON.parse(sizes)
// } else {
//   sizes = [50, 50] // default sizes
// }
//
// var split = Split(['#one', '#two'], {
//   sizes: sizes,
//   onDragEnd: function(sizes) {
//     localStorage.setItem('split-sizes', JSON.stringify(sizes))
//   },
// });