import React from "react";

export default function SongSectionHeader({
    songsLength,
    total,
    showReset,
    onReset,
    onDownload,
}) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
                <h2 className="text-xl font-bold text-vivpro-navy">Song Data</h2>
                <p className="text-sm text-vivpro-gray mt-1">
                    Showing {songsLength} result(s) from {total} total records.
                </p>
            </div>

            <div className="flex gap-2">
                {showReset && (
                    <button
                        type="button"
                        onClick={onReset}
                        className="px-4 py-2 bg-gray-200 text-vivpro-navy rounded-lg text-sm font-medium hover:bg-gray-300 transition"
                    >
                        Reset View
                    </button>
                )}
                <button
                    type="button"
                    onClick={onDownload}
                    className="px-4 py-2 bg-vivpro-teal rounded-lg text-sm font-medium hover:bg-opacity-90 transition shadow-sm"
                >
                    Download CSV
                </button>
            </div>
        </div>
    );
}
