const {
  JWT_SECRET = 'dev-secret',
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/wtwr_db',
  PORT = 3001,
  NODE_ENV = 'development',
} = process.env;

module.exports = {
  JWT_SECRET,
  DB_ADDRESS,
  PORT,
  NODE_ENV,
};
