// src/components/DanceabilityScatterChart.js

import React, { useMemo } from "react";
import {
    Chart as ChartJS,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function DanceabilityScatterChart({ songs }) {
    const data = useMemo(() => {
        const points = (songs || [])
            .map((song, index) => {
                const value = Number(song.danceability);
                if (Number.isNaN(value)) {
                    return null;
                }
                return { x: index + 1, y: value };
            })
            .filter((p) => p !== null);

        return {
            datasets: [
                {
                    label: "Danceability",
                    data: points,
                    backgroundColor: "rgba(56, 189, 248, 0.6)", // teal
                    borderColor: "#0f172a", // navy
                    pointRadius: 3,
                    pointHoverRadius: 4,
                },
            ],
        };
    }, [songs]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                title: { display: true, text: "Song index", color: "#0f172a" },
                ticks: { color: "#4b5563" },
                grid: { color: "rgba(15, 23, 42, 0.08)" },
            },
            y: {
                title: { display: true, text: "Danceability", color: "#0f172a" },
                min: 0,
                max: 1,
                ticks: { color: "#4b5563" },
                grid: { color: "rgba(15, 23, 42, 0.08)" },
            },
        },
    };

    return <Scatter data={data} options={options} />;
}
