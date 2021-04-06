var fs = require("fs");
var mobileconfig = require("mobileconfig");

export default (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");

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
