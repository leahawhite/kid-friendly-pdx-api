BEGIN;

TRUNCATE users RESTART IDENTITY CASCADE;

INSERT INTO users
  (id, display_name, email, password, date_created)
VALUES
  (1, 'Administrator', 'administrator@xxx.com', '$2a$12$kkYIIV5RRTc1VnejrNYPjOtTOAixdpmHiS0AYOzmi13G3P6ko99Ei', '2019-07-06'),
  (2, 'Leah', 'leahawhite@gmail.com', '$2a$12$kkYIIV5RRTc1VnejrNYPjOtTOAixdpmHiS0AYOzmi13G3P6ko99Ei', '2019-07-06'),
  (3, 'Charlie', 'charlie@alwayssunny.com', '$2a$12$GSep0WnpEFTOdtkr74chKOKhHgd8Q5xCMed4QxEfYmED5MEpprGsi', '2019-06-13');

COMMIT;
