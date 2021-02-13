import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import User from './user.model';

class Comment extends Model {
  public content!: string;

  public id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;

  public readonly User?: User;

  public static associations: {
    User: Association<Comment, User>;
  };

  public static initialize(sequalize: Sequelize) {
    this.init(
      {
        content: DataTypes.STRING,
      },
      { sequelize: sequalize }
    );
  }

  public static async addCommentToUser(
    userId: string,
    content: string
  ): Promise<void> {
    const user = await User.findByPk(userId);
    if (!user) {
      throw Error('No user with given Id!');
    }
    const comment = await this.create({ content: content, UserId: user.id });
    return comment
  }

  public static async getComment(commentId: string) {
    const comment = await this.findByPk(commentId);
    if (!comment) {
      throw Error('No comment with given Id!');
    }
    return comment;
  }
  public static async getUserComments(userId: string) {
    const comments = await this.findAll({
      include: [
        {
          model: User,
          where: {
            id: userId,
          },
          attributes: [],
        },
      ],
      attributes: ['id', 'content'],
    });
    return comments;
  }
  public static async updateComment(commentId: string, newContent: string) {
    await this.update({ content: newContent }, { where: { id: commentId } });
    return;
  }
  public static async deleteComment(commentId: string) {
    await this.destroy({ where: { id: commentId } });
    return;
  }
  public static async deleteCommentsByUserId(userId: string) {
    await this.destroy({ where: { UserId: userId } });
    return;
  }
}
export default Comment;
