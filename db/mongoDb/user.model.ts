import { model, Schema, Document, Model } from 'mongoose';

export interface IUserPattern {
  username: string;
  email: string;
  surname: string;
  comments: Array<string>;
}

export interface IUser extends Document, IUserPattern {}

interface IUserModel extends Model<IUser> {
  addUser(userToAdd: IUserPattern): Promise<void>;
  deleteUser(userId: string): Promise<void>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, min: 3 },
  email: { type: String, required: true },
  surname: { type: String, required: false },
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
});

UserSchema.statics.addUser = async function (userToAdd: IUserPattern) {
  const entry = new this(userToAdd);
  await entry.save();
  return;
};

UserSchema.statics.deleteUser = async function (userId: string) {
  const user = await this.findByIdAndRemove(userId);
  if (!user) {
    throw Error('No user with given Id!');
  }
  return;
};

const UserModel = model<IUser, IUserModel>('User', UserSchema);

export default UserModel;
