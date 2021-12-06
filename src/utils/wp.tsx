import WPAPI from 'wpapi'
import config from '../constants/config';


const wp = new WPAPI({ endpoint: config.url.wpJson });


export default wp;
export { wp };