select * from vehicle_moves order by date_in desc
select * from sequences
select * from parkings
select * from vehicle_move_details order by vehicle_move_id where vehicle_move_id=5028
select * from vehicle_move_services
select * from vehicle_move_paydata
select * from vehicle_types
select * from delivery_types
select * from companies
select * from settings
select * from users
select * from services
select * from vehicle_move_outgo
select * from cameras
select * from move_registration_photo_settings

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