import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ConsultationModal = () => {
  const { isConsultationOpen, setIsConsultationOpen, addConsultation } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    occasion: 'Bridal Matrimony',
    preferredFabric: 'Pure Muga Silk',
    consultationType: 'Private Atelier (Guwahati)',
    preferredDate: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [referenceCode, setReferenceCode] = useState('');

  if (!isConsultationOpen) return null;

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = 'Please provide a valid email';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errs.phone = 'Please enter a valid phone number';
    }
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    const randomCode = 'AX-BR-' + Math.floor(100000 + Math.random() * 900000);
    setReferenceCode(randomCode);
    addConsultation({
      id: randomCode,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      occasion: formData.occasion,
      preferredFabric: formData.preferredFabric,
      consultationType: formData.consultationType,
      preferredDate: formData.preferredDate,
      message: formData.message
    });
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      occasion: 'Bridal Matrimony',
      preferredFabric: 'Pure Muga Silk',
      consultationType: 'Private Atelier (Guwahati)',
      preferredDate: '',
      message: ''
    });
    setIsSubmitted(false);
    setIsConsultationOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#24211D]/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsConsultationOpen(false)}
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] border border-[#B69A62]/40 shadow-2xl z-10 my-8 overflow-hidden">
        
        {/* Gold Border Top Accent */}
        <div className="h-1.5 bg-gradient-to-r from-[#B69A62] via-[#E8DFD1] to-[#B69A62]" />

        {/* Close Button */}
        <button
          onClick={() => setIsConsultationOpen(false)}
          className="absolute top-4 right-4 p-2 text-[#24211D]/70 hover:text-[#24211D] transition-colors rounded-full hover:bg-[#E8DFD1]/50 z-20"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-10 max-h-[85vh] overflow-y-auto">
          
          {isSubmitted ? (
            /* Confirmation Success State */
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-[#B69A62]/15 flex items-center justify-center text-[#B69A62]">
                <CheckCircle2 size={36} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold block mb-2">
                Consultation Request Received
              </span>
              <h3 className="font-serif text-3xl text-[#24211D] font-normal mb-3">
                Thank You, {formData.name}
              </h3>
              <p className="text-sm text-[#24211D]/75 font-light max-w-md mx-auto mb-6 leading-relaxed">
                Your private bridal & couture appointment dossier has been logged. Our senior silk concierge will reach out via WhatsApp & email within 24 hours.
              </p>

              <div className="bg-[#FFFFFF] border border-[#E8DFD1] p-5 max-w-md mx-auto mb-8 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-[#E8DFD1] pb-2">
                  <span className="text-[#24211D]/60 uppercase tracking-wider">Inquiry Reference</span>
                  <span className="font-mono font-bold text-[#B69A62]">{referenceCode}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#24211D]/60">Occasion:</span>
                  <span className="font-medium text-[#24211D]">{formData.occasion}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#24211D]/60">Selected Fabric:</span>
                  <span className="font-medium text-[#24211D]">{formData.preferredFabric}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#24211D]/60">Location / Format:</span>
                  <span className="font-medium text-[#24211D]">{formData.consultationType}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#24211D]/50 italic mb-6">
                * Note: Frontend demonstration only. No live external booking system was contacted.
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3.5 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] transition-colors text-xs uppercase tracking-[0.2em] font-medium"
              >
                Close Window
              </button>
            </div>
          ) : (
            /* Input Form */
            <div>
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] text-[#B69A62] font-semibold mb-2">
                  <Sparkles size={14} />
                  <span>Juthika by Momita Haute Couture Atelier</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#24211D] font-normal">
                  Book a Custom Bridal Consultation
                </h3>
                <p className="text-xs sm:text-sm text-[#24211D]/70 font-light mt-2 max-w-lg mx-auto">
                  Reserve a personalized one-on-one session with our master drapers and silversmiths 
                  for bespoke Mekhela Chador ensembles and wedding trousseaus.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Priyadarshini Barooah"
                        className={`w-full bg-[#FFFFFF] border px-3 py-2.5 text-xs text-[#24211D] focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500' : 'border-[#E8DFD1] focus:border-[#B69A62]'
                        }`}
                      />
                    </div>
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
                      placeholder="client@couture.com"
                      className={`w-full bg-[#FFFFFF] border px-3 py-2.5 text-xs text-[#24211D] focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500' : 'border-[#E8DFD1] focus:border-[#B69A62]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone & Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Phone Number / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 9279125091"
                      className={`w-full bg-[#FFFFFF] border px-3 py-2.5 text-xs text-[#24211D] focus:outline-none transition-colors ${
                        errors.phone ? 'border-red-500' : 'border-[#E8DFD1] focus:border-[#B69A62]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Preferred Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2.5 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                    />
                  </div>
                </div>

                {/* Occasion & Preferred Fabric */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Occasion
                    </label>
                    <select
                      value={formData.occasion}
                      onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2.5 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                    >
                      <option value="Bridal Matrimony">Bridal Matrimony (Assamese Wedding)</option>
                      <option value="Reception Gala">Royal Reception Gala</option>
                      <option value="Sangeet & Joron">Joron & Sangeet Ceremonies</option>
                      <option value="Trousseau Curation">Complete Wedding Trousseau</option>
                      <option value="Milestone Couture">Milestone Occasion</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                      Preferred Fabric
                    </label>
                    <select
                      value={formData.preferredFabric}
                      onChange={(e) => setFormData({ ...formData, preferredFabric: e.target.value })}
                      className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2.5 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                    >
                      <option value="Pure Muga Silk">Pure Golden Muga Silk (GI Certified)</option>
                      <option value="Ceremonial Paat Silk">Luminous White & Jewel Paat Silk</option>
                      <option value="Ahimsa Eri Silk">Cruelty-Free Ahimsa Eri Silk</option>
                      <option value="Muga-Paat Hybrid">Muga & Paat Heritage Blend</option>
                      <option value="Not Sure / Expert Guidance">Need Guidance from Stylist</option>
                    </select>
                  </div>
                </div>

                {/* Consultation Format */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                    Consultation Format
                  </label>
                  <select
                    value={formData.consultationType}
                    onChange={(e) => setFormData({ ...formData, consultationType: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2.5 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                  >
                    <option value="Private Atelier (Guwahati)">Guwahati Flagship Atelier (In-Person)</option>
                    <option value="Private Suite (New Delhi)">New Delhi Private Suite (In-Person)</option>
                    <option value="Virtual Video Atelier">High-Definition Virtual Video Atelier (Global)</option>
                  </select>
                </div>

                {/* Message / Bespoke Notes */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#24211D] mb-1 font-medium">
                    Bespoke Notes & Special Requests
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share any preferred motifs (Kingkhap, Singkhap), color palette, or wedding dates..."
                    className="w-full bg-[#FFFFFF] border border-[#E8DFD1] px-3 py-2 text-xs text-[#24211D] focus:outline-none focus:border-[#B69A62]"
                  />
                </div>

                {/* Submit CTA */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#24211D] text-[#FFFFFF] hover:bg-[#B69A62] text-xs uppercase tracking-[0.25em] font-medium transition-colors shadow-md"
                  >
                    Request Private Appointment
                  </button>
                  <p className="text-[10px] text-center text-[#24211D]/60 mt-2">
                    Complimentary initial consultation &bull; No obligation &bull; Strictly confidential
                  </p>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
