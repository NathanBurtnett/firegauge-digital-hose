# Product Requirements Document: FireGauge Marketing & Account Portal

**Version:** 1.0
**Date:** October 26, 2023 (Placeholder)

**1. Overview & Goals**

The FireGauge Marketing & Account Portal (`www.firegauge.app`) serves as the primary digital storefront and customer management hub for the FireGauge SaaS application (`app.firegauge.app`). Its core purpose is to effectively communicate FireGauge's value propositions, drive user sign-ups, facilitate subscription management, and provide a high-level administrative interface for subscribed customers.

*   **Primary Goal:** Maximize sign-ups for the FireGauge application.
*   **Secondary Goals:**
    *   Clearly articulate the value of FireGauge to target audiences.
    *   Provide a seamless onboarding experience.
    *   Allow users to manage their subscriptions and billing details.
    *   Enable account administrators to manage their users and view high-level station data.
    *   Serve as a redirect point to the main application (`app.firegauge.app`).
*   **Target Audience:**
    *   Fire Chiefs
    *   Fire equipment testing contractors
    *   Administrators within these organizations.
*   **Launch Strategy:** Full initial feature set (as outlined in this PRD).

**Value Propositions (to be prominently featured):**

*   **Purpose-Built NFPA Compliance:**
    *   Pre-built NFPA-1962 (hose) workflows with guided pass/fail tests.
    *   Tamper-proof, audit-grade logs and geo-time stamps.
*   **Field-First Mobile Experience:**
    *   Offline-capable PWA (or mobile app) that auto-syncs when you're back online.
*   **Instant, Insurance-Grade Reporting:**
    *   One-click generation of NFPA-compliant PDF packs.
    *   Automated email delivery of test results and annual summary reports.
*   **Lean, Intuitive UI:**
    *   Minimal training for volunteer crews—large buttons, guided flows.
*   **Modular, Scalable Platform:**
    *   Start with hose testing, then add ladder and pump modules as needed.
    *   Multi-tenant, role-based access (admins vs. inspectors).
*   **ROI & Risk Reduction:**
    *   Cut 20–30 min off each hose test; reclaim dozens of staff hours per year.
    *   Avoid ISO/insurance penalties by maintaining complete, up-to-date records.

**Pricing Tiers (to be clearly presented):**

*   **Basic:** $75 – $100/mo ($765 – $1,020/yr). Hose testing only (≤ 75 hoses), 1 Admin + 1 Inspector, offline app, PDF reports.
*   **Standard:** $150 – $200/mo ($1,530 – $2,040/yr). Up to 500 hoses, 2 Admins + 5 Inspectors, audit logs, reminders, basic integrations.
*   **Professional:** $250 – $350/mo ($2,550 – $3,570/yr). Up to 2,000 hoses, 3 Admins + 10 Inspectors, unlimited asset count, API access, priority support.
*   **Enterprise:** Custom. Unlimited users & assets, white-glove onboarding, SSO/LDAP, custom SLAs.
*   **Add-On Modules:**
    *   Ladder inspections: +$50/mo
    *   Pump testing: +$50/mo

**2. Target Users & Key Features**

| User Persona         | Core Needs                                                                 | Key Features in Marketing Site/Portal                                                                                                | Notes                                                                                                                               |
|----------------------|----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------|
| **Prospective Dept.** | Understand FireGauge value, see pricing, start a trial/subscription.       | Clear product info, demo videos/screenshots, pricing table, prominent CTAs for signup/trial.                                           | Focus on benefits: ISO compliance, time savings, ease of use.                                                                       |
| **Tenant Admin**     | Manage subscription, view billing history, manage users for their FireGauge tenant. | Authenticated portal with: Account overview, **Stripe Customer Portal integration for billing/subscription management**, **user management interface (invite, set roles for app.firegauge.app)**. | Secure login via Supabase. User roles set here will determine access within the main `app.firegauge.app`.                        |
| **Individual User**  | Log into their account (if managing billing/users directly), access support. | Login, link to main app, support/FAQ access.                                                                                         | Most operational tasks happen in `app.firegauge.app`.                                                                               |

