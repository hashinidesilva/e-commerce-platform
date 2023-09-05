CREATE TABLE category
(
    id   serial PRIMARY KEY,
    name text NOT NULL
);

INSERT INTO category(name)
VALUES ('Baby'),
       ('Beauty & Personal Care'),
       ('Books'),
       ('Boys'' Fashion'),
       ('Computers'),
       ('Electronics'),
       ('Girls'' Fashion'),
       ('Health & Household'),
       ('Home & Kitchen'),
       ('Men''s Fashion'),
       ('Pet Supplies'),
       ('Sports'),
       ('Toys & Games'),
       ('Women''s Fashion');