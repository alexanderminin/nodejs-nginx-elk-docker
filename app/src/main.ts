import apm from "./apm";
import express from "express";
import logger from "./logger";

const app = express();

app.get('/', (req, res) => {
    try {
        logger.info("first log message"); // write simple log;
        logger.info("second log message", { req, res }); // write log with Request/Response data
        logger.info("third log message", {
            req,
            res,
            tags: ["test_1", "test_2"],
            labels: { 
                field_1: 'field 1 text',
                field_2: 'field 2 text'
            }
        }); // write log with Request/Response data + custom data
        
        
        res.send("Welcome Home Page");
    } catch (error) {
        console.log(error);
    }
});

app.get('/post', (req, res) => {
    try {
        const myErr = new Error('Some error');

        logger.error("error log", { 
            err: myErr,
            req,
            res
        }); // write error to log

        apm.captureError(myErr);  // write error to APM direct
        
        res.send("Welcome Post page");
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});