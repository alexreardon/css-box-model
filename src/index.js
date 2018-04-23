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

export type Position = {|
  x: number,
  y: number,
|};

export type Rect = {|
  top: number,
  right: number,
  bottom: number,
  left: number,
  width: number,
  height: number,
  x: number,
  y: number,
  center: Position,
|};

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

export type AnyRectType = ClientRect | DOMRect | Rect | Spacing;

export type Spacing = {
  top: number,
  right: number,
  bottom: number,
  left: number,
};

export const getRect = ({ top, right, bottom, left }: Spacing): Rect => {
  const width: number = right - left;
  const height: number = bottom - top;

  const rect: Rect = {
    // ClientRect
    top,
    right,
    bottom,
    left,
    width,
    height,
    // DOMRect
    x: left,
    y: top,
    // Rect
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2,
    },
  };

  return rect;
};

const expand = (target: Spacing, expandBy: Spacing): Spacing => ({
  // pulling back to increase size
  top: target.top - expandBy.top,
  left: target.left - expandBy.left,
  // pushing forward to increase size
  bottom: target.bottom + expandBy.bottom,
  right: target.right + expandBy.right,
});

const shrink = (target: Spacing, shrinkBy: Spacing): Spacing => ({
  // pushing forward to descrease size
  top: target.top + shrinkBy.top,
  left: target.left + shrinkBy.left,
  // pulling backwards to descrease size
  bottom: target.bottom - shrinkBy.bottom,
  right: target.right - shrinkBy.right,
});

const shift = (spacing: Spacing, point: Position): Spacing => ({
  top: spacing.top + point.y,
  left: spacing.left + point.x,
  bottom: spacing.bottom + point.y,
  right: spacing.right + point.x,
});

const createBox = ({ borderBox, margin, border, padding }): BoxModel => {
  // marginBox = borderBox + margin
  const marginBox: Rect = getRect(expand(borderBox, margin));
  // borderBox = borderBox - padding
  const paddingBox: Rect = getRect(shrink(borderBox, border));
  // contentBox = paddingBox - padding
  const contentBox: Rect = getRect(shrink(paddingBox, padding));

  return {
    marginBox,
    borderBox: getRect(borderBox),
    paddingBox,
    contentBox,
    margin,
    border,
    padding,
  };
};

// Computed styles will always be in pixels
// https://codepen.io/alexreardon/pen/OZyqXe
const parse = (value: string): number => parseInt(value, 10);

export const withScroll = (original: BoxModel, scroll: Position): BoxModel => {
  const borderBox: Rect = getRect(shift(original.borderBox, scroll));

  return createBox({
    ...original,
    borderBox,
  });
};

// Exposing this function directly for performance. If you have already computed these things
// then you can simply pass them in
export const calculateBox = (
  borderBox: AnyRectType,
  styles: CSSStyleDeclaration,
): BoxModel => {
  const margin: Spacing = {
    top: parse(styles.marginTop),
    right: parse(styles.marginRight),
    bottom: parse(styles.marginBottom),
    left: parse(styles.marginLeft),
  };
  const padding: Spacing = {
    top: parse(styles.paddingTop),
    right: parse(styles.paddingRight),
    bottom: parse(styles.paddingBottom),
    left: parse(styles.paddingLeft),
  };
  const border: Spacing = {
    top: parse(styles.borderTopWidth),
    right: parse(styles.borderRightWidth),
    bottom: parse(styles.borderBottomWidth),
    left: parse(styles.borderLeftWidth),
  };

  return createBox({
    borderBox,
    margin,
    padding,
    border,
  });
};

export const getBox = (el: Element): BoxModel => {
  // getBoundingClientRect always returns the borderBox
  const borderBox: ClientRect = el.getBoundingClientRect();
  const styles: CSSStyleDeclaration = window.getComputedStyle(el);

  return calculateBox(borderBox, styles);
};
