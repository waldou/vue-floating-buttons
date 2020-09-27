# vue-floating-buttons

---

# API

## Props

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| mainStyle | String | No | Additional styling for main component wrapper. |
| mainButtonStyle | String | No | Additional styling for main button wrapper. |
| optionsStyle | String | No | Additional styling for all option buttons wrappers. |
| direction | String | No | Direction where it will pop out options to. |
| buttons | Array | Yes | All buttons configurations. |
| expanded | Boolean | No | Used to set expanded state from mount. |

## Buttons array object

| Option | Type | Description |
| --- | --- | --- |
| html | String | This is the button content. It be interpreted as HTML. |
| radius | Number | Adjust button radius. |
| color | String | Background color. |
| click | Function | Function to be called on click. Only works on option buttons. |
| disabled | Boolean | Disable button. |
| disabledColor | String | Background color when is disabled. |

**Note: First button will be used as the main button.**

# Instructions

## Props

### mainStyle
This is a convenience prop to adjust the main component wrapper div style. A common use could be to change the `position` from `relative` (default) to `absolute` and position at will.

**Example**:
Position component to bottom right corner of screen.
```html
<FloatingButtons main-style="position: absolute; right: 20px; bottom: 20px;" direction="up" :buttons="buttons" />
```

### mainButtonStyle
This is a convenience prop to adjust the main button wrapper div style.

**Example**:
Change main button cursor to progress.
```html
<FloatingButtons main-button-style="cursor: progress;" :buttons="buttons" />
```

### optionsStyle
This is a convenience prop to adjust the option buttons wrapper div style.

**Example**:
Change all option buttons cursor to progress.
```html
<FloatingButtons options-style="cursor: progress;" :buttons="buttons" />
```

### direction
This prop is used to set the direction where it will pop out options to. Adjust it based on the positioning of your component.

Valid values: "down" (default), "up", "left", "right".

**Example**:
Set option buttons to pop from left to right.
```html
<FloatingButtons direction="right" :buttons="buttons" />
```

### buttons
This prop is used to configure all buttons. It is an array that should have a minimum length of 2 (main button and one option).

**Example**:
```html
[
    {
        html: '<i class="fas fa-bars" />'
    },
    {
        html: '<i class="fas fa-compass" />',
        click: () => alert('hello')
    }
]
```

### expanded
This prop is used set the options expanded from mount.

**Example**:
```html
<FloatingButtons expanded :buttons="buttons" />
```

# Installation and use
Install using npm:
```
npm install vue-floating-buttons
```

**Script**
```javascript
import Vue from 'vue'
import FloatingButtons from 'vue-floating-buttons'
Vue.component('FloatingButtons', FloatingButtons)
```

**Template**
```html
<FloatingButtons :buttons="buttons" />
```

# LICENSE
MIT