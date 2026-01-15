const AppError = require('./app-error');

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
cat > errors/forbidden-error.js <<'EOF'
const AppError = require('./app-error');

class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

module.exports = ForbiddenError;
