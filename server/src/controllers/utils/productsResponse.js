const productsResponse = (products) => {
    const productMap = {};

            products.forEach((product) => {
            const {product_group_id, name, brand, color, size, sell_price, description, image_url} = product;

            if (!productMap[product_group_id]) {
                productMap[product_group_id] = {
                    product_group_id: product_group_id,
                    name: name,
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
                    description: description,
                }
            }

            if (!productMap[product_group_id].sizes.includes(size)) {
                productMap[product_group_id].sizes.push(size);
            }

            if (!productMap[product_group_id].colors[size].includes(color)) {
                productMap[product_group_id].colors[size].push(color);
            }
        });

        return productMap;
}

export default productsResponse;