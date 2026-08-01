-- ============================================================
-- GARMS: Homeroom PTA (HPTA) Officers — Schema + Seed Data
-- School Year 2026-2027 | Kindergarten to Grade 6
-- ============================================================
USE garms_db;

-- ------------------------------------------------------------
-- SCHEMA
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS hpta_sections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  grade_level VARCHAR(50) NOT NULL,
  section_name VARCHAR(150) NOT NULL,
  adviser_name VARCHAR(255) DEFAULT NULL,
  school_year VARCHAR(20) NOT NULL DEFAULT '2026-2027',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY unique_section (grade_level, section_name, school_year)
);

CREATE TABLE IF NOT EXISTS hpta_officers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  section_id INT NOT NULL,
  position VARCHAR(100) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  photo_url VARCHAR(500) DEFAULT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (section_id) REFERENCES hpta_sections(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- SEED DATA
-- ------------------------------------------------------------

INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Kindergarten', 'Matapat - Session 1', 'Arline D. Lappay', 1);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Kindergarten', 'Matapat - Session 2', 'Arline D. Lappay', 2);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Kindergarten', 'Masinop - AM', 'Kristina Casandra S. Longabela', 3);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Kindergarten', 'Masunurin - 1', 'Mary Grace P. Reambillo', 4);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Kindergarten', 'Masunurin - 2', 'Mary Grace P. Reambillo', 5);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 1', 'Sampaguita', 'Angelina E. Manalo', 6);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 1', 'Dahlia', 'Deannah H. Bulatao', 7);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 1', 'Gumamela', 'Shella B. Mahinay', 8);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 1', 'Rosal', NULL, 9);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 1', 'Santan', 'Evelyn E. Torres', 10);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 2', 'Pinya', 'Amie A. Amarille', 11);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 2', 'Lansones', 'Leonora G. Pulido', 12);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 2', 'Mangga', 'Lourdes S. Capitle', 13);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 2', 'Atis', 'Amie L. Amaran', 14);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 2', 'Chico', 'Ma. Lilibeth P. Legaspi', 15);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 3', 'Narra', 'Maricel D. Gonzales', 16);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 3', 'Mahogany', 'Verna N. Flandez', 17);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 3', 'Molave', 'Rosalia C. Awa-ao', 18);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 3', 'Acacia', 'Jenica Carla P. De Luna', 19);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 4', 'Laurel', 'Dioscora P. Hela', 20);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 4', 'Roxas', NULL, 21);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 4', 'Magsaysay', 'Charleen A. Cadalin', 22);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 4', 'Aguinaldo', NULL, 23);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 4', 'Quezon', 'Liza S. Torres', 24);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 5', 'Diamond', 'Rosa T. Silagan', 25);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 5', 'Amethyst', 'Diana V. Quintos', 26);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 5', 'Emerald', 'Michael M. Maestro', 27);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 5', 'Topaz', 'Aaron Paul O. Cruz', 28);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 5', 'Sapphire', 'Aniceta B. Ramos', 29);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 6', 'Rizal', 'Zarrah P. Culla', 30);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 6', 'Luna', 'Josephine D. Mendoza', 31);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 6', 'Bonifacio', 'Emily Onte-Fabic', 32);
INSERT IGNORE INTO hpta_sections (grade_level, section_name, adviser_name, sort_order) VALUES ('Grade 6', 'Ricarte', 'Jasmin A. Dimaranan', 33);

-- Officers per section (uses subquery on grade_level + section_name to fetch section_id)

-- Kindergarten — Matapat - Session 1
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Joan Rosales', 1
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Isagani Irog', 2
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Jenery San Gabriel', 3
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Jessabel Abante', 4
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Roxanne Inosante', 5
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Regine Mejorada', 6
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 1'
LIMIT 1;

-- Kindergarten — Matapat - Session 2
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Riza Amparado', 1
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Nancy R. Banzon', 2
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Ma. Joma Alejandro', 3
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Melissa Moreno', 4
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Romana Veloso', 5
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Reggie Dela Rosa', 6
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Matapat - Session 2'
LIMIT 1;

-- Kindergarten — Masinop - AM
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Gina Centeno', 1
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masinop - AM'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Michaela Fetalio', 2
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masinop - AM'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Maria Hazel Magpuri', 3
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masinop - AM'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Camille Presado', 4
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masinop - AM'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Analynn De Leon', 5
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masinop - AM'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Rowena Moral', 6
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masinop - AM'
LIMIT 1;

