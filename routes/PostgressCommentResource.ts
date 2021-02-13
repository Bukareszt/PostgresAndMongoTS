import { Router } from 'express';
import CommentController from '../controllers/PostgressCommentController';

export default class PostgressCommentResource {
  public router: Router;
  public url: string;
  constructor(url = '/api/v1/auth') {
    this.router = Router();
    this.url = url;
    this.routes();
  }

  routes() {
    this.router.get(
      '/list/:id',
      CommentController.getUserCommentsWithPostgress
    );

    this.router.get('/:id', CommentController.getCommentWithPostgress);

    this.router.put('/:id', CommentController.addCommentToUserWithPostgress);

    this.router.patch('/:id', CommentController.updateCommentWithPostgress);

    this.router.delete(
      '/list/:id',
      CommentController.deleteCommentsByUserIdWithPostgress
    );

    this.router.delete('/:id', CommentController.deleteCommentWithPostgress);
  }
}
