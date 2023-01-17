import { getRole } from '@/utils/auth';

export default {
  inserted: function (el, binding) {
    const { value } = binding;
    const role = getRole();
    if (Array.isArray(value) && value.length > 0) {
      if (!value.includes(role) && el.parentNode) {
        el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`need roles! Like v-permission="['add','edit']"`);
    }
  }
};
