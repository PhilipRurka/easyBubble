window.ezabble_colors = {
  default: {
    background_color: '#000',
    border_color: '#fff',
    shadow_color: '#000'
  },
  per_id: [
    {
      id: 'bubble-2',
      background_color: '#A9E5BB',
      border_color: '#E3170A',
      shadow_color: '#0C1A2B'
    },
    {
      id: 'bubble-3',
      background_color: '#D8DCFF',
      border_color: '#AEADF0',
      shadow_color: '#D8DCFF'
    },
    {
      id: 'bubble-4',
      background_color: '#93BEDF',
      border_color: '#8EF9F3',
      shadow_color: '#5EFC8D'
    },
    {
      id: 'bubble-5',
      background_color: '#1b283b',
      border_color: '#3CD2E0',
      shadow_color: '#0C1A2B'
    },
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