/**
 * CLOUDINARY EXIF STRIP CONFIGURATION
 * 
 * Instrucțiuni: Cum să configurezi Cloudinary pentru a elimina
 * metadate EXIF (GPS, dată, model cameră) din pozele uploadate
 * 
 * Status: AUTO - Se face automat pe upload
 */

/**
 * SETUP IN CLOUDINARY DASHBOARD:
 * 
 * 1. Login to https://cloudinary.com/console
 * 2. Go to Settings → Upload
 * 3. Enable "Auto tagging" (OPTIONAL - for organization)
 * 4. Enable "Strict SSL" (REQUIRED - for security)
 * 5. Under "Upload presets":
 *    - Name: "photo-upload-exif-strip"
 *    - Mode: Unsigned (for guest uploads)
 *    - Unsigned key: Use in frontend
 * 
 * 6. In the preset settings:
 *    ✅ Allow unsigned uploads: YES
 *    ✅ Eager transformations: YES
 *       - Format: Auto
 *       - Quality: Auto
 *       - Strip flags: All (removes EXIF)
 *    ✅ Folder: wedding_photos/
 *    ✅ Tags: order_${order_id}
 */

/**
 * FRONTEND IMPLEMENTATION:
 * 
 * When uploading photos from /api/photos/upload or upload pages,
 * use Cloudinary's transformation to strip EXIF:
 */

interface CloudinaryUploadOptions {
  cloudName: string;
  uploadPreset: string;
  folder: string;
  tags: string[];
  transformation?: {
    quality: 'auto:eco' | 'auto:best' | 'auto';
    flags?: string[]; // e.g., ['strip_profile']
  };
}

export function getCloudinaryUploadConfig(): CloudinaryUploadOptions {
  return {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || 'photo-upload-exif-strip',
    folder: 'wedding_photos',
    tags: ['vibeinvite', 'guest-upload'],
    transformation: {
      quality: 'auto:eco',
      flags: ['strip_profile'], // Remove all EXIF/ICC profiles
    },
  };
}

/**
 * CLOUDINARY TRANSFORMATION URLS:
 * 
 * To explicitly strip EXIF from a photo URL, use:
 * https://res.cloudinary.com/{cloud_name}/image/upload/f_auto,q_auto,fl_strip_profile/{public_id}
 * 
 * Example:
 * Original: https://res.cloudinary.com/my-cloud/image/upload/v1234567890/order_123/photo.jpg
 * Stripped:  https://res.cloudinary.com/my-cloud/image/upload/f_auto,q_auto,fl_strip_profile/v1234567890/order_123/photo.jpg
 */

/**
 * BACKEND IMPLEMENTATION:
 * 
 * If uploading via server-side API (not recommended for photos),
 * use Cloudinary SDK:
 */

// import { v2 as cloudinary } from 'cloudinary';
//
// async function stripExifFromPhoto(publicId: string) {
//   const result = await cloudinary.api.update(publicId, {
//     context: { 'exif': '' }, // Clear EXIF
//   });
//   return result;
// }

/**
 * VERIFICATION:
 * 
 * To verify EXIF is stripped from a photo:
 * 1. Download photo from Cloudinary URL
 * 2. Use online EXIF viewer (e.g., https://exifdata.com)
 * 3. Confirm: No GPS coordinates, date, model info
 */

/**
 * COMPLIANCE NOTES:
 * 
 * ✅ GDPR Art. 5: Data minimization
 *    - We collect: Photo bytes only
 *    - We strip: GPS, date, model, all metadata
 * 
 * ✅ Privacy Policy: Declares EXIF stripping
 *    See: /politica "Metadate EXIF"
 * 
 * ✅ User consent: Photo upload form requires consent
 *    checkbox before upload allowed
 */

export default {
  getCloudinaryUploadConfig,
};
