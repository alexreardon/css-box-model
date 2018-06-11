// @flow
import {
  withScroll,
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

it('should use the window scroll if none is provided', () => {
  const scroll: Position = { x: 5, y: 4 };
  window.pageXOffset = scroll.x;
  window.pageYOffset = scroll.y;

  const expectedBorderBox: Rect = getRect({
    top: borderBox.top + scroll.y,
    right: borderBox.right + scroll.x,
    bottom: borderBox.bottom + scroll.y,
    left: borderBox.left + scroll.x,
  });

  const adjusted: BoxModel = withScroll(box);

  expect(adjusted.borderBox).toEqual(expectedBorderBox);

  // cleanup
  window.pageXOffset = 0;
  window.pageYOffset = 0;
});
