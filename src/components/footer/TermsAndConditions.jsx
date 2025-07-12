import React from 'react';

export default function TermsAndConditions() {
    return (
        <div className="container mx-auto  text-center px-8 py-24 space-y-8">
            <title>Terms and Conditions</title>
            <h1 className="text-2xl font-semibold mb-4">Terms and Conditions</h1>
            <p className="text-lg mb-2">
                Welcome to our website. By accessing and using this website, you agree to comply with the following terms and conditions.
            </p>
            <div className='text-left space-y-4 my-10 md:px-10 px-5 lg:px-20'>

                <p className="text-lg mb-2">
                    1. **Acceptance of Terms**: By using this site, you agree to these terms and conditions. If you do not agree, please refrain from using our website.
                </p>
                <p className="text-lg mb-2">
                    2. **Usage Restrictions**: You may not use this site for unlawful activities or in ways that could damage, disable, or impair the site.
                </p>
                <p className="text-lg mb-2">
                    3. **Content Ownership**: All content, including text, images, logos, and trademarks, are owned by our company or licensed by third parties.
                </p>
                <p className="text-lg mb-2">
                    4. **Limitation of Liability**: We are not responsible for any damages or losses arising from your use of this website.
                </p>
                <p className="text-lg mb-2">
                    5. **Modifications**: We reserve the right to update or change these terms at any time. Please review this page periodically for updates.
                </p>
            </div>

            <p className="text-lg">
                By continuing to use this site, you accept any changes to these terms.
            </p>
        </div>
    );
}
