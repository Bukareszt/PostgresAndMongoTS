import { Sequelize } from 'sequelize';
import Comment from './comment.model';
import User from './user.model';
import dotenv from 'dotenv';
dotenv.config();

// interface iEnv {
//   POSTGRES_DB: string;
//   POSTGRES_USER: string;
//   POSTGRES_PASSWORD: string;
// }
// const env: iEnv = process.env;

export const sequalize = new Sequelize(
  process.env.POSTGRES_DB!,
  process.env.POSTGRES_USER!,
  process.env.POSTGRES_PASSWORD!,
  { host: 'postgres', dialect: 'postgres' }
);

export default async function connectWithPostgress() {
  try {
    await sequalize.authenticate();
    User.initialize(sequalize);
    Comment.initialize(sequalize);

    Comment.belongsTo(User);
    User.hasMany(Comment);

    console.log('Connection has been established successfully.');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}
