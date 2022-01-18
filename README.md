# Grid Guideline usage

## Attributes list

```
opacity: number
margin: Any css size unit
gutters: Any css size unit
disabled: boolean
color: Any css color value
```

### Markup mode

You can use the custom element by using import the main.js file in your `<head>`<br>
The attribute `type` should be `module`

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="module"
      src="./node_modules/layout-grid-overlay/dist/main.js"
    ></script>
  </head>
  <body>
    <grid-overlay></grid-overlay> --> Yay 🎉
  </body>
</html>
```

The custom attribute list above contains all attributes that can be passed to the overlay

```html
<grid-overlay color="red"></grid-overlay> --> I'm a red grid now! ⭕⭕⭕⭕
```

### Scripting mode

```ts
import { overlay } from "shadow-overlay";
overlay.enable();
```
