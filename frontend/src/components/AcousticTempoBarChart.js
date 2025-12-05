// src/components/AcousticTempoBarChart.js

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

export default function AcousticTempoBarChart({ songs }) {
    const { labels, acousticData, tempoData } = useMemo(() => {
        const limited = (songs || []).slice(0, 20);

        const labelsArr = limited.map((song, index) => {
            const title = song.title || `Song ${index + 1}`;
            return title.length > 10 ? `${title.slice(0, 10)}...` : title;
        });

        const acousticArr = limited.map((song) =>
            Number.isNaN(Number(song.acousticness)) ? 0 : Number(song.acousticness)
        );

        const tempoArr = limited.map((song) =>
            Number.isNaN(Number(song.tempo)) ? 0 : Number(song.tempo)
        );

        return {
            labels: labelsArr,
            acousticData: acousticArr,
            tempoData: tempoArr,
        };
    }, [songs]);

    const data = {
        labels,
        datasets: [
            {
                label: "Acousticness",
                data: acousticData,
                backgroundColor: "rgba(56, 189, 248, 0.7)", // teal
                borderColor: "#0f172a",
                borderWidth: 1,
                yAxisID: "yAcoustic",
            },
            {
                label: "Tempo",
                data: tempoData,
                backgroundColor: "rgba(15, 23, 42, 0.85)", // navy
                borderColor: "#020617",
                borderWidth: 1,
                yAxisID: "yTempo",
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: { color: "#0f172a" },
            },
            tooltip: { enabled: true },
        },
        scales: {
            x: {
                title: { display: true, text: "Song", color: "#0f172a" },
                ticks: { color: "#4b5563" },
                grid: { color: "rgba(15, 23, 42, 0.08)" },
            },
            yTempo: {
                type: "linear",
                position: "left",
                title: { display: true, text: "Tempo (BPM)", color: "#0f172a" },
                beginAtZero: true,
                ticks: { color: "#4b5563" },
                grid: { color: "rgba(15, 23, 42, 0.08)" },
            },
            yAcoustic: {
                type: "linear",
                position: "right",
                title: { display: true, text: "Acousticness", color: "#0f172a" },
                min: 0,
                max: 1,
                ticks: { color: "#4b5563" },
                grid: { drawOnChartArea: false },
            },
        },
    };

    return <Bar data={data} options={options} />;
}
