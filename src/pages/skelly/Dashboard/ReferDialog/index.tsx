import { Dialog, DialogContent, DialogTitle, IconButton, InputBase, Stack, SvgIcon, Typography } from "@mui/material"
import { styled } from "@mui/system"

import { ReactComponent as CloseSvg } from "@/assets/svgs/skelly/close.svg"
import useSkellyStore from "@/stores/skellyStore"

import Coupon from "./coupon"
import Record from "./record"

const StyledDialog = styled(Dialog)(({ theme }) => ({
  borderRadius: "1.6rem",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  backdropFilter: "blur(50px)",
  "& .MuiDialog-paper": {
    background: "linear-gradient(114deg, #2A2A2A 0%, rgba(27, 27, 27, 0.60) 100%)",
  },
}))

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: "3rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}))

const Title = styled(Typography)(({ theme }) => ({
  color: "#FFFFFF",
  textAlign: "center",
  fontSize: "4rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "5.6rem",
  marginBottom: "1.6rem",
}))

const SubTitle = styled(Typography)(({ theme }) => ({
  color: "#EEEEEE",
  textAlign: "center",
  fontSize: "1.8rem",
  fontStyle: "normal",
  fontWeight: 400,
  lineHeight: "2.8rem",
  marginBottom: "3.2rem",
}))

const ReferDialog = () => {
  const { referDialogVisible, changeReferDialog } = useSkellyStore()

  const handleClose = () => {
    changeReferDialog(false)
  }

  return (
    <StyledDialog maxWidth={false} open={referDialogVisible} onClose={handleClose}>
      <DialogTitle
        sx={{
          m: 0,
          p: ["2rem", "3rem"],
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ p: 0, "&:hover": { backgroundColor: "unset" } }} onClick={handleClose}>
          <SvgIcon sx={{ fontSize: ["1.6rem", "1.8rem"], color: "#fff" }} component={CloseSvg} inheritViewBox></SvgIcon>
        </IconButton>
      </DialogTitle>
      <StyledDialogContent>
        <Title>Refer friends & you both earn</Title>
        <SubTitle>
          Your friend gets 50% off the mint fee <br />
          while you receive 0.0005 ETH per successful referral
        </SubTitle>
      </StyledDialogContent>
      <Record />
      <Coupon />
    </StyledDialog>
  )
}

export default ReferDialog