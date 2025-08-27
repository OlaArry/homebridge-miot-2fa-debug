const MiCloud = require('./lib/protocol/MiCloud');
const Logger = require('./lib/utils/Logger');

// Test URL extraction with the example URLs provided
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

console.log('\nTest completed.');
