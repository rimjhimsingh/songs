import { useEffect, useState } from "react";
import { getAllSongs } from "../api/getAllSongs";
import { getSongsPage } from "../api/getSongsPage";
import { getSongByTitle } from "../api/getSongByTitle";
import { downloadCSV } from "../utils/downloadCSV";

export function useSongsPage() {
    const [songs, setSongs] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [searchTitle, setSearchTitle] = useState("");
    const [searchError, setSearchError] = useState("");
    const [allSongs, setAllSongs] = useState([]);

    async function fetchSongs(pageNumber) {
        try {
            const data = await getSongsPage(pageNumber, 10);
            setSongs(data.songs || []);
            setTotal(data.total || 0);
        } catch (err) {
            console.error(err);
            setSongs([]);
            setTotal(0);
        }
    }

    async function fetchAllSongs() {
        try {
            const data = await getAllSongs();
            setAllSongs(data || []);
        } catch (err) {
            console.error(err);
            setAllSongs([]);
        }
    }

    useEffect(() => {
        fetchSongs(page);
    }, [page]);

    useEffect(() => {
        fetchAllSongs();
    }, []);

    function handleSort(field) {
        if (sortField === field) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortOrder("asc");
        }
    }

    async function handleSearch() {
        if (!searchTitle.trim()) {
            setSearchError("Please enter a title.");
            return;
        }

        try {
            const res = await getSongByTitle(searchTitle);

            if (!res.ok) {
                setSearchError("Song not found.");
                setSongs([]);
                setTotal(0);
                return;
            }

            const data = await res.json();

            setSongs([data]);
            setTotal(1);
            setPage(1);
            setSearchError("");
        } catch (err) {
            console.error(err);
            setSearchError("Failed to fetch song.");
        }
    }

    function handleReset() {
        setSearchTitle("");
        setSearchError("");
        setPage(1);
        fetchSongs(1);
    }

    async function handleDownloadAllSongs() {
        try {
            const data = await getAllSongs();
            downloadCSV(data, "all");
        } catch (err) {
            console.error(err);
        }
    }

    return {
        songs,
        page,
        total,
        sortField,
        sortOrder,
        searchTitle,
        searchError,
        allSongs,
        setPage,
        setSearchTitle,
        handleSort,
        handleSearch,
        handleReset,
        handleDownloadAllSongs,
    };
}
