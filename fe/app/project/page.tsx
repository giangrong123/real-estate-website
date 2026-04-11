import { PROJECTS_DATA } from "@/data/projects";
import styles from "./project.module.css";
import ProjectCard from "@/components/project/ProjectCard";

export default function ProjectPage() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Danh sách dự án</h1>

      <div className={styles.grid}>
        {PROJECTS_DATA.map((item) => (
          <ProjectCard key={item.id} project={item} />
        ))}
      </div>
    </section>
  );
}