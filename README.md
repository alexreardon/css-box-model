# CSS box model 📦

> Get detailed [CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model) information about a [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

This library is useful for when you need to obtain detailed positioning information about an element. Any time you are using [`Element.getBoundingClientRect()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) you might want to consider using `css-box-model` instead to get more detailed information.

## Usage

```js
// @flow
import { getBox } from 'css-box-model';

const el: HTMLElement = document.getElementById('foo');
const box: BoxModel = getBox(el);

// profit
```

## Installation

```bash
yarn add css-box-model
```

## The [CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

| Box type    | Composition                         |
| ----------- | ----------------------------------- |
| Margin box  | margin + border + padding + content |
| Border box  | border + padding + content          |
| Padding box | padding + content                   |
| Content box | content                             |

```
------------------------------------
|              MARGIN              |  (marginBox)
|  ------------------------------  |
|  |           BORDER           |  |  (borderBox)
|  |  ------------------------  |  |
|  |  |       PADDING        |  |  |  (paddingBox)
|  |  |  ------------------  |  |  |
|  |  |  |    CONTENT     |  |  |  |  (contentBox)
|  |  |  |                |  |  |  |
|  |  |  |                |  |  |  |
|  |  |  |                |  |  |  |
|  |  |  ------------------  |  |  |
|  |  |                      |  |  |
|  |  ------------------------  |  |
|  |                            |  |
|  ------------------------------  |
|                                  |
| ---------------------------------|
```

This our returned `BoxModel`:

```js
export type BoxModel = {|
  // content + padding + border + margin
  marginBox: Rect,
  // content + padding + border
  borderBox: Rect,
  // content + padding
  paddingBox: Rect,
  // content
  contentBox: Rect,
  // for your own consumption
  border: Spacing,
  padding: Spacing,
  margin: Spacing,
|};

// Supporting types

// This is an extension of DOMRect and ClientRect
export type Rect = {|
  // ClientRect
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
  // DOMRect
  x: number,
  y: number,
  // Rect
  center: Position,
|};

export type Position = {|
  x: number,
  y: number,
|};

export type Spacing = {
  top: number,
  right: number,
  bottom: number,
  left: number,
};
```

## API

### `getBox`

> (el: HTMLElement) => BoxModel

Use `getBox` to return the box model for an element

### `withScroll`

> `(original: BoxModel, scroll?: Position = getWindowScroll()) => BoxModel`

This is useful if you want to know the box model for an element relative to a page

```js
const el: HTMLElement = document.getElementById('app');
const box: BoxModel = getBox(el);
const withScroll: BoxModel = withScroll(box);
```

You are welcome to pass in your own `scroll`. By default we we use the window scroll:

```js
const getWindowScroll = (): Position => ({
  x: window.pageXOffset,
  y: window.pageYOffset,
});
```

### `calculateBox`

> `(borderBox: AnyRectType, styles: CSSStyleDeclaration) => BoxModel`

This will do the box model calculations without needing to read from the DOM. This is useful if you have already got a `ClientRect` and `CSSStyleDeclaration` as we do not need to recompute it.

```js
const el: HTMLElement = document.getElementById('app');
const borderBox: ClientRect = el.getBoundingClientRect();
const styles: CSSStyleDeclaration = window.getComputedStyles(el);

const box: BoxModel = calculateBox(borderBox, styles);
```

**`AnyRectType`** allows for simple interoperability with any rect type

```js
type AnyRectType = ClientRect | DOMRect | Rect | Spacing;
```

### `createBox`

> `({ borderBox, margin, border, padding }: CreateBoxArgs) => BoxModel`

Allows you to create a `BoxModel` by passing in a `Rect` like shape and optionally your own `margin`, `border` and or `padding`.

```js
type CreateBoxArgs = {|
  borderBox: AnyRectType,
  margin?: Spacing,
  border?: Spacing,
  padding?: Spacing,
|};
```

```js
const borderBox: Spacing = {
  top: 10,
  right: 100,
  left: 20,
  bottom: 80,
};
const padding: Spacing = {
  top: 10,
  right: 20,
  left: 20,
  bottom: 10,
};

const box: BoxModel = createBox({ borderBox, padding });
```

### `getRect`

> `(spacing: AnyRectType) => Rect`

Given any `Rect` like shape, return a `Rect`

```js
const spacing: Spacing = {
  top: 0,
  right: 100,
  bottom: 50,
  left: 50,
};

const rect: Rect = getRect(spacing);

console.log(rect);

/*
{
  top: 0,
  right: 100,
  bottom: 50,
  left: 50,
  width: 100,
  height: 50,
  x: 0,
  y: 0,
  center: { x: 50, y: 50 },
}
*/
```
