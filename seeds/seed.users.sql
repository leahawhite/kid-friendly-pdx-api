BEGIN;

TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users
  (id, display_name, email, password, date_created)
VALUES
  (1, 'Leah', 'leahawhite@gmail.com', 'lool00', '2019-07-06'),
  (2, 'Charlie', 'charlie@alwayssunny.com', 'Charlie100%', '2019-06-13');

COMMIT;