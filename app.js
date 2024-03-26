import express from 'express';
import { Product, Category } from './models/index.js'
import sequelize from './database/connection.js';
import { publishProductEvent } from './messages/product.js';

await sequelize.sync({ force: true });

const app = express();

app.get("/test", async (req, res) => {
    const createdProduct = await Product.create({ name: 'test product' });
    const createdCategory = await Category.create({ name: 'test category'});
    await createdProduct.addCategory(createdCategory);
    await publishProductEvent({ id: 123}, 'created')
    await publishProductEvent({ id: 123}, 'deleted')
    await publishProductEvent({ id: 123}, 'updated')
    await publishProductEvent({ id: 123}, 'created')
    const foundProduct = await Product.findOne({
        where: {
            name: 'test product',
        },
        include: [Category]
    })

    res.send({ data: foundProduct })
})

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log('Server is listening on port', PORT));

export default app;