<template>
	<div class="header">
		<div class="content-wrapper">
			<div class="avatar">
				<img width="64" height="64" :src="seller.avatar">
			</div>
			<div class="content">
				<div class="title">
					<span class="brand"></span>
					<span class="name">{{seller.name}}</span>
				</div>
				<div class="description">
					{{seller.description}}/{{seller.deliveryTime}}分钟送达
				</div>
				<div v-if="seller.supports" class="support">
					<span class="icon" :class="classMap[seller.supports[0].type]"></span>
					<span class="text">{{seller.supports[0].description}}</span>
				</div>
			</div>
			<div v-if="seller.supports" class="support-count" @click="detailShow=true">
				<span class="count">{{seller.supports.length}}个</span>
				<i class=" icon-keyboard_arrow_right"></i>
			</div>
		</div>
		<div class="bulletin-wrapper" @click="detailShow=true">
			<span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
			<i class="icon-keyboard_arrow_right"></i>
		</div>
		<div class="background">
			<img :src="seller.avatar" width="100%" height="100%">
		</div>
		<transition name="fade">
			<div class="detail" v-show="detailShow" transition="fade">
				<div class="detail-wrapper clearfix">
					<div class="detail-main">
						<h1 class="name">{{seller.name}}</h1>
						<div class="star-wrapper">
							<star :size="48" :score="seller.score"></star>
						</div>
						<div class="title">
							<div class="line"></div>
							<div class="text">优惠信息</div>
							<div class="line"></div>
						</div>
						<ul v-if="seller.supports" class="supports">
							<li class="support-item" v-for="(item,index) in seller.supports">
								<span class="icon" :class="classMap[seller.supports[index].type]"></span>
								<span class="text">{{seller.supports[index].description}}</span>
							</li>
						</ul>
						<div class="title">
							<div class="line"></div>
							<div class="text">商家公告</div>
							<div class="line"></div>
						</div>
						<div class="bulletin">
							<p class="content">{{seller.bulletin}}</p>
						</div>
					</div>
				</div>
				<div class="detail-close">
					<i class="icon-close" @click="detailShow=false"></i>
				</div>
			</div>
		</transition>	
	</div>
</template>

<script type="text/javascript">
import star from "../star/star"

export default{
	props:{
		seller:{
			type:Object,
		}
	},
	data(){
		return {
			detailShow:false,
			classMap:[],
		}
	},
	mounted(){
		this.classMap=["decrease","discount","special","invoice","guarantee"]
	},
	components:{
		star,
	}
}
</script>

