import mongoose from "mongoose";
import SubCat from "../Model/subcategoryModel.js"

export const createSubCat = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "Image file is required" });
          }
        const subcat = new SubCat({
          cat_id:req.body.cat_id,   
          name: req.body.name,
          image: req.file.path, // optional chaining
        });
        await subcat.save();
        res.status(201).json({success:true, data:subcat });
    }catch(error){
        console.error("Error in create sub Caregory:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const getSubCat =  async(req,res) => {
    try{
        const subcat = await SubCat.find() //Replaces the cat_id field in each subcategory with the actual category data (from the Category model).
        .populate("cat_id", "name")        //Limits the fields returned from the subcategory to only:
        .select('name image cat_id');
        res.status(200).json({success: true, data: subcat });
    }catch(error){
        console.error("Error in fetching Sub Category:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
    }
};

export const getSubCatBy_Id = async (req, res) => {
  try {
    const { cat_id } = req.params; //Destructures cat_id from the URL parameters.

// If the route is /api/subcategory/6625a6...,
// then cat_id = "6625a6..."
    const subcategories = await SubCat.find({ cat_id }).select("name image cat_id"); //Uses Mongoose to find all subcategories that belong to this category (cat_id).

    if (subcategories.length === 0) {
      return res.status(404).json({ success: false, message: "No subcategories found." });
    }

    res.status(200).json({ success: true, data: subcategories });
  } catch (error) {
    console.error("Error fetching subcategories by category ID:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const updateSubCat = async (req, res) => {
    try {
      const subcatId = req.params.id;
      // Check if cat exists
      const existingSubCat = await SubCat.findById(subcatId);
      if (!existingSubCat) {
        return res.status(404).json({ success: false, message: "Sub Category not found" });
      }
      // Update fields
      if (req.body.cat_id) existingSubCat.cat_id = req.body.cat_id;
      if (req.body.name) existingSubCat.name = req.body.name;
      if (req.file) existingSubCat.image = req.file.path;
      
      await existingSubCat.save();
      res.status(200).json({ success: true, data: existingSubCat });
    } catch (error) {
      console.error("Error updating Sub Category:", error.message);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

export const deleteSubCat = async(req,res) => {
    const {id} = req.params;                                     ///{ id } means get id from the object.
                                                                 //const id means make a new variable called id.
   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({success:false, message: "Invalid Sub-Category id"})
    }
   try{
    await SubCat.findByIdAndDelete(id);
    res.status(200).json({success:true, message:"Sub-Category Deleted"});
   }catch(error){
    console.error("Error in delete Sub-Category:", error.message);
        res.status(500).json({success:false, message: "Server Error"});
   }
};
// Why use req.params?

//     To access dynamic parts of the URL.

//     For example, in the URL /api/subcategory/123:

//         123 is a dynamic ID.

//         You get it in your server code using req.params.id.

// Summary:

//     Use req.params to get values from the URL.

//     This lets your API know which specific item (like a subcategory or product) you want to work with.