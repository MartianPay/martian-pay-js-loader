# MartianPay.js Loader

[![npm version](https://img.shields.io/npm/v/@martianpay/js.svg?style=flat-square)](https://www.npmjs.com/package/@martianpay/js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight JavaScript loader for [MartianPay.js](https://martianpay.com),
enabling seamless integration of MartianPay's payment processing capabilities
into web applications.

## ✨ Features

- **Dynamic Loading**: Automatically loads MartianPay.js from CDN
- **TypeScript Support**: Full TypeScript definitions included
- **Multiple Module Formats**: Supports CommonJS, ES modules, and UMD
- **Server-Side Safe**: Gracefully handles server-side rendering
- **PCI Compliant**: Loads scripts directly from MartianPay's CDN
- **Advanced Fraud Detection**: Configurable fraud detection signals

## 📋 Requirements

- **Node.js**: v12.16 or higher
- **TypeScript**: v3.1.1 or higher (optional)
- **Modern Browsers**: ES6+ support recommended

## 🚀 Installation

Install the package using your preferred package manager:

```bash
# Using npm
npm install @martianpay/js

# Using yarn
yarn add @martianpay/js

# Using pnpm
pnpm add @martianpay/js
```

## 📖 Usage

### Basic Usage

```javascript
import {loadMartian} from '@martianpay/js';

// Load MartianPay with your publishable key
const martian = await loadMartian('pk_test_your_publishable_key_here');

if (martian) {
  // MartianPay is loaded and ready to use
  const elements = martian.elements();
  const paymentElement = elements.create();

  // Mount the payment element
  paymentElement.mount('#payment-element');
}
```

### With Options

```javascript
import {loadMartian} from '@martianpay/js';

const martian = await loadMartian('pk_test_your_key', {
  // Additional options can be passed here
});
```

### Server-Side Rendering (SSR)

The loader is SSR-safe and will return `null` when used in server environments:

```javascript
import {loadMartian} from '@martianpay/js';

const martian = await loadMartian('pk_test_your_key');

if (martian === null) {
  // Running on server-side, handle accordingly
  console.log('MartianPay not available on server');
} else {
  // Running in browser, proceed with payment processing
  // ... payment logic
}
```

### Advanced Configuration

For more control over script loading, you can configure advanced fraud
detection:

```javascript
import {loadMartian} from '@martianpay/js/pure';

// Configure before loading
loadMartian.setLoadParameters({
  advancedFraudSignals: false, // Disable advanced fraud detection
});

const martian = await loadMartian('pk_test_your_key');
```

## 🔧 API Reference

### `loadMartian(publishableKey, options?)`

Loads and initializes MartianPay.js.

**Parameters:**

- `publishableKey` (string): Your MartianPay publishable key
- `options` (object, optional): Configuration options

**Returns:**

- `Promise<Martian | null>`: Resolves to Martian instance or null (server-side)

### `loadMartian.setLoadParameters(params)`

Configure script loading parameters (only available with `/pure` import).

**Parameters:**

- `params` (object):
  - `advancedFraudSignals` (boolean): Enable/disable advanced fraud detection

## 🛡️ Security & Compliance

### PCI Compliance

To maintain PCI compliance, MartianPay.js must be loaded directly from
`https://js.martianpay.com`. This package ensures compliance by:

- Loading scripts from the official MartianPay CDN
- Not bundling MartianPay.js with your application
- Maintaining secure script injection

### Content Security Policy (CSP)

If you use CSP, ensure MartianPay.js is included in your directives:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="script-src 'self' https://js.martianpay.com;"
/>
```

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📦 Module Formats

This package supports multiple module formats:

```javascript
// ES Modules
import {loadMartian} from '@martianpay/js';

// CommonJS
const {loadMartian} = require('@martianpay/js');

// Pure module (no side effects)
import {loadMartian} from '@martianpay/js/pure';
```

## 🔄 Migration from Stripe.js

If you're migrating from Stripe.js, the API is very similar:

```javascript
// Stripe.js
import {loadStripe} from '@stripe/stripe-js';
const stripe = await loadStripe('pk_test_...');

// MartianPay.js
import {loadMartian} from '@martianpay/js';
const martian = await loadMartian('pk_test_...');
```

## 🧪 Development

### Setup

```bash
# Clone the repository
git clone https://github.com/martianpay/martian-pay-js-loader.git
cd martian-pay-js-loader

# Install dependencies
pnpm install

# Build the project
pnpm build

# Run tests
pnpm test

# Run linting
pnpm lint
```

### Available Scripts

- `pnpm build` - Build the project
- `pnpm test` - Run tests
- `pnpm lint` - Run ESLint
- `pnpm typecheck` - Run TypeScript type checking
- `pnpm prettier` - Format code with Prettier

## 📚 Additional Resources

- [MartianPay Documentation](https://martianpay.com/docs)
- [MartianPay.js API Reference](https://martianpay.com/docs/js)
- [Payment Integration Guide](https://martianpay.com/docs/payments)
- [Security Best Practices](https://martianpay.com/docs/security)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md)
for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file
for details.

## 🆘 Support

- **Documentation**: [https://martianpay.com/docs](https://martianpay.com/docs)
- **Issues**:
  [GitHub Issues](https://github.com/martianpay/martian-pay-js-loader/issues)
- **Email**: [support@martianpay.com](mailto:support@martianpay.com)

---

Made with ❤️ by the MartianPay team
