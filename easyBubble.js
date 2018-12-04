HTMLElement.prototype.pseudoStyle = function(element, prop, value) {
  var _this = this;
  var _sheetId = "pseudoStyles";
  var _head = document.head || document.getElementsByTagName('head')[0];
  var _sheet = document.getElementById(_sheetId) || document.createElement('style');
  _sheet.id = _sheetId;
  easyBubbleLib.number++;
  var className = "pseudoStyle" + easyBubbleLib.number;
  
  _this.className +=  " "+className; 
  
  _sheet.innerHTML += " ."+className+":"+element+"{"+prop+":"+value+"}";
  _head.appendChild(_sheet);
  return this;
};


window.easyBubbleLib = {
  timeout: false,
  number: 0,
  init: function() {
    if(easy_bubble_colors) {
      var easyList = document.getElementsByClassName('easy-bubble');
      for (var i = 0; i < easyList.length; i++) {
        var easyBubble = easyList[i];
        var set = undefined;
        for (let i = 0; i < easy_bubble_colors.per_id.length; i++) {
          const colorObj = easy_bubble_colors.per_id[i];
          if(colorObj.id === easyBubble.id) {   
            set = colorObj;
            break
          }
        };

        set = set || easy_bubble_colors.default;

        if(!easyBubble.classList.contains('tracked')) {
          var easyBubbleWrapper,
              easyBubbleTrigger;

          for (var ii = 0; ii < easyBubble.children.length; ii++) {
            easyBubble.classList.add('tracked')
            var easyBubbleChild = easyBubble.children[ii];
            var clone = easyBubbleChild.cloneNode(true).children
            easyBubbleChild.children[0].remove();
            var div = document.createElement("div");
            easyBubbleChild.appendChild(div);

            if (easyBubbleChild.classList.contains('easy-bubble-event')) {
              easyBubbleTrigger = easyBubbleChild.children[0];
              easyBubbleTrigger.classList.add('easy-bubble-trigger');
              easyBubbleTrigger.appendChild(clone[0]);

            } else if (easyBubbleChild.classList.contains('easy-bubble-wrapper')) {
              easyBubbleWrapper = easyBubbleChild;
              var easyBubbleContainer = easyBubbleChild.children[0];
              easyBubbleContainer.classList.add('easy-bubble-container');
              div = document.createElement("div");
              easyBubbleContainer.appendChild(div);
              var easyBubbleContent = easyBubbleContainer.children[0];
              easyBubbleContent.classList.add('easy-bubble-content');
              easyBubbleContent.appendChild(clone[0]);


              easyBubbleContainer.setAttribute('style', 'background-color:' + set.background_color + ';');
              easyBubbleWrapper.pseudoStyle('before','border-color', set.border_color);
              easyBubbleWrapper.pseudoStyle('after','border-color', set.border_color);
              easyBubbleWrapper.pseudoStyle('after','background-color', set.background_color);
              if(easyBubbleWrapper.classList.contains('easy-bubble-shadow')) {
                easyBubbleWrapper.setAttribute('style', 'box-shadow: 0 0 6px 1px ' + set.shadow_color + '; border-color:' + set.border_color + '!important ;');
                var bubblePosition;
                for (let i = 0; i < easyBubbleWrapper.classList.length; i++) {
                  const bubbleClass = easyBubbleWrapper.classList[i];
                  bubblePosition = bubbleClass.split('easy-bubble-pos-');
                  if(bubblePosition.length > 1) {
                    bubblePosition = Number(bubblePosition[1]);
                    break;
                  }
                }
                
                var boxShadowValue;
                if(bubblePosition >= 1 && bubblePosition <= 3) {
                  boxShadowValue = '-2px -2px 4px -1px ';
                } else if(bubblePosition >= 4 && bubblePosition <= 6) {
                  boxShadowValue = '2px -2px 4px -1px ';
                } else if(bubblePosition >= 7 && bubblePosition <= 9) {
                  boxShadowValue = '2px 2px 4px -1px ';
                } else if(bubblePosition >= 10 && bubblePosition <= 12) {
                  boxShadowValue = '-2px 2px 4px -1px ';
                }
                easyBubbleWrapper.pseudoStyle('before','box-shadow', boxShadowValue + set.shadow_color + ' !important');
              } else {
                easyBubbleWrapper.setAttribute('style', 'border-color:' + set.border_color + ';');
              }
            }
          }

          /** Save reference of some element items to easyBubbleTrigger */
          easyBubbleTrigger.__easyBubble = easyBubble;
          easyBubbleTrigger.__easyBubbleWrapper = easyBubbleWrapper;

          if(easyBubble.classList.contains('easy-bubble-click')) {
            easyBubbleTrigger.addEventListener('click', function(event) {
              easyBubbleLib.listener(event, true);
            })
      
            easyBubbleTrigger.addEventListener('mouseleave', function(event) {
              easyBubbleLib.listener(event, false);
            })
            
          } else if(easyBubble.classList.contains('easy-bubble-hover')) {
            easyBubbleTrigger.addEventListener('mouseenter', function(event) {
              easyBubbleLib.listener(event, true);
            })
      
            easyBubbleTrigger.addEventListener('mouseleave', function(event) {
              easyBubbleLib.listener(event, false);
            })
          }
        }
      }
    } else {
      console.err('The global variable called "window.easy_bubble_colors" is undefined. Please review the Docs ________________ for more information.')
    }
  },
  listener: function(event, fadeIn) {
    var easyBubbleEvent = event.currentTarget;
    var easyBubble = easyBubbleEvent.__easyBubble;
    var easyBubbleWrapper = easyBubbleEvent.__easyBubbleWrapper;
    var delay1, delay2, delay3;
    easyBubbleEvent.fadeIn = fadeIn;
  
    if(easyBubble.classList.contains('easy-bubble-click')) {
      delay1 = 0;
      delay2 = 500;
      delay3 = 250;
    } else {
      if(easyBubble.classList.contains('hop-ellipsis')) {
        delay1 = 1000;
        delay2 = 750;      
        delay3 = 0;
      } else if(easyBubble.classList.contains('easy-bubble-hover')) {
        delay1 = 0;
        delay2 = 750;
        delay3 = 0
      }
    }
  
    if(easyBubbleEvent.fadeIn) {
      setTimeout(function() {
        if(easyBubbleEvent.fadeIn) {
          easyBubbleWrapper.classList.add('show-bubble');
          setTimeout(function() {
            easyBubbleWrapper.classList.add('pointer-bubble');
          }, 250);
        }
      }, delay1);
      
    } else {
      setTimeout(function() {
        easyBubbleWrapper.classList.remove('show-bubble');
        setTimeout(function() {
          easyBubbleWrapper.classList.remove('pointer-bubble');
        }, delay2);
      }, delay3);
    };
  }
};

easyBubbleLib.init();

document.body.addEventListener('DOMSubtreeModified', function () {
  // This Timeout Condition may prevent the last iteration from happenning
  if(!easyBubbleLib.timeout) {
    easyBubbleLib.init();
    easyBubbleLib.timeout = true;
    setTimeout(function() {
      easyBubbleLib.timeout = false
    }, 250);
  };
});