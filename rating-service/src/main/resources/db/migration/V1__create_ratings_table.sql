CREATE TABLE ratings
(
    id           serial PRIMARY KEY,
    product_id   integer   NOT NULL,
    user_id      integer   NOT NULL,
    rating       integer   NOT NULL,
    created_time timestamp NOT NULL
)