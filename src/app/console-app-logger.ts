import { AppLogger } from './app-tokens';

export class ConsoleAppLogger implements AppLogger {
  log(message: string, details?: unknown): void {
    console.log('[Angular LMS] ' + message, details ?? '');
  }
}
