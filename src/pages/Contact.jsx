import React from 'react';
import SectionTitle from '../components/SectionTitle';
import ContactForm from '../components/ContactForm';
import { Mail, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pb-24 px-6 md:px-12" style={{ paddingTop: 'calc(var(--navbar-height, 64px) + 4rem)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <SectionTitle
          title="Contact Us"
          subtitle="Get in Touch"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mt-16 items-start">
          {/* Contact Details (Left Column) */}
          <div className="lg:col-span-5 space-y-10 lg:max-w-md select-none">
            <div className="space-y-4">
              <h3 className="text-2xl font-light text-brand-dark">Studio Inquiries</h3>
              <p className="text-xs text-brand-muted font-light leading-relaxed">
                Whether you have questions about sizing, fabric weight, or private lookbooks, our concierge team is available to assist you.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-brand-stone/80 text-brand-gold">
                  <Mail size={16} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-medium text-brand-dark/70 mb-1">Email</h4>
                  <a href="mailto:info@habibti.com" className="text-xs font-light text-brand-muted hover:text-brand-gold transition-colors">
                    info@habibti.com
                  </a>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-brand-stone/80 text-brand-gold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-medium text-brand-dark/70 mb-1">Instagram</h4>
                  <a href="https://instagram.com/habibti.modest" target="_blank" rel="noopener noreferrer" className="text-xs font-light text-brand-muted hover:text-brand-gold transition-colors">
                    @habibti.modest
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-brand-stone/80 text-brand-gold">
                  <MapPin size={16} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-medium text-brand-dark/70 mb-1">Design Studio</h4>
                  <p className="text-xs font-light text-brand-muted leading-relaxed">
                    12 Atelier District, Downtown Dubai,<br />
                    United Arab Emirates
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-brand-stone/80 text-brand-gold">
                  <Clock size={16} className="stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-medium text-brand-dark/70 mb-1">Hours</h4>
                  <p className="text-xs font-light text-brand-muted leading-relaxed">
                    Monday — Friday: 9:00 AM — 6:00 PM GST<br />
                    Saturday: By Appointment Only
                  </p>
                </div>
              </div>
            </div>

            {/* Simple Location Map Placeholder */}
            <div className="border border-brand-stone/60 p-1 bg-brand-stone/20 overflow-hidden aspect-video relative flex items-center justify-center text-center">
              <div className="absolute inset-0 bg-brand-stone/50 mix-blend-color"></div>
              <div className="z-10 text-center px-4">
                <span className="text-[9px] uppercase tracking-[0.2em] text-brand-gold font-medium mb-1 block">Map Location</span>
                <p className="text-[10px] text-brand-dark font-light">Downtown Dubai Atelier</p>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Column) */}
          <div className="lg:col-span-7">
            <div className="border border-brand-stone/60 p-8 md:p-12 bg-white/40 shadow-sm">
              <h3 className="text-xl font-light text-brand-dark mb-6">Send an Inquiry</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
