export type LoadMartian = (
  ...args: Parameters<MartianConstructor>
) => Promise<Martian | null>;

export interface LoadMartianParams {
  advancedFraudSignals: boolean;
}

export const loadMartian: (
  publishableKey: string,
  options?: MartianConstructorOptions | undefined
) => Promise<Martian | null>;
export interface Martian {
  retrievePaymentIntent(client_secret: string): Promise<MartianPaymentIntent>;
  elements(): MartianElements;
  confirmPayment(options: {
    element: MartianPaymentElement;
  }): Promise<MartianPaymentIntentResult>;
}

export type MartianPaymentIntentResult =
  | {paymentIntent: MartianPaymentIntent; error?: undefined}
  | {paymentIntent?: undefined; error: Error};

export interface MartianElements {
  create(): MartianPaymentElement;
}

export interface MartianPaymentElement {
  on(eventName: string, handler: (data?: any) => void): void;
  fire(eventName: string, data?: any): void;
  mount(domElement: string | HTMLElement): void;
}

export interface MartianConstructor {
  (publishableKey: string, options?: MartianConstructorOptions): Martian;
}

export interface MartianConstructorOptions {}

export interface MartianPaymentIntent {
  id?: string;
  object: 'payment_intent';
  amount: number;
  amount_received?: number;
  canceled_at?: number;
  cancellation_reason?: string;
  client_secret: string;
  created: number;
  currency: string;
  customer?: string;
  description?: string;
  transactions?: MartianPaymentTransaction[];
  livemode: false;
  metadata?: Record<string, any>;
  payment_method_type: string;
  payment_method_options?: {
    crypto: {
      token: string;
      network: string;
      exchange_rate: string;
      deposit_address: string;
    };
  };
  receipt_email?: string;
  status: string;
}
export interface MartianPaymentTransaction {
  blockchain_tx_id: string;
  destination_address: string;
  destination_amount: string;
  destination_currency: string;
  destination_network: string;
  state: string;
  wallet_address: string;
}

declare global {
  interface Window {
    martian?: MartianConstructor;
  }
}
