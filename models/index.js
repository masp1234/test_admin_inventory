import Product from './product.js'
import Category from './category.js';

Category.belongsToMany(Product, { through: 'product_category' });
Product.belongsToMany(Category, { through: 'product_category' })

export { Category, Product }