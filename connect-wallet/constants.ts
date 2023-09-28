export const WALLET_HOMEPAGE: { [key: string]: string } = {
    petra: 'https://petra.app/',
    pontem: 'https://pontem.network/',
    martian: 'https://martianwallet.xyz/',
    fewcha: 'https://fewcha.app/',
    rise: 'https://risewallet.io/'
}

export const getWalletHomePageUrl = (name: string) => {
    return WALLET_HOMEPAGE[name.trim().toLowerCase()]
}