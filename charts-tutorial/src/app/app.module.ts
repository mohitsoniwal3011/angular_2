import { NgModule } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxChartsModule } from "@swimlane/ngx-charts";
import { BarChartsComponent } from './bar-charts/bar-charts.component';


@NgModule({
  declarations: [
    AppComponent,
    BarChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
