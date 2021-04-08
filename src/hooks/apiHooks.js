/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { baseUrl } from '../utils/variables';

// general function for fetching (options default value is empty object)
const doFetch = async (url, options = {}) => {
  const response = await fetch(url, options);
  const json = await response.json();
  if (json.error) {
    // if API response contains error message (use Postman to get further details)
    throw new Error(json.message + ': ' + json.error);
  } else if (!response.ok) {
    // if API response does not contain error message, but there is some other error
    throw new Error('doFetch failed');
  } else {
    // if all goes well
    return json;
  }
};

// set update to true, if you want to use getMedia automagically
const useMedia = (update = false) => {
  const [picArray, setPicArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (update) {
      try {
        getMedia();
      } catch (e) {
        alert(e.message);
      }
    }
  }, []);

  const getMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch(baseUrl + 'media');
      const files = await response.json();
      // console.log(files);

      const media = await Promise.all(files.map(async (item) => {
        const resp = await fetch(baseUrl + 'media/' + item.file_id);
        return resp.json();
      }));
      setPicArray(media);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const postMedia = async (fd, token) => {
    setLoading(true);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'x-access-token': token,
      },
      body: fd,
    };
    try {
      const response = await doFetch(baseUrl + 'media', fetchOptions);
      return response;
    } catch (e) {
      throw new Error('upload failed');
    } finally {
      setLoading(false);
    }
  };
  return { getMedia, postMedia, loading, picArray };
};

const useUsers = () => {
  const register = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'users', fetchOptions);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUserAvailable = async (username) => {
    try {
      const response = await doFetch(baseUrl + 'users/username/' + username);
      return response.available;
    } catch (e) {
      alert(e.message);
    }
  };

  const getUser = async (token) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'x-access-token': token,
      },
    };
    try {
      const response = await doFetch(baseUrl + 'users/user', fetchOptions);
      return response;
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return { register, getUserAvailable, getUser };
};

const useLogin = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    try {
      const response = await doFetch(baseUrl + 'login', fetchOptions);
      return response;
    } catch (e) {
      alert(e.message);
    }
  };

  return { postLogin };
};


export { useMedia, useUsers, useLogin };
