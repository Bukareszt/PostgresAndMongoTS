import { model, Schema, Document, Model } from 'mongoose';
import UserModel from './user.model';

export interface ICommentPattern {
  content: string;
  owner: string;
}

export interface IComment extends Document, ICommentPattern {}

export interface ICommentModel extends Model<IComment> {
  addCommentToUser(commenterId: string, content: string): Promise<void>;
  getComment(commentId: string): Promise<IComment>;
  getUserComments(userId: string): Promise<Array<IComment>>;
  updateComment(commentId: string, content: string): Promise<void>;
  deleteComment(id: string): Promise<void>;
  deleteCommentsByUserId(userId: string): Promise<void>;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
});

CommentSchema.statics.addCommentToUser = async function (
  commenterId: string,
  content: string
) {
  const commentOwner = await UserModel.findById(commenterId);
  if (!commentOwner) {
    throw Error('No user with given ID in database!');
  }
  const commentToAdd: ICommentPattern = {
    content: content,
    owner: commenterId,
  };
  const entry: IComment = new this(commentToAdd);

  const { _id } = await entry.save();

  commentOwner.comments.push(_id);
  await commentOwner.save();

  return;
};

CommentSchema.statics.getComment = async function (commentId: string) {
  const comment = await this.findById(commentId);
  if (!comment) {
    throw Error('No comment with given ID!');
  }
  return comment;
};

CommentSchema.statics.getUserComments = async function (userId: string) {
  const comments: Array<IComment> = await CommentModel.find({ owner: userId });
  return comments;
};

CommentSchema.statics.updateComment = async function (
  commentId: string,
  content: string
) {
  const comment = await this.findByIdAndUpdate(commentId, { content: content });
  if (!comment) {
    throw Error('No comment with given Id');
  }
  return;
};

CommentSchema.statics.deleteComment = async function (id: string) {
  const removedComment = await this.findByIdAndRemove(id);
  if (!removedComment) {
    throw Error('No comment with given id!');
  }
  return;
};

CommentSchema.statics.deleteCommentsByUserId = async function (userId: string) {
  await this.deleteMany({ owner: userId });
  return;
};

const CommentModel = model<IComment, ICommentModel>('Comment', CommentSchema);

export default CommentModel;
