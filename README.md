## Overview

D3JSのグラフ・チャートをSVGで出力した場合や、DOM Tree into SVG(foreignObject) などの
SVG をユーザーが画像リソースとしてダウンロードを可能にする為には、Canvas要素へ描画を行う必要がある。

### 手順

1. SVG要素 を base64 (`data:image/svg+xml`) へ変換する
2. Image要素を作成し src へ base64 化したSVGを代入する
3. Image要素をCanvas要素へ `drawImage(...)` メソッドで描画する

以上のステップでCanvas要素から PNG画像 としてユーザー保存可能になる

### Keyword
`base64`
, `window.btoa(...)`
, `(new XMLSerializer()).serializeToString(...)`
, `canvas`
, `ctx.getContext(...)`

## See also
- [Drawing DOM objects into a canvas - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas)<br>
  \[日本語訳\] [DOM オブジェクトを Canvas に描画する - HTML | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Canvas/Drawing_DOM_objects_into_a_canvas)
- [Download canvas as an image](http://jsfiddle.net/AbdiasSoftware/7PRNN/)
