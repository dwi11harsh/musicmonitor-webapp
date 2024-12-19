const pgp = require("pg-promise")();

const connections = [];

class Redshift {
  async getConnection() {
    const dbName = "postgres";

    if (!connections[dbName]) {
      const dbUser = "postgres";
      const dbPassword = "xzHaY3";
      const dbHost = "3.10.19.30";
      const dbPort = 5432;
      console.log(`Opening connection to: ${dbName}, host is: ${dbHost}`);
      const connectionString = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
      connections[dbName] = pgp(connectionString);
    }

    return connections[dbName];
  }

  async executeQuery(query) {
    try {
      const date1 = new Date().getTime();
      const connection = await this.getConnection();
      const result = await connection.query(query);

      const date2 = new Date().getTime();
      const durationMs = date2 - date1;
      const durationSeconds = Math.round(durationMs / 1000);
      let dataLength = 0;

      if (result && result.length) dataLength = result.length;

      return result;
    } catch (e) {
      console.error(`Error executing query: ${query} Error: ${e.message}`);
      throw e;
    }
  }
}

module.exports = {
  Redshift,
};
