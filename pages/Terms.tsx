
import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/Card';
import SEO from '../components/SEO';

const Terms: React.FC = () => {
    return (
        <Card className="max-w-4xl mx-auto">
            <SEO 
                title="Terms & Conditions" 
                description="Read the Terms and Conditions regarding the use of Smart Calculator 8n."
            />
            <CardHeader>
                <CardTitle>Terms & Conditions</CardTitle>
                <p className="text-sm text-text-secondary">Last Updated: November 2025</p>
            </CardHeader>
            <CardContent className="prose prose-invert prose-p:text-text-secondary prose-headings:text-text-primary prose-strong:text-text-primary max-w-none">
                <p>Welcome to Smart Calculator 8n. These Terms and Conditions (“Terms”) govern your access to and use of our mobile application (“App”). Please read them carefully before using the App.</p>

                <h3>1. Acceptance of Terms</h3>
                <p>By downloading or using Smart Calculator 8n, you agree to these Terms. If you do not agree, please uninstall the App immediately.</p>

                <h3>2. Use of the App</h3>
                <ul>
                    <li>This App provides general calculation tools including BMI Calculator, Loan Calculator, Compound Interest Calculator, and Calorie Calculator.</li>
                    <li>The results generated are for informational purposes only and should not be considered as professional advice.</li>
                    <li>You agree not to misuse, modify, or reverse-engineer any part of the App.</li>
                </ul>

                <h3>3. Intellectual Property</h3>
                <p>All content, design, and code within Smart Calculator 8n are owned by the developer and protected under copyright laws.</p>

                <h3>4. Limitation of Liability</h3>
                <p>We are not responsible for any loss or damage resulting from inaccurate data, misuse of the App, or technical issues.</p>

                <h3>5. Updates and Modifications</h3>
                <p>We may update or modify these Terms anytime. Continued use of the App means you accept the revised Terms.</p>

                <h3>6. Contact</h3>
                <p>If you have any questions, please contact us using the “Contact Us” page.</p>
            </CardContent>
        </Card>
    );
};

export default Terms;