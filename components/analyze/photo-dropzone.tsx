'use client';

import { ChangeEvent, DragEvent } from 'react';
import { ImagePlus, Trash2 } from 'lucide-react';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn, formatBytes } from '@/lib/utils';
import type { PhotoItem } from '@/lib/types';

interface PhotoDropzoneProps {
  photos: PhotoItem[];
  onAdd: (files: FileList) => void | Promise<void>;
  onRemove: (id: string) => void;
}

export function PhotoDropzone({ photos, onAdd, onRemove }: PhotoDropzoneProps) {
  const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onAdd(files);
      event.target.value = '';
    }
  };

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      onAdd(files);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  };

  return (
    <div>
      <label
        htmlFor="photo-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex cursor-pointer flex-col items-center justify-center rounded-[1.75rem] border border-dashed border-border/80 bg-surface/90 p-8 text-center transition hover:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/30"
      >
        <ImagePlus className="h-10 w-10 text-brand" aria-hidden />
        <p className="mt-4 font-serif text-xl text-ink">Add photos (optional)</p>
        <p className="mt-2 text-sm text-subtle">
          Drag and drop images here, or click to select. We recommend 2–3 recent photos.
        </p>
        <input
          id="photo-upload"
          name="photos"
          type="file"
          accept="image/*"
          multiple
          className="sr-only"
          onChange={handleSelect}
        />
      </label>

      {photos.length > 0 && (
        <m.ul
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid gap-4 md:grid-cols-3"
        >
          {photos.map((photo) => (
            <li key={photo.id} className="relative overflow-hidden rounded-[1.5rem] border border-border/70 bg-surface/95 shadow-sm">
              <img
                src={photo.url}
                alt={photo.name}
                className="h-44 w-full object-cover"
              />
              <div className="flex items-center justify-between px-4 py-3 text-sm text-subtle">
                <div>
                  <p className="font-medium text-ink">{photo.name}</p>
                  <p>{formatBytes(photo.size)}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${photo.name}`}
                  onClick={() => onRemove(photo.id)}
                >
                  <Trash2 className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </li>
          ))}
        </m.ul>
      )}
    </div>
  );
}
