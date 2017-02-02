exports.up = function(pgm) {
  pgm.sql(
    `CREATE TABLE forgotpassword
    (id SERIAL PRIMARY KEY,
      userid INTEGER NOT NULL REFERENCES users(id),
      code text,
      createddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'),
      updateddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'));`
  );
};

exports.down = function(pgm) {
  pgm.sql(
    `DROP TABLE public.forgotpassword;`
  );
};
