

export const LOCAL_ENV = 'local'
export const PROD_ENV  = 'prod';
export const DEV_ENV  = 'dev';

export function isEnv (envStr){
    return [LOCAL_ENV, PROD_ENV, DEV_ENV].includes(envStr)
}
