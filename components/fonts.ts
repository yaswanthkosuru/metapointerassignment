import { Inter, PT_Serif, PT_Sans, Ubuntu, Roboto, Prompt, Poppins, Noto_Sans, Roboto_Slab, Open_Sans, Merriweather, Playfair_Display, Lato, Montserrat, Libre_Baskerville, Lora, Alegreya } from 'next/font/google'

// define your variable fonts
export const lora = Lora({
    weight: '400',
    subsets: ['latin']
})
export const alegreya = Alegreya({
    weight: '400',
    subsets: ['latin']
})
const ptsans = PT_Sans(
    {
        weight: '700',
        subsets: ['latin']
    }
)
export const montsterrat = Montserrat(
    {
        weight: '400',
        subsets: ['latin']
    }
)
export const playfairdisplay = Playfair_Display(
    {
        weight: '400',
        subsets: ['latin']
    }
)
export const lato = Lato(
    {
        weight: '400',
        subsets: ['latin']
    }
)

const opensans = Open_Sans(
    {
        weight: '700',
        subsets: ['latin']
    }
)
const merriweather = Merriweather(
    {
        weight: '400',
        subsets: ['latin']
    }
)
const poppins = Noto_Sans(
    {
        weight: '600',
        subsets: ['latin',],
    }
)
const prompt = Prompt(
    {
        subsets: ['latin-ext'],
        weight: ['600']

    }
)
const inter = Inter(
    {
        subsets: ['latin'],
        weight: '400',
    }
)
const roboto = Roboto(
    {
        subsets: ['latin'],
        weight: ['400'],
    }
)
const ubuntu = Ubuntu(
    {
        subsets: ['greek'],
        weight: ['400'],
    }
)
const ptserif = PT_Serif(
    {
        subsets: ['latin'],
        weight: ['400', '700'],
    }
)
const robotoslab = Roboto_Slab(
    {
        subsets: ['latin'],
        weight: ['400'],
    }
)
export const librebaskerville = Libre_Baskerville(
    {
        weight: ['400'],
        subsets: ['latin']
    }
)
export { inter, ubuntu, ptserif, roboto, prompt, poppins, robotoslab, opensans, merriweather, ptsans }