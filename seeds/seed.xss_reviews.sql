INSERT INTO reviews (id, rating, text, place_id, user_id)
VALUES
  (911, 5, 'This text contains an intentionally broken image <img src="https://url.to.file.which/does-not.exist" onerror="alert(document.cookie); alert(''you just got pretend hacked! oh noes!'');">. The image will try to load, when it fails, <strong>it executes malicious JavaScript</strong>', 1, 1);