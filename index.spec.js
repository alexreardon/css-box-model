// @flow

const withBoxSizing = (boxSizing = 'border-box' | 'content-box'): Element => {
  const el: Element = document.createElement('div');

  Object.assign(el.style, {
    boxSizing,
    width: `${width}px`,
    height: `${height}px`,
    paddingTop: `${padding.top}`,
    paddingLeft: `${padding.left}`,
    paddingRight: `${padding.right}`,
    paddingBottom: `${padding.bottom}`,
    marginTop: `${margin.top}`,
    marginLeft: `${margin.left}`,
    marginRight: `${margin.right}`,
    marginBottom: `${margin.bottom}`,
    borderTopWidth: `${border.top}`,
    borderLeftWidth: `${border.left}`,
    borderRightWidth: `${border.right}`,
    borderBottomWidth: `${border.bottom}`,
  });

  return el;
}

const withBorderBox: Element = withBoxSizing('border-box');
const withContentBox: Element = withBoxSizing('content-box');


it('should return the border box of the element', () => {

});

describe('marginBox', () => {

});

describe('paddingBox', () => {

});

describe('contentBox', () => {

});