import cors from "cors";
import express from "express";
export default class Register {
    routes = [];
    app = express();
    constructor() {
        this.app.use(cors({
            allowedHeaders: "*",
        }))
        this.app.use(express.json())
    }
    /**
     * @param {"get" | "post"} method 
     * @param { string } route 
     * @param {(req:express.Request, res:express.Response)=>void} callback 
     */
    add(method, route, callback) {
        if (method === "get") {
            this.app.get(route, callback)
        } else if (method === "post") {
            this.app.post(route, callback)
        }
        this.routes.push({ method: String(method).toUpperCase(), route: route })
    }
    logRoutes() {
        console.log("\nAPI ENDPOINTS:\n")
        this.routes.forEach(route => {
            console.log(`${route.method} ${route.route}`)
        });
    }
    /**
     * @param {number} port 
     */
    start(port = 3030) {
        this.app.listen(port, () => {
            console.log(`\n\nServer running on port ${port}`);
            this.logRoutes();
        })
    }
}