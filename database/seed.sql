-- ============================================================
-- AANNHS Seed Data
-- Andres A. Nocon National High School (School ID: 307802)
-- ============================================================
USE aannhs_db;

-- Admin user (magic link only — no password)
INSERT IGNORE INTO admin_users (username, email, role) VALUES ('admin', '307802@deped.gov.ph', 'super_admin');

-- School Info
INSERT IGNORE INTO school_info (id, school_name, school_id_no, school_type, address, region, province, city,
  district_division, year_established, principal_name, principal_title, motto,
  landline, email, domain, office_hours, google_maps_link, facebook_url, logo_url, principal_photo_url)
VALUES (1,
  'Andres A. Nocon National High School',
  '307802',
  'Public Junior High School (Grade 7 to Grade 10)',
  'Caballero St., Buenavista II, City of General Trias, Cavite',
  'Region IV-A CALABARZON',
  'Cavite',
  'General Trias City',
  'Schools Division Office of General Trias City',
  '1972',
  'Rosalie P. Lujero, PhD.',
  'Principal I',
  'Raising Character, Reaching Excellence',
  '(046) 432-0252',
  '307802@deped.gov.ph',
  'aannhs.edu.ph',
  '6:00 AM – 6:00 PM',
  'https://maps.google.com/?q=Andres+A+Nocon+National+High+School+General+Trias+Cavite',
  'https://www.facebook.com/DepEdTayoAANNHS307802',
  '/uploads/logo.png',
  '/uploads/principal.jpg'
);

-- Content Blocks
INSERT IGNORE INTO content_blocks (page_slug, section_key, title, body_richtext, sort_order) VALUES
('about', 'vision', 'Vision Statement',
'<h3>DepEd Vision</h3><p>We dream of Filipinos who passionately love their country and whose values and competencies enable them to realize their full potential and contribute meaningfully to building the nation. As a learner-centered public institution, the Department of Education continuously improves itself to better serve its stakeholders.</p><h3>School Vision</h3><p>Andres A. Nocon National High School envisions for its students to become morally upright individuals who are God-fearing, patriotic, flexible, resilient and environmental stewards.</p>',
1),

('about', 'mission', 'Mission Statement',
'<h3>DepEd Mission</h3><p>To protect and promote the right of every Filipino to quality, equitable, culture-based, and complete basic education where:</p><ul><li>Students learn in a child-friendly, gender-sensitive, safe, and motivating environment.</li><li>Teachers facilitate learning and constantly nurture every learner.</li><li>Administrators and staff, as stewards of the institution, ensure an enabling and supportive environment for effective learning to happen.</li><li>Family, community, and other stakeholders are actively engaged and share responsibility for developing life-long learners.</li></ul>',
2),

('about', 'core_values', 'Core Values',
'<p>Andres A. Nocon National High School upholds the four core values of DepEd:</p><ul><li><strong>Maka-Diyos</strong> — Being righteous and spiritually sensitive</li><li><strong>Maka-tao</strong> — Being sensitive to individual, social, and cultural needs</li><li><strong>Makakalikasan</strong> — Being responsible in caring for the environment</li><li><strong>Makabansa</strong> — Being proud to be Filipino and contributing to the development of a strong nation</li></ul>',
3),

('about', 'goals', 'School Goals & Objectives',
'<p>Andres A. Nocon National High School aims to:</p><ol><li>Instill the love for God, country, and fellowmen.</li><li>Develop 21st Century skilled individuals.</li><li>Foster a learner-centered environment and cultivate a culture of excellence in academic achievement, leadership, and community service.</li></ol>',
4),

('about', 'history', 'School History',
'<p>Andres A. Nocon National High School (AANNHS) was established in <strong>1972</strong> and has since been a cornerstone of secondary education in Buenavista II, General Trias City, Cavite. Named after Andres A. Nocon, the school has been dedicated to providing quality, accessible, and inclusive junior high school education to the youth of General Trias and nearby communities.</p><p>Over the decades, AANNHS has grown from a small community school into a well-recognized institution committed to academic excellence, character formation, and community engagement. The school is under the administration of the Schools Division Office of General Trias City, Region IV-A (CALABARZON).</p>',
0),

