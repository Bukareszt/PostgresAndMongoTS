import { Request, Response } from 'express';
import { IUserPattern } from '../db/mongoDb/user.model';
import User from '../db/postgressDb/user.model';
import { prepareResponseWithError } from '../utills/prepareResponseWithError';

export default class PostgressUserController {
  public static async addUserWithPostgress(req: Request, res: Response) {
    const userToAdd: IUserPattern = req.body;
    if (!userToAdd) {
      res.status(400).json({ msg: 'Bad request body!' });
    } else {
      User.createUser(userToAdd)
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

  public static async getUsersWithPostgress(req: Request, res: Response) {
    User.getUsers().then((users: Array<User>) => {
      res.status(200).json(users);
    });
  }

  public static async deleteUserWithPostgress(req: Request, res: Response) {
    const userId: string = req.params.id;
    User.deleteUser(userId)
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
