import type { NextPage } from "next"

import { Flow, Section } from "components/Layout"

import { Card } from "components/Card"
import { SanityBlockModule } from "components/SanityBlockModule"
import { weekDay, weekDayAndDate } from "utils/date"
import { Seo } from "components/Seo"
import { useEffect, useState } from "react"

type Props = {
  [key: string]: any
}

type EventItem = {
  title: string
  startDateTime: string
  location: {
    title: string
  }
}

type EventGroupedItem = {
  startDate: string
  items: EventItem[]
}

const groupEventByDate = (data: EventItem[]) => {
  if (!data) return []

  const grouped = data?.reduce(
    (result: EventGroupedItem[], item: EventItem) => {
      const currentDate = weekDayAndDate(item.startDateTime)

      const existingGroup = result?.find((group) => {
        const existingDate = weekDayAndDate(group.startDate)
        return existingDate === currentDate
      })

      if (existingGroup) {
        existingGroup.items.push(item)
      } else {
        result.push({
          startDate: item.startDateTime,
          items: [item],
        })
      }
      return result
    },
    []
  )

  return grouped
}

const EventMainPage: NextPage<Props> = ({ page = {} }) => {
  const groupedData = groupEventByDate(page?.items)

  const hasEvents = groupedData?.length > 0

  // Create a list of all unique locations
  const uniqueLocations = page?.items
    ?.map((item) => item?.location?.title)
    ?.filter((value, index, array) => array.indexOf(value) === index)
    ?.sort()

  const [currentFilter, setCurrentFilter] = useState("")

  const handleFilterClick = (filter: string) => {
    setCurrentFilter(filter)
    // Save filter to browser to remember it on page back navigation
    sessionStorage.setItem("eventFilter", filter)
  }

  useEffect(() => {
    const storedFilter = sessionStorage.getItem("eventFilter")
    setCurrentFilter(storedFilter ?? "")
  }, [])

  const filterEvents = (events: EventItem[]) => {
    if (currentFilter === "" || currentFilter == null) return events

    return events.filter((event) => event?.location?.title === currentFilter)
  }

  return (
    <>
      <Seo page={page} />

      <Section verticalPadding="large" noPadding="top">
        <h1 className="page-title">{page?.title}</h1>
        {page?.intro && <p className="lead">{page?.intro}</p>}
      </Section>

      {page?.contentBlocks?.map((module: any) => (
        <SanityBlockModule data={module} key={module._key} />
      ))}

      {/* Disabled since Future Foods is one day and one venue */}
      {/* {hasEvents && (
        <Section width="large">
          <Flex justify="spaceBetween" gap="medium">
            <div style={{ flex: "1 1 0px" }}>
              <Block bottom="2">
                <p className="font-title">Hopp til: </p>
              </Block>
              <Flex align="center" gap="small" wrap>
                {groupedData?.map(({ startDate }) => (
                  <Button
                    size="small"
                    isArrow={false}
                    key={startDate}
                    link={`#${weekDay(startDate)}`}
                  >
                    <span className="uppercase-first">
                      {weekDay(startDate)}
                    </span>
                  </Button>
                ))}
              </Flex>
            </div>

            <div style={{ flex: "1 1 0px" }}>
              <Block bottom="2">
                <p className="font-title">Vis kun: </p>
              </Block>
              <Flex align="center" gap="small" wrap>
                <Button
                  color={currentFilter === "" ? "pink" : "cherry"}
                  size="small"
                  isArrow={false}
                  onClick={() => {
                    handleFilterClick("")
                  }}
                >
                  Vis alt
                </Button>

                {uniqueLocations?.map((location: string) => (
                  <Button
                    key={location}
                    color={currentFilter === location ? "pink" : "cherry"}
                    size="small"
                    isArrow={false}
                    onClick={() => {
                      handleFilterClick(location)
                    }}
                  >
                    {location}
                  </Button>
                ))}
              </Flex>
            </div>
          </Flex>
        </Section>
      )} */}

      {groupedData?.map(({ startDate, items }: EventGroupedItem) => (
        <Section width="large" verticalPadding="large" key={startDate}>
          <Flow>
            <h2 className="sticky-section-header" id={weekDay(startDate)}>
              {weekDayAndDate(startDate)}
            </h2>
            {/* @ts-ignore */}
            <Card data={filterEvents(items)} type="event" />
          </Flow>
        </Section>
      ))}
    </>
  )
}

export default EventMainPage
