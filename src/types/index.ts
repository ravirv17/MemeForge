export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
  category: string;
  defaultTexts: string[];
}

export interface TextLayer {
  id: string;
  text: string;
  x: number; // position in percentage of canvas width
  y: number; // position in percentage of canvas height
  fontSize: number;
  fontFamily: string;
  color: string;
  stroke: string;
  strokeWidth: number;
  align: 'left' | 'center' | 'right';
  uppercase: boolean;
}

export interface MemeData {
  id?: string;
  templateId: string;
  templateUrl: string;
  textLayers: TextLayer[];
  imageDataUrl?: string; // The final rendered meme as data URL
  createdAt?: string;
}

export type FontOption = {
  name: string;
  value: string;
};

export type ColorOption = {
  name: string;
  value: string;
};