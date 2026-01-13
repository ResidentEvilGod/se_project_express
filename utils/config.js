const {
  DB_ADDRESS = 'mongodb://127.0.0.1:27017/wtwr_db',
  PORT = 3001,
  NODE_ENV = 'development',
  JWT_SECRET,
} = process.env;

module.exports = {
  DB_ADDRESS,
  PORT,
  NODE_ENV,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : (JWT_SECRET || 'dev-secret'),
};

if (NODE_ENV === 'production' && !JWT_SECRET) {
  throw new Error('JWT_SECRET must be set in production');
}
