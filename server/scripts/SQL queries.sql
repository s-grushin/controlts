select * from vehicle_moves order by date_in
select * from parkings
select * from vehicle_move_details
select * from vehicle_move_services
select * from vehicle_types
select * from companies
select * from constants
select * from users
select * from services

DELETE vehicle_move_details 

DELETE vehicle_move_details where id in (15,16)


--DELETE ALL TABLES
drop table vehicle_move_details
drop table vehicle_types
drop table vehicle_moves
drop table vehicle_models
drop table vehicle_brands
drop table companies
drop table drivers
drop table users

--UPDATES
update vehicle_moves set date_in='2023-01-23 21:59:59.999' where id=4013 
update vehicle_types set prog_name='trailer' where id=2

--add vehicle move service
INSERT INTO vehicle_move_services
VALUES (5023, 3, 2.5, 400, 1000);
select * from vehicle_move_services
DELETE FROM vehicle_move_services WHERE id=3




--getCheckoutPassPrintData
select value from constants where name='customZone'

select * from vehicle_moves where id=4013