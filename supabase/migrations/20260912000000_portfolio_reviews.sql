create table if not exists portfolio_reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_name text not null,
  relationship text not null,
  project_name text,
  rating integer not null check (rating >= 1 and rating <= 5),
  message text not null,
  created_at timestamptz not null default now()
);

alter table portfolio_reviews enable row level security;

create policy "Public read portfolio reviews"
  on portfolio_reviews for select
  using (true);

create policy "Public insert portfolio reviews"
  on portfolio_reviews for insert
  with check (true);
