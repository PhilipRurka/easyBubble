window.ezabbleLib = {
  timeout: false,
  number: 0,
  defaultColors: {
    background_color: '#000',
    border_color: '#fff',
    shadow_color: '#000'
  },
  init: function() {
    window.ezabble_colors = window.ezabble_colors || defaultColors;
    var ezabbleList = document.getElementsByClassName('ezabble');
    for (var i = 0; i < ezabbleList.length; i++) {
      var ezabble = ezabbleList[i];
      var set = undefined;
      if(ezabble_colors.per_id) {
        for (let i = 0; i < ezabble_colors.per_id.length; i++) {
          const colorObj = ezabble_colors.per_id[i];
          if(colorObj.id === ezabble.id) {   
            set = colorObj;
            break
          };
        };
      };

      set = set || ezabble_colors.default;
      if(!ezabble.classList.contains('tracked')) {

        for (var ii = 0; ii < ezabble.children.length; ii++) {
          ezabble.classList.add('tracked')
          var ezabbleChild = ezabble.children[ii];
          var clone = ezabbleChild.cloneNode(true).children
          ezabbleChild.children[0].remove();
          var div = document.createElement("div");
          ezabbleChild.appendChild(div);

          if(ezabbleChild.classList.contains('ezabble-event')) {
            var ezabbleEvent = ezabbleChild;
            var ezabbleTrigger = ezabbleChild.children[0];
            ezabbleTrigger.classList.add('ezabble-trigger');
            ezabbleTrigger.appendChild(clone[0]);

          } else if(ezabbleChild.classList.contains('ezabble-wrapper')) {
            var ezabbleWrapper = ezabbleChild;
            var ezabbleContainer = ezabbleChild.children[0];
            ezabbleContainer.classList.add('ezabble-container');
            div = document.createElement("div");
            ezabbleContainer.appendChild(div);
            var ezabbleContent = ezabbleContainer.children[0];
            ezabbleContent.classList.add('ezabble-content');
            ezabbleContent.appendChild(clone[0]);

            ezabbleWrapper.style.cssText = 'border-color:' + set.border_color + '!important;'
            ezabbleContainer.setAttribute('style', 'background-color:' + set.background_color + ';');
            ezabbleLib.pseudoStyle(ezabbleWrapper, 'before','border-color', set.border_color);
            ezabbleLib.pseudoStyle(ezabbleWrapper ,'after','border-color', set.border_color);
            ezabbleLib.pseudoStyle(ezabbleWrapper, 'after','background-color', set.background_color);
            if(ezabbleWrapper.classList.contains('ezabble-shadow')) {
              ezabbleWrapper.style.cssText += 'box-shadow: 0 0 6px 1px ' + set.shadow_color + ';';
              var ezabblePosition;
              for (let i = 0; i < ezabbleWrapper.classList.length; i++) {
                const ezabbleClass = ezabbleWrapper.classList[i];
                ezabblePosition = ezabbleClass.split('ezabble-pos-');
                if(ezabblePosition.length > 1) {
                  ezabblePosition = Number(ezabblePosition[1]);
                  break;
                }
              }
              
              var boxShadowValue;
              if(ezabblePosition >= 1 && ezabblePosition <= 3) {
                boxShadowValue = '-2px -2px 4px -1px ';
              } else if(ezabblePosition >= 4 && ezabblePosition <= 6) {
                boxShadowValue = '2px -2px 4px -1px ';
              } else if(ezabblePosition >= 7 && ezabblePosition <= 9) {
                boxShadowValue = '2px 2px 4px -1px ';
              } else if(ezabblePosition >= 10 && ezabblePosition <= 12) {
                boxShadowValue = '-2px 2px 4px -1px ';
              }
              ezabbleLib.pseudoStyle(ezabbleWrapper, 'before','box-shadow', boxShadowValue + set.shadow_color + ' !important');
            };
          };
        };

        /** Save reference of some element items to ezabbleTrigger */
        ezabbleTrigger.__ezabble = ezabble;
        ezabbleTrigger.__ezabbleEvent = ezabbleEvent;
        ezabbleTrigger.__ezabbleWrapper = ezabbleWrapper;

        if(ezabbleEvent.classList.contains('ezabble-click')) {
          ezabbleTrigger.addEventListener('click', function(event) {
            ezabbleLib.listener(event, true, ezabbleLib.generateUniqueNumber(event));
          });
    
          ezabbleTrigger.addEventListener('mouseleave', function(event) {
            ezabbleLib.listener(event, false, ezabbleLib.generateUniqueNumber(event));
          });
          
        } else if(ezabbleEvent.classList.contains('ezabble-hover')) {
          /** Save reference of some element items to ezabbleWrapper */
          ezabbleWrapper.__ezabble = ezabble;
          ezabbleWrapper.__ezabbleEvent = ezabble;
          ezabbleWrapper.__ezabbleWrapper = ezabbleWrapper;

          ezabbleWrapper.addEventListener('mouseenter', function(event) {
            ezabbleLib.listener(event, true, ezabbleLib.generateUniqueNumber(event));
          });

          ezabbleWrapper.addEventListener('mouseleave', function(event) {
            ezabbleLib.listener(event, false, ezabbleLib.generateUniqueNumber(event));
          });

          ezabbleTrigger.addEventListener('mouseenter', function(event) {
            ezabbleLib.listener(event, true, ezabbleLib.generateUniqueNumber(event));
          });

          ezabbleTrigger.addEventListener('mouseleave', function(event) {
            ezabbleLib.listener(event, false, ezabbleLib.generateUniqueNumber(event));
          });
        }
      }
    }
  },
  listener: function(event, fadeIn, randomNumber) {
    var ezabbleTarget = event.currentTarget;
    var ezabble = ezabbleTarget.__ezabble;
    var ezabbleEvent = ezabbleTarget.__ezabbleEvent;
    var ezabbleWrapper = ezabbleTarget.__ezabbleWrapper;
    var delay1, delay2, delay3;
    var eventClick = !!ezabbleEvent.classList.contains('ezabble-click');
    ezabbleTarget.fadeIn = fadeIn;
  
    if(eventClick) {
      delay1 = 0;
      delay2 = 500;
      delay3 = 250;
    } else {
      delay1 = 250;
      delay2 = 750;
      delay3 = 0;
    };
  
    if(ezabbleTarget.fadeIn) {
      setTimeout(function() {
        if(randomNumber !== ezabble.__randomNumber) { return };
        ezabbleWrapper.classList.add('show-ezabble');
        setTimeout(function() {
          if(randomNumber !== ezabble.__randomNumber) { return };
          ezabbleWrapper.classList.add('pointer-ezabble');
        }, 250);
      }, delay1);
      
    } else {
      setTimeout(function() {
        if(randomNumber !== ezabble.__randomNumber) { return };
        ezabbleWrapper.classList.remove('show-ezabble');
        setTimeout(function() {
          if(randomNumber !== ezabble.__randomNumber) { return };
          ezabbleWrapper.classList.remove('pointer-ezabble');
        }, delay2);
      }, delay3);
    };
  },
  pseudoStyle: function(element, pseudoElement, prop, value) {
    var head = document.head || document.getElementsByTagName('head')[0];
    var _sheet = document.getElementById("pseudoStyles") || document.createElement('style');
    _sheet.id = "pseudoStyles";
    ezabbleLib.number++;
    var className = "pseudoStyle" + ezabbleLib.number;
    
    element.className += " " + className; 
    
    _sheet.innerHTML += " ." + className + ":" + pseudoElement + "{" + prop + ":" + value + "}";
    head.appendChild(_sheet);
    return this;
  },
  generateUniqueNumber: function(event) {
    var randomNumber = Math.random();
    event.currentTarget.__ezabble.__randomNumber = randomNumber;
    return randomNumber;
  }
};

ezabbleLib.init();

document.body.addEventListener('DOMSubtreeModified', function () {
  // This Timeout Condition may prevent the last iteration from happenning
  if(!ezabbleLib.timeout) {
    ezabbleLib.init();
    ezabbleLib.timeout = true;
    setTimeout(function() {
      ezabbleLib.timeout = false
    }, 250);
  };
});