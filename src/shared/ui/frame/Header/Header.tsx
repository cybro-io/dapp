'use client';

import React from 'react';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react';
import clsx from 'clsx';

import MenuIcon from '@/shared/assets/icons/menu.svg';
import { ComponentWithProps } from '@/shared/types';
import { Button, ButtonSize, DarkModeSwitch, LanguageChange, Logo, MenuLink } from '@/shared/ui';

import styles from './Header.module.scss';

type HeaderProps = {};

export const Header: ComponentWithProps<HeaderProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      title: 'Vaults',
      href: '/',
    },
    {
      title: 'Dashboard',
      href: '/2',
    },
    {
      title: 'Staking',
      href: '/3',
    },
    {
      title: 'Exchange',
      href: '/4',
    },
    {
      title: 'Cybro Points',
      href: '/5',
    },
  ];

  return (
    <header className={clsx(styles.root, className)}>
      <Navbar className={clsx(styles.navbar)} onMenuOpenChange={setIsMenuOpen}>
        <div className={styles.menuContainer}>
          <NavbarContent className={styles.leftContainer}>
            <NavbarMenuToggle
              icon={MenuIcon}
              className={clsx(styles.burgerButton, isMenuOpen && styles.menuOpened, 'text-default')}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            />
            <NavbarBrand>
              <Logo className={styles.logo} />
            </NavbarBrand>
          </NavbarContent>

          <NavbarContent className={styles.desktopMenu}>
            {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item.title}-${index}`}>
                <MenuLink href={item.href}>{item.title}</MenuLink>
              </NavbarMenuItem>
            ))}
          </NavbarContent>
        </div>

        <NavbarContent justify="end">
          <NavbarItem className={styles.languageDropdown}>
            <LanguageChange />
          </NavbarItem>
          <NavbarItem className={styles.darkModeSwitch}>
            <DarkModeSwitch />
          </NavbarItem>
          <NavbarItem>
            <Button size={ButtonSize.Small}>Connect Wallet</Button>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.title}-${index}`}>
              <MenuLink href={item.href}>{item.title}</MenuLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </header>
  );
};
