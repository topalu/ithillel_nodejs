

export const LOCAL_ENV = 'local'
export const PROD_ENV  = 'prod';

export function isEnv (envStr){
    return [LOCAL_ENV, PROD_ENV].includes(envStr)
}