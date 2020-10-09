import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';

// This component receives the hero object through its 'hero' property and displays it 

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // Input property => input allows data to flow from parent to child component 
  // This hero receives its value from Heroes Component (parent): the value being selectedHero's value
  @Input() hero: Hero

  constructor() { }

  ngOnInit(): void {
  }

}
