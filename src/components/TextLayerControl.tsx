import React, { useState } from 'react';
import { TextLayer, FontOption, ColorOption } from '../types';
import { ChevronDown, ChevronUp, Trash2, Type, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

interface TextLayerControlProps {
  layer: TextLayer;
  onUpdate: (updates: Partial<TextLayer>) => void;
  onDelete: () => void;
  fontOptions: FontOption[];
  colorOptions: ColorOption[];
}

const TextLayerControl: React.FC<TextLayerControlProps> = ({
  layer,
  onUpdate,
  onDelete,
  fontOptions,
  colorOptions,
}) => {
  const [expanded, setExpanded] = useState(true);

  const handleAlignChange = (align: 'left' | 'center' | 'right') => {
    onUpdate({ align });
  };

  return (
    <div className="card border border-gray-200 overflow-hidden animate-scale-in">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-3 bg-gray-50 border-b border-gray-200 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2">
          <Type size={16} className="text-secondary-500" />
          <span className="font-medium truncate max-w-[200px]">
            {layer.text || 'Empty text layer'}
          </span>
        </div>
        <div className="flex items-center">
          <button
            className="text-gray-500 hover:text-red-500 p-1 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete text layer"
          >
            <Trash2 size={16} />
          </button>
          <button className="text-gray-500 p-1 ml-1">
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      
      {/* Controls */}
      {expanded && (
        <div className="p-4 space-y-4">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Text
            </label>
            <textarea
              className="input resize-y min-h-[80px]"
              value={layer.text}
              onChange={(e) => onUpdate({ text: e.target.value })}
              placeholder="Enter your text..."
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Font
              </label>
              <select
                className="input"
                value={layer.fontFamily}
                onChange={(e) => onUpdate({ fontFamily: e.target.value })}
              >
                {fontOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Font Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="12"
                  max="72"
                  value={layer.fontSize}
                  onChange={(e) => onUpdate({ fontSize: parseInt(e.target.value) })}
                  className="flex-grow"
                />
                <span className="w-8 text-center text-sm text-gray-700">
                  {layer.fontSize}
                </span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Text Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={layer.color}
                  onChange={(e) => onUpdate({ color: e.target.value })}
                  className="w-8 h-8 rounded border border-gray-300 p-0 overflow-hidden"
                />
                <select
                  className="input flex-grow"
                  value={layer.color}
                  onChange={(e) => onUpdate({ color: e.target.value })}
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Stroke Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stroke Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={layer.stroke}
                  onChange={(e) => onUpdate({ stroke: e.target.value })}
                  className="w-8 h-8 rounded border border-gray-300 p-0 overflow-hidden"
                />
                <select
                  className="input flex-grow"
                  value={layer.stroke}
                  onChange={(e) => onUpdate({ stroke: e.target.value })}
                >
                  {colorOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Stroke Width */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stroke Width
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="0.5"
                  value={layer.strokeWidth}
                  onChange={(e) => onUpdate({ strokeWidth: parseFloat(e.target.value) })}
                  className="flex-grow"
                />
                <span className="w-8 text-center text-sm text-gray-700">
                  {layer.strokeWidth}
                </span>
              </div>
            </div>
            
            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Text Alignment
              </label>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden divide-x divide-gray-300">
                <button
                  className={`flex-1 py-2 ${
                    layer.align === 'left' ? 'bg-gray-100 text-primary-600' : 'text-gray-700'
                  }`}
                  onClick={() => handleAlignChange('left')}
                >
                  <AlignLeft size={16} className="mx-auto" />
                </button>
                <button
                  className={`flex-1 py-2 ${
                    layer.align === 'center' ? 'bg-gray-100 text-primary-600' : 'text-gray-700'
                  }`}
                  onClick={() => handleAlignChange('center')}
                >
                  <AlignCenter size={16} className="mx-auto" />
                </button>
                <button
                  className={`flex-1 py-2 ${
                    layer.align === 'right' ? 'bg-gray-100 text-primary-600' : 'text-gray-700'
                  }`}
                  onClick={() => handleAlignChange('right')}
                >
                  <AlignRight size={16} className="mx-auto" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Uppercase toggle */}
          <div className="flex items-center">
            <input
              id={`uppercase-${layer.id}`}
              type="checkbox"
              checked={layer.uppercase}
              onChange={(e) => onUpdate({ uppercase: e.target.checked })}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label
              htmlFor={`uppercase-${layer.id}`}
              className="ml-2 block text-sm text-gray-700"
            >
              ALL CAPS
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextLayerControl;