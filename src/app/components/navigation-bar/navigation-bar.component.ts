import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
})
export class NavigationBarComponent {
  showMenu: boolean = false;
  toggleMenu() {
    this.showMenu = !this.showMenu;
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    let navbar = document.querySelector('.navigation-bar') as HTMLElement;
    let navbarMobile = document.querySelector('.navbarMobile') as HTMLElement;
    if (window.scrollY > navbar.clientHeight) {
      navbar.classList.add('navbar-inverse');
    } else {
      navbar.classList.remove('navbar-inverse');
    }
    if (window.scrollY > navbarMobile.clientHeight) {
      navbarMobile.classList.add('navbar-inverse');
    } else {
      navbarMobile.classList.remove('navbar-inverse');
    }
  }
}
