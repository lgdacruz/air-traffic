import dynamoose from 'dynamoose';
import { v4 as uuidv4 } from 'uuid';

const logSchema = new dynamoose.Schema({
  id: { type: String, hashKey: true, default: uuidv4 },
  logType: { type: String },
  message: { type: String },
  tag: { type: String },
  statusCode: { type: Number },
  createdAt: { type: Number, default: () => Date.now() },
});

export const LogModel = dynamoose.model('log', logSchema, {
  expires: { ttl: 1000 * 60 }, //1M
});
