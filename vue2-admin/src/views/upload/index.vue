<template>
  <main>
    <div>
      <input class="el-button" type="file" id="up" @change="handleFileChange" />
      <el-button @click="handleUpload">上传</el-button>
      <el-button @click="handleAbort">取消</el-button>
    </div>
    <div style="margin-top: 30px; display: flex">
      <span>分块单位：{{ chunkSize / 1024 / 1024 }}MB；</span>
      <span>文件大小：{{ Math.round(fileSize / 1024 / 1024) }}MB；</span>
      <span>分块总数：{{ chunkCount }}</span>
      <el-progress
        style="width: 70%; margin-left: 20px"
        :text-inside="true"
        :stroke-width="20"
        :percentage="totalProcess"
      />
    </div>

    <el-table :data="chunkList">
      <el-table-column prop="index" label="切片序号"></el-table-column>
      <el-table-column label="大小(MB)">
        <template v-slot="{ row }">
          {{ Math.round(row.size / 1024) / 1024 }}
        </template>
      </el-table-column>
      <el-table-column label="进度">
        <template v-slot="{ row }">
          <el-progress
            :percentage="row.percentage"
            color="#909399"
          ></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </main>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Upload',

  data() {
    return {
      chunkList: [],
      promiseList: [],
      chunkSize: 1024 * 1024 * 10, // 分块大小
      index: 0, // 当前分块id
      chunkCount: 0, // 分块总数
      process: 0, //  当前进度
      curFile: null // 当前文件
    };
  },
  computed: {
    fileSize() {
      return this.curFile ? this.curFile.size : 0;
    },
    totalProcess() {
      if (!this.curFile || this.chunkList.length === 0) {
        return 0;
      }

      const loaded = this.chunkList.reduce((total, chunk) => {
        return total + chunk.percentage * chunk.size;
      }, 0);
      return parseInt((loaded / this.fileSize).toFixed(0));
    }
  },
  methods: {
    getFile() {
      const file = document.getElementById('up').files[0];
      if (!file) {
        this.$message.warning('请选择文件');
        return;
      }
      this.curFile = file;
      this.chunkCount = Math.ceil(file.size / this.chunkSize);
    },
    async handleUpload() {
      if (!this.curFile) {
        this.$message.warning('请选择文件');
        return;
      }

      const fileChunkList = this.createFileChunkList(
        this.curFile,
        this.chunkSize
      );
      this.chunkList = fileChunkList.map((item, index) => {
        return {
          index,
          chunk: item,
          size: item.size,
          percentage: 0
        };
      });
      const requestList = this.chunkList.map(item => {
        return this.getPromise(item);
      });

      function run() {
        let p = requestList.shift();
        p()
          .then(() => {
            requestList.length && run();
          })
          .catch(e => {
            console.log(e);
            requestList.push(p);
            requestList.length && run();
          });
      }
      for (let i = 0; i < 1; i++) {
        run();
      }
      console.log(requestList);
    },

    getPromise(item) {
      return () =>
        new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('file', item.chunk);
          formData.append('field', this.curFile.name + item.index);
          axios
            .post('/api/upload', formData, {
              onUploadProgress: e => this.handleProgress(e, item)
            })
            .then(() => {
              console.log('上传成功:', item.index);
              resolve();
            })
            .catch(err => {
              reject(err);
            });
        });
    },

    getChunkedFile(start) {
      const file = this.curFile;
      const [fileName, fileType] = file.name.split('.');
      const blob = file.slice(start, start + this.chunkSize);
      const blobName = `${fileName}_${this.index}.${fileType}`;
      console.log(blob);
      const blobFile = new File([blob], blobName);
      console.log(blobFile);
      console.log('上传中...', blobName);
      return blobFile;
    },

    // 生成文件切片列表
    createFileChunkList(file, chunkSize) {
      const fileChunkList = [];
      let cur = 0;
      while (cur < file.size) {
        fileChunkList.push(file.slice(cur, cur + chunkSize));
        cur += chunkSize;
      }
      return fileChunkList;
    },

    handleProgress(progressEvent, item) {
      const { loaded, total } = progressEvent;
      item.percentage = Math.round((loaded / total) * 100);
    },
    handleFileChange(e) {
      Object.assign(this.$data, this.$options.data());
      const [file] = e.target.files;
      if (!file) return;
      console.log(file);
      this.curFile = file;

      this.chunkCount = Math.ceil(file.size / this.chunkSize);
    },
    handleAbort() {
      console.log('取消上传');
      Object.assign(this.$data, this.$options.data());
    }
  }
};
</script>

<style scoped></style>
