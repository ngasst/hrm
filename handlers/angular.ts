import { Request, Response } from '../../reaserve';
import { join } from 'path';
import { readJSON } from 'fs-extra';

export class AngularHandler {
    static ngApp(req: Request, res: Response) {
        let path: string = join(process.cwd(), 'src', 'index.html');
        res.render(path, {
            req,
            res,
            // time: true, // use this to determine what part of your app is slow only in development
            preboot: false,
            baseUrl: '/',
            requestUrl: req.unparsedUrl,
            originUrl: `http://localhost:${ req.connection.localPort }`
        });
    }

    static returnData(req: Request, res: Response) {
        let data: any[] = [
  { id: 0, value: 'finish example', created_at: new Date(), completed: false },
  { id: 1, value: 'add tests',      created_at: new Date(), completed: false },
  { id: 2, value: 'include development environment', created_at: new Date(), completed: false },
  { id: 3, value: 'include production environment',  created_at: new Date(), completed: false }
];
        res.json(data);
    }
}