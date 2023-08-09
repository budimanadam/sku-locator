CREATE DATABASE sku_locator;

USE `sku_locator`;

CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_code` varchar(225) NOT NULL,
  `type` varchar(50) not null,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_code` (`user_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `bin_item_activity` (
  `bin_item_activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `bin_id` int(11) NOT NULL,
  `item_id` int(11) not NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bin_item_activity_id`),
  FOREIGN KEY (item_id) REFERENCES item(item_id),
  FOREIGN KEY (bin_id) REFERENCES bin(bin_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `bin` (
  `bin_id` int(11) NOT NULL AUTO_INCREMENT,
  `bin_name` varchar(255) not NULL,
  `bin_code` varchar(255) not NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`bin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `item` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `item_name` varchar(255) not NULL,
  `item_code` varchar(255) not NULL,
  `stock` int(11) not NULL,  
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
