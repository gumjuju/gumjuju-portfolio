-- Run this in your Supabase project → SQL Editor

CREATE TABLE categories (
  id            text PRIMARY KEY,
  label         text NOT NULL,
  cover_src     text,
  cover_pathname text,
  display_order int DEFAULT 0,
  created_at    timestamptz DEFAULT now()
);

CREATE TABLE photos (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title          text NOT NULL DEFAULT '',
  loc            text DEFAULT '',
  category       text NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  src            text NOT NULL,
  blob_pathname  text NOT NULL,
  display_order  int DEFAULT 0,
  featured       boolean DEFAULT false,
  created_at     timestamptz DEFAULT now()
);

CREATE INDEX photos_category_idx ON photos(category, display_order);

INSERT INTO categories (id, label, display_order) VALUES
  ('cars',      'Cars & Motorsport', 1),
  ('events',    'Events & Cosplay',  2),
  ('stages',    'Stages',            3),
  ('landscape', 'Landscape',         4),
  ('portrait',  'Portrait',          5);

ALTER TABLE photos     ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read photos"     ON photos     FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
