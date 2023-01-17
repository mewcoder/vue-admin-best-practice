import { isLogin, getCodes } from '@/utils/auth';

export function createRouteGuard(router) {
  router.beforeEach(async (to, form, next) => {
    if (!isLogin() && to.path !== '/login') {
      next({ name: 'Login' });
    } else {
      const codes = getCodes();
      if (to.meta.code && !codes.includes(to.meta.code)) {
        next({ name: 'Error', params: { type: '403' } });
      } else {
        next();
      }
    }
  });
}
