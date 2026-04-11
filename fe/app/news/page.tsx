import Link from "next/link"
import { NEWS_DATA } from "@/data/news"
import styles from "./news.module.css"

export default function NewsPage() {
  return (
    <section className={styles.wrapper}>
      <h1 className={styles.title}>Tin tức & Phân tích</h1>

      <div className={styles.grid}>
        {NEWS_DATA.map((item) => (
          <Link key={item.id} href={`/news/${item.slug}`} className={styles.card}>
            <img src={item.thumbnail} alt={item.title} />
            <div className={styles.content}>
              <span className={styles.date}>{item.createdAt}</span>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <span className={styles.readmore}>Đọc tiếp →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}