select * from vehicle_moves order by date_in
select * from parkings
select * from vehicle_move_details
select * from vehicle_move_services
select * from vehicle_move_paydata
select * from vehicle_types
select * from delivery_types
select * from companies
select * from settings
select * from users
select * from services
select * from vehicle_move_outgo

DELETE accountant 

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

INSERT INTO accountant
VALUES (1, '2023-02-11 15:00:00.000', 1, 6026);
select * from vehicle_move_services

DELETE FROM accountant WHERE id=1




--getCheckoutPassPrintData
select value from settings where prog_name='customZone'

select * from vehicle_moves where id=4013


select * from vehicle_move_services where vehicle_move_id=6027

update vehicle_move_services
set quantity=44
where id = 1311