import React, { useState } from 'react';
import Card, { CardContent } from '../components/Card';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'success'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate form submission
        setStatus('success');
        // Reset form after 3 seconds
        setTimeout(() => {
            setStatus('idle');
            setFormData({ name: '', email: '', message: '' });
        }, 3000);
    };

    return (
        <div className="max-w-2xl mx-auto">
            <SEO 
                title="Contact Us" 
                description="Get in touch with the Smart Calculator 8n team. We are here to help with your questions and feedback."
            />
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-text-primary sm:text-4xl">Contact Us</h1>
                <p className="mt-2 text-lg text-text-secondary">
                    Have questions, feedback, or need support? We'd love to hear from you.
                </p>
            </div>

            <Card>
                <CardContent>
                    {status === 'success' ? (
                        <div className="bg-green-900/30 border border-green-500 text-green-300 p-4 rounded-md text-center">
                            <p className="font-semibold">Message Sent!</p>
                            <p className="text-sm">Thank you for contacting us. We will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 text-text-primary placeholder-text-secondary/50"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 text-text-primary placeholder-text-secondary/50"
                                    placeholder="you@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-text-secondary mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="block w-full bg-secondary border-border rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-3 text-text-primary placeholder-text-secondary/50"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </CardContent>
            </Card>

            <div className="mt-8 text-center text-text-secondary text-sm">
                <p>Or email us directly at <a href="mailto:smartcalculator8n@gmail.com" className="text-primary hover:underline">smartcalculator8n@gmail.com</a></p>
            </div>
        </div>
    );
};

export default Contact;