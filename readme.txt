How to run backend source code in local (Giúp Minh Đoàn khỏi phải viết swagger)

1/ Docker: 
- Gõ dòng sau vào terminal sau khi đã cài Docker:
docker run --name manach -e MYSQL_ROOT_PASSWORD=1234 -d -p 3380:3306 mysql

2/ Cài tablePlus, tạo ra connection mới: 
{
  name: db_manach
  Host: localhost
  Port: 3380
  user: root
  password: 1234
}
-> Connect

3/ create new database name: db_manach

4/ import the sql file in discord: db_manach.sql

5/ clone the backend source code:
https://github.com/dbn-minh/FruitManagement-BE.git

(git switch master) -> !!!!!!!!!! use this branch to fetch API
then type: yarn -> download all the packages

5/ Sequelize-auto:
type this line to terminal to update the database to the source: 
yarn sequelize-auto -h localhost -d db_manach -u root -x 1234 -p 3380 --dialect mysql -o src/models -l esm

6/ Run using: 
yarn start

7/ Download PostMan to test API
-> Text Minh Doan the email to be invited to the collaboration,
 which have all the APIs listed for you to test