# sell-vue2.0

@(这是我第一次使用github上传代码，对于readme.md文档的语法不是很熟悉，写的不好的地方希望希望大家多多包涵)

**sell-vue2.0**模仿的是慕课网的饿了么点餐页面，慕课网网上的教程是基于vue1.0的，这个版本是基于vue2.0的，对于vue1.0和vue2.0的语法有哪些不同之处，大家可以到官网去查看官方文档，下载源码之后就可以运行看到效果，用到的知识点主要有一下方面：
 
- **vue2.0** ：基于vue2.0的语法，对于vue2.0的语法要有一定的基础，对于vue1.0和vue2.0之间的迁徙要有一定的了解；
- **es6** ：代码中大量采用es6的语法，对于es6语法不熟悉的同学可以去学习一下es6的语法；
- **vue-resource** ：引入vue-resource插件，可以基于全局的Vue对象使用http，也可以基于某个Vue实例使用http，使用http请求来发送http请求来获取数据；
- **better-scroll** ：引入better-scroll插件来实现滚动效果，在初始化better-scroll时要考虑到vue中的dom元素渲染完成，this.$nextTick来保证dom元素加载完成载初始化better-scroll；
-  **vue-router** ：路由，其实就是指向的意思，当我点击页面上的home按钮时，页面中就要显示home的内容，如果点击页面上的about 按钮，页面中就要显示about 的内容。Home按钮  => home 内容， about按钮 => about 内容，也可以说是一种映射. 所以在页面上有两个部分，一个是点击部分，一个是点击之后，显示内容的部分 ；
-  **component** ：在写代码的时候，要考虑到把一些公用的代码抽象成组件， 组件可以使代码更加方便的实现复用，但随之要考虑到的是子父组件之间的通信问题，父组件向子组件传值，可以使用自定义自属性传递，在子组件中使用props接收父组件中传递过来的参数。子组件向父组件传值时要使用$emit触发自定义事件，在父组件中监听自定义事件获取到参数；

-------------------

## sell-vue2.0

> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。以下内容是对Markdown语法的一些小尝试，与项目内容无关   

正如您在阅读的这份文档，它使用简单的符号标识不同的标题，将某些文字标记为**粗体**或者*斜体*，创建一个[链接](https://github.com)或一个脚注[^demo]。下面列举了几个高级功能，更多语法请按`Ctrl + /`查看帮助。 

### 代码块
``` python
<ul id="example-1">
  <li v-for="item in items">
    {{ item.message }}
  </li>
</ul>
var example1 = new Vue({
  el: '#example-1',
  data: {
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

### 表格
| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |
| Pipe      |    1 USD | 234  |

### 流程图
```flow
st=>start: Start
e=>end
op=>operation: My Operation
cond=>condition: Yes or No?

st->op->cond
cond(yes)->e
cond(no)->op
```

以及时序图:

```sequence
Alice->Bob: Hello Bob, how are you?
Note right of Bob: Bob thinks
Bob-->Alice: I am good thanks!
```

### 复选框

使用 `- [ ]` 和 `- [x]` 语法可以创建复选框，实现 todo-list 等功能。例如：

- [ ] 已完成事项
- [ ] 待办事项1
- [ ] 待办事项2
- [ ] 已完成事项  


