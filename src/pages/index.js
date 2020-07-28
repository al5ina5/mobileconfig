import { useState } from 'react'
import Axios from 'axios'
import AceEditor from 'react-ace'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/theme-github'
import copy from 'copy-to-clipboard'
import { motion } from 'framer-motion'
var fileDownload = require('js-file-download')

export default function Index() {
    var [emailAddress, setEmailAddress] = useState('')

    var [imapHostname, setImapHostname] = useState('')
    var [imapPort, setImapPort] = useState('')
    var [imapSecure, setImapSecure] = useState(true)
    var [imapUsername, setImapUsername] = useState('')
    var [imapPassword, setImapPassword] = useState('')

    var [smtpHostname, setSmtpHostname] = useState('')
    var [smtpPort, setSmtpPort] = useState('')
    var [smtpSecure, setSmtpSecure] = useState(true)
    var [smtpUsername, setSmtpUsername] = useState('')
    var [smtpPassword, setSmtpPassword] = useState('')

    var [mobileConfig, setMobileConfig] = useState('')
    var [mobileConfigUrl, setMobileConfigUrl] = useState('')

    var mobileConfigObject = {
        emailAddress: emailAddress,
        organization: 'alsina.xyz',
        identifier: 'xyz.alsina.mobileconfig',
        imap: {
            hostname: imapHostname,
            port: imapPort || 993,
            secure: imapSecure,
            username: imapUsername,
            password: imapPassword
        },
        smtp: {
            hostname: smtpHostname,
            port: smtpPort || 465,
            secure: smtpSecure,
            username: smtpUsername,
            password: imapPassword || smtpPassword
        }
    }

    return <>
        <section>
            <motion.img
                animate={{
                    scale: [0.9, 1, 0.9]
                }}
                transition={{
                    loop: Infinity,
                    duration: 2
                }}
                drag={true}
                style={{
                    width: '100px'
                }}
                src="/img/mail.svg"
            />
            <h1>Mobile Config Generator</h1>
            <h2>Generate your .mobileconfig files.</h2>
            <p>Use your .mobileconfig to automatically configure email accounts with custom settings on iOS and macOS devices. Use this to save time when installing emails on multiple devices, providing clients or partners with access, or to keep a quick method to keep your login credentials safe and handy.</p>
            <p>The easiest way to use your .mobileconfig file is to send it to your target device via email as an attachment. Users will be able to execute the attachment to automatically configure their inboxes on their devices.</p>
            <a href="#faq">Read the FAQ.</a>
        </section>

        <form onSubmit={(e) => {
            e.preventDefault()

            var errors = []

            if (!emailAddress) errors.push('You must enter an email address.')
            if (!imapHostname) errors.push('You must enter an IMAP hostname.')
            if (!imapUsername) errors.push('You must enter an IMAP username.')
            if (!smtpHostname) errors.push('You must enter an SMTP hostname.')
            if (!smtpUsername) errors.push('You must enter an SMTP username.')

            if (errors.length) {
                return alert(errors.join('\r\n'))
            }

            Axios.post('/api', mobileConfigObject)
                .then((res) => {
                    console.log
                    setMobileConfig(res.data.mobileConfigFile)
                    setMobileConfigUrl(res.data.download)
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }}>
            <section>
                <label htmlFor="">Email Address *</label>
                <input type="email" placeholder="you@yourbiz.com" onChange={(e) => setEmailAddress(e.target.value)} />
            </section>

            {emailAddress && <>
                {/* IMAP settings */}
                <section class="inputGroup">
                    <div>
                        <label htmlFor="">IMAP Hostname *</label>
                        <input type="text" placeholder="imap.yourbiz.com" onChange={(e) => setImapHostname(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">Port</label>
                        <input type="number" placeholder="993" onChange={(e) => setImapPort(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">Username *</label>
                        <input type="text" placeholder="you@yourbiz.com" onChange={(e) => setImapUsername(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">Password</label>
                        {/* <p>If you don't enter a password here, the user will be prompted for it.</p> */}
                        <input type="password" placeholder="*******" onChange={(e) => setImapPassword(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">IMAP Secure?</label>
                        <p>
                            <label>
                                <input type="radio" name="imapSecure" defaultChecked onChange={(e) => {
                                    setImapSecure(true)
                                }} /> True
                        </label>
                            <label>
                                <input type="radio" name="imapSecure" onChange={(e) => {
                                    setImapSecure(false)
                                }} /> False
                        </label>
                        </p>
                    </div>
                </section>

                <section class="inputGroup">
                    <div>
                        <label htmlFor="">SMTP Hostname *</label>
                        <input type="text" placeholder="smtp.yourbiz.com" onChange={(e) => setSmtpHostname(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">Port</label>
                        <input type="number" placeholder="465" onChange={(e) => setSmtpPort(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">Username *</label>
                        <input type="text" placeholder="you@yourbiz.com" onChange={(e) => setSmtpUsername(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">Password</label>
                        {/* <p>If you don't enter a password here, the user will be prompted for it.</p> */}
                        <input type="password" placeholder="*******" onChange={(e) => setSmtpPassword(e.target.value)} />
                    </div>

                    <div>
                        <label htmlFor="">SMTP Secure?</label>
                        <p>
                            <label>
                                <input type="radio" name="smtpSecure" defaultChecked onChange={(e) => {
                                    setSmtpSecure(true)
                                }} /> True
                        </label>
                            <label>
                                <input type="radio" name="smtpSecure" onChange={(e) => {
                                    setSmtpSecure(false)
                                }} /> False
                        </label>
                        </p>
                    </div>
                </section>

                <section>
                    <button>Generate .mobileconfig {emailAddress && <>for {emailAddress}</>}</button>
                </section>
            </>}
        </form>

        {emailAddress && mobileConfig && <>
            <section id="download">
                <h2>Preview, Edit, and Download</h2>

                <button onClick={() => {
                    fileDownload(mobileConfig, `${emailAddress || 'email'}.mobileconfig`)
                }}>Download</button>

                <button onClick={() => {
                    copy(mobileConfigUrl)
                }}>Copy Download URL</button>

                <pre>
                    {mobileConfigUrl}
                </pre>

                <AceEditor
                    width="100%"
                    editOnly={true}
                    wrapEnabled={true}
                    mode="json"
                    theme="github"
                    defaultValue={mobileConfig}
                    name="mobileConfigPreview"
                    editorProps={{ $blockScrolling: true }}
                />
            </section>
        </>}

        <section>
            <h2>Using the API</h2>
            <p>Make your app generate .mobileconfig files on the fly using our API. <b>API is subject to change.</b></p>
            <pre>
                POST https://mobileconfig.vercel.app/api
            </pre>
        </section>

        <section>
            <h3>Example Request</h3>

            <p>Fill in the inputs to alter the example request.</p>
            <p>
                <code>mobileConfigObject</code>
            </p>
            <p>
                <AceEditor
                    width="100%"
                    maxLines={Infinity}
                    showPrintMargin={false}
                    wrapEnabled={true}
                    mode="json"
                    theme="github"
                    readOnly={true}
                    // onChange={onChange}
                    value={JSON.stringify(mobileConfigObject, null, '\t')}
                    name="mobileConfigObjectPreview"
                    editorProps={{ $blockScrolling: true }}
                />
            </p>
        </section>

        <section>
            <h3>Example Response</h3>

            <p><code>mobileConfigFile</code></p>
            <p>Contains the data required to create a .mobileconfig file. Write this data to  <code>yourfile.mobileconfig</code> to create your .mobileconfig file.</p>

            <p><code>download</code></p>
            <p>A URL to download the .mobileconfig file. Generated by a using URL encoded, stringified version of the mobileConfigObject seen above.</p>

            <p>
                <AceEditor
                    width="100%"
                    maxLines={Infinity}
                    showPrintMargin={false}
                    wrapEnabled={true}
                    mode="json"
                    theme="github"
                    readOnly={true}
                    // onChange={onChange}
                    value={JSON.stringify({
                        mobileConfigFile: '<?xml version="1.0" encoding="UTF-8"?>....</plist>',
                        download: `https://mobileconfig.vercel.app/api/download/...2%3A%22%22%7D%7D`
                    }, null, '\t')}
                    name="mobileConfigObjectPreview"
                    editorProps={{ $blockScrolling: true }}
                />
            </p>

        </section>

        <section id="faq">
            <h2>The Facts</h2>

            <p><b>Do you store my data?</b></p>
            <p>Nope! We do not store any data. Configuration files are generated on-the-fly and never stored in any database. We'll never see, store, obtain, track, or utilize the data on this page outside of your session.</p>

            <p><b>Do I have to enter my password?</b></p>
            <p>Nope! If you do not enter a password, the device will prompt the user for the password during installation.</p>

            {/* <p><b>How does this work?</b></p>
            <p>.mobileconfig files are simple .plist files.</p> */}

            <p><b>Is this safe?</b></p>
            <p>Entirely. In-fact, this website API is open source and <a target="_blank" href="https://github.com/al5ina5/mobileconfig">available on GitHub</a> so you can see exactly how it works.</p>

            <p><b>Help! It's not working!</b></p>
            <p>If you're facing issues, the most probable cause is an inaccurate username(s), password(s), or hostname(s), or security level(s). Test your data manually to ensure it works.</p>

            <p><b>I'd like for the configuration files to be signed by company or organization.</b></p>
            <p>We provide support for premium configuration files via Discord to all Patreon subscribers. <a href="#support">Pledge now to support c00l projects like this one</a>!</p>

            <p><b>Help! The installation procedure warns me that this configuration file is unverified or unsigned in red!</b></p>
            <p>By default, the .mobileconfig files generated here are not signed with a private key. This does not cause any issues, is totally safe, and does not alter the usability of the configuration file. If you'd like yours signed by your organization, refer to the question above!</p>
        </section>

        <section id="support">
            <h2>Support the Developer</h2>

            <p>If you'd like to support the developer because you found this helpful, clever, ingenious, attractive, or maybe because you absolutely hate it, you'd be contributing to something great!</p>

            <h3>Patreon</h3>
            <a href="https://patreon.com/sebastianalsina">
                <button>Become a Patron</button>
            </a>

            <h3>Bitcoin Address</h3>
            <pre>3AJ6FtwZpvP6UExcPqnG4hWgivvAxf8ejf</pre>

            <h3>Stellar Address</h3>
            <pre>GDY6TJFWJTEPY6UPYTE7756I3LAY34FODNJET3TJPNJKN34UMS4PGVM7</pre>
        </section>

        <section>
            <footer>
                <p>
                    developed with <i className="fas fa-heart" /> by <a target="_blank" href="http://sebastianalsina.com">@al5ina5</a>
                </p>
            </footer>
        </section>
    </>
}