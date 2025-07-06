import { Component, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface InputFieldConfig {
  label: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'textarea';
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  errorMessage?: string;
  helpText?: string;
  icon?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
}

@Component({
  selector: 'app-input-field',
  standalone: true,
  imports: [CommonModule, FormsModule, MatIconModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true
    }
  ],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input() config!: InputFieldConfig;
  @Input() value: string = '';
  @Input() error: string = '';
  @Output() valueChange = new EventEmitter<string>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  isFocused = false;
  isTouched = false;

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.config.disabled = isDisabled;
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onFocus() {
    this.isFocused = true;
    this.focus.emit();
  }

  onBlur() {
    this.isFocused = false;
    this.isTouched = true;
    this.onTouched();
    this.blur.emit();
  }

  get inputClasses(): string {
    const baseClasses = 'w-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent';
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base'
    };
    const variantClasses = {
      outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400',
      filled: 'border border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
    };

    const size = this.config.size || 'md';
    const variant = this.config.variant || 'outline';
    const errorClass = this.error ? 'border-red-500 dark:border-red-400' : '';
    const disabledClass = this.config.disabled ? 'opacity-50 cursor-not-allowed' : '';

    return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${errorClass} ${disabledClass}`;
  }

  get containerClasses(): string {
    return this.config.disabled ? 'opacity-50' : '';
  }

  get hasError(): boolean {
    return !!this.error;
  }

  get isRequired(): boolean {
    return this.config.required || false;
  }
} 