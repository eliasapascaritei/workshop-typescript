import * as express from 'express'
import {Express, Request, Response} from 'express'
import * as morgan from 'morgan'
import * as bodyParser from 'body-parser'

export class App {
	private config: any
	public app: Express

	constructor(config: any) {
		this.config = config
		this.app = express()
	}
	public init(): void {
		this.app.set("port", this.config.PORT || 3000)
		this.app.use(bodyParser.json())
		this.app.use(bodyParser.urlencoded({extended: true}))
		this.app.use(morgan('dev'))
	}

	public startService(): void {
		this.app.get("/", (req: Request, res: Response) => {
			res.send({serviceStaturs: 'working'})
	})
	}
	public startServer(): void {
		this.app.listen(this.app.get("port"), () => {
			console.log(`Racheta pe port ${this.app.get("port")}`)
		})
	}
	public allowCorse() {
		this.app.use(function(req, res, next) {
			res.header("Access-Control-Allow-Origin", "*");
			res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
			res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth");
			next();
		});
	}
}