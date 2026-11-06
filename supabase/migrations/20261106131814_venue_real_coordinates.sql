-- Real venue pins (entrances) confirmed by the founder. Data only, idempotent.
update public.venues set lat = 50.432550, lng = 30.515416
  where id = '00000000-0000-4000-8000-000000000001';
update public.venues set lat = 50.451369, lng = 30.527492
  where id = '00000000-0000-4000-8000-000000000002';
