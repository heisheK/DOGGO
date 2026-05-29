create extension if not exists "pgcrypto";

create type animal_species as enum ('cat', 'dog', 'other');
create type animal_sex as enum ('female', 'male', 'unknown');
create type animal_status as enum ('needs_care', 'ready_for_adoption', 'in_trial', 'adopted');
create type rescue_status as enum ('reported', 'triaged', 'rescued', 'treating', 'released', 'adopted');
create type urgency_level as enum ('low', 'medium', 'high');
create type application_status as enum ('pending', 'screening', 'approved', 'rejected');
create type medical_record_type as enum ('checkup', 'vaccine', 'sterilization', 'treatment');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null default 'volunteer' check (role in ('student', 'volunteer', 'admin', 'vet')),
  avatar_url text,
  created_at timestamptz not null default now()
);

create table public.animals (
  id text primary key,
  name text not null,
  species animal_species not null,
  sex animal_sex not null default 'unknown',
  age_estimate text not null,
  status animal_status not null default 'needs_care',
  temperament text[] not null default '{}',
  location_label text not null,
  latitude numeric(10, 7) not null,
  longitude numeric(10, 7) not null,
  cover_image_url text not null,
  story text not null,
  ai_description text,
  sterilized boolean not null default false,
  vaccinated boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.rescue_cases (
  id uuid primary key default gen_random_uuid(),
  animal_id text references public.animals(id) on delete set null,
  reporter_name text not null,
  location_label text not null,
  status rescue_status not null default 'reported',
  urgency urgency_level not null default 'medium',
  notes text not null default '',
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.medical_records (
  id uuid primary key default gen_random_uuid(),
  animal_id text not null references public.animals(id) on delete cascade,
  record_type medical_record_type not null,
  hospital text not null,
  performed_at date not null,
  notes text not null default '',
  attachment_url text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.adoption_applications (
  id uuid primary key default gen_random_uuid(),
  animal_id text not null references public.animals(id) on delete cascade,
  applicant_name text not null,
  phone text not null,
  dorm_or_address text not null,
  experience text not null default '',
  status application_status not null default 'pending',
  reviewer_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.animals enable row level security;
alter table public.rescue_cases enable row level security;
alter table public.medical_records enable row level security;
alter table public.adoption_applications enable row level security;

create policy "Public can read animals" on public.animals for select using (true);
create policy "Authenticated can manage animals" on public.animals for all using (auth.role() = 'authenticated');

create policy "Authenticated can read rescue cases" on public.rescue_cases for select using (auth.role() = 'authenticated');
create policy "Authenticated can manage rescue cases" on public.rescue_cases for all using (auth.role() = 'authenticated');

create policy "Authenticated can read medical records" on public.medical_records for select using (auth.role() = 'authenticated');
create policy "Authenticated can manage medical records" on public.medical_records for all using (auth.role() = 'authenticated');

create policy "Anyone can create applications" on public.adoption_applications for insert with check (true);
create policy "Authenticated can read applications" on public.adoption_applications for select using (auth.role() = 'authenticated');
create policy "Authenticated can update applications" on public.adoption_applications for update using (auth.role() = 'authenticated');

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
