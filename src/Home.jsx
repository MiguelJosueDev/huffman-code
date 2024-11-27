'use client';

import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import { Header } from "./components/Header";
import { CompressionForm } from "./components/CompressionForm";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { DecompressionForm } from "./components/DecompressionForm";
import { useCompression } from "./hooks/useCompression";

export default function Home() {
  const {
    compressedText,
    originalSize,
    compressedSize,
    decompressedText,
    handleCompress,
    handleDecompress,
  } = useCompression();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto p-4">
        <Tabs aria-label="Options">
          <Tab key="compress" title="Comprimir">
            <CompressionForm onCompress={handleCompress} />
            {compressedText && (
              <ResultsDisplay
                compressedText={compressedText}
                originalSize={originalSize}
                compressedSize={compressedSize}
              />
            )}
          </Tab>
          <Tab key="decompress" title="Descomprimir">
            <DecompressionForm onDecompress={handleDecompress} />
            {decompressedText && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Texto Descomprimido:</h2>
                <p>{decompressedText}</p>
              </div>
            )}
          </Tab>
        </Tabs>
      </main>
    </div>
  );
}
