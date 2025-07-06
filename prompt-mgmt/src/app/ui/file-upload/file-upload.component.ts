import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { FileExtractionService, ExtractedText, FileExtractionOptions } from '../../services/file-extraction.service';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule
  ],
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  @Input() multiple: boolean = false;
  @Input() accept: string = '.pdf,.doc,.docx,.txt';
  @Input() maxFileSize: number = 50 * 1024 * 1024; // 50MB
  @Input() showPreview: boolean = true;
  @Input() extractionOptions: FileExtractionOptions = {
    includeMetadata: true,
    includePages: false,
    languageDetection: false
  };

  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() extractionComplete = new EventEmitter<ExtractedText[]>();
  @Output() extractionError = new EventEmitter<string>();

  selectedFiles: File[] = [];
  extractedTexts: ExtractedText[] = [];
  isUploading = false;
  uploadProgress = 0;
  dragOver = false;

  constructor(private fileExtractionService: FileExtractionService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(Array.from(event.dataTransfer.files));
    }
  }

  private handleFiles(files: File[]): void {
    // Filter files by type and size
    const validFiles = files.filter(file => {
      if (!this.fileExtractionService.isFileTypeSupported(file)) {
        this.extractionError.emit(`Unsupported file type: ${file.type}`);
        return false;
      }

      if (file.size > this.maxFileSize) {
        this.extractionError.emit(`File ${file.name} is too large. Maximum size is ${this.formatFileSize(this.maxFileSize)}`);
        return false;
      }

      return true;
    });

    if (validFiles.length === 0) {
      return;
    }

    this.selectedFiles = this.multiple ? [...this.selectedFiles, ...validFiles] : validFiles;
    this.filesSelected.emit(this.selectedFiles);

    // Extract text from files
    this.extractTextFromFiles(validFiles);
  }

  private extractTextFromFiles(files: File[]): void {
    this.isUploading = true;
    this.uploadProgress = 0;

    this.fileExtractionService.extractTextFromFiles(files, this.extractionOptions)
      .subscribe({
        next: (extractedTexts) => {
          this.extractedTexts = this.multiple 
            ? [...this.extractedTexts, ...extractedTexts]
            : extractedTexts;
          
          this.isUploading = false;
          this.uploadProgress = 100;
          this.extractionComplete.emit(this.extractedTexts);
        },
        error: (error) => {
          this.isUploading = false;
          this.uploadProgress = 0;
          this.extractionError.emit(error.message);
        }
      });
  }

  removeFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    this.extractedTexts = this.extractedTexts.filter(et => et.metadata.fileName !== file.name);
    this.filesSelected.emit(this.selectedFiles);
  }

  clearAll(): void {
    this.selectedFiles = [];
    this.extractedTexts = [];
    this.filesSelected.emit([]);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

  getSupportedExtensions(): string {
    return this.fileExtractionService.getSupportedExtensions().join(', ');
  }

  getFileType(file: File): string {
    switch (file.type) {
      case 'application/pdf': return 'PDF';
      case 'application/msword': return 'DOC';
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': return 'DOCX';
      case 'text/plain': return 'TXT';
      default: return 'UNKNOWN';
    }
  }

  trackByFileName(index: number, item: File | any): string {
    return item.name || item.metadata?.fileName || index.toString();
  }
} 