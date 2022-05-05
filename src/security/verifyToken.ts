import { ForbiddenError } from 'apollo-server';
import * as jwt from 'jsonwebtoken';

function verifyToken(token, origin) {
  let key = '';
  switch (origin) {
    case 'API':
      key = process.env.BACKEND_API_AUTHORIZATION;
      break;
    case 'USER':
      key = process.env.SECRET_TOKEN_USER;
      break;
    default:
      key = '';
      break;
  }

  console.log(token);
  if (!token) throw new ForbiddenError('Accés refusé');
  const payloadToken = jwt.verify(token, key);
  if (!payloadToken) {
    throw new ForbiddenError('Accés refusé');
  }
}

export default verifyToken;
