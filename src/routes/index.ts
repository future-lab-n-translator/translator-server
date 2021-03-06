import { NextFunction, Request, Response, Router } from "express";
import { BaseRoute } from "./route";
import { detectLanguage, translateLanguage } from '../controllers/apiController';

/**
 * / route
 *
 * @class User
 */
export class IndexRoute extends BaseRoute {

  /**
   * Create the routes.
   *
   * @class IndexRoute
   * @method create
   * @static
   */
  public static create(router: Router) {
    //log
    console.log("[IndexRoute::create] Creating index route.");

    //add home page route
    router.get("/", (req: Request, res: Response, next: NextFunction) => {
      new IndexRoute().index(req, res, next);
    });

    router.post("/", (req: Request, res: Response, next: NextFunction) => {
       console.log(req.body.q);
       detectLanguage(req.body, (err, result) => {
         if(err){
           res.send('error in detecting language');
         }
         var source = result.data.detections[0][0].language;
         translateLanguage(req.body, source, (err, result) => {
           if(err){
             res.send('error in translate language');
           }
           res.send(result);
         })
       });
    });
  }

  /**
   * Constructor
   *
   * @class IndexRoute
   * @constructor
   */
  constructor() {
    super();
  }

  /**
   * The home page route.
   *
   * @class IndexRoute
   * @method index
   * @param req {Request} The express Request object.
   * @param res {Response} The express Response object.
   * @next {NextFunction} Execute the next method.
   */
  public index(req: Request, res: Response, next: NextFunction) {
    //set custom title
    this.title = "Home | Echo";

    //set options
    let options: Object = {
      "message": "Welcome to Echo"
    };

    //render template
    this.render(req, res, "index", options);
  }
}