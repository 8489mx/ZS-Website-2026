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
  /** Intrinsic pixel size of the logo file (reserves space before load). */
  imgW: number;
  imgH: number;
  /** Optional inline style (e.g. Rajab's portrait logo is widened slightly). */
  logoStyle?: { transform: string };
}

export const CLIENTS_ROW_1: ClientEntry[] = [
  {
    id: "ai-kids",
    nameAr: "AI Kids",
    nameEn: "AI Kids",
    logo: "/clients/ai-kids.webp",
    logoClassName: "h-10 sm:h-12 lg:h-14",
    imgW: 513,
    imgH: 424,
  },
  {
    id: "vite-food",
    nameAr: "Vite Food",
    nameEn: "Vite Food",
    logo: "/clients/vite-food.webp",
    logoClassName: "h-10 sm:h-12 lg:h-14",
    imgW: 544,
    imgH: 512,
  },
  {
    id: "el-mohandes",
    nameAr: "المهندس",
    nameEn: "El Mohandes",
    logo: "/clients/el-mohandes.webp",
    logoClassName: "h-8 sm:h-10 lg:h-12",
    imgW: 172,
    imgH: 149,
  },
];

export const CLIENTS_ROW_2: ClientEntry[] = [
  {
    id: "rajab-el-attar",
    nameAr: "رجب العطار",
    nameEn: "Rajab El Attar",
    logo: "/clients/rajab-el-attar.webp",
    logoClassName: "h-12 sm:h-14 lg:h-16",
    imgW: 298,
    imgH: 512,
    // Portrait logo: widened slightly (owner-approved) so it reads at strip size.
    logoStyle: { transform: "scaleX(1.15)" },
  },
  {
    id: "azzam-clothes",
    nameAr: "Azzam Clothes",
    nameEn: "Azzam Clothes",
    logo: "/clients/azzam-clothes.webp",
    logoClassName: "h-8 sm:h-10 lg:h-12",
    imgW: 173,
    imgH: 154,
  },
  {
    id: "ai-kids",
    nameAr: "AI Kids",
    nameEn: "AI Kids",
    logo: "/clients/ai-kids.webp",
    logoClassName: "h-10 sm:h-12 lg:h-14",
    imgW: 513,
    imgH: 424,
  },
];
