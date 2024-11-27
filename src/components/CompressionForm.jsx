'use client';

import React, { useState } from "react";
import { Button, Textarea, Select, SelectItem } from "@nextui-org/react";

export function CompressionForm({ onCompress }) {
  const [text, setText] = useState("");
  const [algorithm, setAlgorithm] = useState("huffman");

  const handleCompress = () => {
    onCompress(text, algorithm);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Escribe o pega el texto aquí..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        minRows={5}
      />
      <div className="flex space-x-4">
        <Select
          label="Algoritmo"
          value={algorithm}
          onChange={(e) => setAlgorithm(e)}
        >
          <SelectItem key="huffman" value="huffman">Huffman</SelectItem>
          <SelectItem key="lzw" value="lzw">LZW</SelectItem>
          <SelectItem key="rle" value="rle">RLE</SelectItem>
        </Select>
        <Button 
          color="primary" 
          onPress={handleCompress} 
          isDisabled={!text}
        >
          Comprimir
        </Button>
      </div>
    </div>
  );
}
