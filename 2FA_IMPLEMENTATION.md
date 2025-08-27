# 2FA Authentication Implementation

This document describes the implementation of 2FA (Two-Factor Authentication) support for the homebridge-miot plugin.

## Overview

The 2FA authentication feature allows users to authenticate with Xiaomi Mi Cloud when their account requires two-factor authentication. Instead of failing with an error, the plugin now provides a way to complete the authentication process through the web interface.

## How it works

### 1. Initial Authentication Attempt
When a user tries to discover devices using their Mi Cloud credentials and 2FA is required:
- The system detects the 2FA requirement during login step 2
- A `TwoFactorRequired` error is thrown with the 2FA notification URL
- The web interface displays the 2FA link and shows an input field for the authenticated URL

### 2. 2FA Process
1. User clicks the 2FA link, which opens in a new browser tab
2. User completes the 2FA verification (email, SMS, etc.)
3. After successful verification, the browser is redirected to a URL starting with `https://sts.api.io.mi.com/sts`
4. User copies this final URL and pastes it into the input field
5. User clicks "Authenticate with 2FA URL"

### 3. Authentication with 2FA URL
- The system extracts authentication parameters from the STS URL
- These parameters include `auth`, `_ssign`, `d` (device ID), and other tokens
- A new login method `loginWith2FA()` is used to authenticate using these parameters
- Upon successful authentication, devices are discovered normally

## Technical Implementation

### Files Modified

1. **`lib/protocol/MiCloud.js`**
   - Added `loginWith2FA(authenticatedUrl)` method
   - Added `_extractAuthParamsFromUrl()` and `_extractStsParams()` for URL parsing
   - Added `_followStsUrlForToken()` for robust serviceToken extraction (replaces `_loginStep3WithAuthParams()`)
   - Enhanced debug logging in `_loginStep2()` 
   - Improved cookie management with additional timezone and locale cookies
   - Added fallback serviceToken generation for edge cases

2. **`homebridge-ui/server.js`**
   - Added `/authenticate-2fa` endpoint
   - Added `authenticate2FA()` method to handle 2FA authentication requests

3. **`homebridge-ui/public/index.html`**
   - Added 2FA input form with detailed instructions
   - Added JavaScript handler for 2FA authentication
   - Enhanced user interface with better instructions and comprehensive error messages

### Key Methods

#### `MiCloud.loginWith2FA(authenticatedUrl)`
Main method for authenticating with a 2FA URL. Extracts authentication parameters and completes the login process using the new robust STS URL handling.

#### `MiCloud._followStsUrlForToken(stsUrl)`
Robustly follows the STS URL to extract serviceToken from:
- Set-Cookie headers
- Response body JavaScript redirects  
- URL parameters
- Fallback generation from auth parameters

#### `MiCloud._extractAuthParamsFromUrl(authenticatedUrl)`
Determines if the URL is a valid STS URL and extracts authentication parameters.

#### `MiCloud._extractStsParams(stsUrl)`
Parses the STS URL query parameters and extracts:
- `auth`: Authentication token
- `_ssign`: Security signature (converted to hex format for ssecurity)
- `d`: Device/User identifier
- `ticket`: Ticket number

## URL Format

The authenticated URL should look like:
```
https://sts.api.io.mi.com/sts?d=wb_e12d0ffe-c95c-41ab-917e-9c91adc818a9&ticket=0&pwd=1&p_ts=1756291338004&fid=0&p_lm=1&auth=sLi2yNazzZ8okLhJwToSLFMElvjDTyenM%2FHPZTtR8IVbS6%2Frd7DYswLgBIdaaHNNAUdcQYfizQRpL1XnSgE3miP8IdV%2Fe6jz1pCCpuex916ff3dxRkwNWPgA%2B4epUpAQMdzWx5YG%2BcOeDQ%2B%2BB23ruDjJEvMLEYrGjytHQ0dYqDg%3D&m=9&_group=DEFAULT&tsl=0&p_ca=0&p_ur=SG&p_idc=Singapore&nonce=Bu6vs225LjMBvqXi&_ssign=dGMGZrtylHde1XrG5QoMcEjVGjc%3D
```

## User Instructions

1. Navigate to the homebridge plugin configuration page
2. Go to "Discover all devices via MiCloud" section
3. Enter your Mi Cloud username and password
4. Click "Discover All Devices"
5. If 2FA is required:
   - Click the red "2FA required" button that appears
   - Complete the 2FA process in the opened browser tab
   - Copy the final URL from the browser address bar (starts with https://sts.api.io.mi.com/sts)
   - Paste it into the "Enter the authenticated URL" field
   - Click "Authenticate with 2FA URL"
6. Your devices should now be discovered and listed

## Error Handling

The implementation includes comprehensive error handling:
- Invalid URL format detection
- Missing authentication parameters
- Network request failures
- Authentication failures
- Clear error messages for users

## Security Considerations

- The authenticated URL contains sensitive authentication tokens
- These tokens are temporary and expire after use
- The URL should not be shared or reused
- All authentication is performed server-side

## Testing

The URL extraction logic has been tested with real examples to ensure proper parameter extraction and validation.
