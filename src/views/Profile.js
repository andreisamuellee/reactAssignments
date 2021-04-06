import { useContext } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import {
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon, ListItemText,
  Typography,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import BackButton from '../components/BackButton';

const Profile = () => {
  const [user] = useContext(MediaContext);

  return (
    <>
      <BackButton />
      <Typography
        component="h1"
        variant="h2"
        gutterBottom>Profile</Typography>
      {user &&
        <Card>
          <CardContent>
            <List>
              <ListItem>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
                <ListItemText primary={user.username} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <EmailIcon />
                </ListItemIcon>
                <ListItemText primary={user.email} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={user.full_name} />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      }
    </>
  );
};

export default Profile;
