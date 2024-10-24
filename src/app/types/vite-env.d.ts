/// <reference types="vite-plugin-svgr/client" />

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}
