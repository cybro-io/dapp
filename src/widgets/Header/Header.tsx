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
  Tooltip,
} from '@nextui-org/react';
import { useDisconnect, useWeb3ModalAccount } from '@web3modal/ethers5/react';
import clsx from 'clsx';
import Image from 'next/image';

import { ConnectWallet } from '@/features/ConnectWallet';
import CloseIcon from '@/shared/assets/icons/close.svg';
import MenuIcon from '@/shared/assets/icons/menu.svg';
import TetherIcon from '@/shared/assets/icons/tetherTron.svg';
import { ComponentWithProps } from '@/shared/types';
import {
  Button,
  ButtonSize,
  ButtonView,
  Logo,
  MenuLink,
  Socials,
  Text,
  TextView,
} from '@/shared/ui';
import { shortenWalletAddress } from '@/shared/utils';

import styles from './Header.module.scss';

type HeaderProps = {};

export const Header: ComponentWithProps<HeaderProps> = ({ className }) => {
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useWeb3ModalAccount();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {
      title: 'Vaults',
      href: '/',
    },
    {
      title: 'One-click',
      href: '/one-click',
      isComingSoon: true,
    },
    {
      title: 'Dashboard',
      href: '/2',
      isDisabled: true,
    },
    {
      title: 'Exchange',
      href: '/exchange',
    },
    {
      title: 'Cybro Points',
      href: '/5',
      isDisabled: true,
    },
  ];

  return (
    <Navbar className={clsx(styles.navbar, className)} onMenuOpenChange={setIsMenuOpen}>
      <div className={styles.menuContainer}>
        <NavbarContent className={styles.leftContainer}>
          <NavbarMenuToggle
            icon={isMenuOpen ? CloseIcon : MenuIcon}
            className={clsx(styles.burgerButton, isMenuOpen && styles.menuOpened, 'text-default')}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          />
          <NavbarBrand>
            <Logo className={styles.logo} />
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className={styles.desktopMenu}>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={item.title}>
              <MenuLink
                href={item.href}
                isDisabled={item.isDisabled}
                isComingSoon={item.isComingSoon}
              >
                {item.title}
              </MenuLink>
            </NavbarMenuItem>
          ))}
        </NavbarContent>
      </div>

      <NavbarContent justify="end">
        {/*<NavbarItem className={styles.languageDropdown}>*/}
        {/*  <LanguageChange />*/}
        {/*</NavbarItem>*/}
        {/*<NavbarItem className={styles.darkModeSwitch}>*/}
        {/*  <DarkModeSwitch />*/}
        {/*</NavbarItem>*/}
        <NavbarItem>
          <ConnectWallet
            className={styles.connectWallet}
            buttonSize={ButtonSize.Small}
            whenConnectedComponent={
              <Tooltip
                className={styles.tooltipContainer}
                content={
                  <Button
                    view={ButtonView.Primary}
                    size={ButtonSize.Small}
                    onClick={() => disconnect()}
                  >
                    Disconnect
                  </Button>
                }
              >
                <div className={styles.connectedWalletContainer}>
                  <div className={styles.avatarContainer}>
                    <Image src={'/avatar.webp'} height={20} width={20} alt={'avatar'} />
                    {/*<TetherIcon />*/}
                  </div>
                  <Text textView={TextView.C3} className={styles.connectedWallet}>
                    {shortenWalletAddress(address)}
                  </Text>
                </div>
              </Tooltip>
            }
          />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className={clsx(styles.mobileMenu)}>
        <div className={styles.mobileMenuTop}>
          {menuItems.map((item, index) => (
            <NavbarMenuItem className={styles.mobileMenuList} key={item.title}>
              <MenuLink
                className={styles.menuLinkMobile}
                href={item.href}
                isDisabled={item.isDisabled}
                isComingSoon={item.isComingSoon}
              >
                {item.title}
              </MenuLink>
            </NavbarMenuItem>
          ))}
          <Socials />
          <Button view={ButtonView.Primary} onClick={() => disconnect()}>
            Disconnect
          </Button>
        </div>
        {/*<div className={styles.mobileMenuBottom}>*/}
        {/*  <Button onClick={() => disconnect()}>Disconnect</Button>*/}
        {/*  /!*<DarkModeSwitch />*!/*/}
        {/*  /!*<LanguageChange />*!/*/}
        {/*</div>*/}
      </NavbarMenu>
    </Navbar>
  );
};
