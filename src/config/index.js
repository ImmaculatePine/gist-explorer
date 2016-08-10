let config = {
  apiHost: ''
};

if (process.env.NODE_ENV === 'production') {
  config['apiHost'] = 'http://api.gist-explorer.whoindie.com';
} else {
  config['apiHost'] = 'http://api.lvh.me:3000';
}

export default config;
