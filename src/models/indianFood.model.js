import mongoose from 'mongoose';

const indianFoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: [{ type: String }],
  diet: String,
  prep_time: Number,
  cook_time: Number,
  flavor_profile: String,
  course: String,
  state: String,
  region: String,
  imageId: Number,

  sellers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seller' // 🔥 VERY IMPORTANT for populate
    }
  ]

}, { timestamps: true });

// Text index for search
indianFoodSchema.index({ ingredients: "text" });

export default mongoose.model("IndianFood", indianFoodSchema);