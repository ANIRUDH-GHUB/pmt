import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputFieldComponent, InputFieldConfig } from '../input-field/input-field.component';
import { SliderInputComponent, SliderInputConfig } from '../slider-input/slider-input.component';
import { TabSectionComponent, TabSection, TabSectionConfig } from '../tab-section/tab-section.component';

@Component({
  selector: 'app-components-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, InputFieldComponent, SliderInputComponent, TabSectionComponent],
  templateUrl: './components-demo.component.html',
  styleUrls: ['./components-demo.component.scss']
})
export class ComponentsDemoComponent {
  // Input Field Examples
  inputFieldConfigs: InputFieldConfig[] = [
    {
      label: 'Prompt Name',
      placeholder: 'Enter prompt name...',
      required: true,
      maxLength: 100,
      helpText: 'Choose a descriptive name for your prompt'
    },
    {
      label: 'Description',
      type: 'textarea',
      placeholder: 'Enter prompt description...',
      maxLength: 500,
      helpText: 'Provide a detailed description of what this prompt does'
    },
    {
      label: 'Email',
      type: 'email',
      placeholder: 'Enter email address...',
      icon: 'email',
      helpText: 'Your email address for notifications'
    }
  ];

  inputValues: { [key: string]: string } = {
    'Prompt Name': '',
    'Description': '',
    'Email': ''
  };

  // Slider Input Examples
  sliderConfigs: SliderInputConfig[] = [
    {
      label: 'Temperature',
      min: 0,
      max: 2,
      step: 0.1,
      unit: '',
      helpText: 'Controls randomness in the output (0 = deterministic, 2 = very random)'
    },
    {
      label: 'Max Tokens',
      min: 1,
      max: 4000,
      step: 1,
      unit: 'tokens',
      helpText: 'Maximum number of tokens to generate'
    },
    {
      label: 'Top P',
      min: 0,
      max: 1,
      step: 0.01,
      unit: '',
      helpText: 'Controls diversity via nucleus sampling'
    }
  ];

  sliderValues: { [key: string]: number } = {
    'Temperature': 0.7,
    'Max Tokens': 1000,
    'Top P': 0.9
  };

  // Tab Section Example
  tabSectionConfig: TabSectionConfig = {
    title: 'Prompt Sections',
    placeholder: 'Add content to this section...',
    allowAdd: true,
    allowRemove: true,
    allowEdit: true,
    maxSections: 10,
    minSections: 1
  };

  sections: TabSection[] = [
    {
      id: 'section_1',
      title: 'System Message',
      content: 'You are a helpful AI assistant that provides accurate and detailed responses.',
      isActive: true
    },
    {
      id: 'section_2',
      title: 'User Context',
      content: 'The user is asking for information about a specific topic.',
      isActive: false
    }
  ];

  activeSectionId: string = 'section_1';

  // Event handlers
  onInputChange(fieldName: string, value: string) {
    this.inputValues[fieldName] = value;
    console.log(`${fieldName} changed to:`, value);
  }

  onSliderChange(fieldName: string, value: number) {
    this.sliderValues[fieldName] = value;
    console.log(`${fieldName} changed to:`, value);
  }

  onSectionsChange(sections: TabSection[]) {
    this.sections = sections;
    console.log('Sections updated:', sections);
  }

  onActiveSectionChange(sectionId: string) {
    this.activeSectionId = sectionId;
    console.log('Active section changed to:', sectionId);
  }

  onSectionAdd(section: TabSection) {
    console.log('Section added:', section);
  }

  onSectionRemove(sectionId: string) {
    console.log('Section removed:', sectionId);
  }

  onSectionUpdate(section: TabSection) {
    console.log('Section updated:', section);
  }
} 