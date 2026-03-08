import { makeStyles, Box, Typography, Avatar } from '@material-ui/core';
import { useApi, identityApiRef } from '@backstage/core-plugin-api';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getPageConfig } from './pageConfig';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 3),
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    minHeight: 64,
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
  subtitle: {
    fontSize: '0.875rem',
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(0.5),
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1.5),
    cursor: 'pointer',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.shape.borderRadius,
    transition: 'background-color 0.2s',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  userName: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: theme.palette.text.primary,
  },
  userRole: {
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: 36,
    height: 36,
    backgroundColor: theme.palette.primary.main,
  },
}));

interface UserProfile {
  displayName: string;
  email?: string;
}

export const CommonHeader = () => {
  const classes = useStyles();
  const location = useLocation();
  const navigate = useNavigate();
  const identityApi = useApi(identityApiRef);
  const [profile, setProfile] = useState<UserProfile>({ displayName: 'Guest' });

  const pageConfig = getPageConfig(location.pathname);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileInfo = await identityApi.getProfileInfo();
        setProfile({
          displayName: profileInfo.displayName || 'Guest',
          email: profileInfo.email,
        });
      } catch {
        setProfile({ displayName: 'Guest' });
      }
    };
    fetchProfile();
  }, [identityApi]);

  const handleUserClick = () => {
    navigate('/settings');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.titleSection}>
        <Typography className={classes.title}>{pageConfig.title}</Typography>
        <Typography className={classes.subtitle}>{pageConfig.subtitle}</Typography>
      </Box>
      <Box className={classes.userSection} onClick={handleUserClick}>
        <Box className={classes.userInfo}>
          <Typography className={classes.userName}>{profile.displayName}</Typography>
          {profile.email && (
            <Typography className={classes.userRole}>{profile.email}</Typography>
          )}
        </Box>
        <Avatar className={classes.avatar}>
          {getInitials(profile.displayName)}
        </Avatar>
      </Box>
    </Box>
  );
};
