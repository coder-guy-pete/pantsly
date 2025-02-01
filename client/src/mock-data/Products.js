import ProductVariants from './ProductVariants';

const Products = ProductVariants.reduce((acc, variant) => {
    const product = acc.find((p) => p.product_id === variant.product_id);

    const sizeAsString = String(variant.size);
    const colorAsString = String(variant.color);

    if (product) {
        product.sizes.push(sizeAsString); // Directly push the string
        product.colors.push(colorAsString); // Directly push the string
    } else {
        acc.push({
            product_id: variant.product_id,
            name: variant.brand,
            image_url: variant.image_url,
            sell_price: variant.sell_price,
            brand: variant.brand,
            sizes: [sizeAsString], // Initialize as an array of strings
            colors: [colorAsString], // Initialize as an array of strings
        });
    }
    return acc;
}, []);

// Remove duplicates *after* the reduce operation
Products.forEach(product => {
    product.sizes = Array.from(new Set(product.sizes)); // Use Set for deduplication, then convert to array
    product.colors = Array.from(new Set(product.colors)); // Use Set for deduplication, then convert to array
});


console.log("Aggregated Products:", Products);

export default Products;