import api from "@/lib/api";

export function getMyLicenses() {
  return api
    .get("/licenses/my-licenses")
    .then((res) => res.data)
    .catch((err) => {
      throw err;
    });
}
