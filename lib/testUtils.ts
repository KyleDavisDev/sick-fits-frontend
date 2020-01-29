import casual from "casual";
import { ReactWrapper } from "enzyme";

// seed it so we get consistent results
casual.seed(777);

const fakeItem = () => ({
  __typename: "Item",
  created: casual.unix_time,
  id: casual.uuid,
  price: 5000,
  user: null,
  image: "dog-small.jpg",
  title: "dogs are best",
  description: "dogs",
  largeImage: "dog.jpg"
});

const fakeUser = () => ({
  __typename: "User",
  id: casual.uuid,
  name: casual.name,
  email: casual.email,
  permissions: ["ADMIN"],
  orders: [],
  cart: []
});

const fakeOrderItem = () => ({
  __typename: "OrderItem",
  id: casual.uuid,
  image: `${casual.word}.jpg`,
  title: casual.words(),
  price: 4234,
  quantity: 1,
  description: casual.words()
});

const fakeOrder = () => ({
  __typename: "Order",
  id: casual.uuid,
  charge: "ch_123",
  total: 40000,
  items: [fakeOrderItem(), fakeOrderItem()],
  createdAt: "2018-04 - 06T19: 24: 16.000Z",
  user: fakeUser()
});

const fakeCartItem = (overrides?: any) => ({
  __typename: "CartItem",
  id: casual.uuid,
  created: casual.unix_time,
  quantity: casual.integer(0, 15),
  item: fakeItem(),
  user: fakeUser(),
  ...overrides
});

const fakeCart = (overrides?: any) => ({
  __typename: "Cart",
  id: casual.uuid,
  items: [fakeCartItem(), fakeCartItem(), fakeCartItem()],
  user: fakeUser(),
  created: casual.unix_time,
  updated: casual.unix_time,
  isActive: true,
  ...overrides
});

// Fake LocalStorage
class LocalStorageMock {
  store: any;
  constructor() {
    this.store = {};
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = value.toString();
  }

  removeItem(key) {
    delete this.store[key];
  }
}

function simulateInputChange(
  wrapper: ReactWrapper,
  name: string,
  value: string
) {
  wrapper
    .find(`input[name='${name}']`)
    .simulate("change", { target: { name, value } });
}

export {
  LocalStorageMock,
  fakeItem,
  fakeUser,
  fakeCartItem,
  fakeCart,
  fakeOrder,
  fakeOrderItem,
  simulateInputChange
};
