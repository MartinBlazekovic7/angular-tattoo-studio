import { ImageAttributes } from '@interface/image-attributes.interface';
import { ResponseDataParent } from '@interface/response-data-parent.interface';
import { ResponseData } from '@interface/response-data.interface';

export class Artist {
  id?: number;
  attributes?: ArtistAttributes;
}

export class ArtistAttributes {
  name?: string;
  image?: ResponseDataParent<ResponseData<ImageAttributes>>;
  description?: string;
}