**3. Functional Scope**

### 3.1. Public-Facing Site
-   **Homepage:** Engaging hero section, value proposition, key features overview, social proof/testimonials (future), CTAs.
-   **Features Pages:** Detailed explanations of core FireGauge functionalities (e.g., Equipment Testing, ISO Dashboard, Reporting).
-   **Pricing Page:** Clear breakdown of plans (Freemium, Station, District, Metro, Enterprise), features per plan, monthly/annual options. Link to Stripe Checkout.
-   **About Us/Contact:** Standard informational pages.
-   **Blog/Resources (Future):** Articles on fire department compliance, ISO standards, product updates.
-   **Sign-up Flow:**
    1.  User selects plan on Pricing Page.
    2.  Redirect to Stripe Checkout for the selected plan.
    3.  On successful payment, Stripe webhook notifies our backend.
    4.  Backend API (on `app.firegauge.app` or a dedicated service) creates the new `tenant` and initial `user` (with Admin role) in the main application database.
    5.  User is redirected to `app.firegauge.app` to begin onboarding, or to the marketing site's authenticated portal.

### 3.2. Authenticated User Portal (on `www.firegauge.app`)
-   **Login/Registration:** Supabase Auth.
-   **Dashboard Overview:** Simple summary (e.g., current plan, number of active users in `app.firegauge.app` - may require an API call).
-   **Account Management:** Update profile information (name, email - synced with Supabase Auth).
-   **Subscription & Billing Management:**
    -   Display current plan, next billing date, cost.
    -   **Integrate Stripe Customer Portal** for self-serve actions: update payment method, view invoices, change/cancel subscription.
