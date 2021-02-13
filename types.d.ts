export interface IResponseFromMongoWithCommentData {
  msg: string;
  data?: IComment | Array<IComment>;
}
export interface IResponseFromPostgressWithCommentData {
  msg: string;
  data?: Comment | Array<Comment>;
}
export interface IResponseWithError {
  msg: string;
  err: string;
}

