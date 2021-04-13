import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';
import { Link as RouterLink } from 'react-router-dom';
import { GridListTileBar, IconButton, makeStyles } from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MediaRow = ({ file }) => {
  const classes = useStyles();

  let desc = {}; // jos kuva tallennettu ennen week4C, description ei ole JSONia
  try {
    desc = JSON.parse(file.description);
    console.log(desc);
  } catch (e) {
    desc = { description: file.description };
  }

  return (
    <>
      <img
        src={uploadsUrl + file.thumbnails?.w320}
        alt={file.title}
        style={{
          filter: `
            brightness(${desc.filters?.brightness}%)
            contrast(${desc.filters?.contrast}%)
            saturate(${desc.filters?.saturate}%)
            sepia(${desc.filters?.sepia}%)
            `,
        }}
      />
      <GridListTileBar
        title={file.title}
        subtitle={desc.description}
        actionIcon={
          <>
            <IconButton
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={
                {
                  pathname: '/single',
                  state: file,
                }
              }
              className={classes.icon}
            >
              <PageviewIcon fontSize="large" />
            </IconButton>
          </>
        }
      />
    </>
  );
};

MediaRow.propTypes = {
  file: PropTypes.object,
};

export default MediaRow;
