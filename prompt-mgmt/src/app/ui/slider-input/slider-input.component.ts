import { Component, Input, Output, EventEmitter, forwardRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

export interface SliderInputConfig {
  label: string;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  disabled?: boolean;
  showInput?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outline' | 'filled';
  helpText?: string;
}

@Component({
  selector: 'app-slider-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SliderInputComponent),
      multi: true
    }
  ],
  templateUrl: './slider-input.component.html',
  styleUrls: ['./slider-input.component.scss']
})
export class SliderInputComponent implements ControlValueAccessor, AfterViewInit {
  @Input() config!: SliderInputConfig;
  @Input() value: number = 0;
  @Input() error: string = '';
  @Output() valueChange = new EventEmitter<number>();
  @Output() blur = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();

  @ViewChild('slider', { static: false }) sliderRef!: ElementRef<HTMLInputElement>;

  isFocused = false;
  isTouched = false;
  inputValue: string = '';

  // ControlValueAccessor implementation
  private onChange = (value: number) => {};
  private onTouched = () => {};

  ngOnInit() {
    this.inputValue = this.value.toString();
  }

  ngAfterViewInit() {
    this.updateInitialSliderFill();
  }

  writeValue(value: number): void {
    this.value = value || 0;
    this.inputValue = this.value.toString();
    if (this.sliderRef) {
      this.updateSliderFill(this.sliderRef.nativeElement);
    }
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

  onSliderChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const newValue = parseFloat(target.value);
    this.updateValue(newValue);
    this.updateSliderFill(target);
  }

  onInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const inputValue = target.value;
    const numericValue = parseFloat(inputValue);
    
    if (!isNaN(numericValue)) {
      const clampedValue = Math.max(this.config.min, Math.min(this.config.max, numericValue));
      this.updateValue(clampedValue);
      if (this.sliderRef) {
        this.updateSliderFill(this.sliderRef.nativeElement);
      }
    }
    
    this.inputValue = inputValue;
  }

  onInputBlur() {
    // Ensure the input value matches the actual value
    this.inputValue = this.value.toString();
    this.isFocused = false;
    this.isTouched = true;
    this.onTouched();
    this.blur.emit();
  }

  onInputFocus() {
    this.isFocused = true;
    this.focus.emit();
  }

  private updateValue(newValue: number) {
    this.value = newValue;
    this.inputValue = newValue.toString();
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  private updateSliderFill(sliderElement: HTMLInputElement) {
    const percentage = ((this.value - this.config.min) / (this.config.max - this.config.min)) * 100;
    
    // Create a linear gradient background for the fill effect
    const isDarkMode = document.documentElement.classList.contains('dark');
    const fillColor = isDarkMode ? '#374151' : '#1f2937'; // Button dark color (darker in light mode, lighter in dark mode)
    const trackColor = isDarkMode ? '#4b5563' : '#e5e7eb';
    
    const background = `linear-gradient(to right, ${fillColor} 0%, ${fillColor} ${percentage}%, ${trackColor} ${percentage}%, ${trackColor} 100%)`;
    
    // Apply the background to the slider track
    sliderElement.style.background = background;
  }

  private updateInitialSliderFill() {
    if (this.sliderRef) {
      this.updateSliderFill(this.sliderRef.nativeElement);
    }
  }

  get sliderClasses(): string {
    const baseClasses = 'w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer';
    const disabledClass = this.config.disabled ? 'opacity-50 cursor-not-allowed' : '';
    return `${baseClasses} ${disabledClass}`;
  }

  get inputClasses(): string {
    const baseClasses = 'w-20 text-center transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent';
    const sizeClasses = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-1.5 text-sm',
      lg: 'px-3 py-2 text-base'
    };
    const variantClasses = {
      outline: 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
      filled: 'border border-transparent bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
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

  get percentage(): number {
    return ((this.value - this.config.min) / (this.config.max - this.config.min)) * 100;
  }

  get step(): number {
    return this.config.step || 1;
  }

  get showInput(): boolean {
    return this.config.showInput !== false;
  }
} 