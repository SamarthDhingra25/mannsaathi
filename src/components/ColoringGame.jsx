import React, { useState, useRef, useEffect } from "react";

function ColoringGame() {
  const [selectedColor, setSelectedColor] = useState("#10B981");
  const [brushSize, setBrushSize] = useState(8);
  const [isDrawing, setIsDrawing] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [paths, setPaths] = useState([]);
  const [activeTool, setActiveTool] = useState("brush");
  const [canvasBg, setCanvasBg] = useState("#1F2937");
  const [showGrid, setShowGrid] = useState(true);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const colorPalette = [
    { hex: "#10B981", name: "Emerald" },
    { hex: "#059669", name: "Teal" },
    { hex: "#047857", name: "Green" },
    { hex: "#065F46", name: "Dark Green" },
    { hex: "#34D399", name: "Mint" },
    { hex: "#A7F3D0", name: "Light Mint" },
    { hex: "#D1FAE5", name: "Pale Green" },
    { hex: "#6EE7B7", name: "Aqua" },
    { hex: "#F59E0B", name: "Amber" },
    { hex: "#EF4444", name: "Red" },
    { hex: "#3B82F6", name: "Blue" },
    { hex: "#8B5CF6", name: "Purple" },
    { hex: "#EC4899", name: "Pink" },
    { hex: "#FFFFFF", name: "White" },
    { hex: "#000000", name: "Black" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctxRef.current = ctx;

    // Draw grid
    if (showGrid) {
      drawGrid();
    }
  }, [canvasBg, showGrid]);

  const drawGrid = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = canvasBg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 1;

    // Vertical lines
    for (let x = 0; x <= canvas.width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= canvas.height; y += 50) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
  };

  const startDrawing = (e) => {
    if (activeTool === "erase") {
      ctxRef.current.globalCompositeOperation = "destination-out";
    } else {
      ctxRef.current.globalCompositeOperation = "source-over";
    }

    setIsDrawing(true);
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);
    setCurrentPath([{ x, y }]);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    ctxRef.current.closePath();

    if (currentPath.length > 0) {
      setPaths([
        ...paths,
        {
          color: activeTool === "erase" ? "#1F2937" : selectedColor,
          size: brushSize,
          points: [...currentPath],
        },
      ]);
      setCurrentPath([]);
    }
  };

  const draw = (e) => {
    if (!isDrawing) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctxRef.current.lineTo(x, y);
    ctxRef.current.strokeStyle =
      activeTool === "erase" ? "#1F2937" : selectedColor;
    ctxRef.current.lineWidth = brushSize;
    ctxRef.current.stroke();

    setCurrentPath((prev) => [...prev, { x, y }]);
  };

  const clearCanvas = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setPaths([]);
    drawGrid();
  };

  const undoLast = () => {
    if (paths.length > 0) {
      const newPaths = paths.slice(0, -1);
      setPaths(newPaths);

      // Redraw canvas
      const ctx = ctxRef.current;
      const canvas = canvasRef.current;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawGrid();

      newPaths.forEach((path) => {
        ctx.beginPath();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = path.size;
        ctx.moveTo(path.points[0].x, path.points[0].y);

        path.points.forEach((point, i) => {
          if (i > 0) {
            ctx.lineTo(point.x, point.y);
            ctx.stroke();
          }
        });
      });
    }
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "coloring-artwork.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const changeCanvasBg = (color) => {
    setCanvasBg(color);
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Redraw existing paths
    paths.forEach((path) => {
      ctx.beginPath();
      ctx.strokeStyle = path.color;
      ctx.lineWidth = path.size;
      ctx.moveTo(path.points[0].x, path.points[0].y);

      path.points.forEach((point, i) => {
        if (i > 0) {
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
        }
      });
    });

    if (showGrid) drawGrid();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-900/10 to-teal-900/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-teal-900/10 to-emerald-900/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-900/30 to-teal-900/30 rounded-full px-5 py-2.5 mb-6">
            <div className="w-2.5 h-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-emerald-300">
              Therapeutic Coloring
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">
              Creative Coloring
            </span>
            <br />
            <span className="text-gray-100">Game</span>
          </h1>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Express yourself through colors. A therapeutic activity to reduce
            stress and boost creativity.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Panel - Tools & Colors */}
          <div className="space-y-8">
            {/* Color Palette */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                Color Palette
              </h3>
              <div className="grid grid-cols-5 gap-3">
                {colorPalette.map((color) => (
                  <button
                    key={color.hex}
                    onClick={() => setSelectedColor(color.hex)}
                    className={`relative group aspect-square rounded-full border-2 transition-all duration-300 hover:scale-110 ${
                      selectedColor === color.hex
                        ? "border-emerald-400 scale-110"
                        : "border-gray-700"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColor === color.hex && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center">
                        <span className="text-xs text-gray-900">✓</span>
                      </div>
                    )}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 rounded text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Color Display */}
              <div className="mt-6 p-4 bg-gradient-to-br from-gray-800/40 to-gray-900/40 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400">Selected Color</span>
                  <span className="text-emerald-300 font-mono text-sm">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full border-2 border-gray-700"
                    style={{ backgroundColor: selectedColor }}
                  ></div>
                  <div className="flex-1">
                    <input
                      type="color"
                      value={selectedColor}
                      onChange={(e) => setSelectedColor(e.target.value)}
                      className="w-full h-10 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Brush Settings */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">🖌️</span>
                Brush Settings
              </h3>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-3">
                    <span className="text-gray-400">Brush Size</span>
                    <span className="text-emerald-400 font-mono">
                      {brushSize}px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={brushSize}
                    onChange={(e) => setBrushSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setActiveTool("brush")}
                    className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                      activeTool === "brush"
                        ? "bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border-emerald-500/50"
                        : "bg-gray-800/20 border-gray-700/30 hover:border-emerald-500/30"
                    }`}
                  >
                    <div className="text-2xl mb-2">🖌️</div>
                    <div className="text-sm font-medium">Brush</div>
                  </button>
                  <button
                    onClick={() => setActiveTool("erase")}
                    className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                      activeTool === "erase"
                        ? "bg-gradient-to-r from-rose-600/20 to-pink-600/20 border-rose-500/50"
                        : "bg-gray-800/20 border-gray-700/30 hover:border-rose-500/30"
                    }`}
                  >
                    <div className="text-2xl mb-2">🧽</div>
                    <div className="text-sm font-medium">Eraser</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Background Options */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">🎨</span>
                Canvas Background
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { color: "#1F2937", name: "Dark" },
                    { color: "#111827", name: "Black" },
                    { color: "#F9FAFB", name: "White" },
                    { color: "#ECFDF5", name: "Mint" },
                    { color: "#F0FDF4", name: "Green" },
                    { color: "#FEF3C7", name: "Cream" },
                  ].map((bg) => (
                    <button
                      key={bg.color}
                      onClick={() => changeCanvasBg(bg.color)}
                      className="group relative"
                    >
                      <div
                        className="w-full aspect-video rounded-xl border-2 border-gray-700 transition-all duration-300 hover:scale-105"
                        style={{ backgroundColor: bg.color }}
                      >
                        {canvasBg === bg.color && (
                          <div className="absolute inset-0 rounded-xl border-2 border-emerald-400"></div>
                        )}
                      </div>
                      <div className="mt-2 text-xs text-center text-gray-400">
                        {bg.name}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      showGrid
                        ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white"
                        : "bg-gray-800/50 text-gray-400 hover:bg-gray-800/70"
                    }`}
                  >
                    Grid: {showGrid ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Center - Canvas Area */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6 h-full">
              {/* Canvas Header */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-100">
                    Drawing Canvas
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Draw freely or trace the grid
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-full text-sm text-emerald-300">
                    {paths.length} strokes
                  </div>
                </div>
              </div>

              {/* Canvas Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-gray-700/50 bg-gray-900">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[500px] cursor-crosshair"
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseMove={draw}
                  onMouseLeave={stopDrawing}
                />

                {/* Drawing Indicator */}
                <div className="absolute top-4 left-4 bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-3">
                  <div
                    className="w-6 h-6 rounded-full border-2 border-gray-300"
                    style={{
                      backgroundColor:
                        activeTool === "erase" ? "#1F2937" : selectedColor,
                    }}
                  ></div>
                  <div className="text-sm text-gray-300">
                    {activeTool === "erase" ? "Eraser" : "Brush"}: {brushSize}px
                  </div>
                </div>

                {/* Instructions */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-800/80 backdrop-blur-sm rounded-full px-6 py-3">
                  <div className="text-sm text-gray-300 text-center">
                    Click and drag to draw • Hold Shift for straight lines
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
                <button
                  onClick={clearCanvas}
                  className="group px-4 py-3 bg-gradient-to-r from-rose-600/20 to-pink-600/20 border border-rose-500/30 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">🗑️</span>
                    Clear
                  </div>
                </button>
                <button
                  onClick={undoLast}
                  disabled={paths.length === 0}
                  className={`group px-4 py-3 border rounded-xl transition-all duration-300 hover:scale-105 ${
                    paths.length === 0
                      ? "bg-gray-800/20 border-gray-700/30 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-500/30 text-gray-300 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">↶</span>
                    Undo
                  </div>
                </button>
                <button
                  onClick={() => {
                    const color =
                      colorPalette[
                        Math.floor(Math.random() * colorPalette.length)
                      ].hex;
                    setSelectedColor(color);
                  }}
                  className="group px-4 py-3 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">🎲</span>
                    Random Color
                  </div>
                </button>
                <button
                  onClick={downloadDrawing}
                  className="group px-4 py-3 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-xl text-gray-300 hover:text-white transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">💾</span>
                    Save
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel - Patterns & Info */}
          <div className="space-y-8">
            {/* Coloring Patterns */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">✨</span>
                Coloring Patterns
              </h3>
              <div className="space-y-4">
                {[
                  { name: "Mandala", emoji: "🪷", difficulty: "Medium" },
                  { name: "Geometric", emoji: "🔶", difficulty: "Easy" },
                  { name: "Nature", emoji: "🌿", difficulty: "Hard" },
                  { name: "Animals", emoji: "🐾", difficulty: "Medium" },
                ].map((pattern) => (
                  <button
                    key={pattern.name}
                    className="w-full p-4 bg-gradient-to-br from-gray-800/20 to-gray-900/20 rounded-2xl border border-gray-700/30 hover:border-emerald-500/30 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{pattern.emoji}</span>
                        <span className="font-bold text-gray-100">
                          {pattern.name}
                        </span>
                      </div>
                      <span className="px-2 py-1 bg-gray-800/50 rounded-full text-xs text-gray-400">
                        {pattern.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>Click to use as template</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Therapeutic Benefits */}
            <div className="bg-gradient-to-br from-emerald-900/20 to-teal-900/20 backdrop-blur-sm border border-emerald-800/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">💆</span>
                Therapeutic Benefits
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400">🎯</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-100 mb-1">
                      Reduces Stress
                    </div>
                    <div className="text-sm text-gray-300">
                      Promotes mindfulness and relaxation
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400">🧠</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-100 mb-1">
                      Improves Focus
                    </div>
                    <div className="text-sm text-gray-300">
                      Enhances concentration abilities
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-emerald-400">✨</span>
                  </div>
                  <div>
                    <div className="font-bold text-gray-100 mb-1">
                      Boosts Creativity
                    </div>
                    <div className="text-sm text-gray-300">
                      Stimulates creative thinking
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-gray-700/30 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-gray-100 mb-6 flex items-center gap-3">
                <span className="text-2xl">💡</span>
                Quick Tips
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">1</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Start with light pressure and build up
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">2</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Try complementary colors for harmony
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">3</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Use patterns as inspiration, not rules
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-emerald-400 text-sm">4</span>
                  </div>
                  <span className="text-gray-300 text-sm">
                    Save your artwork to track progress
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slider Styles */}
        <style jsx>{`
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(to right, #10b981, #059669);
            cursor: pointer;
            border: 2px solid #1f2937;
          }
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: linear-gradient(to right, #10b981, #059669);
            cursor: pointer;
            border: 2px solid #1f2937;
          }
        `}</style>
      </div>
    </div>
  );
}

export default ColoringGame;