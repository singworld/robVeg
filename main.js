function robVeg() {
  console.show()
  console.log("开始运行")
  toast("程序开始启动");
  launchApp("美团买菜");
  waitForPackage("com.meituan.retail.v.android", 200);
  console.log("程序启动等待中")
  auto.waitFor();
  toast("程序启动成功");
  console.log("查找btn_skip")
  const btn_skip = id("btn_skip").findOne();
  console.log("程序启动btn_skip")
  if (btn_skip) {
    btn_skip.click();
    toast("已跳过首屏广告");
  }else{
    console.log("不在开屏广告界面");
  }
  sleep(1000);
  console.log("下一步打开购物车");
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

function submitOrder(count) {
  submitBtn = textStartsWith("结算(").findOne();
  if (!submitBtn) {
    toast("没找到结算按钮");
    exit;
  }
  submitBtn.parent().click();
  sleep(1000);

  if (text("我知道了").exists()) {
    toast("关闭我知道了");
    text("我知道了").findOne().parent().click();
  }

  sleep(200);
  if (count > 10000) {
    toast("没抢到");
    exit;
  }
  count = count++;
  submitOrder(count);
}
