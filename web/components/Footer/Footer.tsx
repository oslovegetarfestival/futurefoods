import Link from "next/link"

import { Grid, Flex, Section, Flow } from "components/Layout"

import styles from "./Footer.module.scss"
import { Newsletter } from "components/Newsletter"
import { AnimationFooter } from "components/AnimationFooter"
import { Button } from "components/Button"

export const Footer = () => {
  return (
    <>
      {/* <div className={styles.illustrations}>
        <AnimationFooter />
      </div> */}
      {/* <div className={styles.uneven} /> */}
      <footer className={styles.footer}>
        <Section width="xlarge">
          <Section centerContent>
            <a href="#">Til toppen ↑</a>
          </Section>
          <Section width="full" verticalPadding="large">
            <Flow>
              <Grid>
                <Flow space="small">
                  <h2 className="font-title">Om Future Foods</h2>
                  <p>
                    Future Foods er konferansen om plantebasert mat. Vi
                    inviterer deg som jobber med matbransjen til en inspirerende
                    dag med dyktige foredragsholdere, case studies og mingling.{" "}
                    <Link href="/om-konferansen" className="link link--white">
                      Mer om Future Foods
                    </Link>
                    .
                  </p>
                  <Button
                    color="white"
                    link="https://zfrmz.eu/dMpMokClyBvN6ynQ0c2w"
                    isOpenInNewWindow
                  >
                    Kjøp billett
                  </Button>
                </Flow>

                <Flow space="small">
                  <h2 className="font-title">Kontakt</h2>
                  <p>
                    <strong>E-post</strong>
                    <br />
                    <a href="mailto:kontakt@futurefoods.no">
                      kontakt@futurefoods.no
                    </a>
                  </p>
                  <p>
                    <strong>Facebook</strong> <br />
                    <a href="https://www.facebook.com/futurefoodskonferansen">
                      @futurefoodskonferansen
                    </a>
                  </p>
                </Flow>

                <Flow space="small">
                  <h2 className="font-title">Nyhetsbrev</h2>
                  <p>
                    Få siste nytt om plantebasert mat, konkurranser, utlodninger
                    og mye mer!
                  </p>
                  <Newsletter />
                </Flow>
              </Grid>

              <Flex justify="spaceBetween" align="end" wrap>
                <Link href="/personvern" className="link link--white">
                  Personvern og cookies
                </Link>
              </Flex>
            </Flow>
          </Section>
        </Section>
      </footer>
    </>
  )
}
