import cloudinary from "./cloudinary";
import streamfier from "streamifier";


export const uploadImages = async (files?: Express.Multer.File[]): Promise<string[]> => {
    try {
      if (!files || files.length === 0) {
        return []; // Return an empty array if no images are uploaded
      }
  
      const uploadPromises = files.map(
        (file) =>
          new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              (error, result) => {
                if (error) return reject(error);
                resolve(result?.secure_url || "");
              }
            );
  
            streamfier.createReadStream(file.buffer).pipe(stream);
          })
      );
  
      return await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  };