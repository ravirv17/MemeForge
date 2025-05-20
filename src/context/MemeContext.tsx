import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { MemeTemplate, TextLayer, MemeData } from '../types';
import { memeTemplates } from '../data/memeTemplates';

interface MemeContextType {
  templates: MemeTemplate[];
  activeTemplate: MemeTemplate | null;
  textLayers: TextLayer[];
  savedMemes: MemeData[];
  setActiveTemplate: (template: MemeTemplate | null) => void;
  addTextLayer: () => void;
  updateTextLayer: (id: string, updates: Partial<TextLayer>) => void;
  removeTextLayer: (id: string) => void;
  saveMeme: (memeData: MemeData) => void;
  removeSavedMeme: (id: string) => void;
}

const defaultContext: MemeContextType = {
  templates: [],
  activeTemplate: null,
  textLayers: [],
  savedMemes: [],
  setActiveTemplate: () => {},
  addTextLayer: () => {},
  updateTextLayer: () => {},
  removeTextLayer: () => {},
  saveMeme: () => {},
  removeSavedMeme: () => {},
};

const MemeContext = createContext<MemeContextType>(defaultContext);

export const useMeme = () => useContext(MemeContext);

interface MemeProviderProps {
  children: ReactNode;
}

export const MemeProvider: React.FC<MemeProviderProps> = ({ children }) => {
  const [templates, setTemplates] = useState<MemeTemplate[]>(memeTemplates);
  const [activeTemplate, setActiveTemplate] = useState<MemeTemplate | null>(null);
  const [textLayers, setTextLayers] = useState<TextLayer[]>([]);
  const [savedMemes, setSavedMemes] = useState<MemeData[]>([]);

  // Load saved memes from localStorage
  useEffect(() => {
    const localSavedMemes = localStorage.getItem('savedMemes');
    if (localSavedMemes) {
      setSavedMemes(JSON.parse(localSavedMemes));
    }
  }, []);

  // Save memes to localStorage when updated
  useEffect(() => {
    localStorage.setItem('savedMemes', JSON.stringify(savedMemes));
  }, [savedMemes]);

  // Reset text layers when template changes
  useEffect(() => {
    if (activeTemplate) {
      // Create default text layers based on template
      const defaultLayers: TextLayer[] = activeTemplate.defaultTexts.map((text, index) => ({
        id: `text-${Date.now()}-${index}`,
        text,
        x: 50, // center by default
        y: 10 + index * 30, // stacked vertically
        fontSize: 32,
        fontFamily: 'Impact',
        color: '#ffffff',
        stroke: '#000000',
        strokeWidth: 2,
        align: 'center',
        uppercase: true,
      }));
      
      setTextLayers(defaultLayers);
    } else {
      setTextLayers([]);
    }
  }, [activeTemplate]);

  const addTextLayer = () => {
    const newLayer: TextLayer = {
      id: `text-${Date.now()}`,
      text: 'New Text',
      x: 50,
      y: 50,
      fontSize: 32,
      fontFamily: 'Impact',
      color: '#ffffff',
      stroke: '#000000',
      strokeWidth: 2,
      align: 'center',
      uppercase: true,
    };
    
    setTextLayers([...textLayers, newLayer]);
  };

  const updateTextLayer = (id: string, updates: Partial<TextLayer>) => {
    setTextLayers(
      textLayers.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer))
    );
  };

  const removeTextLayer = (id: string) => {
    setTextLayers(textLayers.filter((layer) => layer.id !== id));
  };

  const saveMeme = (memeData: MemeData) => {
    const newMeme = {
      ...memeData,
      id: `meme-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    setSavedMemes([newMeme, ...savedMemes]);
  };

  const removeSavedMeme = (id: string) => {
    setSavedMemes(savedMemes.filter((meme) => meme.id !== id));
  };

  return (
    <MemeContext.Provider
      value={{
        templates,
        activeTemplate,
        textLayers,
        savedMemes,
        setActiveTemplate,
        addTextLayer,
        updateTextLayer,
        removeTextLayer,
        saveMeme,
        removeSavedMeme,
      }}
    >
      {children}
    </MemeContext.Provider>
  );
};