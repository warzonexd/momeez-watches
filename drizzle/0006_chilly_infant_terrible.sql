CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`productId` int NOT NULL,
	`userName` varchar(100) NOT NULL,
	`userEmail` varchar(320) NOT NULL,
	`rating` int NOT NULL,
	`title` varchar(200),
	`comment` text NOT NULL,
	`isApproved` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
