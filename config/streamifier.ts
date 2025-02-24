import cloudinary from "./cloudinary";
import streamifier from "streamifier";


export const uploadImages = async (files?: Express.Multer.File[]): Promise<string[]> => {
  try {
    if (!files || files.length === 0) {
      return [];
    }

    const uploadPromises = files.map((file) => new Promise<string>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result?.secure_url || "")
      })

      streamifier.createReadStream(file.buffer).pipe(stream)
    }))

    return await Promise.all(uploadPromises)
  } catch (error: any) {
    console.log(error?.message);
    throw new Error("Failed to upload images")
  }
}