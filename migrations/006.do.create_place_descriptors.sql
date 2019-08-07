CREATE TABLE place_descriptors (
  place_id INTEGER REFERENCES places(id) ON DELETE CASCADE NOT NULL,
  descriptor_id INTEGER REFERENCES descriptors(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (place_id, descriptor_id)
);