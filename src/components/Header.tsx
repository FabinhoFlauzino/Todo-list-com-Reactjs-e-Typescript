import style from './Header.module.css'

import imgLogo from '../image/logo.png'

export function Header() {
  return (
    <header className={style.header}>
      <img src={imgLogo} alt="Logo" />
    </header>
  )
}