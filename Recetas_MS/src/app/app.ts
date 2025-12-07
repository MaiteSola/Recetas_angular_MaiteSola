import { Component } from '@angular/core';
import { Navbar } from './navbar/navbar';
import { Footer } from './footer/footer';
import { CardsContent } from './cards-content/cards-content';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer, CardsContent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})

export class App {
 
}
