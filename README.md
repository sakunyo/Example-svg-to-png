# SVG to Downloadable Canvas

## Overview

D3JSのグラフ・チャートをSVGで出力した場合や、DOM Tree into SVG(foreignObject) などの
SVG をユーザーが画像リソースとしてダウンロードを可能にする為には、Canvas要素へ描画を行う必要がある。

また日本語などのASCII文字以外が含まれる場合に btoa(...) で `invalid character` になり base64 に変換できない。


## Step By Step

1. SVG要素 を base64 (`data:image/svg+xml`) へ変換する
2. Image要素を作成し src へ base64 化したSVGを代入する
3. Image要素をCanvas要素へ `drawImage(...)` メソッドで描画する

以上のステップでCanvas要素から PNG画像 としてユーザー保存可能になるが、IE(IE11)ではCanvasを画像として保存することができない。


## Downloadable Canvas の代替案と .toDataUrl() と origin-clean について
IEの代替案として `canvas.toDataUrl()` でCanvasからDataURLへ変換したダウンロードリンク用意することができるが、
この場合にも `origin-clean` でセキュリティによりブラウザごとに差異が発生する。

このケースは img要素 (svg) を Canvas へ `drawImage()` でCanvasへ書き込むことで `origin-clean : false` に設定されるブラウザ (IE11 など) で発生するが、
SVGにが外部読み込みが可能な仕様であるためにセキュリティとしては比較的正しい動作になるので、プロキシなどで画像をサーバーサイドから保存させる方法をとる方が近道である。

他の方法として、SVGをパースし直接Canvasへコンバートする方法があるが (gabelerner/canvg) 現状ではSVGではcanvgに合わせてる必要があるのでオススメはできない様子。


## Keyword
`base64`
, `window.btoa()`
, `(new XMLSerializer()).serializeToString(...)`
, `canvas`
, `ctx.getContext()`
, `canvas.toDataUrl`
, `origin-clean`
, `ctx.drawImage()`

## See also
- [Drawing DOM objects into a canvas - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas)<br>
  \[日本語訳\] [DOM オブジェクトを Canvas に描画する - HTML | MDN](https://developer.mozilla.org/ja/docs/Web/HTML/Canvas/Drawing_DOM_objects_into_a_canvas)
- [Download canvas as an image](http://jsfiddle.net/AbdiasSoftware/7PRNN/)
- [【JavaScript】window.btoa(&#8216;日本語&#8217;) する   at softelメモ](https://www.softel.co.jp/blogs/tech/archives/4133)
- [gabelerner/canvg](https://github.com/gabelerner/canvg#potential-uses)
- [SVGヤバイ - 最速チュパカブラ研究会](http://d.hatena.ne.jp/gyuque/20110510)
- [D3.jsで作成したグラフ(SVG)を画像として保存する | Tech-Sketch](http://tech-sketch.jp/2013/10/d3js-svg-convert-to-png.html)
- [canvas要素の基本的な使い方まとめ](http://www.h2.dion.ne.jp/~defghi/canvasMemo/canvasMemo.htm#h16)
- [From SVG to Canvas and Back](http://www.svgopen.org/2010/papers/62-From_SVG_to_Canvas_and_Back/)
