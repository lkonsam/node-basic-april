import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

import IndianFood from "../models/indianFood.model.js";
import Seller from "../models/seller.model.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper: get random sellers
const getRandomSellers = (sellerIds) => {
  const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 sellers
  const shuffled = sellerIds.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export const loadIndianFoodFromCSV = async () => {

  // 🔥 Step 1: Fetch sellers
  const sellers = await Seller.find().select('_id');

  if (!sellers.length) {
    return false; // ❌ No sellers loaded
  }

  const sellerIds = sellers.map(s => s._id);

  const results = [];

  return new Promise((resolve, reject) => {
    let index = 1;

    fs.createReadStream(path.join(__dirname, "../assets/indian_food.csv"))
      .pipe(csv())
      .on("data", (data) => {

        const randomSellers = getRandomSellers([...sellerIds]);

        results.push({
          name: data.name,
          ingredients:
            data.ingredients?.split(",").map(i => i.trim().toLowerCase()) || [],
          diet: data.diet,
          prep_time: Number(data.prep_time) || 0,
          cook_time: Number(data.cook_time) || 0,
          flavor_profile: data.flavor_profile,
          course: data.course,
          state: data.state,
          region: data.region,
          imageId: index++,

          // ✅ Add sellers here
          sellers: randomSellers
        });
      })
      .on("end", async () => {
        try {
          await IndianFood.deleteMany();

          await IndianFood.insertMany(results);

          resolve({
            message: "CSV data loaded successfully",
            count: results.length
          });

        } catch (err) {
          reject(err);
        }
      })
      .on("error", reject);
  });
};

export const getAllIndianFood = async () => {
  return await IndianFood.find({}).populate('sellers');
  // Using $lookup aggregation (alternative to populate)
  // return await IndianFood.aggregate([
  //   {
  //     $lookup: {
  //       from: 'sellers',           // Collection name (usually plural, lowercase)
  //       localField: 'sellers',     // Field in IndianFood collection
  //       foreignField: '_id',       // Field in sellers collection
  //       as: 'sellers'              // Output array field name
  //     }
  //   }
  // ]);
}

export const searchFood = async (query) => {
  // return await IndianFood.find({
  //   ingredients: {
  //     $regex: query,
  //     $options: 'i' // case-insensitive
  //   }
  // }).populate('sellers');
  // Using $lookup aggregation with search filter
  return await IndianFood.aggregate([
    {
      $match: {
        ingredients: {
          $regex: query,
          $options: 'i' // case-insensitive
        }
      }
    },
    {
      $lookup: {
        from: 'sellers',           // Collection name
        localField: 'sellers',     // Field in IndianFood collection
        foreignField: '_id',       // Field in sellers collection
        as: 'sellers'              // Output array field name
      }
    }
  ]);
};