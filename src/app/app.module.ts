import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CommonModule],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
