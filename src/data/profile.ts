export const profile = {
  name: "Amirhossein Najafi",
  nameFa: "امیرحسین نجفی",
  phone: "09308082375",
  email: "Njamir16@gmail.com",
  photo: "/amirhossein-najafi.jpg",
  photoAlt: {
    en: "Amirhossein Najafi, Frontend Developer based in Mazandaran, Iran",
    fa: "امیرحسین نجفی، توسعه‌دهنده فرانت‌اند مقیم مازندران، ایران",
  },
  cvPath: "/Amirhossein_Najafi_Resume.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/amirhossein-najafi" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/amirhossein-najafi-84415542b",
    },
  ],
} as const;

export function activeSocials() {
  return profile.socials.filter((s) => s.href.trim().length > 0);
}
