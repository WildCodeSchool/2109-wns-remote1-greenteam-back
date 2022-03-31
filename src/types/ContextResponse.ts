import {Request, Response} from 'express';


interface ContextResponse{
  req: Request
  res: Response
}

export default ContextResponse