<template>
    <div>
		<div id="loading">  
  			<img src="../../static/img/loading.gif" class="img-responsive">  
		</div>


	<div class="aui-main">
		<article class="article padding-side">
			<div>
				<h1 class="article-title">{{title}}</h1>
			</div>
			<div class="article-content">
				{{content}}
			</div>
		</article>
	</div>

	<div class="aui-card-list-content">
		<div class="aui-bg-like"><i class="aui-iconfont aui-icon-like"></i> 3899 人喜欢</div>
		<div class="aui-share-icon clearfix">
			<div class="aui-share-line b-line clearfix">
				<h2>分享到</h2>
			</div>
			<ul class="clearfix" style="padding-top:15px; padding-bottom:10px;">
				<li><i class="aui-iconfont aui-icon-wechat"></i></li>
				<li><i class="aui-iconfont aui-icon-wechat-circle"></i></li>
				<li><i class="aui-iconfont aui-icon-weibo" style="color:#ff6178"></i></li>
			</ul>
		</div>

		<div class="aui-card-list">
			<div class="aui-card-list-header" style="padding-bottom:0">
				<h3>帕托撩迪丽热巴!自认长相完爆鹿晗!要修成</h3>
			</div>
			<div class="aui-card-list-content-padded" style="padding-top:0">
				<div class="aui-row aui-row-padded">
					<div class="aui-col-xs-4">
						<img src="themes/img/ad/a2.jpg" />
					</div>
					<div class="aui-col-xs-4">
						<img src="themes/img/ad/a2.jpg" />
					</div>
					<div class="aui-col-xs-4">
						<img src="themes/img/ad/a2.jpg" />
					</div>
				</div>
			</div>
		</div>
	</div>
	
	</div>
    </div>
</template>
<script>
     
export default {
	name:'Content',
	data(){
		return{
			title:'',
			content:'',
			author:'',
			date:'',
			views:''
		}
	},
	methods:{
		getData(){
			var _this = this;
		    let param = new URLSearchParams();
			param.append('id',this.$route.params.id)
			
			this.axios.post('HenuOnline/news_showContent',param)
            .then(function (response){
               
                _this.title = response.data.news.title;
                _this.author = response.data.news.author;
                _this.content = response.data.news.content;
                _this.date = response.data.news.date;
			    _this.views = response.data.news.views;
			    $(".article-content").html(_this.content)

            }).catch(function(error){
                alert(error)
            })
		},
		
	},
	created(){
		this.getData();
		       
	},
	mounted(){
		
        $('#loading').delay(1000).hide(0);  
     
	}
	
}
</script>
<style>
     #loading  
    {  
        position:fixed;  
		width: 100%;
		height: 100%;
		background: #fff;
        z-index:999;  
	}  
	
</style>

