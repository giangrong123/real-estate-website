import { NEWS_DATA } from "@/data/news"
import { notFound } from "next/navigation"
import styles from "./detail.module.css"

interface Props {
  params: Promise<{ slug: string }>
}

export default async function DetailPage({ params }: Props) {
  const { slug } = await params

  const news = NEWS_DATA.find(n => n.slug === slug)

  if (!news) return notFound()

  return (
    <article className={styles.wrapper}>
      <h1 className={styles.title}>{news.title}</h1>
      <p className={styles.date}>{news.createdAt}</p>

      <img src={news.thumbnail} alt={news.title} className={styles.thumbnail} />

      <div className={styles.content}>
        {news.content.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}