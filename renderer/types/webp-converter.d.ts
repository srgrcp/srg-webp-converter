import { WebpConverter } from "../lib/webp-converter";

declare global {
  interface Window {
    webpConverter: WebpConverter;
  }
}
