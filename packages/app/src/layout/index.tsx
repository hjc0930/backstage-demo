import { PropsWithChildren } from 'react';
import { makeStyles } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import AppsIcon from '@material-ui/icons/Apps';
import DescriptionIcon from '@material-ui/icons/Description';
import AndroidIcon from '@material-ui/icons/Android';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import GavelIcon from '@material-ui/icons/Gavel';
import BuildIcon from '@material-ui/icons/Build';
import FolderIcon from '@material-ui/icons/Folder';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
import {
  Settings as SidebarSettings,
  UserSettingsSignInAvatar,
} from '@backstage/plugin-user-settings';
import { SidebarSearchModal } from '@backstage/plugin-search';
import {
  Sidebar,
  sidebarConfig,
  SidebarDivider,
  SidebarGroup,
  SidebarItem,
  SidebarPage,
  SidebarSpace,
  useSidebarOpenState,
  Link,
} from '@backstage/core-components';
import SearchIcon from '@material-ui/icons/Search';
import { NotificationsSidebarItem } from '@backstage/plugin-notifications';
import { ThemeToggle } from './ThemeToggle';

const useSidebarLogoStyles = makeStyles({
  root: {
    width: sidebarConfig.drawerWidthClosed,
    height: 3 * sidebarConfig.logoHeight,
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    marginBottom: -14,
  },
  link: {
    width: sidebarConfig.drawerWidthClosed,
    marginLeft: 24,
  },
});

const useThemeToggleStyles = makeStyles(theme => ({
  root: {
    position: 'fixed',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1100,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '50%',
    boxShadow: theme.shadows[2],
  },
}));

const SidebarLogo = () => {
  const classes = useSidebarLogoStyles();
  const { isOpen } = useSidebarOpenState();

  return (
    <div className={classes.root}>
      <Link to="/" underline="none" className={classes.link} aria-label="Home">
        {isOpen ? <LogoFull /> : <LogoIcon />}
      </Link>
    </div>
  );
};

const Layout = ({ children }: PropsWithChildren<{}>) => {
  const themeToggleClasses = useThemeToggleStyles();

  return (
    <SidebarPage>
      <div className={themeToggleClasses.root}>
        <ThemeToggle />
      </div>
      <Sidebar>
        <SidebarLogo />
        <SidebarGroup label="Search" icon={<SearchIcon />} to="/search">
          <SidebarSearchModal />
        </SidebarGroup>
        <SidebarDivider />

        {/* Dashboard */}
        <SidebarItem icon={DashboardIcon} to="/" text="Dashboard" />

        <SidebarDivider />

        {/* APIs Group */}
        <SidebarGroup label="APIs" icon={<SettingsEthernetIcon />}>
          <SidebarItem icon={SettingsEthernetIcon} to="api-catalog" text="API Catalog" />
          <SidebarItem icon={CloudUploadIcon} to="publish-api" text="Publish API" />
        </SidebarGroup>

        <SidebarDivider />

        {/* Tools Group */}
        <SidebarGroup label="Tools" icon={<BuildIcon />}>
          <SidebarItem icon={AppsIcon} to="app-catalog" text="App Catalog" />
          <SidebarItem icon={DescriptionIcon} to="app-templates" text="App Templates" />
          <SidebarItem icon={AndroidIcon} to="dev-agents" text="Dev Agents" />
          <SidebarItem icon={ShowChartIcon} to="observability" text="Observability" />
        </SidebarGroup>

        <SidebarDivider />

        {/* Resources Group */}
        <SidebarGroup label="Resources" icon={<FolderIcon />}>
          <SidebarItem icon={MenuBookIcon} to="reference" text="Reference" />
          <SidebarItem icon={GavelIcon} to="standards" text="Standards" />
        </SidebarGroup>

        <SidebarSpace />
        <SidebarDivider />
        <NotificationsSidebarItem />
        <SidebarDivider />
        <SidebarGroup
          label="Settings"
          icon={<UserSettingsSignInAvatar />}
          to="/settings"
        >
          <SidebarSettings />
        </SidebarGroup>
      </Sidebar>
      {children}
    </SidebarPage>
  );
};

export default Layout;