-- Kindergarten — Masunurin - 1
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Mary Ann P. Gegabalen', 1
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Khristal G. Mugol', 2
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Rejean Bayan', 3
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Rasiel G. Loyola', 4
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'April Bersamina', 5
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 1'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Yanna N. Soberano', 6
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 1'
LIMIT 1;

-- Kindergarten — Masunurin - 2
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Rainey Maple Reyes', 1
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Arlene A. Musa', 2
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Jennilyn Maniego', 3
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Arsie G. Labaniego', 4
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Jesas Lie Garcia', 5
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 2'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Rose Annn Asma', 6
FROM hpta_sections WHERE grade_level = 'Kindergarten' AND section_name = 'Masunurin - 2'
LIMIT 1;

-- Grade 1 — Sampaguita
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Fely D. Binondo', 1
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Edna M. Cervantes', 2
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Carmina M. Tanfelix', 3
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Lovejoy O. Barcelona', 4
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Charlene L. Pozas', 5
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Merly Solayao', 6
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Mary Jean Suriaga', 7
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Kursty Alyson H. Abadejos', 8
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Nieves M. Gomez', 9
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Sampaguita'
LIMIT 1;

-- Grade 1 — Dahlia
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Jeff L. Parin', 1
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Alexis Y. Parin', 2
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Joyce Ann I. Quero', 3
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Salvacion P. Melendez', 4
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Jella May A. Abella', 5
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Ma. Carla Paula Fontillas', 6
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Jenny T. Pelagio', 7
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Christopher M. Lagsac', 8
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Bryan M. Abante', 9
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Dahlia'
LIMIT 1;

-- Grade 1 — Gumamela
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Nina Mae Vasquez', 1
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Mary Jane Tilar', 2
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Eizza Jho Moraleja', 3
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Remelyn Baliton', 4
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Joanna Marie Bulatao', 5
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Liezl S. Casiano', 6
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Jovie Bacatan', 7
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Virginia Maluto', 8
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Jhonna Pinca', 9
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Gumamela'
LIMIT 1;

-- Grade 1 — Rosal
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Veaf Lacorte', 1
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Melanie Lavilla', 2
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Nyvie Albarillo', 3
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Airene Boncag', 4
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Richard Gatica', 5
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Ma. Teresa Vibal', 6
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Nora Olino', 7
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Harry Redondo', 8
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Shiela Alano', 9
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Rosal'
LIMIT 1;

-- Grade 1 — Santan
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Dale Marie V. Sorial', 1
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Benjamin Basilia', 2
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Angela F. Aspuria', 3
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Ofrelyn C. Serrado', 4
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Annamae O. Duran', 5
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Mirasol T. Servillejo', 6
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Emerald Jean S. Balan', 7
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Rose Ann Calayo', 8
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Shiela Bayas', 9
FROM hpta_sections WHERE grade_level = 'Grade 1' AND section_name = 'Santan'
LIMIT 1;

-- Grade 2 — Pinya
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Pam Ramones', 1
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Pinya'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Mary Ann Orcales', 2
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Pinya'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'April Solatorio', 3
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Pinya'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Daisy Hilario', 4
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Pinya'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Leih Marie Santarin', 5
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Pinya'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'John Vincent Parol', 6
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Pinya'
LIMIT 1;

-- Grade 2 — Lansones
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Ariel Rafaela', 1
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Lansones'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Iris Tatel', 2
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Lansones'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Beth Logatoc', 3
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Lansones'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Scarlet Oblepias', 4
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Lansones'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Leslie Adona', 5
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Lansones'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'April Garcia', 6
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Lansones'
LIMIT 1;

-- Grade 2 — Mangga
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Marilyn Murcia', 1
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Mangga'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Archie Bautista', 2
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Mangga'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Joan Padayo', 3
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Mangga'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Lala Conde', 4
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Mangga'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Angeline Cole', 5
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Mangga'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Ladylin Gutierrez', 6
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Mangga'
LIMIT 1;

