import { ImageAttributes } from '@interface/image-attributes.interface';
import { ResponseDataParent } from '@interface/response-data-parent.interface';
import { ResponseData } from '@interface/response-data.interface';
import { ArtistAttributes } from './artist.model';
import { TypeAttributes } from './type.model';
import { TagAttributes } from './tag.model';

export class Design {
  id?: number;
  attributes?: DesignAttributes;
}

class DesignAttributes {
  name?: string;
  slug?: string;
  price?: number;
  popularity?: number;
  image?: ResponseDataParent<ResponseData<ImageAttributes>>;
  artists?: ResponseDataParent<ResponseData<ArtistAttributes>>;
  type?: ResponseDataParent<ResponseData<TypeAttributes>>;
  tags?: ResponseDataParent<ResponseData<TagAttributes>>;
}
