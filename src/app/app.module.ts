import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { ConfigurationService } from './configuration.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigurationService) => () => configService.loadConfigurations().toPromise(),
    deps: [ConfigurationService],
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
