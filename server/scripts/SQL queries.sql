select * from vehicle_moves
select * from parkings
select * from vehicle_move_details
select * from vehicle_types
select * from companies

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
