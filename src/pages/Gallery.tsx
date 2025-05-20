import React, { useState } from 'react';
import { useMeme } from '../context/MemeContext';
import { useNavigate } from 'react-router-dom';
import { Download, Share2, Trash2, Edit3, Copy } from 'lucide-react';

const Gallery: React.FC = () => {
  const { savedMemes, removeSavedMeme } = useMeme();
  const navigate = useNavigate();
  const [selectedMeme, setSelectedMeme] = useState<string | null>(null);

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
  };

  // Download meme
  const handleDownload = (imageDataUrl: string) => {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = `meme-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Share meme
  const handleShare = async (imageDataUrl: string) => {
    try {
      // Convert dataURL to Blob
      const response = await fetch(imageDataUrl);
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
        handleDownload(imageDataUrl);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('There was an error sharing your meme. Please try downloading it instead.');
    }
  };

  // Edit meme
  const handleEdit = (templateId: string) => {
    navigate(`/create/${templateId}`);
  };

  // Delete meme
  const handleDelete = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this meme?');
    if (confirmed) {
      removeSavedMeme(id);
      setSelectedMeme(null);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Meme Gallery</h1>
        <p className="text-gray-600">
          View, download, and share all your saved memes.
        </p>
      </div>
      
      {savedMemes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedMemes.map((meme) => (
            <div 
              key={meme.id} 
              className={`card overflow-hidden transition-all hover:shadow-lg group ${
                selectedMeme === meme.id ? 'ring-2 ring-primary-500 ring-offset-2' : ''
              }`}
              onClick={() => setSelectedMeme(meme.id === selectedMeme ? null : meme.id ?? null)}
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                {meme.imageDataUrl ? (
                  <img 
                    src={meme.imageDataUrl} 
                    alt="Meme" 
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Image not available
                  </div>
                )}
                
                {/* Overlay with actions when selected */}
                {selectedMeme === meme.id && (
                  <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <button
                        className="btn bg-white text-gray-800 hover:bg-gray-100 p-2 rounded-full"
                        onClick={() => handleEdit(meme.templateId)}
                        title="Edit"
                      >
                        <Edit3 size={20} />
                      </button>
                      <button
                        className="btn bg-white text-gray-800 hover:bg-gray-100 p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (meme.imageDataUrl) handleDownload(meme.imageDataUrl);
                        }}
                        title="Download"
                      >
                        <Download size={20} />
                      </button>
                      <button
                        className="btn bg-white text-gray-800 hover:bg-gray-100 p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (meme.imageDataUrl) handleShare(meme.imageDataUrl);
                        }}
                        title="Share"
                      >
                        <Share2 size={20} />
                      </button>
                      <button
                        className="btn bg-white text-red-600 hover:bg-gray-100 p-2 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (meme.id) handleDelete(meme.id);
                        }}
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Info overlay on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-white text-sm truncate">
                    {meme.createdAt ? formatDate(meme.createdAt) : 'Unknown date'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-md p-10 text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Copy className="text-gray-400" size={32} />
          </div>
          <h3 className="text-lg font-medium mb-2">No Memes Yet</h3>
          <p className="text-gray-600 mb-6">
            Start creating and saving memes to see them here.
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/create')}
          >
            Create Your First Meme
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;