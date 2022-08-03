import { computed } from 'vue'
import { storeToRefs } from 'pinia';
import useMainStore from '@/stores/modules/main'
import { getDiffDays } from '@/utils/format';

export default function useDate() {
  const mainStore = useMainStore()
  const { startDate, endDate } = storeToRefs(mainStore)
  // 时间差
  const stayCount = computed(() => getDiffDays(startDate.value, endDate.value))
  // 日历选择器样式
  const formatCalendar = (day) => {
    if (day.type === 'start') {
      day.bottomInfo = '入住';
    } else if (day.type === 'end') {
      day.bottomInfo = '离店';
    }
    return day
  }


  return { startDate, endDate, stayCount, formatCalendar }
}