'use client'

import React from 'react'
import { useState } from 'react'
import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react"

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const handleCompress = () => {
    // Esta es una función de compresión simple que solo elimina espacios.
    // En una aplicación real, aquí iría un algoritmo de compresión más complejo.
    const compressed = input.replace(/\s+/g, '')
    setOutput(compressed)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Text Compressor</h1>
        </CardHeader>
        <CardBody className="space-y-4">
          <Input
            label="Enter text to compress"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your text here..."
          />
          <Button color="primary" onPress={handleCompress}>
            Compress
          </Button>
          <div>
            <h2 className="text-lg font-semibold mb-2">Compressed Output:</h2>
            <p className="p-2 bg-gray-200 rounded">{output}</p>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

