CREATE TABLE "todo" (
    id SERIAL PRIMARY KEY,
    task VARCHAR(120),
    complete BOOLEAN
);

INSERT INTO "todo" ("task", "complete")
VALUES ('feed cat', 'True');

INSERT INTO "todo" ("task", "complete")
VALUES ('stitch foot', 'True');