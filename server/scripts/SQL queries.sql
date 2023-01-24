select * from vehicle_moves order by date_in
select * from parkings
select * from vehicle_move_details
select * from vehicle_types
select * from companies
select * from constants
select * from users

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
