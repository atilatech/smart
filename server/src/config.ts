// this file is auto-generated each time scripts/deploy.js is run
import configChains from './config-chains.json';
import { Chain } from './models/Chain';


export const ALL_CONFIG_CHAINS: {[key: string]: Chain} =  (configChains as any);

delete ALL_CONFIG_CHAINS.localhost;
export let CONFIG_CHAINS: {[key: string]: Chain} = {};

Object.values(ALL_CONFIG_CHAINS)
.forEach(chain => {
    CONFIG_CHAINS[chain.CHAIN_ID] = chain;
})

export const REACT_APP_MORALIS_SERVER_URL = process.env.REACT_APP_MORALIS_SERVER_URL;
export const REACT_APP_MORALIS_APP_ID = process.env.REACT_APP_MORALIS_APP_ID;

export const MORALIS_SUPPORTED_CHAINS = ["4", "80001", "97", "56", "137"];
