import {
  createBaseThemeOptions,
  pageTheme as defaultPageThemes,
  PageTheme,
  palettes,
  createUnifiedTheme,
} from '@backstage/theme';

import { alpha } from '@material-ui/core/styles';

const pageThemesFontColorOverride: Record<string, PageTheme> = {};
Object.keys(defaultPageThemes).map(key => {
  pageThemesFontColorOverride[key] = {
    ...defaultPageThemes[key],
    fontColor: '#E6EDF3',
  };
});

export const apertureThemeDark = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: {
      ...palettes.dark,
      primary: {
        main: '#58A6FF',
        light: '#79C0FF',
        dark: '#1F6FEB',
      },
      secondary: {
        main: '#F78166',
        light: '#FFA657',
        dark: '#A371F7',
      },
      grey: {
        50: '#161B22',
        100: '#21262D',
        200: '#30363D',
        300: '#484F58',
        400: '#6E7681',
        500: '#8B949E',
        600: '#B1BAC4',
        700: '#C9D1D9',
        800: '#E6EDF3',
        900: '#F0F6FC',
      },
      error: {
        main: '#F85149',
        light: '#FF7B72',
        dark: '#DA3633',
      },
      warning: {
        main: '#F0883E',
        light: '#FFA657',
        dark: '#BD561D',
      },
      success: {
        main: '#3FB950',
        light: '#56D364',
        dark: '#238636',
      },
      info: {
        main: '#58A6FF',
        light: '#79C0FF',
        dark: '#1F6FEB',
      },
      navigation: {
        ...palettes.dark.navigation,
        background: '#0D1117',
        color: '#E6EDF3',
        indicator: '#58A6FF',
        selectedColor: '#58A6FF',
        navItem: {
          hoverBackground: 'rgba(177, 186, 196, 0.12)',
        },
        submenu: {
          background: '#161B22',
        },
      },
      text: {
        primary: '#E6EDF3',
        secondary: '#8B949E',
      },
      background: {
        default: '#0D1117',
        paper: '#161B22',
      },
    },
  }),
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: 54,
      fontWeight: 700,
      marginBottom: 10,
    },
    h2: {
      fontSize: 40,
      fontWeight: 700,
      marginBottom: 8,
    },
    h3: {
      fontSize: 32,
      fontWeight: 700,
      marginBottom: 6,
    },
    h4: {
      fontWeight: 700,
      fontSize: 28,
      marginBottom: 6,
    },
    h5: {
      fontWeight: 700,
      fontSize: 24,
      marginBottom: 4,
    },
    h6: {
      fontWeight: 700,
      fontSize: 20,
      marginBottom: 2,
    },
  },
  pageTheme: pageThemesFontColorOverride,
  defaultPageTheme: 'home',
  components: {
    BackstageHeader: {
      styleOverrides: {
        header: ({ theme }) => ({
          backgroundImage: 'unset',
          boxShadow: 'unset',
          paddingBottom: theme.spacing(1),
          backgroundColor: '#161B22',
        }),
        title: ({ theme }) => ({
          color: theme.page.fontColor,
          fontWeight: 900,
        }),
        subtitle: ({ theme }) => ({
          color: alpha(theme.page.fontColor, 0.8),
        }),
        type: ({ theme }) => ({
          color: alpha(theme.page.fontColor, 0.8),
        }),
      },
    },
    BackstageHeaderTabs: {
      styleOverrides: {
        defaultTab: {
          fontSize: 'inherit',
          textTransform: 'none',
        },
      },
    },
    BackstageOpenedDropdown: {
      styleOverrides: {
        icon: {
          '& path': {
            fill: '#E6EDF3',
          },
        },
      },
    },
    BackstageTable: {
      styleOverrides: {
        root: {
          '&> :first-child': {
            borderBottom: '1px solid #30363D',
            boxShadow: 'none',
          },
          '& th': {
            borderTop: 'none',
            textTransform: 'none !important',
            backgroundColor: '#161B22',
          },
          '& td': {
            borderBottom: '1px solid #21262D',
          },
        },
      },
    },
    CatalogReactUserListPicker: {
      styleOverrides: {
        title: {
          textTransform: 'none',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        standardError: ({ theme }) => ({
          color: '#FFFFFF',
          backgroundColor: theme.palette.error.dark,
          '& $icon': {
            color: '#FFFFFF',
          },
        }),
        standardInfo: ({ theme }) => ({
          color: '#FFFFFF',
          backgroundColor: theme.palette.primary.dark,
          '& $icon': {
            color: '#FFFFFF',
          },
        }),
        standardSuccess: ({ theme }) => ({
          color: '#FFFFFF',
          backgroundColor: theme.palette.success.dark,
          '& $icon': {
            color: '#FFFFFF',
          },
        }),
        standardWarning: ({ theme }) => ({
          color: '#FFFFFF',
          backgroundColor: theme.palette.warning.dark,
          '& $icon': {
            color: '#FFFFFF',
          },
        }),
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '&[aria-expanded=true]': {
            backgroundColor: '#21262D',
            color: '#E6EDF3',
          },
          '&[aria-expanded=true] path': {
            fill: '#E6EDF3',
          },
        },
        popper: {
          '& .MuiPaper-root': {
            backgroundColor: '#161B22',
            border: '1px solid #30363D',
          },
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(1, 4, 9, 0.8)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
        },
        containedPrimary: {
          backgroundColor: '#238636',
          '&:hover': {
            backgroundColor: '#2EA043',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: 3,
          backgroundColor: theme.palette.grey[200],
          color: theme.palette.grey[800],
          margin: 4,
        }),
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0D1117',
          borderRight: '1px solid #21262D',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#161B22',
          backgroundImage: 'unset',
        },
        outlined: {
          border: '1px solid #30363D',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&[aria-expanded]': {
            backgroundColor: '#21262D',
            color: '#E6EDF3',
          },
        },
        icon: {
          color: '#8B949E',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 10,
        },
        switchBase: {
          padding: 12,
        },
        thumb: {
          backgroundColor: '#8B949E',
          height: 14,
          width: 14,
        },
        track: {
          borderRadius: 9,
          backgroundColor: '#30363D',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          transition: 'none',
          backgroundColor: '#58A6FF',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        button: {
          textTransform: 'none',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: '#30363D',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(177, 186, 196, 0.12)',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#0D1117',
          '&:hover': {
            backgroundColor: '#161B22',
          },
        },
        input: {
          '&::placeholder': {
            color: '#6E7681',
            opacity: 1,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            borderColor: '#30363D',
          },
          '&:hover fieldset': {
            borderColor: '#6E7681',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#58A6FF',
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          '& .MuiFormLabel-root': {
            color: '#8B949E',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        title: {
          color: '#E6EDF3',
        },
        subheader: {
          color: '#8B949E',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          color: '#C9D1D9',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#21262D',
          color: '#E6EDF3',
          border: '1px solid #30363D',
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: '#E6EDF3',
          '&:hover': {
            backgroundColor: '#21262D',
          },
          '&.Mui-selected': {
            backgroundColor: '#21262D',
            '&:hover': {
              backgroundColor: '#30363D',
            },
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#161B22',
          border: '1px solid #30363D',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: '#E6EDF3',
          borderBottom: '1px solid #21262D',
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: '#C9D1D9',
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          borderTop: '1px solid #21262D',
        },
      },
    },
  },
});
