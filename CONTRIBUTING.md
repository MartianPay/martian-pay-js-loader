# Contributing to Stripe.js

Thanks for contributing to Stripe.js!

## Issues

This project is a very thin loading wrapper around Stripe.js. Please only file
issues here that you believe represent bugs with the loader, not Stripe.js
itself.

If you're having general trouble with Stripe.js or your Stripe integration,
please reach out to us using the form at <https://support.stripe.com/email> or
come chat with us on the [Stripe Discord server][developer-chat]. We're very
proud of our level of service, and we're more than happy to help you out with
your integration.

If you've found a bug in Stripe.js loading wrapper, please [let us know][issue]!

## Code review

All pull requests will be reviewed by someone from Stripe before merging. At
Stripe, we believe that code review is for explaining and having a discussion
around code. For those new to code review, we strongly recommend [this
video][code-review] on "code review culture."

## Developing

Install dependencies:

```sh
pnpm install
```

We use a number of automated checks:

- Jest, for testing
  - `pnpm test`
- ESLint, for assorted warnings
  - `pnpm run lint`
- Prettier, for code formatting
  - `pnpm run prettier`

You might want to configure your editor to automatically run these checks. Not
passing any of these checks will cause the CI build to fail.

[code-review]: https://www.youtube.com/watch?v=PJjmw9TRB7s
[issue]: https://github.com/stripe/stripe-js/issues/new/choose
[developer-chat]: https://stripe.com/go/developer-chat
