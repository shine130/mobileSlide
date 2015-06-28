/**
* @author shine
* @blog http://blog.ipsfan.com/
* @version 0.1
* @email:shine130@vip.qq.com
*/ 
function slider(opts){
	this.wrapId=opts.domId;
	this.wrap=document.getElementById(opts.domId);
	this.init();
	this.renderDOM();
	this.bindDom();
}
slider.prototype.init=function(){
	this.radio=window.innerHeight/window.innerWidth;
	this.slideWidth=window.innerWidth;
	this.slideHeight=window.innerHeight;
	this.idx=0;
};
slider.prototype.renderDOM=function(){
	var scaleW=this.slideWidth;
		scaleH=this.slideHeight;
		li=document.querySelectorAll('#'+this.wrapId+" li"),
		imgObjs=document.querySelectorAll('#'+this.wrapId+" li img"),
		liLen=li.length;
	for(var i=0; i<liLen; i++){
		var imgHeight=imgObjs[i].height,
			imgWidth=imgObjs[i].width;
		li[i].style.width=scaleW+'px';
		li[i].style.height=scaleH+'px';
		li[i].style.webkitTransform ='translate3d('+ i*scaleW +'px,0,0)';
		if(imgHeight/imgWidth > this.radio){
			imgObjs[i].style.height=scaleH+"px";
		}else{
			imgObjs[i].style.width=scaleW+"px";
			
		}
	}
};

slider.prototype.bindDom=function(){
	var _this=this,
		scaleW=this.slideWidth,
		li=document.querySelectorAll('#'+this.wrapId+" li"),
		outer=document.querySelector('#'+this.wrapId+" ul"),
		liLen=li.length,
		startHandler=function(evt){
			_this.startX=evt.touches[0].pageX;
			_this.offsetX=0;
			_this.startTime=new Date()*1;
		},
		moveHandler=function(evt){
			evt.preventDefault();
			var i=_this.idx-1,
				m=i+3;
			_this.offsetX=evt.touches[0].pageX-_this.startX;
			for(i;i<m;i++){
				li[i] && (li[i].style.webkitTransform='translate3d('+ ((i-_this.idx)*scaleW+_this.offsetX) +'px,0,0)');
				li[i] && (li[i].style.webkitTransition='none');
			}

		},
		endHandler=function(evt){
			var boundary=scaleW/6, //拖动的边界值
				endTime=new Date()*1;
			if(endTime-self.startTime>800){
				if(_this.offsetX>=boundary){
				//进入上一页
				_this.go('-1');
				}else if(_this.offsetX<-boundary){
				//进入下一页
				_this.go('+1');
				}else{
				//留在本页
				_this.go('0');
				}
			}else{
				//快操作优化
				if(_this.offsetX>50){
					_this.go('-1');
				}else if(_this.offsetX<-50){
					_this.go('+1');
				}else{
					_this.go('0');
				}
			}
			
		};

		outer.addEventListener('touchstart',startHandler);
		outer.addEventListener('touchmove',moveHandler);
		outer.addEventListener('touchend',endHandler);

};

slider.prototype.go=function(n){
	var idx=this.idx,
		scaleW=this.slideWidth,
		cidx,
		li=document.querySelectorAll('#'+this.wrapId+" li"),
		liLen=li.length;
	if(typeof n=='number'){
		cidx=idx;
	}else if(typeof n =='string'){
		cidx=idx+n*1;
	}
	//当索引右超出
	if(cidx>liLen-1){
		cidx=liLen-1;
	}else if(cidx<0){
		cidx=0;
	}
	this.idx=cidx;
	li[cidx].style.webkitTransition='-webkit-transform 0.2s ease-out';
	li[cidx-1] && (li[cidx-1].style.webkitTransition='-webkit-transform 0.2s ease-out');
	li[cidx+1] && (li[cidx+1].style.webkitTransition='-webkit-transform 0.2s ease-out');
	li[cidx].style.webkitTransform='translate3d(0,0,0)';
	li[cidx-1] && (li[cidx-1].style.webkitTransform='translate3d(-'+ scaleW +'px, 0, 0)');
	li[cidx+1] && (li[cidx+1].style.webkitTransform='translate3d('+scaleW+'px, 0, 0)');

};

