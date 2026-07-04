import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ImageUploader = ({ value, onChange, label }) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    const token = localStorage.getItem('digieonix_admin_token');

    try {
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        onChange(data.url);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.message || 'Failed to upload image');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error uploading image');
    } finally {
      setIsUploading(false);
      // Reset input so the same file can be uploaded again if needed
      e.target.value = null;
    }
  };

  return (
    <div className="mb-4">
      <label className="text-gray-400 text-sm mb-2 block">{label || 'Image'}</label>
      <div className="flex items-center gap-4">
        {/* Preview */}
        {value ? (
          <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-gray-700 shrink-0 bg-black">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
            <button
              onClick={() => onChange('')}
              className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
              title="Remove image"
            >
              ×
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 rounded-xl border border-gray-700 bg-[#111111] flex items-center justify-center text-gray-500 text-xs shrink-0">
            No Img
          </div>
        )}

        {/* URL Input & Upload Button */}
        <div className="flex-1 flex flex-col gap-2">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Image URL or upload..."
            className="w-full bg-[#111111] border border-gray-800 focus:border-[#b449f6] text-white px-4 py-2 rounded-lg outline-none text-sm"
          />
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
            />
            <button
              type="button"
              disabled={isUploading}
              className={`text-xs font-semibold px-4 py-2 rounded-lg border transition-all ${
                isUploading 
                  ? 'border-gray-700 text-gray-500 bg-gray-800/50 cursor-not-allowed'
                  : 'border-[#b449f6]/40 text-[#b449f6] bg-[#b449f6]/10 hover:bg-[#b449f6]/20 cursor-pointer'
              }`}
            >
              {isUploading ? 'Uploading...' : 'Choose File to Upload'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;
