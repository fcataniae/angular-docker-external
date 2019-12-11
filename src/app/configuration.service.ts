import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

interface Configuration {
  configuration_url: string;
}

@Injectable({providedIn: 'root'})
export class ConfigurationService {

  private readonly CONFIG_URL = 'assets/config/config.json';
  private configuration$: Observable<Configuration>;

  constructor(private http: HttpClient) {
  }

  public loadConfigurations(): any {
    if (!this.configuration$) {
      this.configuration$ = this.http.get<Configuration>(this.CONFIG_URL).pipe(
        shareReplay(1)
      );
    }
    return this.configuration$;
  }

  //
  // public getEndpoint(): Observable<any>{
  //   return this.http.get<any>(this.configuration$.endpoint_url)
  // }

}
