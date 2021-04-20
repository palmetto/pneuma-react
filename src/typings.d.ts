declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
  }

  declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
  }

  declare module '@palmetto/palmetto-design-tokens/build/js/variables-size';
declare module '@palmetto/palmetto-design-tokens/build/js/variables-color';
declare module '@palmetto/palmetto-design-tokens/build/types/';
declare module '@palmetto/palmetto-design-tokens/build/icons/react';
declare module '@palmetto/palmetto-design-tokens/build/icons';