CREATE TABLE `articles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`article_type` text DEFAULT 'NewsAnalysis' NOT NULL,
	`published_at` text NOT NULL,
	`updated_at` text,
	`author_id` text NOT NULL,
	`primary_section` text NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL,
	`sources` text DEFAULT '[]' NOT NULL,
	`what_it_means` text DEFAULT '[]' NOT NULL,
	`intelligence_brief` text,
	`timeline_topic_id` text,
	`topic_page_id` text,
	`knowledge_box` text,
	`featured_image_url` text,
	`featured_image_alt` text,
	`read_time` integer DEFAULT 5 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `articles_slug_unique` ON `articles` (`slug`);--> statement-breakpoint
CREATE TABLE `authors` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`bio` text,
	`photo_url` text,
	`role` text NOT NULL,
	`email` text
);
--> statement-breakpoint
CREATE TABLE `documents` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`summary` text NOT NULL,
	`source_agency` text NOT NULL,
	`document_type` text NOT NULL,
	`published_date` text NOT NULL,
	`file_url` text NOT NULL,
	`section_tag` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `documents_slug_unique` ON `documents` (`slug`);--> statement-breakpoint
CREATE TABLE `policy_projects` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`agency` text NOT NULL,
	`budget` text NOT NULL,
	`status` text DEFAULT 'Planning' NOT NULL,
	`description` text NOT NULL,
	`start_date` text,
	`target_date` text,
	`funding_source` text,
	`updates` text DEFAULT '[]' NOT NULL,
	`section_tag` text NOT NULL,
	`topic_page_id` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `policy_projects_slug_unique` ON `policy_projects` (`slug`);--> statement-breakpoint
CREATE TABLE `tags` (
	`id` text PRIMARY KEY NOT NULL,
	`label` text NOT NULL,
	`slug` text NOT NULL,
	`primary_section` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tags_slug_unique` ON `tags` (`slug`);--> statement-breakpoint
CREATE TABLE `timeline_topics` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`description` text NOT NULL,
	`cover_image` text,
	`entries` text DEFAULT '[]' NOT NULL,
	`topic_page_id` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `timeline_topics_slug_unique` ON `timeline_topics` (`slug`);--> statement-breakpoint
CREATE TABLE `topic_pages` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`slug` text NOT NULL,
	`overview` text NOT NULL,
	`cover_image` text,
	`timeline_topic_id` text,
	`key_actors` text DEFAULT '[]' NOT NULL,
	`tags` text DEFAULT '[]' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `topic_pages_slug_unique` ON `topic_pages` (`slug`);