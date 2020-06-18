# API Tools

## Views

以 / 開頭，目前有畫面如下：

1. /stock

以代號查詢台股資訊

2. /rate

呈現台灣銀行匯率資訊表，配有簡單查詢及試算兌換功能

3. /money-news

經濟日報新聞畫面



## API

以 /api 開頭，目前有工具如下：(以下路徑前面都加上 /api)

1. /stock/?no=XXX

no參數可以帶入多個股票代號，/stock/?no=2882,2887

3. /rate

返回台灣銀行匯率資訊

4. /money-news

源自經濟日報新聞
 
  - /first: 當前頭條新聞

  - /break/1: 第一頁即時新聞
