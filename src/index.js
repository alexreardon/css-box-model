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

export type AnyRectType = ClientRect | DOMRect | Rect;

export type Spacing = {
  top: number,
  right: number,
  bottom: number,
  left: number,
};

const getRect = ({ top, right, bottom, left }: Spacing): Rect => {
  const width: number = right - left;
  const height: number = bottom - top;

  const rect: Rect = {
    top,
    right,
    bottom,
    left,
    width,
    height,
    x: top,
    y: left,
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

export const shift = (spacing: Spacing, point: Position): Spacing => ({
  top: spacing.top + point.y,
  left: spacing.left + point.x,
  bottom: spacing.bottom + point.y,
  right: spacing.right + point.x,
});

const parse = (value: string): number => parseInt(value, 10);

export const withScroll = (box: BoxModel, scroll: Position): BoxModel => {
  const { margin, border, padding } = box;
  const borderBox: Rect = getRect(shift(box.borderBox, scroll));
  const marginBox: Rect = getRect(expand(borderBox, margin));
  const paddingBox: Rect = getRect(shrink(borderBox, border));
  const contentBox: Rect = getRect(shrink(paddingBox, padding));

  return {
    marginBox,
    borderBox,
    paddingBox,
    contentBox,
    border,
    padding,
    margin,
  };
};

// Exposing this function directly for performance. If you have already computed these things
// then you can simply pass them in
export const calculateBox = (
  rect: DOMRect | ClientRect,
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

  const borderBox: Rect = getRect(rect);
  const marginBox: Rect = getRect(expand(borderBox, margin));
  const paddingBox: Rect = getRect(shrink(borderBox, border));
  const contentBox: Rect = getRect(shrink(paddingBox, padding));

  return {
    marginBox,
    borderBox,
    paddingBox,
    contentBox,
    border,
    padding,
    margin,
  };
};

export const getBox = (el: Element): BoxModel => {
  // getBoundingClientRect always returns the borderBox
  const rect: ClientRect = el.getBoundingClientRect();
  const styles: Object = window.getComputedStyle(el);

  return calculateBox(rect, styles);
};
