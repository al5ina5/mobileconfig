var fs = require("fs");
var mobileconfig = require("mobileconfig");

const allowCors = (fn) => async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
        res.status(200).end();
        return;
    }
    return await fn(req, res);
};

const handler = (req, res) => {
    mobileconfig.getEmailConfig(req.body, (err, data) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!req.body) {
            return res.send({
                message:
                    "Error! View https://mobileconfig.vercel.app to information on how to utilize this API.",
            });
        }

        res.send({
            download: `https://mobileconfig.vercel.app/api/download/${encodeURIComponent(
                JSON.stringify(req.body)
            )}`,
            mobileConfigFile: data,
        });
    });
};

export default allowCors(handler);
