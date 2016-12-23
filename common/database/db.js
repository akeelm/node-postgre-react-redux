require('dotenv').config();
const massive = require("massive");
const connectionString = process.env.DATABASE_URL 
export default massive.connectSync({connectionString : connectionString});
