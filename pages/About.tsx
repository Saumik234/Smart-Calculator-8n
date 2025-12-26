
import React from 'react';
import Card, { CardContent, CardHeader, CardTitle, CardDescription } from '../components/Card';
import SEO from '../components/SEO';

const About: React.FC = () => {
    return (
        <Card className="max-w-3xl mx-auto">
            <SEO 
                title="About Us" 
                description="Learn more about Smart Calculator 8n, your all-in-one tool for health and finance calculations."
            />
            <CardHeader>
                <CardTitle>About Smart Calculator 8n</CardTitle>
                <CardDescription>Your all-in-one tool for essential calculations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 prose prose-invert prose-p:text-text-secondary prose-headings:text-text-primary max-w-none">
                <p>
                    Smart Calculator 8n is a comprehensive application designed to simplify your daily health and financial planning.
                    Our mission is to provide an intuitive, reliable, and beautifully designed platform with a suite of essential calculators to assist you in making informed decisions.
                </p>
                
                <h3>Our Features</h3>
                <p>
                    Whether you are tracking your health goals, planning for a major purchase, or managing your investments, Smart Calculator 8n has the tools you need:
                </p>
                <ul>
                    <li><strong>BMI Calculator:</strong> Quickly check your Body Mass Index to stay on top of your health.</li>
                    <li><strong>Loan Calculator:</strong> Understand your loan commitments with detailed estimations of monthly payments, total payments, and total interest.</li>
                    <li><strong>Compound Interest Calculator:</strong> Visualize the growth of your investments over time and plan for your financial future.</li>
                    <li><strong>Calorie Calculator:</strong> Get a personalized estimate of your daily calorie needs to help you manage your diet and fitness goals.</li>
                </ul>

                <h3>Our Commitment</h3>
                <p>
                    We are dedicated to providing a seamless and user-friendly experience. Your privacy is important to us, and we are committed to protecting your data. All calculations are performed on your device, and we do not store your personal calculation history on our servers.
                </p>

                <p>
                    Thank you for choosing Smart Calculator 8n. We are constantly working to improve the app and welcome your feedback.
                </p>
            </CardContent>
        </Card>
    );
};

export default About;