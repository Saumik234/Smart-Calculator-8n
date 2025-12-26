import React from 'react';
import { Link } from 'react-router-dom';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';

const Settings: React.FC = () => {
    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Settings & Information</CardTitle>
                <CardDescription>View legal information and contact details for the app.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <li>
                        <Link to="/about" className="block p-4 bg-secondary rounded-lg hover:bg-border transition-colors">
                            <h3 className="font-semibold text-text-primary">About Us</h3>
                            <p className="text-sm text-text-secondary">Learn more about the Smart Calculator 8n app.</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/terms" className="block p-4 bg-secondary rounded-lg hover:bg-border transition-colors">
                            <h3 className="font-semibold text-text-primary">Terms & Conditions</h3>
                            <p className="text-sm text-text-secondary">Read the terms that govern your use of the app.</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/privacy" className="block p-4 bg-secondary rounded-lg hover:bg-border transition-colors">
                            <h3 className="font-semibold text-text-primary">Privacy Policy</h3>
                            <p className="text-sm text-text-secondary">Learn how we handle your data.</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="block p-4 bg-secondary rounded-lg hover:bg-border transition-colors">
                            <h3 className="font-semibold text-text-primary">Contact Us</h3>
                            <p className="text-sm text-text-secondary">Get in touch with our support team.</p>
                        </Link>
                    </li>
                </ul>
            </CardContent>
        </Card>
    );
};

export default Settings;
