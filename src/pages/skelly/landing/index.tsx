import { useState } from "react"

import { Box, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as BackgroundSvg } from "@/assets/svgs/skelly/landing.svg"
import Button from "@/components/Button"
import { useRainbowContext } from "@/contexts/RainbowProvider"
import useCheckViewport from "@/hooks/useCheckViewport"
import useSkellyStore, { MintStep } from "@/stores/skellyStore"

import ReferralCode from "./ReferralCode"

const Container = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  minHeight: "calc(100vh - 6.2rem)", // "100vh" - "header height"
  padding: "7.8rem 0",
  backgroundColor: "#101010",
  [theme.breakpoints.down("sm")]: {
    padding: "0 1rem",
  },
}))

const Title = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "5.6rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "7.2rem",
  marginBottom: "1.2rem",
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "2rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "3.2rem",
}))

const Mint = () => {
  const { isMobile } = useCheckViewport()
  const { connect, walletCurrentAddress } = useRainbowContext()
  const { changeMintStep } = useSkellyStore()
  const [isChecking, setIsChecking] = useState(false)

  const handleContinue = async () => {
    changeMintStep(MintStep.PROFILE)
  }

  return (
    <Container>
      <Title>Mint your Scroll Skelly</Title>
      <SubTitle>Get a scroll profile and earn badges across the ecosystem. </SubTitle>
      <SvgIcon sx={{ objectFit: "contain", height: "28rem", width: "auto", margin: "3rem auto" }} component={BackgroundSvg} inheritViewBox></SvgIcon>
      <ReferralCode isChecking={isChecking} setIsChecking={setIsChecking} />

      {walletCurrentAddress ? (
        <Button color="primary" gloomy={isChecking} width={isMobile ? "23rem" : "28.2rem"} onClick={handleContinue}>
          Continue
        </Button>
      ) : (
        <Button color="primary" width={isMobile ? "23rem" : "28.2rem"} onClick={connect}>
          Connect wallet
        </Button>
      )}
    </Container>
  )
}

export default Mint