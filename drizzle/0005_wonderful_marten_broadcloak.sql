ALTER TABLE `products` ADD `productCode` varchar(50);--> statement-breakpoint
ALTER TABLE `products` ADD CONSTRAINT `products_productCode_unique` UNIQUE(`productCode`);