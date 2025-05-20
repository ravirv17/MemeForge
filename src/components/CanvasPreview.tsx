import React, { useEffect, useState, useCallback } from 'react';
import { MemeTemplate, TextLayer } from '../types';

interface CanvasPreviewProps {
  template: MemeTemplate;
  textLayers: TextLayer[];
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onUpdateLayer: (id: string, updates: Partial<TextLayer>) => void;
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({
  template,
  textLayers,
  canvasRef,
  onUpdateLayer,
}) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canvasScale, setCanvasScale] = useState(1);

  // Load template image
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = template.url;
    img.onload = () => {
      setImage(img);
    };
  }, [template.url]);

  // Calculate canvas scale
  useEffect(() => {
    if (!canvasRef.current) return;
    const containerWidth = canvasRef.current.parentElement?.clientWidth || template.width;
    const scale = containerWidth / template.width;
    setCanvasScale(scale);
  }, [template.width, canvasRef]);

  // Draw the meme on canvas
  const drawCanvas = useCallback(() => {
    if (!canvasRef.current || !image) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = template.width;
    canvas.height = template.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    
    // Draw each text layer
    textLayers.forEach((layer) => {
      const x = (layer.x / 100) * canvas.width;
      const y = (layer.y / 100) * canvas.height;
      
      ctx.save();
      
      // Set text styles
      ctx.font = `${layer.fontSize}px ${layer.fontFamily}`;
      ctx.fillStyle = layer.color;
      ctx.textAlign = layer.align;
      ctx.textBaseline = 'top';
      
      // Apply stroke if specified
      if (layer.strokeWidth > 0) {
        ctx.strokeStyle = layer.stroke;
        ctx.lineWidth = layer.strokeWidth;
        ctx.lineJoin = 'round';
      }
      
      // Split text into lines
      const lines = layer.text.split('\n');
      const displayText = lines.map(line => layer.uppercase ? line.toUpperCase() : line);
      
      // Draw each line
      displayText.forEach((line, i) => {
        const lineY = y + (i * layer.fontSize * 1.2);
        
        if (layer.strokeWidth > 0) {
          // ctx.strokeText(line, x, lineY);
        }
        // ctx.fillText(line, x, lineY);
      });
      
      ctx.restore();
    });
  }, [image, template, textLayers]);

  // Update canvas when dependencies change
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const layerId = target.dataset.id;
    
    if (layerId && target.classList.contains('meme-text')) {
      e.preventDefault();
      setIsDragging(layerId);
      
      const rect = target.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle dragging
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    // Calculate new position in percentage
    const x = ((e.clientX - canvasRect.left - dragOffset.x) / canvasRect.width) * 100;
    const y = ((e.clientY - canvasRect.top - dragOffset.y) / canvasRect.height) * 100;
    
    // Update layer position with bounds checking
    onUpdateLayer(isDragging, {
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    });
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(null);
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(null);
    }
  };

  return (
    <div 
      className="relative border border-gray-200 rounded-lg overflow-hidden bg-gray-50"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <canvas 
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{ display: 'block', margin: '0 auto' }}
      />
      
      {/* Drag handles */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          width: template.width,
          height: template.height,
          transform: `scale(${canvasScale})`,
          transformOrigin: 'top left',
        }}
      >
        {textLayers.map((layer) => {
          const style: React.CSSProperties = {
            position: 'absolute',
            top: `${layer.y}%`,
            fontSize: `${layer.fontSize}px`,
            fontFamily: layer.fontFamily,
            color: layer.color,
            textAlign: layer.align,
            textTransform: layer.uppercase ? 'uppercase' : 'none',
            cursor: isDragging === layer.id ? 'grabbing' : 'grab',
            maxWidth: '80%',
            WebkitTextStroke: layer.strokeWidth > 0 ? `${layer.strokeWidth}px ${layer.stroke}` : 'none',
            whiteSpace: 'pre-wrap',
            userSelect: 'none',
          };

          if (layer.align === 'left') style.left = `${layer.x}%`;
          else if (layer.align === 'right') style.right = `${100 - layer.x}%`;
          else {
            style.left = `${layer.x}%`;
            style.transform = 'translateX(-50%)';
          }

          return (
            <div
              key={layer.id}
              data-id={layer.id}
              className="meme-text pointer-events-auto"
              style={style}
            >
              {layer.text}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CanvasPreview;