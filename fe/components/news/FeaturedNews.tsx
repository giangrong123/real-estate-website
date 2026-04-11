import Link from "next/link"
import { News } from "@/types/news"
import styles from "./featured.module.css"

type Props = {
  news: News
}

export default function FeaturedNews({ news }: Props) {
  return (
    <Link href={`/news/${news.slug}`}>
      <div
        className={styles.featured}
        style={{ backgroundImage: `url(${news.thumbnail})` }}
      >
        <div className={styles.overlay}>
          <span>{news.created_at}</span>
          <h2>{news.title}</h2>
        </div>
      </div>
    </Link>
  )
}