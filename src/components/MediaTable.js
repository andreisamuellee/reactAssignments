import React from 'react';
import MediaRow from './MediaRow';
import { useAllMedia } from '../hooks/apiHooks';

export default function MediaTable() {
  const picArray = useAllMedia();

  return (
    <table>
      <tbody>
        {
          picArray.map((item, index) => (<MediaRow key={index} file={item} />))
        }
      </tbody>
    </table>
  )
}

