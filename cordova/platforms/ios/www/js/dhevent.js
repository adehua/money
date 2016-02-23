/**
事件处理
IE
1、attactEvent 添加事件
2、detactEvent 删除事件
DOM
1、addEventListener 添加事件
2、removeEventlistener 删除事件
事件对象
IE
1、type获取属性的事件类型
2、target获取事件目标
3、stopPropagation()方法 用于阻止事件冒泡
4、preventDefault()方法 用于阻止事件的默认行为
DOM
1、type获取属性的事件类型
2、srcElement获取事件目标
3、cancelBubble属性 用于阻止事件冒泡
4、returnValue属性 用于阻止事件的默认行为
*/

var dhEvent = {
	addHandler:function(element,type,handler){
		 if(element.addEventListener){	//谷歌下添加事件
		 	element.addEventListener(type,handler,false);
		 }else if(element.attachEvent){	//IE下添加事件
		 	element.attachEvent('on' + type,handler);
		 }else{//低版本下添加事件
		 	element['on'+type] = handler;
		 }
	},
	removeHandler:function(element,type,handler){
		if(element.removeEventlistener){//谷歌下删除事件
			element.removeEventlistener(element,type,handler);
		}else if(element.detachEvent){//IE下删除事件
			element.detachEvent('on' + type,handler);
		}else{//低版本下删除事件
			element['on'+type] = null;
		}
	},
	getEvent:function(event){	//获取事件 DOM:IE
		return event?event : window.event;
	},
	getType:function(event){	//获取事件类型 
		return event.type;
	},
	getElement:function(event){	//获取事件来自哪个元素  DOM:IE
		return event.target || event.srcElement;
	},
	preventDefault:function(event){	//阻止事件的默认行为
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue = false;
		}
	},
	stopPropagation:function(event){	//阻止事件冒泡
		if(event.stopPropagation){
			event.stopPropagation();
		}else{
			event.cancelBubble = true;
		}
	}
}

function getByClass(clsName,parent){
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');
  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}