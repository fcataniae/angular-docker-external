import { Component } from '@angular/core';
import { Service } from './service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-docker-test';
  config: Observable<any>;
  constructor(private service: Service){
    this.getConfigs();
  }

  getConfigs(){
    this.config = this.service.getEndpoint();
  }
}
