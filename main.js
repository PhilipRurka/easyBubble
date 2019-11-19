// FRONTEND: Turn this into Cammel Case Keys

window.ezabble_colors = {
  default: {
    backgroundColor: '#fff',
    borderColor: '#000',
    shadowColor: '#000'
  },
  per_id: [
    {
      id: 'bubble-2',
      backgroundColor: '#A9E5BB',
      borderColor: '#E3170A',
      shadowColor: '#0C1A2B'
    },
    {
      id: 'bubble-3',
      backgroundColor: '#D8DCFF',
      borderColor: '#AEADF0',
      shadowColor: '#D8DCFF'
    },
    {
      id: 'bubble-4',
      backgroundColor: '#93BEDF',
      borderColor: '#8EF9F3',
      shadowColor: '#5EFC8D'
    },
    {
      id: 'bubble-5',
      backgroundColor: '#1b283b',
      borderColor: '#3CD2E0',
      shadowColor: '#0C1A2B'
    },
    {
      id: 'bubble-6',
      backgroundColor: '#F56416',
      borderColor: '#F56416',
      shadowColor: '#0C1A2B'
    }
  ]
};

var positionDisplayed = document.getElementById('ezabble-position-selected');
var ezabbles = document.getElementsByClassName('ezabble');
for (var i = 0; i < ezabbles.length; i++) {
  var ezabble = ezabbles[i];
  ezabble.children[0].addEventListener('click', function(event) {
    var button = event.currentTarget.children[0].children[0]
    positionDisplayed.innerHTML = 'ezabble-pos-' +  button.innerHTML;
  }); 
}