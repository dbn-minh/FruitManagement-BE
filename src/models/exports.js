import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class exports extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    export_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    warehouse_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'warehouses',
        key: 'warehouse_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'product_id'
      }
    },
    shelf_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'shelves',
        key: 'shelf_id'
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    export_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'exports',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "export_id" },
        ]
      },
      {
        name: "idx_export_warehouse_id",
        using: "BTREE",
        fields: [
          { name: "warehouse_id" },
        ]
      },
      {
        name: "idx_export_product_id",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "idx_export_shelf_id",
        using: "BTREE",
        fields: [
          { name: "shelf_id" },
        ]
      },
    ]
  });
  }
}
