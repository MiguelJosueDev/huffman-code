'use client';

import React, { useState } from "react";
import { Button, Textarea } from "@nextui-org/react";

export function DecompressionForm({ onDecompress }) {
  const [compressedText, setCompressedText] = useState("");

  const handleDecompress = () => {
    onDecompress(compressedText);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Pega el texto comprimido aquí..."
        value={compressedText}
        onChange={(e) => setCompressedText(e.target.value)}
        minRows={5}
      />
      <Button 
        color="primary" 
        onPress={handleDecompress} 
        isDisabled={!compressedText}
      >
        Descomprimir
      </Button>
    </div>
  );
}
