// src/components/DurationHistogramChart.js

import React, { useMemo } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DurationHistogramChart({ songs }) {
    const { labels, counts } = useMemo(() => {
        const durations = (songs || [])
            .map((song) => Number(song.duration_ms) / 1000)
            .filter((v) => !Number.isNaN(v));

        if (durations.length === 0) {
            return { labels: [], counts: [] };
        }

        const min = Math.min(...durations);
        const max = Math.max(...durations);
        const binCount = 10;
        const span = max - min || 1;
        const binSize = span / binCount;
        const countsArr = new Array(binCount).fill(0);

        for (const d of durations) {
            let idx = Math.floor((d - min) / binSize);
            if (idx >= binCount) {
                idx = binCount - 1;
            }
            countsArr[idx] += 1;
        }

        const labelsArr = countsArr.map((_, i) => {
            const start = min + i * binSize;
            const end = start + binSize;
            return `${start.toFixed(0)} - ${end.toFixed(0)} s`;
        });

        return { labels: labelsArr, counts: countsArr };
    }, [songs]);

    const data = {
        labels,
        datasets: [
            {
                label: "Song count",
                data: counts,
                backgroundColor: "rgba(56, 189, 248, 0.6)", // teal
                borderColor: "#0f172a", // navy
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                title: { display: true, text: "Duration range (seconds)", color: "#0f172a" },
                ticks: { color: "#4b5563" },
                grid: { color: "rgba(15, 23, 42, 0.08)" },
            },
            y: {
                title: { display: true, text: "Count", color: "#0f172a" },
                beginAtZero: true,
                ticks: { color: "#4b5563" },
                grid: { color: "rgba(15, 23, 42, 0.08)" },
            },
        },
    };

    return <Bar data={data} options={options} />;
}
