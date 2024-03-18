import React from 'react';
import '../styles/Contact.css'

const ContactUs = () => {
  return (
    <div className='contactus'>
    <div className='page'>
      <h1 className='contact'>Contact Us</h1>
      
      <p>We're here to assist you! Feel free to reach out to us with any questions, feedback, or inquiries you may have.</p>
      <h5>Customer Support</h5>
      <p>For assistance with our music management system or any technical issues, please email us at support@musicmanagementsystem.com. 
        Our dedicated support team will be happy to help you resolve any issues promptly.</p>
    <h5>General Inquiries</h5>
    <p>For general inquiries or business-related questions, you can reach us at info@musicmanagementsystem.com. 
We welcome partnerships, collaborations, and any other inquiries you may have.</p>
    <h5>Social Media</h5>
    <p>Stay connected with us on social media for updates, news, and special announcements:
        <ul>
        <li>Twitter: @MusicManagementSys</li><li>Facebook: /MusicManagementSystem</li>
        <li>Instagram: @MusicManagementSystem</li>
        </ul>

</p>
    </div>
    </div>
  );
};

export default ContactUs;
