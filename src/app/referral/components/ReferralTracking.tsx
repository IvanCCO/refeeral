'use client';

import { useEffect } from 'react';

interface ReferralTrackingProps {
  referralCode: string | null;
}

export const ReferralTracking = ({ referralCode }: ReferralTrackingProps) => {
  useEffect(() => {
    if (referralCode) {
      trackReferralVisit(referralCode);
    }
  }, [referralCode]);

  return null; // This is a utility component that doesn't render anything
};

const trackReferralVisit = async (referralCode: string) => {
  try {
    const response = await fetch('/api/track-referral', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ referralCode }),
    });

    if (!response.ok) {
      console.error('Failed to track referral visit');
    }
  } catch (error) {
    console.error('Error tracking referral visit:', error);
  }
}; 