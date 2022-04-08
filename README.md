身处上海，抢菜很难。更难的是，每天 5:50 起床还抢不到菜，搞得人身心俱疲。今天发现了一个可以在安卓机上运行脚本的工具——[Auto.js](https://g.pro.autojs.org/docs/#/zh-cn/)，简单的写了个脚本用来抢菜。

## 开发步骤：

1. 下载 `Auto.js` 安装包，目前官网提供的是 `Auto.js Pro`，是收费的，45 块钱买断制，还是良心的，建议大家购买。不过这里也分享一下免费版本(非破解版，是开始收费前的免费版，网上听说很多版本是有毒的，这个是我以身试毒后确认无毒的，大家可放心使用)—— 链接: https://pan.baidu.com/s/1zBTij7imoLCKf1bm7HtY6Q 提取码: n9jc --来自百度网盘超级会员 v3 的分享

2. 安装软件后，开启应用的**无障碍**和**悬浮窗**功能。

![image-20220406221255685](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220406221255685.png)

3. 可以使用悬浮窗的工具来检查 app 的元素。

   ![image-20220406225906556](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220406225906556.png)

   ![image-20220406225941640](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220406225941640.png)

4. 打开 VS Code，安装`Auto.js-VSCodeExt`插件。

![image-20220406222424648](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220406222424648.png)

5. `Command+shift+P`快捷键打开 `Command Palette`，运行 `Auto.js:New Project`命令创建一个新项目。

![image-20220406222958526](https://gitee.com/qulingyuan/ly_picture/raw/master/img/image-20220406222958526.png)

6. 在 main.js 文件中编写脚本：

```js
function robVeg() {
  launchApp("美团买菜");
  waitForPackage("com.meituan.retail.v.android", 200);
  auto.waitFor();
  const btn_skip = id("btn_skip").findOne();
  if (btn_skip) {
    btn_skip.click();
    toast("已跳过首屏广告");
  }
  sleep(1000);
  gotoBuyCar();
  sleep(1000);
  checkAll();
}

robVeg();

//打开购物车页面
function gotoBuyCar() {
  const buyCarBtn = id("cartredDotTextView").findOne();
  if (buyCarBtn) {
    buyCarBtn.parent().click();
    toast("已进入购物车");
  } else {
    toast("没找到购物车");
    exit;
  }
}

//勾选全部商品
function checkAll() {
  const isCheckedAll = textStartsWith("结算(").exists();
  const checkAllBtn = text("全选").findOne();
  if (!!checkAllBtn) {
    !isCheckedAll && checkAllBtn.parent().click();
    sleep(1000);
  } else {
    toast("没找到全选按钮");
    exit;
  }
}
```

6.运行 `Auto.js:Start Server` 命令启动服务，手机和电脑在同一局域网的情况下打开”连接电脑“选项，连接成功后，VS Code 会弹出提示。然后就可以愉快地改代码调试了。

项目中容易踩到的坑，给大家提个醒：

1. 一定要打开无障碍功能！如果发现无法选取元素了或者什么其他异常，大概率是无障碍功能关闭了，是的，无障碍功能有时候会自动关闭。
2. 手机的 GPS 打开。
3. 需要提前把商品添加到购物车里，不然购物车是空的，啥也买不了。

## 原理

这个脚本的原理是找到屏幕上对应的按钮，模仿人的点击等手势动作，把抢菜的一系列操作封装成脚本。然后 Auto.js 有定时执行脚本功能，这样就不用早上六点钟起来自己点了。Auto.js 的功能很强大，网上搜资料的时候发现还可以搞支付宝的蚂蚁森林的能量收集，还有游戏脚本啥的，后面还可以研究研究。

现在的代码是一个半成品，因为白天点击结算按钮后面的场景只有”我知道了“这个场景，正常购买场景走不进去了，我打算明天早上 5:30 起床调试脚本，把场景都记下来。但结算之前的脚本在我的手机上测试都是可用的，不过也可能会因为机型的不同会有不同，就需要大家自己调试了。
