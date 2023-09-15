CREATE TABLE carts
(
    id           serial PRIMARY KEY,
    user_id      integer   NOT NULL,
    created_time timestamp NOT NULL
)