'use client';

import React from "react";
import { Button, Textarea } from "@nextui-org/react";

export function ResultsDisplay({ compressedText, originalSize, compressedSize }) {
  const compressionPercentage = ((originalSize - compressedSize) / originalSize * 100).toFixed(2);

  const handleCopy = () => {
    navigator.clipboard.writeText(compressedText);
  };

  const handleDownload = () => {
    const blob = new Blob([compressedText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed_text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <Textarea value={compressedText} readOnly minRows={5} />
      <div className="flex justify-between items-center">
        <div>
          <p>Tamaño original: {originalSize} bytes</p>
          <p>Tamaño comprimido: {compressedSize} bytes</p>
          <p>Porcentaje de compresión: {compressionPercentage}%</p>
        </div>
        <div className="space-x-2">
          <Button color="primary" onPress={handleCopy}>Copiar</Button>
          <Button color="secondary" onPress={handleDownload}>Descargar</Button>
        </div>
      </div>
    </div>
  );
}
