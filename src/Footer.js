import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="white" style={{ textAlign: "center" }}>
      {"Copyright © "}
      {"Luan Lima Campos "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  footer: {
    margin: 0,
    padding: theme.spacing(6, 2),
    marginTop: "auto",
    bottom: "0",
    color: "#FFF",
    backgroundColor: "rgba(0,0,0,0.4)",
    textAlign: "center",
  },
}));

export default function StickyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          New York Restaurant List made with React
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}
