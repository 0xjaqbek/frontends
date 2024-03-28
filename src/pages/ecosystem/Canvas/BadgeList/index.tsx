import React, { useMemo, useState } from "react"

import { Box, Card, CardContent, IconButton, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as LeftSvg } from "@/assets/svgs/canvas/arrow-left.svg"
import { ReactComponent as RightSvg } from "@/assets/svgs/canvas/arrow-right.svg"

interface CarouselItem {
  name: string
  nftAddress: string[] | null
  nftAbi: object | null
  badgeContract: string
  description: any
  metaDescription?: string
  image: string
  native: boolean
  originsNFT?: boolean
  issuer: {
    origin: string
    name: string
    logo: string
  }
  validator: (address, provider) => Promise<boolean> | boolean
}

interface CarouselProps {
  items: CarouselItem[]
}

const BadgeCard = styled(Card)(({ theme }) => ({
  // minWidth: "44.4rem",
  width: "calc((100% - 3.2rem) / 3)",
  height: "44.4rem",
  padding: "1.6rem",
  borderRadius: "2rem",
  background: "#FFF8F3",
  textAlign: "center",
  transition: "transform 0.5s ease",
  flex: " 0 0 auto",
  cursor: "pointer",
  "&  *": {
    cursor: "pointer !important",
  },
}))

const ArrorButton = styled(IconButton)(({ theme }) => ({
  background: "#FFF8F3",
  width: "4.8rem",
  height: "4.8rem",
  borderRadius: "0.8rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  "&:hover": {
    background: "#FFF8F3",
  },
  "&.Mui-disabled": {
    color: "#ccc",
    background: "#F0F0F0",
  },
}))

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : items.length - 3))
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex < items.length - 3 ? prevIndex + 1 : 0))
  }

  const isPrevDisabled = currentIndex === 0
  const isNextDisabled = (currentIndex + 1) * 3 >= items.length

  const translateX = useMemo(() => {
    return `translateX(calc(((100% + 1.6rem)  * -1) * ${currentIndex}))`
  }, [currentIndex])

  const handleCardClick = item => {
    window.open(item.issuer.origin, "_blank")
  }

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Stack
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{ margin: "5rem 0" }}
        style={{ transform: translateX, transition: "transform 0.5s ease" }}
      >
        {items.map((item, index) => (
          <BadgeCard onClick={() => handleCardClick(item)} key={index}>
            <CardContent>
              <img alt="logo" src={item.image} style={{ height: "8.8rem", borderRadius: "0.8rem" }} />
              <Typography variant="h5" sx={{ margin: "1.6rem 0" }} component="div">
                {item.name}
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 400, lineHeight: "3.2rem", marginBottom: "4.4rem", maxHeight: "14rem", overflow: "auto" }}>
                {item.description}
              </Typography>
              <Typography variant="h5">
                <img alt="issuer logo" src={item.issuer.logo} style={{ height: "4.8rem", borderRadius: "0.8rem" }} />
                {item.issuer.name}
              </Typography>
            </CardContent>
          </BadgeCard>
        ))}
      </Stack>
      <Box display="flex" justifyContent="flex-end" gap={"1.6rem"} marginTop={2} paddingBottom="9.5rem">
        <ArrorButton onClick={handlePrev} disabled={isPrevDisabled} aria-label="previous">
          <SvgIcon component={LeftSvg} inheritViewBox />
        </ArrorButton>
        <ArrorButton onClick={handleNext} disabled={isNextDisabled} aria-label="next">
          <SvgIcon component={RightSvg} sx={{ fontSize: "2.2rem" }} inheritViewBox />
        </ArrorButton>
      </Box>
    </Box>
  )
}

export default Carousel