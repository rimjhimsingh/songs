import { API_URL } from "../constants/apiUrl";

export async function getSongsPage(pageNumber, size = 10) {
  const res = await fetch(`${API_URL}?page=${pageNumber}&size=${size}`);
  const data = await res.json();
  return data;
}