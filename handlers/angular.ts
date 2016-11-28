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
        let path: string = join(process.cwd(), 'assets', 'sandbox.json');
        console.log('data file path', path);
        readJSON(path, (err, json) => {
            if (err) {
                res.error.server();
            }
            let initialData: any[] = json
            .filter(d => !d.isEmpty)
            .sort((a, b) => {
                if (a.name.toUpperCase() < b.name.toUpperCase())
                    return -1;
                if (a.name.toUpperCase() > b.name.toUpperCase())
                    return 1;
                return 0;
            })
            .filter((d, i) => i < 200);
            res.json(initialData);
        });
    }

    static returnLazyBundle(req: Request, res: Response) {
        let path: string = join(process.cwd(), 'assets', '0.bundle.js');
        res.sendFile(path, 'text/javascript');
    }
}