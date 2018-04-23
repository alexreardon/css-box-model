// @flow
import { getRect } from '../src';
import type { Rect } from '../src';

const top: number = 20;
const right: number = 30;
const bottom: number = 40;
const left: number = 10;
const rect: Rect = getRect({ top, right, bottom, left });

const width: number = right - left;
const height: number = bottom - top;

it('should return the rect of a spacing', () => {
  const expected: Rect = {
    top,
    left,
    right,
    bottom,
    x: left,
    y: top,
    width,
    height,
    center: {
      x: (right + left) / 2,
      y: (bottom + top) / 2,
    },
  };

  expect(expected).toEqual(rect);
});
