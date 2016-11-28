import { Request, Response } from '../../reaserve';
import { readJSON } from 'fs-extra';
import { join } from 'path';
export class MainHandler {
    static search(req: Request, res: Response):void {
        let p: string = join(process.cwd(), 'assets', 'sandbox.json');
        let term: string = req.params.term;
        readJSON(p, (err, data: any[]) => {
            if (err) {
                res.error.server();
            } else {
                //console.log(data);
                let rdata = data.filter(d => d.name.toLowerCase().indexOf(term)).filter((d, i) => i < 200);
                if (term === '' || typeof term === 'undefined' || term === null)
                    rdata = data.filter((d, i) => i < 200);
                res.json(rdata);
            }
        });
    }
}