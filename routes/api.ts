import { Route, RequestResponse } from '../../reaserve';
import { MainHandler } from '../handlers/main';

export const routes: Route[] = [
    {
        path: '/api/search',
        verb: 'POST',
        handler: MainHandler.search,
        policies: ['main']
    }
]