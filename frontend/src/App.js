// // import React, { useEffect, useState } from "react";
// // import SongsTable from "./components/SongsTable";
// // import Pagination from "./components/Pagination";

// // const API_URL = "http://localhost:5000/songs";

// // // CSV download helper
// // function downloadCSV(rows, name) {
// //   if (!rows || rows.length === 0) return;

// //   const header = Object.keys(rows[0]).join(",");
// //   const data = rows.map((row) => Object.values(row).join(",")).join("\n");
// //   const csvContent = header + "\n" + data;

// //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
// //   const url = URL.createObjectURL(blob);

// //   const link = document.createElement("a");
// //   link.href = url;
// //   link.download = `songs_${name}.csv`;
// //   link.click();

// //   URL.revokeObjectURL(url);
// // }

// // // download all songs
// // async function downloadAllSongsCSV() {
// //   const res = await fetch("http://localhost:5000/songs?all=true");
// //   const allSongs = await res.json();
// //   downloadCSV(allSongs, "all");
// // }

// // function App() {
// //   const [songs, setSongs] = useState([]);
// //   const [page, setPage] = useState(1);
// //   const [total, setTotal] = useState(0);

// //   const [sortField, setSortField] = useState(null);
// //   const [sortOrder, setSortOrder] = useState("asc");

// //   // search state
// //   const [searchTitle, setSearchTitle] = useState("");
// //   const [searchedSong, setSearchedSong] = useState(null);
// //   const [searchError, setSearchError] = useState("");

// //   async function fetchSongs(pageNumber) {
// //     const res = await fetch(`${API_URL}?page=${pageNumber}&size=10`);
// //     const data = await res.json();

// //     setSongs(data.songs || []);
// //     setTotal(data.total || 0);
// //   }

// //   useEffect(() => {
// //     fetchSongs(page);
// //   }, [page]);

// //   function handleSort(field) {
// //     if (sortField === field) {
// //       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
// //     } else {
// //       setSortField(field);
// //       setSortOrder("asc");
// //     }
// //   }

// //   // Get Song by title handler
// //   async function handleSearch() {
// //     console.log("Get Song clicked with title:", searchTitle);

// //     if (!searchTitle.trim()) {
// //       setSearchError("Please enter a title.");
// //       return;
// //     }

// //     try {
// //       const res = await fetch(
// //         `http://localhost:5000/songs/title?title=${encodeURIComponent(
// //           searchTitle
// //         )}`
// //       );

// //       if (!res.ok) {
// //         setSearchError("Song not found.");
// //         setSongs([]); // Clear table if not found
// //         setTotal(0);
// //         return;
// //       }

// //       const data = await res.json();

// //       // Update table with the single song result
// //       setSongs([data]); 
// //       setTotal(1); // Set total to 1 so pagination shows "Page 1 of 1"
// //       setPage(1);  // Reset to page 1
// //       setSearchError("");

// //     } catch (err) {
// //       console.error(err);
// //       setSearchError("Failed to fetch song.");
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-vivpro-bg text-vivpro-navy">
// //       <div className="max-w-7xl mx-auto px-4 py-6">
// //         {/* top header bar */}
// //         <header className="bg-vivpro-teal text-white rounded-xl px-6 py-4 flex items-center justify-between shadow">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl font-bold">
// //               Vivpro Song Analytics
// //             </h1>
// //             <p className="text-sm md:text-base text-vivpro-bg/80 mt-1">
// //               Explore normalized playlist data and song attributes.
// //             </p>
// //           </div>

// //           <div className="flex items-center gap-2">
// //             <div className="h-9 w-9 rounded-full bg-vivpro-green flex items-center justify-center font-bold text-vivpro-navy">
// //               V
// //             </div>
// //             <span className="text-sm font-semibold uppercase tracking-wide">
// //               Vivpro
// //             </span>
// //           </div>
// //         </header>

// //         {/* main layout */}
// //         <main className="mt-6 grid grid-cols-12 gap-6">
// //           {/* main table area */}
// //           <section className="col-span-12 lg:col-span-7 space-y-4">
// //             <div className="bg-vivpro-card rounded-xl border border-vivpro-green/50 shadow-sm p-4">
// //               {/* header row inside card */}
// //               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
// //                 <div>
// //                   <h2 className="text-xl font-semibold">Song table</h2>
// //                   <p className="text-sm text-vivpro-gray">
// //                     Showing {songs.length} songs per page from a total of {total}.
// //                   </p>
// //                 </div>

