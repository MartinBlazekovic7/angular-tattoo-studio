import { EXT } from '@enum/ext.enum';
import { MIME } from '@enum/mime.enum';
import { ImageFormats } from '@interface/image-formats.interface';

export interface ImageAttributes {
  name?: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: ImageFormats;
  hash?: string;
  ext?: EXT;
  mime?: MIME;
  size?: number;
  url?: string;
  previewUrl?: null;
  provider?: string;
  provider_metadata?: null;
  createdAt?: Date;
  updatedAt?: Date;
}
