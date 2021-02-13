/* eslint-disable require-jsdoc */
import express from 'express';
import connection from '../db/mongoDb/connection';
import connectWithPostgress from '../db/postgressDb/connection';
import MongoCommentResource from '../routes/MongoCommentRoutes';
import MongoUserResource from '../routes/MongoUserResource ';
import PostgressCommentResource from '../routes/PostgressCommentResource';
import PostgressUserResource from '../routes/PostgressUserResource';

export default function prepareServer(server: express.Application): void {
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  prepareRoutes(server);

  connection();
  connectWithPostgress();
}

function prepareRoutes(server: express.Application): void {
  server.use('/mongo/users', new MongoUserResource().router);
  server.use('/mongo/comments', new MongoCommentResource().router);
  server.use('/postgress/users', new PostgressUserResource().router);
  server.use('/postgress/comments', new PostgressCommentResource().router);
}
