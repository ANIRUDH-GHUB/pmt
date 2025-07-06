# File Extraction Service

This service provides comprehensive text extraction capabilities for PDF, DOC, DOCX, and TXT files in Angular applications.

## Features

- **Multi-format Support**: Extract text from PDF, DOC, DOCX, and TXT files
- **Drag & Drop Interface**: Modern file upload with drag and drop support
- **Progress Tracking**: Real-time progress indication during extraction
- **Metadata Extraction**: File information including size, page count, and language detection
- **Page-by-Page Extraction**: Extract text from individual pages (for PDFs)
- **Error Handling**: Comprehensive error handling and validation
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode Support**: Automatic dark mode detection and styling

## Installation

The service uses external libraries that are loaded dynamically:

- **PDF.js**: For PDF text extraction
- **Mammoth.js**: For DOC/DOCX text extraction

These libraries are loaded automatically when needed, so no additional installation is required.

## Usage

### Basic Usage

```typescript
import { FileExtractionService, ExtractedText } from './services/file-extraction.service';

constructor(private fileExtractionService: FileExtractionService) {}

// Extract text from a single file
this.fileExtractionService.extractTextFromFile(file)
  .subscribe({
    next: (result: ExtractedText) => {
      console.log('Extracted text:', result.content);
      console.log('Metadata:', result.metadata);
    },
    error: (error) => {
      console.error('Extraction failed:', error);
    }
  });
```

### Advanced Usage with Options

```typescript
const options = {
  includeMetadata: true,
  includePages: true,
  languageDetection: true,
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['application/pdf', 'text/plain']
};

this.fileExtractionService.extractTextFromFile(file, options)
  .subscribe({
    next: (result: ExtractedText) => {
      console.log('Content:', result.content);
      console.log('Pages:', result.pages);
      console.log('Language:', result.metadata.language);
    }
  });
```

### Multiple Files

```typescript
const files: File[] = [file1, file2, file3];

this.fileExtractionService.extractTextFromFiles(files, options)
  .subscribe({
    next: (results: ExtractedText[]) => {
      results.forEach(result => {
        console.log(`${result.metadata.fileName}: ${result.content.length} characters`);
      });
    }
  });
```

## File Upload Component

The `FileUploadComponent` provides a complete UI for file upload and extraction:

```html
<app-file-upload
  [multiple]="true"
  [maxFileSize]="50 * 1024 * 1024"
  [extractionOptions]="options"
  (filesSelected)="onFilesSelected($event)"
  (extractionComplete)="onExtractionComplete($event)"
  (extractionError)="onExtractionError($event)"
></app-file-upload>
```

### Component Properties

- `multiple`: Allow multiple file selection (default: false)
- `accept`: File types to accept (default: '.pdf,.doc,.docx,.txt')
- `maxFileSize`: Maximum file size in bytes (default: 50MB)
- `showPreview`: Show extracted text preview (default: true)
- `extractionOptions`: Configuration options for extraction

### Component Events

- `filesSelected`: Emitted when files are selected
- `extractionComplete`: Emitted when text extraction is complete
- `extractionError`: Emitted when an error occurs

## API Reference

### FileExtractionService

#### Methods

- `extractTextFromFile(file: File, options?: FileExtractionOptions): Observable<ExtractedText>`
- `extractTextFromFiles(files: File[], options?: FileExtractionOptions): Observable<ExtractedText[]>`
- `getSupportedFileTypes(): string[]`
- `getSupportedExtensions(): string[]`
- `isFileTypeSupported(file: File): boolean`

#### Interfaces

```typescript
interface ExtractedText {
  content: string;
  metadata: {
    fileName: string;
    fileType: string;
    fileSize: number;
    pageCount?: number;
    extractedAt: Date;
    language?: string;
  };
  pages?: string[];
  error?: string;
}

interface FileExtractionOptions {
  includeMetadata?: boolean;
  includePages?: boolean;
  maxFileSize?: number;
  allowedFileTypes?: string[];
  languageDetection?: boolean;
}
```

## Supported File Types

| Format | MIME Type | Extension | Features |
|--------|-----------|-----------|----------|
| PDF | application/pdf | .pdf | Text extraction, page count, metadata |
| DOC | application/msword | .doc | Text extraction, metadata |
| DOCX | application/vnd.openxmlformats-officedocument.wordprocessingml.document | .docx | Text extraction, metadata |
| TXT | text/plain | .txt | Text extraction, metadata |

## Error Handling

The service provides comprehensive error handling:

- **File Size Validation**: Checks against maximum file size
- **File Type Validation**: Ensures supported file types
- **Extraction Errors**: Handles extraction failures gracefully
- **Network Errors**: Manages library loading failures

## Performance Considerations

- **Large Files**: For files larger than 10MB, consider implementing chunked processing
- **Multiple Files**: Use `extractTextFromFiles` for better performance with multiple files
- **Memory Usage**: Large PDFs may consume significant memory during processing

## Browser Compatibility

- **Modern Browsers**: Chrome, Firefox, Safari, Edge (latest versions)
- **File API**: Requires File API support
- **Promise Support**: Requires native Promise support or polyfill

## Security Considerations

- **File Validation**: Always validate file types and sizes
- **Content Sanitization**: Consider sanitizing extracted text for XSS prevention
- **Local Processing**: All processing happens client-side, no files are uploaded

## Examples

### Demo Component

Use the `FileUploadDemoComponent` to see the service in action:

```html
<app-file-upload-demo></app-file-upload-demo>
```

This provides three different configurations:
1. **Basic Upload**: Simple text extraction
2. **Advanced Upload**: Full extraction with pages and language detection
3. **Custom Upload**: Limited file size with all features

### Custom Implementation

```typescript
@Component({
  selector: 'app-custom-upload',
  template: `
    <div class="upload-area" (drop)="onDrop($event)" (dragover)="onDragOver($event)">
      <input type="file" (change)="onFileSelected($event)" accept=".pdf,.doc,.docx,.txt">
      <p>Drop files here or click to select</p>
    </div>
    
    <div *ngFor="let result of results">
      <h3>{{ result.metadata.fileName }}</h3>
      <p>{{ result.content }}</p>
    </div>
  `
})
export class CustomUploadComponent {
  results: ExtractedText[] = [];

  constructor(private fileExtractionService: FileExtractionService) {}

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.extractFile(file);
    }
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    const files = Array.from(event.dataTransfer?.files || []);
    files.forEach(file => this.extractFile(file));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  private extractFile(file: File) {
    this.fileExtractionService.extractTextFromFile(file)
      .subscribe({
        next: (result) => {
          this.results.push(result);
        },
        error: (error) => {
          console.error('Extraction failed:', error);
        }
      });
  }
}
```

## Troubleshooting

### Common Issues

1. **PDF.js not loading**: Check network connectivity and CDN availability
2. **Large file errors**: Reduce `maxFileSize` or implement chunked processing
3. **Memory issues**: Process files one at a time for large documents
4. **Browser compatibility**: Ensure modern browser with File API support

### Debug Mode

Enable console logging for debugging:

```typescript
// Add to your component
ngOnInit() {
  console.log('Supported types:', this.fileExtractionService.getSupportedFileTypes());
  console.log('Supported extensions:', this.fileExtractionService.getSupportedExtensions());
}
``` 