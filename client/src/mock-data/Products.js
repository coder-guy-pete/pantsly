import ProductVariants from './ProductVariants';

const Products = ProductVariants.reduce((acc, variant) => {
    const product = acc.find(p => p.product_id === variant.product_id);

    if (product) {
        product.sizes.push(String(variant.size));
        product.colors.push(String(variant.color));
    } else {
        acc.push({
            product_id: variant.product_id,
            name: variant.brand, // Or a more appropriate name if available
            description: `A stylish ${variant.color} ${variant.size} ${variant.brand} pants`,
            image_url: variant.image_url,
            sell_price: variant.sell_price,
            brand: variant.brand,
            sizes: [String(variant.size)],
            colors: [String(variant.color)],
        });
    }
    return acc;
}, []).map(product => ({
    ...product,
    sizes: [...new Set(product.sizes)], // Deduplicate sizes
    colors: [...new Set(product.colors)], // Deduplicate colors
}));

export default Products;