('about', 'community_profile', 'Community Profile',
'<p>Andres A. Nocon National High School serves the community of Buenavista II and surrounding barangays in the City of General Trias, Cavite. The school is located along Caballero St., Buenavista II — a growing community within one of Cavite''s most rapidly developing cities.</p><p>The school serves learners from Grade 7 to Grade 10 (Junior High School level) and also provides the Special Needs Education (SNED) program to serve learners with special needs, ensuring inclusive and equitable education for all.</p><p>AANNHS is committed to building partnerships with parents, local government units, community organizations, and other stakeholders to provide a supportive and nurturing learning environment.</p>',
5);

-- Feedback / CSM links
INSERT IGNORE INTO feedback_links (type, label, url, sort_order) VALUES
('general_feedback', 'General Feedback Form', 'https://bit.ly/AANNHS_FeedbackForm', 1),
('csm_survey', 'Client Satisfaction Measurement (CSM) Survey', 'https://bit.ly/AANNHS_CSM', 2);

-- External Links
INSERT IGNORE INTO external_links (label, url, sort_order) VALUES
('DepEd Central Office', 'https://www.deped.gov.ph', 1),
('DepEd Orders (Official)', 'https://www.deped.gov.ph/orders/', 2),
('DepEd Memoranda (Official)', 'https://www.deped.gov.ph/memoranda/', 3),
('DepEd Region IV-A CALABARZON', 'https://www.depedcalabarzonnews.com', 4),
('Schools Division Office of General Trias City', 'https://www.depedgeneraltrias.com', 5),
('AANNHS Facebook Page', 'https://www.facebook.com/DepEdTayoAANNHS307802', 6);

-- Citizen's Charter
INSERT IGNORE INTO citizens_charter (body_richtext) VALUES
('<p>In compliance with Republic Act No. 11032, also known as the <strong>Ease of Doing Business and Efficient Government Service Delivery Act of 2018</strong>, Andres A. Nocon National High School publishes its Citizen''s Charter to inform the public of the services it provides, the requirements for each service, and the standard processing time.</p><p>The Citizen''s Charter is a commitment to efficient, transparent, and accountable public service delivery.</p><p>For the official DepEd Citizen''s Charter, please visit: <a href="https://www.deped.gov.ph" target="_blank">www.deped.gov.ph</a></p><p><em>A full copy of the school''s Citizen''s Charter document will be attached here once available. Please contact the school office for the current version.</em></p>');

