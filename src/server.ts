// the polyfills must be one of the first things imported in node.js.
// The only modules to be imported higher - node modules with es6-promise 3.x or other Promise polyfill dependency
// (rule of thumb: do it if you have zone.js exception that it has been overwritten)
// if you are including modules that modify Promise, such as NewRelic,, you must include them before polyfills
import 'angular2-universal-polyfills';
import 'ts-helpers';
import './__workaround.node'; // temporary until 2.1.1 things are patched in Core

import * as path from 'path';
import * as morgan from 'morgan';
import * as compression from 'compression';

// Angular 2
import { enableProdMode } from '@angular/core';
// Angular 2 Universal
import { createEngine, EngineCreateOptions } from './angular2-reaserve-engine';

// App
import { MainModule } from './node.module';

import { FinalRequestObject, RequestHandler, Request, Response, Header, createServer, Router  } from '../../reaserve';

// Routes
import { routes } from '../routes';

// Policies
import { policies } from '../policies';

// enable prod for faster renders
enableProdMode();

const ROOT = path.join(path.resolve(__dirname, '..'));
const headers: Header[] = [
  {
    key: 'Cache-Control',
    value: 'max-age=60'
  }
]

const engineOptions: EngineCreateOptions = {
  ngModule: MainModule,
  providers: [
    // use only if you have shared state between users
    // { provide: 'LRU', useFactory: () => new LRU(10) }

    // stateless providers only since it's shared
  ]
} 

createServer(4000, routes, policies, null, '*', null, headers, createEngine(engineOptions))
.do(fr => console.log(fr.route))
.subscribe((fr: FinalRequestObject) => {
    RequestHandler.handle(fr);
});


/*
//
/////////////////////////
// ** Example API
// Notice API should be in aseparate process
import { serverApi, createTodoApi } from './backend/api';
// Our API for demos only
app.get('/data.json', serverApi);
app.use('/api', createTodoApi());


/**
 * use universal for specific routes
 */
/*
app.get('/', ngApp);
routes.forEach(route => {
  app.get(`/${route}`, ngApp);
  app.get(`/${route}/*`, ngApp);
});
*/