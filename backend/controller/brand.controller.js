import Brand from '../model/brand.model.js';

// Get all brands
export const getBrands = async (req, res) => {
  try {
    const brands = await Brand.find().sort({ createdAt: -1 });
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createBrand = async (req, res) => {
  try {
    let heroImage = req.body.heroImage;
    if (req.file) {
      heroImage = req.file.path; // Cloudinary URL
    }
    const newBrand = new Brand({ heroImage });
    const savedBrand = await newBrand.save();
    res.status(201).json(savedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateBrand = async (req, res) => {
  try {
    let heroImage = req.body.heroImage;
    if (req.file) {
      heroImage = req.file.path; // New Cloudinary URL
    }
    const updatedBrand = await Brand.findByIdAndUpdate(
      req.params.id,
      { heroImage },
      { returnDocument: 'after', runValidators: true }
    );
    if (!updatedBrand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json(updatedBrand);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete brand (Admin only)
export const deleteBrand = async (req, res) => {
  try {
    const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
    if (!deletedBrand) return res.status(404).json({ message: 'Brand not found' });
    res.status(200).json({ message: 'Brand deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
