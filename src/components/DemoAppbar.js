import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { ButtonComponent } from "../shared/BIDButton";
import { ternary } from "../utils/ternary";
import { LabelComponent } from "../shared/BIDLabelComp";
import { useDispatch } from "react-redux";
import { resetStage, resetUser } from "../redux/slices/bidSlice";

export const ResponsiveAppBar = ({ userName, remainingChance, curUserNum, availCoins, onClickEvent, userImage, setBidResult }) => {

  const dispatch = useDispatch();

  const handleShowResult = () => {
    setBidResult(true);
    dispatch(resetStage());
    dispatch(resetUser());
  }

  return (
    <AppBar position="static" sx={{ background: "#383434", color: "White", display: "flex", alignItems: "baseline" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar sx={{ width: "50px", height: "50px" }} alt="Remy Sharp" width="500px" src={userImage} />
            </IconButton>
            <LabelComponent>
              {userName}
            </LabelComponent>
            <LabelComponent>
              Remaining Chances : {remainingChance}
            </LabelComponent>
          </Box>

          <div className="bid-coin-container">
            <span className="mx-2">Available coins : {availCoins}</span>
            <img width="32" height="32" src="https://img.icons8.com/color/48/000000/expensive.png" alt="coins--v1" />

            <ButtonComponent
              color="info"
              onClick={onClickEvent}
              className="ms-4"
            >
              Click to generate coins
            </ButtonComponent>

            <ButtonComponent
              color="info"
              onClick={handleShowResult}
              disabled={ternary(curUserNum > 1, false, true)}
            >
              Show result
            </ButtonComponent>

          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

