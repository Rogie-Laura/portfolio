create table if not exists portfolio_ratings (
  id uuid primary key default gen_random_uuid(),
  rating integer not null check (rating >= 1 and rating <= 5),
  created_at timestamptz not null default now()
);

alter table portfolio_ratings enable row level security;

create policy "Public read portfolio ratings"
  on portfolio_ratings for select
  using (true);

create policy "Public insert portfolio ratings"
  on portfolio_ratings for insert
  with check (true);