-- FAQs
INSERT IGNORE INTO faqs (question, answer_richtext, sort_order) VALUES
('What grade levels does AANNHS offer?', '<p>AANNHS offers Junior High School education from <strong>Grade 7 to Grade 10</strong>.</p>', 1),
('Is there a tuition fee?', '<p>No. AANNHS is a <strong>public school</strong> under the Department of Education. Education is free of tuition and other mandatory fees.</p>', 2),
('What are the enrollment requirements for new students or transferees?', '<p>Requirements for new students / transferees:</p><ul><li>Original or photocopy of PSA Birth Certificate (if available)</li><li>Report Card (SF9)</li><li>Good Moral Certificate</li><li>Barangay Certificate / Proof of Residence</li></ul><p>For old/returning students:</p><ul><li>Report Card (SF9)</li></ul>', 3),
('When is the enrollment period?', '<p>Enrollment is from <strong>June 1–5, 2026</strong> per DepEd Order No. 009, s. 2026. Transferees are accepted Monday–Friday, 8:00 AM–5:00 PM.</p>', 4),
('How does the enrollment process work?', '<p>The enrollment process involves these steps:</p><ol><li>Proceed to the enrollment area.</li><li>Submit the required documents.</li><li>Accomplish the enrollment form.</li><li>Verification of learner records.</li><li>Confirmation of enrollment and section assignment.</li></ol>', 5),
('How do I contact the school?', '<p>You may reach us at:</p><ul><li><strong>Phone:</strong> (046) 432-0252</li><li><strong>Mobile:</strong> 0915 811 4666 (Guidance / Enrollment)</li><li><strong>Email:</strong> 307802@deped.gov.ph</li><li><strong>Facebook:</strong> <a href="https://www.facebook.com/DepEdTayoAANNHS307802" target="_blank">DepEd Tayo AANNHS 307802</a></li><li><strong>Office Hours:</strong> 6:00 AM – 6:00 PM</li></ul>', 6),
('Where is AANNHS located?', '<p>AANNHS is located at <strong>Caballero St., Buenavista II, City of General Trias, Cavite</strong>. The school can be found near Governor Luis Ferrer Memorial National High School (Buenavista Annex).</p>', 7),
('Does AANNHS offer special education programs?', '<p>Yes. AANNHS offers the <strong>SNED (Special Needs Education)</strong> program to serve learners with special educational needs, ensuring inclusive and equitable education for all.</p>', 8),
('What learning delivery modalities are available?', '<p>AANNHS offers <strong>Face-to-Face</strong> and <strong>MDL (Modular Distance Learning)</strong> modalities.</p>', 9),
('Are there scholarship or financial assistance programs?', '<p>Yes. The school facilitates the following (subject to availability and qualifications):</p><ul><li>Educational Assistance Programs</li><li>DSWD Educational Assistance</li></ul><p>For more information, please coordinate with the School Guidance Advocate or the Registrar''s Office.</p>', 10),
('How can I submit feedback or file a concern?', '<p>You may:</p><ul><li>Submit through our <a href="https://bit.ly/AANNHS_FeedbackForm" target="_blank">General Feedback Form</a></li><li>Take our <a href="https://bit.ly/AANNHS_CSM" target="_blank">Client Satisfaction Measurement (CSM) Survey</a></li><li>Contact us directly via phone or email during office hours.</li></ul>', 11);

