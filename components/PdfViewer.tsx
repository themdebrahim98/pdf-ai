"use client";
export default function PDFViewer({ pdfUrl }: any) {
  return (
    <div className=" h-full bg-yellow-500 w-full flex items-center">
      <iframe
        className="w-full h-full mx-auto"
        src={`${pdfUrl}#view=fitH`}
        title="PDF Viewer"
      />
    </div>
  );
}
