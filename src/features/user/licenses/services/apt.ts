import api from "@/lib/api";

export function getMyLicenses() {
  return api
    .get("/licenses/my-licenses")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}

export function enableResale(licenseId: string) {
  return api
    .post(`/licenses/${licenseId}/enable-resale`)
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
