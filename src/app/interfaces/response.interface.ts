import { ResponseData } from '@interface/response-data.interface';
import { ResponseMeta } from '@interface/response-meta.interface';

export interface Response<T> {
  data: ResponseData<T> | ResponseData<T>[];
  meta: ResponseMeta;
}
