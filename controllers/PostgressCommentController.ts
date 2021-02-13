import { Request, Response } from 'express';
import Comment from '../db/postgressDb/comment.model';
import { IResponseFromPostgressWithCommentData } from '../types';
import { prepareResponseWithError } from '../utills/prepareResponseWithError';

interface ResponseForController extends Request {
  body:{
    content: string
  }
  params:{
    id: string
  }
}


export default class PostgressCommentController {
  public static async addCommentToUserWithPostgress(
    req: ResponseForController,
    res: Response
  ) {
    const {id} = req.params;
    const content: string = req.body.content;
    return Comment.addCommentToUser(userId, content)
      .then(() => {
        const msg = 'Comment added!';
        const response = this.prepareResponse(msg);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with getting comment';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }

  public static async getCommentWithPostgress(req: Request, res: Response) {
    const commentId: string = req.params.id;
    Comment.getComment(commentId)
      .then((comment: Comment) => {
        const msg = 'Comment: ';
        const response = this.prepareResponse(msg, comment);
        res.status(200).json(response);
      })
      .catch((errMsg: Error) => {
        res.status(500).json({ msg: 'Err', err: errMsg.message });
      });
  }

  public static async getUserCommentsWithPostgress(
    req: Request,
    res: Response
  ) {
    const id: string = req.params.id;

    Comment.getUserComments(id)
      .then((comments: Array<Comment>) => {
        const msg = 'User comments:';
        const response = this.prepareResponse(msg, comments);
        res.status(200).json(response);
      })
      .catch((err: Error) => {
        const msg = 'Problem with getting comments of User';
        const response = prepareResponseWithError(msg, err.message);
        res.status(500).json(response);
      });
  }

  public static async updateCommentWithPostgress(req: Request, res: Response) {
    const commentId: string = req.params.id;
    const newContent: string = req.body.content;
    Comment.updateComment(commentId, newContent)
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

  public static async deleteCommentWithPostgress(req: Request, res: Response) {
    const id: string = req.params.id;

    Comment.deleteComment(id)
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

  public static async deleteCommentsByUserIdWithPostgress(
    req: Request,
    res: Response
  ) {
    const userId = req.params.id;
    Comment.deleteCommentsByUserId(userId)
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
  private static prepareResponse(msg: string, data?: Comment | Array<Comment>) {
    if (data) {
      return { msg, data };
    }
    return { msg, data };
  }
}
