import { Router } from 'express';
import UserController from '../controllers/PostgressUserController';

export default class PostgressUserResource {
  public router: Router;
  public url: string;
  constructor(url = '/api/v1/auth') {
    this.router = Router();
    this.url = url;
    this.routes();
  }

  routes() {
    this.router.put('/', UserController.addUserWithPostgress);
    this.router.delete('/:id', UserController.deleteUserWithPostgress);
  }
}
