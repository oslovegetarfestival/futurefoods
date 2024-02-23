import type { NextPage } from "next"

import { FrontpageHero } from "components/FrontpageHero"
import { Block, Flex, Section } from "components/Layout"
import { Button } from "components/Button"
import { Card } from "components/Card"
import { Seo } from "components/Seo"
import { SponsorBlock } from "components/SponsorBlock"

type Props = {
  [key: string]: any
}

const FrontPage: NextPage<Props> = ({ page = {} }) => {
  return (
    <>
      <Seo page={page} isFrontPage />

      <FrontpageHero />

      <Section
        centerContent
        width="full"
        verticalPadding="xlarge"
        style={{ paddingTop: "40px" }}
        isResponsive
      >
        <Section width="large" noPadding="sides">
          <h2>Nytt fra julemarkedet</h2>

          <Block top="7" bottom="5">
            <Card data={page?.promotedNews} isEagerLoadImages isScroll />
          </Block>

          <Button link="/aktuelt">Se alle nyheter</Button>
        </Section>
      </Section>

      <Section
        centerContent
        width="full"
        verticalPadding="xlarge"
        background="cherry"
        isResponsive
      >
        <Section width="large" noPadding="sides">
          <h2>Dette skjer på julemarkedet</h2>

          <Block top="7" bottom="5">
            <Card
              data={page?.promotedEvents}
              type="eventWithDate"
              color="lavender"
              isScroll
            />
          </Block>

          <Button link="/program" color="white">
            Se hele programmet
          </Button>
        </Section>
      </Section>

      <Section centerContent width="full" verticalPadding="xlarge" isResponsive>
        <Section width="large" noPadding="sides">
          <h2>Noen av årets utstillere</h2>

          <Block top="7" bottom="5">
            <Card data={page?.promotedExhibitors} isScroll />
          </Block>

          <Flex justify="center" wrap gap="small">
            <Button link="/utstillere">Se alle utstillere</Button>
            <Button link="/bli-utstiller">Bli utstiller</Button>
          </Flex>
        </Section>
      </Section>

      <SponsorBlock data={page?.sponsorBlock} />
    </>
  )
}

export default FrontPage
