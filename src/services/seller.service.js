import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import { fileURLToPath } from 'url';

import Seller from '../models/seller.model.js';

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const loadSellerDataFromCSV = async () => {
    const results = [];
    return new Promise((resolve, reject) => {

      fs.createReadStream(path.join(__dirname, "../assets/sellers.csv"))
        .pipe(csv())
        .on("data", (data) => {
          // Skip empty rows
          if (!data.name) return;

          results.push({
            name: data.name?.trim(),
            email: data.email?.trim(),
            city: data.city?.trim(),
            rating: Number(data.rating) || 0, // ✅ FIXED
          });
        })
        .on("end", async () => {
          try {
            await Seller.deleteMany(); // ⚠️ optional (use only in dev)
            await Seller.insertMany(results);

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


export const createSeller = async (body) => {
    return await Seller.create({
        name: body.name,
        email: body.email,
        city: body.city,
        rating: Number(body.rating) || 0,
    });
}

export const getAllSeller = async () => {
    return await Seller.find({});
}