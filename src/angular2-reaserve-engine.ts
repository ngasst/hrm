const fs = require('graceful-fs');
import { Request } from 'reaserve';

import { Type, NgModuleRef } from '@angular/core';
import { platformUniversalDynamic, NodePlatformRef } from 'angular2-universal/node';

import { PrebootOptions } from 'preboot';

declare var Zone: any;
// @internal
function s4() {
  return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

export interface ReaserveEngineConfig {
  document?: string;
  DOCUMENT?: string;
  cancelHandler?: () => boolean;
  CANCEL_HANDLER?: () => boolean;
  req?: Request;
  REQ?: any;
  res?: any;
  RES?: any;
  time?: boolean;
  TIME?: boolean;
  id?: string;
  ID?: string;
  ngModule?: any;
  precompile?: boolean;
  preboot?: PrebootOptions;
  cancel?: boolean;
  CANCEL?: boolean;
  requestUrl?: string;
  REQUEST_URL?: string;
  originUrl?: string;
  ORIGIN_URL?: string;
  baseUrl?: string;
  BASE_URL?: string;
  cookie?: string;
  COOKIE?: string;
}

export interface EngineCreateOptions {
  precompile?: boolean;
  time?: boolean;
  asyncDestroy?: boolean;
  id?: () => string;
  platform?: (providers: any) => NodePlatformRef;
  providers?: any[];
  ngModule?: Type<any>;
}

export function createEngine(options?: EngineCreateOptions) {
  options = options || {};
  var cache: { [key: string]: Buffer; } = {
  };
  var _options: EngineCreateOptions = {
    precompile: true,
    time: false,
    asyncDestroy: true,
    id: () => s4(),
    platform: (providers) => platformUniversalDynamic(providers),
    providers: [],
    ngModule: null
  };
  _options.precompile = ('precompile' in options) ?  options.precompile : _options.precompile;
  _options.time = ('time' in options) ?  options.time : _options.time;
  _options.asyncDestroy = ('asyncDestroy' in options) ?  options.asyncDestroy : _options.asyncDestroy;
  _options.id = options.id || _options.id;
  _options.ngModule =  options.ngModule || _options.ngModule;
  var __platform = options.platform || _options.platform;
  var __providers = options.providers || _options.providers;
  delete _options.providers;
  delete _options.platform;

  const platformRef: NodePlatformRef = __platform(__providers);
  var prom: Promise<NgModuleRef<any>>;
  if (_options.ngModule) {
    prom = platformRef.cacheModuleFactory(_options.ngModule);
  }

  return function reaserveEngine(filePath: string, data: ReaserveEngineConfig = {ngModule: _options.ngModule}, done?: Function) {
    const ngModule = data.ngModule || _options.ngModule;
    if (!ngModule) {
      throw new Error('Please provide your main module as ngModule for example res.render("index", {ngModule: MainModule}) or in the engine as createEngine({ ngModule: MainModule })');
    }
    if (!data.req || !data.res) {
      throw new Error('Please provide the req, res arguments (request and response objects from express) in res.render("index", { req, res })');
    }
    var cancel = false;
    if (data.req) {
      //console.log(data.req.url);
      //data.req.on('close', () => cancel = true);
      //data.req.addListener('close', () => cancel = true);
    }
    // defaults
    
    const _data = Object.assign({
      get cancel() { return cancel; },
      set cancel(val) { cancel = val; },

      get requestUrl() { return data.requestUrl || data.req.unparsedUrl; },
      set requestUrl(_val) {  },

      get originUrl() { return data.originUrl || data.req.headers.host; },
      set originUrl(_val) {  },

      get baseUrl() { return data.baseUrl || '/'; },
      set baseUrl(_val) {  },

      get cookie() { return data.cookie || data.req.headers.cookie; },
      set cookie(_val) {  },
    }, data);

    function readContent(content: Buffer) {
      const DOCUMENT: string = content.toString();
      // TODO(gdi2290): breaking change for context globals
      // _data.document = parseDocument(document);
      _data.document = DOCUMENT;
      _data.DOCUMENT = DOCUMENT;
      _data.cancelHandler = () => Zone.current.get('cancel');

      const zone = Zone.current.fork({
        name: 'UNIVERSAL request',
        properties: _data
      });



      // convert to string
      return zone.run(() => (_options.precompile ?
        platformRef.serializeModule(ngModule, _data) :
        platformRef.serializeModuleFactory(ngModule, _data)
      ))
        .then((html: any) => {
          if (typeof html !== 'string' || cancel) {
            return done(null, DOCUMENT);
          }
          done(null, html);
        })
        .catch((e: Error) => {
          console.log(e.stack);
          // if server fail then return client html
          done(null, DOCUMENT);
        });
    }

    // read file on disk
    try {

      if (cache[filePath]) {
        return readContent(cache[filePath]);
      }
      fs.readFile(filePath, (err: any, content: Buffer) => {
        if (err) {
          cancel = true;
          console.log(err.stack);
          return done(err);
        }
        cache[filePath] = content;
        return readContent(content);
      });

    } catch (e) {
      cancel = true;
      done(e);
    }
  };
}