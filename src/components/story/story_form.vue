<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="小故事名称">
			<el-input v-model="title"></el-input>
		</el-form-item>
		<el-form-item label="惊喜指数">
			
			<el-rate v-model="degree" text-template="{score}" :max="10">
			</el-rate>
		</el-form-item>
		<el-form-item label="作者">
			<el-input v-model="author"></el-input>
		</el-form-item>
		<el-form-item label="小故事类型">
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
			</el-checkbox-group>
		</el-form-item>
		<el-form-item label="简介">
			<el-input type="textarea" v-model="des"></el-input>
		</el-form-item>
		<el-form-item label="正文">
			<el-input type="textarea" v-model="content"></el-input>
		</el-form-item>
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
          des: '',
          content: '',
          author: '',
          type: [],
          degree: 0
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
      upload() {
      	fetch(this.$store.state.api_addr + 'data/story',{
      		method: 'post',
      		mode: 'cors',
      		headers: {
      			"Content-Type": "application/x-www-form-urlencoded"
      		},
      		body: "title=" + this.title + '&type=' + this.type + '&des=' + this.des + '&author=' + this.author + '&degree=' + this.degree + '&content=' + this.content
      	}).then((res) => {
      		if(res.ok){
      			res.json().then((json) => {
      				if(json.code === 200){
      					this.title = '',
      					this.des = '',
      					this.content = '',
      					this.author = '',
      					this.type = '',
      					this.degree = '',

      					this.success()
      				}
      			})
      		}
      	})
      }
    }
  }
</script>