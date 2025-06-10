import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaQrcode, FaQuestionCircle, FaInfoCircle } from 'react-icons/fa';
import '../css/UrlScanner.css';

export default function UrlScanner() {
    const [url, setUrl] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleHelpClick = () => {
        navigate('/help');
    };

    const scanUrl = async () => {
        setError('');
        setResults(null);
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || `Server returned ${response.status}`);
            }

            setResults(data);
        } catch (err) {
            console.error('Scan error:', err);
            setError(err.message || 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            scanUrl();
        }
    };

    const getRiskClass = (percentage) => {
        if (percentage > 70) return 'high-risk';
        if (percentage > 30) return 'medium-risk';
        return 'low-risk';
    };

    return (
        <div className="url-scanner-outer" style={{ width: '100vw', minHeight: '100vh', background: 'linear-gradient(120deg, #e0eafc, #cfdef3)', padding: 0, margin: 0 }}>
            <div className="url-scanner-container" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0' }}>
                <div className="challenge-header">
                    <h1>URL Security Scanner</h1>
                    <p className="challenge-description">
                        Analyze URLs for potential security threats and vulnerabilities. Learn to identify suspicious URLs and protect yourself from phishing attempts.
                    </p>
                </div>
                <div className="url-scanner-content">
                    <div className="scanner-box">
                        <input
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter URL to scan (e.g., http://example.com)"
                            disabled={loading}
                            id="url-input"
                        />
                        <button 
                            onClick={scanUrl} 
                            disabled={loading}
                            className="scan-button"
                        >
                            {loading ? 'Scanning...' : 'Scan URL'}
                        </button>
                    </div>

                    {loading && (
                        <div className="scanning-progress">
                            <div className="progress-bar loading"></div>
                            <p>Scanning {url}...</p>
                        </div>
                    )}

                    {error && <div className="alert error">{error}</div>}

                    {results && (
                        <div className={`result-card ${getRiskClass(results.risk_percentage)}`}>
                            <h3>Scan Results for: {results.url}</h3>
                            <div className="result-grid">
                                <div className="result-item">
                                    <span className="label">Domain:</span>
                                    <span className="value">{results.domain}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">IP Address:</span>
                                    <span className="value">{results.ip}</span>
                                </div>
                                <div className="result-item">
                                    <span className="label">Security Status:</span>
                                    <span className={`value ${getRiskClass(results.risk_percentage)}`}>{results.security_risk}</span>
                                </div>
                            </div>

                            <div className="security-meter">
                                <div className="risk-labels">
                                    <span>Safe</span>
                                    <span>Caution</span>
                                    <span>Danger</span>
                                </div>
                                <div className="progress-track">
                                    <div 
                                        className={`progress-fill ${getRiskClass(results.risk_percentage)}`} 
                                        style={{ width: `${results.risk_percentage}%` }}
                                    >
                                        <span className="risk-percentage">{results.risk_percentage}%</span>
                                    </div>
                                </div>
                            </div>

                            {Object.values(results.threat_details).some(Boolean) ? (
                                <div className="threat-details">
                                    <h4>Potential Threats Detected:</h4>
                                    <ul>
                                        {results.threat_details.ssl_issues && <li>SSL Certificate Issues</li>}
                                        {results.threat_details.no_mx_records && <li>No MX Records</li>}
                                        {results.threat_details.new_domain && <li>Newly Registered Domain</li>}
                                        {results.threat_details.known_threat && <li>Known Threat</li>}
                                        {results.threat_details.bad_ip_reputation && <li>Suspicious IP</li>}
                                    </ul>
                                </div>
                            ) : (
                                <div className="threat-details clean">No significant threats detected</div>
                            )}

                            <p className="timestamp">Scanned at: {new Date(results.timestamp).toLocaleString()}</p>
                        </div>
                    )}
                </div>
                <div className="scanner-details-card" style={{marginTop: 32, background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)', padding: 24, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto'}}>
                    <h2 style={{color: '#1a237e', fontSize: '1.3rem', marginBottom: 12}}>How does the URL Scanner work?</h2>
                    <ul style={{fontSize: '1.05rem', color: '#333', lineHeight: 1.7, paddingLeft: 24}}>
                        <li><b>SSL Certificate:</b> Checks if the site uses HTTPS and has a valid SSL certificate.</li>
                        <li><b>DNS Records:</b> Looks for MX records and other DNS signals of legitimacy.</li>
                        <li><b>Domain Age:</b> Flags newly registered domains as higher risk.</li>
                        <li><b>Threat Databases:</b> Compares the domain to known phishing and malware lists.</li>
                        <li><b>IP Reputation:</b> Checks if the IP address is associated with suspicious activity.</li>
                        <li><b>Risk Score:</b> Combines all factors to give an overall risk percentage and status.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
} 