import { Association, DataTypes, Model, Optional, Sequelize } from 'sequelize';
import { IUserPattern } from '../mongoDb/user.model';
import Comment from './comment.model';

class User extends Model {
  public username!: string;
  public surname!: string;
  public email!: string;

  public id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  public readonly Comments?: Array<Comment>;

  public static associations: {
    Comments: Association<User, Comment>;
  };

  public static initialize(sequalize: Sequelize) {
    this.init(
      {
        username: DataTypes.STRING,
        surname: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      { sequelize: sequalize }
    );
  }

  public static async getUsers(): Promise<Array<User>> {
    return await this.findAll({
      attributes: ['id', 'surname', 'username', 'email'],
    });
  }

  public static async createUser(userToCreate: IUserPattern): Promise<User> {
    const user = await this.create(userToCreate);
    return user;
  }

  public static async deleteUser(id: string): Promise<void> {
    const user = await this.findByPk(id);
    if (!user) {
      throw Error('No user with given id!');
    }
    await user.destroy();
  }
}

export default User;
