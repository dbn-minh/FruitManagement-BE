import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _categories from  "./categories.js";
import _exports from  "./exports.js";
import _imports from  "./imports.js";
import _order_products from  "./order_products.js";
import _orders from  "./orders.js";
import _products from  "./products.js";
import _roles from  "./roles.js";
import _shelf_products from  "./shelf_products.js";
import _shelves from  "./shelves.js";
import _suppliers from  "./suppliers.js";
import _users from  "./users.js";
import _warehouse_products from  "./warehouse_products.js";
import _warehouses from  "./warehouses.js";

export default function initModels(sequelize) {
  const categories = _categories.init(sequelize, DataTypes);
  const exports = _exports.init(sequelize, DataTypes);
  const imports = _imports.init(sequelize, DataTypes);
  const order_products = _order_products.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const shelf_products = _shelf_products.init(sequelize, DataTypes);
  const shelves = _shelves.init(sequelize, DataTypes);
  const suppliers = _suppliers.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const warehouse_products = _warehouse_products.init(sequelize, DataTypes);
  const warehouses = _warehouses.init(sequelize, DataTypes);

  orders.belongsToMany(products, { as: 'product_id_products', through: order_products, foreignKey: "order_id", otherKey: "product_id" });
  products.belongsToMany(orders, { as: 'order_id_orders', through: order_products, foreignKey: "product_id", otherKey: "order_id" });
  products.belongsToMany(shelves, { as: 'shelf_id_shelves', through: shelf_products, foreignKey: "product_id", otherKey: "shelf_id" });
  products.belongsToMany(warehouses, { as: 'warehouse_id_warehouses', through: warehouse_products, foreignKey: "product_id", otherKey: "warehouse_id" });
  shelves.belongsToMany(products, { as: 'product_id_products_shelf_products', through: shelf_products, foreignKey: "shelf_id", otherKey: "product_id" });
  warehouses.belongsToMany(products, { as: 'product_id_products_warehouse_products', through: warehouse_products, foreignKey: "warehouse_id", otherKey: "product_id" });
  products.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  shelves.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(shelves, { as: "shelves", foreignKey: "category_id"});
  order_products.belongsTo(orders, { as: "order", foreignKey: "order_id"});
  orders.hasMany(order_products, { as: "order_products", foreignKey: "order_id"});
  exports.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(exports, { as: "exports", foreignKey: "product_id"});
  imports.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(imports, { as: "imports", foreignKey: "product_id"});
  order_products.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(order_products, { as: "order_products", foreignKey: "product_id"});
  shelf_products.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(shelf_products, { as: "shelf_products", foreignKey: "product_id"});
  warehouse_products.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(warehouse_products, { as: "warehouse_products", foreignKey: "product_id"});
  users.belongsTo(roles, { as: "role", foreignKey: "role_id"});
  roles.hasMany(users, { as: "users", foreignKey: "role_id"});
  exports.belongsTo(shelves, { as: "shelf", foreignKey: "shelf_id"});
  shelves.hasMany(exports, { as: "exports", foreignKey: "shelf_id"});
  shelf_products.belongsTo(shelves, { as: "shelf", foreignKey: "shelf_id"});
  shelves.hasMany(shelf_products, { as: "shelf_products", foreignKey: "shelf_id"});
  imports.belongsTo(suppliers, { as: "supplier", foreignKey: "supplier_id"});
  suppliers.hasMany(imports, { as: "imports", foreignKey: "supplier_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});
  exports.belongsTo(warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  warehouses.hasMany(exports, { as: "exports", foreignKey: "warehouse_id"});
  imports.belongsTo(warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  warehouses.hasMany(imports, { as: "imports", foreignKey: "warehouse_id"});
  warehouse_products.belongsTo(warehouses, { as: "warehouse", foreignKey: "warehouse_id"});
  warehouses.hasMany(warehouse_products, { as: "warehouse_products", foreignKey: "warehouse_id"});

  return {
    categories,
    exports,
    imports,
    order_products,
    orders,
    products,
    roles,
    shelf_products,
    shelves,
    suppliers,
    users,
    warehouse_products,
    warehouses,
  };
}
