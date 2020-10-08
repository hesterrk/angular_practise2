import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

// The selector name: the unique name used to identify the app component in the HTML DOM tree once it is rendered into the browser
// selector property of the component is just a string that is used to identify the component or an element in the DOM

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  hero: Hero = {
    id: 1,
    name: 'Windstorm',
  };

  constructor() {}

  ngOnInit(): void {}
}
