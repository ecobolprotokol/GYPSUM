import type { Json } from '@/types/database';
import { env } from '@/lib/env';
import { STORAGE_BUCKETS, ALLOWED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/lib/constants';

export interface UploadResult {
  path: string;
  url: string;
  filename: string;
}

export async function uploadImage(
  file: File,
  bucket: keyof typeof STORAGE_BUCKETS
): Promise<UploadResult> {
  if (!file) {
    throw new Error('No file provided');
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      `Invalid file type. Allowed: ${ALLOWED_IMAGE_TYPES.join(', ')}`
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`File too large. Max size: ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
  }

  const bucketName = STORAGE_BUCKETS[bucket];
  const timestamp = new Date().toISOString();
  const datePath = `${timestamp.slice(0, 4)}/${timestamp.slice(5, 7)}`;
  const uuid = crypto.randomUUID();
  const extension = file.name.split('.').pop() || 'jpg';
  const filename = `${uuid}.${extension}`;
  const path = `${datePath}/${filename}`;

  const { data, error } = await uploadToBucket(file, bucketName, path);

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const url = getStorageUrl(bucketName, path);

  return {
    path: data?.path || path,
    url,
    filename,
  };
}

async function uploadToBucket(
  file: File,
  bucket: string,
  path: string
): Promise<{
  data: { path: string } | null;
  error: { message: string } | null;
}> {
  const formData = new FormData();
  formData.append('file', file, path);

  try {
    const response = await fetch(
      `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/${bucket}`,
      {
        method: 'POST',
        headers: {
          apikey: env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          Authorization: `Bearer ${env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        data: null,
        error: { message: errorData.message || 'Upload failed' },
      };
    }

    const data = await response.json();
    return {
      data: { path: data.path },
      error: null,
    };
  } catch (err) {
    return {
      data: null,
      error: { message: err instanceof Error ? err.message : 'Upload failed' },
    };
  }
}

export function getStorageUrl(bucket: string, path: string): string {
  return `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${bucket}/${path}`;
}
