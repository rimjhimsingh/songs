// CSV download helper
export function downloadCSV(rows, name) {
    if (!rows || rows.length === 0) return;
  
    const header = Object.keys(rows[0]).join(",");
    const data = rows.map((row) => Object.values(row).join(",")).join("\n");
    const csvContent = header + "\n" + data;
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = url;
    link.download = `songs_${name}.csv`;
    link.click();
  
    URL.revokeObjectURL(url);
  }
  