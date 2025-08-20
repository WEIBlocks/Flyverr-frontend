import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  // Fail fast in development to surface missing config
  // Do not throw in production build to avoid breaking static analysis
  console.warn(
    "Supabase environment variables are not set. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");

export const PRODUCT_ASSETS_BUCKET = "product-assets";
export const PRODUCT_IMAGES_BUCKET = "product-images";
export const SUPABASE_URL = supabaseUrl || "";
