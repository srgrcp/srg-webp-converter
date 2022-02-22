import { WebpConverter } from "../lib/webp-converter";

export declare global {
  interface Window {
    webpConverter: WebpConverter;
  }
}
