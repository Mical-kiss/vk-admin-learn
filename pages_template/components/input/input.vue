<template>
	<view class="page">
		<!-- 页面内容开始 -->
		<vk-data-page-header
			title="Input 表单输入"
			subTitle="聚合输入框"
		></vk-data-page-header>
		<view class="page-body">
			<view class="tips">
				根据type自动渲染的不同的输入框
			</view>
			<view class="mt15">
				<el-radio-group v-model="type">
					<el-radio label="number">数字输入框</el-radio>
					<el-radio label="money">金额输入框</el-radio>
					<el-radio label="percentage">百分比输入框</el-radio>
					<el-radio label="discount">折扣输入框</el-radio>
					<el-radio label="number-box">步进器</el-radio>
					<!-- <el-radio label="json">JSON输入框</el-radio> -->
					<el-radio label="textarea">多行文本输入框</el-radio>
				</el-radio-group>
			</view>
			<view class="mt15">
				<vk-data-input :type="type" v-model="form1.value" :precision="0" width="300px" placeholder="请输入"></vk-data-input>
			</view>
			<view class="mt15 json-view" v-if="form1">
				<pre>
					{{form1}}
				</pre>
			</view>
		</view>
		<!-- 页面内容结束 -->
	</view>
</template>

<script>
	var that;													// 当前页面对象
	var vk = uni.vk;									// vk实例
	export default {
		data() {
			// 页面数据变量
			return {
				// 表单请求数据
				form1:{
					value:""
				},
				type:"number"
			}
		},
		// 监听 - 页面每次【加载时】执行(如：前进)
		onLoad(options = {}) {
			that = this;
			vk = that.vk;
			that.options = options;
			that.init(options);
		},
		// 监听 - 页面【首次渲染完成时】执行。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady(){

		},
		// 监听 - 页面每次【显示时】执行(如：前进和返回) (页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面)
		onShow() {


		},
		// 监听 - 页面每次【隐藏时】执行(如：返回)
		onHide() {


		},
		// 函数
		methods: {
			// 页面数据初始化函数
			init(options){

			}
		},
		// 计算属性
		computed:{

		}
	}
</script>
<style lang="scss" scoped>

</style>
