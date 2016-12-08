import { FinalRequestObject, RequestHandler, Request, Response, Header, createServer, Router  } from '../reaserve';

// Routes
import { routes } from './routes';

// Policies
import { policies } from './policies';

createServer(4000, routes, policies, true, '*')
.retry(3)
.onErrorResumeNext()
.subscribe((fr: FinalRequestObject) => {
    RequestHandler.handle(fr);
});