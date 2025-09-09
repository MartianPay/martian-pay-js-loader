import {
  LoadMartian,
  LoadMartianParams,
  Martian,
  MartianConstructor,
} from '../types';

declare const _VERSION: string;

const SCRIPT_URL =
  process.env.MARTIAN_PAY_JS_URL || 'https://js.martianpay.com/app.js';
const SCRIPT_URL_REGEX = new RegExp(SCRIPT_URL);
const EXISTING_SCRIPT_MESSAGE =
  'loadMartian.setLoadParameters was called but an existing Martian.js script already exists in the document; existing script parameters will be used';

let martianPromise: Promise<MartianConstructor | null> | null = null;
let loadCalled = false;
let loadParameters: LoadMartianParams | null = null;

const getMartianPromise: () => Promise<MartianConstructor | null> = () => {
  if (martianPromise) {
    return martianPromise;
  }

  const p = loadScript(loadParameters);
  martianPromise = p.catch((error) => {
    // clear cache on error
    martianPromise = null;
    return Promise.reject(error);
  });
  return martianPromise;
};

const findScript = (): HTMLScriptElement | null => {
  const scripts = document.querySelectorAll<HTMLScriptElement>(
    `script[src^="${SCRIPT_URL}"]`
  );

  for (let i = 0; i < scripts.length; i++) {
    const script = scripts[i];

    if (!SCRIPT_URL_REGEX.test(script.src)) {
      continue;
    }

    return script;
  }

  return null;
};

const injectScript = (params: null | LoadMartianParams): HTMLScriptElement => {
  const queryString =
    params && !params.advancedFraudSignals ? '?advancedFraudSignals=false' : '';
  const script = document.createElement('script');
  script.src = `${SCRIPT_URL}${queryString}`;

  const headOrBody = document.head || document.body;

  if (!headOrBody) {
    throw new Error(
      'Expected document.body not to be null. Martian.js requires a <body> element.'
    );
  }

  headOrBody.appendChild(script);

  return script;
};

const registerWrapper = (martian: any, startTime: number): void => {
  if (!martian || !martian._registerWrapper) {
    return;
  }

  martian._registerWrapper({name: 'martian-js', version: _VERSION, startTime});
};

let onErrorListener: (() => void) | null = null;
let onLoadListener: (() => void) | null = null;

const onError = (reject: (reason?: any) => void) => () => {
  reject(new Error('Failed to load Martian.js'));
};

const onLoad =
  (
    resolve: (
      value: MartianConstructor | PromiseLike<MartianConstructor | null> | null
    ) => void,
    reject: (reason?: any) => void
  ) =>
  () => {
    if (window.martian) {
      resolve(window.martian);
    } else {
      reject(new Error('Martian.js not available'));
    }
  };

const loadScript = async (
  params: null | LoadMartianParams
): Promise<MartianConstructor | null> => {
  // Ensure that we only attempt to load Martian.js at most once
  if (martianPromise !== null) {
    return martianPromise;
  }

  martianPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      // Resolve to null when imported server side. This makes the module
      // safe to import in an isomorphic code base.
      resolve(null);
      return;
    }

    if (window.martian && params) {
      console.warn(EXISTING_SCRIPT_MESSAGE);
    }

    if (window.martian) {
      resolve(window.martian);
      return;
    }

    try {
      let script = findScript();

      if (script && params) {
        console.warn(EXISTING_SCRIPT_MESSAGE);
      } else if (!script) {
        script = injectScript(params);
      } else if (
        script &&
        onLoadListener !== null &&
        onErrorListener !== null
      ) {
        // remove event listeners
        script.removeEventListener('load', onLoadListener);
        script.removeEventListener('error', onErrorListener);

        // if script exists, but we are reloading due to an error,
        // reload script to trigger 'load' event
        script.parentNode?.removeChild(script);
        script = injectScript(params);
      }

      onLoadListener = onLoad(resolve, reject);
      onErrorListener = onError(reject);
      script.addEventListener('load', onLoadListener);
      script.addEventListener('error', onErrorListener);
    } catch (error) {
      reject(error);
      return;
    }
  });
  // Resets martianPromise on error
  return martianPromise.catch((error) => {
    martianPromise = null;
    return Promise.reject(error);
  });
};

const initMartian = (
  maybeMartian: MartianConstructor | null,
  args: Parameters<MartianConstructor>,
  startTime: number
): Martian | null => {
  if (maybeMartian === null) {
    return null;
  }

  const martian = maybeMartian.apply(undefined, args);
  registerWrapper(martian, startTime);
  return martian;
};

export const loadMartian: LoadMartian = async (...args) => {
  loadCalled = true;
  const startTime = Date.now();

  return getMartianPromise().then((maybeMartian) =>
    initMartian(maybeMartian, args, startTime)
  );
};

// Add setLoadParameters function for pure module
export const setLoadParameters = (params: LoadMartianParams): void => {
  if (loadCalled) {
    console.warn(
      'loadMartian.setLoadParameters was called after loadMartian was called. This has no effect.'
    );
    return;
  }

  loadParameters = params;
};

// Attach setLoadParameters to loadMartian for convenience
(loadMartian as any).setLoadParameters = setLoadParameters;
