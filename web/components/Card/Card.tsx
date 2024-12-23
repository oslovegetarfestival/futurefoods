import Link from "next/link"

import { Flow } from "components/Layout"

import styles from "./Card.module.scss"
import { fullDate, startAndEndTime } from "utils/date"
import { weekDayAndStartEndTime } from "utils/date"
import { SanityImageWrap } from "components/SanityImageWrap"
import classNames from "classnames"

type Item = {
  image: {
    altText?: string
    asset: {
      _ref: string
    }
  }
  title: string
  intro: string
  slug: {
    current: string
  }
  location?: {
    title: string
  }
  startDateTime: string
  endDateTime?: string
  publishedDate?: string
  _createdAt: string
  sponsor: boolean
  _id: string
}

type TypeProps = "event" | "eventWithDate" | "news"

type Props = {
  data: Item[]
  type?: TypeProps
  isEagerLoadImages?: boolean
  color?: "lavender"
  isScroll?: boolean
}

type EventDateProps = {
  type?: TypeProps
  item: Item
}

const createEventDate = ({ type, item }: EventDateProps) => {
  if (!type) return
  if (!item?.startDateTime) return

  // Show weekday (used for frontpage listing)
  if (type === "eventWithDate") {
    return weekDayAndStartEndTime({
      startDate: item?.startDateTime,
      endDate: item?.endDateTime,
    })
  }

  if (type === "event") {
    return startAndEndTime({
      startDate: item?.startDateTime,
      endDate: item?.endDateTime,
    })
  }

  if (type === "news") {
    return fullDate(item?.publishedDate || "")
  }

  return ""
}

export const Card = ({
  data,
  type,
  isEagerLoadImages = false,
  color,
  isScroll,
}: Props) => {
  const gridClass = classNames({
    [styles.grid]: true,
    [styles[`grid-isScroll`]]: isScroll,
  })

  const metadataClass = classNames({
    [styles.metadata]: true,
    [styles[`metadata-color-${color}`]]: color,
  })

  return (
    <div className={gridClass}>
      {data?.map((item) => (
        <Link key={item._id} href={item.slug?.current} className={styles.link}>
          <div className={styles.wrap}>
            <div className={styles.imageWrap}>
              <SanityImageWrap
                image={item?.image}
                width={468} // = Largest width on any screen size
                height={352}
                isHideCaption
                loading={isEagerLoadImages ? "eager" : "lazy"}
              />
            </div>
            <div className={styles.content}>
              <p className={metadataClass}>
                {createEventDate({ type: type, item: item })}
              </p>
              <Flow space="xsmall">
                <h2 className="h3">{item.title}</h2>
                <p>{item.intro}</p>
              </Flow>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
