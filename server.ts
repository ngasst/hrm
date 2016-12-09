import { FinalRequestObject, RequestHandler, Request, Response, Header, createServer, Router, CorsOptions } from '../reaserve';

// Routes
import { routes } from './routes';

// Policies
import { policies } from './policies';

let cors: CorsOptions = {
    origins: '*',
    requestMethods: '*',
    methods: ['GEt', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'PATCH', 'DELETE'],
    headers: ['Access-Control-Allow-Headers', 'Origin' , 'Accept', 'Content-Type', 'Access-Control-Request-Method', 'Access-Control-Request-Headers'] // or array of allowed headers e.g: ['authorization', 'content-type'] 
}

createServer(4000, routes, policies, true, cors)
.retry(3)
.onErrorResumeNext()
.subscribe((fr: FinalRequestObject) => {
    RequestHandler.handle(fr);
});