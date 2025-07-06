import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsCardComponent } from '../ui/metrics-card/metrics-card.component';
import { PrimaryBtnComponent } from '../ui/primary-btn/primary-btn.component';
import { OutlineBtnComponent } from '../ui/outline-btn/outline-btn.component';
import { VariablePanelComponent, PromptVariable } from '../ui/variable-panel/variable-panel.component';
import { ApexAxisChartSeries } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  variablePanelOpened = false;
  
  // Sample metrics data
  metrics = [
    {
      title: 'Total Prompts',
      value: '1,234',
      series: [{
        name: 'Prompts',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 180, 200]
      }] as ApexAxisChartSeries
    },
    {
      title: 'Active Users',
      value: '89',
      series: [{
        name: 'Users',
        data: [10, 15, 12, 18, 20, 25, 30, 35, 40, 45, 50, 55]
      }] as ApexAxisChartSeries
    },
    {
      title: 'Response Time',
      value: '2.3s',
      series: [{
        name: 'Time',
        data: [3.2, 2.8, 2.5, 2.1, 2.3, 2.0, 1.8, 2.2, 2.4, 2.1, 1.9, 2.3]
      }] as ApexAxisChartSeries
    },
    {
      title: 'Success Rate',
      value: '98.5%',
      series: [{
        name: 'Rate',
        data: [95, 96, 97, 98, 98.5, 99, 98.8, 98.9, 99.1, 98.7, 98.9, 98.5]
      }] as ApexAxisChartSeries
    }
  ];

  // Sample prompt variables
  promptVariables: PromptVariable[] = [
    {
      name: 'user_name',
      type: 'string',
      description: 'The name of the user',
      defaultValue: 'John Doe',
      required: true
    },
    {
      name: 'age',
      type: 'number',
      description: 'The age of the user',
      defaultValue: 25,
      required: false
    },
    {
      name: 'is_premium',
      type: 'boolean',
      description: 'Whether the user has premium access',
      defaultValue: false,
      required: false
    },
    {
      name: 'interests',
      type: 'array',
      description: 'List of user interests',
      defaultValue: ['technology', 'science'],
      required: false
    }
  ];

  toggleVariablePanel() {
    this.variablePanelOpened = !this.variablePanelOpened;
  }
} 