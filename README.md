# Martianpay.js as a CommonJS module or ES module

This package allows [Martianpay.js](https://martianpay.com/docs/martianpay-js) to be
imported as a CommonJS module or ES module.

**Note**: To be
[PCI compliant](https://martianpay.com/docs/security/guide#validating-pci-compliance),
you must load Martianpay.js directly from `https://js.martianpay.com`. You cannot
include it in a bundle or host it yourself. This package wraps the global
`Martianpay` function provided by the Martianpay.js script as an ES module.

Calling `loadMartianpay` always loads the latest version of Martianpay.js, regardless of
which version of `@martianpay/martianpay-js` you use. Updates for this package only
impact tooling around the `loadMartianpay` helper itself and the TypeScript type
definitions provided for Martianpay.js. Updates do not affect runtime availability
of features of Martianpay.js.

[![npm version](https://img.shields.io/npm/v/@martianpay/martianpay-js.svg?style=flat-square)](https://www.npmjs.com/package/@martianpay/martianpay-js)

## Minimum requirements

- Node.js: v12.16
- TypeScript: v.3.1.1

## Installation

Use `npm` to install the Martianpay.js module:

```sh
npm install @martianpay/martianpay-js
```

## Usage

### `loadMartianpay`

This function returns a `Promise` that resolves with a newly created `Martianpay`
object once Martianpay.js has loaded. It takes the same parameters passed when
directly
[initializing a `Martianpay` instance](https://martianpay.com/docs/js/initializing). If
necessary, it will load Martianpay.js for you by inserting the Martianpay.js script tag.
If you call `loadMartianpay` in a server environment it will resolve to `null`.

```js
import {loadMartianpay} from '@martianpay/martianpay-js';

const martianpay = await loadMartianpay('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

We’ve placed a random API key in this example. Replace it with your
[actual publishable API keys](https://dashboard.martianpay.com/account/apikeys) to
test this code through your Martianpay account.

For more information on how to use Martianpay.js, please refer to the
[Martianpay.js API reference](https://martianpay.com/docs/js) or learn to
[accept a payment](https://martianpay.com/docs/payments/accept-a-payment) with
Martianpay.

If you have deployed a
[Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/Security/CSP),
make sure to
[include Martianpay.js in your directives](https://martianpay.com/docs/security/guide#content-security-policy).

## TypeScript support

This package includes TypeScript declarations for Martianpay.js. We support projects
using TypeScript versions >= 3.1.

Some methods in Martianpay.js accept and return objects from the
[Martianpay API](https://martianpay.com/docs/api). The type declarations in
`@martianpay/martianpay-js` for these objects in will always track the
[latest version](https://martianpay.com/docs/api/versioning) of the Martianpay API. If
you would like to use these types but are using an older version of the Martianpay
API, we recommend
[updating to the latest version](https://martianpay.com/docs/upgrades#how-can-i-upgrade-my-api),
or ignoring and overriding the type definitions as necessary.

Note that we may release new [minor and patch](https://semver.org/) versions of
`@martianpay/martianpay-js` with small but backwards-incompatible fixes to the type
declarations. These changes will not affect Martianpay.js itself.

## Ensuring Martianpay.js is available everywhere

To best leverage Martianpay’s advanced fraud functionality, ensure that Martianpay.js is
loaded on every page, not just your checkout page. This
[allows Martianpay to detect suspicious behavior](https://martianpay.com/docs/disputes/prevention/advanced-fraud-detection)
that may be indicative of fraud as customers browse your website.

By default, this module will insert a `<script>` tag that loads Martianpay.js from
`https://js.martianpay.com`. This happens as a side effect immediately upon
importing this module. If you utilize code splitting or only include your
JavaScript app on your checkout page, the Martianpay.js script will only be
available in parts of your site. To ensure Martianpay.js is available everywhere,
you can perform either of the following steps:

### Import as a side effect

Import `@martianpay/martianpay-js` as a side effect in code that will be included
throughout your site (e.g. your root module). This will make sure the Martianpay.js
script tag is inserted immediately upon page load.

```js
import '@martianpay/martianpay-js';
```

### Manually include the script tag

Manually add the Martianpay.js script tag to the `<head>` of each page on your site.
If an existing script tag is already present, this module will not insert a new
one. When you call `loadMartianpay`, it will use the existing script tag.

```html
<!-- Somewhere in your site's <head> -->
<script src="https://js.martianpay.com/v3" async></script>
```

### Importing `loadMartianpay` without side effects

If you would like to use `loadMartianpay` in your application, but defer loading the
Martianpay.js script until `loadMartianpay` is first called, use the alternative
`@martianpay/martianpay-js/pure` import module:

```js
// CommonJS module import
const {loadMartianpay} = require('@martianpay/martianpay-js/pure');
// ES module import
import {loadMartianpay} from '@martianpay/martianpay-js/pure';

// Martianpay.js will not be loaded until `loadMartianpay` is called
const martianpay = await loadMartianpay('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

### Disabling advanced fraud detection signals

If you would like to
[disable advanced fraud detection](https://martianpay.com/docs/disputes/prevention/advanced-fraud-detection#disabling-advanced-fraud-detection)
altogether, use `loadMartianpay.setLoadParameters`:

```js
// CommonJS module import
const {loadMartianpay} = require('@martianpay/martianpay-js/pure');
// ES module import
import {loadMartianpay} from '@martianpay/martianpay-js/pure';

loadMartianpay.setLoadParameters({advancedFraudSignals: false});
const martianpay = await loadMartianpay('pk_test_TYooMQauvdEDq54NiTphI7jx');
```

The `loadMartianpay.setLoadParameters` function is only available when importing
`loadMartianpay` from `@martianpay/martianpay-js/pure`.

## Martianpay.js Documentation

- [Martianpay.js Docs](https://martianpay.com/docs/martianpay-js)
- [Martianpay.js Reference](https://martianpay.com/docs/js)
- [React Martianpay.js Docs](https://martianpay.com/docs/martianpay-js/react)
