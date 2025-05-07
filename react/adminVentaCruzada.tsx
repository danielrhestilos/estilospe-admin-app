import React, { useState} from "react";
import * as XLSX from "xlsx";


type RowData = Record<string, string | number | boolean | null>;

const ExcelToJsonViewer: React.FC = () => {
  const [jsonData, setJsonData] = useState<RowData[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result || typeof result === "string") return;
  
      const data = new Uint8Array(result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: "array" });
  
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json: RowData[] = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
  
      setJsonData(json);
    };
  
    reader.readAsArrayBuffer(file);
  };

  return (
    <div style={{ padding: "1rem", fontFamily: "Outfit" }}>
      <h2>App </h2>
      ---
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

      {jsonData.length > 0 && (
        <>
          <h3>Vista previa del contenido:</h3>
          <table cellPadding={8} style={{ borderCollapse: "collapse", marginBottom: "1rem" }}>
            <thead>
              <tr>
                {Object.keys(jsonData[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {jsonData.map((row, index) => (
                <tr key={index}>
                  {Object.values(row).map((value, idx) => (
                    <td key={idx}>{String(value)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <h3>JSON generado:</h3>
          <pre style={{ background: "#f4f4f4", padding: "1rem", overflowX: "auto" }}>
            {JSON.stringify(jsonData, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
};

export default ExcelToJsonViewer;