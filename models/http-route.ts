export default class HttpRoute {
  constructor(private serviceName: string, private endpoint: string) {}

  getFinal(): string {
    return '/api/' + this.serviceName + '/' + this.endpoint;
  }
}
