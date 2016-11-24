import { Route, RequestResponse } from '../../reaserve';
import { MainHandler } from '../handlers/main';

export const routes: Route[] = [
    {
        path: '/api',
        verb: 'GET',
        handler: MainHandler.main,
        policies: ['main']
    }
]