import { NextFunction, Request, Response } from 'express';
import { STATUS_CODE } from '../utils/enum';
import { isCelebrateError } from 'celebrate';
import { ErrorResponse } from '../utils/responsehelper';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('error=> ', err);
  console.error('error stack=> ', err?.stack);
  console.error('error message=> ', err?.message);

  // celebrate error handler
  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body'); // For body validation errors
    const errorParams = err.details.get('params'); // For params validation errors
    const errorQuery = err.details.get('query'); // For query validation errors

    const details = errorBody || errorParams || errorQuery;

    const errorMessage = details?.details[0]?.message || '';
    return ErrorResponse(res, STATUS_CODE.BAD_REQUEST, errorMessage);
  }

  // // Unique constraint (e.g. duplicate email)
  // if (err instanceof UniqueConstraintError) {
  //   const errorMessage = err.errors[0]?.message;
  //   return ErrorResponse(res, STATUS_CODE.BAD_REQUEST, errorMessage);
  // }

  // // // General validation errors
  // if (err instanceof ValidationError) {
  //   const errorMessage = err.errors[0]?.message;
  //   return ErrorResponse(res, STATUS_CODE.BAD_REQUEST, errorMessage);
  // }

  // // Foreign key constraint error (child references missing)
  // if (err instanceof ForeignKeyConstraintError) {
  //   const errorMessage = `Foreign key constraint error: ' + (${err.message || 'Invalid foreign key reference'}`;
  //   return ErrorResponse(res, STATUS_CODE.BAD_REQUEST, errorMessage);
  // }

  // // missing column, invalid column
  // if (err instanceof DatabaseError) {
  //   const errorMessage = err?.message;
  //   return ErrorResponse(res, STATUS_CODE.BAD_REQUEST, errorMessage);
  // }

  return res.status(STATUS_CODE.INTERNAL_SERVER_ERROR).json({
    error: err?.message || 'Internal Server Error'
  });
};
