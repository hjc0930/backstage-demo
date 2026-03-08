import { IconButton, Tooltip, useTheme, makeStyles } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useApi } from '@backstage/core-plugin-api';
import { appThemeApiRef } from '@backstage/core-plugin-api';
import { useState } from 'react';
import { ThemeEnum } from '../types/common';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 1300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50%',
    boxShadow: theme.shadows[3],
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
}));

export const ThemeToggle = () => {
  const classes = useStyles();
  const theme = useTheme();
  const appThemeApi = useApi(appThemeApiRef);

  const [currentTheme, setCurrentTheme] = useState<ThemeEnum>(() => {
    return (appThemeApi.getActiveThemeId?.() as ThemeEnum) || ThemeEnum.LIGHT;
  });

  const toggleTheme = () => {
    const newThemeId =
      currentTheme === ThemeEnum.LIGHT ? ThemeEnum.DARK : ThemeEnum.LIGHT;
    appThemeApi.setActiveThemeId?.(newThemeId);
    setCurrentTheme(newThemeId);
  };

  const isDark = currentTheme === 'dark' || theme.palette.type === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}>
      <IconButton
        onClick={toggleTheme}
        color="inherit"
        className={classes.root}
        style={{
          padding: 12,
        }}
      >
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};
