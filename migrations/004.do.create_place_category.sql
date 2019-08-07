CREATE TABLE place_category (
  place_id INTEGER REFERENCES places(id) ON DELETE CASCADE NOT NULL,
  category_id INTEGER REFERENCES category(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (place_id, category_id)
);