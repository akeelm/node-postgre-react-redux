exports.up = function(pgm) {
  pgm.sql(
    `CREATE TABLE forgotpassword
    (id SERIAL PRIMARY KEY,
      userid INTEGER NOT NULL REFERENCES users(id),
      code text,
      createddate timestamp with time zone,
      updateddate timestamp with time zone);`
  );
};

exports.down = function(pgm) {
  pgm.sql(
    `DROP TABLE public.forgotpassword;`
  );
};
