import { Request, Response } from 'express';
import UserModel, { IUserPattern } from '../db/mongoDb/user.model';
import { prepareResponseWithError } from '../utills/prepareResponseWithError';

export default class MongoUserController {
  public static async addUser(req: Request, res: Response) {
    const userToAdd: IUserPattern = req.body;

    if (!userToAdd) {
      res.status(400).json({ msg: 'Bad request body!' });
    } else {
      UserModel.addUser(userToAdd)
        .then(() => {
          res.status(200).json({ msg: 'User created!' });
        })
        .catch((err: Error) => {
          const msg = 'Problem with adding a User';
          const response = prepareResponseWithError(msg, err.message);
          res.status(500).json(response);
        });
    }
  }

  public static async deleteUser(req: Request, res: Response) {
    const userId: string = req.params.id;
    UserModel.deleteUser(userId)
      .then(() => {
        res.status(200).json({ msg: 'User deleted!' });
      })
      .catch((err: Error) => {
        const msg = 'Problem with deleting a User';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }
}
