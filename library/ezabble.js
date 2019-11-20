// FRONTEND: Add some error console logs and look into a try catch

window.ezabbleLib = {
  timeout: false,
  number: 0,
  defaultColors: {
    backgroundColor: '#fff',
    borderColor: '#000',
    shadowColor: '#000'
  },
  init: function() {
    var colorKeys = ['backgroundColor', 'borderColor', 'shadowColor'];
    var ezabbleList = document.getElementsByClassName('ezabble');
    for (var i = 0; i < ezabbleList.length; i++) {
      var ezabble = ezabbleList[i];
      var set = undefined;
      if(window.ezabble_colors && ezabble_colors.per_id) {
        for (var ii = 0; ii < ezabble_colors.per_id.length; ii++) {
          var colorObj = ezabble_colors.per_id[ii];
          if(colorObj.id === ezabble.id) {

            for (let i = 0; i < colorKeys.length; i++) {
              const key = colorKeys[i];
              
              if(!colorObj[key]) {
                if(window.ezabble_colors && window.ezabble_colors.default && window.ezabble_colors.default[key]) {
                  colorObj[key] = window.ezabble_colors.default[key];
                } else {
                  colorObj[key] = ezabbleLib.defaultColors[key];
                };
              };
            };

            set = colorObj;
            break;
          };
        };
      };

      if(!set && window.ezabble_colors && window.ezabble_colors.default) {
        set = ezabble_colors.default;
      } else if(set === undefined) {
        set = ezabbleLib.defaultColors;
      };

      if(!ezabble.classList.contains('tracked')) {

        for (var iii = 0; iii < ezabble.children.length; iii++) {
          ezabble.classList.add('tracked')
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
        ezabbleWrapper.classList.add('pointer-ezabble');
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

document.body.addEventListener('DOMSubtreeModified', function() {
  // This Timeout Condition may prevent the last iteration from happenning
  if(!ezabbleLib.timeout) {
    ezabbleLib.init();
    ezabbleLib.timeout = true;
    setTimeout(function() {
      ezabbleLib.timeout = false;
    }, 250);
  };
});