// //                 <button
// //                   type="button"
// //                   onClick={downloadAllSongsCSV}
// //                   className="px-4 py-2 bg-vivpro-green text-white rounded-lg text-sm font-medium hover:bg-vivpro-teal transition"
// //                 >
// //                   Download all songs CSV
// //                 </button>
// //               </div>

// //               {/* search row */}
// //               <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
// //                 <input
// //                   type="text"
// //                   placeholder="Enter song title"
// //                   value={searchTitle}
// //                   onChange={(e) => setSearchTitle(e.target.value)}
// //                   className="w-full sm:w-64 px-3 py-2 border border-vivpro-teal rounded-lg focus:outline-none focus:ring-2 focus:ring-vivpro-green"
// //                 />

// //                 <button
// //                   type="button"
// //                   onClick={handleSearch}
// //                   className="px-4 py-2 bg-vivpro-teal text-white rounded-lg text-sm font-medium hover:bg-vivpro-green transition"
// //                 >
// //                   Get Song
// //                 </button>
// //               </div>

// //               <SongsTable
// //                 songs={songs}
// //                 sortField={sortField}
// //                 sortOrder={sortOrder}
// //                 onSort={handleSort}
// //               />



// //               {searchError && (
// //                 <div className="mt-4 bg-vivpro-danger text-white px-4 py-2 rounded-lg shadow">
// //                   {searchError}
// //                 </div>
// //               )}

// //               <div className="mt-4">
// //                 <Pagination
// //                   page={page}
// //                   total={total}
// //                   onNext={() => setPage((p) => p + 1)}
// //                   onPrev={() => setPage((p) => Math.max(1, p - 1))}
// //                 />
// //               </div>
// //             </div>
// //           </section>

// //           {/* right side panel */}
// //           <aside className="col-span-12 lg:col-span-5 space-y-4">
// //             <div className="bg-vivpro-card rounded-xl border border-vivpro-aqua/60 p-4 shadow-sm">
// //               <h2 className="text-lg font-semibold mb-2">Summary</h2>
// //               <p className="text-sm text-vivpro-gray">
// //                 Normalized dataset of {total} songs with attributes like
// //                 danceability, energy, tempo, and duration. Use the table to
// //                 sort, paginate, search by title, and export data as CSV.
// //               </p>
// //             </div>

// //             <div className="bg-vivpro-card rounded-xl border border-vivpro-aqua/40 p-4 shadow-sm">
// //               <h3 className="text-sm font-semibold text-vivpro-gray mb-1">
// //                 Charts and insights
// //               </h3>
// //               <p className="text-xs text-vivpro-gray">
// //                 Scatter plot, histogram, and bar charts for danceability,
// //                 duration, and tempo will be displayed here in the next steps.
// //               </p>
// //             </div>
// //           </aside>
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }

// // export default App;
// import React, { useEffect, useState } from "react";
// import SongsTable from "./components/SongsTable";
// import Pagination from "./components/Pagination";

// const API_URL = "http://localhost:5000/songs";

// // CSV download helper
// function downloadCSV(rows, name) {
//   if (!rows || rows.length === 0) return;

//   const header = Object.keys(rows[0]).join(",");
//   const data = rows.map((row) => Object.values(row).join(",")).join("\n");
//   const csvContent = header + "\n" + data;

//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//   const url = URL.createObjectURL(blob);

//   const link = document.createElement("a");
//   link.href = url;
//   link.download = `songs_${name}.csv`;
//   link.click();

//   URL.revokeObjectURL(url);
// }

// // download all songs
// async function downloadAllSongsCSV() {
//   const res = await fetch("http://localhost:5000/songs?all=true");
//   const allSongs = await res.json();
//   downloadCSV(allSongs, "all");
// }

// function App() {
//   const [songs, setSongs] = useState([]);
//   const [page, setPage] = useState(1);
//   const [total, setTotal] = useState(0);

//   const [sortField, setSortField] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");

//   // search state
//   const [searchTitle, setSearchTitle] = useState("");
//   const [searchError, setSearchError] = useState("");

//   async function fetchSongs(pageNumber) {
//     const res = await fetch(`${API_URL}?page=${pageNumber}&size=10`);
//     const data = await res.json();

