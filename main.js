var fs = require('fs')
var mobileconfig = require('mobileconfig')

var options = {
    emailAddress: 'josealvarez@rentsduefla.com',
    organization: 'alsina.xyz',
    identifier: 'xyz.alsina.mobileconfig',
    imap: {
        hostname: 'imap.migadu.com',
        secure: true,
        port: 993,
        username: 'josealvarez@rentsduefla.com',
        password: 'gem~v7Q--P[!}URG'
    },
    smtp: {
        hostname: 'smtp.migadu.com',
        port: 465,
        secure: true,
        username: 'josealvarez@rentsduefla.com',
        password: false
    }
}

mobileconfig.getEmailConfig(options, (err, data) => {
    if (err) {
        return console.log(err)
    }

    fs.writeFile(`configs/${options.emailAddress}.mobileconfig`, data, (err) => {
        if (err) return console.log(err)
        console.log(`Config saved as ${options.emailAddress}.mobileconfig.`)
    })
})