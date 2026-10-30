import React, { useState } from 'react';
import { 
  Mail,
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown
} from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Client Concierge & Styling',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.message.trim()) errs.message = 'Please enter your message';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: "How can I verify the authenticity of pure Assamese Muga and Paat silk?",
      a: "Every Juthika by Momita garment is shipped with an authorized GI (Geographical Indication) Tag Certificate and a numbered provenance dossier signed by the master artisan who threw the shuttle."
    },
    {
      q: "Do you offer bespoke custom tailoring and size customizations?",
      a: "Yes. All Mekhela Chador sets can be delivered either as traditional unstitched fabric lengths with matching blouse fabric, or fully pre-draped and tailored to your exact measurements via our virtual concierge."
    },
    {
      q: "What is your complimentary white-glove worldwide shipping policy?",
      a: "We provide fully insured, temperature-controlled courier shipping across India (3–5 business days) and internationally to the US, UK, Europe, UAE, and Singapore (6–9 business days)."
    },
    {
      q: "Can I schedule a private viewing in Guwahati or New Delhi?",
      a: "Absolutely. Private salon viewings and VIP bridal appointments can be booked at our Sualkuchi Flagship or our private suite in New Delhi with 48 hours notice."
    }
  ];

  return (
    <div className="bg-[#FFFFFF] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-3">
            <span>Private Client Concierge</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#24211D] font-light tracking-wide mb-4">
            Connect With the Atelier
          </h1>
          <p className="text-sm sm:text-base text-[#24211D]/80 font-light leading-relaxed">
            Whether inquiring about bespoke bridal commissions, private viewings, or caring for an heirloom piece, 
            our dedicated silk concierge is at your service.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Left Column: Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-12 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#B69A62]/15 text-[#B69A62] flex items-center justify-center">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-serif text-3xl text-[#24211D]">Message Received</h3>
                <p className="text-xs sm:text-sm text-[#24211D]/75 font-light max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-medium text-[#24211D]">{formData.name}</span>. Your dispatch has been logged with our client concierge desk. A senior stylist will reply to <span className="text-[#B69A62]">{formData.email}</span> within 24 hours.
                </p>
                <div className="text-[11px] text-[#24211D]/50 italic pt-2">
                  * Note: Frontend demonstration only. No backend server was contacted.
                </div>
                <div className="pt-6">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        subject: 'Client Concierge & Styling',
                        message: ''
                      });
                    }}
                    className="px-6 py-3 bg-[#24211D] text-[#FFFFFF] text-xs uppercase tracking-widest font-medium hover:bg-[#B69A62] transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#B69A62] font-semibold block mb-1">
                    Send an Inquiry
                  </span>
                  <h3 className="font-serif text-2xl text-[#24211D] font-normal">
                    How May We Assist You?
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder=""
                      className={`w-full bg-[#FFFFFF] border px-3.5 py-3 text-xs text-[#24211D] focus:outline-none transition-colors ${
                        errors.name ? 'border-red-500' : 'border-[#E8DFD1] focus:border-[#B69A62]'
                      }`}
                    />
                    {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder=""
                      className={`w-full bg-[#FFFFFF] border px-3.5 py-3 text-xs text-[#24211D] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#E8DFD1] focus:border-[#B69A62]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9279125091"
                      className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3.5 py-3 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3.5 py-3 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                    >
                      <option value="Client Concierge & Styling">Client Concierge & Styling</option>
                      <option value="Bespoke Bridal Commission">Bespoke Bridal Commission</option>
                      <option value="Private Atelier Appointment">Private Atelier Appointment</option>
                      <option value="Silk Care & Restoration">Silk Care & Restoration</option>
                      <option value="Press & Monograph Requests">Press & Monograph Requests</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the piece you are considering or specific questions regarding our weaves..."
                    className={`w-full bg-[#FFFFFF] border px-3.5 py-3 text-xs text-[#24211D] focus:outline-none transition-colors ${
                      errors.message ? 'border-red-500' : 'border-[#E8DFD1] focus:border-[#B69A62]'
                    }`}
                  />
                  {errors.message && <p className="text-[10px] text-red-500 mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
                >
                  Transmit Message to Concierge
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Physical Ateliers & Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Flagship Atelier Card */}
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-[#B69A62] w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B69A62] font-semibold block">
                    Heritage Flagship
                  </span>
                  <h4 className="font-serif text-xl text-[#24211D]">Sualkuchi Silk Quarter</h4>
                  <p className="text-xs text-[#24211D]/75 font-light mt-1 leading-relaxed">
                    Main Loom Road, Kamrup, Sualkuchi, Assam 781103 <br />
                    (With Private Draping Lounge on GS Road, Guwahati)
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E8DFD1] text-xs text-[#24211D]/80">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#B69A62]" />
                  <span>+91 361 298 7654 / +91 98640 12345</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#B69A62]" />
                  <span>concierge@juthikabymomita.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#B69A62]" />
                  <span>Mon – Sat: 10:30 AM – 7:30 PM (By Appointment)</span>
                </div>
              </div>
            </div>

            {/* New Delhi Private Suite */}
            <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-8">
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="text-[#B69A62] w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#B69A62] font-semibold block">
                    Capital Suite
                  </span>
                  <h4 className="font-serif text-xl text-[#24211D]">New Delhi Private Salon</h4>
                  <p className="text-xs text-[#24211D]/75 font-light mt-1 leading-relaxed">
                    The Qutub Boulevard, Mehrauli & The Chanakya Suite, New Delhi 110030
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-[#E8DFD1] text-xs text-[#24211D]/80">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#B69A62]" />
                  <span>+91 9279125091</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#B69A62]" />
                  <span>delhi.salon@juthikabymomita.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-[#B69A62]" />
                  <span>Tue – Sun: 11:00 AM – 8:00 PM (By Prior Booking)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* FAQ Accordion Section */}
        <section className="bg-[#FFFFFF] border border-[#E8DFD1] p-8 sm:p-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-1">
              Atelier Inquiries
            </span>
            <h3 className="font-serif text-3xl text-[#24211D] font-light">
              Frequently Clarified Questions
            </h3>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[#E8DFD1]">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-serif text-lg text-[#24211D] font-normal hover:text-[#B69A62] transition-colors">
                    {faq.q}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#B69A62] transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <p className="mt-3 text-xs sm:text-sm text-[#24211D]/75 font-light leading-relaxed pl-1">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
