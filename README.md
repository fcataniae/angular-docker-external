# Externalizar configuaraciones de angular en un proyecto para CI/CD

Agregar service que contenga lo siguiente

* Ruta a assets/config que es donde mapeamos la configuracion cuando levantamos el docker
* Interface que representa el json de configuracion
* Metodo de inicializacion de la configuracion

```javascript
interface Configuration {
  configuration_url: string;
}
@Injectable({providedIn: 'root'})
export class ConfigurationService{

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
}
```

En el app module agregar el siguiente provider para cargar la configruracion desde assets al inicio

```javascript
  ...
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigurationService) => () => configService.loadConfigurations().toPromise(),
    deps: [ConfigurationService],
    multi: true
  }],
  ...
```

Luego desde los servicios que tengamos en nuestro front end tomamos la configuracion de la siguiente forma
```javascript
constructor(private http: HttpClient, private configService: ConfigurationService) {
  configService.loadConfigurations().subscribe( config => { console.log(config);this.configuration = config;});
}
```

Luego podemos consumir el endpoint de la siguiente manera


```javascript
public getSomething(): Observable<any>{
  return this.http.get<any>(`${this.configuration.configuration_url}/something`);
}
```

## construir la imagen

**docker build -t nginx-external-confs .**


## levantar docker mapeando nuevas configuraciones


**docker run -v path-to-external:/usr/share/nginx/html/assets/config -p 8343:80 --name angular-app nginx-external-confs**
