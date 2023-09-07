CREATE TABLE order_items
(
    id         serial PRIMARY KEY,
    order_id   integer          NOT NULL,
    product_id integer          NOT NULL,
    quantity   integer          NOT NULL,
    unit_price double precision NOT NULL,
    subtotal   double precision NOT NULL,
    CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id)
);