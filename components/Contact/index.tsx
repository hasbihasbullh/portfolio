import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <section id="contact" className="px-4 sm:px-8 py-10 lg:py-16 sm:py-20 max-w-7xl mx-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight mb-6">Contact</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
          <Card className="bg-zinc-50/50 dark:bg-zinc-900/50">
            <CardContent className="pt-6">
              <form>
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" placeholder="Enter your name" required />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input type="email" id="email" name="email" placeholder="Enter your email" required />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" name="subject" placeholder="Enter subject" required />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" placeholder="Enter your message" className="min-h-[120px]" required />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      Send Message
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}