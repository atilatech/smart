import configChains from './config-chains.json';
import { Chain } from './models/Chain';


export const ALL_CONFIG_CHAINS: {[key: string]: Chain} =  (configChains as any);

delete ALL_CONFIG_CHAINS.localhost;
export let CONFIG_CHAINS: {[key: string]: Chain} = {};

Object.values(ALL_CONFIG_CHAINS)
.forEach(chain => {
    CONFIG_CHAINS[chain.CHAIN_ID] = chain;
})

export const { REACT_APP_MORALIS_SERVER_URL, REACT_APP_MORALIS_APP_ID, REACT_APP_COVALENT_API_KEY} = process.env;