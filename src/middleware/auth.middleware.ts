import { NextFunction, Request, Response } from 'express';
import { ErrorResponse, SendResponse } from '../utils/responsehelper';
import { STATUS_CODE } from '../utils/enum';
import { AUTH_MESSAGE } from '../utils/messages';
import { verifyToken } from '../utils/commonFunction';

// token management
export const authorizeToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token as string;
  if (!token) {
    return ErrorResponse(res, STATUS_CODE.UNAUTHORIZED, AUTH_MESSAGE.UNAUTHORIZED);
  }
  // verify token logic here
  try {
    const verifyTokenUser = verifyToken(token);
    (req as any).user = verifyTokenUser;
    next();
  } catch (error) {
    return ErrorResponse(res, STATUS_CODE.UNAUTHORIZED, AUTH_MESSAGE.INVALID_TOKEN);
  }
};
