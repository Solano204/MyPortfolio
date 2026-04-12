"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { SendHorizonal } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { FormInput } from "@/components/Common/Common.Input";
import { BentoTilt } from "@/components/Common/Common.card3D";

export type EmailMessage = {
  email: string;
  subject: string;
  message: string;
};

type FormStatus = "idle" | "loading" | "success" | "error";

const Form = () => {
  const { t } = useApp();

  const [formData, setFormData] = useState<EmailMessage>({
    email: "",
    message: "",
    subject: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  function onInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleFormSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Failed to send email");

      setStatus("success");
      setFormData({ email: "", message: "", subject: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  }

  function handleSendClick(): void {
    const form = document.getElementById("contact-form") as HTMLFormElement;
    if (form) form.requestSubmit();
  }

  return (
    <>
      <div className="mx-auto font-bold w-full h-[100px] flex items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-mono mt-40 text-amber-50">
          {t("contact.title")}
        </h2>
      </div>

      <BentoTilt className="p-5 w-[90%] md:w-[60%] mx-auto space-y-4 mt-20 mb-20 text-gray-800 transition-colors bg-gray-900 border-1 border-zinc-200 dark:border-cyan-950 rounded-2xl dark:bg-gray-900 dark:text-gray-200">
        {status === "loading" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-xl dark:bg-gray-800">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                {t("contact.sending")}
              </p>
            </div>
          </div>
        )}

        <form id="contact-form" onSubmit={handleFormSubmit} className="space-y-4">
          <FormInput
            id="email"
            label="Email"
            type="email"
            name="email"
            placeholder={t("contact.emailPlaceholder")}
            value={formData.email}
            onChange={onInputChange}
            required
            disabled={status === "loading"}
          />

          <FormInput
            id="subject"
            label="Subject"
            type="text"
            name="subject"
            placeholder={t("contact.subjectPlaceholder")}
            value={formData.subject}
            onChange={onInputChange}
            required
            disabled={status === "loading"}
          />

          <div className="space-y-2">
            <label htmlFor="message" className="text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t("contact.messagePlaceholder")}
              value={formData.message}
              onChange={onInputChange}
              required
              disabled={status === "loading"}
              className="w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white disabled:opacity-70 disabled:cursor-not-allowed"
            />
          </div>

          {status === "error" && (
            <div className="p-3 text-red-700 bg-red-100 border border-red-300 rounded-md dark:bg-red-900 dark:text-red-200 dark:border-red-700">
              {errorMessage}
            </div>
          )}

          {status === "success" && (
            <div className="p-3 text-green-700 bg-green-100 border border-green-300 rounded-md dark:bg-green-900 dark:text-green-200 dark:border-green-700">
              {t("contact.success")}
            </div>
          )}

          <div className="flex items-center justify-center">
            <button
              onClick={handleSendClick}
              type="button"
              disabled={status === "loading"}
              className={`
                relative flex items-center gap-3 px-6 py-3
                text-white transition-all duration-300 rounded-xl
                bg-gradient-to-br from-gray-800 to-gray-900
                border border-gray-700 hover:border-blue-500
                shadow-lg hover:shadow-blue-500/20
                transform hover:scale-[1.02] active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-500/70
                overflow-hidden group
                disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100
              `}
              aria-label={t("contact.send")}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {status === "loading" ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t("contact.sending.button")}
                </>
              ) : (
                <>
                  <SendHorizonal size={20} />
                  {t("contact.send")}
                </>
              )}
            </button>
          </div>
        </form>
      </BentoTilt>
    </>
  );
};

export default Form;