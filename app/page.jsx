'use client'

import React from 'react'
import { useState } from 'react'
import { Textarea, Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import { buildCodes, buildHuffmanTree, decodeText, encodeText, getFrequencies } from './utils'

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [decoded, setDecoded] = useState(" ");

  const handleCompress = () => {
    const frequencies = getFrequencies(input)
    const huffmanTree = buildHuffmanTree(frequencies)
    const codes = buildCodes(huffmanTree)
    const encodedText = encodeText(input, codes)
    setOutput(encodedText)
  }

  const handleDescompression = () => {
    const frequencies = getFrequencies(input)
    const huffmanTree = buildHuffmanTree(frequencies)
    const decodedText = decodeText(output, huffmanTree);
    setDecoded(decodedText);
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Text Compressor</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <Textarea
            label="Enter text to compress"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your text here..."
          />
          <Button color="primary" onPress={handleCompress}>
            Compress
          </Button>
          <Button color="primary" onPress={handleDescompression}>
            Descompress
          </Button>
          <div>
            <h2 className="text-lg font-semibold mb-2">Compressed Output:</h2>
            <p className="p-2 bg-gray-200 rounded">{output}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Descompressed Output:</h2>
            <p className="p-2 bg-gray-200 rounded">{decoded}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
