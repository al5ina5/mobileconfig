var mobileconfig = require('mobileconfig')

export default (req, res) => {

    var object = JSON.parse(req.query.downloadString)

    mobileconfig.getEmailConfig(object, (err, data) => {
        if (err) {
            console.log(err)
            return
        }

        res.json(data)
    })
}