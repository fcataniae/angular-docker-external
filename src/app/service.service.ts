import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { ConfigurationService } from './configuration.service';


@Injectable({providedIn: 'root'})
export class Service {

  private configuration: any;

  constructor(private http: HttpClient, private configService: ConfigurationService) {
    configService.loadConfigurations().subscribe( config => { console.log(config);this.configuration = config;});
  }


  public getEndpoint(): Observable<any>{
    return this.http.get<any>(this.configuration.configuration_url);
  }

}
