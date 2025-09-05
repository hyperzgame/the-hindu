const base = (seed, w=1200, h=630) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/${w}/${h}`;
const images = {
  india: base('india-landmarks'),
  world: base('world-globe'),
  business: base('business-office'),
  technology: base('technology-gadgets'),
  science: base('science-lab'),
  health: base('health-care'),
  sports: base('sports-stadium'),
  entertainment: base('entertainment-stage'),
  education: base('education-library'),
  opinion: base('opinion-desk'),
  lifestyle: base('lifestyle-home'),
  environment: base('environment-forest')
};
export default images;