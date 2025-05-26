import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cat",
        required: true
    },
    subcat_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCat",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    gst: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unit: { // unit user selects to buy (e.g., g, ml, kg, liter, etc.)
        type: String,
       enum: ['Kg', 'Gm', 'Liter', 'Ml', 'Unit'],
        required: true
    },
    weight: { // how much user is buying
        type: Number,
        required: true
    },
    stockunit: { // stock unit stored (e.g., kg)
        type: String,
        enum: ['Kg', 'Gm', 'Liter', 'Ml', 'Unit'],
        required: true
    },
    stockquantity: { // actual stock amount (e.g., 10kg)
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);
export default Product;
