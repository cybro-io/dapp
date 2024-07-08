'use client';

import React, { createRef, RefObject } from 'react';

import { useWeb3ModalAccount } from '@web3modal/ethers/react';
import clsx from 'clsx';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { ConnectWallet } from '@/features/ConnectWallet';
import { useToast } from '@/shared/hooks';
import { ComponentWithProps, useCaptchaApiV1WaitlistCaptchaGet } from '@/shared/types';
import { Button, ToastType } from '@/shared/ui';

import { SupportRequestField, SupportRequestFormValues } from '../types';

import styles from './SupportRequest.module.scss';

type SupportRequestProps = {};

export const SupportRequest: ComponentWithProps<SupportRequestProps> = ({ className }) => {
  const { isConnected, address } = useWeb3ModalAccount();
  const { data, isLoading } = useCaptchaApiV1WaitlistCaptchaGet();
  const { triggerToast } = useToast();
  const capchaRef: RefObject<ReCAPTCHA> = createRef();

  const capchaKey = data?.data?.data?.sitekey;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SupportRequestFormValues>({
    mode: 'onBlur',
  });

  const onSubmit = React.useCallback(async (formData: SupportRequestFormValues) => {
    try {
      const token = await capchaRef?.current?.executeAsync();
      const email = formData?.email;

      if (!token) {
        throw new Error('Captcha token failed.');
      }

      triggerToast({ message: 'Success', description: 'Feedback have been sent!' });
    } catch (e) {
      triggerToast({
        message: 'Error',
        description: 'Unexpected error. Contact support',
        type: ToastType.Error,
      });
    }
  }, []);

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.emailContainer}>
        <label>Your email:</label>
        <input
          {...register(SupportRequestField.Email, {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Enter a valid email address',
            },
          })}
          type="email"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div className={styles.detailsContainer}>
        <label>Details:</label>
        <textarea
          {...register(SupportRequestField.Details, {
            required: 'This field is required',
            minLength: {
              value: 10,
              message: 'Details should be at least 10 characters long',
            },
          })}
        />
        {errors.details && <p className={styles.error}>{errors.details.message}</p>}
      </div>
      {!isConnected ? (
        <ConnectWallet className={styles.submitButton} />
      ) : (
        <Button
          className={styles.submitButton}
          disabled={!isValid || isLoading || isSubmitting}
          type="submit"
        >
          Send
        </Button>
      )}
      {capchaKey && <ReCAPTCHA ref={capchaRef} size="invisible" sitekey={capchaKey} />}
    </form>
  );
};
