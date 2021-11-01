

import localConfig from '../localConfig'


const optionsEndPoint = { version: "v2" }
const name =  process.env.APP_TITLE
const urlPro = process.env.END_POINT
const endpoint = process.env.NODE_ENV === 'production' ? `${urlPro}/wp-json/wp/${optionsEndPoint.version}` 
  : `${localConfig.endpoint}/wp-json/wp/${optionsEndPoint.version}`
const urlHome = process.env.NODE_ENV === 'production' ? `${urlPro}` : `${localConfig.endpoint}`
const server_socket = process.env.NODE_ENV === 'production' ? `${urlPro}` : `${localConfig.serverSocket}`
const platform = "website"

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
 url:{
   
 }
}