//     setSongs(data.songs || []);
//     setTotal(data.total || 0);
//   }

//   useEffect(() => {
//     fetchSongs(page);
//   }, [page]);

//   function handleSort(field) {
//     if (sortField === field) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortOrder("asc");
//     }
//   }

//   // Get Song by title handler - Filters the table
//   async function handleSearch() {
//     console.log("Get Song clicked with title:", searchTitle);

//     if (!searchTitle.trim()) {
//       setSearchError("Please enter a title.");
//       return;
//     }

//     try {
//       const res = await fetch(
//         `http://localhost:5000/songs/title?title=${encodeURIComponent(
//           searchTitle
//         )}`
//       );

//       if (!res.ok) {
//         setSearchError("Song not found.");
//         setSongs([]); // Clear table if not found
//         setTotal(0);
//         return;
//       }

//       const data = await res.json();

//       // Update table with the single song result
//       setSongs([data]);
//       setTotal(1);
//       setPage(1);
//       setSearchError("");

//     } catch (err) {
//       console.error(err);
//       setSearchError("Failed to fetch song.");
//     }
//   }

//   // Reload/Reset handler to clear search
//   function handleReset() {
//     setSearchTitle("");
//     setSearchError("");
//     setPage(1);
//     fetchSongs(1);
//   }

//   return (
//     <div className="min-h-screen bg-vivpro-bg text-vivpro-navy font-sans">
//       <div className="max-w-7xl mx-auto px-4 py-6">
//         {/* Top Header Bar - Vivpro Navy Background */}
//         <header className="bg-vivpro-navy rounded-xl px-6 py-4 flex items-center justify-between shadow-lg">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
//               Vivpro Song Analytics
//             </h1>
//             <p className="text-sm md:text-base text-gray-300 mt-1">
//               Explore normalized playlist data and song attributes.
//             </p>
//           </div>

//           <div className="flex items-center gap-2">
//             {/* Logo Placeholder - Teal Accent */}
//             <div className="h-9 w-9 rounded-full bg-vivpro-teal flex items-center justify-center font-bold shadow-md">
//               V
//             </div>
//             <span className="text-sm font-semibold uppercase tracking-wide text-vivpro-teal">
//               Vivpro
//             </span>
//           </div>
//         </header>

//         {/* Main Layout */}
//         <main className="mt-6 grid grid-cols-12 gap-6">
//           {/* Main Table Area */}
//           <section className="col-span-12 lg:col-span-7 space-y-4">
//             <div className="bg-vivpro-card rounded-xl border border-vivpro-light shadow-sm p-6">
//               {/* Header Row Inside Card */}
//               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
//                 <div>
//                   <h2 className="text-xl font-bold text-vivpro-navy">Song Data</h2>
//                   <p className="text-sm text-vivpro-gray mt-1">
//                     Showing {songs.length} result(s) from {total} total records.
//                   </p>
//                 </div>

//                 <div className="flex gap-2">
//                   {total === 1 && (
//                     <button
//                       type="button"
//                       onClick={handleReset}
//                       className="px-4 py-2 bg-gray-200 text-vivpro-navy rounded-lg text-sm font-medium hover:bg-gray-300 transition"
//                     >
//                       Reset View
//                     </button>
//                   )}
//                   <button
//                     type="button"
//                     onClick={downloadAllSongsCSV}
//                     className="px-4 py-2 bg-vivpro-teal rounded-lg text-sm font-medium hover:bg-opacity-90 transition shadow-sm"
//                   >
//                     Download CSV
//                   </button>
//                 </div>
//               </div>

//               {/* Search Row */}
//               <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 bg-vivpro-mint p-4 rounded-lg border border-vivpro-teal/20">
//                 <input
//                   type="text"
//                   placeholder="Search by exact song title..."
//                   value={searchTitle}
//                   onChange={(e) => setSearchTitle(e.target.value)}
//                   className="w-full sm:flex-1 px-4 py-2 border border-vivpro-light rounded-lg focus:outline-none focus:ring-2 focus:ring-vivpro-teal text-vivpro-navy bg-white"
//                 />

//                 <button
//                   type="button"
//                   onClick={handleSearch}
//                   className="w-full sm:w-auto px-6 py-2 bg-vivpro-navy rounded-lg  text-white text-sm font-medium hover:bg-opacity-90 transition shadow-sm"
//                 >
//                   Get Song
//                 </button>
//               </div>

