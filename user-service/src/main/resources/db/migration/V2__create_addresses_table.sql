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
    CONSTRAINT "user_fk" FOREIGN KEY (user_id) REFERENCES users (id)
)