/**
 * The purpose of this file is to help new developers learn
 * some Javascript by providing a breakdown and information
 * regarding the steps I took to build ezabble.
 */

window.ezabbleLib = {
  timeout: false,
  number: 0,
  defaultColors: {
    backgroundColor: '#000',
    borderColor: '#fff',
    shadowColor: '#000'
  },
  init: function() {
    /** Use the library's default color scheme if window.ezabble_colors is undefined. */
    window.ezabble_colors = window.ezabble_colors || defaultColors;
    /** Retreive all elements with classname ezabble. */
    var ezabbleList = document.getElementsByClassName('ezabble');
    /** For each element stored in ezabbleList, apply the following logic. */
    for (var i = 0; i < ezabbleList.length; i++) {
      var ezabble = ezabbleList[i];
      var set = undefined;
      /** If the key "per_id" is present in the window.ezabble_colors Object. */
      if(ezabble_colors.per_id) {
        /** Iterate over the ezabble_colors.per_id array, find and store the appropriate color for the current ezabble.*/
        for (var ii = 0; ii < ezabble_colors.per_id.length; ii++) {
          var colorObj = ezabble_colors.per_id[ii];
          if(colorObj.id === ezabble.id) {
            set = colorObj;
            break;
          };
        };
      };

      /** If window.ezabble_colors is defined and no id's match, then set the color object to be the ezabble_colors's default */
      set = set || ezabble_colors.default;
      /** If the ezabble element does not contain ".tracked" then do the following. Otherwize, skip this entire section. The ".tracked" class gets added to the ezabble's class list. This helps prevent re-iterating over a ezable that has already been set. */
      if(!ezabble.classList.contains('tracked')) {
        ezabble.classList.add('tracked')

        /** If you consult the demo's HTML, you will notice that .ezabble has two direct children ".ezabble-event" and ".ezabble-wrapper". This for loop grabs then both and applies the following to each of them. */
        for (var iii = 0; iii < ezabble.children.length; ii++) {
          var ezabbleChild = ezabble.children[iii];
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

            ezabbleWrapper.style.cssText = 'border-color:' + set.borderColor + '!important;'
            ezabbleContainer.setAttribute('style', 'background-color:' + set.backgroundColor + ';');
            ezabbleLib.pseudoStyle(ezabbleWrapper, 'before','border-color', set.borderColor);
            ezabbleLib.pseudoStyle(ezabbleWrapper ,'after','border-color', set.borderColor);
            ezabbleLib.pseudoStyle(ezabbleWrapper, 'after','background-color', set.backgroundColor);
            if(ezabbleWrapper.classList.contains('ezabble-shadow')) {
              ezabbleWrapper.style.cssText += 'box-shadow: 0 0 6px 1px ' + set.shadowColor + ';';
              var ezabblePosition;
              for (var iiii = 0; iiii < ezabbleWrapper.classList.length; iiii++) {
                var ezabbleClass = ezabbleWrapper.classList[iiii];
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
              ezabbleLib.pseudoStyle(ezabbleWrapper, 'before','box-shadow', boxShadowValue + set.shadowColor + ' !important');
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