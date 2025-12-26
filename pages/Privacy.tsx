
import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/Card';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
    return (
        <Card className="max-w-4xl mx-auto">
            <SEO 
                title="Privacy Policy" 
                description="Our Privacy Policy outlines how we handle your data. We respect your privacy."
            />
            <CardHeader>
                <CardTitle>Privacy Policy</CardTitle>
                <p className="text-sm text-text-secondary">Last Updated: October 2025</p>
            </CardHeader>
            <CardContent className="prose prose-invert prose-p:text-text-secondary prose-headings:text-text-primary prose-strong:text-text-primary max-w-none">
                <p>At Smart Calculator 8n, we respect your privacy and are committed to protecting your personal information.</p>

                <h3>1. Information We Collect</h3>
                <ul>
                    <li><strong>Personal Data:</strong> We do not collect personally identifiable information unless you contact us directly.</li>
                    <li><strong>Usage Data:</strong> We may collect non-personal information like device type, operating system, and app usage for improvement purposes.</li>
                </ul>

                <h3>2. How We Use Information</h3>
                <p>Collected data helps us enhance app performance, fix bugs, and improve user experience.</p>

                <h3>3. Data Security</h3>
                <p>We implement reasonable measures to protect your data from unauthorized access or misuse.</p>

                <h3>4. Third-Party Services</h3>
                <p>Our App may contain links to external sites. We are not responsible for their privacy practices.</p>

                <h3>5. Children’s Privacy</h3>
                <p>The App is not intended for users under 13 years of age.</p>

                <h3>6. Changes to Policy</h3>
                <p>We may update this Privacy Policy periodically. Please review this page regularly for updates.</p>

                <h3>7. Contact</h3>
                <p>For any privacy-related questions, reach out via the Contact Us page.</p>
            </CardContent>
        </Card>
    );
};

export default Privacy;