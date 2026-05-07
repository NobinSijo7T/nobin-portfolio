import Link from "next/link";
import { notFound } from "next/navigation";
import { getExperienceById } from "@/utils/experience";
import styles from "./experience-details.module.scss";

export default async function ExperienceDetailsPage({ params }) {
  const { id } = await params;
  const experience = getExperienceById(id);

  if (!experience) {
    notFound();
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <Link href="/experience" className={styles.backLink}>
            All Experience
          </Link>
          <div className={styles.companyRow}>
            <img
              src={experience.resolvedCompanyLogo}
              alt={`${experience.company} logo`}
              className={styles.logo}
            />
            <div>
              <p className={styles.companyLabel}>Company</p>
              <h1 className={styles.company}>{experience.company}</h1>
            </div>
          </div>
          <a
            href={experience.companySite}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.siteLink}
          >
            Visit Company Site
          </a>
        </div>
      </section>

      <section className={styles.positionsSection}>
        <div className={styles.positions}>
          {experience.positions.map((position, index) => (
            <article className={styles.positionCard} key={`${position.title}-${index}`}>
              <header className={styles.positionHeader}>
                <div>
                  <p className={styles.positionType}>{position.type || "Role"}</p>
                  <h2 className={styles.positionTitle}>{position.title}</h2>
                </div>
                <div className={styles.meta}>
                  <span>{position.duration || "-"}</span>
                  <span>{position.location || "Not specified"}</span>
                </div>
              </header>
              <p className={styles.description}>{position.description}</p>
              {position.skills?.length > 0 && (
                <ul className={styles.skills}>
                  {position.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
