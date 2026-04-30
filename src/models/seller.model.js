// models/seller.model.js
import mongoose from 'mongoose';

const sellerSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
    rating: Number
});

export default mongoose.model('Seller', sellerSchema);