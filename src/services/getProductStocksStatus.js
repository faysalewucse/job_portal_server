const Product = require("../models/Product");

const getProductStocksStatus = async (products) => {
    const checkedProducts = [];

    for (const product of products) {
        const { productId, sku } = product;

        const foundProduct = await Product.findOne({
            _id: productId,
            sizes: {
                $elemMatch: { sku: sku, stock: { $gt: 0 } },
            },
        });

        if (foundProduct) {
            checkedProducts.push({ ...product, inStock: true });
        } else {
            checkedProducts.push({ ...product, inStock: false });
        }
    }

    return checkedProducts;
}

module.exports = getProductStocksStatus;