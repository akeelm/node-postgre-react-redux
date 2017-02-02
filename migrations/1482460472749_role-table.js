exports.up = function(pgm) {
  pgm.sql(
  `CREATE TABLE roles
    (id SERIAL PRIMARY KEY,
    name TEXT NOT NULL unique,
    createddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'),
    updateddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'));`
  );

  pgm.sql(
    `INSERT INTO roles(name)
    SELECT 'admin';

    INSERT INTO roles(name)
    SELECT 'company-admin';`
  );
};

exports.down = function(pgm) {
  pgm.sql(
    `DROP TABLE public.roles;`
  );
};
