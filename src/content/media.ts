/**
 * Photography registry.
 *
 * Add real, licensed photos to /public/images and set `src` below.
 * When `src` is null the site renders an art-directed placeholder that
 * describes the required shot, so layout is final before photography exists.
 */

export type MediaItem = {
  src: string | null;
  alt: string;
  /** Art-direction brief for the photographer / stock search. */
  brief: string;
};

export const media = {
  hero: {
    src: null,
    alt: "A young Indian graduate looking ahead confidently, laptop in hand",
    brief: "Young Indian graduate (22–24), confident, natural light, modern workspace",
  },
  learnByDoing: [
    {
      src: null,
      alt: "Two young professionals practising a sales roleplay",
      brief: "Sales roleplay between two young Indian professionals",
    },
    {
      src: null,
      alt: "A learner on a mock sales call with a headset and laptop",
      brief: "Mock call with headset, CRM on laptop",
    },
    {
      src: null,
      alt: "A small team discussing a pitch around a table",
      brief: "Team pitch discussion, candid",
    },
  ],
  founder: {
    src: null,
    alt: "Arunmozhivarman Ramachandran, Founder of VIIV by Varman",
    brief: "Professional portrait of the founder, 4:5",
  },
} satisfies Record<string, MediaItem | MediaItem[]>;

/**
 * Show clearly-labelled placeholders for unverified or missing content
 * (founder achievements, photos). Set NEXT_PUBLIC_SHOW_PLACEHOLDERS=false to hide
 * text placeholders in production.
 */
export const showPlaceholders = process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS !== "false";
