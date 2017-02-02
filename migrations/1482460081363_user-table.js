require('dotenv').config();

exports.up = function(pgm) {
  pgm.sql(
  `CREATE TABLE users
    (id SERIAL PRIMARY KEY,
    firstname text not null,
    surname text not null,
    password text not null,
    email text not null unique,
    emailverified boolean,
    createddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'),
    updateddate timestamp not null DEFAULT (now() AT TIME ZONE 'UTC'));`
  );

  pgm.sql(
    `INSERT INTO public.users(firstname, surname, password, email, emailverified)
    VALUES ('akeel', 'mughal', '${process.env.TEST_PASSWORD}', '${process.env.TEST_EMAIL}', true);`
  );
};

exports.down = function(pgm) {
  pgm.sql(
    `DROP TABLE public.users;`
  );
};
