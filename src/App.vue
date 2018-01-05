<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import vHeader from "./components/header/header"
import {urlParse} from './common/js/util'

const ERR_OK=0

export default {
  data(){
    return {
      seller:{
        id:(()=>{
          let queryParam=urlParse();
          return queryParam.id
        })()
      },
    }
  },
  components:{
    vHeader, 
  },
  mounted(){
    this.$http.get('/api/seller?id='+this.seller.id).then((res)=>{
      res=res.body
      if(res.errno==ERR_OK){
        // this.seller=res.data
        this.seller=Object.assign({},this.seller,res.data)
        // console.log(this.seller.id)
      }
    },(res)=>{
      console.log(res)
    })
  },
}
</script>

<style type="text/css">

body,html{
  line-height:1;
  font-weight: 200;
  font-family:"PingFang SC","STHeitiSC-light","Helvetica-light",arial,sans-serif;
}
.clearfix{
     display: inline-block;
}
.clearfix:after {
     content: ".";
     display: block;
     height: 0;
     clear: both;
     visibility: hidden;
}    
.tab{
  display: flex;
  width:100%;
  height:40px;
  line-height:40px;
  box-shadow: inset 0px -1px 1px -1px rgba(7,17,27,0.1);
  /*border-bottom:1px solid rgba(7,17,27,0.1);*/
}
.tab-item{
  flex:1;
  text-align:center;
}
.tab-item a{
  display:block;
  font-size:14px;
  color:rgb(77,85,93);
}
.tab-item a.active{
  color:rgb(240,20,20);
}
</style>
