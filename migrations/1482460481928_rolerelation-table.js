exports.up = function(pgm) {
  pgm.sql(
    `CREATE TABLE rolerelations
    (id SERIAL PRIMARY KEY,
      roleid INTEGER NOT NULL REFERENCES roles(id),
      userid INTEGER NOT NULL REFERENCES users(id),
      createddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'),
      updateddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'));`
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
