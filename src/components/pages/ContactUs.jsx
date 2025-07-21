import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Your message has been sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "MapPin",
      title: "Address",
      details: "123 Shopping Street, Commerce City, CC 12345"
    },
    {
      icon: "Phone",
      title: "Phone",
      details: "+91 98765 43210"
    },
    {
      icon: "Mail",
      title: "Email",
      details: "support@rlapnastore.com"
    },
    {
      icon: "Clock",
      title: "Business Hours",
      details: "Mon - Sat: 9:00 AM - 6:00 PM"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-secondary mb-4">Contact Us</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Have questions or need assistance? We're here to help! Reach out to us through any of the channels below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-secondary mb-6">Get In Touch</h2>
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                    <ApperIcon name={info.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">{info.title}</h3>
                    <p className="text-gray-600">{info.details}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Social Media */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-secondary mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {["Facebook", "Twitter", "Instagram", "Youtube"].map((social) => (
                <Button
                  key={social}
                  variant="outline"
                  size="sm"
                  className="p-3"
                >
                  <ApperIcon name={social} className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <Card className="p-8">
            <h2 className="text-2xl font-semibold text-secondary mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="What's this about?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your inquiry..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <ApperIcon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <ApperIcon name="Send" className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-secondary text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            {
              question: "What are your shipping policies?",
              answer: "We offer free shipping on orders above ₹500. Standard delivery takes 3-5 business days."
            },
            {
              question: "How can I return a product?",
              answer: "You can return products within 30 days of delivery. Visit our returns page for more details."
            },
            {
              question: "Do you offer customer support?",
              answer: "Yes! Our customer support team is available Monday to Saturday, 9 AM to 6 PM."
            },
            {
              question: "How do I track my order?",
              answer: "Once your order ships, you'll receive a tracking number via email and SMS."
            }
          ].map((faq, index) => (
            <Card key={index} className="p-6">
              <h3 className="font-semibold text-secondary mb-2">{faq.question}</h3>
              <p className="text-gray-600">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;