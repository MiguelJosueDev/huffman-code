'use client'

import React from 'react'
import { useState } from 'react'
import { Textarea, Button, CardHeader, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Card, CardBody, Progress } from '@nextui-org/react'
import { buildCodes, buildHuffmanTree, decodeText, encodeText, getFrequencies } from './utils'
import { Upload, Zap, Shield, Sparkles } from 'lucide-react'


function FeatureItem({ icon, title, children }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0 bg-yellow-400 p-2 rounded-full text-purple-900">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-purple-200">{children}</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [decoded, setDecoded] = useState(" ");
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    let progress = 0
    const interval = setInterval(() => {
      progress += 10
      setUploadProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => setUploadProgress(0), 1000)
      }
    }, 200)
  }

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
    <>
      <div className="min-h-screen bg-gradient-to-br from-purple-700 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden z-0">
          <div className="absolute -inset-[10px] opacity-50">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full mix-blend-multiply filter blur-xl animate-blob"
                style={{
                  backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 400 + 100}px`,
                  height: `${Math.random() * 400 + 100}px`,
                  animationDelay: `${Math.random() * 10}s`,
                  animationDuration: `${Math.random() * 20 + 10}s`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10">
          {/* Navbar */}
          <Navbar className="bg-transparent">
            <NavbarBrand>
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <p className="font-bold text-inherit ml-2">CompressWizard</p>
            </NavbarBrand>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link color="foreground" href="#" aria-current="page">
                  Inicio
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="#">
                  Características
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="#">
                  Precios
                </Link>
              </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
              <Button color="warning" variant="flat">
                Iniciar sesión
              </Button>
            </NavbarContent>
          </Navbar>

          {/* Contenido principal */}
          <main className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Columna izquierda */}
              <div>
                <h1 className="text-5xl font-bold mb-6 leading-tight">
                  Comprime tus imágenes con magia
                </h1>
                <p className="text-xl mb-8 text-purple-200">
                  Optimiza tus imágenes sin perder calidad. Rápido, fácil y mágico.
                </p>
                <div className="space-y-4">
                  <FeatureItem icon={<Zap className="w-6 h-6" />} title="Compresión ultrarrápida">
                    Procesa tus imágenes en segundos
                  </FeatureItem>
                  <FeatureItem icon={<Shield className="w-6 h-6" />} title="100% seguro">
                    Tus archivos se eliminan automáticamente
                  </FeatureItem>
                  <FeatureItem icon={<Sparkles className="w-6 h-6" />} title="Calidad mágica">
                    Reduce el tamaño sin perder nitidez
                  </FeatureItem>
                </div>
              </div>

              {/* Columna derecha */}
              <div>
                <Card
                  className={`border-4 transition-all ${dragActive ? 'border-yellow-400 scale-105' : 'border-purple-400'
                    }`}
                  onDragEnter={() => setDragActive(true)}
                  onDragLeave={() => setDragActive(false)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                >
                  <CardBody className="py-12">
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
                    {/* <div className="flex flex-col items-center gap-6 text-center">
                  <div className="p-6 bg-purple-600 rounded-full">
                    <Upload className="w-12 h-12 text-yellow-400" />
                  </div>
                  <div>
                    <Button
                      color="warning"
                      size="lg"
                      className="mb-4"
                    >
                      Seleccionar archivos
                    </Button>
                    <p className="text-purple-200">
                      o arrastra y suelta tus imágenes aquí
                    </p>
                  </div>
                  {uploadProgress > 0 && (
                    <Progress
                      size="md"
                      value={uploadProgress}
                      color="warning"
                      showValueLabel={true}
                      className="max-w-md"
                    />
                  )}
                </div> */}
                  </CardBody>
                </Card>
              </div>
            </div>
          </main >
        </div >
      </div >
    </>
  )
}
