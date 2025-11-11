'use client';

import { useState, useRef, FormEvent } from 'react';
import Image from 'next/image';
import { X, Upload } from 'lucide-react';
import { createArticle } from '@/lib/api';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

export default function NewPostModal({ isOpen, onClose, onPostCreated }: NewPostModalProps) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!title || !image) {
      alert('Please provide both title and image');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 200);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);

    const result = await createArticle(formData);
    
    clearInterval(progressInterval);
    setUploadProgress(100);
    setIsSubmitting(false);
    
    if (result) {
      setIsSuccess(true);
      setTimeout(() => {
        // Reset form
        setTitle('');
        setImage(null);
        setImagePreview('');
        setUploadProgress(0);
        setIsSuccess(false);
        onClose();
        if (onPostCreated) {
          onPostCreated();
        }
      }, 2000);
    } else {
      setUploadProgress(0);
      alert('Failed to create post. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsSubmitting(false);
    setUploadProgress(0);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setTitle('');
      setImage(null);
      setImagePreview('');
      setUploadProgress(0);
      setIsSuccess(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div className="bg-primary rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-black border-opacity-10">
          <h2 className="text-xl font-bold text-black">
            {isSuccess ? 'Success!' : 'Upload your post'}
          </h2>
          <button
            onClick={handleClose}
            className="text-black hover:opacity-70 transition-opacity"
            aria-label="Close modal"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-6 text-center">
            <p className="text-lg font-semibold text-black mb-6">
              Your post was successfully uploaded!
            </p>
            <button
              onClick={handleClose}
              className="w-full px-4 py-3 bg-black text-white rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-black rounded-lg focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black"
                placeholder="Enter post title"
                required
                disabled={isSubmitting}
              />
            </div>

            <div>
              <div className="space-y-3">
                {imagePreview ? (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    {!isSubmitting && (
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setImagePreview('');
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full aspect-video border-2 border-dashed border-black rounded-lg flex flex-col items-center justify-center hover:bg-black hover:bg-opacity-5 transition-colors"
                    disabled={isSubmitting}
                  >
                    <Upload className="w-8 h-8 text-black mb-2" />
                    <span className="text-sm text-black font-medium">Click to upload image</span>
                  </button>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {isSubmitting && (
              <div className="space-y-2">
                <div className="w-full bg-black bg-opacity-20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-black h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-black font-medium">Loading image {uploadProgress}%</span>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-black hover:opacity-70 transition-opacity font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-4 py-3 bg-black text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Uploading...' : 'Confirm'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
