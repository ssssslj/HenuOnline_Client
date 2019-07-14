<!-- 头部信息 begin -->
<template>
    <div style="height:100%">
		<div id="loading">  
  			<img src="../../static/img/loading.gif" class="img-responsive">  
		</div>
<!-- 头部信息 begin -->
			<div class="aui-header">
				<div class="aui-header-box clearfix">
					<div class="aui-header-logo">
						<a href="index.html">
							<img src="themes/img/logo/logo.png" alt="">
						</a>
					</div>
					<div class="aui-header-sou">
						<a href="search.html">
							<span><i class="aui-iconfont aui-icon-search"></i></span>
						</a>
					</div>
				</div>
				<div class="swiper-container swiper1 b-line">
					<div class="swiper-wrapper">
						<div class="swiper-slide selected">推荐</div>
						<div class="swiper-slide">视频</div>
						<div class="swiper-slide">热点</div>
						<div class="swiper-slide">社会</div>
						<div class="swiper-slide">娱乐</div>
						<div class="swiper-slide">军事</div>
						<div class="swiper-slide">科技</div>
						<div class="swiper-slide">体育</div>
						<div class="swiper-slide">财经</div>
						<div class="swiper-slide">国际</div>
						<div class="swiper-slide">时尚</div>
					</div>
				</div>
			</div>
		<!-- 头部信息 end -->
		<!-- 内容信息 begin -->
			<div class="swiper-container swiper2"  style="height:100%">
				
				<div class="swiper-wrapper"  style="height:100%">
					<!-- 推荐新闻开始 -->
					<scroller :on-refresh="refresh" :on-infinite="infinite" ref="myscroller">
					<div v-bind="ul" class="swiper-no-swiping"  style="height:100%">
						
						<section v-for="(item,index) in articleList" key="item[0]" class="aui-middle-dome">
							<router-link :to="{name:'Content',params:{id:item[0]}}"  data-action-label="click-a" data-tag="news" class="aui-middle-dome-a">
								<div class="aui-middle-dome-title" v-if="(item[2] != '')">
									<h3>{{item[1]}}</h3>
									<div class="aui-middle-dome-text">
										<div class="clearfix">
											<span v-if="item[4]" class="aui-top">置顶</span>
											<span class="aui-title">央视网新闻</span>
                                           
											<span class="aui-comment">观看 {{item[3]}}</span>
										</div>
									</div>
								</div>
								<div class="aui-middle-dome-img">
									<img :src="item[2]" alt="">
								</div>
								<div class="aui-middle-dome-list-box" v-if="(item[2] == '')">
									<h3>{{item[1]}}</h3>
									
									<div class="aui-middle-dome-text">
										<div class="clearfix">
											<span v-if="item[4]" class="aui-top">置顶</span>
											<span class="aui-title">星见娱乐</span>
											
											<span class="aui-comment">观看 {{item[3]}}</span>
										</div>
									</div>
								</div>
							</router-link>
						</section>
						
					</div>
					</scroller>
					<!---推荐新闻结束-->
					

				</div>
							
			</div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

export default {
    name: 'News',
    data(){
        return{
			noDate:false,
        	articleList:[],
        	currentCount:'',
        	currentPage:1,
        	totalCount:'',
	  		totalPage:'',
			images:[],
			type:0,
    	}
  	},
  	methods:{
      	getData(event,type){
			
			var _this = this;
			var i = event;
			var type = type;
			
			let param = new URLSearchParams();
			param.append('currentPage',this.currentPage)
			
			param.append('type',type)

          	this.axios.post('HenuOnline/news_showNews',param)
          	.then(function (response){
				if(i == 1){
					_this.articleList = response.data.news.articleList;
				}else{
					_this.articleList = _this.articleList.concat(response.data.news.articleList)
				}
             	
             	_this.currentCount = response.data.news.currentCount;
              	_this.currentPage = response.data.news.currentPage;
              	_this.totalCount = response.data.news.currentCount;
			  	_this.totalPage = response.data.news.totalPage;
			    if(response.data.news.articleList.length<10 && response.data.news.currentPage!=1){
					_this.noDate = true;
				}
			
          	}).catch(function(error){
              	alert(error)
          	})
	  	},
		refresh () {

			this.currentPage=1;
			this.noDate=false;
			
        	setTimeout(()=>{
				this.getData(1,0);
				
				this.$refs.myscroller.finishPullToRefresh();
				
			
        	},1500)
      	},

      	infinite (done) {
		
			  if(this.noDate){
				  this.$refs.myscroller.finishInfinite(true);
			  }else{
				  	setTimeout(()=>{
						  this.currentPage++;
				
						  this.getData(2,0);
						  
				  		done();
					  },1600);
			  }
		},
	  },
	  
  	mounted(){
		
		$('#loading').delay(1000).hide(0);  
		
     
	},
  	created(){
		this.getData(1,0)
     
  	}
}
</script>
<style scoped>
		body{
			margin:0;
			padding:0;
		}
		.container {
			width: 100%;
		}

		.swiper1 {
			width: 100%;
			background: #efefef;
		}

		.swiper1 .selected {
			color: #ec5566;
		}

		.swiper1 .swiper-slide {
			text-align: center;
			font-size: 14px;
			height: 40px;
			display: -webkit-box;
			display: -ms-flexbox;
			display: -webkit-flex;
			display: flex;
			-webkit-box-pack: center;
			-ms-flex-pack: center;
			-webkit-justify-content: center;
			justify-content: center;
			-webkit-box-align: center;
			-ms-flex-align: center;
			-webkit-align-items: center;
			align-items: center;
			cursor: pointer;
		}

		.swiper2 {
			width: 100%;
		}

		.swiper2 .swiper-slide {
			
			color: #fff;
			text-align: center;
			box-sizing: border-box !important;
			overflow-x: hidden !important;
		}
		#loading  {  
        	position:fixed;  
			width: 100%;
			height: 100%;
			background: #fff;
        	z-index:999;  
		}
	</style>