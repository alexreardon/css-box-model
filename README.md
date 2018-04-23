# CSS box model 📦

> Get the [CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model) from a [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

The goal of this library is to make understanding the box model simple from within JavaScript

## Installation

```bash
yarn add css-box-model
```

## Usage

```js
// @flow
import { getBox } from 'css-box-model';

const el: HTMLElement = document.getElementById('foo');
const box: BoxModel = getBox(el);

// profit
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

export type Position = {|
  x: number,
  y: number,
|};

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
```

## API

### `getBox`

> (el: HTMLElement) => BoxModel

Use `getBox` to return the box model for an element

### `withScroll`

> `(original: BoxModel, scroll: Position) => BoxModel`

This is useful if you want to know the box model for an element relative to a page

```js
const el: HTMLElement = document.getElementById('app');
const box: BoxModel = getBox(el);
const scroll: Position = {
  x: window.pageXOffset,
  y: window.pageYOffset,
};
const withScroll: BoxModel = withScroll(box, scroll);
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
