import React from 'react';

function SongsTable({ songs, sortField, sortOrder, onSort }) {
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

    // Vivpro Styled Header: Mint background, Navy text, Teal hover
    const headerStyle =
        "px-4 py-3 text-left font-bold text-vivpro-navy cursor-pointer hover:text-vivpro-teal transition-colors select-none";

    return (
        <div className="overflow-x-auto border border-vivpro-light rounded-lg shadow-sm">
            <table className="min-w-full divide-y divide-vivpro-light">
                <thead className="bg-vivpro-mint">
                    <tr>
                        <th
                            className={headerStyle}
                            onClick={() => onSort("id")}
                        >
                            ID {getArrow("id")}
                        </th>

                        <th
                            className={headerStyle}
                            onClick={() => onSort("title")}
                        >
                            Title {getArrow("title")}
                        </th>

                        <th
                            className={headerStyle}
                            onClick={() => onSort("danceability")}
                        >
                            Dance {getArrow("danceability")}
                        </th>

                        <th
                            className={headerStyle}
                            onClick={() => onSort("energy")}
                        >
                            Energy {getArrow("energy")}
                        </th>

                        <th
                            className={headerStyle}
                            onClick={() => onSort("tempo")}
                        >
                            Tempo {getArrow("tempo")}
                        </th>

                        <th
                            className={headerStyle}
                            onClick={() => onSort("duration_ms")}
                        >
                            Dur(ms) {getArrow("duration_ms")}
                        </th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-vivpro-light bg-white">
                    {sortedSongs.length > 0 ? (
                        sortedSongs.map((song, idx) => (
                            <tr key={idx} className="hover:bg-vivpro-mint/30 transition-colors">
                                <td className="px-4 py-3 text-sm text-vivpro-navy font-medium truncate max-w-[100px]">{song.id}</td>
                                <td className="px-4 py-3 text-sm text-vivpro-gray font-medium">{song.title}</td>
                                <td className="px-4 py-3 text-sm text-vivpro-gray">{song.danceability}</td>
                                <td className="px-4 py-3 text-sm text-vivpro-gray">{song.energy}</td>
                                <td className="px-4 py-3 text-sm text-vivpro-gray">{Math.round(song.tempo)}</td>
                                <td className="px-4 py-3 text-sm text-vivpro-gray">{song.duration_ms}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="px-4 py-8 text-center text-vivpro-gray">
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
