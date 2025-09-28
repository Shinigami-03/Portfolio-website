import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Initialize EmailJS when component mounts
  useEffect(() => {
    if (process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
    } else {
      console.warn('⚠️ EmailJS public key is missing! Add REACT_APP_EMAILJS_PUBLIC_KEY in .env file.');
    }
  }, []);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      tempErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.subject.trim()) {
      tempErrors.subject = "Subject is required";
      isValid = false;
    }

    if (!formData.message.trim()) {
      tempErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);
      setSubmitError(false);

      // ✅ FIX: Match keys with EmailJS template variables
      const templateParams = {
        name: formData.name,       // matches {{name}}
        email: formData.email,     // matches {{email}}
        title: formData.subject,   // matches {{title}}
        message: formData.message  // add {{message}} to template if you want to display it
      };

      emailjs.send(
        'service_portfolio', // Your EmailJS service ID
        'template_qvsh5z7',  // Your EmailJS template ID
        templateParams
      )
        .then((response) => {
          console.log('✅ Email sent successfully!', response);
          setIsSubmitting(false);
          setSubmitSuccess(true);
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
          });

          // Reset success message after 5 seconds
          setTimeout(() => setSubmitSuccess(false), 5000);
        })
        .catch((error) => {
          console.error('❌ Failed to send email:', error);
          setIsSubmitting(false);
          setSubmitError(true);

          // Reset error message after 5 seconds
          setTimeout(() => setSubmitError(false), 5000);
        });
    }
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <div className="section-title">
          <h2>Contact Me</h2>
        </div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Get In Touch</h3>
            <p>
              I'm interested in freelance opportunities – especially ambitious or large projects.
              However, if you have other requests or questions, don't hesitate to contact me.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="icon"><FaEnvelope /></div>
                <div className="text">
                  <h4>Email</h4>
                  <p>khanal.aryan60@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon"><FaPhone /></div>
                <div className="text">
                  <h4>Phone</h4>
                  <p>+977 9864478471</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="icon"><FaMapMarkerAlt /></div>
                <div className="text">
                  <h4>Location</h4>
                  <p>Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-container"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {submitSuccess ? (
              <div className="success-message">
                <h3>Thank you!</h3>
                <p>Your message has been sent successfully. I'll get back to you soon.</p>
              </div>
            ) : submitError ? (
              <div className="error-message">
                <h3>Oops!</h3>
                <p>Something went wrong. Please try again later or contact me directly via email.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'error' : ''}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={errors.subject ? 'error' : ''}
                  />
                  {errors.subject && <span className="error-message">{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    className={errors.message ? 'error' : ''}
                    rows="6"
                  ></textarea>
                  {errors.message && <span className="error-message">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
