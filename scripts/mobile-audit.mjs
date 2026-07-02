import { chromium } from "playwright";

const viewports = [
  { name: "390", width: 390 },
  { name: "320", width: 320 },
];
const versions = ["v1", "v2"];
const sections = [
  "#how-it-works",
  "#budget-search",
  "#why-hero",
  "#featured-cars",
  "#finance-explained",
  "#trust-reviews",
  "footer",
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const viewport of viewports) {
  for (const version of versions) {
    await page.setViewportSize({ width: viewport.width, height: 844 });
    await page.goto("http://localhost:5003/", { waitUntil: "networkidle" });
    await page.evaluate((v) => localStorage.setItem("hero-design-variation", v), version);
    await page.reload({ waitUntil: "networkidle" });
    await page.waitForTimeout(800);

    const result = await page.evaluate(({ sections, version }) => {
      const isV2 = document.body.innerText.includes("from planning");
      return {
        requestedVersion: version,
        detectedV2: isV2,
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
        sections: sections.map((sel) => {
          const el = document.querySelector(sel);
          if (!el) return { sel, found: false };
          const r = el.getBoundingClientRect();
          return {
            sel,
            found: true,
            overflows: r.right > window.innerWidth + 1 || r.left < -1,
          };
        }),
      };
    }, { sections, version });

    console.log(JSON.stringify({ viewport: viewport.name, ...result }));
  }
}

await browser.close();
