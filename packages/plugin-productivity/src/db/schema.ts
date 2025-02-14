import { integer, pgTable, varchar, timestamp } from "drizzle-orm/pg-core";

// /!\ ONLY MAKE UPDATES ON Productivity-Agent repository

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  telegram: varchar({ length: 255 }).unique().notNull(),
  address: varchar({ length: 42 }).unique().notNull(),
  created: timestamp("created").defaultNow().notNull(),
  updated: timestamp("updated")
    .defaultNow()
    .$onUpdate(() => new Date()),
  deleted: timestamp("deleted"),
});

export const tasksTable = pgTable("tasks", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  userId: integer()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }), // User association
  description: varchar({ length: 1024 }).notNull(),
  status: varchar({ length: 20 }).default("pending").notNull(),
  deadline: timestamp(),
  created: timestamp("created").defaultNow().notNull(),
  updated: timestamp("updated")
    .defaultNow()
    .$onUpdate(() => new Date()),
  deleted: timestamp("deleted"),
});
