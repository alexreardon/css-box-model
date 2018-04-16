# Box model 📦

> Get the [CSS box model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model) from a [`HTMLElement`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement)

## Work in progress ⚠️

## Installation

```bash
yarn add css-box-model
```

## Usage

```js
// @flow
import getBoxModel, { type BoxModel } from 'css-box-model';

const el: HTMLElement = document.getElementById('foo');
const box: BoxModel = getBoxModel(el);

// profit
```
