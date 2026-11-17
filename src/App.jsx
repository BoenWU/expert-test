import { ERROR_PAGE_COPY } from './errorPageContent.js';

function WarningIcon() {
  return (
    <svg
      className="error-icon"
      viewBox="0 0 24 24"
      width="22"
      height="22"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 3.6 2.9 19.2a1.2 1.2 0 0 0 1 1.8h16.2a1.2 1.2 0 0 0 1-1.8L12 3.6Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 9.2v4.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.9" r="1.05" fill="currentColor" />
    </svg>
  );
}

export default function App() {
  return (
    <main className="error-page">
      <section className="error-panel" aria-labelledby="error-title">
        <p className="error-badge">
          <WarningIcon />
          <span>服务暂时不可用</span>
        </p>

        <p className="error-code" aria-label={`错误码 ${ERROR_PAGE_COPY.code}`}>
          {ERROR_PAGE_COPY.code}
        </p>

        <h1 className="error-title" id="error-title">
          {ERROR_PAGE_COPY.title}
        </h1>

        <p className="error-status">{ERROR_PAGE_COPY.statusLabel}</p>

        <p className="error-description">{ERROR_PAGE_COPY.description}</p>

        <p className="error-hint">{ERROR_PAGE_COPY.hint}</p>
      </section>

      <footer className="error-footer">HTTP {ERROR_PAGE_COPY.code} · 服务器错误</footer>
    </main>
  );
}