-   **User Management (for their Tenant):**
    -   Invite new users to their tenant (email-based invites).
    -   Assign/change roles for users within `app.firegauge.app` (e.g., Operator, Admin).
    -   View list of users in their tenant, deactivate/remove users.
    -   (This interacts with the main application's user table via API calls).
-   **Help/Support Links:** Easy access to FAQs, documentation, contact support.

### 3.3. Integration with Main Application (`app.firegauge.app`)
-   **Signup:** Marketing site initiates user/tenant creation in the main app's database via a secure API call after successful Stripe payment.
-   **Authentication:** Supabase Auth can be shared (using same Supabase project) or JWTs can be used for S2S communication if needed.
-   **User Role Synchronization:** Roles assigned in the marketing portal dictate permissions within `app.firegauge.app`.
-   Clear visual distinction and potentially subdomains (e.g., `www.firegauge.app` for marketing/portal, `app.firegauge.app` for the operational tool).

**4. Technical Requirements**

*   **Frontend Stack:** Vite, React, TypeScript, Tailwind CSS (as existing).
*   **UI Components:** Leverage existing `src/components/ui/` (Shadcn/ui likely) and expand as needed.
*   **Routing:** React Router (as existing).
*   **State Management/Data Fetching:** Tanstack Query (as existing).
*   **Authentication:** Supabase Auth.
*   **Payment Integration:** Stripe (Stripe.js, Stripe SDK, Stripe webhooks).
*   **Deployment:** Render.
*   **API Communication:** Secure API endpoints for any interaction with the main `app.firegauge.app` backend (if direct data fetching is needed beyond what Supabase provides).

**5. User Stories**

*   **As a Fire Chief (Potential Customer), I want to quickly understand how FireGauge solves NFPA compliance and reduces inspection time, so I can assess if it's right for my department.**
*   **As a Testing Contractor (Potential Customer), I want to see clear pricing and available features for different tiers, so I can choose the best plan for my business size and needs.**
*   **As a new visitor, I want a simple and secure sign-up process, so I can quickly create an account and select a subscription plan.**
*   **As a new user, I want to be guided to the main application (`app.firegauge.app`) after signing up, so I can start using the software.**
*   **As a Subscribed Admin, I want to log into `www.firegauge.app` to manage my company's billing details and payment methods.**
*   **As a Subscribed Admin, I want to invite new technicians (Operators) and other administrators from my company to use FireGauge.**
*   **As a Subscribed Admin, I want to see a high-level overview of my stations and their status directly from the `www.firegauge.app` portal.**
*   **As a Subscribed Admin, I want to easily upgrade or change my subscription plan as my team or needs grow.**
*   **As any user, I want to be able to reset my password if I forget it.**

**6. Non-Functional Requirements**

*   **Branding & Design:**
    *   **Goal:** Modern, professional, trustworthy, and easy-to-use.
    *   **Color Palette:** Suggestion: Blues (trust, reliability), Oranges/Reds (fire/safety, caution, action - use sparingly as accents), Grays/Whites (cleanliness, modernity). We will need to finalize this.
    *   **Typography:** Clear, legible sans-serif fonts. One for headings, one for body text.
    *   **Logo:** A logo needs to be designed for FireGauge.
    *   **Imagery:** High-quality, relevant images or custom illustrations depicting fire equipment, technicians (if appropriate and inclusive), and abstract representations of data/efficiency.
*   **User Experience (UX):**
    *   Intuitive navigation.
    *   Responsive design for optimal viewing on desktop, tablet, and mobile.
    *   Fast page load times (< 3 seconds).
    *   Clear visual feedback for user actions.
*   **SEO & Discoverability:**
    *   **Goal:** Achieve good rankings for relevant keywords.
    *   **Strategy:**
        *   Keyword research to identify terms used by fire chiefs and testing contractors (e.g., "fire hose testing software," "NFPA 1962 compliance app," "digital fire equipment logs").
        *   On-page SEO: Optimize titles, meta descriptions, headers, and content with target keywords.
        *   Semantic HTML.
        *   Internal linking.
        *   Ensure site is crawlable and indexable (sitemap.xml, robots.txt).
*   **Accessibility:** Aim for WCAG 2.1 Level AA compliance.
*   **Security:**
    *   HTTPS for all traffic.
    *   Secure handling of user credentials and payment information (Stripe handles PCI compliance).
    *   Protection against common web vulnerabilities (OWASP Top 10).
*   **Content Management:** Initially, content will be managed via code. A headless CMS could be considered later if frequent content updates by non-technical users are required.

**7. Success Metrics**

*   **Primary:**
    *   Sign-up conversion rate (visitors who complete sign-up).
    *   Number of new subscriptions per month/quarter.
*   **Secondary:**
    *   Demo request conversion rate (if a "Book a Demo" CTA is added).
    *   Website traffic (total visits, unique visitors).
    *   Bounce rate.
    *   Average time on page.
    *   Keyword rankings for core terms.
    *   User engagement within the authenticated portal (e.g., % of users managing billing, % of admins managing users).
    *   Customer churn rate (monitored via Stripe/main app, but influenced by overall experience including portal).

---

**Next Steps & Recommendations:**

1.  **Branding Exercise:**
    *   Develop 2-3 logo concepts for FireGauge.
    *   Finalize a color palette and typography.
    *   Create a simple style guide.
2.  **Content Creation:**
    *   Write compelling copy for all website pages, focusing on the value propositions and target audience.
3.  **SEO Keyword Finalization:**
    *   Conduct more in-depth keyword research.
4.  **Design Mockups:**
    *   Create wireframes and then high-fidelity mockups for key pages (Homepage, Pricing, Dashboard, Auth).
5.  **Task Breakdown with Taskmaster:**
    *   I recommend saving this PRD as a `.md` or `.txt` file in your project (e.g., in a `docs/` directory or `scripts/` if that's where Taskmaster expects it).
    *   Then, we can use the `mcp_taskmaster-ai_parse_prd` tool to generate an initial set of tasks. This will help us organize the development work. 