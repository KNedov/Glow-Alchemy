import Product from "../models/Product.js";

export default {
    async getAll(filter = {}) {
        let query = Product.find();

        if (filter.search) {
            query = query.find({
                name: { $regex: filter.search, $options: "i" },
            });
        }
        return query;

        // const products= await Product.find();

        // if(filter.search){
        //     products = products.filter(product => product.name.toLowerCase().includes(filter.search.toLowerCase()))
        // }
        // return products
    },

    getLatest() {
        return Product.find().sort({ _id: -1 }).limit(3);
    },

    getOne(productId) {
        return Product.findById(productId);
    },

    create(productData, ownerId) {
        return Product.create({ ...productData, owner: ownerId });
    },

    async recommend(productId, userId) {
        const product = await this.getOne(productId);
        // Check if owner
        if (product.owner.equals(userId)) {
            throw new Error("Owners cannot recommend!");
        }
        product.recommends.push(userId);
        return product.save();
        // return Product.findOneAndUpdate(productId, {
        //     $push: { recommends: userId },
        // });
    },
    async delete(productId, userId) {
        const product = await this.getOne(productId);

        if (!product.owner.equals(userId)) {
            throw new Error("Only owner can delete this product!");
        }
        return Product.findByIdAndDelete(productId);
    },
    async edit(productId, productData, userId) {
        // Check if owner
        const product = await Product.findById(productId);
        if (!product.owner.equals(userId)) {
            throw new Error("You need to be owner to edit this product!");
        }
        return Product.findByIdAndUpdate(productId, productData, {
            runValidators: true,
        });
    },
};
