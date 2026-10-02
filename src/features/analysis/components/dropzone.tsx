"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FileSearchIcon, FileIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatBytes } from "@/features/shared/utils/format";

interface DropzoneProps {
  accept?: string;
  hint: string;
  file: File | null;
  error: string | null;
  onFile: (file: File | null) => void;
}

export default function Dropzone({ accept, hint, file, error, onFile }: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <div className="space-y-4">
      <motion.button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(event) => {
          // ignore leave events fired when moving over the children
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          const dropped = event.dataTransfer.files?.[0];
          if (dropped) onFile(dropped);
        }}
        animate={{ scale: dragging ? 1.015 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
        className={cn(
          "group relative flex w-full cursor-pointer flex-col items-center gap-5 overflow-hidden rounded-2xl border-2 border-dashed px-6 py-12 text-center outline-none transition-colors duration-300 focus-visible:border-custom-primary focus-visible:ring-4 focus-visible:ring-custom-primary/30 md:py-16",
          dragging
            ? "border-solid border-custom-primary bg-custom-primary/10"
            : "border-custom-primary/50 hover:border-custom-primary hover:bg-custom-primary/5"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,224,0.12),transparent_60%)]" />

        <motion.span
          animate={dragging ? { y: -6, scale: 1.1 } : { y: [0, -6, 0], scale: 1 }}
          transition={dragging ? { duration: 0.2 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex size-24 items-center justify-center rounded-full border border-custom-primary/70 bg-dark-blue text-custom-primary shadow-lg shadow-custom-primary/20"
        >
          <span aria-hidden className="absolute inset-0 rounded-full border border-custom-primary/40 motion-safe:animate-ping [animation-duration:3s]" />
          <FileSearchIcon aria-hidden className="size-12" strokeWidth={1.5} />
        </motion.span>

        <span className="relative space-y-1">
          <span className="block text-lg font-bold text-white md:text-xl">
            {dragging ? "Drop the file to select it" : "Drag a file here, or "}
            {!dragging && <span className="text-custom-primary underline underline-offset-4">browse</span>}
          </span>
          <span className="block text-sm text-gray-400">{hint}</span>
        </span>
      </motion.button>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        tabIndex={-1}
        className="sr-only"
        aria-label="Choose a file to analyze"
        onChange={(event) => {
          onFile(event.target.files?.[0] ?? null);
          // allow choosing the same file again after removing it
          event.target.value = "";
        }}
      />

      <AnimatePresence initial={false}>
        {file && (
          <motion.div
            key="chip"
            initial={{ opacity: 0, height: 0, y: -8 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="flex items-center gap-3 rounded-xl border border-custom-primary/60 bg-custom-primary/5 px-4 py-3">
              <FileIcon aria-hidden className="size-6 shrink-0 text-custom-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-white" title={file.name}>
                  {file.name}
                </p>
                <p className="text-xs text-gray-400">{formatBytes(file.size)}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label={`Remove ${file.name}`}
                onClick={() => onFile(null)}
                className="text-gray-300 hover:text-white"
              >
                <XIcon />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <p role="alert" className="min-h-5 text-center text-sm text-red-400">
        {error}
      </p>
    </div>
  );
}
