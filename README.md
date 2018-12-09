# ezabble
Its a Simple Nano Library that helps beautifully creates tooltips with minimal code.

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
---
### Event Type
Once you have set that up, now you must choose an event that will trigger the tooltip. Your options are the following.
#### Click Event
```html
<div class='ezabble'>
  <div class='ezabble-event ezabble-click'>
    ...
```
or
#### Hover Event
```html
<div class='ezabble'>
  <div class='ezabble-event ezabble-hover'>
  ...
```
---
### Position
Great, now you must identify the position you want your tooltip to display in. You can chose position 1 - 12. You can try each positions in the demo.
```html
<div class='ezabble-wrapper ezabble-pos-1'>
  ...
```
The position of the trangle that pokes out of the tooltip is determined by a 12 grid system around a square. Example:
(Image displaying examples)

## Additional Information
Now that we have the bare minimum, lets customize our bubbles.

### Add Custom color
To adjuste the default color, create a `window.ezabble_colors` object.
```javascript
window.ezabble_colors = {
  default: {
    background_color: '#000',
    border_color: '#fff',
    shadow_color: '#000'
  }
}
```
If you want to target specific ezabbles, add the `per_id` key and for match the id of the ezabble with each object's id within the array. Example:
```html
<div id='bubble-2', class='ezabble'>
  ...
</div>
<div id='bubble-3', class='ezabble'>
  ...
</div>
<div id='bubble-4', class='ezabble'>
  ...
</div>
```

```javascript
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
    }
  ]
}
```
---

### Add Custom Styles
Custome your ezabble by applying the following classes to `.ezabble-wrapper`.

| Options     | Classe                 | Description                          |
|-------------|------------------------|--------------------------------------|
| Box Shadow  | .ezabble-shadow        | Gives the Tooltip a nice box shadow. |
|**-------------**|**------------------------**|**--------------------------------------**|
| Fixed Width |                        | Sets a static width to the tooltip.  |
|             | .ezabble-width-sm      | Static width of 128px.               |
|             | .ezabble-width-md      | Static width of 192px.               |
|             | .ezabble-width-lg      | Static width of 256px.               |
|**-------------**|**------------------------**|**--------------------------------------**|
| Max-Height  |                        | Sets a max height to the tooltip.    |
|             | .ezabble-max-height-sm | Max height of 128px.                 |
|             | .ezabble-max-height-md | Max height of 192px.                 |
|             | .ezabble-max-height-lg | Max height of 256px.                 |
|**-------------**|**------------------------**|**--------------------------------------**|
