export class LoggingService {
  logStatusChange(status: string) {
    console.log('New server created with status: ', status);
  }
}