"use client";

import { useState, type FormEvent } from "react";
import { PROFILE } from "@/data/profile";

const PROJECT_TYPES = [
  "Website Development",
  "Frontend Collaboration",
  "Internship Opportunity",
  "Other",
] as const;

type Status = "idle" | "sending" | "sent" | "error";

/**
 * Sends straight to the same working endpoint the previous portfolio already
 * uses (FormSubmit.co, AJAX mode) — no new email service or credentials
 * needed, since that address is already verified with FormSubmit.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // honeypot: bots fill every field, humans never see this one
    if (data.get("_honey")) return;

    setStatus("sending");
    try {
      const res = await fetch(
        `https://formsubmit.co/ajax/${PROFILE.contact.email}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: data,
        },
      );
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="beam rounded-2xl bg-onyx p-8 text-[14.5px] text-ink/90">
        Thanks — your message is on its way to {PROFILE.contact.email}. I’ll reply as
        soon as I can.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="beam glow-card flex flex-col gap-5 rounded-2xl bg-onyx-2 p-7 sm:p-8"
    >
      <input type="hidden" name="_subject" value="New portfolio project inquiry" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="visitorName" className="font-mono text-[11px] text-muted">
            Name
          </label>
          <input
            id="visitorName"
            name="name"
            type="text"
            required
            maxLength={80}
            autoComplete="name"
            placeholder="Your name"
            className="rounded-[10px] border border-ink/[0.14] bg-onyx px-4 py-3 text-[14px] text-ink outline-none focus:border-wine-ash"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="visitorEmail" className="font-mono text-[11px] text-muted">
            Email
          </label>
          <input
            id="visitorEmail"
            name="email"
            type="email"
            required
            maxLength={120}
            autoComplete="email"
            placeholder="you@example.com"
            className="rounded-[10px] border border-ink/[0.14] bg-onyx px-4 py-3 text-[14px] text-ink outline-none focus:border-wine-ash"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="projectType" className="font-mono text-[11px] text-muted">
          Project type
        </label>
        <select
          id="projectType"
          name="project_type"
          defaultValue=""
          className="rounded-[10px] border border-ink/[0.14] bg-onyx px-4 py-3 text-[14px] text-ink outline-none focus:border-wine-ash"
        >
          <option value="" disabled>
            Select a project type
          </option>
          {PROJECT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="visitorMessage" className="font-mono text-[11px] text-muted">
          Message
        </label>
        <textarea
          id="visitorMessage"
          name="message"
          required
          maxLength={1500}
          rows={5}
          placeholder="Briefly describe what you would like to build..."
          className="resize-none rounded-[10px] border border-ink/[0.14] bg-onyx px-4 py-3 text-[14px] text-ink outline-none focus:border-wine-ash"
        />
      </div>

      {/* honeypot — hidden from real visitors, catches simple bots */}
      <div className="absolute h-0 w-0 overflow-hidden opacity-0" aria-hidden>
        <label htmlFor="companyWebsite">Leave this field empty</label>
        <input id="companyWebsite" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-2 flex items-center gap-5">
        <button
          type="submit"
          disabled={status === "sending"}
          className="shimmer-btn glow-card rounded-[10px] bg-cosmic px-7 py-3.5 text-[14px] font-bold text-carbon disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send a message"}
        </button>
        {status === "error" && (
          <p role="status" className="text-[13px] text-wine-ash-soft">
            Something went wrong — try again, or email me directly.
          </p>
        )}
      </div>
    </form>
  );
}
