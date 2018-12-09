# easyBubble
Its a Simple Nano Library that helps beautifully creates Popup Bubbles with minimal code.

## Demo
https://philiprurka.github.io/easyBubble/

## CDN
Coming Soon!

## How To Use
### HTML
Easy, once you have added the css and javascript file to your project, simply do the following.
In your HTML, you will want to begin
```html
<div class='easy-bubble'>
  <div class='easy-bubble-event'>
    <div class='easy-bubble-trigger'>
      <!-- Item(s) you want to be part of the event trigger. -->
    </div>
  </div>
  <div class='easy-bubble-wrapper'>
    <div class='easy-bubble-content'>
      <!-- Content you want displayed in the Easy Bubble -->
    </div>
  </div>
</div>
```

Once you have set that up, now you must choose an event that will trigger the bubble. Your options are the following.
- Click Event
```html
<div class='easy-bubble'>
  <div class='easy-bubble-event easy-bubble-click'>
    ...
```
or
- Hover Event
```html
<div class='easy-bubble'>
  <div class='easy-bubble-event easy-bubble-hover'>
  ...
```

Great, now you must identify the position you want your bubble to display in. You can chose position 1 - 12. For more information on which position to use, please either read bellow or check out the demo.
```html
<div class='easy-bubble-wrapper easy-bubble-pos-1'>
  ...
```

### Javascript
You will also need a create a Global variable before the Easy Bubble is run. This global variable will allow you to customize some aspects of your bubbles.
```javascript
window.easy_bubble_colors = {
  default: {
    background_color: '/* Some Color */',
    border_color: '/* Some Color */',
    shadow_color: '/* Some Color */'
  }
};
```

## Additional Information
Now that we have the bare minimum, lets customize our bubbles.