//               {searchError && (
//                 <div className="mb-4 bg-red-50 text-red-600 px-4 py-3 rounded-lg border border-red-100 text-sm">
//                   {searchError}
//                 </div>
//               )}

//               <SongsTable
//                 songs={songs}
//                 sortField={sortField}
//                 sortOrder={sortOrder}
//                 onSort={handleSort}
//               />

//               <div className="mt-6 border-t border-vivpro-light pt-4">
//                 <Pagination
//                   page={page}
//                   total={total}
//                   onNext={() => setPage((p) => p + 1)}
//                   onPrev={() => setPage((p) => Math.max(1, p - 1))}
//                 />
//               </div>
//             </div>
//           </section>

//           {/* Right Side Panel */}
//           <aside className="col-span-12 lg:col-span-5 space-y-4">
//             <div className="bg-vivpro-card rounded-xl border border-vivpro-light p-6 shadow-sm">
//               <h2 className="text-lg font-bold text-vivpro-navy mb-2">Platform Summary</h2>
//               <p className="text-sm text-vivpro-gray leading-relaxed">
//                 This dashboard visualizes the normalized dataset of {total} songs.
//                 Leveraging Vivpro's analytics style, you can explore attributes like
//                 danceability, energy, tempo, and duration.
//               </p>
//             </div>

//             <div className="bg-vivpro-card rounded-xl border border-vivpro-light p-6 shadow-sm h-64 flex flex-col items-center justify-center text-center bg-vivpro-mint/30">
//               <div className="h-12 w-12 bg-vivpro-teal/10 rounded-full flex items-center justify-center mb-3">
//                 <span className="text-2xl">📊</span>
//               </div>
//               <h3 className="text-md font-bold text-vivpro-navy mb-1">
//                 Visual Insights
//               </h3>
//               <p className="text-xs text-vivpro-gray max-w-xs">
//                 Scatter plots, histograms, and bar charts for data visualization
//                 will be rendered in this panel.
//               </p>
//             </div>
//           </aside>
//         </main>
//       </div>
//     </div>
//   );
// }

// export default App;
// src/App.js

import React, { useEffect, useState } from "react";

import AppHeader from "./components/AppHeader";
import SongsTable from "./components/SongsTable";
import Pagination from "./components/Pagination";
import SongSearchBar from "./components/SongSearchBar";
import SongSectionHeader from "./components/SongSectionHeader";
import SummaryPanel from "./components/SummaryPanel";
import ChartsPlaceholder from "./components/ChartsPlaceholder";
import { useSongsPage } from "./hooks/useSongsPage";
import { useSongsPage } from "./hooks/useSongsPage";

import { getAllSongs } from "./api/getAllSongs";
import { getSongByTitle } from "./api/getSongByTitle";
import { getSongsPage } from "./api/getSongsPage";

import { downloadCSV } from "./utils/downloadCSV";

function App() {
  const state = useSongsPage();
  const {
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
  } = state;
  return (
    <div className="min-h-screen bg-vivpro-bg text-vivpro-navy font-sans">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <AppHeader />

        <main className="mt-6 grid grid-cols-12 gap-6">
          {/* Left side summary */}
          <aside className="col-span-12 lg:col-span-4 space-y-4">
            <SummaryPanel />
          </aside>

          {/* Right side main table area */}
          <section className="col-span-12 lg:col-span-8 space-y-4">
            <div className="bg-vivpro-card rounded-xl border border-vivpro-light shadow-sm p-6">
              <SongSectionHeader
                songsLength={songs.length}
                total={total}
                showReset={total === 1}
                onReset={handleReset}
                onDownload={handleDownloadAllSongs}
              />

              <SongSearchBar
                value={searchTitle}
                onChange={setSearchTitle}
                onSearch={handleSearch}
                error={searchError}
              />

              <SongsTable
                songs={songs}
                sortField={sortField}
                sortOrder={sortOrder}
                onSort={handleSort}
              />

              <div className="mt-6 border-t border-vivpro-light pt-4">
                <Pagination
                  page={page}
                  total={total}
                  onNext={() => setPage((p) => p + 1)}
                  onPrev={() => setPage((p) => Math.max(1, p - 1))}
                />
              </div>
            </div>
          </section>
        </main>

        <ChartsPlaceholder songs={allSongs} />
      </div>
    </div>
  );
}

export default App;
