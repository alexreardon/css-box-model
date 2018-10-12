// @flow
import { shrink, type Spacing } from '../src';

it('should shrink a spacing', () => {
  const original: Spacing = {
    top: 10,
    left: 10,
    right: 20,
    bottom: 20,
  };

  const shrinkBy: Spacing = {
    top: 2,
    left: 2,
    right: 2,
    bottom: 2,
  };

  const smaller: Spacing = shrink(original, shrinkBy);

  const expected: Spacing = {
    // pushed forward
    top: 12,
    left: 12,
    // pulled back
    bottom: 18,
    right: 18,
  };
  expect(smaller).toEqual(expected);
});
