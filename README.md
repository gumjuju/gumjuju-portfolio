# gumjuju-portfolio

Personal photography portfolio. Cars, events, stages, landscape, portrait — based in Kuala Lumpur.

Disclaimer: Do Not Use Pictures Here for Other Purposes.

Built with Next.js and deployed on Vercel.

## Security Baseline

### Level 1 - Foundational

- SSL/TLS: HTTPS is enforced by deployment and the app sends `Strict-Transport-Security`.
- MFA: Enable MFA on all critical accounts:
	- Vercel account/team
	- GitHub account/org
	- Domain registrar and DNS provider
- Updates:
	- Run `npm run security:audit` regularly.
	- Apply dependency updates quickly, especially for `next`, `react`, and security patches.

### Level 2 - Code-Level

- Access control hardening for form submission:
	- Contact form now posts to internal API route: `POST /api/contact`.
	- Same-origin check prevents cross-origin abuse.
	- Basic per-IP rate limiting and payload-size limits are enforced.
	- Honeypot field and server-side validation are enabled.
- SQL injection:
	- No SQL database is used in this project currently.
	- If a DB is added later, use parameterized queries or ORM placeholders only (never string-concatenate SQL).

### Level 3 - Network

- Security headers configured in Next.js:
	- `Content-Security-Policy`
	- `X-Frame-Options`
	- `X-Content-Type-Options`
	- `Referrer-Policy`
	- `Permissions-Policy`
	- `Cross-Origin-Opener-Policy`
	- `Cross-Origin-Resource-Policy`
- HTTPS redirect middleware enabled for production traffic behind proxy (`x-forwarded-proto=http`).
- Firewall recommendation (platform level):
	- Restrict admin access by IP where possible.
	- Enable Vercel WAF/bot protection/rate-limits (or equivalent on your host/CDN).

### Level 4 - Recovery

- Logging:
	- Contact API logs request outcome and error details with a request ID.
- Daily backups:
	- Run `npm run backup:run` to create a zip in `backups/`.
	- Schedule this script daily via Windows Task Scheduler or your CI.
	- Keep backups off-host too (cloud drive/object storage) for disaster recovery.

## Run locally

```bash
npm install
npm run dev
```

## Contact

Instagram: [@gumjuju___](https://www.instagram.com/gumjuju___/)
