import {
  supabase,
  PRODUCT_ASSETS_BUCKET,
  PRODUCT_IMAGES_BUCKET,
  SUPABASE_URL,
} from "./supabase";

export type UploadTarget = "thumbnails" | "images" | "files";

function buildPath(
  folder: UploadTarget,
  userId: string | undefined,
  file: File
) {
  const safeUser = userId || "anonymous";
  const original = file.name;
  const ext =
    (original.includes(".") ? original.split(".").pop() : "") || "bin";
  const nameWithoutExt = original.replace(/\.[^/.]+$/, "");
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const base = nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, "_");
  return `${folder}/${safeUser}/${timestamp}-${random}-${base}.${ext}`;
}

export async function uploadToStorage(
  folder: UploadTarget,
  file: File,
  userId?: string
) {
  if (!userId) {
    throw new Error(
      "Supabase session required for upload. Please log in again and retry."
    );
  }
  const filepath = buildPath(folder, userId, file);
  // Route by asset type: images to public bucket, files to private bucket
  const targetBucket =
    folder === "files" ? PRODUCT_ASSETS_BUCKET : PRODUCT_IMAGES_BUCKET;

  const { data, error } = await supabase.storage
    .from(targetBucket)
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (error) throw error;

  // For thumbnails/images: return a public URL (bucket must be public)
  if (folder === "thumbnails" || folder === "images") {
    const { data: pub } = supabase.storage
      .from(PRODUCT_IMAGES_BUCKET)
      .getPublicUrl(data.path);
    return { path: data.path, url: pub.publicUrl };
  }

  // For files: return a non-public object URL; backend should provide signed URL for download
  const objectUrl = `${SUPABASE_URL}/storage/v1/object/${PRODUCT_ASSETS_BUCKET}/${data.path}`;
  return { path: data.path, url: objectUrl };
}

export async function uploadMultipleImages(files: File[], userId?: string) {
  const uploads = files.map((f) => uploadToStorage("images", f, userId));
  return Promise.all(uploads);
}
