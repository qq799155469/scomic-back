<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="漫画名称">
			<el-input v-model="title"></el-input>
		</el-form-item>
		<el-form-item label="漫画地区">
			<el-select v-model="place" placeholder="请选择漫画地区">
				<el-option label="日本" value="日本"></el-option>
				<el-option label="国产" value="国产"></el-option>
				<el-option label="欧美" value="欧美"></el-option>
				<el-option label="台湾" value="台湾"></el-option>
				<el-option label="香港" value="香港"></el-option>
				<el-option label="韩国" value="韩国"></el-option>
			</el-select>
		</el-form-item>
		<el-form-item label="年代">
			<div class="block">
			  <el-date-picker
			    v-model="year"
			    align="right"
			    type="year"
			    placeholder="选择年">
			  </el-date-picker>
			</div>
		</el-form-item>
		<el-form-item label="初始评分">
			
			<el-rate v-model="score" text-template="{score}" :max="10">
			</el-rate>
		</el-form-item>
		<el-form-item label="作者">
			<el-input v-model="author"></el-input>
		</el-form-item>
		<el-form-item label="作者">
			<el-input placeholder="请输入漫画地址" v-model="link_comic">
		    	<template slot="prepend">http://</template>
		  	</el-input>
		  	<el-input placeholder="请输入TV地址" v-model="link_tv">
		    	<template slot="prepend">http://</template>
		  	</el-input>
		</el-form-item>
		<el-form-item label="漫画类型">
			<el-checkbox-group v-model="type">
				<el-checkbox label="悬疑" name="type"></el-checkbox>
				<el-checkbox label="推理" name="type"></el-checkbox>
				<el-checkbox label="恋爱" name="type"></el-checkbox>
				<el-checkbox label="冒险" name="type"></el-checkbox>
				<el-checkbox label="搞笑" name="type"></el-checkbox>
				<el-checkbox label="四格" name="type"></el-checkbox>
				<el-checkbox label="后宫" name="type"></el-checkbox>
				<el-checkbox label="百合" name="type"></el-checkbox>
				<el-checkbox label="热血" name="type"></el-checkbox>
				<el-checkbox label="怪异" name="type"></el-checkbox>
				<el-checkbox label="科幻" name="type"></el-checkbox>
				<el-checkbox label="治愈" name="type"></el-checkbox>
				<el-checkbox label="竞技" name="type"></el-checkbox>
				<el-checkbox label="灾难" name="type"></el-checkbox>
				<el-checkbox label="校园" name="type"></el-checkbox>
				<el-checkbox label="少年" name="type"></el-checkbox>
				<el-checkbox label="少女" name="type"></el-checkbox>
				<el-checkbox label="魔法" name="type"></el-checkbox>
				<el-checkbox label="腐" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="漫画介绍">
			<el-input type="textarea" v-model="des"></el-input>
		</el-form-item>
		<form enctype="multipart/form-data" method="post" name="imgForm">
	      	<p><span style="color: #5e6d82;font-size: 14px;padding-right: 8px;padding-left: 40px;">封面</span> <input type="file" name="file" id="imgObj" @change="changeFile" /></p>  
		</form>
		<el-form-item>
			<el-button type="primary" @click="upload">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
		
	</el-form>
	
</template>

<script>
  export default {
    data() {
      return {
          title: '',
          place: '',
          year: '',
          score: 10,
          author: '',
          type: [],
          des: '',
          image: '',
          link_comic: '',
          link_tv: ''
      }
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      success() {
      	this.$message('上传成功!')
      },
      changeFile() {
      	let self = this
		let oData = new FormData()
		let img = document.getElementById('imgObj').files[0]
      	
      	oData.append('type','comic')
      	oData.append('category','face')
      	oData.append('img',img)

      	fetch(self.$store.state.api_addr + 'image/comic/face',{
      		method: 'post',
      		mode: 'cors',
      		headers: {},
      		body: oData
      	}).then((res) => {
      		if(res.ok){
      			res.json().then((json) => {	
      				self.image = json.data.filename
      			})
      		}
      	})
		
      },
      upload() {
      	fetch(this.$store.state.api_addr + 'data/comic',{
      		method: 'post',
      		mode: 'cors',
      		headers: {
      			"Content-Type": "application/x-www-form-urlencoded"
      		},
      		body: "title=" + this.title + '&place=' + this.place + '&year=' + this.year + '&score=' + this.score + '&type=' + this.type + '&des=' + this.des + '&author=' + this.author + '&image=' + this.image + '&link_comic=' + this.link_comic + '&link_tv=' + this.link_tv
      	}).then((res) => {
      		if(res.ok){
      			res.json().then((json) => {
      				if(json.code === 200){
      					this.title = '',
      					this.place = '',
      					this.year = '',
      					this.score = 10,
      					this.author = '',
      					this.type = [],
      					this.des = '',
      					this.image = null
      					this.link_comic = ''
      					this.link_tv = ''

      					this.success()
      				}
      			})
      		}
      	})
      }
    }
  }
</script>