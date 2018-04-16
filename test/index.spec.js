// @flow
import type { Area } from '../src';

const width: number = 100;
const height: number = 200;
const spacing: Object = {
  top: 1,
  right: 2,
  bottom: 3,
  left: 4,
};

const withBoxSizing = (
  boxSizing: 'border-box' | 'content-box',
): HTMLElement => {
  const el: HTMLElement = document.createElement('div');

  Object.assign(el.style, {
    boxSizing,
    width: `${width}px`,
    height: `${height}px`,
    paddingTop: `${spacing.top}`,
    paddingLeft: `${spacing.left}`,
    paddingRight: `${spacing.right}`,
    paddingBottom: `${spacing.bottom}`,
    marginTop: `${spacing.top}`,
    marginLeft: `${spacing.left}`,
    marginRight: `${spacing.right}`,
    marginBottom: `${spacing.bottom}`,
    borderTopWidth: `${spacing.top}`,
    borderLeftWidth: `${spacing.left}`,
    borderRightWidth: `${spacing.right}`,
    borderBottomWidth: `${spacing.bottom}`,
  });

  return el;
};

const withBorderBox: Element = withBoxSizing('border-box');
const withContentBox: Element = withBoxSizing('content-box');

describe('contentBox', () => {});

describe('border box', () => {});

describe('marginBox', () => {});

describe('paddingBox', () => {});