-- Staff Directory (Faculty Roster)
INSERT IGNORE INTO staff_directory (full_name, position_subject, department_grade_level, sort_order) VALUES
('Alajid, Jessa O.', 'Teacher III', 'Science', 1),
('Alejo, Jennifer F.', 'Teacher I', 'Mathematics', 2),
('Arizala, Ryan D.', 'Teacher I', 'MAPEH', 3),
('Aure, Michelle M.', 'Teacher II', 'Science', 4),
('Ayon, Donna Charize T.', 'Teacher III', 'Values Education/TLE', 5),
('Barroga, Irene A.', 'Teacher III', 'Filipino', 6),
('Baylen, Carlo C.', 'Teacher I', 'MAPEH', 7),
('Carpio, Liezel S.', 'Teacher III', 'Mathematics', 8),
('Caspe, Mhelea P.', 'Teacher I', 'Mathematics', 9),
('Colocado, Maria Theresa S.', 'Teacher III', 'TLE', 10),
('Cupino, Gina J.', 'Teacher III', 'Araling Panlipunan', 11),
('Dimapilis, Gwen Denisse L.', 'Teacher II', 'English', 12),
('Vargas, Elijah Abdiel I.', 'Teacher III', 'MAPEH', 13),
('Eyaya, Lloyd Allen P.', 'Teacher I', 'Araling Panlipunan', 14),
('Dinglasan, Faye Anne O.', 'Teacher III', 'Mathematics', 15),
('Fermanes, Jenalyn M.', 'Teacher II', 'Filipino', 16),
('Fojas, Joan C.', 'Teacher III', 'MAPEH', 17),
('Francia, Jennifer Anne A.', 'Master Teacher I', 'English', 18),
('Gallego, Jeana M.', 'Teacher III', 'Values Education', 19),
('Guarin, Glenn P.', 'Master Teacher I', 'Mathematics', 20),
('Jimena, Joan C.', 'Teacher II', 'English', 21),
('Palsana, Jossana L.', 'Teacher I', 'English', 22),
('Lacaste, Mary Grace E.', 'Teacher III', 'Mathematics', 23),
('Laddaran, Maysie C.', 'Teacher II', 'Filipino', 24),
('Madlangbayan, Roan P.', 'Teacher I', 'Araling Panlipunan', 25),
('Magno, Joana Marie C.', 'Teacher III', 'Science', 26),
('Marfil, Marry Karen D.', 'Teacher III', 'TLE', 27),
('Marte, Rizza M.', 'Master Teacher I', 'TLE', 28),
('Mogol, Mary Jane S.', 'Teacher III', 'TLE', 29),
('Nombrado, Marian C.', 'Teacher VI', 'English', 30),
('Papa, Kathleen L.', 'Teacher III', 'TLE/Araling Panlipunan', 31),
('Peralta, Veronica B.', 'Teacher I', 'TLE', 32),
('Perey, Ericka Jean V.', 'Teacher VI', 'Science', 33),
('Piñeda, Heidi M.', 'Teacher III', 'English/Araling Panlipunan', 34),
('Potante, Karen Joy N.', 'Teacher I', 'Values Education', 35),
('Puppos, Julie D.', 'Teacher I', 'Araling Panlipunan/Values Education', 36),
('Roberto, Antonina G.', 'Teacher III', 'Araling Panlipunan', 37),
('Clerigo, Rustom S.', 'Teacher III', 'Araling Panlipunan/Values Education', 38),
('Sacro, Vernadette D.', 'Teacher VI', 'Filipino', 39),
('Sahitarios, Melody B.', 'Teacher II', 'Mathematics/Science', 40),
('Salinas, Elvie S.', 'Teacher III', 'English', 41),
('Salinas, Gene Patrick L.', 'Teacher III', 'MAPEH', 42),
('Sinuhin, Rica Alyssa R.', 'Teacher I', 'Mathematics/Values Education', 43),
('Zaguirre, Abigail B.', 'Teacher III', 'TLE', 44);

-- School Officials
INSERT IGNORE INTO officials (full_name, position, department_office, sort_order) VALUES
('Rosalie P. Lujero, PhD.', 'Principal I', 'School Administration', 1);

-- Committees
INSERT IGNORE INTO committees (name, description, school_year, sort_order) VALUES
('Supreme Secondary Learner Government (SSLG)', 'Student government body representing all learners of AANNHS', '2026-2027', 1),
('SPTA Board of Directors', 'Supreme Parent-Teacher-Alumni Association — Board of Directors', '2026-2027', 2),
('SPTA Executive Committee', 'Supreme Parent-Teacher-Alumni Association — Executive Committee', '2026-2027', 3);

-- Committee Members — SSLG
INSERT IGNORE INTO committee_members (committee_id, full_name, role, sort_order)
SELECT c.id, m.full_name, m.role, m.sort_order FROM committees c
JOIN (
  SELECT 'Chloe Jill A. Raquiza' AS full_name, 'President' AS role, 1 AS sort_order
  UNION ALL SELECT 'Rejan Kate D. Merino', 'Vice President', 2
  UNION ALL SELECT 'Denise Sebastienne D. Dalaguit', 'Secretary', 3
  UNION ALL SELECT 'Allems Jade A. Abanto', 'Treasurer', 4
  UNION ALL SELECT 'Arkin D. Desingaño', 'Auditor', 5
  UNION ALL SELECT 'Chloe Tesz M. Enriquez', 'Public Information Officer', 6
  UNION ALL SELECT 'Raquel Marguerette G. Sison', 'Protocol Officer', 7
  UNION ALL SELECT 'Kaileena Cale Palacpac', 'Grade 7 Representative', 8
  UNION ALL SELECT 'Althea Shanelle Cañete', 'Grade 7 Representative', 9
  UNION ALL SELECT 'Alex Gwyneth B. Ocampo', 'Grade 8 Representative', 10
  UNION ALL SELECT 'Queen Allyssa L. Valiente', 'Grade 8 Representative', 11
  UNION ALL SELECT 'Justine Mae T. Delute', 'Grade 9 Representative', 12
  UNION ALL SELECT 'Nicolo Rouize R. Dimapilis', 'Grade 9 Representative', 13
  UNION ALL SELECT 'Evangeline Faye C. Nueva', 'Grade 10 Representative', 14
  UNION ALL SELECT 'Lian Marie D. Grapani', 'Grade 10 Representative', 15
) m ON c.name = 'Supreme Secondary Learner Government (SSLG)';

