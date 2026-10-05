import React, { useState } from 'react';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { InstagramIcon, LinkedinIcon, GithubIcon } from '../components/SocialIcons';
import { useApp } from '../context/AppContext';

export default function Contact() {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) errs.subject = 'Please enter a subject.';
    if (!formData.message.trim()) errs.message = 'Please type your message.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setErrors({});
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT COLUMN: Contact Information */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-emerald-50 tracking-tight">
              Get in Touch
            </h1>
            <p className="text-base text-slate-600 dark:text-emerald-100/70 mt-2 leading-relaxed">
              Have questions, suggestions or feedback? <br />
              We’d love to hear from you.
            </p>
          </div>

          {/* Contact Details List */}
          <div className="space-y-6 pt-2">
            
            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950 dark:border dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-emerald-400/60 uppercase tracking-wider">Email</p>
                <a
                  href="mailto:lohith012@gmail.com"
                  className="text-base font-semibold text-slate-800 dark:text-emerald-100 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                >
                  lohith012@gmail.com
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100/70 dark:bg-emerald-950 dark:border dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 dark:text-emerald-400/60 uppercase tracking-wider">Location</p>
                <p className="text-base font-semibold text-slate-800 dark:text-emerald-100">
                  Guntur, India
                </p>
              </div>
            </div>

            {/* Follow Us */}
            <div className="space-y-3 pt-2">
              <p className="text-xs font-bold text-slate-400 dark:text-emerald-400/60 uppercase tracking-wider">Follow Us</p>
              <div className="flex items-center space-x-3">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-emerald-950/80 dark:border dark:border-emerald-800/50 flex items-center justify-center text-slate-600 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-emerald-950/80 dark:border dark:border-emerald-800/50 flex items-center justify-center text-slate-600 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-emerald-950/80 dark:border dark:border-emerald-800/50 flex items-center justify-center text-slate-600 dark:text-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/60 hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-[#09231A]/90 rounded-3xl border border-slate-200/90 dark:border-emerald-900/60 p-6 sm:p-10 shadow-xs">
            {isSent && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold">Message sent successfully!</p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-300/80">Thank you for reaching out. We will get back to you shortly.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400/40 bg-slate-50/50 dark:bg-emerald-950/80 focus:bg-white dark:focus:bg-emerald-950 focus:outline-hidden transition-all ${
                    errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 dark:border-emerald-800/60 focus:border-emerald-500'
                  }`}
                />
                {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400/40 bg-slate-50/50 dark:bg-emerald-950/80 focus:bg-white dark:focus:bg-emerald-950 focus:outline-hidden transition-all ${
                    errors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 dark:border-emerald-800/60 focus:border-emerald-500'
                  }`}
                />
                {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400/40 bg-slate-50/50 dark:bg-emerald-950/80 focus:bg-white dark:focus:bg-emerald-950 focus:outline-hidden transition-all ${
                    errors.subject ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 dark:border-emerald-800/60 focus:border-emerald-500'
                  }`}
                />
                {errors.subject && <p className="text-xs text-rose-500 mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-emerald-200 uppercase tracking-wider mb-1.5">
                  Message
                </label>
                <textarea
                  rows="4"
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 dark:text-emerald-100 placeholder-slate-400 dark:placeholder-emerald-400/40 bg-slate-50/50 dark:bg-emerald-950/80 focus:bg-white dark:focus:bg-emerald-950 focus:outline-hidden transition-all resize-none ${
                    errors.message ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 dark:border-emerald-800/60 focus:border-emerald-500'
                  }`}
                />
                {errors.message && <p className="text-xs text-rose-500 mt-1">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
