
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter, Send, CheckCircle } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { toast } from 'sonner';

const Contact = () => {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  const [contactRef, isContactVisible] = useScrollAnimation(0.2);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [includeFullMessage, setIncludeFullMessage] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let mailtoUrl = `mailto:pavankumarofficialcareers@gmail.com?subject=${encodeURIComponent(formData.subject)}`;

      if (includeFullMessage && formData.message) {
        const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`;
        mailtoUrl += `&body=${encodeURIComponent(emailBody)}`;
      }

      window.open(mailtoUrl, '_blank');


      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });

      const description = includeFullMessage
        ? 'Your default email client has been opened with the full message pre-filled.'
        : 'Your default email client has been opened with the recipient and subject pre-filled.';

      toast.success('Email client opened!', { description });

      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      console.error('Error opening email client:', error);
      toast.error('Failed to open email client', {
        description: 'Please try again or contact directly at pavankumarofficialcareers@gmail.com'
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section
      id="contact"
      className={`py-20 px-4 relative border-t-2 ${isLightMode
        ? 'bg-gradient-light-subtle border-blue-200/60'
        : 'border-gray-700/50'
        }`}
      ref={contactRef}
    >
      {isLightMode && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-green-400/15 rounded-full blur-3xl animate-float"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-400/15 rounded-full blur-3xl animate-float-delayed"></div>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 ${isContactVisible ? 'animate-fade-in-up' : 'opacity-0 transform translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6 animate-breathe"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, and innovative projects.
            Feel free to reach out if you'd like to connect!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isContactVisible ? 'animate-slide-up' : 'opacity-0 transform translate-y-10'}`}>
            <Card
              onMouseEnter={() => setHoveredCard(0)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative transition-all duration-500 ease-out transform-gpu hover:scale-[1.03] hover:-translate-y-2 overflow-visible ${isLightMode ? 'glass-light border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#0f172a] border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_20px_50px_rgba(59,130,246,0.4)]'}`}
              style={{ boxShadow: '0 4px 20px -3px #3b82f640, 0 0 25px -5px #3b82f630' }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg overflow-hidden ${hoveredCard === 0 ? 'animate-shimmer' : ''}`}></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" style={{ background: '#3b82f615' }} />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${isLightMode ? 'bg-blue-400/10' : 'bg-primary/10'}`}>
                    <Mail className="w-6 h-6 text-primary animate-icon-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-muted-foreground">pavankumarofficialcareers@gmail.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              onMouseEnter={() => setHoveredCard(1)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative transition-all duration-500 ease-out transform-gpu hover:scale-[1.03] hover:-translate-y-2 overflow-visible ${isLightMode ? 'glass-light border-green-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-[#0f172a] border-green-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.4)]'}`}
              style={{ boxShadow: '0 4px 20px -3px #10b98140, 0 0 25px -5px #10b98130' }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg overflow-hidden ${hoveredCard === 1 ? 'animate-shimmer' : ''}`}></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" style={{ background: '#10b98115' }} />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${isLightMode ? 'bg-green-400/10' : 'bg-primary/10'}`}>
                    <Phone className="w-6 h-6 text-primary animate-icon-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-muted-foreground">+91-9353448356</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              onMouseEnter={() => setHoveredCard(2)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative transition-all duration-500 ease-out transform-gpu hover:scale-[1.03] hover:-translate-y-2 overflow-visible ${isLightMode ? 'glass-light border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'bg-[#0f172a] border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_20px_50px_rgba(168,85,247,0.4)]'}`}
              style={{ boxShadow: '0 4px 20px -3px #a855f740, 0 0 25px -5px #a855f730' }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg overflow-hidden ${hoveredCard === 2 ? 'animate-shimmer' : ''}`}></div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-lg" style={{ background: '#a855f715' }} />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg transition-all duration-300 group-hover:scale-110 ${isLightMode ? 'bg-purple-400/10' : 'bg-primary/10'}`}>
                    <MapPin className="w-6 h-6 text-primary animate-icon-pulse" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-muted-foreground">32, 4th Cross, Rajeshwari Nagar, Laggere<br />Bangalore, Karnataka – 560058</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-4 pt-4">
              <Button variant="outline" size="sm" asChild className={`${isLightMode ? 'glass-light-subtle border-blue-300 text-blue-800' : ''}`}>
                <a href="https://linkedin.com/in/pavan-kumar-s-3918372a5" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className={`${isLightMode ? 'glass-light-subtle border-blue-300 text-blue-800' : ''}`}>
                <a href="https://github.com/pavankumarofficial1231" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
              <Button variant="outline" size="sm" asChild className={`${isLightMode ? 'glass-light-subtle border-blue-300 text-blue-800' : ''}`}>
                <a href="https://x.com/1231PavanKumar" target="_blank" rel="noopener noreferrer">
                  <Twitter className="w-4 h-4" />
                  Twitter
                </a>
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className={`transition-all duration-700 delay-400 ${isContactVisible ? 'animate-slide-up' : 'opacity-0 transform translate-y-10'}`}>
            <Card
              className={`transition-all duration-500 ease-out transform-gpu hover:scale-[1.01] hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${isLightMode ? 'glass-light border-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-[#0f172a] border-blue-500/40 shadow-[0_0_20px_rgba(59,130,246,0.2)]'}`}
              style={{ boxShadow: '0 4px 20px -3px #3b82f640, 0 0 25px -5px #3b82f630' }}
            >
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Send Message</h3>

                {/* Toggle Option */}
                <div className={`mb-6 p-4 rounded-lg border ${isLightMode ? 'bg-blue-50/60 border-blue-200/60' : 'bg-muted/50'}`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="includeMessage"
                      checked={includeFullMessage}
                      onChange={(e) => setIncludeFullMessage(e.target.checked)}
                      className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                    <label htmlFor="includeMessage" className="text-sm font-medium">
                      Include full message in email (otherwise type in email client)
                    </label>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {includeFullMessage
                      ? "Your message will be pre-filled in the email client"
                      : "Email will open with empty body for you to type"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className={`transition-all duration-300 focus:scale-105 ${isLightMode ? 'glass-light-subtle' : 'bg-primary/5 border-primary/30'}`}
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className={`transition-all duration-300 focus:scale-105 ${isLightMode ? 'glass-light-subtle' : 'bg-primary/5 border-primary/30'}`}
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className={`transition-all duration-300 focus:scale-105 ${isLightMode ? 'glass-light-subtle' : 'bg-primary/5 border-primary/30'}`}
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder={includeFullMessage ? "Your Message (will be included in email)" : "Your Message (for reference only)"}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className={`transition-all duration-300 focus:scale-105 ${isLightMode ? 'glass-light-subtle' : 'bg-primary/5 border-primary/30'}`}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full transition-all duration-300"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Opening Email...
                      </div>
                    ) : isSubmitted ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Email Client Opened!
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Open Email Client
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 Pavan Kumar S. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
