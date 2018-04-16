// @flow

// # The CSS box model
// > https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model
//
// ------------------------------------
// |              MARGIN              |  (marginBox)
// |  ------------------------------  |
// |  |           BORDER           |  |  (borderBox)
// |  |  ------------------------  |  |
// |  |  |       PADDING        |  |  |  (paddingBox) - not used by anything really
// |  |  |  ------------------  |  |  |
// |  |  |  |    CONTENT     |  |  |  |  (contentBox)
// |  |  |  |                |  |  |  |
// |  |  |  |                |  |  |  |
// |  |  |  |                |  |  |  |
// |  |  |  ------------------  |  |  |
// |  |  |                      |  |  |
// |  |  ------------------------  |  |
// |  |                            |  |
// |  ------------------------------  |
// |                                  |
// | ----------------------------------|

export type BoxModel = {|
  // the borderBox with margin added (outer)
  marginBox: Area,
  // the element inclusive of padding and border
  borderBox: Area,
  // the element without margin or padding or border (inner)
  contentBox: Area,
|}

type Spacing = {
  top: number,
  right: number,
  bottom: number,
  left: number,
}

export type Position = {|
  x: number,
  y: number,
|}

export type Area = {|
  ...Spacing,
  width: number,
  height: number,
  center: Position,
|}

const getArea ({ top, right, bottom, left }: Spacing): Area => ({
  top,
  right,
  bottom,
  left,
  width: (right - left),
  height: (bottom - top),
  center: {
    x: (right + left) / 2,
    y: (bottom + top) / 2,
  },
});

const expand = (target: Spacing, expandBy: Spacing): Spacing => ({
  // pulling back to increase size
  top: target.top - expandBy.top,
  left: target.left - expandBy.left,
  // pushing forward to increase size
  bottom: target.bottom + expandBy.bottom,
  right: target.right + expandBy.right,
});

export const shrink = (target: Spacing, shrinkBy: Spacing): Spacing => ({
  // pushing forward to descrease size
  top: target.top + shrinkBy.top,
  left: target.left + shrinkBy.left,
  // pulling backwards to descrease size
  bottom: target.bottom - shrinkBy.bottom,
  right: target.right - shrinkBy.right,
});

export default (el: Element): BoxModel => {
  // getBoundingClientRect always returns the borderBox
  const rect: ClientRect = el.getBoundingClientRect();
  const styles: Object = window.getComputedStyle(el);

  const margin: Spacing = {
    top: parseInt(style.marginTop, 10),
    right: parseInt(style.marginRight, 10),
    bottom: parseInt(style.marginBottom, 10),
    left: parseInt(style.marginLeft, 10),
  };
  const padding: Spacing = {
    top: parseInt(style.paddingTop, 10),
    right: parseInt(style.paddingRight, 10),
    bottom: parseInt(style.paddingBottom, 10),
    left: parseInt(style.paddingLeft, 10),
  };
  const border: Spacing = {
    top: parseInt(style.borderTopWidth, 10),
    right: parseInt(style.borderRightWidth, 10),
    bottom: parseInt(style.borderBottomWidth, 10),
    left: parseInt(style.borderLeftWidth, 10),
  };

  const borderBox: Area = getArea(rect);
  const marginBox: Area = getArea(expand(borderBox, margin));
  const paddingBox: Area = getArea(shrink(borderBox, border));
  const contentBox: Area = getArea(shrink(paddingBox, padding));

  return {
    marginBox,
    borderBox,
    paddingBox,
    contentBox,
  };
}