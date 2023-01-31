CREATE DATABASE ecom

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    orderDescription VARCHAR(100) NOT NULL,
    createAt TIMESTAMP NOT NULL DEFAULT now()
)

CREATE TABLE products(
    id INT PRIMARY KEY,
    productName VARCHAR(100) NOT NULL,
    productDescription TEXT
)


CREATE TABLE OrderProductMap(
    id SERIAL PRIMARY KEY,
    orderid INT,
    productid INT,
    constraint fk_orderid FOREIGN KEY(orderid) REFERENCES orders(id) on delete cascade,
    constraint fk_productid FOREIGN KEY(productid) REFERENCES products(id) on delete cascade    
)


INSERT INTO products(productName,productDescription) VALUES
    (1,"HP LAPTOP","This is a HP laptop"),
    (2,"lenovo laptop","This is a lenovo"),
    (3,"Car","This is Car"),
    (4,"Bike","This is Bike")