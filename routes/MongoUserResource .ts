import { Router } from 'express';
import UserController from '../controllers/MongoUserController';

export default class MongoUserResource {
  public router: Router;
  public url: string;
  constructor(url = '/api/v1/auth') {
    this.router = Router();
    this.url = url;
    this.routes();
  }

  routes() {
    this.router.put('/', UserController.addUser);
    this.router.delete('/:id', UserController.deleteUser);
  }
}
