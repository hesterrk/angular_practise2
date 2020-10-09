import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from '../mock-heroes';

// The selector name: the unique name used to identify the app component in the HTML DOM tree once it is rendered into the browser
// selector property of the component is just a string that is used to identify the component or an element in the DOM

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  //heroes is our property that holds our mock data
  heroes = HEROES;

  // Selected hero has the type Hero
  selectedHero: Hero;

  constructor() {}

  ngOnInit(): void {}

  // This method assigns the clicked hero from the template to the component's selectedHero
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}