-- Grade 2 — Atis
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'April Amor M. Caipilan', 1
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Atis'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Esther A. Culbengan', 2
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Atis'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Michelle B. Pundan', 3
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Atis'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Angeliz Aspuria', 4
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Atis'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Giraldeen C. Guinaling', 5
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Atis'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Dendirt L. Savedoria', 6
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Atis'
LIMIT 1;

-- Grade 2 — Chico
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Concepcion Inso', 1
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Chico'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Haydee N. Abdala', 2
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Chico'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Ma. Cristina Dogello', 3
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Chico'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Vanessa Catingga', 4
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Chico'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Geremie Abordo', 5
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Chico'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Joaquin A. Navarro', 6
FROM hpta_sections WHERE grade_level = 'Grade 2' AND section_name = 'Chico'
LIMIT 1;

-- Grade 3 — Narra
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Rea D. Custodio', 1
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Christopher M. Lagsac', 2
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Emerald Jean S. Balan', 3
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Maricel Reodique', 4
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Rochelle Alfaro', 5
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Leny Delos Santos', 6
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Maricris De Ocampo', 7
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Faith Dulguime', 8
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Emilyn Barutillo', 9
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Narra'
LIMIT 1;

-- Grade 3 — Mahogany
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Maria Melissa Luya', 1
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Jemma Bato', 2
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Melody C. Canale', 3
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Marjorie Ocampo', 4
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Jo Cosio', 5
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Jaimie Noceda', 6
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Mark Gil Sarte', 7
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Aurelia Grafe', 8
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Blessel Colmenar', 9
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Mahogany'
LIMIT 1;

-- Grade 3 — Molave
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Nerissa E. Pastor', 1
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Evelyn Gaon', 2
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Pamela Francisco', 3
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Rose Ann Dela Rea', 4
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Michelle Catampatan', 5
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Maureen Esguerra', 6
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Klarize Monton', 7
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Genevive Lachica', 8
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Ronnabel Tamayosa', 9
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Molave'
LIMIT 1;

-- Grade 3 — Acacia
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Arlyn R. Nivar', 1
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Arlene P. Gabbac', 2
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Ira Jane B. Forrosuelo', 3
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Rizza Joy G. Garbo', 4
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Jenery R. San Gabriel', 5
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Jessica Gonzales', 6
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Aura Alcaraz', 7
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Tinay Salazar', 8
FROM hpta_sections WHERE grade_level = 'Grade 3' AND section_name = 'Acacia'
LIMIT 1;

-- Grade 4 — Laurel
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Jessa Frencillo', 1
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Mira T. Servillejo', 2
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Pamela Francisco', 3
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Cristy Monroyo', 4
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Ciena Bia De Chavez', 5
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Jenny Rose Delos Santos', 6
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Jocelyn Mandapat', 7
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Zhelly Anne Balmes', 8
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Maricris Miranda', 9
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Laurel'
LIMIT 1;

-- Grade 4 — Roxas
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Rochel Alfaro', 1
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Roxas'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Jay Ann Ibarrientos', 2
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Roxas'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Mary Mae Corus', 3
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Roxas'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Mary Joy Arizobal', 4
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Roxas'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Jay Ann Ibarrientos', 5
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Roxas'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Ma. Cristina Dogelio', 6
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Roxas'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Angeliz Aspuria', 7
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Roxas'
LIMIT 1;

-- Grade 4 — Magsaysay
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Victoria Legson', 1
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Magsaysay'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Viola Placino', 2
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Magsaysay'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Janine Sejera', 3
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Magsaysay'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Charlyn Castillo', 4
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Magsaysay'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Jo Cosio', 5
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Magsaysay'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Edna Bustillo', 6
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Magsaysay'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Ariane Nocon', 7
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Magsaysay'
LIMIT 1;

-- Grade 4 — Aguinaldo
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Maila T. Nacario', 1
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Aguinaldo'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Remena Saflor', 2
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Aguinaldo'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Joanna Russel Langres', 3
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Aguinaldo'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Marianne Corbilla Dacara', 4
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Aguinaldo'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Pamela Karen Abuton', 5
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Aguinaldo'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Jhullian Palompo', 6
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Aguinaldo'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Rosalyn S. Sison', 7
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Aguinaldo'
LIMIT 1;

-- Grade 4 — Quezon
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Cheryl Cagaoan', 1
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Quezon'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Mariz Soriano', 2
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Quezon'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Christian Joe Halili', 3
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Quezon'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Nora Olino', 4
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Quezon'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Marie Chris Gomez', 5
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Quezon'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Criselda Dalmacio', 6
FROM hpta_sections WHERE grade_level = 'Grade 4' AND section_name = 'Quezon'
LIMIT 1;

