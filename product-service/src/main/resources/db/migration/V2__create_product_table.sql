CREATE TABLE product
(
    id             serial PRIMARY KEY,
    category_id    integer          NOT NULL,
    name           text             NOT NULL,
    unit_price     double precision NOT NULL,
    description    text,
    quantity       integer          NOT NULL,
    created_time   timestamp        NOT NULL,
    updated_time   timestamp        NOT NULL,
    average_rating double precision,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id)
);

INSERT INTO product(category_id, name, unit_price, description, quantity, created_time, updated_time, average_rating)
VALUES (1, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0),
       (2, 'Deodorant', 1000,
        'Dove Antiperspirant Deodorant with 48 Hour Protection Advance Cool Essentials Deodorant for Women, 2.6 Ounce (Pack of 4)',
        37, current_timestamp, current_timestamp, 0),
       (3, 'The Hunger Games', 1000, 'The Hunger Games: Special Edition', 37, current_timestamp, current_timestamp, 0),
       (4, 'Socks', 1000, 'adidas Kids-Boy''s/Girl''s Cushioned Angle Stripe Crew Socks (6-Pair)', 37,
        current_timestamp, current_timestamp, 0),
       (5, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0),
       (6, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0),
       (8, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0),
       (9, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0),
       (10, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0),
       (12, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0),
       (14, 'Pampers', 1000, 'Pampers Swaddlers Diapers Size 4, 150 count - Disposable Diapers', 37, current_timestamp,
        current_timestamp, 0);