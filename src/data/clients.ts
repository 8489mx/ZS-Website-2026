/**
 * Real clients shown in the /erp trust marquee.
 *
 * Every entry here is a confirmed, current Z-ERP client (verified with the
 * business owner, Nov 2026). Do NOT add a name to this list unless it is a
 * real client — the marquee headline claims these businesses trust Z-ERP.
 *
 * Each item renders as: logo image on its own + the client name as separate
 * live text beside it (readable/indexable, unlike text baked into an image).
 * Logos live in `public/clients/`.
 */
export interface ClientEntry {
  id: string;
  nameAr: string;
  nameEn: string;
  logo: string;
  /** Tailwind sizing for the logo image (logos render larger than the name text). */
  logoClassName: string;
  /** Optional inline style (e.g. Rajab's portrait logo is widened slightly). */
  logoStyle?: { transform: string };
}

export const CLIENTS_ROW_1: ClientEntry[] = [
  {
    id: "ai-kids",
    nameAr: "AI Kids",
    nameEn: "AI Kids",
    logo: "/clients/ai-kids.webp",
    logoClassName: "h-16 sm:h-20 lg:h-[5.5rem]",
  },
  {
    id: "vite-food",
    nameAr: "Vite Food",
    nameEn: "Vite Food",
    logo: "/clients/vite-food.webp",
    logoClassName: "h-16 sm:h-20 lg:h-[5.5rem]",
  },
  {
    id: "el-mohandes",
    nameAr: "المهندس",
    nameEn: "El Mohandes",
    logo: "/clients/el-mohandes.webp",
    logoClassName: "h-12 sm:h-16 lg:h-[4.5rem]",
  },
];

export const CLIENTS_ROW_2: ClientEntry[] = [
  {
    id: "rajab-el-attar",
    nameAr: "رجب العطار",
    nameEn: "Rajab El Attar",
    logo: "/clients/rajab-el-attar.webp",
    logoClassName: "h-20 sm:h-[5.5rem] lg:h-24",
    // Portrait logo: widened slightly (owner-approved) so it reads at strip size.
    logoStyle: { transform: "scaleX(1.15)" },
  },
  {
    id: "azzam-clothes",
    nameAr: "Azzam Clothes",
    nameEn: "Azzam Clothes",
    logo: "/clients/azzam-clothes.webp",
    logoClassName: "h-12 sm:h-16 lg:h-[4.5rem]",
  },
  {
    id: "ai-kids",
    nameAr: "AI Kids",
    nameEn: "AI Kids",
    logo: "/clients/ai-kids.webp",
    logoClassName: "h-16 sm:h-20 lg:h-[5.5rem]",
  },
];
