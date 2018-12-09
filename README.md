# ezabble
Its a Simple Nano Library that helps beautifully creates Popup Bubbles with minimal code.

## Demo
https://philiprurka.github.io/easyBubble/

## CDN
Coming Soon!

## How To Use
### HTML
```html
<div class='ezabble'>
  <div class='ezabble-event'>
    <div class='ezabble-trigger'>
      <!-- Item(s) you want to be part of the event trigger. -->
    </div>
  </div>
  <div class='ezabble-wrapper'>
    <div class='ezabble-content'>
      <!-- Content you want displayed in the ezabble -->
    </div>
  </div>
</div>
```

#### Event Type
Once you have set that up, now you must choose an event that will trigger the bubble. Your options are the following.
##### Click Event
```html
<div class='ezabble'>
  <div class='ezabble-event ezabble-click'>
    ...
```
or
##### Hover Event
```html
<div class='ezabble'>
  <div class='ezabble-event ezabble-hover'>
  ...
```

#### Position
Great, now you must identify the position you want your bubble to display in. You can chose position 1 - 12. For more information on which position to use, please either read bellow or check out the demo.
```html
<div class='ezabble-wrapper ezabble-pos-1'>
  ...
```

## Additional Information
Now that we have the bare minimum, lets customize our bubbles.
