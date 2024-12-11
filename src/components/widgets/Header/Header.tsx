import { NavLink } from 'react-router-dom'
import cn from 'clsx'

import styles from './Header.module.scss'
import Logo from '@/app/assets/icons/Logo.svg?react'
import ProfileIcon from '@/app/assets/icons/Profile.svg?react'

export const Header = () => {
  return (
    <header className={styles.header}>
      <NavLink to={'/'}>
        <Logo className={styles.header__logo} />
      </NavLink>

      <nav className={styles.header__nav}>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            cn(styles['header__nav-item'], {
              [styles['header__nav-item_active']]: isActive,
            })
          }
        >
          Главная
        </NavLink>

        <NavLink
          to={'/orders'}
          className={({ isActive }) =>
            cn(styles['header__nav-item'], {
              [styles['header__nav-item_active']]: isActive,
            })
          }
        >
          Заказы
        </NavLink>
        <NavLink
          to={'/messenger'}
          className={({ isActive }) =>
            cn(styles['header__nav-item'], {
              [styles['header__nav-item_active']]: isActive,
            })
          }
        >
          Мессенджер
        </NavLink>
      </nav>
      <NavLink
        to={'/profile'}
        className={({ isActive }) =>
          cn(styles['header__profile'], {
            [styles['header__profile_active']]: isActive,
          })
        }
      >
        <ProfileIcon />
      </NavLink>
    </header>
  )
}
