import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-primary-btn',
  templateUrl: './primary-btn.component.html',
  styleUrls: ['./primary-btn.component.scss']
})
export class PrimaryBtnComponent {
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' = 'button';
} 