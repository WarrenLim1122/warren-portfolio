/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, FileText, AlertCircle } from "lucide-react";

interface ImageOverlayProps {
  cert?: any | null;
  src?: string | null;
  onClose: () => void;
}

export function ImageOverlay({ cert, src, onClose }: ImageOverlayProps) {
  const displayImage = cert?.image || src;
  const displayTitle = cert?.title || "Preview";
  const displayFile = cert?.file || null;
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Reset states when the image changes
  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [displayImage]);

  return (
    <AnimatePresence>
      {(cert || src) && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[500] bg-black/95 flex items-center justify-center p-4 md:p-8 cursor-pointer backdrop-blur-md"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-6xl h-full flex items-center justify-center pointer-events-none"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative group/overlay pointer-events-auto bg-white rounded-xl shadow-2xl flex flex-col w-full max-h-[98vh]"
            >
               {/* Fixed Header */}
               <div className="bg-white border-b border-gray-100 p-4 md:p-6 flex justify-between items-center z-20 rounded-t-xl flex-shrink-0">
                 <div className="space-y-1">
                   <h3 className="font-bold text-navy text-base md:text-lg italic font-serif leading-none">{displayTitle}</h3>
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{cert?.issuer || 'Asset Review'}</p>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   {displayFile && (
                     <a 
                       href={displayFile}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="bg-gold text-white px-5 py-2 rounded-full font-bold text-[10px] flex items-center gap-2 hover:bg-navy transition-all shadow-md uppercase tracking-wider"
                     >
                       <FileText size={14} />
                       PDF
                     </a>
                   )}
                   <button 
                     onClick={onClose}
                     className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-navy hover:bg-gray-100 transition-colors rounded-full flex items-center justify-center"
                   >
                     <X size={20} />
                   </button>
                 </div>
               </div>

               {/* Image Region - Enabled scrolling and optimized for "Full Document" visibility */}
               <div className="relative flex-1 min-h-0 bg-navy/[0.02] overflow-y-auto flex flex-col items-center p-4 md:p-12 lg:p-16">
                 {!isLoaded && !hasError && (
                   <div className="absolute inset-0 flex items-center justify-center z-30">
                     <div className="w-12 h-12 border-4 border-navy/10 border-t-navy rounded-full animate-spin" />
                   </div>
                 )}
                 
                 {hasError && (
                   <div className="flex flex-col items-center gap-4 text-gray-400 py-20">
                     <AlertCircle size={48} className="opacity-20" />
                     <p className="text-sm font-bold uppercase tracking-widest">Image unavailable</p>
                   </div>
                 )}

                 {/* The "Blue Frame" container for the document */}
                 <div 
                   onClick={onClose}
                   className={`relative cursor-zoom-out transition-all duration-500 bg-white p-1 md:p-2 rounded-sm shadow-[0_40px_100px_-20px_rgba(15,48,87,0.3)] border border-navy/10 ${isLoaded && !hasError ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                 >
                   <img 
                     src={displayImage} 
                     alt={displayTitle} 
                     onLoad={() => setIsLoaded(true)}
                     onError={() => {
                       setHasError(true);
                       setIsLoaded(true);
                     }}
                     className="w-full max-w-full h-auto object-contain block" 
                     
                   />
                 </div>
                 
                 {/* Bottom Spacer to ensure shadow isn't cut off when scrolled to bottom */}
                 <div className="h-12 md:h-20 w-full flex-shrink-0" />
               </div>

               {/* Optional Footer info */}
               <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest rounded-b-xl flex-shrink-0">
                 <span>{cert?.date ? `Authenticated: ${cert.date}` : 'Confidential Document'}</span>
                 <span className="hidden md:block italic lowercase font-light font-serif text-xs px-4">Warren Lim | Premium Finance Portfolio</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
