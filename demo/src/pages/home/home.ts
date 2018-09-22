import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { File } from '@ionic-native/file'
import { Printer, PrintOptions } from '@ionic-native/printer';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import * as jsPDF from '../../libs/jspdf/jspdf.min.js'
import * as jsPdfcust from '../../libs/jspdf/index.js'
import * as jsfont from '../../libs/jspdf/default_vfs.js'
jsPdfcust.jsPdfcust(jsPDF);

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

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

  createPDF() {
	let docFormat = {
	  point: 0.353, // 一磅大小 单位mm
	  A4Width: 210, // A4宽度 单位mm
	  A4Height: 297, // A4高度 单位mm
	  top: 26.7, // 上间距 单位mm
	  bottom: 26.7, // 下间距 单位mm
	  left: 17.8, // 左间距 单位mm
	  right:17.8, // 右间距 单位mm
	  titleHeight: 7.8, // 标题高度 单位mm
	  rowHeight: 5.3 // 每行内容高度 单位mm
	};
	let isNailShape = true; // 是否是钉形双向桩
	let offsetCenter = 0; // 居中偏移
	let text = '';　// 打印内容

    let doc = new jsPDF();
    jsfont.jsPDFFont(doc);
    doc.addFont('arial.ttf', 'arial', 'normal');
    doc.setFont('arial');

	doc.setFontSize(18);
	if(isNailShape) {
		text = '钉形双向搅拌桩施工现场原始记录表';
		offsetCenter = (docFormat.A4Width  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
    	doc.text(text, offsetCenter, docFormat.top);
	} else{
		text = '双向搅拌桩施工现场原始记录表';
		offsetCenter = (docFormat.A4Width  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
    	doc.text(text, offsetCenter, docFormat.top);
	}

	let row = 0;
	doc.setFontSize(12);
    doc.text('工程名称:第九项目', docFormat.left, docFormat.top + docFormat.titleHeight);

	row++;
    doc.text('施工单位:杭州城建', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	row++;
    doc.text('桩机编号:ls-1234', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	doc.text('桩坐标(X-Y):12-34', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	if(isNailShape) {
		row++;
    	doc.text('桩号:1234', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('桩间距:12m', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
    	doc.text('水灰比:0.5', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('空搅深度:1m', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

		row++;
		doc.text('设计头桩长:20m', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('设计头桩径:800mm', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('设计头灰量:200kg', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('下钻速度:70cm/min', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

		row++;
		doc.text('设计总桩长:20m', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('设计下桩径:800mm', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('设计下灰量:200kg', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('提升速度:70cm/min', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	} else {
		row++;
    	doc.text('桩号:1234', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('桩间距:12m', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
    	doc.text('水灰比:0.5', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

		row++;
		doc.text('设计桩长:20m', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('设计桩径:800mm', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('设计灰量:200kg', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

		row++;
		doc.text('下钻速度:70cm/min', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('提升速度:70cm/min', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('空搅深度:1m', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	}
	row++;
    doc.text('开始时间: 2018-09-18 12:32', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	row++;
    doc.text('----------------------------------------------------------------------', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	doc.setFontSize(9);
	row++;
	let colWidth = (docFormat.A4Width - docFormat.left - docFormat.right) / 24; // 采用24栅格排版

	text = '深度';
	offsetCenter = (colWidth * 2  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
    doc.text(text, docFormat.left + offsetCenter, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '0.00～0.25';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 2 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '0.25～0.50';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 5 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '0.50～0.75';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 8 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '0.75～1.00';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 11 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '密度';
	offsetCenter = (colWidth * 2  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 14 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '段浆量';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 16 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '灰量';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 19 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '备注';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 22 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	row++;
	text = 'm';
	offsetCenter = (colWidth * 2  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
    doc.text(text, docFormat.left + offsetCenter, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = 'L';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 2 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = 'L';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 5 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = 'L';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 8 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = 'L';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 11 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = 'g/cm3';
	offsetCenter = (colWidth * 2  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 14 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = 'L/m';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 16 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = 'Kg';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 19 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	text = '-';
	offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
	doc.text(text, (colWidth* 22 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	doc.setFontSize(12);
	for(let i = 0; i < 29; i++) {
		row++
		let text = (i + 1).toString();
		offsetCenter = (colWidth * 2  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, docFormat.left + offsetCenter, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = '25';
		offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 2 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = '25';
		offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 5 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = '25';
		offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 8 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = '25';
		offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 11 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = '1.86';
		offsetCenter = (colWidth * 2  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 14 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = '100';
		offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 16 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = '98';
		offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 19 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		text = ' ';
		offsetCenter = (colWidth * 3  - doc.getStringUnitWidth(text) * doc.internal.getFontSize() * docFormat.point) / 2;
		doc.text(text, (colWidth* 22 + docFormat.left + offsetCenter), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	}

	row++;
    doc.text('----------------------------------------------------------------------', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	row++;
    doc.text('结束时间:2018-09-18 12:32', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
    doc.text('成桩时间: 1小时20分', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	row++;
    doc.text('最大下钻速度:40.12cm/min', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
    doc.text('最大提升速度: 80.72cm/min', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	row++;
    doc.text('最大内钻杆电流:120Ａ', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
    doc.text('最大外钻杆电流:120Ａ', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	if(isNailShape) {
		row++;
		doc.text('实际桩长:20m', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('头桩长:2m', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('最大垂直度:1.23％', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('最大转杆转速:3.1ｒ/min', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

		row++;
		doc.text('头桩总浆量:1234.23L', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('平均浆量:12.23L/m', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('总灰量:1234.23Kg', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('平均灰量:123.23Kg', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

		row++;
		doc.text('下桩总浆量:1234.23L', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('平均浆量:12.23L/m', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('总灰量:1234.23Kg', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('平均灰量:123.23Kg', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	} else {
		row++;
		doc.text('实际桩长:20m', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('最大垂直度:1.23％', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('最大转杆转速:3.1ｒ/min', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

		row++;
		doc.text('总浆量:1234.23L', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('平均浆量:12.23L/m', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('总灰量:1234.23Kg', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
		doc.text('平均灰量:123.23Kg', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	}
	row += 2; // 打印设置里边 选择四个要打印的角色名字即可,最多选择四个打印
    doc.text('操作员', docFormat.left, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	doc.text('技术员', ((docFormat.A4Width - docFormat.left - docFormat.right) / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
    doc.text('监理', docFormat.A4Width / 2, docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);
	doc.text('班长', ((docFormat.A4Width - docFormat.left - docFormat.right) * 3 / 4 + docFormat.left), docFormat.top + docFormat.titleHeight + docFormat.rowHeight * row);

	return doc;
  }

  printPage() {
    let that = this;
	let doc = this.createPDF();
    doc.save('a4.pdf') // 浏览器保存用这个
    let blob = doc.output('blob')
    this.file.writeFile(this.file.dataDirectory, 'print.pdf', blob, {replace: true}).then(function (success) {
        // success
	console.log("开始打印");
    let options: PrintOptions = {
         name: 'MyPrint',
         printerId: 'printer001',
         duplex: true,
         landscape: true,
         graystyle: true
       };
    that.printer.print(that.file.dataDirectory + 'print.pdf', options).then(
        result => console.log(' print ok'),
        err=>console.log('print fail')
    );
      }, function (error) {
        // error
        console.log(error);
      });
  }

  ionViewDidLoad() {
-    console.log('ionViewDidLoad HomePage');

    }
}
