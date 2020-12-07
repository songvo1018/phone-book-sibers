/// <reference types="react-scripts" />
declare module 'is_js';

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames;
  export = classNames;
}