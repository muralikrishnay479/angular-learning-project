import { ApplicationConfig, inject, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { API_BASE_URL, APP_CONFIG, APP_LOGGER } from './app-tokens';
import { ConsoleAppLogger } from './console-app-logger';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: APP_CONFIG,
      useValue: {
        applicationName: 'Angular LMS',
        apiBaseUrl: 'https://dummyjson.com',
        enableArchitectureDemo: true
      }
    },
    {
      provide: API_BASE_URL,
      useFactory: () => inject(APP_CONFIG).apiBaseUrl
    },
    {
      provide: APP_LOGGER,
      useClass: ConsoleAppLogger
    }
  ]
};
