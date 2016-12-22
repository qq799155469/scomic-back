<template>
	<el-form ref="form" :model="form" label-width="80px" @submit.prevent="onSubmit" style="margin:20px;width:60%;min-width:600px;">
		<el-form-item label="漫画名称">
			<el-input v-model="form.title"></el-input>
		</el-form-item>
		<el-form-item label="漫画地区">
			<el-select v-model="form.place" placeholder="请选择漫画地区">
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
				<el-date-picker type="date" placeholder="选择日期" v-model="form.year" style="width: 100%;"></el-date-picker>
			</el-col>
			<el-col class="line" :span="2">-</el-col>
			<el-col :span="11">
				<el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
			</el-col>
		</el-form-item>
		<el-form-item label="初始评分">
			<el-input-number v-model="form.score" :min="1" :max="10" :step="0.5"></el-input-number>
		</el-form-item>
		<el-form-item label="漫画类型">
			<el-checkbox-group v-model="form.type">
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
			<el-radio-group v-model="form.dimension">
				<el-radio label="2次元"></el-radio>
				<el-radio label="3次元"></el-radio>
			</el-radio-group>
		</el-form-item>
		<el-form-item label="漫画介绍">
			<el-input type="textarea" v-model="form.des"></el-input>
		</el-form-item>
		<el-form-item label="封面">
			<el-upload
			  action="//jsonplaceholder.typicode.com/posts/"
			  type="drag"
			  :thumbnail-mode="true"
			  :on-preview="handlePreview"
			  :on-remove="handleRemove"
			  :default-file-list="fileList"
			>
			  <i class="el-icon-upload"></i>
			  <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
			  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>
		</el-form-item>
		<el-form-item>
			<el-button type="primary">立即创建</el-button>
			<el-button @click.native.prevent>取消</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          title: '',
          place: '',
          year: '',
          date2: '',
          score: 5,
          type: [],
          dimension: '',
          des: '',
          fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
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
      }
    }
  }
</script>