const dnsRecords = require('@layered/dns-records')




async function nsResolver(domain) {
    const result = await dnsRecords.getNameServers(domain)
    return result
}

async function aResolver(domain) {
    const result = await dnsRecords.getDnsRecords(domain, 'A')
    return result
}

async function mxResolver(domain) {
    const result = await dnsRecords.getDnsRecords(domain, 'MX')
    return result
}

async function txtResolver(domain) {
    const result = await dnsRecords.getDnsRecords(domain, 'TXT')
    return result
}



module.exports = {
    nsResolver,
    aResolver,
    mxResolver,
    txtResolver,

}