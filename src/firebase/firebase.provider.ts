import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { cert, initializeApp } from 'firebase-admin/app';

export const FIREBASE_APP = 'FIREBASE_APP';

export const firebaseProvider: Provider = {
  provide: FIREBASE_APP,
  useFactory: (config: ConfigService) => {
    const firebaseConfig = {
      projectId: config.get<string>('FIREBASE_PROJECT_ID'),
      clientEmail: config.get<string>('FIREBASE_CLIENT_EMAIL'),
      privateKey: config
        .get<string>('FIREBASE_PRIVATE_KEY')
        ?.replace(/\\n/g, '\n'),
    };

    return initializeApp({
      credential: cert(firebaseConfig),
    });
  },
  inject: [ConfigService],
};
