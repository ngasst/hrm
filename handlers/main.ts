import { Request, Response } from '../../reaserve';
import { readJSON } from 'fs-extra';
import { join } from 'path';
import { SearchObject } from '../../hrm-client/src/app/sandbox/table/';
export class MainHandler {
    static search(req: Request, res: Response):void {
        let p: string = join(process.cwd(), 'assets', 'sandbox.json');
        let term: SearchObject = Object.assign(req.params, {
            tname: req.params.tname === 'empty' ? '' : req.params.tname,
            fname: req.params.fname === 'empty' ? '' : req.params.fname,
            isEmpty: req.params.empty === 'true' ? true : false,
            sorta: req.params.sorta === 'true' ? true : false});
        console.log(term);
        readJSON(p, (err, data: any[]) => {
            if (err) {
                console.log(err);
                res.error.server();
            } else {
                Promise.resolve(data)
                .then((data) => {
                    return new Promise((resolve) => {
                        //check if a table name was provided
                        if (term.tname.length > 0) {
                            let rdata = data
                                    .filter(d => d.name.toLowerCase().indexOf(term.tname.toLowerCase()) !== -1)
                                    .filter((d, i) => i < 200);
                            resolve(rdata)
                        } else {
                            resolve(data);
                        }
                    });
                })
                .then((data) => {
                    return new Promise((resolve) => {
                        //check if a field name was provided
                        if (term.fname.length > 0) {
                            let rdata = data
                                    .filter(table => {
                                        let bigs: string = table.fields.join(' ');
                                        return bigs.toLowerCase().includes(term.fname.toLowerCase());
                                    })
                                    .filter((d, i) => i < 200);
                            resolve(rdata);
                        }
                        resolve(data);

                    });
                })
                .then(data => {
                    return new Promise((resolve) => {
                         //check if we should display empty tables
                        if (term.showEmpty) {
                            let rdata = data;
                            resolve(rdata)
                        } else {
                            let rdata = data
                                    .filter(d => !d.isEmpty);
                            resolve(rdata);
                        }
                    });
                })
                .then(data => {
                    //console.log(data.filter((d,i) => i<2));
                    return new Promise((resolve) => {
                        //check if asked to sort alphabetically
                        if (term.sorta && data.length > 0) {
                            let rdata = data
                                    .sort((a, b) => {
                                        if (a.name.toUpperCase() > b.name.toUpperCase())
                                            return 1;
                                        if (a.name.toUpperCase() < b.name.toUpperCase())
                                            return -1;
                                        return 0;
                                    });
                            resolve(rdata);
                        } else {
                            let rdata = data
                                    .sort((a, b) => {
                                        let counta: number = parseInt(a.count);
                                        let countb: number = parseInt(b.count);
                                        if (counta > countb)
                                            return -1;
                                        if (counta < countb)
                                            return 1;
                                        return 0;
                                    });
                            resolve(rdata);
                        }
                    });
                })
                .then(data => {
                    return new Promise((resolve) => {
                        let rdata = data.filter((d, i) => i < 200);
                        resolve(rdata);
                    });
                })
                .then(data => res.json(data));
            }
        });
    }
}