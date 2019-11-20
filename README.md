# Ezabble
Its a Simple Nano Library that helps you create beautiful tooltips with minimal code.

## Demo
https://philiprurka.github.io/ezabble/

## CDN
**CSS:** https://res.cloudinary.com/philip/raw/upload/v1574205560/ezabble_ernzlk.css <br />
**JS:** https://res.cloudinary.com/philip/raw/upload/v1574205564/ezabble_pfwufl.js

## How To Use
### HTML
```html
<div class='ezabble'>
  <div class='ezabble-event'>
    <!-- Item(s) you want to be part of the trigger event -->
  </div>
  <div class='ezabble-wrapper'>
    <!-- Content you want displayed in the ezabble -->
  </div>
</div>
```
---
### Event Type
Once you have set that up, now you must choose an event type that will trigger the tooltip. Your options are the following.
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
Great, now you must identify the position you want your tooltip to display in. You can chose position 1 - 12.
* ezabble-pos-1
* ezabble-pos-2
* ezabble-pos-3
* ezabble-pos-4
* ezabble-pos-5
* ezabble-pos-6
* ezabble-pos-7
* ezabble-pos-8
* ezabble-pos-9
* ezabble-pos-10
* ezabble-pos-11
* ezabble-pos-12

```html
...
<div class='ezabble-wrapper ezabble-pos-1'>
  ...
```
You can try each positions in the [demo](https://philiprurka.github.io/ezabble/).
The position of the trangle that pokes out of the tooltip is determined by a 12 grid system around a square.
<br/>
<img src="/demo/12-grid-system.png" alt="12 Grid System" width="40%">

## Re-Initialize
By default, once the JS folder initially runs, it will crall all ezabbles and work its magic. However, then a new one is created, you can re-initialize ezabble by calling `ezabbleLib.init();`

## Additional Information
Now that we have the bare minimum, lets customize our bubbles.

### Add Custom color
To adjuste the default color, create a `window.ezabble_colors` object.
```javascript
window.ezabble_colors = {
  default: {
    backgroundColor: 'Some Color',
    borderColor: 'Some Color',
    shadowColor: 'Some Color'
  }
}
```
If you want to target specific ezabbles, add the `per_id` key and match the id of the ezabble with each object's id within the per_id array. Example:
```html
<div id='Some Id' class='ezabble'>
  ...
</div>
<div id='Some Id' class='ezabble'>
  ...
</div>
<div id='Some Id' class='ezabble'>
  ...
</div>
```

```javascript
window.ezabble_colors = {
  default: {
    backgroundColor: 'Some Color',
    borderColor: 'Some Color',
    shadowColor: 'Some Color'
  },
  per_id: [
    {
      id: 'Some Id',
      backgroundColor: 'Some Color',
      borderColor: 'Some Color',
      shadowColor: 'Some Color'
    },
    {
      id: 'Some Id',
      backgroundColor: 'Some Color',
      borderColor: 'Some Color',
      shadowColor: 'Some Color'
    },
    ...
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
