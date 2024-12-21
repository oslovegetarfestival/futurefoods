import { Section } from "components/Layout"
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
        <div className="h2">5. mars 2025</div>
        <div className="h2">Factory Tøyen</div>
      </div>
    </Section>
  )
}
