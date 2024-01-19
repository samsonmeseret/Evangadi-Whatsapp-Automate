import React, { useState } from "react";
import * as XLSX from "xlsx";

const ExcelUploader = ({ onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });

        // Assuming you want to read data from the first sheet (index 0)
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        // Extract data from the sheet
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Pass the extracted data to the parent component
        // onFileUpload(jsonData);
        console.log(jsonData);
      };

      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ExcelUploader;
