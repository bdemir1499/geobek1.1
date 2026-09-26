var fs = new ActiveXObject("Scripting.FileSystemObject");
var ForReading = 1, ForWriting = 2;
var ts = fs.OpenTextFile("src/app.js", ForReading);
var content = ts.ReadAll();
ts.Close();

var target = "                            firlatici({ type: 'yukleme_penceresini_kapat' });";
var replacement = target + "\r\n                            if (window.drawnStrokes && window.drawnStrokes.length > 0) {\r\n                                firlatici({ type: 'yeni_cizim', stroke: window.drawnStrokes });\r\n                            }";

content = content.replace(target, replacement);

var ts2 = fs.OpenTextFile("src/app.js", ForWriting);
ts2.Write(content);
ts2.Close();
