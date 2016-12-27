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
			<el-col :span="11">
				<el-date-picker type="date" placeholder="选择日期" v-model="year" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="初始评分">
			
			<el-rate
			  v-model="score"
			  show-text>
			</el-rate>
		</el-form-item>
		<el-form-item label="作者">
			<el-input v-model="author"></el-input>
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
				<el-checkbox label="腐" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="次元">
			<el-radio-group v-model="dimension">
				<el-radio label="2次元"></el-radio>
				<el-radio label="3次元"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="漫画介绍">
			<el-input type="textarea" v-model="des"></el-input>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="upload">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
		<form enctype="multipart/form-data" method="post" name="imgForm">
	      	<p>上传文件： <input type="file" name="file" id="imgObj" @change="changeFile" /></p>  
	      	<input type="button" value="上传" />
		</form>
	</el-form>
	
</template>

<script>
  export default {
    data() {
      return {
          title: '',
          place: '',
          year: '',
          date2: '',
          score: 5,
          author: '',
          type: [],
          dimension: '',
          des: '',
          image: ''
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
      changeFile() {
      	let self = this
		let oData = new FormData()
		let img = document.getElementById('imgObj').files[0]
      	
      	oData.append('type','comic')
      	oData.append('category','face')
      	oData.append('img',img)
      	
      	fetch('http://211.149.195.231:3000/api/form/comic',{
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
      	fetch('http://211.149.195.231:3000/api/data/comic',{
      		method: 'post',
      		mode: 'cors',
      		headers: {
      			"Content-Type": "application/x-www-form-urlencoded"
      		},
      		body: "title=" + this.title + '&place=' + this.place + '&year=' + this.year + '&score=' + this.score + '&type=' + this.type + '&des=' + this.des + '&author=' + this.author + '&image=' + this.image
      	}).then((res) => {

      	})
      }
    }
  }
</script>