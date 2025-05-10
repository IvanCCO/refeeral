'use client';

import { useEffect, useRef } from 'react';

export interface Affiliate {
  name: string;
  email: string;
  linkId: string;
}

interface ReferralTrackingProps {
  referralCode: string | null;
  onAffiliateLoad?: (affiliate: Affiliate | null) => void;
}

export const ReferralTracking = ({
  referralCode,
  onAffiliateLoad,
}: ReferralTrackingProps) => {
  const hasTrackedRef = useRef<boolean>(false);

  useEffect(() => {
    if (referralCode && !hasTrackedRef.current && onAffiliateLoad) {
      hasTrackedRef.current = true;

      trackReferralVisit(referralCode)
        .then((affiliate) => {
          onAffiliateLoad(affiliate);
        })
        .catch((error) => {
          console.error('Error tracking visit:', error);
          onAffiliateLoad(null);
        });
    }
  }, [referralCode, onAffiliateLoad]);

  return null;
};

const trackReferralVisit = async (
  referralCode: string
): Promise<Affiliate | null> => {
  try {
    const response = await fetch(
      `/api/track-referral?code=${encodeURIComponent(referralCode)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to track referral visit');
      return null;
    }

    const data = await response.json();
    return data.affiliate;
  } catch (error) {
    console.error('Error tracking referral visit:', error);
    return null;
  }
};
