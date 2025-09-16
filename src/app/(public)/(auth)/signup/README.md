# Signup Form with Referral Code Integration

## Overview

The signup form has been updated to include a mandatory referral code field as part of the user registration process.

## Changes Made

### 1. Type Updates

- **`SignupData`** type now includes `referralCode: string`
- **API helper** updated to include referral code in signup request

### 2. Form Validation

- Added Yup validation for referral code:
  - Required field
  - Minimum 3 characters
  - Maximum 20 characters
  - Auto-converts to uppercase

### 3. UI Enhancements

- **Referral Code Field**: Added between password and terms sections
- **Visual Indicators**: Gift icon and proper styling
- **Help Text**: Clear instructions for users
- **Public Code Helper**: Shows FLYVERR2024 as fallback option
- **Copy Functionality**: One-click copy for public referral code
- **Benefits Section**: Added referral rewards information

### 4. User Experience

- **Auto-uppercase**: Referral codes are automatically converted to uppercase
- **Visual Feedback**: Copy button shows "Copied!" confirmation
- **Clear Instructions**: Multiple help texts guide users
- **Fallback Option**: Public code provided for users without referrers

## Form Structure

```
1. First Name (required)
2. Last Name (required)
3. Username (required)
4. Email (required)
5. Password (required)
6. Referral Code (required) ← NEW
7. Terms & Conditions
8. Submit Button
```

## Validation Rules

- **Referral Code**: 3-20 characters, required, auto-uppercase
- **All existing validations** remain unchanged

## API Integration

- Sends referral code to `/api/auth/signup` endpoint
- Backend validates referral code and processes referral bonuses
- Error handling for invalid referral codes

## User Flow

1. User visits signup page
2. Sees referral code requirement notice
3. Enters referral code (or uses public code FLYVERR2024)
4. Completes other required fields
5. Submits form
6. Backend validates referral code and creates account
7. Referrer receives bonus if valid user code used
