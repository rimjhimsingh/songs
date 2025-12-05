// src/components/ChartsPlaceholder.js

import React from "react";
import DanceabilityScatterChart from "./DanceabilityScatterChart";
import DurationHistogramChart from "./DurationHistogramChart";
import AcousticTempoBarChart from "./AcousticTempoBarChart";

export default function ChartsPlaceholder({ songs }) {
    return (
        <section className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-vivpro-card rounded-xl border border-vivpro-light p-4 shadow-sm h-80 flex flex-col">
                <h3 className="text-sm font-bold text-vivpro-navy mb-2">
                    Danceability scatter
                </h3>
                <div className="flex-1">
                    <DanceabilityScatterChart songs={songs} />
                </div>
            </div>

            <div className="bg-vivpro-card rounded-xl border border-vivpro-light p-4 shadow-sm h-80 flex flex-col">
                <h3 className="text-sm font-bold text-vivpro-navy mb-2">
                    Duration histogram
                </h3>
                <div className="flex-1">
                    <DurationHistogramChart songs={songs} />
                </div>
            </div>

            <div className="bg-vivpro-card rounded-xl border border-vivpro-light p-4 shadow-sm h-80 flex flex-col">
                <h3 className="text-sm font-bold text-vivpro-navy mb-2">
                    Acousticness and tempo bars
                </h3>
                <div className="flex-1">
                    <AcousticTempoBarChart songs={songs} />
                </div>
            </div>
        </section>
    );
}
