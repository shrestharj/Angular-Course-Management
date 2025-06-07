import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { CommonModule } from "@angular/common";
@NgModule({
  declarations:[AppComponent],
  imports:[BrowserModule, AppRoutingModule,CommonModule,ReactiveFormsModule
    
  ], bootstrap:[AppComponent]
})
export class AppModule{}