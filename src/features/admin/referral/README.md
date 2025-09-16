# Admin Referral System Integration

## Overview

This module provides admin functionality to view referral system statistics on the badges management page.

## Files Structure

```
src/features/admin/referral/
├── components/
│   ├── ReferralStatsCard.tsx    # Main stats display component
│   └── index.ts                 # Component exports
├── hooks/
│   ├── useGetReferralStats.ts   # React Query hook for fetching stats
│   └── index.ts                 # Hook exports
├── services/
│   ├── api.ts                   # API service functions
│   └── index.ts                 # Service exports
├── referral.types.ts            # TypeScript type definitions
└── README.md                    # This file
```

## API Endpoint

- **GET** `/api/referral/admin/stats`
- **Authentication**: Admin required
- **Response**: Referral statistics including total referrals, admin code signups, and bonus payments

## Usage

The referral statistics are automatically displayed on the admin badges page (`/admin/badges`) as a card component above the badge management sections.

## Features

- Real-time referral statistics
- Bonus breakdown (signup vs purchase bonuses)
- Performance metrics
- Responsive design
- Error handling and loading states
