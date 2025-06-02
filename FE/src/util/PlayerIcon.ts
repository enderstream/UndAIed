import icon1 from '@/assets/player-icon/player-icon-1.svg'
import icon2 from '@/assets/player-icon/player-icon-2.svg'
import icon3 from '@/assets/player-icon/player-icon-3.svg'
import icon4 from '@/assets/player-icon/player-icon-4.svg'
import icon5 from '@/assets/player-icon/player-icon-5.svg'
import icon6 from '@/assets/player-icon/player-icon-6.svg'
import icon7 from '@/assets/player-icon/player-icon-7.svg'
import icon8 from '@/assets/player-icon/player-icon-8.svg'

const icons = [icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8]

export const PlayerIcons = icons.map((src, i) => ({ id: i + 1, src }))

export const getPlayerIcon = (num: number) => icons[num - 1] || icons[0]