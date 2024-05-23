CREATE DATABASE db_manach;

USE db_manach;

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` INT NOT NULL AUTO_INCREMENT,
  `supplier_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `warehouses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouses` (
  `warehouse_id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT DEFAULT NULL,
  PRIMARY KEY (`warehouse_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` INT NOT NULL AUTO_INCREMENT,
  `category_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_img` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_description` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_description` TEXT COLLATE utf8mb4_unicode_ci,
  `selling_price` FLOAT DEFAULT NULL,
  `import_price` FLOAT DEFAULT NULL,
  `product_condition` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `product_img` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
  `category_id` INT DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `shelves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelves` (
  `shelf_id` INT NOT NULL AUTO_INCREMENT,
  `quantity` FLOAT DEFAULT NULL,
  `category_id` INT DEFAULT NULL,
  `date_on_shelf` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`shelf_id`),
  FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `imports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imports` (
  `import_id` INT NOT NULL AUTO_INCREMENT,
  `warehouse_id` INT DEFAULT NULL,
  `supplier_id` INT DEFAULT NULL,
  `product_id` INT DEFAULT NULL,
  `quantity` FLOAT DEFAULT NULL,
  `import_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`import_id`),
  FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`),
  FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `exports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exports` (
  `export_id` INT NOT NULL AUTO_INCREMENT,
  `warehouse_id` INT DEFAULT NULL,
  `product_id` INT DEFAULT NULL,
  `shelf_id` INT DEFAULT NULL,
  `quantity` FLOAT DEFAULT NULL,
  `export_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`export_id`),
  FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  FOREIGN KEY (`shelf_id`) REFERENCES `shelves` (`shelf_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` INT NOT NULL AUTO_INCREMENT,
  `role_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` VARCHAR(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` INT DEFAULT NULL,
  `full_name` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bank_account` VARCHAR(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT DEFAULT NULL,
  `order_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `total_price` FLOAT DEFAULT NULL,
  `order_quantity` INT DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `order_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products` (
  `order_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `order_product_quantity` INT DEFAULT NULL,
  PRIMARY KEY (`order_id`, `product_id`),
  FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `warehouse_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `warehouse_products` (
  `warehouse_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` FLOAT DEFAULT 0,
  PRIMARY KEY (`warehouse_id`, `product_id`),
  FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`warehouse_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `shelf_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shelf_products` (
  `shelf_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` FLOAT DEFAULT 0,
  PRIMARY KEY (`shelf_id`, `product_id`),
  FOREIGN KEY (`shelf_id`) REFERENCES `shelves` (`shelf_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Add indexes to foreign key columns
CREATE INDEX `idx_import_warehouse_id` ON `imports` (`warehouse_id`);
CREATE INDEX `idx_import_product_id` ON `imports` (`product_id`);
CREATE INDEX `idx_import_supplier_id` ON `imports` (`supplier_id`);

CREATE INDEX `idx_export_warehouse_id` ON `exports` (`warehouse_id`);
CREATE INDEX `idx_export_product_id` ON `exports` (`product_id`);
CREATE INDEX `idx_export_shelf_id` ON `exports` (`shelf_id`);



