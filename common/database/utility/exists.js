class exists {
  constructor(client) {
    this.client = client;

    this.tableExists = function (table) {
      const pg = require('pg');
      const connectionString = process.env.DATABASE_URL

      pg.connect(connectionString, (err, client, done) => {
        if (err) {
          done();
          console.log(err);
          return err;
        }

        client.query(`SELECT to_regclass('public.${table}');`);

        debugger;
        query.on('row', (row) =>{
          results.push(row);
        });

        query.on('end', () => {
          done();
          return res.json(results);
        });
      });
    }
  }
}

export default exists;
