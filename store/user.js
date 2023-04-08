export default {
	// 开启命名空间
	namespaced: true,
	
	// 数据
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') || '{}'),
		token: uni.getStorageSync('token') || '',
		userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
		// 重定向的 object 对象
		redirectInfo: null
	}),
	
	// 方法
	mutations:{
		// 更新收货地址
		updateAddress(state,address){
			state.address = address
			this.commit('m_user/saveAddressToStorage')
		},
		
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		
		updateUserInfo(state,userInfo){
			state.userInfo = userInfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		
		saveUserInfoToStorage(state){
			uni.setStorageSync('userInfo',JSON.stringify(state.userInfo))
		},
		
		updateToken(state,token){
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state){
			uni.setStorageSync('token',state.token)
		},
		
		updateRedirectInfo(state,info){
			state.redirectInfo = info
		}
		
	},
	
	getters: {
		addstr(state){
			if(!state.address.provinceName) return ''
			
			return state.address.provinceName + state.address.cityName + state.address.detailInfo
		}
	}
	
}