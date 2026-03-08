import { IconButton, Tooltip, useTheme } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useApi } from '@backstage/core-plugin-api';
import { appThemeApiRef } from '@backstage/core-plugin-api';
import { useState } from 'react';
import { ThemeEnum } from '../types/common';

export const ThemeToggle = () => {
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
        style={{
          padding: 8,
        }}
      >
        {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
};
