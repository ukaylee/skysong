import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { v4 as uuidv4 } from "uuid";

function FileUpload({ folder, type, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const allowedTypes = {
    image: ["image/jpeg", "image/png", "image/webp"],
    xml: ["text/xml", "application/xml"],
  };
  const maxSize = 5 * 1024 * 1024;

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const isValid =
        allowedTypes[type]?.includes(file.type) && file.size <= maxSize;

      if (!isValid) {
        throw new Error("Invalid file type or size.");
      }

      const fileName = `${folder}/${uuidv4()}_${file.name}`; // this is how it determines if it goes in img or file bucket

      const { error: uploadError } = await supabase.storage
        .from("songs-data")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("songs-data")
        .getPublicUrl(fileName);

      if (!data?.publicUrl) throw new Error("Failed to get public URL");

      // Send URL back to parent
      onUploadComplete(data.publicUrl);
    } catch (err) {
      setError(err.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        className="file-input file-input"
        accept={type === "image" ? "image/*" : ".xml"}
        onChange={handleFileChange} //the event is the change
        disabled={uploading}
      />
      {uploading && <p>Uploading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default FileUpload;
