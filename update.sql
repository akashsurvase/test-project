DROP SCHEMA IF EXISTS `task-tool`;
CREATE SCHEMA `task-tool`;
USE `task-tool`;

CREATE TABLE `task-tool`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC));

CREATE TABLE `task-tool`.`tasks` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `due_date` VARCHAR(45) NOT NULL,
  `userId` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_tasks_1_idx` (`userId` ASC),
  CONSTRAINT `fk_tasks_1`
    FOREIGN KEY (`userId`)
    REFERENCES `task-tool`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

