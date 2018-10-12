// @flow
import { expand, type Spacing } from '../src';

it('should expand a spacing', () => {
  const original: Spacing = {
    top: 10,
    left: 11,
    right: 21,
    bottom: 22,
  };

  const expandBy: Spacing = {
    top: 1,
    left: 2,
    right: 3,
    bottom: 4,
  };

  const smaller: Spacing = expand(original, expandBy);

  const expected: Spacing = {
    // pulled back
    top: 9,
    left: 9,
    // pushed forward
    right: 24,
    bottom: 26,
  };
  expect(smaller).toEqual(expected);
});
