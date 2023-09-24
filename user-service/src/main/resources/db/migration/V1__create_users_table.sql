CREATE TABLE users
(
    id           serial PRIMARY KEY,
    email        text      NOT NULL,
    password     text      NOT NULL,
    name         text,
    phone_number integer   NOT NULL,
    created_time timestamp NOT NULL
)