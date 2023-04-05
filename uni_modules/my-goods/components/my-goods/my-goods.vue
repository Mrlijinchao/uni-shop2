<template>
	<view>
		<view class="goods-item">
		<!-- 左侧的盒子 -->
		<view class="goods-item-left">
			<image :src="goods.goods_small_logo || defaultPic"
			class="goods-pic"></image>
		</view>
		<!-- 右侧的盒子 -->
		<view class="goods-item-right">
			<!-- 商品的名字 -->
			<view class="goods-name">{{goods.goods_name}}</view>
			<view class="goods-info-box">
				<view class="goods-price">{{goods.goods_price | tofixed}}</view>
			</view>
		</view>
		</view>
	</view>
</template>
<script>
	export default{
		props: {
			goods:{
				type: Object,
				default: {}
			}
		},
		data() {
			return{
				// 默认的图片
				defaultPic: 'https://desk-fd.zol-img.com.cn/t_s960x600c5/g4/M06/06/0B/Cg-4zFTv4zmINhM9ABX5yHpH5GYAAVpZgI6vOUAFfng315.jpg',
				
			};
		},
		filters:{
			tofixed(num) {
				return Number(num).toFixed(2)
			}
		}
	}
</script>
<style lang="scss">
	.goods-item{
		display: flex;
		padding: 10px 5px #f0f0f0;
		border-bottom: 1px solid;
		.goods-item-left{
			margin-right: 5px;
			.goods-pic{
				width: 100px;
				height: 100px;
				display: block;
			}
		}
		.goods-item-right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.goods-name{
				font-size: 13px;
			}
			.goods-info-box{
				.goods-price{
					color: #C00000;
					font-size: 16px;
				}
			}
		}
	}
	
</style>
