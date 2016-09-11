import { Component } from '@angular/core';
import { TitleComponent } from './title.component'
import { LocationGrid } from './location-grid.component'

@Component({
  selector: 'my-app',
  template: '<top-header></top-header> <location-grid></location-grid>',
  directives: [TitleComponent, LocationGrid]
})

export class AppComponent { }
