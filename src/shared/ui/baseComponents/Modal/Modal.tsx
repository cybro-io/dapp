'use client';

import React from 'react';

import {
  Modal as NextUIModal,
  ModalProps as NextUIModalProps,
  ModalBodyProps,
  ModalHeaderProps,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@nextui-org/modal';
import clsx from 'clsx';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { IconButton, Text, TextView } from '@/shared/ui';

type ModalProps = Pick<
  NextUIModalProps,
  'children' | 'shouldBlockScroll' | 'hideCloseButton' | 'scrollBehavior' | 'onClose'
>;

export const Modal = ({ children, ...restProps }: ModalProps) => {
  return (
    <NextUIModal
      defaultOpen={true}
      closeButton={<IconButton icon={<CloseIcon />} />}
      classNames={{
        backdrop: 'bg-transparent',
        wrapper: 'backdrop-blur-[32px] bg-background-bgBlur',
        base: 'rounded-b-none rounded-t-[30px] md:rounded-[30px] bg-background-modal max-w-[375px]',
        closeButton: 'p-0 right-6 top-6',
      }}
      {...restProps}
    >
      <ModalContent className="!m-0 gap-4">{children}</ModalContent>
    </NextUIModal>
  );
};

const Header = ({ children, className, ...restProps }: ModalHeaderProps) => {
  return (
    <ModalHeader className={clsx('px-6 pt-6 pb-0 justify-center', className)} {...restProps}>
      <Text
        textView={TextView.H4}
        className="flex-1 text-center !heading-[44px] max-w-[255px] whitespace-pre-wrap"
      >
        {children}
      </Text>
    </ModalHeader>
  );
};

const Body = ({ children, className, ...restProps }: ModalBodyProps) => (
  <ModalBody className={clsx('p-0 px-6 pb-6', className)} {...restProps}>
    {children}
  </ModalBody>
);

Modal.Header = Header;
Modal.Body = Body;
