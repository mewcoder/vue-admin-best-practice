<template>
  <div class="about">
    <h1>This is an virual-list page</h1>
    <el-button @click="handleClick">to Top</el-button>
    <el-button @click="initWebSocket">start ws</el-button>
    <el-button @click="closeWebSocket">close ws</el-button>
    <VList ref="vlist" class="vlist">
      <template #default="{ item }">
        <span
          :class="{ 'item-active': select === item.msg }"
          @click="selectOne(item.msg)"
        >
          {{ item.msg }}
        </span>
      </template>
    </VList>
    <!-- <div ref="vlist" class="vlist"></div> -->
  </div>
</template>
<script>
export default {
  name: 'List',
  data() {
    return {
      select: null,
      websock: null,
      wsIntval: null,
      wsReconnectTimer: null,
      list: []
    };
  },

  mounted() {
    const list = this.getItemFromStorage('list');
    if (list) {
      this.$refs.vlist.addData(list.reverse());
    }
    this.$refs.vlist.addData(this.list); // test
    // this.addMockList();
  },
  destroyed() {
    this.websocketclose();
  },
  methods: {
    /**
     * 添加mock数据,往列表里添加dom
     */
    addMockList() {
      const total = 100000;
      const step = 100;
      let index = 0;
      const add = () => {
        if (index < total) {
          requestAnimationFrame(() => {
            const fragment = document.createDocumentFragment();
            for (let i = 0; i < step; i++) {
              const div = document.createElement('div');
              console.log(index);
              div.innerText = 'msg' + index++;
              fragment.appendChild(div);
            }
            this.$refs.vlist.appendChild(fragment);
            index += step;
            add();
          });
        }
      };
      add();
    },
    handleClick() {
      this.$refs.vlist.scrollToTop();
    },
    /**
     * websocket初始化
     */
    initWebSocket() {
      const uuid = this.getUUID();
      const url = `ws://127.0.0.1:3000/ws?uuid=${uuid}`;
      this.websock = new WebSocket(url);
      this.websock.onopen = this.wsOnOpen;
      this.websock.onmessage = this.wsOnMessage;
      this.websock.onerror = this.wsOnError;
      this.websock.onclose = this.wsOnClose;
    },
    closeWebSocket() {
      this.websock && this.websock.close();
      this.wsReconnectTimer = null;
    },
    wsOnMessage(e) {
      const data = JSON.parse(e.data);
      if (this.select) {
        this.list.unshift(data);
      } else {
        this.$refs.vlist.addData([data, ...this.list], true);
        this.list = [];
      }

      let list = this.getItemFromStorage('list');
      if (!list) {
        this.setItemToStorage('list', [data]);
      } else {
        if (list.length > 1900) {
          list = list.slice(list.length - 1900, list.length);
        }
        list.push(data);
        this.setItemToStorage('list', list);
      }
    },
    // 连接建立之后执行send方法发送数据
    wsOnOpen() {
      console.log('websocket open...');
      // this.wsStartHeartBeat();
      this.wsSend(JSON.stringify({ userId: 'admin' }));
    },
    // 连接建立失败重连
    wsOnError(e) {
      console.log(e);
      // this.wsReconnect();
    },
    // 数据发送
    wsSend(data) {
      this.websock.send(data);
    },
    wsOnClose() {
      console.log('websocket close...');
    },
    /**
     * 重连机制 防抖
     */
    wsReconnect() {
      if (this.wsLockReconnect) return;
      this.wsLockReconnect = true;
      this.initWebSocket();
      this.wsReconnectTimer = setTimeout(() => {
        this.wsLockReconnect = false;
        this.wsReconnect();
      }, 10000);
    },

    // 开始Ws
    wsStartHeartBeat() {
      // 重置定时
      this.wsIntval && clearInterval(this.wsIntval);
      // 开启定时
      this.wsIntval = setInterval(() => {
        // 心跳时间内收不到消息，主动触发连接关闭，开始重连
        this.websocket && this.websocket.send('ping');
      }, 20 * 1000);
    },

    getItemFromStorage(key) {
      if (key && sessionStorage.getItem(key)) {
        return JSON.parse(sessionStorage.getItem(key));
      } else {
        return null;
      }
    },
    setItemToStorage(key, value) {
      if (sessionStorage.getItem(key)) {
        sessionStorage.removeItem(key);
        sessionStorage.setItem(key, JSON.stringify(value));
      } else {
        sessionStorage.setItem(key, JSON.stringify(value));
      }
    },
    getUUID() {
      let uuid = this.getItemFromStorage('uuid');
      if (!uuid) {
        uuid = ('000000' + Math.floor(Math.random() * 999999)).slice(-6);
        this.setItemToStorage('uuid', uuid);
      }
      return uuid;
    }
  }
};
/**
 * 笔记：
 * https://github.com/chaimHL/vue-long-list-optimization
 */
</script>
<style lang="scss" scoped>
.vlist {
  height: 400px;
  width: 400px;
  border: 1px solid #ccc;
  overflow: auto;
}
.item-active {
  border: 1px solid #132944;
}
</style>
