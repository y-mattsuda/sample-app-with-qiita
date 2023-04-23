"use client";

import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import React from "react";
import { GITHUB_REPO_URL } from "@/constants";

const GitHubLink = () => {
  return (
    <IconButton
      color="inherit"
      href={GITHUB_REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon />
    </IconButton>
  );
};

export type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" flexGrow={1}>
          {title}
        </Typography>
        <GitHubLink />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
