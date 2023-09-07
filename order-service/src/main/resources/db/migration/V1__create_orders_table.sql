CREATE TABLE orders
(
    id           serial PRIMARY KEY,
    user_id      integer          NOT NULL,
    status       text             NOT NULL,
    order_date   timestamp        NOT NULL,
    total_amount double precision NOT NULL
);