import { Route } from '../../reaserve';
import { routes as main } from './main';
import { routes as api } from './api';

export const routes: Route[] = [].concat(...main, api);