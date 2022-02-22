import { type } from "os";

const cwebpLocation = {
  'Linux': '',
  'Darwin': '',
  'Windows_NT': '.\\bin\\cwebp.exe',
}
const platform = type();

export const cwebp = cwebpLocation[platform];
