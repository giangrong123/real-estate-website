import Link from "next/link";
import styles from "./styles/HomeProjects.module.css";
import { PROJECTS_DATA } from "@/data/projects";

export default function HomeProject() {
  return (
    <section className={styles.projects}>
      <div className={styles.header}>
        <h2 className={styles.title}>Dự án bất động sản nổi bật</h2>
        <Link href="/projects" className={styles.viewMore}>
          Xem thêm →
        </Link>
      </div>

      <div className={styles.list}>
        {PROJECTS_DATA.slice(0, 4).map((item) => (
          <Link
            key={item.id}
            href={`/project/${item.id}`}
            className={styles.item}
          >
            <img src={item.thumbnail} alt={item.name} />

            <div className={styles.content}>
              <span>{item.status}</span>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>{item.address}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}