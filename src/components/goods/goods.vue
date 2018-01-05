<template>
	<div class="goods">
		<div class="menu-wrapper" ref="menuWrapper">
			<ul>
				<li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
					<span class="text">
						<span v-if="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
					</span>
				</li>
			</ul>
		</div>
		<div class="foods-wrapper" ref="foodsWrapper">
			<ul>
				<li v-for="item in goods" class="food-list food-list-hook">
					<h1 class="title">{{item.name}}</h1>
					<ul>
						<li @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item" >
							<div class="icon">
								<img :src="food.icon" width="57" height="57">
							</div>
							<div class="content">
								<h2 class="name">{{food.name}}</h2>
								<p class="desc">{{food.description}}</p>
								<div class="extra">
									<span class="count">月售{{food.sellCount}}份</span>
									<span>好评率{{food.rating}}%</span>
								</div>
								<div class="price">
									<span class="now">¥{{food.price}}</span>
									<span class="old" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
								</div>
								<div class="cartcontrol-wrapper">
									<cartcontrol :food="food"></cartcontrol>
								</div>
							</div>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<shopcart :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcart>
		<food :food="selectedFood" ref="food"></food>
	</div>
	
</template>

<script type="text/javascript">
import BScroll from "better-scroll"
import shopcart from "../shopcart/shopcart"
import cartcontrol from "../cartcontrol/cartcontrol"
import food from "../food/food"

const ERR_OK=0

export default{
	props:{
		seller:{
			type:Object
		},
	},
	components:{
		shopcart,
		cartcontrol,
		food,
	},
	data(){
		return {
			goods:[],
			classMap:[],
			listHeight:[],
			scrollY:0,
			selectedFood:{},
		}
	},
	computed:{
		currentIndex(){
			for(let i=0;i<this.listHeight.length;i++){
				let height1=this.listHeight[i]
				let height2=this.listHeight[i+1]
				if(!height2 || (this.scrollY>=height1&&this.scrollY<height2)){
					return i
				}
			}
			return 0
		},
		selectFoods(){
			let foods=[]
			this.goods.forEach((good)=>{
				good.foods.forEach((food)=>{
					if(food.count){
						foods.push(food)
					}
				})
			})
			return foods
		}
	},
	mounted(){
		this.classMap=["decrease","discount","special","invoice","guarantee"]
		this.$http.get('/api/goods').then((res)=>{
			res=res.body
			if(res.errno==ERR_OK){
				this.goods=res.data
				this.$nextTick(()=>{
					this._initScroll()
					this._calculateHeight()
				})
			}
		},(res)=>{
			console.log(res)
		})
	},
	methods:{
		selectFood(food,event){
			if(!event._constructed){
				return;
			}
			this.selectedFood=food
			this.$refs.food.show()
		},
		selectMenu(index,event){
			if(!event._constructed){
				return;
			}
			let foodsList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
			let el=foodsList[index]
			this.foodsScroll.scrollToElement(el,300)
		},
		_initScroll(){
			// let menuWrapper = document.querySelector('.menu-wrapper')
			// let foodsWrapper = document.querySelector('.foods-wrapper')
			this.menuScroll=new BScroll(this.$refs.menuWrapper,{
				click:true
			})           
			this.foodsScroll=new BScroll(this.$refs.foodsWrapper,{
				click:true,
				probeType:3
			})
			this.foodsScroll.on("scroll",(pos)=>{
				this.scrollY=Math.abs(Math.round(pos.y))
			})
		},
		_calculateHeight(){
			let foodList=this.$refs.foodsWrapper.getElementsByClassName("food-list-hook")
			let height=0
			this.listHeight.push(height)
			for(let i=0;i<foodList.length;i++){
				let item=foodList[i]
				height+=item.clientHeight
				this.listHeight.push(height)
			}
		},
	}
}
</script>

<style type="text/css" scoped>
.goods{
	position:absolute;
	top:174px;
	width:100%;
	bottom:46px;
	display:flex;
	overflow: hidden;
} 
.menu-wrapper{
	flex:0 0 80px;
	width:80px;
	background:#f3f5f7;
}
.menu-item{
	display:table;
	height:54px;
	width:56px;
	line-height:14px;
	padding:0 12px;
}
.menu-item.current{
	position:relative;
	margin-top:-1px;
	z-index:10;
	background:#fff;
	font-weight:700;
}
.menu-item.current .text{
	box-shadow:none;
}
.menu-item .text{
	font-size:12px;
	display:table-cell;
	width:56px;
	vertical-align: middle;
	box-shadow: inset 0px -1px 1px -1px rgba(7,17,27,0.1);
}
.menu-item .icon{
	display:inline-block;
	vertical-align: top;
	width:12px;
	height:12px;
	margin-right:2px;
	background-size:12px 12px;
	background-repeat:no-repeat;
}
.menu-item .decrease{
	background-image:url(decrease_3@2x.png);
}
.menu-item .discount{
	background-image:url(discount_3@2x.png);
}
.menu-item .guarantee{
	background-image:url(guarantee_3@2x.png);
}
.menu-item .invoice{
	background-image:url(invoice_3@2x.png);
}
.menu-item .special{
	background-image:url(special_3@2x.png);
}
.foods-wrapper{
	flex:1;
}
.foods-wrapper .title{
	padding-left:14px;
	height:26px;
	line-height:26px;
	border-left:2px solid #d9dde1;
	font-size:12px;
	color:rgb(147,153,159);
	background:#f3f5f7;
}
.foods-wrapper .food-item{
	display:flex;
	margin:18px;
	padding-bottom:18px;
	box-shadow: inset 0px -1px 1px -1px rgba(7,17,27,0.1);
	position:relative;
}
.foods-wrapper .food-item:last-child{
	box-shadow:none;
	margin-bottom:0;
}
.food-item .icon{
	flex:0 0 57px;
	margin-right: 10px;
}
.food-item .content{
	flex:1;
}
.food-item .content .name{
	font-size:14px;
	margin:2px 0 8px 0;
	height:14px;
	line-height:14px;
	color:rgb(7,17,27);
	font-weight:700;
}
.food-item .content .desc,
.food-item .content .extra{
	line-height:10px;
	font-size:10px;
	color:rgb(147,153,159);
}
.food-item .content .desc{
	margin-bottom:8px;
	line-height:12px;
}
.food-item .content .extra .count{
	margin-right:12px;
}
.food-item .content .price{
	line-height:24px;
	font-weight:700;
}
.food-item .content .price .now{
	margin-right:8px;
	font-size:14px;
	color:rgb(240,20,20);
}
.food-item .content .price .old{
	text-decoration: line-through;
	font-size: 10px;
	color:rgb(147,153,159);
}
.cartcontrol-wrapper{
	position:absolute;
	right:0;
	bottom:10px;
}
</style>