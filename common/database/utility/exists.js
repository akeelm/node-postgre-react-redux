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
        /*
        this.client.connect();
        // execute a query on our database
        console.log('post connect, about to run query');
        var qry = `SELECT to_regclass('public.${table}');`;
        qry = 'SELECT 1';
        debugger;

        this.client.query(qry, function (err, result) {
          if (err) throw err;

          debugger;
          // just print the result to the console
          console.log(result.rows[0]); // outputs: { name: 'brianc' }

          // disconnect the client
          client.end(function (err) {
            debugger;
            if (err) throw err;
          });
        });
        */
      }
/*
      this.tableExists = function (client, table) {
        client.connect();
        let query = client.query(
          `SELECT to_regclass('public.${table}');`,
          (err, result) => {
            if (err) {
              return console.error('error running query', err);
            }
            console.log(result.rows[0].regclass);
          }
        }
*/

    }

}

export default exists;