-- Grade 5 — Diamond
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Ma. Victoria Santiago', 1
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Cielo Venice Castro', 2
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Gaile Karen Opiano', 3
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Syhrish Dairo', 4
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Retchiel Saludar', 5
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Ana Liza Reseza', 6
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Gemma Saldo', 7
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Romallyn Ferrol', 8
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Annalyn L. Abel', 9
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Diamond'
LIMIT 1;

-- Grade 5 — Amethyst
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Lorina D. Reyes', 1
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Ariel O. Rafaela', 2
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Miramar Gravador', 3
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Marry Cris L. Reguyal', 4
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Francia M. Hachero', 5
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Gil Francis P. Gatica', 6
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Ramil F. Ceneza', 7
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Ellynne A. Capitle', 8
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Margie C. Acong', 9
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Amethyst'
LIMIT 1;

-- Grade 5 — Emerald
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Erwin Sarangileva', 1
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Emerald'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Pam Ramones', 2
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Emerald'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'April Garcia', 3
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Emerald'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Nina Sapungan', 4
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Emerald'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Jonalyn De Asis', 5
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Emerald'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Jesica Carcueva', 6
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Emerald'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Jean Bataican', 7
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Emerald'
LIMIT 1;

-- Grade 5 — Topaz
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Moses Villanueva', 1
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Karen Olgina', 2
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Desirre Ricasa', 3
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Joyce Navarro', 4
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Maribel Comiso', 5
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Liza Adlawan', 6
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Francisco Millar', 7
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Joanne Lumbes', 8
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Morin Loren', 9
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Topaz'
LIMIT 1;

-- Grade 5 — Sapphire
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Lilibeth Candare', 1
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Sapphire'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Aileen Lapidario', 2
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Sapphire'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Emilyn Barutillo', 3
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Sapphire'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Eizza Jho Moraleja', 4
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Sapphire'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Rea Custodio', 5
FROM hpta_sections WHERE grade_level = 'Grade 5' AND section_name = 'Sapphire'
LIMIT 1;

-- Grade 6 — Rizal
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Ghiean Allison P. Sevilla', 1
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'John Enrique A. Villanueva', 2
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Frank Lester C. Endaya', 3
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Lyza Kaye Y. Custodio', 4
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Blue Yuan P. Abutin', 5
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Angelene Faye D. Ramos', 6
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Buyani Azriel D. Bacatan', 7
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Jessa T. Cabada', 8
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Muse', 'Nicollette Nendy P. Delos Santos', 9
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Escort', 'Dominic C. Anguay', 10
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Rizal'
LIMIT 1;

-- Grade 6 — Luna
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Elena Gajana', 1
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Richard Gatica', 2
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Rona Tamayosa', 3
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Nina Mae Vasquez', 4
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Fe Nocon', 5
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Maricar Picardo', 6
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Allyssa Jane Tngco', 7
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Remylyn Almeria', 8
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Butch Palacao', 9
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Luna'
LIMIT 1;

-- Grade 6 — Bonifacio
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Myra M. Co', 1
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Arleen Ta-a', 2
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Sarah Lebrilla', 3
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Ruth Agravante', 4
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Vanessa Auriada', 5
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Fe Colmenar', 6
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Neil Aguilar', 7
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Nilda S. Francisco', 8
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Ma. Gelli Tenedero', 9
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Bonifacio'
LIMIT 1;

-- Grade 6 — Ricarte
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'President', 'Pamela Karen Abuton', 1
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Vice-President', 'Maribeth Austria', 2
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Secretary', 'Gemema Lamanero', 3
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Treasurer', 'Alma Monteras', 4
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Auditor', 'Melanie Tipo', 5
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Project Manager', 'Shermalee Basto', 6
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Radcliff L. Perona', 7
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'P.I.O.', 'Joanne D. Madrigalejo', 8
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
INSERT INTO hpta_officers (section_id, position, full_name, sort_order)
SELECT id, 'Member', 'Shiela Rivas', 9
FROM hpta_sections WHERE grade_level = 'Grade 6' AND section_name = 'Ricarte'
LIMIT 1;
