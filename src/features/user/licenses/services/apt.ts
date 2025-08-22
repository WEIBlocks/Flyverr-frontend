import api from "@/lib/api";

export function getMyLicenses(page = 1, limit = 20) {
  return api
    .get(`/licenses/my-licenses?page=${page}&limit=${limit}`)
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
