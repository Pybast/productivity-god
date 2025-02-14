CREATE TABLE "users" (
    "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "telegram" varchar(255) NOT NULL,
    "address" varchar(42) NOT NULL,
    "created" timestamp DEFAULT now() NOT NULL,
    "updated" timestamp DEFAULT now(),
    "deleted" timestamp,
    CONSTRAINT "users_telegram_unique" UNIQUE("telegram"),
    CONSTRAINT "users_address_unique" UNIQUE("address")
);
