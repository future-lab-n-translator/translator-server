import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as express from "express";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");
import { IndexRoute } from "./routes/index";
import { TestRoute } from "./routes/test";

/**
 * The server.
 *
 * @class Server
 */

export class Server {
    public app: express.Application;

    /**
     * Bootstrap the application.
     * 
     * @class Server
     * @method Bootstrap
     * @static
     * @return {ng.auto.IInjectorServer} Returns the newly created injector for this app.
     */

    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor.
     * 
     * @class Server
     * @constructor
     */
    constructor() {
        //create expressjs application
        this.app = express();

        //configure application
        this.config();

        //add routes
        this.routes();

        //add api
        this.api();
    }

    /**
     * Configure application
     * 
     * @class Server
     * @method config
     */
    public config(){
        //add static paths
        this.app.use(express.static(path.join(__dirname, "public")));

        //configure pug
        this.app.set("views", path.join(__dirname, "views"));
        this.app.set("view engine", "pug");

        //use logger middleware
        this.app.use(logger("dev"));

        //use json form parser middleware
        this.app.use(bodyParser.json());

        //use query string parser middleware
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        //use cookie parser middleware
        this.app.use(methodOverride());

        //catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction){
            err.status = 404;
            next(err);
        });

        //error handling
        this.app.use(errorHandler());
    }

    /**
     * Create router
     * 
     * @class Server
     * @method api
     */
    private routes(){
        let router: express.Router;
        router = express.Router();

        //IndexRoute
        IndexRoute.create(router);

        //TestRoute
        TestRoute.create(router);

        //use router middleware
        this.app.use(router);
    }

     /**
     * Create REST API routes
     * 
     * @class Server
     * @method api
     */
    public api(){
        let router: express.Router;
        router = express.Router();

        //Get User
        
    }
}