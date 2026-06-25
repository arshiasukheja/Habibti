import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Button from './Button';

const ContactForm = () => {
  const [searchParams] = useSearchParams();
  const initialProduct = searchParams.get('product');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: initialProduct ? `Private Viewing: ${initialProduct}` : '',
    message: initialProduct 
      ? `Hello Habibti Studio,\n\nI would love to request a private viewing consultation for the "${initialProduct}". Please let me know the availability and sizing options.\n\nWarm regards,` 
      : ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-transparent">
      {submitted ? (
        <div className="text-center py-12 px-6 border border-brand-gold/30 bg-brand-stone/10">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-gold block mb-2">Message Sent</span>
          <h3 className="text-2xl font-light tracking-wide text-brand-dark mb-4">Thank You</h3>
          <p className="text-xs text-brand-muted font-light leading-relaxed max-w-sm mx-auto">
            We have received your message and will respond shortly. For immediate inquiries, please reach out via Instagram.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="text" className="mt-8">
            Send another message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.2em] text-brand-dark/70 mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aaliyah Khan"
              className="w-full bg-white border border-brand-dark/10 px-4 py-3.5 text-xs tracking-wider placeholder-brand-dark/30 focus:border-brand-gold focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.2em] text-brand-dark/70 mb-2 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. name@example.com"
              className="w-full bg-white border border-brand-dark/10 px-4 py-3.5 text-xs tracking-wider placeholder-brand-dark/30 focus:border-brand-gold focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-[10px] uppercase tracking-[0.2em] text-brand-dark/70 mb-2 font-medium">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="e.g. Bespoke Fitting / General Inquiry"
              className="w-full bg-white border border-brand-dark/10 px-4 py-3.5 text-xs tracking-wider placeholder-brand-dark/30 focus:border-brand-gold focus:outline-none transition-colors"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-[10px] uppercase tracking-[0.2em] text-brand-dark/70 mb-2 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows="5"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              className="w-full bg-white border border-brand-dark/10 px-4 py-3.5 text-xs tracking-wider placeholder-brand-dark/30 focus:border-brand-gold focus:outline-none transition-colors resize-none"
            ></textarea>
          </div>

          <div className="pt-2">
            <Button type="submit" variant="primary" className="w-full">
              Send Message
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
