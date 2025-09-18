import React from "react";

export default function Footer({ onContactClick, texts }) {
  return (
    <footer className="footer-bar">
      <div className="footer-links">
        <button
          type="button"
          className="btn btn-link p-0"
          style={{ color: "#fff", textDecoration: "none", fontWeight: 500, background: "none", border: "none" }}
          onClick={onContactClick}
          tabindex="0"
        >
          {texts.contact}
        </button>
        <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer">{texts.whatsapp}</a>
        <a href="/about">{texts.about}</a>
        <a href="/privacy">{texts.privacy}</a>
      </div>
      <div className="footer-social">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="פייסבוק">
          <i className="bi bi-facebook" aria-label="פייסבוק"></i>
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="לינקדאין">
          <i className="bi bi-linkedin" aria-label="לינקדאין"></i>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="גיטהאב">
          <i className="bi bi-github" aria-label="גיטהאב"></i>
        </a>
      </div>
      <div style={{ fontSize: "0.95em", opacity: 0.8 }}>
        &copy; {new Date().getFullYear()} {texts.title} | כל הזכויות שמורות
      </div>
    </footer>
  );
}