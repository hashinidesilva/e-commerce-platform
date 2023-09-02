CREATE TABLE product
(
    id           serial PRIMARY KEY,
    category_id  integer          NOT NULL,
    name         text             NOT NULL,
    unit_price   double precision NOT NULL,
    description  text,
    quantity     integer          NOT NULL,
    created_time timestamp        NOT NULL,
    updated_time timestamp        NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id)
);