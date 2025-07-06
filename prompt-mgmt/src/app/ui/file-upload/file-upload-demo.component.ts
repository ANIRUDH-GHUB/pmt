import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { FileUploadComponent } from './file-upload.component';
import { FileExtractionService, ExtractedText, FileExtractionOptions } from '../../services/file-extraction.service';

@Component({
  selector: 'app-file-upload-demo',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatExpansionModule,
    FileUploadComponent
  ],
  templateUrl: './file-upload-demo.component.html',
  styleUrls: ['./file-upload-demo.component.scss']
})
export class FileUploadDemoComponent {
  extractedTexts: ExtractedText[] = [];
  errors: string[] = [];
  currentTab = 0;

  // Different extraction options for demonstration
  basicOptions: FileExtractionOptions = {
    includeMetadata: true,
    includePages: false,
    languageDetection: false
  };

  advancedOptions: FileExtractionOptions = {
    includeMetadata: true,
    includePages: true,
    languageDetection: true
  };

  customOptions: FileExtractionOptions = {
    includeMetadata: true,
    includePages: true,
    languageDetection: true,
    maxFileSize: 10 * 1024 * 1024 // 10MB
  };

  constructor(private fileExtractionService: FileExtractionService) {}

  onFilesSelected(files: File[]): void {
    console.log('Files selected:', files);
  }

  onExtractionComplete(extractedTexts: ExtractedText[]): void {
    this.extractedTexts = extractedTexts;
    console.log('Extraction complete:', extractedTexts);
  }

  onExtractionError(error: string): void {
    this.errors.push(error);
    console.error('Extraction error:', error);
  }

  clearErrors(): void {
    this.errors = [];
  }

  clearResults(): void {
    this.extractedTexts = [];
  }

  downloadExtractedText(extractedText: ExtractedText): void {
    const blob = new Blob([extractedText.content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${extractedText.metadata.fileName}_extracted.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(() => {
      // You could add a toast notification here
      console.log('Text copied to clipboard');
    });
  }

  getSupportedFileTypes(): string[] {
    return this.fileExtractionService.getSupportedFileTypes();
  }

  getSupportedExtensions(): string[] {
    return this.fileExtractionService.getSupportedExtensions();
  }

  getFileIcon(fileType: string): string {
    switch (fileType) {
      case 'PDF': return 'picture_as_pdf';
      case 'DOC':
      case 'DOCX': return 'description';
      case 'TXT': return 'article';
      default: return 'insert_drive_file';
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
} 