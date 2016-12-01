import { Request, Response } from '../../reaserve';
import { readJSON } from 'fs-extra';
import { join } from 'path';
import { SearchObject } from '../src/+app/shared/tables.service';
export class MainHandler {
    static search(req: Request, res: Response):void {
        let p: string = join(process.cwd(), 'assets', 'sandbox.json');
        let term: SearchObject = req.body;
        readJSON(p, (err, data: any[]) => {
            if (err) {
                res.error.server();
            } else {
                let rdata = [];
                //check if a table name was provided
                term.tname.length > 0 ?
                    rdata = data
                            .filter(d => d.name.toLowerCase().indexOf(term.tname.toLowerCase()) !== -1)
                            .filter((d, i) => i < 200) :
                    rdata = data;
                //check if a field name was provided
                term.fname.length > 0 ?
                    rdata = rdata
                            .filter(d => d.nmae.toLowerCase().indexOf(term.fname.toLowerCase()) !== -1)
                            .filter((d, i) => i < 200) :
                    rdata = rdata;
                //check if asked to sort alphabetically
                term.sorta ?
                    rdata = rdata
                            .sort((a, b) => {
                                if (a.name > b.name)
                                    return -1;
                                if (a.name < b.name)
                                    return 1;
                                return 0;
                            }) :
                    rdata = rdata
                            .sort((a, b) => {
                                if (a.count > b.count)
                                    return -1;
                                if (a.count < b.count)
                                    return 1;
                                return 0;
                            });
                //check if we should display empty tables
                term.showEmpty ?
                    rdata = rdata :
                    rdata = rdata
                            .filter(d => !d.isEmpty)
                            .filter((d, i) => i < 200);
                            
                res.json(rdata);
            }
        });
    }
}