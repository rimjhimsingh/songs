import { API_URL } from "../constants/apiUrl";

export async function getAllSongs() {
  const res = await fetch(`${API_URL}?all=true`);
  const allSongs = await res.json();
  return allSongs;
}
