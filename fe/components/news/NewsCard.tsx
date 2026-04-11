import Link from "next/link"
import { News } from "@/types/news"
import styles from "./card.module.css"

type Props = {
  news: News
}

export default function NewsCard({ news }: Props) {
  return (
    <Link href={`/news/${news.slug}`}>
      <div className={styles.card}>
        <img src={news.thumbnail} alt={news.title} />
        <div>
          <span>{news.created_at}</span>
          <h3>{news.title}</h3>
        </div>
      </div>
    </Link>
  )
}