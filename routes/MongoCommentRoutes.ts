import { Router } from 'express';
import CommentController from '../controllers/MongoCommentController';

export default class MongoCommentResource {
  public router: Router;
  public url: string;
  constructor(url = '/api/v1/auth') {
    this.router = Router();
    this.url = url;
    this.routes();
  }

  routes() {
    this.router.get('/list/:id', CommentController.getUserComments);

    this.router.get('/:id', CommentController.getComment);

    this.router.put('/:id', CommentController.addCommentToUser);

    this.router.patch('/:id', CommentController.updateComment);

    this.router.delete('/list/:id', CommentController.deleteCommentsByUserId);

    this.router.delete('/:id', CommentController.deleteComment);
  }
}
