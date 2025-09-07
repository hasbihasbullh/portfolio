"use client";
import React from "react";
import { AlertCircle, Send, User, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Label } from "@/common/components/ui/label";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface ContactFormProps {
  error: string | null;
  setError: (error: string | null) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  formErrors: FormErrors;
  setFormErrors: (errors: FormErrors) => void;
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  isSubmitted: boolean;
  setIsSubmitted: (submitted: boolean) => void;
}

export function ContactForm({
  error,
  setError,
  formData,
  setFormData,
  formErrors,
  setFormErrors,
  isSubmitting,
  setIsSubmitting,
  isSubmitted,
  setIsSubmitted,
}: ContactFormProps) {
  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (formErrors[field]) {
      setFormErrors({ ...formErrors, [field]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form submitted:", formData);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setError("Failed to send message. Please try again.");
      setTimeout(() => setError(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="xl:col-span-2">
      {error && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-zinc-200 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      {isSubmitted && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-zinc-200 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
          <CheckCircle size={16} />
          <span className="text-sm font-medium">Message sent successfully!</span>
        </div>
      )}
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-zinc-50 flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Send a Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-200 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Name *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Your name"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                  disabled={isSubmitting}
                />
                {formErrors.name && <p className="text-red-400 text-sm">{formErrors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-200 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                  disabled={isSubmitting}
                />
                {formErrors.email && <p className="text-red-400 text-sm">{formErrors.email}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-zinc-200">
                Subject *
              </Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="What's this about?"
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                disabled={isSubmitting}
              />
              {formErrors.subject && <p className="text-red-400 text-sm">{formErrors.subject}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-zinc-200">
                Message *
              </Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Tell me about your project, idea, or just say hello..."
                rows={6}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                disabled={isSubmitting}
              />
              {formErrors.message && <p className="text-red-400 text-sm">{formErrors.message}</p>}
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-zinc-700 hover:bg-zinc-800 text-zinc-200 font-medium py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-zinc-200/20 border-t-zinc-200 rounded-full animate-spin" />
                  Sending...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Send className="w-4 h-4" />
                  Send Message
                </div>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}