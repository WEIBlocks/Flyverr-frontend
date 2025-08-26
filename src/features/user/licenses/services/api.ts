import api from "@/lib/api";

export interface DownloadLicenseResponse {
  success: boolean;
  data?: {
    signedUrl?: string;
  };
}

export async function downloadLicenseFile(licenseId: string) {
  const { data } = await api.post<DownloadLicenseResponse>(
    `/licenses/${licenseId}/download`
  );
  return data;
}
