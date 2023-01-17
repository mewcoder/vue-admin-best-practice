<template>
  <div class="amap-page-container">
    <div class="toolbar">实时地图</div>
    <el-amap
      vid="amapDemo"
      :center="center"
      :zoom="zoom"
      class="amap-demo"
      pitch-enable="false"
    >
      <el-amap-marker
        v-for="(marker, index) in markers"
        :key="index"
        :position="marker.position"
      />
    </el-amap>
  </div>
</template>

<script>
export default {
  name: 'RealTime',
  data() {
    return {
      zoom: 12,
      center: [120.22206291938784, 30.209772227392477],
      markers: []
    };
  },
  mounted() {
    this.mark();
  },
  methods: {
    mark() {
      this.markers = [
        {
          position: [120.222, 30.2097]
        },
        {
          position: [120.232, 30.2097]
        },
        {
          position: [120.242, 30.2097]
        },
        {
          position: [120.252, 30.2097]
        }
      ];
    }
  }
};
/**
 * 参考地图 https://www.jianshu.com/p/5c71e19783d9
 */
</script>

<style scoped>
.amap-demo {
  height: 90vh;
}
</style>
