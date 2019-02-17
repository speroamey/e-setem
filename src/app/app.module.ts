import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonpModule, Jsonp,Http, HttpModule, BrowserXhr } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';


import { AuthGuard, CustExtBrowserXhr } from './shared';
import {AuthService,AUTH_PROVIDERS,LoggedInGuard} from './shared'
import { AppService} from './app.service';



// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    // for development
    // return new TranslateHttpLoader(http, '/start-angular/SB-Admin-BS4-Angular-4/master/dist/assets/i18n/', '.json');
    return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}
@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        CommonModule,
        ToastrModule.forRoot(),
        JsonpModule,
        AppRoutingModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
            }
        })
    ],
    providers: [
      AppService,
      AuthService,
      AUTH_PROVIDERS,
      LoggedInGuard,
      { provide: LocationStrategy, useClass: HashLocationStrategy }
    //   { provide: BrowserXhr,useClass:CustExtBrowserXhr}
],
    bootstrap: [AppComponent]
})
export class AppModule {
}
