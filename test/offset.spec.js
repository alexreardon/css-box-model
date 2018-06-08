// @flow
import {
  offset,
  calculateBox,
  getRect,
  type Rect,
  type Position,
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

it('should adjust for forward scroll by the desired amount', () => {
  const scroll: Position = { x: 5, y: 4 };
  const expectedBorderBox: Rect = getRect({
    top: borderBox.top + scroll.y,
    right: borderBox.right + scroll.x,
    bottom: borderBox.bottom + scroll.y,
    left: borderBox.left + scroll.x,
  });

  const adjusted: BoxModel = offset(box, scroll);

  expect(adjusted.borderBox).toEqual(expectedBorderBox);
});

it('should adjust for backward scroll by the desired amount', () => {
  const scroll: Position = { x: -5, y: -4 };
  const expectedBorderBox: Rect = getRect({
    top: borderBox.top + scroll.y,
    right: borderBox.right + scroll.x,
    bottom: borderBox.bottom + scroll.y,
    left: borderBox.left + scroll.x,
  });

  const adjusted: BoxModel = offset(box, scroll);

  expect(adjusted.borderBox).toEqual(expectedBorderBox);
});
