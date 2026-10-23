# U.S. Rent A Fence website preview

A local static website using HTML5, CSS3 and vanilla JavaScript. No framework, database, dependencies or deployment required.

## Preview on Windows

Double-click index.html in File Explorer to open in Edge or Chrome. Navigation opens separate HTML pages, and all assets work directly from disk.

## Pages

- index.html: mockup-inspired homepage with branding hero, advantages, product cards and quote banner.
- fence-rentals.html: rental options and product photography.
- products-for-sale.html: temporary panels, barriers and purchase inquiries.
- service-areas.html: branch locations and coverage inquiries.
- how-it-works.html: project planning and installation process.
- about.html: company background and credentials.
- contact.html: phone quote request and project preparation details.

## Editing and shared templates

Edit shared header/footer in templates/header.html and templates/footer.html. Edit page bodies in templates/pages/ and titles/descriptions in templates/pages.json. Then run:

```powershell
py tools/build_pages.py
```

The generated root HTML pages are committed website files; Python is only needed when rebuilding templates. Styles and mobile menu behavior are in assets/css/styles.css and assets/js/main.js. Each page has its own title, description, heading and current-page navigation state. Main navigation and quote links open pages rather than scrolling the homepage. The skip-to-content link intentionally remains an accessibility anchor.

## Photography

Seven original JFIF files are preserved in the project root. Their JPEG copies use descriptive names under assets/images/products and assets/images/projects. Pillow verified original dimensions and byte-identical copies, with no recompression. Run `py tools/convert_images.py` to repeat (requires Pillow). The sources are small; higher-resolution originals will improve visual sharpness. The screening card explicitly identifies that standard fencing is shown.

The original logo/banner is preserved under assets/images/branding. It includes Tiger Barriers and a different toll-free number. Main contact links follow the supplied 516-805-1947 number. The header uses text styled to resemble the supplied mockup; a dedicated official wordmark asset is still preferred.

## Content and remaining work

The supplied mockup guides the layout. Additional pages were introduced at the user's request to replace one-page scrolling navigation. There is no online submission form or success simulation; contact actions use phone links. Nothing has been deployed.

Source: https://usrentafence.com, reviewed October 23, 2026. It supports temporary panels, sales, post-driven fencing, barriers, family ownership, local service and fully insured wording. Its navigation names Long Island, Westchester and Boston. WBE wording appears in supplied branding. Confirm current certification, insurance, full service coverage, delivery claims and screening availability before launch. No address or email has been invented.

Remaining: higher-resolution photography; approval of layout and content; product and service-area detail pages as needed; accessible quote form with working submission service; full browser/accessibility/SEO/performance testing; deployment preparation including canonical URLs, sitemap and robots.txt. Deployment requires explicit approval.

Verification completed: HTML nesting, local page/asset links, unique IDs, one H1 and one current navigation link per page, JavaScript syntax and diff whitespace checks. Browser visual verification was unavailable in this environment.

## Contact intake form

The Contact page now includes ten intake fields and accessible inline validation plus an error summary. The submit button initially remains disabled until JavaScript loads. The current action checks details only and explicitly states that nothing has been sent or saved. Name, email, phone, project ZIP, fence type and rental/purchase choice are required. Footage, date and additional details are optional. Past requested dates and invalid footage are rejected.

Delivery is isolated in assets/js/quote-form.js as quoteDelivery.submit (currently null). A future adapter must send to a configured service and return accepted: true only after confirmed acceptance; update the preview notices and button copy when connecting it. No email destination or submission service has been invented, and entered details are not persisted. Verification covered validation logic, field labels, accessibility references and JavaScript syntax; live browser testing remains outstanding.
