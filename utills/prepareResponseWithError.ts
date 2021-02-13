import { IResponseWithError } from '../types';

export function prepareResponseWithError(
  msg: string,
  err: string
): IResponseWithError {
  return { msg, err };
}
