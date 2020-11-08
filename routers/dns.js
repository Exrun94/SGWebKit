const express = require('express')
const whois = require('whois-json')
const moment = require('moment')
const router = express.Router()
const dnsRecords = require('@layered/dns-records');
const { nsResolver, aResolver, mxResolver, txtResolver, } = require('../misc/dnsResolver')
const { performance } = require('perf_hooks');
const { checkAuth, isLoggedIn } = require('../misc/middleware')


router.get('/dns', checkAuth, async(req, res) => {

    res.render('dns')
})

router.post('/dns', async(req, res) => {
    const domain = req.body.domain

    try {
        let t0 = performance.now()

        const ns = await nsResolver(domain)
        const a = await aResolver(domain)
        const mx = await mxResolver(domain)
        const txt = await txtResolver(domain)

        let results = await whois(domain, { follow: 3, verbose: true });
        let registrar = JSON.stringify(results[0].data.registrar, null, 2)
        let created = JSON.stringify(results[0].data.creationDate, null, 2)
        let expire = JSON.stringify(results[0].data.registryExpiryDate, null, 2)
        let status = JSON.stringify(results[0].data.domainStatus, null, 2)

        expire = expire.split('T').join(' : ').split('Z').join('')
        created = created.split('T').join(' : ').split('Z').join('')

        status = status.split(' ')
        let len = status.length
        let elements = []
        for (let i = 0; i < len; i++) {
            if (i % 2 == 0) {
                elements.push(status[i])
            }
        }
        elements = elements.join('\n')



        let t1 = performance.now()
        let timer = `Resolve time: ${((t1 - t0) / 1000).toFixed(2)}s`



        res.render('dns', { ns: ns, a: a, mx: mx, txt: txt, timer: timer, registrar: registrar, status: elements, created: created, expire: expire })

    } catch (err) {
        res.json({ message: err.message })
    }

})


module.exports = router