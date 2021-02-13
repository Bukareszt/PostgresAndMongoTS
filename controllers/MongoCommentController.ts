import { Request, Response } from 'express';
import CommentModel, { IComment } from '../db/mongoDb/comment.model';
import { IUser } from '../db/mongoDb/user.model';
import { IResponseFromMongoWithCommentData } from '../types';
import { prepareResponseWithError } from '../utills/prepareResponseWithError';

export default class MongoCommentController {
  public static async addCommentToUser(req: Request, res: Response) {
    const userId: string = req.params.id;
    const content: string = req.body.content;
    CommentModel.addCommentToUser(userId, content)
      .then(() => {
        const msg = 'Comment added!';
        const response = this.prepareResponse(msg);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with adding comment to User';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }

  public static async getComment(req: Request, res: Response) {
    const commentId: string = req.params.id;
    CommentModel.getComment(commentId)
      .then((comment: IComment) => {
        const msg = 'Comment added!';
        const response = this.prepareResponse(msg, comment);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with getting comment';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }

  public static async getUserComments(req: Request, res: Response) {
    const id: string = req.params.id;

    CommentModel.getUserComments(id)
      .then((comments: Array<IComment>) => {
        const msg = 'Comment added!';
        const response = this.prepareResponse(msg, comments);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with getting comments of User';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }

  public static async updateComment(req: Request, res: Response) {
    const commentId: string = req.params.id;
    const newContent: string = req.body.content;
    CommentModel.updateComment(commentId, newContent)
      .then(() => {
        const msg = 'Comment updated!';
        const response = this.prepareResponse(msg);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with updating comment';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }

  public static async deleteComment(req: Request, res: Response) {
    const id: string = req.params.id;

    CommentModel.deleteComment(id)
      .then(() => {
        const msg = 'Comment deleted!';
        const response = this.prepareResponse(msg);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with deleting comment!';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }

  public static async deleteCommentsByUserId(req: Request, res: Response) {
    const userId = req.params.id;
    CommentModel.deleteCommentsByUserId(userId)
      .then(() => {
        const msg = 'Comments deleted!';
        const response = this.prepareResponse(msg);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with deleting comments by userId';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }
  private static prepareResponse(
    msg: string,
    data?: IComment | Array<IComment>
  ): IResponseFromMongoWithCommentData {
    if (data) {
      return { msg, data };
    }
    return { msg };
  }
}
