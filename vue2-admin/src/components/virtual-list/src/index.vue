<template>
  <div class="vListWrap">
    <!-- 容器  -->
    <div class="vListContainer" ref="vListContainer" @scroll="onScroll">
      <!-- 绝对定位 撑起滚动条 总高度 = list.length * itemHeight -->
      <div class="ghost" :style="{ height: totalHeight + 'px' }"></div>
      <!-- 绝对定位 渲染区域 -->
      <div class="list" :style="{ transform: getTransform }">
        <div
          ref="items"
          class="item"
          v-for="item in visibleData"
          :key="item.msg"
          :style="{ height: itemHeight + 'px' }"
        >
          <slot :item="item"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VList',
  props: {
    // 高度固定
    itemHeight: {
      type: Number,
      default: 40
    },

    // 触发到顶事件的偏移量
    startOffset: {
      type: Number,
      default: 0
    },

    // 触发到底事件的偏移量
    endOffset: {
      type: Number,
      default: 0
    },

    // 手动滚动步长
    step: {
      type: Number
    },

    // 缓冲区高度
    cache: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      // 总数据
      list: [],
      // 滚动偏移
      scrollOffset: 0,
      // 可视区域高度
      clientHeight: 0,
      // 开始索引
      startIndex: 0,
      // 结束索引
      endIndex: 0,
      // 当前是否在滚动中
      scrolling: false
    };
  },
  computed: {
    startCache() {
      return Math.min(this.cache, this.startIndex);
    },
    endCache() {
      return Math.min(this.visibleCount, this.list.length - this.endIndex);
    },
    // 总高度
    totalHeight() {
      return this.list.length * this.itemHeight;
    },
    visibleCount() {
      // 向上取整，+1为了防止空白
      return Math.ceil(this.clientHeight / this.itemHeight) + 1;
    },
    // 实际展示的数据
    visibleData() {
      const start = this.startIndex - this.startCache;
      const end = this.endIndex + this.endCache;
      return this.list.slice(start, end);
    },
    // 实际展示的列表的偏移值
    // 需要减去滚过去的部分，让列表始终在可视区域中间
    getTransform() {
      // 偏移量
      const offset = (this.startIndex - this.startCache) * this.itemHeight;
      return `translateY(${offset}px)`;
    }
  },
  mounted() {
    this.init();
    this.onScroll();
  },
  methods: {
    // 初始化
    init() {
      // 可视区域高度
      this.clientHeight = this.$refs.vListContainer.offsetHeight; // offsetHeight包括 border
    },
    // 滚动监听
    onScroll() {
      this.scrollOffset = this.$refs.vListContainer.scrollTop;
      // 实际展示数据的起始索引, 滚过去几条
      this.startIndex = Math.floor(this.scrollOffset / this.itemHeight); // 可视区域可显示的数量
      this.endIndex = this.startIndex + this.visibleCount;
    },

    // 获取滚动步长
    getStep() {
      return this.step || this.itemHeight;
    },

    // 滚动
    scrollTo(to) {
      if (this.scrolling) {
        return false;
      }
      this.scrolling = true;
      const from = this.scrollOffset;
      const offset = to - from;
      const dur = 500;
      const startTime = Date.now();
      const run = () => {
        const curTime = Date.now();
        const spaceTime = curTime - startTime;
        const ratio = this.ease(spaceTime, 0, 1, dur);
        const curNum = offset * ratio;
        if (ratio >= 1) {
          this.$refs.vListContainer.scrollTop = to;
          this.scrolling = false;
        } else {
          this.$refs.vListContainer.scrollTop = from + curNum;
          requestAnimationFrame(run);
        }
      };
      run();
    },

    // 缓动函数，慢进慢出
    ease(t, b, c, d) {
      if ((t /= d / 2) < 1) return (c / 2) * t * t * t + b;
      return (c / 2) * ((t -= 2) * t * t + 2) + b;
    },

    //-------------------对外接口--------------------------

    addData(data, head) {
      // 头插
      if (head) {
        this.list = data.concat(this.list);
      } else {
        this.list = this.list.concat(data);
      }
    },

    // 滚动到顶部
    // 会存在白屏现象
    scrollToTop() {
      this.scrollTo(0);
    },

    // 滚动到底部
    // 会存在白屏现象
    scrollToBottom() {
      let bottom = this.totalHeight - this.clientHeight;
      if (bottom > 0) {
        this.scrollTo(bottom);
      }
    },

    scrollUp() {
      if (this.scrollOffset <= 0) {
        return false;
      }
      let to = 0;
      let step = this.getStep();
      if (this.scrollOffset - step > 0) {
        to = this.scrollOffset - step;
      }
      this.scrollTo(to);
    },

    // 向下滚
    scrollDown() {
      if (this.totalHeight <= this.clientHeight) {
        return false;
      }
      let canScroll = this.totalHeight - this.clientHeight;
      if (this.scrollOffset >= canScroll) {
        return false;
      }
      let to = 0;
      let step = this.getStep();
      if (this.scrollOffset + step < canScroll) {
        to = this.scrollOffset + step;
      } else {
        to = canScroll;
      }
      this.scrollTo(to);
    },

    scrollTop() {
      let isScrollTop = this.scrollOffset - this.startOffset <= 0;
      if (isScrollTop) {
        this.$emit('toTop');
      }
    },

    scrollBottom() {
      let isScrollEnd =
        this.clientHeight + this.scrollOffset >=
        this.totalHeight - this.endOffset;
      if (isScrollEnd) {
        this.$emit('toBottom');
      }
    }
  }
};
/**
 * 笔记
 * https://juejin.cn/post/6844903982742110216
 */
</script>

<style lang="scss" scoped>
.vListWrap {
  width: 100%;
  height: 100%;
  overflow: hidden;

  .vListContainer {
    height: 100%;
    overflow-y: auto;
    position: relative;
    // margin-right: -20px;

    .ghost {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      z-index: -1;
    }

    .list {
      left: 0;
      right: 17px;
      top: 0;
      position: absolute;
    }
  }
}
</style>
