import mongoose, { Schema } from 'mongoose';

const CategorySchema = new Schema({
    name: { type: String, required: [true, 'Category name cannot be empty'] },
    description: String,
}, { timestamps: true });

const categoryModel = mongoose.model('Category', CategorySchema);
export default categoryModel;