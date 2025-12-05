// SummaryPanel.js

import React from "react";

export default function SummaryPanel() {
    const totalRows = 100;
    const attributes = [
        "id",
        "title",
        "danceability",
        "energy",
        "key",
        "loudness",
        "mode",
        "acousticness",
        "instrumentalness",
        "liveness",
        "valence",
        "tempo",
        "duration_ms",
        "time_signature",
        "num_bars",
        "num_sections",
        "num_segments",
        "class",
    ];

    return (
        <div className="bg-vivpro-card rounded-xl border border-vivpro-light p-6 shadow-sm">
            <h2 className="text-lg font-bold text-vivpro-navy mb-2">
                Dataset Summary
            </h2>

            <p className="text-sm text-vivpro-gray">
                Audio feature dataset of 100 normalized songs from a static playlist.
            </p>

            <div className="mt-4 text-sm text-vivpro-gray">
                <p className="mb-1">
                    <span className="font-semibold">Total rows:</span> {totalRows}
                </p>
                <p className="font-semibold mb-1">Attributes:</p>
                <ul className="list-disc pl-5 text-xs leading-relaxed">
                    {attributes.map((attr) => (
                        <li key={attr}>{attr}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