-- Committee Members — SPTA Board of Directors
INSERT IGNORE INTO committee_members (committee_id, full_name, role, sort_order)
SELECT c.id, m.full_name, m.role, m.sort_order FROM committees c
JOIN (
  SELECT 'Jennifer P. Dulnuan' AS full_name, 'Chairperson' AS role, 1 AS sort_order
  UNION ALL SELECT 'Joy F. Natividad', 'Vice Chairperson', 2
  UNION ALL SELECT 'Joana Marie C. Magno', 'Secretary', 3
  UNION ALL SELECT 'Maricel B. Aroma', 'Treasurer', 4
  UNION ALL SELECT 'Claribel B. Ocampo', 'Collecting/Disbursing Officer', 5
  UNION ALL SELECT 'Mitchelle Joy Bataclan', 'PIO - Grade 7', 6
  UNION ALL SELECT 'Leonardo B. Ramos', 'PIO - Grade 8', 7
  UNION ALL SELECT 'Mary Grace Cabarles', 'PIO - Grade 9', 8
  UNION ALL SELECT 'Richard C. Roberto', 'PIO - Grade 10', 9
) m ON c.name = 'SPTA Board of Directors';

-- Committee Members — SPTA Executive Committee
INSERT IGNORE INTO committee_members (committee_id, full_name, role, sort_order)
SELECT c.id, m.full_name, m.role, m.sort_order FROM committees c
JOIN (
  SELECT 'Fernando P. Varias' AS full_name, 'President' AS role, 1 AS sort_order
  UNION ALL SELECT 'Paul R. Anol', 'Vice President', 2
  UNION ALL SELECT 'Jonelle Porto', 'Secretary', 3
  UNION ALL SELECT 'Theresa Magcamit', 'Treasurer', 4
  UNION ALL SELECT 'Abigail B. Zaguirre', 'Auditor', 5
  UNION ALL SELECT 'Lex Demotica', 'Collecting/Disbursing Officer', 6
  UNION ALL SELECT 'Feliza Rose R. Tapia', 'Project Manager', 7
  UNION ALL SELECT 'Adrian Fortuno', 'Grade 7 Representative', 8
  UNION ALL SELECT 'William C. Varias', 'Grade 8 Representative', 9
  UNION ALL SELECT 'Monina Revilla', 'Grade 9 Representative', 10
  UNION ALL SELECT 'Jennie D. Merino', 'Grade 10 Representative', 11
) m ON c.name = 'SPTA Executive Committee';

-- Enrollment Statistics (JHS: Grade 7–10)
INSERT IGNORE INTO enrollment_stats
  (school_year, sort_order,
   grade7_male, grade7_female,
   grade8_male, grade8_female,
   grade9_male, grade9_female,
   grade10_male, grade10_female)
VALUES
  ('2024-2025', 1, 0, 0, 0, 0, 0, 0, 0, 0),
  ('2025-2026', 2, 0, 0, 0, 0, 0, 0, 0, 0),
  ('2026-2027', 3, 0, 0, 0, 0, 0, 0, 0, 0);
-- Note: Update enrollment numbers via Admin → Enrollment Statistics after deploy.

-- Org Chart placeholder (link to Canva)
INSERT IGNORE INTO org_chart (image_url) VALUES ('https://canva.link/mrt4g3xvwa126bk');

