import React from 'react';

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto  text-center px-8 py-24 space-y-8">
            <title>Privacy Policy</title>
            <h1 className="text-2xl font-semibold mb-4">Privacy Policy</h1>
            <p className="text-lg mb-2">
                This Privacy Policy explains how we collect, use, and protect your personal information.
            </p>
            <div className='text-left space-y-4 my-10 md:px-10 px-5 lg:px-20'>
                <p className="text-lg mb-2">
                    1. **Information We Collect**: We may collect personal information such as your name, email address, and usage data when you visit or interact with our website.
                </p>
                <p className="text-lg mb-2">
                    2. **Use of Information**: We use your personal information to improve our services, communicate with you, and personalize your experience.
                </p>
                <p className="text-lg mb-2">
                    3. **Data Protection**: We take reasonable measures to protect your information from unauthorized access, alteration, or disclosure.
                </p>
                <p className="text-lg mb-2">
                    4. **Cookies**: We may use cookies to enhance your browsing experience and collect data on site usage.
                </p>
                <p className="text-lg mb-2">
                    5. **Third-Party Services**: We do not sell or share your personal information with third parties, except for services necessary to provide our services to you.
                </p>
                <p className="text-lg mb-2">
                    6. **Your Rights**: You have the right to access, correct, or delete your personal information at any time by contacting us.
                </p>
            </div>

            <p className="text-lg">
                If you have any questions or concerns about our privacy practices, please contact us.
            </p>
        </div>
    );
}
