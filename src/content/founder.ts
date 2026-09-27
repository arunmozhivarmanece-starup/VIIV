/**
 * Founder information. Only add achievements that have been verified.
 * Empty `verifiedAchievements` renders clearly-labelled placeholders
 * (see `showPlaceholders` in /src/content/media.ts).
 */

export const founder = {
  heading: "Built From Real Sales Experience.",
  name: "Arunmozhivarman Ramachandran",
  title: "Founder — VIIV by Varman",
  experience: ["Practo", "Toppr", "WheelsEye", "NxtWave"],
  summary:
    "Sales and business experience across Healthcare, Technology and EdTech — translated into practical frameworks for aspiring sales professionals.",
  quote:
    "Sales isn't about convincing people to buy. It's about understanding problems, communicating value and creating measurable business outcomes.",
  linkedin: "",
  /** e.g. { label: "Years in sales", value: "X+" } — add only verified facts. */
  verifiedAchievements: [] as { label: string; value: string }[],
  achievementPlaceholders: 3,
};
