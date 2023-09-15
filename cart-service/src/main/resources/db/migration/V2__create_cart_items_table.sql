CREATE TABLE cart_items
(
    id         serial PRIMARY KEY,
    product_id integer NOT NULL,
    cart_id    integer NOT NULL,
    quantity   integer NOT NULL,
    selected   boolean DEFAULT true,
    CONSTRAINT "fk_cart" FOREIGN KEY (cart_id) references carts (id)
)