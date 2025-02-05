const productResponse = (products) => {
    const productMap = {};

            products.forEach((product) => {
            const {productId, product_name, brand, color, size, sell_price, stock_quantity, image_url} = product;

            if (!productMap[productId]) {
                productMap[productId] = {
                    product_group_id: productId,
                    name: product_name,
                    image_url: image_url,
                    brand: brand,
                    price: sell_price,
                    sizes: [],
                    colors: {
                        s: [],
                        m: [],
                        l: [],
                        xl: [],
                        xxl: [],
                        xxxl: [],
                    },
                    description: '',
                    quantity: stock_quantity,
                }
            }

            if (!productMap[productId].sizes.includes(size)) {
                productMap[productId].sizes.push(size);
            }

            if (!productMap[productId].colors[size].includes(color)) {
                productMap[productId].colors[size].push(color);
            }
        });

        return productMap;
}

export default productResponse;