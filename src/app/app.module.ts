import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NZ_ICONS, NzIconModule, NzInputModule, NzTreeModule } from 'ng-zorro-antd';
import { MinusSquareOutline, PlusSquareOutline } from '@ant-design/icons-angular/icons';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzIconModule,
    NzInputModule,
    NzTreeModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {provide: NZ_ICONS, useValue: [MinusSquareOutline, PlusSquareOutline]}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
