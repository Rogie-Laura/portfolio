create table if not exists portfolio_messages (
  id uuid primary key default gen_random_uuid(),
  sender_name text not null,
  sender_email text,
  subject text not null default 'Portfolio Inquiry',
  message text not null,
  created_at timestamptz not null default now()
);

alter table portfolio_messages enable row level security;

create policy "Public insert portfolio messages"
  on portfolio_messages for insert
  with check (true);
