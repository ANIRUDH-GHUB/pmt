import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { SidenavItemComponent } from '../sidenav-item/sidenav-item.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  @Input() isDarkMode = false;
  @Output() darkModeToggle = new EventEmitter<void>();

  sidenavOpened = true;

  toggleSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }
} 