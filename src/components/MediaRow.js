import React from 'react'
import PropTypes from 'prop-types';
import { uploadsUrl } from '../utils/variables';

export default function MediaRow({ file }) {
  return (
    <tr>
      <td>
        <img src={uploadsUrl + file.thumbnails.w160} alt={file.title} />
      </td>
      <td>
        <h3>{file.title}</h3>
        <p>{file.description}</p>
      </td>
      <td>
        <a href={uploadsUrl + file.filename}>View</a>
      </td>
    </tr>
  )
}

MediaRow.propTypes = {
  file: PropTypes.object,
};
