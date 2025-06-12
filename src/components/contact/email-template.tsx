// 1. Email Template Component
// components/email-template.tsx
import * as React from "react";
import { EmailMessage } from "./Contact.Form";

export const EmailTemplate: React.FC<Readonly<EmailMessage>> = ({
  email,
  subject,
  message,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      maxWidth: "600px",
      margin: "0 auto",
    }}
  >
    <h1
      style={{
        color: "#333",
        borderBottom: "2px solid #007bff",
        paddingBottom: "10px",
      }}
    >
      New Contact Form Submission
    </h1>
    <div
      style={{
        backgroundColor: "#f8f9fa",
        padding: "20px",
        borderRadius: "8px",
        margin: "20px 0",
      }}
    >
      <h2 style={{ color: "#007bff", marginTop: "0" }}>Contact Details</h2>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Subject:</strong> {subject}
      </p>
    </div>
    <div
      style={{
        backgroundColor: "#fff",
        padding: "20px",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
      }}
    >
      <h3 style={{ color: "#333", marginTop: "0" }}>Message:</h3>
      <p style={{ lineHeight: "1.6", color: "#555" }}>{message}</p>
    </div>
    <div
      style={{
        marginTop: "20px",
        fontSize: "12px",
        color: "#666",
        textAlign: "center",
      }}
    >
      <p>This email was sent from your website contact form.</p>
    </div>
  </div>
);
