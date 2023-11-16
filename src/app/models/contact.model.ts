import { Design } from './design.model';

export class ContactFormData {
  uid?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  message?: string;
  selectedDesigns?: Design[] = [];
  filePath?: string;
  userId?: string;
}
