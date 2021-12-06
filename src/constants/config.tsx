

const optionsEndPoint = {
  version: 'v1',
  port: 80,
}
const name = process.env.APP_TITLE;
const serverEndPoint = process.env.END_POINT;
const urlPro = process.env.APP_URL;
const isProduction = process.env.NODE_ENV === "production"
const endpoint = isProduction ? `${serverEndPoint}/wp-json/wp/${optionsEndPoint.version}` : `${process.env.LOCAL_END_POINT}/wp-json/wp/${optionsEndPoint.version}`;
const urlHome = isProduction ? `${serverEndPoint}` : `${process.env.LOCAL_END_POINT}`;
const server_socket = isProduction ? `${urlPro}` : `${process.env.LOCAL_SERVER_SOCKET}`;
const platform = "website";
const wpJson = `${urlHome}/wp-json`

export default {
  endpoint,
  urlHome,
  name,
  platform,
  logo: "",
  phone: '',
  address: "",
  socialMedia: {
    facebook: `https://www.facebook.com/${name}`,
    twitter: `https://twitter.com/${name}`,
    googlePlus: `https://plus.google.com/${name}`,
    yelp: `http://yelp.com/biz/${name}`,
    instagram: `http://instagram.com/${name}`
  },
  url: {
    home: `${urlHome}`,
    wpJson: `${wpJson}`,
    auth: {
      login: `${wpJson}/wp/v2/token`,
      refresh: `${wpJson}/wp/v2/token/refresh`,
      revoke: `${wpJson}/wp/v2/token/revoke`,
    }
  }
}