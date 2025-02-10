import { Block, Section } from "components/Layout"
import { AnimationHeader } from "components/AnimationHeader"
import styles from "./FrontpageHero.module.scss"

export const FrontpageHero = () => {
  return (
    <Section width="full" verticalPadding="large" noPadding="top" centerContent>
      <AnimationHeader />

      <div className={styles.logoWrap}>
        <img
          src="/logo.svg"
          alt=""
          aria-hidden
          loading="eager"
          className={styles.logo}
        />
        <div className="h2">Factory Tøyen</div>
        <Block top="1">
          <div className="h2">5. mars 2025</div>
        </Block>
        <Block top="1">
          <div className="h3">kl. 09.00-15.00</div>
        </Block>
      </div>
    </Section>
  )
}
