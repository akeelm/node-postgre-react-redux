require('dotenv').config();

exports.up = function(pgm) {
  pgm.sql(
  `CREATE TABLE users
    (id SERIAL PRIMARY KEY,
    firstname text not null,
    surname text not null,
    password text not null,
    email text not null,
    emailverified boolean,
    createddate timestamp with time zone,
    updateddate timestamp with time zone)`
  );

  pgm.sql(
    `INSERT INTO public.users(firstname, surname, password, email, emailverified)
    VALUES ('akeel', 'mughal', ${process.env.TEST_PASSWORD}, ${process.env.TEST_EMAIL}, true);`
  );
};

exports.down = function(pgm) {
  pgm.sql(
    `DROP TABLE public.users;`
  );
};
