-- pgTAP: seeded venues carry the real, founder-confirmed coordinates.
begin;
select plan(4);

select is((select lat from public.venues where id = '00000000-0000-4000-8000-000000000001'), 50.432550::double precision, 'Bavovna lat');
select is((select lng from public.venues where id = '00000000-0000-4000-8000-000000000001'), 30.515416::double precision, 'Bavovna lng');
select is((select lat from public.venues where id = '00000000-0000-4000-8000-000000000002'), 50.451369::double precision, 'Panorama Bar lat');
select is((select lng from public.venues where id = '00000000-0000-4000-8000-000000000002'), 30.527492::double precision, 'Panorama Bar lng');

select * from finish();
rollback;
