import mongoose, { Schema } from 'mongoose';

const ItemSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name can not be empty']
    },
    dimension: String,
    brand: String,
    price: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        default: '0'
    },
    category: { 
        type: Schema.Types.ObjectId, 
        ref: 'Category',
        required: [true, 'Associated category can not be empty']
    },
    isActive:{
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
})

const itemModel = mongoose.model('Item', ItemSchema); 
export default itemModel;