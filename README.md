整个思路是通过自己制作pdf文件,然后传给安卓打印框架打印.移植文件在portable-files目录下, 设计思路见[ionic安卓打印终极解决方案,支持USB打印](http://bigxiangbaobao.com/blog/2018/09/22/ionic%E5%AE%89%E5%8D%93%E6%89%93%E5%8D%B0%E7%BB%88%E6%9E%81%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88,%E6%94%AF%E6%8C%81USB%E6%89%93%E5%8D%B0/)

### 1安装需要用到的插件 ,一共三个,权限管理插件,打印插件,文件操作插件

权限管理需要程序运行起来就检查,打印功能需要文件存储的权限,否则无法打印.如果用浏览器查看打印效果,需要把权限管理代码屏蔽一下.这部分代码在浏览器执行会报错
安装
$ ionic cordova plugin add cordova-plugin-android-permissions
$ npm install --save @ionic-native/android-permissions

代码如下:
```
   constructor(public navCtrl: NavController, private nativePageTransitions: NativePageTransitions, private androidPermissions: AndroidPermissions, private printer: Printer, private file: File) {
   let that =this
   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE).then(
        result => {
			console.log('Has permission?' + result.hasPermission);
			if(!result.hasPermission) {
				that.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
			}
		},
        err => that.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
   );
   this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
        result => {
			console.log('Has permission?' + result.hasPermission)
			if(!result.hasPermission) {
				that.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
			}
		},
        err => that.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
   );
  }

```

打印插件
安装
$ ionic cordova plugin add cordova-plugin-printer
$ npm install --save @ionic-native/printer

文件操作插件


### 2.修改插件库和拷贝js包
把libs目录拷贝到src目录下,打印需要的库就在这里边
使用前需要先导入并执行一个初始化函数
```
import * as jsPDF from '../../libs/jspdf/jspdf.min.js'
import * as jsPdfcust from '../../libs/jspdf/index.js'
import * as jsfont from '../../libs/jspdf/default_vfs.js'
jsPdfcust.jsPdfcust(jsPDF);

```
用我修改过的Printer.java 替换./platforms/android/src/de/appplant/cordova/plugin/printer/Printer.java

### 3.参考home.ts或者portable-files/example.ts,构造自己的格式进行打印


### 备注
如果只是需要先测试打印效果,只是用libs下的库即可测试,浏览器保存pdf文件用doc.save
