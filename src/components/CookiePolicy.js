import React from 'react';

const CookiePolicy = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '24px' }}>Cookie Policy</h1>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>No Cookies Used</h2>
        <p style={{ lineHeight: '1.6', color: '#4B5563' }}>
          Our website does not use cookies to collect, store, or track any personal data. We are committed to ensuring 
          a private and secure browsing experience for all visitors.
        </p>
      </section>

      <section style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Future Updates</h2>
        <p style={{ lineHeight: '1.6', color: '#4B5563' }}>
          If we decide to implement cookies for functionality, analytics, or other purposes in the future, we will 
          update this policy and notify users where necessary.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Contact Us</h2>
        <p style={{ lineHeight: '1.6', color: '#4B5563' }}>
          If you have any questions about our Cookie Policy, please contact us at egornovik2010@gmail.com.
        </p>
      </section>
    </div>
  );
};

export default CookiePolicy;
