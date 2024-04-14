import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import classNames from "classnames"

import { Flex, Section } from "components/Layout"
import { Button } from "components/Button"

import styles from "./Header.module.scss"
import useBodyFreeze from "hooks/useBodyFreeze"

type Props = {
  isFrontpage?: boolean
}

export const Header = ({ isFrontpage }: Props) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Logic to close mobile menu on when a link is clicked (= route change)
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMobileMenuOpen(false)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    // Clean up on unmount
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])

  // Prevent page scroll when menu is open
  useBodyFreeze(isMobileMenuOpen)

  const logoClass = classNames(
    styles.logo,
    isMobileMenuOpen ? styles[`logo-mobile-menu-open`] : false
  )

  return (
    <header>
      <Section width="large" verticalPadding="small">
        <Flex justify="spaceBetween" align="start">
          {(!isFrontpage || isMobileMenuOpen) && (
            <Link href="/" className={logoClass} title="Til forsiden">
              <img src="/logo.svg" alt="" aria-hidden loading="eager" />
            </Link>
          )}

          <nav
            className={styles.menu}
            style={{ display: isMobileMenuOpen ? "block" : " " }}
          >
            <ul className={styles.menuList}>
              <li
                className={styles.menuItem}
                data-animate-in
                data-animation-order="1"
              >
                <Link href="/program">Program</Link>
              </li>
              <li
                className={styles.menuItem}
                data-animate-in
                data-animation-order="2"
              >
                <Link href="/foredragsholdere">Foredragsholdere</Link>
              </li>
              <li
                className={styles.menuItem}
                data-animate-in
                data-animation-order="3"
              >
                <Link href="/om-konferansen">Om konferansen</Link>
              </li>
              <li
                className={styles.menuItem}
                data-animate-in
                data-animation-order="4"
              >
                <Link href="/planteprisen">Planteprisen</Link>
              </li>
              <li
                className={styles.menuItem}
                data-animate-in
                data-animation-order="5"
              >
                <Button
                  color="pink"
                  size="small"
                  link="https://tikkio.com/tickets/41042-oslo-vegetarfestivals-julemarked-2023"
                  isOpenInNewWindow
                >
                  Kjøp billett
                </Button>
              </li>
            </ul>
          </nav>
          {/* Mobile menu */}
          <div className={styles.mobileToggle}>
            <Button
              size="medium"
              isArrow={false}
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }}
            >
              {isMobileMenuOpen ? "Lukk ✕" : "Meny ☰"}
            </Button>
          </div>
        </Flex>
      </Section>
    </header>
  )
}
