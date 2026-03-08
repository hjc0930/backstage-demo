import { PropsWithChildren } from 'react';
import { Button, makeStyles, Tooltip } from '@material-ui/core';
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
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LogoFull from './LogoFull';
import LogoIcon from './LogoIcon';
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
import { ThemeToggle } from './ThemeToggle';
import { CommonHeader } from './CommonHeader';

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

const useSidebarToggleStyles = makeStyles(theme => ({
  toggleButton: {
    position: 'fixed',
    top: 50,
    width: 24,
    height: 24,
    minWidth: 24,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '50%',
    boxShadow: theme.shadows[2],
    zIndex: 1300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'left 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
      color: '#fff',
    },
  },
}));

const useLayoutStyles = makeStyles(() => ({
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100vh',
    overflow: 'hidden',
  },
  contentArea: {
    flex: 1,
    overflow: 'auto',
  },
}));

const SidebarToggle = () => {
  const classes = useSidebarToggleStyles();
  const { isOpen, setOpen } = useSidebarOpenState();

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  // Calculate button position: right side of sidebar when expanded, right side when collapsed
  const leftPosition = isOpen
    ? sidebarConfig.drawerWidthOpen - 12
    : sidebarConfig.drawerWidthClosed - 12;

  return (
    <Tooltip title={isOpen ? 'Collapse Sidebar' : 'Expand Sidebar'} placement="right">
      <Button
        className={classes.toggleButton}
        onClick={handleToggle}
        style={{ left: leftPosition }}
      >
        {isOpen ? (
          <ChevronLeftIcon style={{ fontSize: 16 }} />
        ) : (
          <ChevronRightIcon style={{ fontSize: 16 }} />
        )}
      </Button>
    </Tooltip>
  );
};

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
  const classes = useLayoutStyles();

  return (
    <SidebarPage>
      <ThemeToggle />
      <Sidebar disableExpandOnHover>
        <SidebarLogo />
        {/* Dashboard */}
        <SidebarItem icon={DashboardIcon} to="/" text="Dashboard" />

        <SidebarDivider />

        {/* APIs Group */}
        <SidebarGroup label="APIs" icon={<SettingsEthernetIcon />}>
          <SidebarItem
            icon={SettingsEthernetIcon}
            to="api-catalog"
            text="API Catalog"
          />
          <SidebarItem
            icon={CloudUploadIcon}
            to="publish-api"
            text="Publish API"
          />
        </SidebarGroup>

        <SidebarDivider />

        {/* Tools Group */}
        <SidebarGroup label="Tools" icon={<BuildIcon />}>
          <SidebarItem icon={AppsIcon} to="app-catalog" text="App Catalog" />
          <SidebarItem
            icon={DescriptionIcon}
            to="app-templates"
            text="App Templates"
          />
          <SidebarItem icon={AndroidIcon} to="dev-agents" text="Dev Agents" />
          <SidebarItem
            icon={ShowChartIcon}
            to="observability"
            text="Observability"
          />
        </SidebarGroup>

        <SidebarDivider />

        {/* Resources Group */}
        <SidebarGroup label="Resources" icon={<FolderIcon />}>
          <SidebarItem icon={MenuBookIcon} to="reference" text="Reference" />
          <SidebarItem icon={GavelIcon} to="standards" text="Standards" />
        </SidebarGroup>

        <SidebarSpace />
        <SidebarDivider />
        <SidebarToggle />
      </Sidebar>
      <div className={classes.mainContent}>
        <CommonHeader />
        <div className={classes.contentArea}>
          {children}
        </div>
      </div>
    </SidebarPage>
  );
};

export default Layout;
