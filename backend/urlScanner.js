const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dns = require('dns').promises;
const whois = require('whois-json');
const https = require('https');
const { URL } = require('url');
const net = require('net');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PHISHING_DB = new Set(["evil.com", "phishingsite.org"]);
const MALWARE_DOMAINS = new Set(["malware-domain.com", "badhost.net"]);
const SUSPICIOUS_TLDS = new Set(["xyz", "top", "club", "online", "site", "info", "buzz", "work", "click", "support"]);

function validateUrl(inputUrl) {
    try {
        if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
            inputUrl = 'https://' + inputUrl;
        }
        const urlObj = new URL(inputUrl);
        return urlObj.href;
    } catch (err) {
        return null;
    }
}

async function checkSSLCertificate(domain) {
    return new Promise((resolve) => {
        const options = {
            host: domain,
            port: 443,
            method: 'GET',
            rejectUnauthorized: false,
        };

        const req = https.request(options, (res) => {
            const cert = res.socket.getPeerCertificate();
            if (cert && Object.keys(cert).length) {
                resolve({ has_ssl: true, valid: true });
            } else {
                resolve({ has_ssl: false, valid: false });
            }
        });

        req.on('error', () => {
            resolve({ has_ssl: false, valid: false });
        });

        req.end();
    });
}

async function checkDNS(domain) {
    try {
        const mxRecords = await dns.resolveMx(domain);
        return {
            has_mx: mxRecords.length > 0,
            has_dmarc: false,  // Can be implemented with TXT record lookup
            has_dkim: false
        };
    } catch (err) {
        return { has_mx: false, has_dmarc: false, has_dkim: false };
    }
}

async function checkDomainAge(domain) {
    try {
        const result = await whois(domain);
        const creationDate = new Date(result.creationDate || result.createdDate);
        const ageInDays = Math.floor((Date.now() - creationDate.getTime()) / (1000 * 60 * 60 * 24));
        return ageInDays;
    } catch {
        return null;
    }
}

function checkThreats(domain) {
    const is_phishing = PHISHING_DB.has(domain);
    const is_malware = MALWARE_DOMAINS.has(domain);
    return {
        is_phishing,
        is_malware,
        threat_score: is_phishing || is_malware ? 80 : 0
    };
}

function isIpAddress(domain) {
    return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(domain);
}

function hasSuspiciousTld(domain) {
    const parts = domain.split('.');
    const tld = parts[parts.length - 1];
    return SUSPICIOUS_TLDS.has(tld);
}

function hasExcessiveHyphens(domain) {
    return (domain.match(/-/g) || []).length > 3;
}

function isLongUrl(url) {
    return url.length > 75;
}

function calculateRiskScore(checks) {
    let score =
        (checks.ssl.has_ssl ? 0 : 20) +
        (checks.ssl.valid ? 0 : 15) +
        (checks.dns.has_mx ? 0 : 10) +
        (checks.domain_age !== null && checks.domain_age < 30 ? 20 : 0) +
        checks.threats.threat_score +
        (checks.ip_reputation ? 0 : 15);

    // New heuristics
    if (checks.suspicious_tld) score += 10;
    if (checks.excessive_hyphens) score += 10;
    if (checks.is_ip_address) score += 15;
    if (checks.long_url) score += 10;

    return Math.min(score, 100);
}

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong on the server!' });
});

app.post('/scan', async (req, res) => {
    try {
        const url = validateUrl(req.body.url || '');
        if (!url) return res.status(400).json({ error: 'Invalid URL' });

        const domain = new URL(url).hostname;

        dns.lookup(domain).then(async ({ address }) => {
            const ssl = await checkSSLCertificate(domain);
            const dnsCheck = await checkDNS(domain);
            const domainAge = await checkDomainAge(domain);
            const threats = checkThreats(domain);
            const ipReputation = !address.startsWith('185.') && !address.startsWith('123.');

            // New heuristics
            const suspiciousTld = hasSuspiciousTld(domain);
            const excessiveHyphens = hasExcessiveHyphens(domain);
            const isIp = isIpAddress(domain);
            const longUrl = isLongUrl(url);

            const checks = {
                ssl,
                dns: dnsCheck,
                domain_age: domainAge,
                threats,
                ip_reputation: ipReputation,
                suspicious_tld: suspiciousTld,
                excessive_hyphens: excessiveHyphens,
                is_ip_address: isIp,
                long_url: longUrl
            };
            const risk = calculateRiskScore(checks);

            const riskLevel = risk > 70 ? 'High' : risk > 30 ? 'Medium' : 'Low';

            return res.json({
                status: 'completed',
                url,
                domain,
                ip: address,
                is_malicious: threats.is_malware || threats.is_phishing,
                security_risk: riskLevel,
                risk_percentage: risk,
                threat_details: {
                    ssl_issues: !ssl.valid,
                    no_mx_records: !dnsCheck.has_mx,
                    new_domain: domainAge !== null && domainAge < 30,
                    known_threat: threats.is_malware || threats.is_phishing,
                    bad_ip_reputation: !ipReputation,
                    suspicious_tld: suspiciousTld,
                    excessive_hyphens: excessiveHyphens,
                    is_ip_address: isIp,
                    long_url: longUrl
                },
                timestamp: new Date().toISOString()
            });

        }).catch(() => res.status(404).json({ error: 'Host not found' }));

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`URL Scanner server running on port ${PORT}`)); 