import { Request, Response } from '../../reaserve';
import { readJSON } from 'fs-extra';
import { join, resolve } from 'path';
import { SearchObject } from '../../hrm-client/src/app/models';
import { exec } from 'child_process';
export class QueryHandler {
    static query(req: Request, res: Response):void {
        const tableName: string = req.params.tableName;

        let query: string = `"SELECT * FROM HCMOWN.${tableName.toUpperCase()} WHERE ROWNUM < 10"`;
        let command: string = `java -jar ${resolve('./java/hrmquerier-1.0-SNAPSHOT.jar')}`;
        console.log(command, query);

        exec(command+ ' '+query, (err: Error, stdout: string, stderr: string) => {
            if (err) {
                console.log(err, stderr);
                res.error.generic(500, stderr);
            }

            let data: any = JSON.parse(stdout);
            res.json(data);
        });

    }
}