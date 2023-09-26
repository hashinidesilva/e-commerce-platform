CREATE TABLE users
(
    id           serial PRIMARY KEY,
    email        text      NOT NULL,
    password     text      NOT NULL,
    name         text,
    phone_number integer   NOT NULL,
    created_time timestamp NOT NULL
);

INSERT INTO users(id, email, password, name, phone_number, created_time)
VALUES (1, 'test@gmail.com', 'testPassword', 'Test Name', 12345678, current_timestamp)