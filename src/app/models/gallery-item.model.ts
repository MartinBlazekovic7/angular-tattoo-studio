import { ImageAttributes } from '@interface/image-attributes.interface';
import { ResponseDataParent } from '@interface/response-data-parent.interface';
import { ResponseData } from '@interface/response-data.interface';
import { Artist, ArtistAttributes } from './artist.model';

export class GalleryItem {
  id?: number;
  attributes?: GalleryItemAttributes;
}

class GalleryItemAttributes {
  tattooTitle?: string;
  tattooImage?: ResponseDataParent<ResponseData<ImageAttributes>>;
  tattooDescription?: string;
  customer?: string;
  artist?: ResponseDataParent<ResponseData<ArtistAttributes>>;
}
