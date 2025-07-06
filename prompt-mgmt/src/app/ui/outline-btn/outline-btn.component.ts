import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-outline-btn',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './outline-btn.component.html',
  styleUrls: ['./outline-btn.component.scss']
})
export class OutlineBtnComponent {
  @Input() disabled = false;
  @Input() icon?: string;
  @Input() type: 'button' | 'submit' = 'button';
} 