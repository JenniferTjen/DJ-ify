import React from "react";
import { Button } from "@mui/material";
import "./CustomButton.css";

const CustomButton = ({ text, onClick }) => {
  return (
    <Button
      className="Button"
      sx={{
        color: "black",
        height: "40px",
        paddingX: "20px",
        fontSize: "20px",
        fontWeight: "semibold",
        backgroundColor: "rgb(30, 215, 96)", // Custom background color (greenish)
        "&:hover": {
          backgroundColor: "rgb(30, 215, 96, 0.7)",
        },
      }}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default CustomButton;
