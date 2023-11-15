import { Auth } from '@angular/fire/auth';

export interface AuthInterface extends Auth {
  authStateReady(): Promise<void>;
}
