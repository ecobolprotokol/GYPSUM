'use server';

import { revalidatePath } from 'next/cache';
import { getAdminUser } from '@/lib/auth';
import { STORAGE_BUCKETS, ALLOWED_IMAGE_TYPES_BROWSER } from '@/lib/constants';
import { ActionError, handleActionError } from '@/lib/actionError';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function adminUploadImage(
  file: File,
  bucket: 'product-images' | 'gallery-images' | 'business-assets'
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!file) {
      throw new ActionError('VALIDATION_ERROR', 'File tidak ditemukan');
    }

    const isValidType = ALLOWED_IMAGE_TYPES_BROWSER.some((type) =>
      file.type.includes(type.replace('image/*', 'jpeg'))
    ) || file.type.includes('image/jpeg') || file.type.includes('image/png') || file.type.includes('image/webp');

    if (!isValidType) {
      throw new ActionError(
        'VALIDATION_ERROR',
        'Format file tidak didukung. Gunakan JPEG, PNG, atau WebP.'
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new ActionError(
        'VALIDATION_ERROR',
        `Ukuran file melebihi batas maksimal ${MAX_FILE_SIZE / (1024 * 1024)}MB`
      );
    }

    const { supabase } = await getAdminUser();

    const bucketName = STORAGE_BUCKETS[
      bucket === 'product-images'
        ? 'PRODUCT_IMAGES'
        : bucket === 'gallery-images'
          ? 'GALLERY_IMAGES'
          : 'BUSINESS_ASSETS'
    ];

    const datePath = new Date().toISOString().slice(0, 10).replace(/-/g, '/');
    const uuid = crypto.randomUUID();
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${uuid}.${ext}`;
    const path = `${datePath}/${filename}`;

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(path, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      throw new ActionError('UPLOAD_ERROR', error.message);
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(data.path);

    revalidatePath('/admin', 'layout');
    return {
      success: true,
      url: publicUrlData?.publicUrl,
    };
  } catch (error) {
    const result = handleActionError(error);
    return {
      success: false,
      error: result.error.message,
    };
  }
}
