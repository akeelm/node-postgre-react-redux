/*
export function tableExists(client, table) {
  client.connect();
  let query = client.query(
    `SELECT to_regclass('public.${table}');`,
    function(err, result) {
      if (err) {
        return console.error('error running query', err);
      }
      console.log(result.rows[0].regclass);
    }
}
*/
