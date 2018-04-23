// @flow
import {
  getBox,
  getRect,
  calculateBox,
  type Rect,
  type Spacing,
  type BoxModel,
} from '../src';
import mock from './mock';

const {
  top,
  right,
  bottom,
  left,
  borderBox,
  box,
  border,
  margin,
  padding,
} = mock;

it('should return a margin box', () => {
  // border box expanded by the margin
  const marginBox: Rect = getRect({
    // pulling back to increase size
    top: borderBox.top - margin.top,
    left: borderBox.left - margin.left,
    // pushing forward to increase size
    right: borderBox.right + margin.right,
    bottom: borderBox.bottom + margin.bottom,
  });

  expect(box.marginBox).toEqual(marginBox);
});

it('should return a border box', () => {
  expect(box.borderBox).toEqual(borderBox);
});

it('should return a padding box', () => {
  // border box compressed by the borders
  const paddingBox: Rect = getRect({
    // pushing forward back to decrease size
    top: borderBox.top + border.top,
    left: borderBox.left + border.left,
    // pulling backwards to decrease size
    right: borderBox.right - border.right,
    bottom: borderBox.bottom - border.bottom,
  });

  expect(box.paddingBox).toEqual(paddingBox);
});

it('should return a content box', () => {
  // padding box compressed by the padding
  const contentBox: Rect = getRect({
    // pushing forward back to decrease size
    top: box.paddingBox.top + padding.top,
    left: box.paddingBox.left + padding.left,
    // pulling backwards to decrease size
    right: box.paddingBox.right - padding.right,
    bottom: box.paddingBox.bottom - padding.bottom,
  });

  expect(contentBox).toEqual(box.contentBox);
});

it('should return the border, padding and margin', () => {
  expect(box.margin).toEqual(margin);
  expect(box.padding).toEqual(padding);
  expect(box.border).toEqual(border);
});
