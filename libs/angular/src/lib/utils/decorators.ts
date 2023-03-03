import { NgZone } from '@angular/core';

export interface ZonedClass {
  ngZone: NgZone;
}

export function OutsideZone<T extends ZonedClass>(
  targetClass: T,
  functionName: string,
  descriptor: any
) {
  const source = descriptor.value;
  descriptor.value = function (...data: any[]) {
    if (window && (window as any)['Zone']) {
      if (!this.ngZone) {
        throw new Error(
          "Class with 'OutsideZone' decorator should have 'ngZone' class property with 'NgZone' class."
        );
      }
      return this.ngZone.runOutsideAngular(() => source.call(this, ...data));
    }

    return source.call(this, ...data);
  };
  return descriptor;
}
