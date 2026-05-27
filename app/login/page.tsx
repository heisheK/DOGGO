"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { HeartHandshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setMessage("Add Supabase env vars to enable authentication.");
      return;
    }

    const supabase = createClient();
    const result =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setMessage(result.error ? result.error.message : mode === "login" ? "Signed in." : "Check your email to confirm registration.");
  }

  return (
    <main className="page-shell grid min-h-[calc(100vh-4rem)] place-items-center py-10">
      <section className="w-full max-w-md rounded-lg border bg-card p-6 shadow-soft">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <HeartHandshake className="h-5 w-5" />
          </span>
          <div>
            <h1 className="text-xl font-semibold">Volunteer access</h1>
            <p className="text-sm text-muted-foreground">Login or register for internal tools.</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-2 rounded-md bg-muted p-1">
          <Button type="button" variant={mode === "login" ? "default" : "ghost"} onClick={() => setMode("login")}>
            Login
          </Button>
          <Button type="button" variant={mode === "register" ? "default" : "ghost"} onClick={() => setMode("register")}>
            Register
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required />
          </div>
          <Button className="w-full">{mode === "login" ? "Login" : "Create account"}</Button>
        </form>
        {message && <p className="mt-4 text-sm text-muted-foreground">{message}</p>}
      </section>
    </main>
  );
}
