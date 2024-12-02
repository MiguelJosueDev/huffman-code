'use client'

import React, { useState } from 'react'
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Card, CardBody, Progress } from '@nextui-org/react'
import { compressFile, decompressFile } from './utils'
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
  const [compressedBlob, setCompressedBlob] = useState(null);
  const [decompressedBlob, setDecompressedBlob] = useState(null);
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const handleFileUpload = async (event, action) => {
    const file = event.target.files[0];
    if (!file) return;

    if (action === "compress") {
      compressFile(file, (blob) => setCompressedBlob(blob));
    } else if (action === "decompress") {
      decompressFile(file, (blob) => setDecompressedBlob(blob));
    }
  };

  const downloadBlob = (blob, fileName) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

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
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFileUpload(e, "compress");
                  }}
                >
                  <CardBody className="py-12">
                    <div className="flex flex-col items-center gap-6 text-center">
                      <div className="p-6 bg-purple-600 rounded-full">
                        <Upload className="w-12 h-12 text-yellow-400" />
                      </div>
                      <div>
                        <input
                          type="file"
                          accept=".txt"
                          onChange={(e) => handleFileUpload(e, "compress")}
                          className="mb-4"
                        />
                        {compressedBlob && (
                          <Button
                            color="warning"
                            size="lg"
                            onClick={() => downloadBlob(compressedBlob, "compressed.json")}
                          >
                            Descargar archivo comprimido
                          </Button>
                        )}
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
                    </div>
                  </CardBody>
                </Card>
              </div>
            </div>
            <hr className="my-8" />
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Sube y descomprime un archivo</h2>
              <input
                type="file"
                accept=".json"
                onChange={(e) => handleFileUpload(e, "decompress")}
                className="mb-4"
              />
              {decompressedBlob && (
                <Button
                  color="warning"
                  size="lg"
                  onClick={() => downloadBlob(decompressedBlob, "decompressed.txt")}
                >
                  Descargar archivo descomprimido
                </Button>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
