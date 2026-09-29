import { InjectionToken } from '@angular/core';

export interface AppConfig {
  applicationName: string;
  apiBaseUrl: string;
  enableArchitectureDemo: boolean;
}

export interface AppLogger {
  log(message: string, details?: unknown): void;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');
export const API_BASE_URL = new InjectionToken<string>('api.base-url');
export const APP_LOGGER = new InjectionToken<AppLogger>('app.logger');
