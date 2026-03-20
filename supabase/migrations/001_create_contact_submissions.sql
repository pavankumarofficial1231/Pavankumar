
-- Create contact_submissions table
create table contact_submissions (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table contact_submissions enable row level security;

-- Create policy to allow inserts from anyone (for the contact form)
create policy "Anyone can insert contact submissions" on contact_submissions
  for insert with check (true);

-- Create policy to allow reading only for authenticated users (admin access)
create policy "Only authenticated users can read contact submissions" on contact_submissions
  for select using (auth.role() = 'authenticated');
