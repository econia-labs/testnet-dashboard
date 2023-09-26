import { Jost, Roboto_Mono } from 'next/font/google'

export const mono = Roboto_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
})

export const jost = Jost({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-jost',
})