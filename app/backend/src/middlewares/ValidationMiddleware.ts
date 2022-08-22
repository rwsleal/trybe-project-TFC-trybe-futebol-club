import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';

export default class ValidationMiddleware {
  static checkJoiSchema = (schema: ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
      const { error } = schema.validate(req.body);
      if (error) {
        const [code, message] = error.message.split('|');
        const codeNumber = Number(code);
        return res.status(codeNumber).json({ message });
      }
      next();
    };
}
