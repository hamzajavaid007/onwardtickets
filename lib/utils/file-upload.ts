/**
 * File upload utility for forms
 * Handles file uploads to the /api/upload endpoint
 */

export interface UploadedFile {
  filename: string;
  url: string;
  size: number;
  type: string;
  originalName?: string;
}

export interface UploadResult {
  success: boolean;
  files?: UploadedFile[];
  error?: string;
}

/**
 * Upload a single file
 */
export async function uploadFile(
  file: File,
  service: string = 'general'
): Promise<UploadedFile | null> {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('service', service);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Upload failed:', data.error);
      return null;
    }

    const data = await response.json();
    return data as UploadedFile;
  } catch (error) {
    console.error('File upload error:', error);
    return null;
  }
}

/**
 * Upload multiple files
 */
export async function uploadFiles(
  files: File[],
  service: string = 'general'
): Promise<UploadedFile[]> {
  try {
    const formData = new FormData();
    formData.append('service', service);

    files.forEach((file) => {
      formData.append('files', file);
    });

    const response = await fetch('/api/upload', {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('Upload failed:', data.error);
      return [];
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Files upload error:', error);
    return [];
  }
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Validate file before upload
 */
export function validateFile(file: File): { valid: boolean; error?: string } {
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB
  const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/jpg',
  ];

  if (file.size > MAX_SIZE) {
    return {
      valid: false,
      error: 'File size must be less than 10MB',
    };
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not supported`,
    };
  }

  return { valid: true };
}
