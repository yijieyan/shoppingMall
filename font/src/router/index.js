import Vue from 'vue';
import Router from 'vue-router';
import GoodList from '@/views/goodList';
import Cart from '@/views/cart';
import Address from '@/views/address';
import OrderSuccess from '@/views/orderSuccess';
import Order from '@/views/order';


Vue.use(Router);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'GoodList',
      component: GoodList
    },
    {
    	path: '/cart',
    	name: 'Cart',
    	component: Cart
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/orderSuccess',
      name: 'OrderSuccess',
      component: OrderSuccess
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    }
  ]
})
