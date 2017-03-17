import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ComputerService } from './computer.service';
import { WakeService } from './wake.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { PingComponent } from './ping/ping.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [
    ComputerService,
    WakeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
