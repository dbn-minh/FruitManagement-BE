import mysql.connector
from faker import Faker
import random

total_product = 66
total_supplier = 10
total_category = 10
total_shelf = 10
total_user = 10
total_order = 100

# Create a connection to your MySQL database
conn = mysql.connector.connect(
    host='localhost',  # Separate host 
    port=3306,         # Separate port
    user='root',
    password='MaL1504@',
    database='db_manach'
)
cursor = conn.cursor()

# Initialize Faker
fake = Faker()

# Generate fake data for roles
roles = ['admin', 'customer', 'manager']
for role_name in roles:
    cursor.execute("INSERT INTO roles (role_name) VALUES (%s)", (role_name,))
    
conn.commit()

# Generate fake data for suppliers
for _ in range(total_supplier):
    supplier_name = fake.company()
    cursor.execute("INSERT INTO suppliers (supplier_name) VALUES (%s)", (supplier_name,))
    
conn.commit()

# Generate fake data for categories
categories = [(1, "Mango", "This is a good mango", 'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg' ), 
(2, "Banana", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'),
 (3, "Papaya", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'), 
 (4, "Coconut", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'),
 (5, "Blackberry", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'),
 (6, "Blueberry", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'), 
 (7, "Rasberry", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'),
 (8, "Durian", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'), 
 (9, "Strawberry", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg'),
 (10, "Pineapple", "This is a good mango",'https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg')]
for category in categories:
    cursor.execute("INSERT INTO categories (category_id, category_name, category_img, category_description) VALUES (%s, %s, %s, %s)", category)

# Generate fake data for products
products = [
    (1,'Keit Mango','This is a good keit mango',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(2,'Honey Mango','This is a good honey mango',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(3,'Haden Mango','This is a good haden mango',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(4,'Keit Mango','This is a good keit mango',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(5,'Honey Mango','This is a good honey mango',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(6,'Haden Mango','This is a good haden mango',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(7,'Keit Mango','This is a good keit mango',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(8,'Honey Mango','This is a good honey mango',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(9,'Haden Mango','This is a good haden mango',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',1),
(10,'Apple Banana','This is a good apple banana',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(11,'Apple Banana','This is a good apple banana',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(12,'Apple Banana','This is a good apple banana',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(13,'Red Banana','This is a good red banana',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(14,'Red Banana','This is a good red banana',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(15,'Red Banana','This is a good red banana',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(16,'Cavendish Banana','This is a good cavendish banana',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(17,'Cavendish Banana','This is a good cavendish banana',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(18,'Cavendish Banana','This is a good cavendish banana',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',2),
(19,'Bettina Papaya','This is a good bettina papaya',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(20,'Bettina Papaya','This is a good bettina papaya',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(21,'Bettina Papaya','This is a good bettina papaya',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(22,'Sunrise Papaya','This is a good sunrise papaya',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(23,'Sunrise Papaya','This is a good sunrise papaya',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(24,'Sunrise Papaya','This is a good sunrise papaya',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(25,'Red/Yellow Papaya','This is a good red/yellow papaya',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(26,'Red/Yellow Papaya','This is a good red/yellow papaya',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(27,'Red/Yellow Papaya','This is a good red/yellow papaya',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',3),
(28,'Pineapple Coconut','This is a good pineapple coconut',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(29,'Pineapple Coconut','This is a good pineapple coconut',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(30,'Pineapple Coconut','This is a good pineapple coconut',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(31,'Strawberry Coconut','This is a good strawberry coconut',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(32,'Strawberry Coconut','This is a good strawberry coconut',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(33,'Strawberry Coconut','This is a good strawberry coconut',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(34,'Green Siamese Coconut','This is a good green siamese coconut',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(35,'Green Siamese Coconut','This is a good green siamese coconut',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(36,'Green Siamese Coconut','This is a good green siamese coconut',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',4),
(37,'Blackberry','This is a good blackberry',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',5),
(38,'Blackberry','This is a good blackberry',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',5),
(39,'Blackberry','This is a good blackberry',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',5),
(40,'Blueberry','This is a good blueberry',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',6),
(41,'Blueberry','This is a good blueberry',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',6),
(42,'Blueberry','This is a good blueberry',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',6),
(43,'Raspberry','This is a good raspberry',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',7),
(44,'Raspberry','This is a good raspberry',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',7),
(45,'Raspberry','This is a good raspberry',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',7),
(46,'Golden Phoenix Durian','This is a good Golden Phoenix durian',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(47,'Golden Phoenix Durian','This is a good Golden Phoenix durian',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(48,'Golden Phoenix Durian','This is a good Golden Phoenix durian',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(49,'Red Prawn Durian','This is a good Red Prawn durian',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(50,'Red Prawn Durian','This is a good Red Prawn durian',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(51,'Red Prawn Durian','This is a good Red Prawn durian',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(52,'D24 Durian','This is a good D24 durian',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(53,'D24 Durian','This is a good D24 durian',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(54,'D24 Durian','This is a good D24 durian',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',8),
(55,'Strawberries','This is a good strawberry',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',9),
(56,'Strawberries','This is a good strawberry',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',9),
(57,'Strawberries','This is a good strawberry',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',9),
(58,'Red Spanish Pineapple','This is a good Red Spanish pineapple',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(59,'Red Spanish Pineapple','This is a good Red Spanish pineapple',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(60,'Red Spanish Pineapple','This is a good Red Spanish pineapple',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(61,'Queen Pineapple','This is a good Queen pineapple',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(62,'Queen Pineapple','This is a good Queen pineapple',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(63,'Queen Pineapple','This is a good Queen pineapple',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(64,'Abacaxi Pineapple','This is a good Abacaxi pineapple',15.00,10.00,'unripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(65,'Abacaxi Pineapple','This is a good Abacaxi pineapple',15.00,10.00,'ripe','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10),
(66,'Abacaxi Pineapple','This is a good Abacaxi pineapple',15.00,10.00,'firm','https://product.hstatic.net/200000325223/product/z2448801590715_13b24f7c102a0157944e3358d8435576_51e47991308140389238830f068c0f34_master.jpg',10)
]

for product in products:
    cursor.execute(
        "INSERT INTO products (product_id, product_name, product_description, selling_price, import_price, product_condition, product_img, category_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
        product
    )

shelves = [
(1, 10, 1, '2024-05-02'), 
(2, 10, 2, '2024-05-02'), 
(3, 10, 3, '2024-05-02'), 
(4, 10, 4, '2024-05-02'), 
(5, 10, 5, '2024-05-02'), 
(6, 10, 6, '2024-05-02'), 
(7, 10, 7, '2024-05-02'), 
(8, 10, 8, '2024-05-02'), 
(9, 10, 9, '2024-05-02'), 
(10, 10, 10, '2024-05-02')
]

# Generate fake data for shelves
for shelf in shelves:
    cursor.execute("INSERT INTO shelves (shelf_id, quantity, category_id, date_on_shelf) VALUES (%s, %s, %s, %s)", shelf)

# Generate fake data for warehouses
cursor.execute("INSERT INTO warehouses (warehouse_id, quantity) VALUES (1, 500)")

cursor.execute("SELECT supplier_id FROM suppliers")
supplier_ids = [supplier_id[0] for supplier_id in cursor.fetchall()]
# Generate fake data for imports
for _ in range(100):
    warehouse_id = 1
    product_id = random.randint(1, total_product)
    supplier_id = random.choice(supplier_ids)
    import_date = fake.date_this_year()
    quantity = random.randint(10, 100)
    cursor.execute(
        """
        INSERT INTO imports 
        (warehouse_id, product_id, supplier_id, import_date, quantity) 
        VALUES (%s, %s, %s, %s, %s)
        """, 
        (warehouse_id, product_id, supplier_id, import_date, quantity)
    )

# Generate fake data for exports
for _ in range(100):
    warehouse_id = 1
    product_id = random.randint(1, total_product)
    shelf_id = random.randint(1, total_shelf)
    export_date = fake.date_this_year()
    quantity = random.randint(10, 100)
    cursor.execute(
        """
        INSERT INTO exports 
        (warehouse_id, product_id, shelf_id, export_date, quantity) 
        VALUES (%s, %s, %s, %s, %s)
        """, 
        (warehouse_id, product_id, shelf_id, export_date, quantity)
    )

cursor.execute("SELECT role_id FROM roles")
role_ids = [role_id[0] for role_id in cursor.fetchall()]

# Generate fake data for users
for _ in range(10):
    user_name = fake.user_name()
    user_password = fake.password()
    role_id = random.choice(role_ids)
    full_name = fake.name()
    email = fake.email()
    phone = fake.phone_number()
    address = fake.address()
    bank_account = fake.iban()  # Using iban for fake bank account
    cursor.execute(
        """
        INSERT INTO users 
        (user_name, user_password, role_id, full_name, email, phone, address, bank_account) 
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """, 
        (user_name, user_password, role_id, full_name, email, phone, address, bank_account)
    )
conn.commit()

cursor.execute("SELECT user_id FROM users")
user_ids = [user_id[0] for user_id in cursor.fetchall()]
# Generate fake data for orders
for _ in range(100):
    user_id = random.choice(user_ids)
    total_price = round(random.uniform(20, 100), 2)
    order_date = fake.date_this_year()
    order_quantity = random.randint(1, 20)
    cursor.execute(
        """
        INSERT INTO orders 
        (user_id, total_price, order_date, order_quantity) 
        VALUES (%s, %s, %s, %s)
        """, 
        (user_id, total_price, order_date, order_quantity)
    )

# Generate unique pairs for order_products
order_product_pairs = set()
while len(order_product_pairs) <= 100:
    order_id = random.randint(1, total_order)
    product_id = random.randint(1, total_product)
    order_product_pairs.add((order_id, product_id))

for order_id, product_id in order_product_pairs:
    
    order_product_quantity = random.randint(1, 10)
    
    cursor.execute(
        """
        INSERT INTO order_products 
        (order_id, product_id, order_product_quantity) 
        VALUES (%s, %s, %s)
        """, 
        (order_id, product_id, order_product_quantity)
    )
    
# Generate unique pairs for order_products
query = """
    SELECT s.shelf_id, p.product_id
    FROM shelves s
    JOIN products p ON s.category_id = p.category_id
    LIMIT 100;
"""
cursor.execute(query)
results = cursor.fetchall()
shelf_product_pairs = set(results)
# Generate fake data for shelf_product (assuming shelf_product is a table to link products to shelves)
for shelf_id, product_id in shelf_product_pairs:
    quantity = random.randint(1, 10)
    cursor.execute(
        """
        INSERT INTO shelf_products
        (shelf_id, product_id, quantity) 
        VALUES (%s, %s, %s)
        """, 
        (shelf_id, product_id, quantity)
    )
conn.commit()    
cursor.execute("""
    UPDATE shelves s
    JOIN (
        SELECT shelf_id, COUNT(*) as total_products
        FROM shelf_products
        GROUP BY shelf_id
    ) sp ON s.shelf_id = sp.shelf_id
    SET s.quantity = sp.total_products
""")
conn.commit()    

warehouse_product_pairs = set()
count = 1
while len(warehouse_product_pairs) < total_product:
    warehouse_id = 1
    product_id = count
    warehouse_product_pairs.add((warehouse_id, product_id))
    count = count + 1
# # Generate fake data for warehouse_product (assuming warehouse_product is a table to link products to warehouses)
for warehouse_id, product_id in warehouse_product_pairs:
    quantity = random.randint(10, 50)
    cursor.execute(
        """
        INSERT INTO warehouse_products
        (warehouse_id, product_id, quantity) 
        VALUES (%s, %s, %s)
        """, 
        (warehouse_id, product_id, quantity)
    )
conn.commit()

cursor.execute("""
    UPDATE warehouses w
    JOIN (
        SELECT warehouse_id, SUM(quantity) as total_quantity
        FROM warehouse_products
        GROUP BY warehouse_id
    ) wp ON w.warehouse_id = wp.warehouse_id
    SET w.quantity = wp.total_quantity
""")

# Commit the transaction
conn.commit()

# Close the connection
cursor.close()
conn.close()