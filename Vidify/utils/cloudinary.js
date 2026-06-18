import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
})




export default cloudinary;



// async function main() {
//   try {
  
//     const uploadResult = await cloudinary.uploader.upload(    );

//     console.log("Secure URL:", uploadResult.secure_url);
//     console.log("Public ID:", uploadResult.public_id);

//     // Fetch image metadata
//     const details = await cloudinary.api.resource(
//       uploadResult.public_id
//     );

//     console.log("Width:", details.width);
//     console.log("Height:", details.height);
//     console.log("Format:", details.format);
//     console.log("File Size (bytes):", details.bytes);

//     // f_auto = automatically choose best image format
//     // q_auto = automatically choose best image quality
//     const transformedUrl = cloudinary.url(
//       uploadResult.public_id,
//       {
//         fetch_format: "auto",
//         quality: "auto",
//       }
//     );

//     console.log(
//       "Done! Click link below to see optimized version of the image. Check the size and the format."
//     );

//     console.log("Transformed URL:", transformedUrl);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// }

// main();

