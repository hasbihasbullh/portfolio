"use client";
import { DesktopSidebar } from "@/components/common/DesktopSidebar";
import { MobileNavbar } from "@/components/common/MobileNavbar";
import { profileData } from "@/lib/data/profileData";
import { ArrowUpRight, AlertCircle, Send, User, Mail, MessageSquare, CheckCircle } from "lucide-react";
import { SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";
import { useMemo, useState } from "react";

// shadcn/ui components
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

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

export default function ContactPage() {
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

  const socialCards = useMemo(
    () => [
      {
        title: "Follow My Journey",
        description: "Follow my creative journey and daily insights",
        action: "Go to Instagram",
        gradient: "from-purple-500 via-pink-500 to-orange-500",
        icon: SiInstagram,
        iconBg: "bg-pink-500/20",
        onClick: () => handleSocialClick(profileData.social?.instagram, "Instagram"),
        accent: "border-pink-400/30 shadow-pink-500/20",
        link: profileData.social?.instagram,
      },
      {
        title: "Let's Connect",
        description: "Connect with me professionally on LinkedIn",
        action: "Go to LinkedIn",
        gradient: "from-blue-500 via-blue-600 to-cyan-600",
        icon: SiLinkedin,
        iconBg: "bg-blue-500/20",
        onClick: () => handleSocialClick(profileData.social?.linkedin, "LinkedIn"),
        accent: "border-blue-400/30 shadow-blue-500/20",
        link: profileData.social?.linkedin,
      },
      {
        title: "Explore the Code",
        description: "Dive into my open-source projects & contributions.",
        action: "Go to GitHub",
        gradient: "from-gray-700 via-gray-800 to-zinc-900",
        icon: SiGithub,
        iconBg: "bg-gray-500/20",
        onClick: () => handleSocialClick(profileData.social?.github, "GitHub"),
        accent: "border-gray-400/30 shadow-gray-500/20",
        link: profileData.social?.github,
      },
    ],
    [profileData]
  );

  const handleSocialClick = (url: string | undefined, platform: string) => {
    try {
      if (!url) {
        setError(`${platform} link is not available`);
        setTimeout(() => setError(null), 3000);
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
      setError(null);
    } catch (err) {
      console.error(`Failed to open ${platform} link:`, err);
      setError(`Failed to open ${platform}. Please try again.`);
      setTimeout(() => setError(null), 3000);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, onClick: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick();
    }
  };

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
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);

      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      // Reset success message after 5 seconds
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
    <div className="flex min-h-screen bg-zinc-950">
      <DesktopSidebar />
      <MobileNavbar />

      <div className="flex-1 lg:ml-80 overflow-y-auto">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-16">
          <div className="pt-20 lg:pt-0">
            {/* Error Toast */}
            {error && (
              <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-red-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            {/* Success Toast */}
            {isSubmitted && (
              <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Message sent successfully!</span>
              </div>
            )}

            {/* Header Section */}
            <div className="mb-8 lg:mb-12">
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">Let&apos;s Connect</h1>
                </div>
                <p className="text-zinc-400 text-base lg:text-lg max-w-2xl">Ready to collaborate on something amazing? I&apos;d love to hear from you.</p>
                <Separator className="my-6 bg-zinc-800" />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-0">
              {/* Contact Form Section - Takes 2/3 of the width on xl screens */}
              <div className="xl:col-span-2">
                <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-zinc-50 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Send me a message
                    </CardTitle>
                    <CardDescription className="text-zinc-400">Fill out the form below and I&apos;ll get back to you as soon as possible.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Name and Email Row */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-zinc-200 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Name *
                          </Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Your full name"
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

                      {/* Subject */}
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

                      {/* Message */}
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

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-zinc-700 hover:bg-zinc-800 text-white font-medium py-2.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
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

              {/* Social Links Section - Takes 1/3 of the width on xl screens */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50 mb-2">Other ways to connect</h2>
                  <p className="text-zinc-400 text-sm">Prefer social media? Find me on these platforms.</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {socialCards.map((card, index) => {
                    const isDisabled = !card.link;

                    return (
                      <div
                        key={card.title}
                        className={`group relative overflow-hidden rounded-xl bg-gradient-to-br ${card.gradient} p-[1px] transition-all duration-300 cursor-pointer ${card.accent} ${
                          isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-102 focus-within:scale-102"
                        }`}
                        onClick={!isDisabled ? card.onClick : undefined}
                        onKeyDown={!isDisabled ? (e) => handleKeyDown(e, card.onClick) : undefined}
                        tabIndex={!isDisabled ? 0 : -1}
                        role="button"
                        aria-label={`${card.action} - ${card.description}`}
                        aria-disabled={isDisabled}
                        style={{
                          animationDelay: `${index * 100}ms`,
                        }}
                      >
                        <div className={`relative h-full bg-zinc-900/80 backdrop-blur-xl rounded-xl p-4 transition-all duration-300 ${!isDisabled && "group-hover:bg-zinc-900/60 group-focus:bg-zinc-900/60"}`}>
                          {/* Icon */}
                          <div className={`absolute -bottom-2 -right-2 opacity-10 transition-all duration-300 ${!isDisabled && "group-hover:opacity-15 group-hover:scale-110 group-focus:opacity-15 group-focus:scale-110"}`}>
                            <card.icon size={60} className="text-white rotate-12" />
                          </div>

                          {/* Content */}
                          <div className="relative z-10 space-y-2">
                            <h3 className="text-white text-sm font-bold pr-8">{card.title}</h3>
                            <p className="text-gray-300 text-xs leading-relaxed pr-4">{card.description}</p>

                            {/* CTA */}
                            <div className={`flex items-center gap-1 text-white text-xs font-medium transition-all duration-300 ${!isDisabled && "group-hover:gap-2 group-focus:gap-2"}`}>
                              <span>{isDisabled ? "Not Available" : card.action}</span>
                              {!isDisabled && <ArrowUpRight size={12} className="group-hover:rotate-45 group-focus:rotate-45 transition-transform duration-300" />}
                            </div>
                          </div>

                          {/* Hover Effect */}
                          {!isDisabled && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                          )}

                          {/* Focus Ring */}
                          <div className="absolute inset-0 rounded-xl ring-2 ring-white/20 ring-offset-2 ring-offset-zinc-950 opacity-0 group-focus:opacity-100 transition-opacity duration-200"></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Enhanced Footer */}
            <div className="lg:hidden mt-20 pt-8 border-t border-zinc-800/50">
              <div className="text-center">
                <p className="text-zinc-500 text-xs leading-relaxed">Made with by {profileData.name}</p>
                <p className="text-zinc-600 text-xs mt-1">© 2025 All rights reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
