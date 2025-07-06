import { Injectable } from '@angular/core';
import { Observable, from, throwError, of, forkJoin } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface ExtractedText {
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

export interface FileExtractionOptions {
  includeMetadata?: boolean;
  includePages?: boolean;
  maxFileSize?: number; // in bytes
  allowedFileTypes?: string[];
  languageDetection?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FileExtractionService {
  private readonly DEFAULT_MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  private readonly SUPPORTED_FILE_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain'
  ];

  constructor() {}

  /**
   * Extract text from a file
   */
  extractTextFromFile(
    file: File, 
    options: FileExtractionOptions = {}
  ): Observable<ExtractedText> {
    const {
      includeMetadata = true,
      includePages = false,
      maxFileSize = this.DEFAULT_MAX_FILE_SIZE,
      allowedFileTypes = this.SUPPORTED_FILE_TYPES,
      languageDetection = false
    } = options;

    // Validate file
    const validationError = this.validateFile(file, maxFileSize, allowedFileTypes);
    if (validationError) {
      return throwError(() => new Error(validationError));
    }

    // Extract based on file type
    switch (file.type) {
      case 'application/pdf':
        return this.extractFromPDF(file, { includeMetadata, includePages, languageDetection });
      case 'application/msword':
        return this.extractFromDOC(file, { includeMetadata, includePages, languageDetection });
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return this.extractFromDOCX(file, { includeMetadata, includePages, languageDetection });
      case 'text/plain':
        return this.extractFromTXT(file, { includeMetadata, includePages, languageDetection });
      default:
        return throwError(() => new Error(`Unsupported file type: ${file.type}`));
    }
  }

  /**
   * Extract text from multiple files
   */
  extractTextFromFiles(
    files: File[], 
    options: FileExtractionOptions = {}
  ): Observable<ExtractedText[]> {
    const extractionObservables = files.map(file => this.extractTextFromFile(file, options));
    return forkJoin(extractionObservables);
  }

  /**
   * Extract text from PDF files
   */
  private extractFromPDF(
    file: File, 
    options: { includeMetadata: boolean; includePages: boolean; languageDetection: boolean }
  ): Observable<ExtractedText> {
    return new Observable(observer => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          
          // Check if PDF.js is available
          if (typeof (window as any).pdfjsLib === 'undefined') {
            // Load PDF.js dynamically
            await this.loadPDFJS();
          }

          const pdf = await (window as any).pdfjsLib.getDocument({ data: arrayBuffer }).promise;
          const numPages = pdf.numPages;
          const pages: string[] = [];
          let fullText = '';

          // Extract text from each page
          for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
              .map((item: any) => item.str)
              .join(' ');
            
            pages.push(pageText);
            fullText += pageText + '\n';
          }

          const result: ExtractedText = {
            content: fullText.trim(),
            metadata: {
              fileName: file.name,
              fileType: 'PDF',
              fileSize: file.size,
              pageCount: numPages,
              extractedAt: new Date(),
              language: options.languageDetection ? await this.detectLanguage(fullText) : undefined
            }
          };

          if (options.includePages) {
            result.pages = pages;
          }

          observer.next(result);
          observer.complete();
        } catch (error) {
          observer.error(new Error(`Failed to extract PDF: ${error}`));
        }
      };

      reader.onerror = () => {
        observer.error(new Error('Failed to read PDF file'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Extract text from DOC files
   */
  private extractFromDOC(
    file: File, 
    options: { includeMetadata: boolean; includePages: boolean; languageDetection: boolean }
  ): Observable<ExtractedText> {
    return new Observable(observer => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          
          // Check if mammoth.js is available
          if (typeof (window as any).mammoth === 'undefined') {
            await this.loadMammothJS();
          }

          const result = await (window as any).mammoth.extractRawText({ arrayBuffer });
          
          const extractedText: ExtractedText = {
            content: result.value,
            metadata: {
              fileName: file.name,
              fileType: 'DOC',
              fileSize: file.size,
              extractedAt: new Date(),
              language: options.languageDetection ? await this.detectLanguage(result.value) : undefined
            }
          };

          if (options.includePages) {
            // DOC files don't have clear page boundaries, so we'll split by double newlines
            extractedText.pages = result.value.split(/\n\s*\n/).filter((page: string) => page.trim());
          }

          observer.next(extractedText);
          observer.complete();
        } catch (error) {
          observer.error(new Error(`Failed to extract DOC: ${error}`));
        }
      };

      reader.onerror = () => {
        observer.error(new Error('Failed to read DOC file'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Extract text from DOCX files
   */
  private extractFromDOCX(
    file: File, 
    options: { includeMetadata: boolean; includePages: boolean; languageDetection: boolean }
  ): Observable<ExtractedText> {
    return new Observable(observer => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const arrayBuffer = e.target?.result as ArrayBuffer;
          
          // Check if mammoth.js is available
          if (typeof (window as any).mammoth === 'undefined') {
            await this.loadMammothJS();
          }

          const result = await (window as any).mammoth.extractRawText({ arrayBuffer });
          
          const extractedText: ExtractedText = {
            content: result.value,
            metadata: {
              fileName: file.name,
              fileType: 'DOCX',
              fileSize: file.size,
              extractedAt: new Date(),
              language: options.languageDetection ? await this.detectLanguage(result.value) : undefined
            }
          };

          if (options.includePages) {
            // DOCX files don't have clear page boundaries, so we'll split by double newlines
            extractedText.pages = result.value.split(/\n\s*\n/).filter((page: string) => page.trim());
          }

          observer.next(extractedText);
          observer.complete();
        } catch (error) {
          observer.error(new Error(`Failed to extract DOCX: ${error}`));
        }
      };

      reader.onerror = () => {
        observer.error(new Error('Failed to read DOCX file'));
      };

      reader.readAsArrayBuffer(file);
    });
  }

  /**
   * Extract text from TXT files
   */
  private extractFromTXT(
    file: File, 
    options: { includeMetadata: boolean; includePages: boolean; languageDetection: boolean }
  ): Observable<ExtractedText> {
    return new Observable(observer => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          
          const extractedText: ExtractedText = {
            content: content,
            metadata: {
              fileName: file.name,
              fileType: 'TXT',
              fileSize: file.size,
              extractedAt: new Date(),
              language: options.languageDetection ? await this.detectLanguage(content) : undefined
            }
          };

          if (options.includePages) {
            // Split by double newlines or page breaks
            extractedText.pages = content.split(/\n\s*\n|\f/).filter(page => page.trim());
          }

          observer.next(extractedText);
          observer.complete();
        } catch (error) {
          observer.error(new Error(`Failed to extract TXT: ${error}`));
        }
      };

      reader.onerror = () => {
        observer.error(new Error('Failed to read TXT file'));
      };

      reader.readAsText(file);
    });
  }

  /**
   * Validate file before extraction
   */
  private validateFile(file: File, maxFileSize: number, allowedFileTypes: string[]): string | null {
    if (!file) {
      return 'No file provided';
    }

    if (file.size > maxFileSize) {
      return `File size (${this.formatFileSize(file.size)}) exceeds maximum allowed size (${this.formatFileSize(maxFileSize)})`;
    }

    if (!allowedFileTypes.includes(file.type)) {
      return `File type ${file.type} is not supported. Supported types: ${allowedFileTypes.join(', ')}`;
    }

    return null;
  }

  /**
   * Load PDF.js library dynamically
   */
  private async loadPDFJS(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        (window as any).pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        resolve();
      };
      script.onerror = () => reject(new Error('Failed to load PDF.js'));
      document.head.appendChild(script);
    });
  }

  /**
   * Load Mammoth.js library dynamically
   */
  private async loadMammothJS(): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Mammoth.js'));
      document.head.appendChild(script);
    });
  }

  /**
   * Detect language of text (basic implementation)
   */
  private async detectLanguage(text: string): Promise<string> {
    // This is a basic implementation. In a real application, you might want to use
    // a more sophisticated language detection library like franc or langdetect
    const englishWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    const spanishWords = ['el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo'];
    const frenchWords = ['le', 'la', 'de', 'et', 'à', 'un', 'est', 'il', 'que', 'qui', 'ne', 'se', 'pas'];

    const words = text.toLowerCase().split(/\s+/);
    const englishCount = words.filter(word => englishWords.includes(word)).length;
    const spanishCount = words.filter(word => spanishWords.includes(word)).length;
    const frenchCount = words.filter(word => frenchWords.includes(word)).length;

    if (englishCount > spanishCount && englishCount > frenchCount) return 'en';
    if (spanishCount > englishCount && spanishCount > frenchCount) return 'es';
    if (frenchCount > englishCount && frenchCount > spanishCount) return 'fr';
    
    return 'unknown';
  }

  /**
   * Format file size for display
   */
  private formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  /**
   * Get supported file types
   */
  getSupportedFileTypes(): string[] {
    return [...this.SUPPORTED_FILE_TYPES];
  }

  /**
   * Get file type extensions
   */
  getSupportedExtensions(): string[] {
    return ['.pdf', '.doc', '.docx', '.txt'];
  }

  /**
   * Check if file type is supported
   */
  isFileTypeSupported(file: File): boolean {
    return this.SUPPORTED_FILE_TYPES.includes(file.type);
  }
} 