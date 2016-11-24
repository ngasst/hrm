import { Route, RequestResponse } from '../../reaserve';
import { AngularHandler } from '../handlers/angular';

export const routes: Route[] = [
    {
        path: '/',
        verb: 'GET',
        handler: AngularHandler.ngApp,
        policies: ['main']
    },
    {
        path: '/data.json',
        verb: 'GET',
        handler: AngularHandler.returnData,
        policies: ['main']
    }
]