export const uploadImage = (req, res) => {
  res.json({
    success: true,
    url: req.file.path, 
  });
  console.log("File uploaded to Cloudinary:", req.file.path);
};