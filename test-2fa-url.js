const MiCloud = require('./lib/protocol/MiCloud');
const Logger = require('./lib/utils/Logger');

// Test the complete 2FA login flow
async function testComplete2FAFlow() {
  const afterUrl = 'https://sts.api.io.mi.com/sts?d=wb_e12d0ffe-c95c-41ab-917e-9c91adc818a9&ticket=0&pwd=1&p_ts=1756291338004&fid=0&p_lm=1&auth=sLi2yNazzZ8okLhJwToSLFMElvjDTyenM%2FHPZTtR8IVbS6%2Frd7DYswLgBIdaaHNNAUdcQYfizQRpL1XnSgE3miP8IdV%2Fe6jz1pCCpuex916ff3dxRkwNWPgA%2B4epUpAQMdzWx5YG%2BcOeDQ%2B%2BB23ruDjJEvMLEYrGjytHQ0dYqDg%3D&m=9&_group=DEFAULT&tsl=0&p_ca=0&p_ur=SG&p_idc=Singapore&nonce=Bu6vs225LjMBvqXi&_ssign=dGMGZrtylHde1XrG5QoMcEjVGjc%3D';
  
  const logger = new Logger();
  logger.setDeepDebugLogEnabled(true);
  
  const miCloud = new MiCloud(logger);
  
  console.log('Testing complete 2FA login flow...');
  
  try {
    await miCloud.loginWith2FA(afterUrl);
    console.log('✓ 2FA login successful!');
    console.log('ServiceToken:', miCloud.serviceToken ? miCloud.serviceToken.substring(0, 20) + '...' : 'Not found');
    console.log('UserId:', miCloud.userId);
    console.log('SSecurity:', miCloud.ssecurity ? miCloud.ssecurity.substring(0, 20) + '...' : 'Not found');
    
    // Test API call
    console.log('\nTesting API call...');
    miCloud.setCountry('sg'); // Set to Singapore since that's in your URL
    const devices = await miCloud.getDevices();
    console.log('✓ API call successful! Found', devices?.result?.list?.length || 0, 'devices');
    
  } catch (error) {
    console.error('✗ 2FA login failed:', error.message);
    console.error('Stack:', error.stack);
  }
}

// Test URL extraction with the example URLs provided
async function testUrlExtraction() {
  const beforeUrl = 'https://account.xiaomi.com/fe/service/identity/verifyEmail?mask=0&sid=xiaomiio&context=79k2kFMOZw9nM5KGewdWmdanhIUF9xgrsTpJrwLhe77WFRf7DVL5k-I2lnYf0ue5XkB1x4pZDAnxwHlmf7phErC6eir9Dy6TOQD9-XrzNuHcW_cOBvBNbhcAtVNqUkZX9hhcV8qHyyA9Dlp9QmjM3qNQmDFbXLSd__5GpjdeZ0EWEh9l7MWg4fxFWB63_yC_3dI6iwkNzuvFrB_UElxAujc3vYEms_Q0ulKBWUciXx7BrwJ2IQ0c_Ep1eOPBR7WncOsQPN8cF8sr4yQ3P_v-DyAYLP1F5Od9Scz1g3RGDh_Hpj6cstUGnEpWmfyVp480z-9DUVkbKUxdvQuRXN42V_hOXQ_Sc11W0o8uWww4tRBrgd6W0FJ0ScsHk_vSsyNUqTnCID_-9b2Q4GzdtswEU-6FJdT5KexeTTUiDV_VCfo9n8XWsELAIm-U7yM-nBc7tNxHnQEQmaB35LSTqmbsgAZQg2EBGXtQrBlP7C61_IDDDuKHmROFAsYnQBWxS2DKksL673GEzejRFVedo3TofbSjgzBx_NxXBJTdruKtDZ0awgJF-h99lNXrZ441_cqxW_uM3EnycFAlc-vhY48qmq04gs8xCcgfyrNsabyjtfLz5hpfMYjyTAFQ5i5wkgrR&_locale=en_NZ';

  const afterUrl = 'https://sts.api.io.mi.com/sts?d=wb_e12d0ffe-c95c-41ab-917e-9c91adc818a9&ticket=0&pwd=1&p_ts=1756291338004&fid=0&p_lm=1&auth=sLi2yNazzZ8okLhJwToSLFMElvjDTyenM%2FHPZTtR8IVbS6%2Frd7DYswLgBIdaaHNNAUdcQYfizQRpL1XnSgE3miP8IdV%2Fe6jz1pCCpuex916ff3dxRkwNWPgA%2B4epUpAQMdzWx5YG%2BcOeDQ%2B%2BB23ruDjJEvMLEYrGjytHQ0dYqDg%3D&m=9&_group=DEFAULT&tsl=0&p_ca=0&p_ur=SG&p_idc=Singapore&nonce=Bu6vs225LjMBvqXi&_ssign=dGMGZrtylHde1XrG5QoMcEjVGjc%3D';

  console.log('Testing URL extraction...');

  const miCloud = new MiCloud(new Logger());

  console.log('\n1. Testing BEFORE authentication URL (should fail):');
  const beforeParams = miCloud._extractAuthParamsFromUrl(beforeUrl);
  console.log('Result:', beforeParams);

  console.log('\n2. Testing AFTER authentication URL (should work):');
  const afterParams = miCloud._extractAuthParamsFromUrl(afterUrl);
  console.log('Result:', afterParams);
}

async function main() {
  console.log('=== URL Extraction Test ===');
  await testUrlExtraction();
  
  console.log('\n=== Note about Complete 2FA Flow Test ===');
  console.log('The complete 2FA flow test is disabled because the example URL is not a real authenticated URL.');
  console.log('To test the complete flow, replace the afterUrl variable with a fresh authenticated URL from your browser.');
  console.log('Uncomment the following lines to test with a real URL:');
  console.log('// console.log("\\n=== Complete 2FA Flow Test ===");');
  console.log('// await testComplete2FAFlow();');
  
  console.log('\nTest completed.');
}

main();
