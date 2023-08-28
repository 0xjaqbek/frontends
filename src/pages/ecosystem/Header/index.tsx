import { isMobileOnly } from "react-device-detect"

import { Box, Stack, Typography } from "@mui/material"

import Button from "@/components/Button"
import OrientationToView from "@/components/Motion/OrientationToView"
import SectionWrapper from "@/components/SectionWrapper"
import { LIST_YOUR_DAPP_LINK } from "@/constants"

const Header = () => {
  return (
    <>
      <SectionWrapper
        sx={{
          pt: ["6.8rem", "7.3rem", "15.4rem"],
          pb: ["10rem", "10rem", "15.4rem"],
          display: "flex",
          flexDirection: ["column", "column", "row"],
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <OrientationToView>
          <Typography
            sx={{
              fontSize: ["4rem", "7.8rem"],
              lineHeight: ["5rem", "8.5rem"],
              fontWeight: 600,
              textAlign: ["center", "left"],
              width: ["100%", "66rem"],
            }}
          >
            An Ecosystem Forever in Motion
          </Typography>
        </OrientationToView>
        <Stack direction="column" justifyContent="space-between" spacing={isMobileOnly ? "4rem" : "2.5rem"} sx={{ maxWidth: ["100%", "68rem"] }}>
          <OrientationToView>
            <Typography
              sx={{
                fontSize: ["2rem", "2.6rem"],
                lineHeight: "normal",
                mt: ["2rem", "2rem", 0],
                textAlign: ["center", "left"],
              }}
            >
              Join a supportive, collaborative ecosystem with a greater purpose – permissionless, flexible, and dedicated to defining the future of
              Ethereum.
            </Typography>
          </OrientationToView>
          <OrientationToView delay={0.3}>
            <Stack direction={isMobileOnly ? "column" : "row"} spacing={isMobileOnly ? "2rem" : "3rem"} alignItems="center">
              <Button href="/bridge" color="primary">
                Bridge into Scroll
              </Button>
              <Button href={LIST_YOUR_DAPP_LINK} target="_blank">
                List your dApp
              </Button>
            </Stack>
          </OrientationToView>
        </Stack>
      </SectionWrapper>
      <Box sx={{ backgroundColor: theme => theme.palette.themeBackground.light }}>
        <Box
          sx={{
            borderRadius: "4rem 4rem 0 0",
            height: ["50.8rem", "37rem", "24vw"],
            background: [
              "url(/imgs/ecosystem/ecosystem-bg-mobile.svg) center / cover no-repeat",
              "url(/imgs/ecosystem/ecosystem-bg.svg) center / cover no-repeat",
            ],
            backgroundSize: "cover",
          }}
        ></Box>
      </Box>
    </>
  )
}

export default Header
