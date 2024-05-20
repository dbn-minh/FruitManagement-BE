1/ Docker: 
docker run --name manach -e MYSQL_ROOT_PASSWORD=1234 -d -p 3380:3306 mysql

2/ Sequelize-auto: 
yarn sequelize-auto -h localhost -d db_manach -u root -x 1234 -p 3380 --dialect mysql -o src/models -l esm

3/ Run using: 
yarn start