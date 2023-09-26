CREATE TABLE addresses
(
    id           serial PRIMARY KEY,
    user_id      integer NOT NULL,
    full_name    text    NOT NULL,
    phone_number integer NOT NULL,
    address      text    NOT NULL,
    province     text    NOT NULL,
    city         text    NOT NULL,
    postal_code  integer NOT NULL,
    is_default   boolean NOT NULL,
    CONSTRAINT "user_fk" FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO addresses(id, user_id, full_name, phone_number, address, province, city, postal_code, is_default)
VALUES (1, 1, 'Test name1', 12345678, 'Test Address1', 'Southern', 'Matara', 81000, true),
       (2, 1, 'Test name2', 87654321, 'Test Address2', 'Eastern', 'Jaffna', 7100, false);
