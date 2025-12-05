// src/components/SongsTable.js
import React from "react";

function SongsTable({ songs, sortField, sortOrder, onSort }) {
    // all columns from the normalized dataset
    const columns = [
        { key: "id", label: "ID" },
        { key: "title", label: "Title" },
        { key: "danceability", label: "Danceability" },
        { key: "energy", label: "Energy" },
        { key: "key", label: "Key" },
        { key: "loudness", label: "Loudness" },
        { key: "mode", label: "Mode" },
        { key: "acousticness", label: "Acousticness" },
        { key: "instrumentalness", label: "Instrumentalness" },
        { key: "liveness", label: "Liveness" },
        { key: "valence", label: "Valence" },
        { key: "tempo", label: "Tempo" },
        { key: "duration_ms", label: "Duration (ms)" },
        { key: "time_signature", label: "Time sig" },
        { key: "num_bars", label: "Bars" },
        { key: "num_sections", label: "Sections" },
        { key: "num_segments", label: "Segments" },
        { key: "class", label: "Class" },
    ];

    // copy array before sorting (never mutate props)
    const sortedSongs = [...songs];

    // apply sorting logic
    if (sortField) {
        sortedSongs.sort((a, b) => {
            const valA = a[sortField];
            const valB = b[sortField];

            // string comparison
            if (typeof valA === "string") {
                return sortOrder === "asc"
                    ? valA.localeCompare(valB)
                    : valB.localeCompare(valA);
            }

            // numeric comparison
            return sortOrder === "asc" ? valA - valB : valB - valA;
        });
    }

    // helper to show arrow
    function getArrow(field) {
        if (sortField !== field) return "";
        return sortOrder === "asc" ? " ↑" : " ↓";
    }

    // shared header style
    const headerStyle =
        "px-4 py-3 text-left font-bold text-vivpro-navy cursor-pointer hover:text-vivpro-teal transition-colors select-none whitespace-nowrap";

    // shared cell style
    const cellStyle = "px-4 py-3 text-sm text-vivpro-gray whitespace-nowrap";

    function renderCell(colKey, song) {
        if (colKey === "id") {
            return (
                <span className="text-vivpro-navy font-medium truncate max-w-[120px] inline-block">
                    {song.id}
                </span>
            );
        }

        if (colKey === "title") {
            return (
                <span className="font-medium">
                    {song.title}
                </span>
            );
        }

        if (colKey === "tempo") {
            return Math.round(song.tempo);
        }

        return song[colKey];
    }

    return (
        <div className="overflow-x-auto border border-vivpro-light rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-vivpro-light">
                <thead className="bg-vivpro-mint">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className={headerStyle}
                                onClick={() => onSort(col.key)}
                            >
                                {col.label} {getArrow(col.key)}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-vivpro-light bg-white">
                    {sortedSongs.length > 0 ? (
                        sortedSongs.map((song, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-vivpro-mint/30 transition-colors"
                            >
                                {columns.map((col) => (
                                    <td key={col.key} className={cellStyle}>
                                        {renderCell(col.key, song)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-4 py-8 text-center text-vivpro-gray"
                            >
                                No songs found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default SongsTable;
