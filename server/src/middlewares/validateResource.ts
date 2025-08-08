import { z } from "zod";
import { Request, Response, NextFunction } from "express";

export const validateResource =
  (schema: z.ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body, req.params, req.query);
      
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          errors: err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }
      next(err);
    }
  };
