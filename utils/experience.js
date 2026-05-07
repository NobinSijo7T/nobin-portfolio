import experienceData from "@/database/experience.json";

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getExperienceEntries() {
  return experienceData.map((item, index) => ({
    id: `${slugify(item.company)}-${index + 1}`,
    resolvedCompanyLogo: getCompanyLogoUrl(item.companyLogo),
    ...item,
  }));
}

export function getExperienceById(id) {
  return getExperienceEntries().find((item) => item.id === id) || null;
}

function getCompanyLogoUrl(companyLogoPath) {
  const fileName = companyLogoPath.split("/").pop();
  return `/api/company-logo/${encodeURIComponent(fileName)}`;
}
