<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="微文名称">
			<el-input v-model="title"></el-input>
		</el-form-item>
		<el-form-item label="惊喜指数">
			<el-rate v-model="degree" text-template="{score}" :max="10">
			</el-rate>
		</el-form-item>
		<el-form-item label="作者">
			<el-input v-model="author"></el-input>
		</el-form-item>
		<el-form-item label="微文类型">
			<el-checkbox-group v-model="type">
				<el-checkbox label="悬疑" name="type"></el-checkbox>
				<el-checkbox label="推理" name="type"></el-checkbox>
				<el-checkbox label="恋爱" name="type"></el-checkbox>
				<el-checkbox label="冒险" name="type"></el-checkbox>
				<el-checkbox label="搞笑" name="type"></el-checkbox>
				<el-checkbox label="恐怖" name="type"></el-checkbox>
				<el-checkbox label="励志" name="type"></el-checkbox>
				<el-checkbox label="热血" name="type"></el-checkbox>
			</el-checkbox-group>
		</el-form-item> 
		<el-form-item label="简介">
			<el-input type="textarea" v-model="des"></el-input>
		</el-form-item>
		<el-form-item label="正文">
			<div class="skeditor-box">
				<div class="skeditor-options">
					<button class="skeditor-bold" onclick="document.execCommand('Bold')">B</button>
					<button class="skeditor-italic" onclick="document.execCommand('Italic')">I</button>
					<button class="skeditor-underline" onclick="document.execCommand('Underline')"><u>U</u></button>
					<select class="skeditor-size" onchange="document.execCommand('FontSize',false,this.value)">
						<option disabled="true" selected="true">Font-size</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
					<button class="skeditor-back" onclick="document.execCommand('BackColor',false,'green')">color</button>
					<button class="skeditor-show" @click="skShow">SHOW</button>
				</div>
				<div class="skeditor-input" contenteditable="true"></div>
				<div class="skeditor-text">
					<h3>{{title}} <span class="skeditor-author">作者：{{author}}</span></h3>
					<p v-html="content"></p>
				</div>	
			</div>
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
          ocontent: '',
          author: '',
          type: [],
          degree: 0
      }
    },
    methods: {
      skShow() {
       	this.content = document.getElementsByClassName('skeditor-input')[0].innerHTML
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
      enter() {
      	this.content += '<br/>'
      },
      space() {
      	if(this.content.substr(this.content.length - 1,1) === ' '){
      		this.content = this.content.substring(0,this.content.length - 1)
      		this.content += '&nbsp;'
      	}
      },
      tab() {
      	this.content += '&nbsp;&nbsp;'
      },
      changeText() {
      	
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
      					this.type = [],
      					this.degree = 0,
      					document.getElementsByClassName('skeditor-input')[0].innerHTML = ''

      					this.success()
      				}
      			})
      		}
      	})
      }
    }
  }
</script>

<style scoped>
	.skeditor-box{
		position: relative;	
	}
	.skeditor-input{
		width: 100%;
		padding: 5px 7px;
		min-height: 200px;
		box-sizing: border-box;
		line-height: 1.5;
		font-size: 14px;
		border-radius: 4px;
		border: 1px solid #c0ccda;
		outline: none;
	}
	.skeditor-input:focus{
		border-color: #8492a6;
	}
	.skeditor-text{
		z-index: 100000000;
		position: fixed;
		width: 600px;
		border-radius: 4px;
		border: 2px solid #fff;
		background-color: rgba(80,150,254,.7);
		box-shadow: 0 0 18px rgba(0,0,0,.18);
		color: #fff;
		left: 50%;
		top: 100px;
		margin-left: -300px;
		box-sizing: border-box;
		line-height: 1.5;
		font-size: 14px;
		padding: 5px 17px;
	}
	.skeditor-author{
		padding-left: 30px;
		font-size: 13px;
		font-weight: 400;
	}
	.skeditor-options{
		padding-bottom: 5px;
	}
	.skeditor-bold,.skeditor-italic,.skeditor-underline,.skeditor-size,.skeditor-back,.skeditor-show{
		width: 50px;
		height: 30px;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 3px;
		outline: none;
		cursor: pointer;
		color: #666;
	}
	.skeditor-bold{
		font-weight: 600;
	}
	.skeditor-italic{
		font-style: italic;
	}
	.skeditor-size{
		width: 80px;
	}
	.skeditor-show{
		width: 80px;
		color: #fff;
		border: none;
		background-color: #333;
	}
	.skeditor-bold:active,.skeditor-italic:active,.skeditor-underline:active,.skeditor-back:active{
		background-color: #eee;
	}
	.skeditor-show:active{
		background-color: #666;
	}
</style>