"use client";
import React, { useState, useEffect, useRef } from "react";
import { AlertCircle, Send, User, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";
import { Textarea } from "@/common/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/common/components/ui/card";
import { Label } from "@/common/components/ui/label";
import { MAX_LENGTHS } from "@/common/constants/form";

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

export function ContactForm() {
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const errorTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const showError = (message: string) => {
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    setError(message);
    errorTimeoutRef.current = setTimeout(() => setError(null), 4000);
  };

  const showSuccess = () => {
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    setIsSubmitted(true);
    successTimeoutRef.current = setTimeout(() => setIsSubmitted(false), 5000);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
    } else if (formData.name.length > MAX_LENGTHS.name) {
      errors.name = `Name must be at most ${MAX_LENGTHS.name} characters`;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    } else if (formData.email.length > MAX_LENGTHS.email) {
      errors.email = "Email address is too long";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      errors.subject = "Subject must be at least 5 characters";
    } else if (formData.subject.length > MAX_LENGTHS.subject) {
      errors.subject = `Subject must be at most ${MAX_LENGTHS.subject} characters`;
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else if (formData.message.length > MAX_LENGTHS.message) {
      errors.message = `Message must be at most ${MAX_LENGTHS.message} characters`;
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

    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    setError(null);

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          company: honeypotRef.current?.value ?? "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({ message: "Failed to send message" }));
        throw new Error(data.message || "Failed to send message");
      }

      showSuccess();
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: unknown) {
      console.error("Form submission error:", err);
      const message = err instanceof Error ? err.message : String(err ?? "Failed to send message. Please try again.");
      showError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="xl:col-span-2">
      {error && (
        <div role="alert" className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-zinc-200 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
          <AlertCircle size={16} />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
      {isSubmitted && (
        <div role="status" className="fixed top-20 right-4 z-50 flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-zinc-200 px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
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
            <div aria-hidden="true" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", opacity: 0 }}>
              <label htmlFor="company">Company</label>
              <input ref={honeypotRef} id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

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
                  maxLength={MAX_LENGTHS.name}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                  disabled={isSubmitting}
                  aria-invalid={!!formErrors.name}
                  aria-describedby={formErrors.name ? "name-error" : undefined}
                />
                {formErrors.name && (
                  <p id="name-error" className="text-red-400 text-sm">
                    {formErrors.name}
                  </p>
                )}
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
                  maxLength={MAX_LENGTHS.email}
                  className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                  disabled={isSubmitting}
                  aria-invalid={!!formErrors.email}
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
                {formErrors.email && (
                  <p id="email-error" className="text-red-400 text-sm">
                    {formErrors.email}
                  </p>
                )}
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
                maxLength={MAX_LENGTHS.subject}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20"
                disabled={isSubmitting}
                aria-invalid={!!formErrors.subject}
                aria-describedby={formErrors.subject ? "subject-error" : undefined}
              />
              {formErrors.subject && (
                <p id="subject-error" className="text-red-400 text-sm">
                  {formErrors.subject}
                </p>
              )}
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
                maxLength={MAX_LENGTHS.message}
                className="bg-zinc-800/50 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:border-blue-500 focus:ring-blue-500/20 resize-none"
                disabled={isSubmitting}
                aria-invalid={!!formErrors.message}
                aria-describedby={formErrors.message ? "message-error" : undefined}
              />
              <div className="flex justify-between items-start pt-1">
                {formErrors.message ? (
                  <p id="message-error" className="text-red-400 text-sm">
                    {formErrors.message}
                  </p>
                ) : <span />}
                <span className="text-xs text-zinc-500">
                  {formData.message.length} / {MAX_LENGTHS.message}
                </span>
              </div>
            </div>
            <Button type="submit" disabled={isSubmitting} className="w-full bg-zinc-700 hover:bg-zinc-800 text-zinc-200 font-medium py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
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
