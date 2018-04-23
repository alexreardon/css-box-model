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
  // content + padding + border + margin
  marginBox: DOMRect,
  // content + padding + border
  borderBox: DOMRect,
  // content + padding
  paddingBox: DOMRect,
  // content
  contentBox: DOMRect,
  // for your own consumption
  border: Spacing,
  padding: Spacing,
  margin: Spacing,
|};

export type AnyRectType = ClientRect | DOMRect;

export type Spacing = {
  top: number,
  right: number,
  bottom: number,
  left: number,
};

const getRect = ({ top, right, bottom, left }: Spacing): DOMRect => {
  const width: number = right - left;
  const height: number = bottom - top;

  // TODO: IE and edge do not support DOMRect (they support the non-standard ClientRect)
  if (typeof DOMRect !== 'undefined') {
    return new DOMRect(top, left, width, height);
  }

  const fake: DOMRect = {
    top,
    right,
    bottom,
    left,
    width,
    height,
    x: top,
    y: left,
  };

  return fake;
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

const parse = (value: string): number => parseInt(value, 10);

// export const getCenter = (rect: AnyRectType): Position => {};

// export const withScroll = (
//   rect: AnyRectType,
//   scroll?: Position = getWindowScroll(),
// ): DOMRect => {};

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

  const borderBox: DOMRect = getRect(rect);
  const marginBox: DOMRect = getRect(expand(borderBox, margin));
  const paddingBox: DOMRect = getRect(shrink(borderBox, border));
  const contentBox: DOMRect = getRect(shrink(paddingBox, padding));

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

export default (el: Element): BoxModel => {
  // getBoundingClientRect always returns the borderBox
  const rect: ClientRect = el.getBoundingClientRect();
  const styles: Object = window.getComputedStyle(el);

  return calculateBox(rect, styles);
};
