import React, { useState, useCallback } from 'react';
import { editImageWithGemini } from '../services/geminiService';
import { Wand2, Upload, Loader2, Save, X } from 'lucide-react';

interface GeminiImageEditorProps {
  onSave: (imageData: string) => void;
  onCancel: () => void;
}

const GeminiImageEditor: React.FC<GeminiImageEditorProps> = ({ onSave, onCancel }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setEditedImage(null);
      setError(null);
    }
  };

  const handleEdit = async () => {
    if (!selectedFile || !prompt) return;

    setIsProcessing(true);
    setError(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        // Remove data URL prefix
        const base64Data = base64String.split(',')[1];
        const mimeType = selectedFile.type;

        try {
          const resultBase64 = await editImageWithGemini(base64Data, mimeType, prompt);
          if (resultBase64) {
            setEditedImage(`data:image/png;base64,${resultBase64}`);
          } else {
            setError("The AI finished but didn't return an image. Try a different prompt.");
          }
        } catch (err) {
            console.error(err);
          setError("Failed to process image. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      };
    } catch (err) {
      setError("Error reading file.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold flex items-center gap-2 text-brand-700">
            <Wand2 className="w-6 h-6 text-brand-500" />
            AI Image Studio
          </h2>
          <button onClick={onCancel} className="p-2 hover:bg-slate-100 rounded-full">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col md:flex-row gap-6">
          
          {/* Left: Input */}
          <div className="flex-1 space-y-4">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors relative min-h-[200px]">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Original" 
                  className="max-h-64 rounded-md object-contain" 
                />
              ) : (
                <div className="text-slate-400">
                  <Upload className="w-10 h-10 mx-auto mb-2" />
                  <p>Upload a photo for your report</p>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Magic Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Enhance lighting', 'Remove background person', 'Add a safety helmet overlay'"
                className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 focus:outline-none h-24 resize-none"
              />
            </div>

            <button
              onClick={handleEdit}
              disabled={!selectedFile || !prompt || isProcessing}
              className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 text-white transition-all ${
                !selectedFile || !prompt || isProcessing
                  ? 'bg-slate-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-700 hover:to-purple-700 shadow-lg'
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating Magic...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Edit
                </>
              )}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Right: Output */}
          <div className="flex-1 bg-slate-50 rounded-lg p-4 flex flex-col items-center justify-center border border-slate-200 min-h-[300px]">
            {editedImage ? (
              <div className="space-y-4 w-full">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider text-center">Result</h3>
                <img 
                  src={editedImage} 
                  alt="AI Result" 
                  className="w-full h-auto rounded-lg shadow-md object-contain max-h-[400px]" 
                />
                <button
                  onClick={() => onSave(editedImage)}
                  className="w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium"
                >
                  <Save className="w-5 h-5" />
                  Use This Image
                </button>
              </div>
            ) : (
              <div className="text-slate-400 text-center">
                <Wand2 className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>Generated image will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiImageEditor;
