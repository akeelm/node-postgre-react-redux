exports.up = function(pgm) {
  pgm.sql(
    `CREATE TABLE rolerelations
    (id SERIAL PRIMARY KEY,
      roleid INTEGER NOT NULL REFERENCES roles(id),
      userid INTEGER NOT NULL REFERENCES users(id),
      createddate timestamp with time zone,
      updateddate timestamp with time zone);`
  );

  pgm.sql(
    `INSERT INTO rolerelations (roleid, userid)
    SELECT 1, 1;`
  );
};

exports.down = function(pgm) {
  pgm.sql(
    `DROP TABLE public.rolerelations;`
  );
};
