CREATE TABLE dishes (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  image_url VARCHAR(255),
  user_id INTEGER NOT NULL
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255),
  password_digest TEXT
);

ALTER TABLE dishes
ADD COLUMN user_id INTEGER NOT NULL;

INSERT INTO dishes (title, image_url, user_id)
VALUES ('cake', 'https://cdn11.bigcommerce.com/s-vm6doh2w4n/images/stencil/800x800/products/8058/20183/cdirfk2qzy1rbixj4gks__25640.1677142835.jpg', 1);

INSERT INTO dishes (title, image_url)
VALUES ('pasta', 'https://houseofnasheats.com/wp-content/uploads/2023/07/How-to-Make-Homemade-Pasta-Square-2.jpg', 1);

INSERT INTO dishes (title, image_url)
VALUES ('ribs', 'https://www.kitchensanctuary.com/wp-content/uploads/2017/02/Sticky-Beef-Short-Ribs-square-FS-9749.jpg', 1);


--  id |        title         |                                                            image_url                                                             | user_id
-- ----+----------------------+----------------------------------------------------------------------------------------------------------------------------------+---------
--   3 | ribs                 | https://www.kitchensanctuary.com/wp-content/uploads/2017/02/Sticky-Beef-Short-Ribs-square-FS-9749.jpg                            |       1
--   7 | apple date pie       | https://livetosweet.com/wp-content/uploads/2023/07/apple-date-pie-square.jpg                                                     |       1
--   6 | beef curry pie       | https://shop.routleysbakery.com.au/wp-content/uploads/2020/06/Curry-Square.jpg                                                   |       1
--   2 | pastay               | https://houseofnasheats.com/wp-content/uploads/2023/07/How-to-Make-Homemade-Pasta-Square-2.jpg                                   |       1
--   1 | cakey mix            | https://cdn11.bigcommerce.com/s-vm6doh2w4n/images/stencil/800x800/products/8058/20183/cdirfk2qzy1rbixj4gks__25640.1677142835.jpg |       1
--   5 | australian meat pies | https://killarneyvalebakery.com.au/wp-content/uploads/2013/07/square-meat-pie.jpg                                                |       1
--  11 | new dish             | https://livetosweet.com/wp-content/uploads/2023/07/apple-date-pie-square.jpg                                                     |       1