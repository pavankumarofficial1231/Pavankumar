
import jsPDF from 'jspdf';

// Pre-load images for faster generation
const preloadedImages: { [key: string]: HTMLImageElement } = {};

const resumeImages = [
  '/lovable-uploads/b5aaa162-cc81-4218-8b3d-b2259ac47460.png',
  '/lovable-uploads/81dc35e0-cdac-49f9-9ffa-89807153ed53.png',
  '/lovable-uploads/da85a3f7-5f76-4bf7-9dcf-27a230bc2662.png'
];

// Preload all images when module loads
const preloadImages = () => {
  resumeImages.forEach((imgSrc) => {
    if (!preloadedImages[imgSrc]) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = imgSrc;
      preloadedImages[imgSrc] = img;
    }
  });
};

// Initialize preloading
preloadImages();

export const generateResumePDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Function to add preloaded image to PDF instantly
  const addImageToPDF = (imgSrc: string, pageIndex: number) => {
    const img = preloadedImages[imgSrc];
    
    if (pageIndex > 0) {
      pdf.addPage();
    }
    
    // Calculate dimensions to fit A4 page
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 5;
    
    const maxWidth = pageWidth - (margin * 2);
    const maxHeight = pageHeight - (margin * 2);
    
    // Calculate aspect ratio to maintain image proportions
    const imgAspectRatio = img.width / img.height;
    const pageAspectRatio = maxWidth / maxHeight;
    
    let imgWidth, imgHeight;
    
    if (imgAspectRatio > pageAspectRatio) {
      imgWidth = maxWidth;
      imgHeight = maxWidth / imgAspectRatio;
    } else {
      imgHeight = maxHeight;
      imgWidth = maxHeight * imgAspectRatio;
    }
    
    // Center the image
    const x = (pageWidth - imgWidth) / 2;
    const y = (pageHeight - imgHeight) / 2;
    
    // Add image with high quality settings
    pdf.addImage(img, 'PNG', x, y, imgWidth, imgHeight, undefined, 'FAST');
  };

  // Add all images to PDF synchronously (no await needed)
  resumeImages.forEach((imgSrc, index) => {
    addImageToPDF(imgSrc, index);
  });
  
  // Download the PDF instantly
  pdf.save('Pavan_Kumar_S_Resume.pdf');
};
