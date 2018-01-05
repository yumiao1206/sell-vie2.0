<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count>0">{{food.count}}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addcart"></div>
	</div>
</template>

<script type="text/javascript">
import Vue from 'vue'
// 将在各处使用该事件中心
// 组件通过它来通信
var eventHub = new Vue()
 
export default{
	props:{
		food:{
			type:Object
		}
	},
	mounted(){
		// console.log(this.food)
	},
	methods:{
		addcart(event){
			if(!event._constructed){
				return;
			}
			if(!this.food.count){
				// 添加属性
				Vue.set(this.food,'count',1)
			}else{
				this.food.count++
			}
			eventHub.$emit('cart-add', event.target)
		},
		decreaseCart(){
			if(!event._constructed){
				return;
			}
			if(this.food.count){
				this.food.count--
			}
		}
	}
}
</script>

<style type="text/css">
.cartcontrol{
	font-size:0
}
.cartcontrol .cart-decrease{
	display:inline-block;
	padding:6px;
}
.cartcontrol .cart-decrease{
	opacity:1;
}
.cart-decrease .inner{
	line-height:24px;
	font-size:24px;
	color:rgb(0,160,220);
}
/*.move-enter, 
.move-leave-to{
	opacity:0;
	transform: translate3d(24px, 0, 0)
}
.move-enter-active,
.move-leave-active{
	transition: opacity 0.4s
}*/
.cartcontrol .cart-count{
	display:inline-block;
	vertical-align:top;
	width:12px;
	padding-top:6px;
	line-height:24px;
	text-align:center;
	font-size:10px;
	color:rgb(147,153,159);
}
.cartcontrol .cart-add{
	display:inline-block;
	padding:6px;
	line-height:24px;
	font-size:24px;
	color:rgb(0,160,220);
}
</style>