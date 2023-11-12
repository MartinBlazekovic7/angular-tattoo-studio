import { EXT } from '@enum/ext.enum';
import { MIME } from '@enum/mime.enum';

export interface ImageFormat {
  ext?: EXT;
  url?: string;
  hash?: string;
  mime?: MIME;
  name?: string;
  path?: null;
  size?: number;
  width: number;
  height: number;
}
