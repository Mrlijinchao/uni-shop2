<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" @click="getUserProfile">一键登录</button>
		<!-- <button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button> -->
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>
<script>
	import {mapState,mapMutations} from 'vuex'
	
	export default{
		data(){
			return {
				
			}
		},
		
		computed:  {
			...mapState('m_user',['redirectInfo'])
		},
		
		methods: {
			...mapMutations('m_user',['updateUserInfo','updateToken','updateRedirectInfo']),
			// getUserInfo(e){
			// 	console.log(e)
				
			// 	if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('你取消了登录授权！')
				
			// 	this.updateUserInfo(e.detail.userInfo)
			// 	this.getToken(e.detail)
				
			// },
			
			// async getToken(info){
			// 	// 获取 code 对应的值
			// 	const [err,res] = await uni.login().catch(err => err)
			// 	if(err || res.errMsg !== 'login:ok') return uni.$showMsg("登录失败")
				
			// 	// 准备参数
			// 	const query = {
			// 		code: res.code,
			// 		encryptedData: info.encryptedData,
			// 		iv:info.iv,
			// 		rawData: info.raw,
			// 		signature: info.signature
			// 	}
				
			// 	const {data: loginResult} = await uni.$http.post('api/public/v1/users/wxlogin',query)
			// 	console.log(loginResult)
				
			// }
			
			
			
			
			// 用户授权之后，获取用户的基本信息
			async getUserProfile(e){
				// console.log(e)
				
				// if(e.detail.errMsg === 'getUserInfo:fail auth deny') return uni.$showMsg('你取消了登录授权')
				// console.log(e.detail.userInfo)
				
				// const user = uni.getUserProfile()
				// console.log(user)
				
				uni.getUserProfile({
				     desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				     success: (res) => {
				       
				         console.log(res.userInfo)
						 this.updateUserInfo(res.userInfo)
						 this.getToken(res.userInfo)
				     },
					 fail() {
					 	uni.$showMsg("用户未授权！")
					 }
				   })
				
			},
			
			async getToken(){
				// 获取code对应的值
				const [err,res] = await uni.login(err => err)
				console.log(res)
				if(err || res.errMsg !== 'login:ok') return uni.$showMsg("登录失败")
				
				//请求服务器 如果返回 200 就登陆成功（这里由于没有自己的服务器后台，就不发请求了）
				
				this.updateToken("Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
				this.navigateBack()
			},
			 
			navigateBack(){
				if(this.redirectInfo && this.redirectInfo.openType === 'switchTab'){
					uni.switchTab({
						url: this.redirectInfo.from,
						complete: () => {
							this.updateRedirectInfo(null)
						}
					})
				}
			}
			
		}
		
	}
</script>
<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: white;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	
	&::after{
		content: ' ';
		display: block;
		width: 100%;
		height: 40px;
		background-color: #F8F8F8;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	
	.btn-login{
		width: 90%;
		border-radius: 100px;
	}
	.tips-text{
		margin-top: 10px;
		font-size: 12px;
		color: gray;
	}
}
</style>
