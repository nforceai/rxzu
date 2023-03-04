/**
 * Utility pathing and routing service
 */
import { Coords } from '../interfaces/coords.interface';

export enum LOG_LEVEL {
  'LOG',
  'ERROR',
}

// @internal
export let __DEV__ = true;
// @internal
export let __LOG__: LOG_LEVEL = LOG_LEVEL.ERROR;

export function enableDiagramProdMode(): void {
  __DEV__ = false;
}

// @internal
export function setLogLevel(level: LOG_LEVEL): void {
  __LOG__ = level;
}

// @internal
export function isDev(): boolean {
  return __DEV__;
}

// @internal
export function log(
  message: string,
  level: LOG_LEVEL = LOG_LEVEL.LOG,
  ...args: any[]
): void {
  if (isDev() && __LOG__ === level) {
    if (__LOG__ === LOG_LEVEL.ERROR) {
      console.error(message, ...args);
    }
    console.log(message, ...args);
  }
}

export type ID = string;

/**
 * Generates a unique ID
 */
export function UID(): ID {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function isString(val: any): val is string {
  return typeof val === 'string';
}

// @internal
export function isNil(v: any): v is null | undefined {
  return v === null || v === undefined;
}

export function coerceArray<T>(value: T | T[]): T[] {
  if (isNil(value)) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}

export function unique<T>(arr: T[]): T[] {
  return [...new Set<T>(arr)];
}

export function generateLinePath(firstPoint: any, lastPoint: any): string {
  return `M${firstPoint.x$},${firstPoint.y} L ${lastPoint.x$},${lastPoint.y}`;
}

export function generateCurvePath(
  firstPoint: Coords,
  lastPoint: Coords,
  curvy = 0
): string {
  const isHorizontal =
    Math.abs(firstPoint.x - lastPoint.x) > Math.abs(firstPoint.y - lastPoint.y);
  const curvyX = isHorizontal ? curvy : 0;
  const curvyY = isHorizontal ? 0 : curvy;

  return `M${firstPoint.x},${firstPoint.y} C ${firstPoint.x + curvyX},${
    firstPoint.y + curvyY
  }
    ${lastPoint.x - curvyX},${lastPoint.y - curvyY} ${lastPoint.x},${
    lastPoint.y
  }`;
}
