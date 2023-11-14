import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let navbar = document.querySelector('.navigation-bar') as HTMLElement;
    let header = document.querySelector('.header-image') as HTMLElement;
    if (window.scrollY > header.clientHeight - 100) {
      navbar.classList.add('navbar-inverse');
    } else {
      navbar.classList.remove('navbar-inverse');
    }
  }
}
