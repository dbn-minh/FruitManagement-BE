import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _categories from "./categories.js";
import _exports from "./exports.js";
import _imports from "./imports.js";
import _order_products from "./order_products.js";
import _orders from "./orders.js";
import _products from "./products.js";
import _roles from "./roles.js";
import _shelves from "./shelves.js";
import _suppliers from "./suppliers.js";
import _users from "./users.js";
import _warehouses from "./warehouses.js";

export default function initModels(sequelize) {
  const categories = _categories.init(sequelize, DataTypes);
  const exports = _exports.init(sequelize, DataTypes);
  const imports = _imports.init(sequelize, DataTypes);
  const order_products = _order_products.init(sequelize, DataTypes);
  const orders = _orders.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const roles = _roles.init(sequelize, DataTypes);
  const shelves = _shelves.init(sequelize, DataTypes);
  const suppliers = _suppliers.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const warehouses = _warehouses.init(sequelize, DataTypes);

  products.belongsTo(categories, { as: "category", foreignKey: "category_id" });
  categories.hasMany(products, { as: "products", foreignKey: "category_id" });
  exports.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(exports, { as: "exports", foreignKey: "product_id" });
  imports.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(imports, { as: "imports", foreignKey: "product_id" });
  shelves.belongsTo(products, { as: "product", foreignKey: "product_id" });
  products.hasMany(shelves, { as: "shelves", foreignKey: "product_id" });
  users.belongsTo(roles, { as: "role", foreignKey: "role_id" });
  roles.hasMany(users, { as: "users", foreignKey: "role_id" });
  exports.belongsTo(shelves, { as: "shelf", foreignKey: "shelf_id" });
  shelves.hasMany(exports, { as: "exports", foreignKey: "shelf_id" });
  imports.belongsTo(suppliers, { as: "supplier", foreignKey: "supplier_id" });
  suppliers.hasMany(imports, { as: "imports", foreignKey: "supplier_id" });
  orders.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(orders, { as: "orders", foreignKey: "user_id" });
  exports.belongsTo(warehouses, {
    as: "warehouse",
    foreignKey: "warehouse_id",
  });
  warehouses.hasMany(exports, { as: "exports", foreignKey: "warehouse_id" });
  imports.belongsTo(warehouses, {
    as: "warehouse",
    foreignKey: "warehouse_id",
  });
  warehouses.hasMany(imports, { as: "imports", foreignKey: "warehouse_id" });

  return {
    categories,
    exports,
    imports,
    order_products,
    orders,
    products,
    roles,
    shelves,
    suppliers,
    users,
    warehouses,
  };
}