<style type="text/css" scoped>
/*@import "../../common/stylus/icon.css"*/
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s
}
.fade-enter, .fade-leave-to  {
  opacity: 0
}
.header{
	color:#fff;
	position:relative;
	background:rgba(7,17,27,0.5);
	overflow: hidden;
	height:134px;
}
.content-wrapper{
	padding:24px 12px 18px 24px;
	font-size:0;
	position:relative;
}
.avatar{
	display: inline-block;
	vertical-align: top;
}
.avatar img{
	border-radius:2px;
}
.content{
	display:inline-block;
	font-size:14px;
	margin-left:16px;
}
.content .title{
	margin:2px 0 8px 0;
}
.content .title .brand{
	display:inline-block;
	width:30px;
	height:18px;
	background-image:url(brand@2x.png);
	background-size:30px 18px;
	background-repeat: no-repeat;
	vertical-align: top;
}
.content .title .name{
	margin-left:6px;
	font-size:16px;
	line-height:18px;
	font-weight:bold;
}
.content .description{
	margin-bottom:10px;
	line-height:12px;
	font-size:12px;
}
.content .support .icon{
	display:inline-block;
	vertical-align: top;
	width:12px;
	height:12px;
	margin-right:5px;
	background-size:12px 12px;
}
.content .support .decrease{
	background-image:url(decrease_1@2x.png);
}
.content .support .discount{
	background-image:url(discount_1@2x.png);
}
.content .support .guarantee{
	background-image:url(guarantee_1@2x.png);
}
.content .support .invoice{
	background-image:url(invoice_1@2x.png);
}
.content .support .special{
	background-image:url(special_1@2x.png);
}
.content .support .text{
	display: inline-block;
	font-size:12px;
	line-height:10px;
}
.support-count{
	position:absolute;
	right:12px;
	bottom:14px;
	padding:0 8px;
	height:24px;
	line-height:24px;
	border-radius:14px;
	background:rgba(0,0,0,0.2);
	text-align: center;
}
.support-count .count{
	font-size:10px;
	vertical-align: top;
}
.support-count .icon-keyboard_arrow_right{
	font-size:10px;
	line-height:24px;
	margin-left:2px;
}
.bulletin-wrapper{
	height:28px;
	line-height:28px;
	padding:0 22px 0 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	/*font-size:0;*/
	position: relative;
	background:rgba(7,17,27,0.2);
}
.bulletin-title{
	vertical-align: top;
	display:inline-block;
	width:22px;
	height:12px;
	background-image:url(bulletin@2x.png);
	background-size:22px 12px;
	background-repeat: no-repeat;
	margin-top: 8px;
}
.bulletin-text{
	vertical-align: top;
	font-size:10px;
	margin:0 4px;
}
.bulletin-wrapper .icon-keyboard_arrow_right{
	position: absolute;
	font-size:10px;
	right:12px;
	top:8px;
}
.background{
	position:absolute;
	top:0;
	left:0;
	width:100%;
	height:100%;
	z-index:-1;
	filter:blur(10px);
}
.detail{
	position:fixed;
	z-index:100;
	width:100%;
	height:100%;
	overflow:auto;
	background:rgba(7,17,27,0.8);
	top:0;
	left:0;
	backdrop-filter:blur(10px);
}
.detail-wrapper{
	min-height:100%;
	width:100%;
}
.detail-wrapper .detail-main{
	margin-top:64px;
	padding-bottom:64px;
}
.detail-main .name{
	line-height:16px;
	font-size:16px;
	font-weight:700;
	text-align:center;
}
.detail-main .star-wrapper{
	margin-top:18px;
	padding:2px 0;
	text-align:center;
}
.detail-main .title{
	width:80%;
	margin:28px auto 24px auto;
	display:flex;
}
.detail-main .title .line{
	position:relative;
	top:-6px;
	flex:1;
	border-bottom:1px solid rgba(255,255,255,0.2);
}
.detail-main .title .text{
	padding:0 12px;
	font-size:14px;
	font-weight:700;
}
.detail-main .supports{
	width:80%;
	margin:0 auto;
}
.detail-main .supports .support-item{
	padding:0 12px;
	margin-bottom:12px;
	font-size:0;
}
.detail-main .supports .support-item:last-child{
	margin-bottom:0;
}
.support-item .icon{
	display: inline-block;
	width: 16px;
	height:16px;
	vertical-align: top;
	margin-right:6px;
	background-size:16px 16px;
	background-repeat:no-repeat;
}
.support-item .decrease{
	background-image:url(decrease_2@2x.png);
}
.support-item .discount{
	background-image:url(discount_2@2x.png);
}
.support-item .guarantee{
	background-image:url(guarantee_2@2x.png);
}
.support-item .invoice{
	background-image:url(invoice_2@2x.png);
}
.support-item .special{
	background-image:url(special_2@2x.png);
}
.support-item .text{
	font-size:12px;
	line-height:16px;
}
.detail-main .bulletin{
	width:80%;
	margin:0 auto;
}
.detail-main .bulletin .content{
	padding:0 12px;
	line-height:24px;
	font-size:12px;
}
.detail-close{
	position:relative;
	width:32px;
	height:32px;
	margin:-64px auto 0 auto;
	clear:both;
}
.detail-close .icon-close{
	font-size:32px;
}

</style>