insert into public.animals
  (id, name, species, sex, age_estimate, status, temperament, location_label, latitude, longitude, cover_image_url, story, ai_description, sterilized, vaccinated)
values
  ('miso', 'Miso', 'cat', 'female', '1 year', 'ready_for_adoption', array['gentle','lap cat','quiet'], 'North Library Garden', 31.2309000, 121.4737000, 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1200&auto=format&fit=crop', 'Found during winter finals week and now recovered after foster care.', 'Miso is a calm library companion with soft routines, gentle manners, and a tiny habit of greeting volunteers with one careful paw.', true, true),
  ('bean', 'Bean', 'dog', 'male', '8 months', 'needs_care', array['playful','food motivated','social'], 'East Sports Field', 31.2289000, 121.4781000, 'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1200&auto=format&fit=crop', 'A young dog seen near the sports field. Volunteers are arranging vaccines and behavior assessment.', 'Bean is all bright eyes and wagging confidence, a campus athlete at heart who needs steady care and a patient adopter.', false, false),
  ('sesame', 'Sesame', 'cat', 'unknown', '3 months', 'in_trial', array['curious','tiny','brave'], 'Design School Courtyard', 31.2321000, 121.4713000, 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=1200&auto=format&fit=crop', 'Rescued from heavy rain beside the design school. Currently in a trial home.', 'Sesame is a pocket-sized explorer with a brave little engine and an excellent sense for sunny windows.', false, true);

insert into public.rescue_cases
  (animal_id, reporter_name, location_label, status, urgency, notes)
values
  ('bean', 'Lina Chen', 'East Sports Field', 'treating', 'high', 'Limping observed. Needs transport to partner clinic.'),
  ('miso', 'Volunteer Team', 'North Library Garden', 'adopted', 'low', 'Ready for adoption posts and home visits.');

insert into public.medical_records
  (animal_id, record_type, hospital, performed_at, notes)
values
  ('miso', 'sterilization', 'Green Lane Animal Clinic', '2026-05-10', 'Recovered well. No follow-up issue.'),
  ('bean', 'checkup', 'Campus Partner Vet', '2026-05-20', 'Minor paw inflammation. Recheck in one week.');

insert into public.adoption_applications
  (animal_id, applicant_name, phone, dorm_or_address, experience, status)
values
  ('miso', 'Yue Wang', '13800001111', 'Graduate Dorm 3', 'Raised a senior cat for seven years.', 'screening');
