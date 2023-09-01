CREATE TABLE product
(
    id          serial PRIMARY KEY,
    name        text,
    category    text,
    unit_price  double precision,
    description text
);
