exports.up = function(pgm) {
  pgm.sql(
  `CREATE TABLE roles
    (id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    createddate timestamp with time zone,
    updateddate timestamp with time zone);`
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
