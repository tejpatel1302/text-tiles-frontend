// useBlobFromBuffer.ts
import { useEffect, useState } from "react";

function useBlobFromBuffer() {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const createBlobFromBuffer = (bufferString: string, mimetype: string): void => {
    try {
      const binary = atob(bufferString);
      const buffer = new ArrayBuffer(binary.length);
      const view = new Uint8Array(buffer);
      for (let i = 0; i < binary.length; i++) {
        view[i] = binary.charCodeAt(i);
      }
      const blob = new Blob([view], { type: mimetype });
      setBlobUrl(URL.createObjectURL(blob));
    } catch (error) {
      console.error("Error creating Blob:", error);
      setBlobUrl(null);
    }
  };

  // Clean up Blob URL when component unmounts
  useEffect(() => {
    return () => {
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [blobUrl]);

  return createBlobFromBuffer;
}

export default useBlobFromBuffer;
