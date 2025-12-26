import React from 'react';
import Card, { CardContent, CardHeader, CardTitle } from '../components/Card';
import SEO from '../components/SEO';

const Disclaimer: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto">
            <SEO 
                title="Disclaimer" 
                description="Disclaimer for Smart Calculator 8n. Information provided is for general informational purposes only."
            />
            <Card>
                <CardHeader>
                    <CardTitle>Disclaimer</CardTitle>
                    <p className="text-sm text-text-secondary">Last Updated: November 2025</p>
                </CardHeader>
                <CardContent className="prose prose-invert prose-p:text-text-secondary prose-headings:text-text-primary prose-strong:text-text-primary max-w-none">
                    <p>
                        The information provided by Smart Calculator 8n ("we," "us," or "our") on our mobile application is for general informational purposes only. All information on the mobile application is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on our mobile application.
                    </p>

                    <h3>1. Professional Disclaimer</h3>
                    <p>
                        The mobile application cannot and does not contain financial, medical, or health advice. The financial and health information is provided for general informational and educational purposes only and is not a substitute for professional advice.
                    </p>
                    <p>
                        Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. We do not provide any kind of financial or medical advice. The use or reliance of any information contained on our mobile application is solely at your own risk.
                    </p>

                    <h3>2. Calculation Results</h3>
                    <p>
                        The calculators provided within this application (including but not limited to BMI, Loan, Compound Interest, and Calorie calculators) are intended for illustrative purposes only. The results are estimates based on information you provide and may not reflect actual results. We are not responsible for any errors or omissions, or for the results obtained from the use of this information.
                    </p>

                    <h3>3. External Links Disclaimer</h3>
                    <p>
                        The mobile application may contain (or you may be sent through the mobile application) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default Disclaimer;