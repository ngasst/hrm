import { Route, RequestResponse } from '../../reaserve';
import { MainHandler } from '../handlers/main';

export const routes: Route[] = [
    {
        path: '/api/search/:tname/:fname/:sorta/:empty',
        verb: 'GET',
        handler: MainHandler.search,
        policies: ['main']
    }
]