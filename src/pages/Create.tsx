import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMeme } from '../context/MemeContext';
import { TextLayer, MemeTemplate, MemeData } from '../types';
import { Sliders, Download, Share2, Save, Trash2, Plus, RefreshCw, Edit3 } from 'lucide-react';
import { fontOptions, colorOptions } from '../data/memeTemplates';

import TemplateSelector from '../components/TemplateSelector';
import TextLayerControl from '../components/TextLayerControl';
import CanvasPreview from '../components/CanvasPreview';

const Create: React.FC = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showTemplateSelector, setShowTemplateSelector] = useState(!templateId);
  
  const { 
    templates, 
    activeTemplate, 
    setActiveTemplate,
    textLayers,
    addTextLayer,
    updateTextLayer,
    removeTextLayer,
    saveMeme,
  } = useMeme();

  // Set active template from URL param
  useEffect(() => {
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        setActiveTemplate(template);
      }
    }
  }, [templateId, templates, setActiveTemplate]);

  // Generate the meme image
  const generateMeme = () => {
    if (!activeTemplate || !canvasRef.current) return null;
    
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    const memeData: MemeData = {
      templateId: activeTemplate.id,
      templateUrl: activeTemplate.url,
      textLayers: [...textLayers],
      imageDataUrl: dataUrl,
    };
    
    return memeData;
  };

  // Save the meme
  const handleSaveMeme = () => {
    const memeData = generateMeme();
    if (memeData) {
      saveMeme(memeData);
      alert('Meme saved to your gallery!');
    }
  };

  // Download the meme
  const handleDownloadMeme = () => {
    const memeData = generateMeme();
    if (memeData && memeData.imageDataUrl) {
      const link = document.createElement('a');
      link.href = memeData.imageDataUrl;
      link.download = `meme-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Share the meme
  const handleShareMeme = async () => {
    const memeData = generateMeme();
    if (!memeData || !memeData.imageDataUrl) return;
    
    try {
      // Convert dataURL to Blob
      const response = await fetch(memeData.imageDataUrl);
      const blob = await response.blob();
      const file = new File([blob], 'meme.png', { type: 'image/png' });
      
      // Check if Web Share API is available
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Check out my meme!',
          text: 'I created this meme with MemeForge',
          files: [file],
        });
      } else {
        // Fallback to clipboard copy
        alert('Sharing not supported on this browser. The image has been downloaded instead.');
        handleDownloadMeme();
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('There was an error sharing your meme. Please try downloading it instead.');
    }
  };

  // If no template selected, show template selector
  if (!activeTemplate || showTemplateSelector) {
    return (
      <TemplateSelector 
        onSelect={(template) => {
          setActiveTemplate(template);
          setShowTemplateSelector(false);
          navigate(`/create/${template.id}`);
        }} 
      />
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left column - Meme canvas */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-md p-4 sticky top-24">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Meme Preview</h2>
              <button 
                className="btn btn-outline flex items-center gap-1 py-1"
                onClick={() => setShowTemplateSelector(true)}
              >
                <RefreshCw size={16} />
                <span>Change Template</span>
              </button>
            </div>
            
            <CanvasPreview 
              template={activeTemplate}
              textLayers={textLayers}
              canvasRef={canvasRef}
              onUpdateLayer={updateTextLayer}
            />
            
            <div className="flex flex-wrap gap-2 mt-4">
              <button 
                className="btn btn-primary flex items-center gap-1"
                onClick={handleSaveMeme}
              >
                <Save size={18} />
                <span>Save</span>
              </button>
              <button 
                className="btn btn-secondary flex items-center gap-1"
                onClick={handleDownloadMeme}
              >
                <Download size={18} />
                <span>Download</span>
              </button>
              <button 
                className="btn btn-accent flex items-center gap-1"
                onClick={handleShareMeme}
              >
                <Share2 size={18} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right column - Controls */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Sliders size={20} className="text-secondary-500" />
                <span>Text Controls</span>
              </h2>
              <button 
                className="btn btn-outline flex items-center gap-1 py-1"
                onClick={addTextLayer}
              >
                <Plus size={16} />
                <span>Add Text</span>
              </button>
            </div>
            
            <div className="space-y-6">
              {textLayers.map((layer) => (
                <TextLayerControl
                  key={layer.id}
                  layer={layer}
                  onUpdate={(updates) => updateTextLayer(layer.id, updates)}
                  onDelete={() => removeTextLayer(layer.id)}
                  fontOptions={fontOptions}
                  colorOptions={colorOptions}
                />
              ))}
              
              {textLayers.length === 0 && (
                <div className="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
                  <Edit3 size={24} className="mx-auto mb-2 text-gray-400" />
                  <p>Click "Add Text" to add text layers to your meme</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;