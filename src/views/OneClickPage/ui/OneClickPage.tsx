'use client';

import React, { createRef, RefObject } from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';

import { useToast } from '@/shared/hooks';
import {
  ComponentWithProps,
  useAddToWaitlistApiV1WaitlistSignupPost,
  useCaptchaApiV1WaitlistCaptchaGet,
} from '@/shared/types';
import { Button, ButtonSize, Text, TextView, ToastType } from '@/shared/ui';

import styles from './OneClickPage.module.scss';

type OneClickPageProps = {};

type FormValues = {
  email: string;
};

export const OneClickPage: ComponentWithProps<OneClickPageProps> = ({ className }) => {
  const { triggerToast } = useToast();
  const { data, isLoading } = useCaptchaApiV1WaitlistCaptchaGet();
  const { mutate, isPending } = useAddToWaitlistApiV1WaitlistSignupPost();
  const capchaRef: RefObject<ReCAPTCHA> = createRef();

  const capchaKey = data?.data?.data?.sitekey;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormValues>({
    mode: 'onBlur',
  });

  const onSubmit = React.useCallback(async (formData: FormValues) => {
    try {
      const token = await capchaRef?.current?.executeAsync();
      const email = formData?.email;

      if (!token) {
        throw new Error('Captcha token failed.');
      }

      await mutate({
        data: {
          captcha_answer: token,
          email,
        },
      });

      triggerToast({ message: 'Success', description: 'You have been added to waitlist' });
    } catch (e) {
      console.log(e, 'error');
      triggerToast({
        message: 'Error',
        description: 'Unexpected error. Contact support',
        type: ToastType.Error,
      });
    }
  }, []);

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.left}>
        <Text className={styles.title} textView={TextView.H2}>
          <span className={styles.accent}>One-Click</span> Investing
        </Text>
        <div className={styles.imageContainerMobile}>
          <Image src={'/oneClickBg.png'} alt={''} height={264} width={375} />
        </div>
        <Text className={styles.subtitle} textView={TextView.H3}>
          Coming&nbsp;Soon This&nbsp;Year
        </Text>
        <Text className={styles.description} textView={TextView.P2}>
          Get hyped for our upcoming One-Click Investing feature! We're cooking up some awesome,
          user-friendly strategies to help you invest in our Pools and Vaults like a pro.
        </Text>
        <Text className={styles.joinUs}>
          <span className={styles.accent}>Join our waiting list now </span>
          and be the first to know when we launch. Just drop your email below, and we'll give you a
          heads up when it's go-time.
        </Text>
      </div>
      <div className={styles.right}>
        <div className={styles.imageContainerDesktop}>
          <Image src={'/oneClickBgDesktop.png'} alt={''} height={530} width={620} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <input
            className={styles.input}
            placeholder="Your email here"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Enter a valid email address',
              },
            })}
          />
          <Button
            className={styles.submitButton}
            size={ButtonSize.Large}
            type="submit"
            disabled={!isValid || isLoading || isSubmitting}
          >
            Count me in
          </Button>
        </form>
        <Text className={styles.caption} textView={TextView.C3}>
          <span className={styles.bold}>No spam.</span> Only updates and release announcements.
        </Text>
      </div>
      {capchaKey && <ReCAPTCHA ref={capchaRef} size="invisible" sitekey={capchaKey} />}
    </section>
  );
};
