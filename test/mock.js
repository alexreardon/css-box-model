// @flow
import {
  getRect,
  calculateBox,
  type Rect,
  type BoxModel,
  type Spacing,
} from '../src';
const top: number = 20;
const right: number = 30;
const bottom: number = 40;
const left: number = 10;
const padding: Spacing = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
};
const margin: Spacing = {
  top: 5,
  right: 6,
  bottom: 7,
  left: 8,
};
const border: Spacing = {
  top: 9,
  right: 10,
  bottom: 11,
  left: 12,
};

const styles: Object = {
  paddingTop: `${padding.top}px`,
  paddingRight: `${padding.right}px`,
  paddingBottom: `${padding.bottom}px`,
  paddingLeft: `${padding.left}px`,
  marginTop: `${margin.top}px`,
  marginRight: `${margin.right}px`,
  marginBottom: `${margin.bottom}px`,
  marginLeft: `${margin.left}px`,
  borderTopWidth: `${border.top}px`,
  borderRightWidth: `${border.right}px`,
  borderBottomWidth: `${border.bottom}px`,
  borderLeftWidth: `${border.left}px`,
};

const borderBox: Rect = getRect({ top, right, bottom, left });
const box: BoxModel = calculateBox(borderBox, styles);

export default {
  top,
  right,
  bottom,
  left,
  borderBox,
  box,
  border,
  margin,
  padding,
};
