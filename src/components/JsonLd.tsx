import { profile } from "@/data/profile";
import { absoluteUrl, siteConfig } from "@/data/seo";

export function JsonLd() {
  const person = {
    "@type": "Person",
    "@id": `${siteConfig.url}/#person`,
    name: siteConfig.name,
    alternateName: [siteConfig.nameFa, "Amir Najafi"],
    url: siteConfig.url,
    image: absoluteUrl(profile.photo),
    email: `mailto:${siteConfig.email}`,
    telephone: siteConfig.phone,
    jobTitle: siteConfig.jobTitle.en,
    description: siteConfig.description.en,
    knowsLanguage: ["en", "fa"],
    address: {
      "@type": "PostalAddress",
      addressRegion: "Mazandaran",
      addressCountry: "IR",
    },
    sameAs: siteConfig.sameAs,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Redux",
      "Frontend Development",
      "Web UI",
      "Dashboard UI",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Noshirvani University of Technology, Babol",
    },
    worksFor: {
      "@type": "Organization",
      name: "Dadeh Negar Eghtesad",
      url: "https://daraei.ai/",
    },
  };

  const website = {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: `${siteConfig.name} Portfolio`,
    alternateName: `پورتفولیو ${siteConfig.nameFa}`,
    description: siteConfig.description.en,
    inLanguage: ["en", "fa"],
    publisher: { "@id": `${siteConfig.url}/#person` },
  };

  const webpage = {
    "@type": "ProfilePage",
    "@id": `${siteConfig.url}/#webpage`,
    url: siteConfig.url,
    name: siteConfig.title.en,
    description: siteConfig.description.en,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": `${siteConfig.url}/#person` },
    mainEntity: { "@id": `${siteConfig.url}/#person` },
    inLanguage: "en",
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: absoluteUrl(profile.photo),
    },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, webpage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
