import { Request, Response } from 'express';

export class IndexController {
  public get(req: Request, res: Response) {
    res.send('Escucourses - Developed by César Escudero (@cedaesca)');
  }
}
