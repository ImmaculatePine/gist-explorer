let config = {
  apiHost: ''
};

if (process.env.NODE_ENV === 'production') {
  config['apiHost'] = '';
} else {
  config['apiHost'] = 'http://localhost:3000';
}

export default config;
