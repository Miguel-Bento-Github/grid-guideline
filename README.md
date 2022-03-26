# Shadow Overlay

Layout gives more meaning to design which makes it look more appealing, it'll help you maintain a balance between screens.

![shadow](./shadow.png)

GZipped: 1.6Kb <br>
ES Module `module.js` 5.99KB <br>
CommonJS `index.js` 6.63KB <br>

<br><br>

<hr>
<br><br>

## Installation

`npm i -D shadow-overlay`<br>

`pnpm i -D shadow-overlay`<br>

`yarn add -D shadow-overlay`

<br><br>

<hr>
<br><br>

### Most basic usage

```ts
// index.ts
import "shadow-overlay";
```

## Markup mode

### Element Attributes list

| attribute  | type                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| opacity    | `number`                                                                |
| color      | Any css valid `color` unit                                              |
| margin     | Any css `size` unit                                                     |
| gutters    | Any css `size` unit                                                     |
| width      | Any css `size` unit                                                     |
| disabled   | https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled   |
| controller | Similar to disabled, `controller='true'` or just `controller` will work |

### HTML example

You can use the custom element by using import the main.js file in your `<head>`<br>
The attribute `type` should be `module`

```html
<!DOCTYPE html>
<html>
  <head>
    <script
      type="module"
      src="./node_modules/shadow-overlay/dist/module.js"
    ></script>
  </head>
  <body>
    <grid-overlay /> --> custom element 🎉
  </body>
</html>
```

The custom attribute list above contains all attributes that can be passed to the overlay

```html
<grid-overlay color="red" /> --> I'm a red grid now! ⭕⭕⭕⭕
```

<br><br>

<hr>
<br><br>

## Scripting mode

### Methods

| attribute     | type                     |
| ------------- | ------------------------ |
| start         | `undefined`              |
| setOpacity    | `number` between 0 and 1 |
| setColor      | any css `color`          |
| setMargin     | Any css `size` unit      |
| setGutters    | Any css `size` unit      |
| setWidth      | Any css `size` unit      |
| setController | `boolean`                |

### Basic usage

Import the overlay and start the instance

```ts
import { overlay } from "shadow-overlay";
overlay.start();
```

### Methods usage

#### Start

```ts
overlay.start();
```

#### Opacity

```ts
overlay.setOpacity(0.4);
```

#### Color

```ts
overlay.setColor("red");
overlay.setColor("ff0000");
overlay.setColor("hsl(0, 100%, 50%)");
overlay.setColor("rgb(255, 0, 0)");
```

#### Margin, Gutters

```ts
overlay.setMargin("16px");
overlay.setMargin("1em");
overlay.setMargin("1rem");
overlay.setMargin("5ch");
overlay.setMargin("5%");
```

#### Width

be careful not to use values that are too small or you risk not being able to see the grid

```ts
overlay.setWidth("920px");
overlay.setWidth("50rem");
overlay.setWidth("90ch");
overlay.setWidth("90%");
```

#### Controller

```ts
overlay.setController(true);
```
