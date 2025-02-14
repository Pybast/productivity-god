CREATE TABLE "tasks" (
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "description" varchar(1024) NOT NULL,
    "status" varchar(20) DEFAULT 'pending' NOT NULL,
    "deadline" timestamp,
    "created" timestamp DEFAULT now () NOT NULL,
    "updated" timestamp DEFAULT now (),
    "deleted" timestamp
);
