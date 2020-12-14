-- DROP DATABASE IF EXISTS `trade_post`;
-- CREATE DATABASE `trade_post`;

DROP TABLE IF EXISTS `images`;
CREATE TABLE IF NOT EXISTS `images` (`id` INTEGER NOT NULL auto_increment , `type` VARCHAR(255), `name` VARCHAR(255), `data` LONGBLOB, `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
SHOW INDEX FROM `images`
INSERT INTO `images` (`id`,`type`,`name`,`data`,`createdAt`,`updatedAt`);