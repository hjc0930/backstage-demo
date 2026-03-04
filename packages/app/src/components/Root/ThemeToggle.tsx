import React from 'react';
import { IconButton, Tooltip, useTheme } from '@material-ui/core';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useApi } from '@backstage/core-plugin-api';
import { appThemeApiRef } from '@backstage/core-plugin-api';

export const ThemeToggle = () => {
  const theme = useTheme();
  const appThemeApi = useApi(appThemeApiRef);

  const [currentTheme, setCurrentTheme] = React.useState<string>(() => {
    return appThemeApi.getActiveThemeId?.() || 'light';
  });

  const toggleTheme = () => {
    const newThemeId = currentTheme === 'light' ? 'dark' : 'light';
    appThemeApi.setActiveThemeId?.(newThemeId);
    setCurrentTheme(newThemeId);
  };

  const isDark = currentTheme === 'dark' || theme.palette.type === 'dark';

  return (
    <Tooltip title={isDark ? '切换到浅色主题' : '切换到深色主题'}>
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
