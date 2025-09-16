# User Referral System Integration

## Overview

This module provides user functionality to manage referral codes, view referral statistics, and validate referral codes on the profile page.

## Files Structure

```
src/features/user/referral/
├── components/
│   ├── ReferralCodeCard.tsx      # Main referral code management component
│   └── index.ts                  # Component exports
├── hooks/
│   ├── useReferralStats.ts       # Hook for fetching user referral stats
│   ├── useGenerateReferralCode.ts # Hook for generating referral codes
│   ├── useValidateReferralCode.ts # Hook for validating referral codes
│   └── index.ts                  # Hook exports
├── services/
│   ├── api.ts                    # API service functions
│   └── index.ts                  # Service exports
├── referral.types.ts             # TypeScript type definitions
└── README.md                     # This file
```

## API Endpoints

- **GET** `/api/referral/stats` - Get user referral statistics
- **POST** `/api/referral/generate-code` - Generate a new referral code
- **POST** `/api/referral/validate` - Validate a referral code

## Features

### Referral Code Management

- **Generate Code**: Users can generate a referral code (requires Stripe onboarding)
- **Display Code**: Shows existing referral code with copy functionality
- **Copy to Clipboard**: One-click copy with visual feedback

### Referral Statistics

- **Total Referrals**: Number of users who signed up with your code
- **Total Earnings**: Total amount earned from referrals
- **Signup Bonuses**: Count of $1.00 signup bonuses earned
- **Purchase Bonuses**: Count of $4.00 first purchase bonuses earned

### Code Validation

- **Validate Any Code**: Users can validate any referral code
- **Real-time Feedback**: Shows if code is valid and provides description
- **Error Handling**: Clear error messages for invalid codes

### User Experience

- **Conditional Display**: Shows appropriate UI based on user state
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages
- **Responsive Design**: Works on all screen sizes

## Usage

The referral code card is automatically displayed on the user profile page (`/user/profile`) between the personal information and account information sections.

## Requirements

- Users must be Stripe onboarded to generate referral codes
- Users must be authenticated to access referral features
- All API calls include proper error handling and user feedback
