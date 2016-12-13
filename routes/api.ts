import { Route, RequestResponse } from '../../reaserve';
import { MainHandler } from '../handlers/main';
import { QueryHandler } from '../handlers/query';

export const routes: Route[] = [
    {
        path: '/api/search/:tname/:fname/:sorta/:empty',
        verb: 'GET',
        handler: MainHandler.search,
        policies: ['main']
    },
    {
        path: '/api/query-table/:tableName',
        verb: 'GET',
        handler: QueryHandler.query,
        policies: ['main']
    }
]