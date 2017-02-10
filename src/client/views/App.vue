<template lang="html">
  <el-row id="app">
    <el-col :span="6" class="sidebar">
      <ul class="profiles">
        <li class="profile" v-for="profile in profiles">
          <el-button-group class="profile-button-group">
            <el-button class="profile-name" :type="profile.id == editProfile ? 'info' : ''" :title="'编辑［' + profile.name + '］'" @click="setEdit(profile)">{{profile.name}}</el-button>
            <el-button class="profile-active" :type="isChecked(profile)" icon="check" title="启用" @click="activeProfile(profile)"></el-button>
          </el-button-group>
        </li>
      </ul>
    </el-col>
    <el-col :span="18" class="main">
      <el-input type="textarea" class="profile-content" v-model="content" placeholder="请输入内容"></el-input>
      <el-input type="text" class="profile-title" v-model="name" placeholder="请输入标题"></el-input>
      <div class="operations">
        <el-button type="primary" class="operation-update" icon="edit" :disabled="!editProfile" @click="updateProfile">保存</el-button>
        <el-button type="danger" class="operation-delete" icon="delete" :disabled="!editProfile" @click="deleteProfile">删除</el-button>
        <el-button type="info" class="operation-create" icon="plus" @click="createProfile">创建</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {Row, Col, Input, Button, ButtonGroup, Loading} from 'element-ui'
import Api from 'client/assets/api'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Input.name]: Input,
    [Button.name]: Button,
    [ButtonGroup.name]: ButtonGroup
  },
  data () {
    return {
      loading: null,
      profiles: [],
      editProfile: '',
      name: '',
      content: ''
    }
  },
  created () {
    this.loadProfiles()
  },
  methods: {
    isChecked: function (profile) {
      return profile.isChecked ? 'success' : ''
    },
    loadProfiles: function () {
      this.loading = Loading.service();
      Api.loadProfiles({
        success: (response) => {
          this.loading.close()
          if (response.code != 0) {
            this.$message({
              message: response.message,
              type: 'error'
            })
            return
          }
          this.profiles = response.data.profiles
        }
      })
    },
    activeProfile: function (profile) {
      this.loading = Loading.service();
      Api.activeProfile({
        data: {
          id: profile.id
        },
        success: (response) => {
          this.loading.close()
          if (response.code != 0) {
            this.$message({
              message: response.message,
              type: 'error'
            })
            return
          }
          this.profiles = response.data.profiles
        }
      })
    },
    createProfile: function () {
      this.loading = Loading.service();
      Api.createProfile({
        data: {
          name: this.name,
          content: this.content
        },
        success: (response) => {
          this.loading.close()
          if (response.code != 0) {
            this.$message({
              message: response.message,
              type: 'error'
            })
            return
          }
          this.profiles = response.data.profiles
        }
      })
    },
    setEdit: function (profile) {
      this.editProfile = profile.id
      this.name = profile.name
      this.content = profile.content
    },
    updateProfile: function () {
      this.loading = Loading.service();
      Api.updateProfile({
        data: {
          id: this.editProfile,
          name: this.name,
          content: this.content
        },
        success: (response) => {
          this.loading.close()
          if (response.code != 0) {
            this.$message({
              message: response.message,
              type: 'error'
            })
            return
          }
          this.profiles = response.data.profiles
        }
      })
    },
    deleteProfile: function () {
      this.loading = Loading.service();
      Api.deleteProfile({
        data: {
          id: this.editProfile
        },
        success: (response) => {
          this.loading.close()
          if (response.code != 0) {
            this.$message({
              message: response.message,
              type: 'error'
            })
            return
          }
          this.profiles = response.data.profiles
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import '../assets/reset';

#app {
  height: 100%;

  .sidebar {
    height: 100%;
    padding: 15px;
  }
  .main {
    height: 100%;
  }
}

.profiles {
  margin: 0;
  padding: 0;

  .profile {
    list-style: none;
    padding: 0;
    margin-bottom: 15px;

    .profile-button-group {
      width: 100%;
      .profile-name {
        width: 80%;
        overflow: hidden;
        span {
          display: block;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .profile-active {
        width: 20%;
      }
    }
  }
}

.el-textarea, .el-input {
  margin-bottom: 20px;
}

.profile-content {
  height: 80%;
  textarea {
    width: 100%;
    height: 100%;
    resize: none;
  }
}
</style>
