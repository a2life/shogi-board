const rest_of_setup = [

    {
        caption:'sideComment option on',
        sideComment: `true`,
        initialComment: `The Sente drops Silver at the head of Bishop...`,
        showMarker: true,
        goteOnBoard: "32r,22b",
        senteOnHand: `s`,
        senteOnBoard: ``,
        markerAt: "23",
        moves: ["sd23s",
            "g-8232***Rook escapes to the side***",
            "s+2223***Silver captures Bishop***",
            "g-2282***and then, Rook takes Silver******Looking at the value table, Sente lost Silver(-5 points) and gained Bishop(+8), so you gained total of 3 ponts and Gote lost 3 points.******in Another word, there are 6 points gap created among players with this exchange***",
            "x"],
        tesuu:3

    },
     {  caption:"Another kifu based render",
        kifu: `# ----  Kifu for Windows V7 V7.44 棋譜ファイル  ----
開始日時：2023/04/26 10:05:00
手合割：その他　
上手の持駒：なし
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ ・ ・ ・ ・v香|一
| ・ ・ ・ ・ ・ ・ ・v飛 ・|二
| ・ ・ ・ ・ ・ ・ ・ ・v歩|三
| ・ ・ ・ ・ ・ ・v角 ・ ・|四
| ・ ・ ・ ・ ・ ・ ・ ・ 歩|五
| ・ ・ ・ ・ ・ ・ 歩 ・ 玉|六
| ・ ・ ・ ・ ・ ・ ・ ・ 香|七
| ・ ・ ・ ・ ・ ・ ・ ・ ・|八
| ・ ・ ・ ・ ・ ・ ・ 桂 ・|九
+---------------------------+
下手の持駒：歩二　
下手番
手数----指手---------消費時間--
   1 ２五歩打     ( 0:00/00:00:00)
*For more of those Pawn technique, please check "Pawn Sampler" section of this site.
`
    },
    {
        caption:'Branch moves supported',

        kifu: `
#KIF version=2.0 encoding=UTF-8
# ---- Kifu for Windows V7 V7.44 棋譜ファイル ----
開始日時：2023/03/30 22:14:08
終了日時：2023/03/30 22:27:40
手合割：その他　
上手の持駒：なし
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ 飛 ・ ・ ・ 角|一
| ・ ・ ・ ・ ・ ・ ・ ・ ・|二
| ・ ・ ・ ・ ・ ・ ・ ・ ・|三
| ・ ・ ・ ・ ・ ・ ・ ・ ・|四
| ・ ・ ・ ・v歩 ・ ・ ・ ・|五
| ・ ・ ・ ・ ・ ・ ・ ・ ・|六
| ・ ・ ・ ・ ・ ・ ・ ・ ・|七
| ・ ・ ・ ・ ・ ・ ・ ・ ・|八
| 角 ・ ・ ・ 飛 ・ ・ ・ ・|九
+---------------------------+
下手の持駒：なし
下手番
下手：
上手：
手数----指手---------消費時間--
   1 ５五飛行(59)   ( 0:03/00:00:03)+


変化：1手
   1 ５五角行(99)   ( 0:03/00:00:03)+


変化：1手
   1 ５五角成引(11) ( 0:05/00:00:05)+


変化：1手
   1 ５五飛不成引(51)   ( 0:06/00:

        `
    },
    {
        caption: "Using different ban and koma graphics",
        grid: 2,
        ban: 5,
        koma: 0,
        sOnBoard: `21r,24p`,
        gOnBoard: `12k,13p,22s`,
        sOnHand: `g`,
        moves: ["sd11g", "g-0022", "s+2321", "x"]
    },
    {
        caption:"Branch/Node movements support",
        initialComment: "Comment in comment window",
        kifu: `
        # ----  Kifu for Windows V7 V7.44 棋譜ファイル  ----
開始日時：2013/03/31 14:03:09
手合割：平手　　
先手：Sente/先手
後手：Gote/後手
手数----指手---------消費時間--
   1 ７六歩(77)   ( 0:00/00:00:00)+
   2 ３四歩(33)   ( 0:00/00:00:00)+
   3 ２六歩(27)   ( 0:00/00:00:00)+
   4 ４四歩(43)   ( 0:00/00:00:00)+
*Gote is more likely to play orthodox swing rook.
   5 ４八銀(39)   ( 0:00/00:00:00)
   6 ４二飛(82)   ( 0:00/00:00:00)+
*Gote is playing Shiken-Bisya (四間飛車=Fourth file Rook)
   7 ６八玉(59)   ( 0:00/00:00:00)
*Last two moves from Sente is universal moves for Gote's ranging rook strategy. This form allows both rapid attack and also for delayed attack strategy (such as Anaguma castling)
   8 ７二銀(71)   ( 0:00/00:00:00)
*Gote could also play ６二玉　instead that is more conventional move. The reason for ７二銀 is that, if Sente is going for Anaguma castle, Gote will play Fujii system attack  and for that strategy, it is better to delay King's castling.
*This is a starter position for Gote ShikenBisya.


変化：6手
   6 ３二飛(82)   ( 0:00/00:00:00)
*Gote plays Sangen-bisya (三間飛車=Third File Rook)
   7 ２五歩(26)   ( 0:00/00:00:00)
*Force Gote to play ３三角, otherwise, Gote will play ３五歩～３四飛車 or Ishida style Sangen-bisya
   8 ３三角(22)   ( 0:00/00:00:00)
   9 ６八玉(59)   ( 0:00/00:00:00)
  10 ４二銀(31)   ( 0:00/00:00:00)
  11 ７八玉(68)   ( 0:00/00:00:00)
  12 ６二玉(51)   ( 0:00/00:00:00)
*This is a starter position for Gote Sangen-bisya (後手三間飛車= gote third file rook)
  13 ７七角(88)   ( 0:00/00:00:00)+
*Sente will go for Anaguma
  14 ７二玉(62)   ( 0:00/00:00:00)
  15 ８八玉(78)   ( 0:00/00:00:00)
  16 ８二玉(72)   ( 0:00/00:00:00)
  17 ９八香(99)   ( 0:00/00:00:00)
  18 ７二銀(71)   ( 0:00/00:00:00)
  19 ９九玉(88)   ( 0:00/00:00:00)
  20 ５二金(41)   ( 0:00/00:00:00)+
  21 ８八銀(79)   ( 0:00/00:00:00)
  22 ５四歩(53)   ( 0:00/00:00:00)
  23 ５六歩(57)   ( 0:00/00:00:00)
  24 ５三銀(42)   ( 0:00/00:00:00)


変化：20手
  20 ４三銀(42)   ( 0:00/00:00:00)
  21 ８八銀(79)   ( 0:00/00:00:00)
  22 ３五歩(34)   ( 0:00/00:00:00)
  23 ７九金(69)   ( 0:00/00:00:00)


変化：13手
  13 ５八金(49)   ( 0:00/00:00:00)
  14 ７二玉(62)   ( 0:00/00:00:00)
  15 ５六歩(57)   ( 0:00/00:00:00)
  16 ８二玉(72)   ( 0:00/00:00:00)
  17 ３六歩(37)   ( 0:00/00:00:00)
  18 ５四歩(53)   ( 0:00/00:00:00)
  19 ４六歩(47)   ( 0:00/00:00:00)
*Sente is going for Rapid attack


変化：4手
   4 ５四歩(53)   ( 0:00/00:00:00)+
*It used to be that Gote played ４四歩 to avoid bishop exchange.  with ５四歩　move here, Gote is saying that he will be playing Gokigen Nakabisya (ゴキゲン中飛車, lit translates to Good mood　center rook). The name comes from the originator of this strategy, Masakazu Kondo, who seems to be always in good mood.
   5 ２五歩(26)   ( 0:00/00:00:00)
   6 ５二飛(82)   ( 0:00/00:00:00)
*Start of Gokigen Nakabisya (Good mood center Rook)


変化：4手
   4 ８四歩(83)   ( 0:00/00:00:00)+
   5 ２五歩(26)   ( 0:00/00:00:00)
   6 ８五歩(84)   ( 0:00/00:00:00)
   7 ７八金(69)   ( 0:00/00:00:00)
   8 ３二金(41)   ( 0:00/00:00:00)
   9 ２四歩(25)   ( 0:00/00:00:00)
  10 同　歩(23)   ( 0:00/00:00:00)
  11 同　飛(28)   ( 0:00/00:00:00)
  12 ８六歩(85)   ( 0:00/00:00:00)
  13 同　歩(87)   ( 0:00/00:00:00)
  14 同　飛(82)   ( 0:00/00:00:00)
  15 ３四飛(24)   ( 0:00/00:00:00)
  16 ３三角(22)   ( 0:00/00:00:00)+
*This is a starting position for modern side pawn picker.
  17 ３六飛(34)   ( 0:00/00:00:00)
  18 ８四飛(86)   ( 0:00/00:00:00)+


変化：18手
  18 ２二銀(31)   ( 0:00/00:00:00)
  19 ８七歩打     ( 0:00/00:00:00)
  20 ８五飛(86)   ( 0:00/00:00:00)
*Start of ８五Rook stragety (８五飛戦法）


変化：16手
  16 ７六飛(86)   ( 0:00/00:00:00)
*This is NO! NO! move
  17 ２二角成(88) ( 0:00/00:00:00)


変化：4手
   4 ３二金(41)   ( 0:00/00:00:00)
   5 ７八金(69)   ( 0:00/00:00:00)
   6 ８四歩(83)   ( 0:00/00:00:00)
   7 ２五歩(26)   ( 0:00/00:00:00)
   8 ８八角成(22) ( 0:00/00:00:00)
   9 同　銀(79)   ( 0:00/00:00:00)
  10 ２二銀(31)   ( 0:00/00:00:00)
*This,　Gote-Ittezon-kakugawari（後手一手損角換わり=Bishop exchange with Gote's lost turn.)  is relatively new opening.  You may wonder what is different from orthodox 角換わり　because even in the orthodox 角換わり、It is Gote who initiates the Bishop exchange.  However, in Orthodox Kakugawari, Gote is exchanging the Sente's Bishop at ７七, which Sente moved from ８八、so Gote did not lose turn.  In this case however, Bishop is exchanged at ８八、Therefore, Gote really did lose one turn.
*


変化：3手
   3 ７五歩(76)   ( 0:00/00:00:00)+
*Sente will be going for Ishida-style Sangen-bisya (石田流三間飛車)
   4 ６二銀(71)   ( 0:00/00:00:00)+
   5 ７八飛(28)   ( 0:00/00:00:00)
   6 ６四歩(63)   ( 0:00/00:00:00)
   7 ４八玉(59)   ( 0:00/00:00:00)
   8 ６三銀(62)   ( 0:00/00:00:00)
   9 ３八玉(48)   ( 0:00/00:00:00)
  10 ４二玉(51)   ( 0:00/00:00:00)
  11 ２八玉(38)   ( 0:00/00:00:00)
  12 ３二玉(42)   ( 0:00/00:00:00)
  13 ３八銀(39)   ( 0:00/00:00:00)


変化：4手
   4 ８四歩(83)   ( 0:00/00:00:00)+
   5 ７八飛(28)   ( 0:00/00:00:00)
*Rapid Ishida (急戦石田流:Kyuusen Ishida-ryuu)
   6 ８五歩(84)   ( 0:00/00:00:00)
   7 ４八玉(59)   ( 0:00/00:00:00)+
   8 ６二銀(71)   ( 0:00/00:00:00)
   9 ３八玉(48)   ( 0:00/00:00:00)
  10 ６四歩(63)   ( 0:00/00:00:00)
  11 ２八玉(38)   ( 0:00/00:00:00)
  12 ６三銀(62)   ( 0:00/00:00:00)
  13 ３八銀(39)   ( 0:00/00:00:00)


変化：7手
   7 ７四歩(75)   ( 0:00/00:00:00)
   8 同　歩(73)   ( 0:00/00:00:00)
   9 同　飛(78)   ( 0:00/00:00:00)
  10 ８八角成(22) ( 0:00/00:00:00)
  11 同　銀(79)   ( 0:00/00:00:00)
  12 ６五角打     ( 0:00/00:00:00)
  13 ５六角打     ( 0:00/00:00:00)


変化：4手
   4 ４二玉(51)   ( 0:00/00:00:00)
   5 ７八飛(28)   ( 0:00/00:00:00)+
   6 ８八角成(22) ( 0:00/00:00:00)
   7 同　銀(79)   ( 0:00/00:00:00)
   8 ４五角打     ( 0:00/00:00:00)
*Note that ７六角打　is not effective as Gote's king is already protecting ４三歩


変化：5手
   5 ６六歩(67)   ( 0:00/00:00:00)


変化：3手
   3 ６六歩(67)   ( 0:00/00:00:00)+
*White still does not tell black what strategy he will take. It could be sitting rook or swinging rook.
   4 ３三角(22)   ( 0:00/00:00:00)+
*White is aiming for opposing rook.  Black can either play sitting rook or double ranging rook
   5 ７八銀(79)   ( 0:00/00:00:00)
   6 ２二飛(82)   ( 0:00/00:00:00)
   7 ６七銀(78)   ( 0:00/00:00:00)
   8 ４二銀(31)   ( 0:00/00:00:00)
*Sente is eventually going to swing a rook (most likely to ８八) This is one of the start positions for Ai-furi-bisya (相振り飛車= Double ranging Rook)


変化：4手
   4 ８四歩(83)   ( 0:00/00:00:00)+
*Now white says he will play sitting rook.


変化：4手
   4 ６二銀(71)   ( 0:00/00:00:00)+
*The white will still play sitting rook. This is likely to evolve into white's right fourth ranging rook.
   5 ７八飛(28)   ( 0:00/00:00:00)
*for example, Sensing the possibility of Right side fourth rook by white, Black plays Third file rook.
*\t
*In this case, Black is guaranteed to play Ishida style third file rook as shown
   6 ８四歩(83)   ( 0:00/00:00:00)+
   7 ７五歩(76)   ( 0:00/00:00:00)
   8 ８五歩(84)   ( 0:00/00:00:00)
   9 ７六飛(78)   ( 0:00/00:00:00)


変化：6手
   6 ６四歩(63)   ( 0:00/00:00:00)
   7 ７五歩(76)   ( 0:00/00:00:00)
   8 ６三銀(62)   ( 0:00/00:00:00)


変化：4手
   4 ３二飛(82)   ( 0:00/00:00:00)
*After seeing black's 6六歩, white plays 3rd file rook. Since Bishop path has been blocked, black can not commense quick attack. Black will now likely to play slow game such as Center Vanguard pawn, or Double Ranging Rook(相振飛車:aifuribisha)


変化：3手
   3 １六歩(17)   ( 0:00/00:00:00)+
*What is a meaning of this edge pawn? Black is waiting one move and asking if white is going for sitting rook (8四歩)
   4 ８四歩(83)   ( 0:00/00:00:00)
   5 ５六歩(57)   ( 0:00/00:00:00)+
*Black plays gokigen nakabisya. For this, he was waiting for 8四歩. Otherwise, white could exchange bishop and drop it at 5七


変化：5手
   5 ６六歩(67)   ( 0:00/00:00:00)
*Black will play ranging rook


変化：3手
   3 ８六歩(87)   ( 0:00/00:00:00)+
   4 ８四歩(83)   ( 0:00/00:00:00)
*This rather strange pawn push by black to 8六 is called Bishop\`s Head Pawn Push (角頭歩:kakutoo-fu)
   5 ２二角成(88) ( 0:00/00:00:00)
   6 同　銀(31)   ( 0:00/00:00:00)
   7 ７七桂(89)   ( 0:00/00:00:00)


変化：3手
   3 ６八玉(59)   ( 0:00/00:00:00)
*Black plays this against player who only plays ranging rook.
   4 ８四歩(83)   ( 0:00/00:00:00)
*Most logical hand for this situation is to push rook's pawn, but now black is forced to paly sitting rook.
   5 中断         ( 0:00/00:00:00)
まで4手で中断

変化：2手
   2 ８四歩(83)   ( 0:00/00:00:00)
   3 ６八銀(79)   ( 0:00/00:00:00)+
   4 ３四歩(33)   ( 0:00/00:00:00)
*This play will likely result in black's yagura formation
   5 ６六歩(67)   ( 0:00/00:00:00)+
   6 ６二銀(71)   ( 0:00/00:00:00)
   7 ５六歩(57)   ( 0:00/00:00:00)
   8 ５四歩(53)   ( 0:00/00:00:00)
   9 ４八銀(39)   ( 0:00/00:00:00)
*Sente indicates he will play Ibisya strategy (居飛車=Sitting Rook)
  10 ４二銀(31)   ( 0:00/00:00:00)
  11 ５八金(49)   ( 0:00/00:00:00)
  12 ３二金(41)   ( 0:00/00:00:00)
  13 ７八金(69)   ( 0:00/00:00:00)
  14 ４一玉(51)   ( 0:00/00:00:00)
  15 ６九玉(59)   ( 0:00/00:00:00)
  16 ７四歩(73)   ( 0:00/00:00:00)
  17 ６七金(58)   ( 0:00/00:00:00)
  18 ５二金(61)   ( 0:00/00:00:00)
  19 ７七銀(68)   ( 0:00/00:00:00)
  20 ３三銀(42)   ( 0:00/00:00:00)
  21 ７九角(88)   ( 0:00/00:00:00)
  22 ３一角(22)   ( 0:00/00:00:00)
  23 ３六歩(37)   ( 0:00/00:00:00)
  24 ４四歩(43)   ( 0:00/00:00:00)
*Very much mainstream Yagura formation. Both are playing Yagura therefore it is called Ai-yagura （相矢倉=Double Yagura)


変化：5手
   5 ７七銀(68)   ( 0:00/00:00:00)
*Compare to p6f, this move is more geared towards Yagura formation, as p6f can still means black may play swinging rook.


変化：3手
   3 ６八飛(28)   ( 0:00/00:00:00)+
   4 ３四歩(33)   ( 0:00/00:00:00)
   5 ６六歩(67)   ( 0:00/00:00:00)
   6 ６二銀(71)   ( 0:00/00:00:00)
   7 １六歩(17)   ( 0:00/00:00:00)
*The meaning of this edge Pawn advance is that if Gote is planning to play Anaguma castle, he will not respond with １四歩。　In that case Sente will probably play Fujii System attack.
*This is a starter position for Gote Shiken bisya (後手四間飛車)


変化：3手
   3 ２六歩(27)   ( 0:00/00:00:00)+
   4 ８五歩(84)   ( 0:00/00:00:00)
   5 ７七角(88)   ( 0:00/00:00:00)
   6 ３四歩(33)   ( 0:00/00:00:00)
   7 ８八銀(79)   ( 0:00/00:00:00)
   8 ３二金(41)   ( 0:00/00:00:00)
   9 ７八金(69)   ( 0:00/00:00:00)
  10 ７七角成(22) ( 0:00/00:00:00)
  11 同　銀(88)   ( 0:00/00:00:00)
  12 ４二銀(31)   ( 0:00/00:00:00)
  13 ３八銀(39)   ( 0:00/00:00:00)
  14 ７二銀(71)   ( 0:00/00:00:00)
*Start of Bishop exchange opening (角換わり）


変化：3手
   3 ７八飛(28)   ( 0:00/00:00:00)+
   4 ３四歩(33)   ( 0:00/00:00:00)
*Black to play 3rd file rook (三間飛車:Sanken Bisya)
   5 ６六歩(67)   ( 0:00/00:00:00)
   6 ８五歩(84)   ( 0:00/00:00:00)+
   7 ７七角(88)   ( 0:00/00:00:00)


変化：6手
   6 ６二銀(71)   ( 0:00/00:00:00)
   7 ７五歩(76)   ( 0:00/00:00:00)
   8 ８五歩(84)   ( 0:00/00:00:00)
   9 ７六飛(78)   ( 0:00/00:00:00)
*Ishida style 3rd file rook (石田流三間飛車)


変化：3手
   3 ５六歩(57)   ( 0:00/00:00:00)
*Original idea of this pawn advancement is to push the pawn to 5f. This is called vanguard pawn (位取り:kuraidori.) Vanduard pawn strategy is more relevant in the game play with slow pace. The idea is to press the opponent.
   4 ８五歩(84)   ( 0:00/00:00:00)+
*Forces black to play 7七角(b7g)
   5 ７七角(88)   ( 0:00/00:00:00)
*Black forces Bishop's move
   6 ３四歩(33)   ( 0:00/00:00:00)+
   7 ５五歩(56)   ( 0:00/00:00:00)
*Central Vanguard Pawn(5筋位取り:go-suji kuraidori)


変化：6手
   6 ５四歩(53)   ( 0:00/00:00:00)
   7 ８八飛(28)   ( 0:00/00:00:00)
*Black to play Opposing rook (向かい飛車:mukaibisya)


変化：4手
   4 ５四歩(53)   ( 0:00/00:00:00)
   5 ５八飛(28)   ( 0:00/00:00:00)
*Black to play center rook (中飛車:nakabisya)


変化：1手
   1 ２六歩(27)   ( 0:00/00:00:00)+
   2 ８四歩(83)   ( 0:00/00:00:00)+
   3 ２五歩(26)   ( 0:00/00:00:00)+
   4 ８五歩(84)   ( 0:00/00:00:00)
*At this point, most likely scenario of this game is double wing attack (相掛かり:Aigakari)
   5 ７八金(69)   ( 0:00/00:00:00)
   6 ３二金(41)   ( 0:00/00:00:00)
   7 ２四歩(25)   ( 0:00/00:00:00)
   8 同　歩(23)   ( 0:00/00:00:00)
   9 同　飛(28)   ( 0:00/00:00:00)
  10 ２三歩打     ( 0:00/00:00:00)
  11 ２八飛(24)   ( 0:00/00:00:00)
*Starting position of Aigakari.  Sente could also play ２六飛車 to delay Rook's Pawn exchange from Gote.
*The rest of the moves on this board shows Sente's climbing Silver, but other openings are also possible from this position.
  12 ８六歩(85)   ( 0:00/00:00:00)
  13 同　歩(87)   ( 0:00/00:00:00)
  14 同　飛(82)   ( 0:00/00:00:00)
  15 ８七歩打     ( 0:00/00:00:00)
  16 ８四飛(86)   ( 0:00/00:00:00)
  17 ３八銀(39)   ( 0:00/00:00:00)
  18 ３四歩(33)   ( 0:00/00:00:00)
  19 ２七銀(38)   ( 0:00/00:00:00)


変化：3手
   3 ７六歩(77)   ( 0:00/00:00:00)
   4 ８五歩(84)   ( 0:00/00:00:00)
*This is likely to evolve into Bishop exchange formation (角換わり：Kakugawari)
   5 ７七角(88)   ( 0:00/00:00:00)
   6 ３四歩(33)   ( 0:00/00:00:00)
   7 中断         ( 0:00/00:00:00)
まで6手で中断

変化：2手
   2 ３四歩(33)   ( 0:00/00:00:00)
   3 ２五歩(26)   ( 0:00/00:00:00)+
*This p2f move is rarely played by professiona player. However, this will limit White's movement. White can not lure Black into side pawn picker, for instance.
   4 ３三角(22)   ( 0:00/00:00:00)
   5 ７六歩(77)   ( 0:00/00:00:00)
   6 ４四歩(43)   ( 0:00/00:00:00)+
*White will play Swinging rook or Ganghi


変化：6手
   6 ２二銀(31)   ( 0:00/00:00:00)
*White is likely to play sitting rook and inviting black to play Bishop exchange (角換わり:kakugawari)


変化：3手
   3 ７六歩(77)   ( 0:00/00:00:00)
*Between rook's pawn advancement and this move, Most player will play this move. This will give more options for white player but in the same time, more choices for black as well.
   4 ８四歩(83)   ( 0:00/00:00:00)+
   5 ２五歩(26)   ( 0:00/00:00:00)
   6 ８五歩(84)   ( 0:00/00:00:00)
   7 ７八金(69)   ( 0:00/00:00:00)
   8 ３二金(41)   ( 0:00/00:00:00)
   9 ２四歩(25)   ( 0:00/00:00:00)
  10 同　歩(23)   ( 0:00/00:00:00)
  11 同　飛(28)   ( 0:00/00:00:00)
  12 ８六歩(85)   ( 0:00/00:00:00)
  13 同　歩(87)   ( 0:00/00:00:00)
  14 同　飛(82)   ( 0:00/00:00:00)
  15 ３四飛(24)   ( 0:00/00:00:00)
*Start of Side pawn picker (横歩取り）


変化：4手
   4 ４四歩(43)   ( 0:00/00:00:00)+
*White will most likely to play Swinging Rook. white can also play Ganghi or other sitting rook strategy though.


変化：4手
   4 ５四歩(53)   ( 0:00/00:00:00)+
*White is likely to play center swinging rook. (ゴキゲン中飛車:Gokigenn Nakabisha). Note that drop of Bishop at 5c following bishop exchange will be countered by white's Bishop drop at 4b. (note that pawn at 2f prevents black Bishop's escape.)


変化：4手
   4 ３二金(41)   ( 0:00/00:00:00)
*Start of Bishop exchange with one move deficit (一手損角換わり:ittezon kakugawari). In this scenario, White will initiate bishop exchange. This was unthinkable twenty years ago but is not fairly popular move.
   5 ２五歩(26)   ( 0:00/00:00:00)
   6 ８八角成(22) ( 0:00/00:00:00)
   7 同　銀(79)   ( 0:00/00:00:00)
   8 ２二銀(31)   ( 0:00/00:00:00)
*Note that white can not exchange Rook's pawn yet. It will be countered by Bishop drop at 3e


変化：1手
   1 ５六歩(57)   ( 0:00/00:00:00)
   2 ３四歩(33)   ( 0:00/00:00:00)
   3 ５八飛(28)   ( 0:00/00:00:00)
*Sente Center rook. If Sente plays ７六歩　here instead,  Gote shall exchange Bishop and drop it at ５七 to make a promoted bishop. Like discussed before, the first move ５六歩 immediately means Sente is playing Naka-bisya (中飛車= Center Rook)
   4 ５四歩(53)   ( 0:00/00:00:00)
   5 ７六歩(77)   ( 0:00/00:00:00)
   6 ６二銀(71)   ( 0:00/00:00:00)
   7 ４八玉(59)   ( 0:00/00:00:00)
   8 ４二玉(51)   ( 0:00/00:00:00)
*If sente is going for Center rook with Bishop exchanged, this is the time he should initiate an exchange before Gote's king is at ４二　(If Gote's king is at ３二、King will conveniently moves to Bishop's position.)
   9 ３八玉(48)   ( 0:00/00:00:00)
  10 ３二玉(42)   ( 0:00/00:00:00)
  11 ２八玉(38)   ( 0:00/00:00:00)
  12 ８四歩(83)   ( 0:00/00:00:00)
  13 ７七角(88)   ( 0:00/00:00:00)
*Sente could also play ６六歩, then it will become the conventional swing rook strategy.
  14 ８五歩(84)   ( 0:00/00:00:00)
  15 ６八銀(79)   ( 0:00/00:00:00)
  16 ５二金(61)   ( 0:00/00:00:00)
  17 ３八銀(39)   ( 0:00/00:00:00)
*This is a starter position for recent Nakabisya (Center Rook) opening.


        `
    },
    {
        caption: "Static board with position marker on",
        markerAt: "28",
        kifu: `後手の持駒：なし
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|v香v桂 ・v金 ・ ・ ・v桂v香|一
| ・v玉v銀 ・v飛 ・v金v角 ・|二
|v歩v歩v歩v歩v銀v歩v歩v歩v歩|三
| ・ ・ ・ ・v歩 ・ ・ ・ ・|四
| ・ ・ ・ ・ ・ ・ ・ ・ ・|五
| ・ ・ 歩 ・ 歩 ・ ・ ・ ・|六
| 歩 歩 ・ 歩 ・ 歩 歩 ・ 歩|七
| ・ 角 玉 銀 金 銀 ・ 飛 ・|八
| 香 桂 ・ 金 ・ ・ ・ 桂 香|九
+---------------------------+
先手の持駒：歩
`
    },
    {
        caption: "HandyCap game (2 piece drop)",
        koma: `0`,
        kifu: `
          # ----  Kifu for Windows V7 V7.44 棋譜ファイル  ----
開始日時：2023/03/22 22:22:50
終了日時：2023/03/22 22:23:06
手合割：二枚落ち
下手：下手（simote）
上手：上手（Uwate）

手数----指手---------消費時間--
   1 ６二銀(71)   ( 0:12/00:00:12)
   2 ７六歩(77)   ( 0:01/00:00:01)
   3 ５四歩(53)   ( 0:02/00:00:14)
   4 ４六歩(47)   ( 0:09/00:00:10)
   5 ５三銀(62)   ( 0:04/00:00:18)
   6 ４五歩(46)   ( 0:03/00:00:13)
   7 ３二金(41)   ( 0:06/00:00:24)
   8 ５六歩(57)   ( 0:27/00:00:40)
   9 ９四歩(93)   ( 0:05/00:00:29)
  10 ３六歩(37)   ( 0:06/00:00:46)
  11 ７二金(61)   ( 0:03/00:00:32)
  12 ３五歩(36)   ( 0:17/00:01:03)
  13 ６二玉(51)   ( 0:14/00:00:46)
  14 ６八銀(79)   ( 0:28/00:01:31)
  15 ６四歩(63)   ( 0:06/00:00:52)
  16 ５七銀(68)   ( 0:12/00:01:43)
  17 ７四歩(73)   ( 0:02/00:00:54)
  18 ４六銀(57)   ( 0:30/00:02:13)
  19 ８四歩(83)   ( 0:04/00:00:58)
  20 ５八飛(28)   ( 0:12/00:02:25)
  21 ６三玉(62)   ( 0:08/00:01:06)
  22 ３四歩(35)   ( 0:14/00:02:39)
  23 ２二銀(31)   ( 0:02/00:01:08)
  24 ３三歩成(34) ( 0:06/00:02:45)
  25 同　銀(22)   ( 0:04/00:01:12)
  26 ３四歩打     ( 0:13/00:02:58)
  27 ２二銀(33)   ( 0:02/00:01:14)
  28 ３八銀(39)   ( 0:07/00:03:05)
  29 ７三桂(81)   ( 0:05/00:01:19)
  30 ４七銀(38)   ( 0:05/00:03:10)
  31 ８五歩(84)   ( 0:05/00:01:24)
  32 ７八金(69)   ( 0:22/00:03:32)
  33 ８三金(72)   ( 0:06/00:01:30)
  34 ４八玉(59)   ( 0:03/00:03:35)
  35 ８四金(83)   ( 0:02/00:01:32)
  36 ３八玉(48)   ( 0:17/00:03:52)
  37 ６五歩(64)   ( 0:04/00:01:36)
  38 ３七桂(29)   ( 0:03/00:03:55)
  39 中断         ( 0:22/00:01:58)

まで38手で中断

`
    },
    {
        caption: "grid=2, ban=9, koma=0",
        grid: '2', ban: '9', koma: '0',
        showMarker: true,
        kifu: `#KIF version=2.0 encoding=UTF-8
# ---- Kifu for Windows V7 V7.07 棋譜ファイル ----
開始日時：2013/07/01 22:43:29
手合割：その他　
後手の持駒：なし
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|v香v桂 ・v金 ・ ・ ・ ・ ・|一
| ・v玉v銀 ・v金 ・ ・ ・ ・|二
| ・v歩v歩v歩v歩 ・ ・ ・ ・|三
|v歩 ・ ・ ・ ・ ・ ・ ・ ・|四
| ・ 歩 銀 ・ ・ ・ ・ ・ ・|五
| 歩 飛 ・ 角 ・ ・ ・ ・ ・|六
| ・ ・ 桂 歩 歩 歩 ・ ・ ・|七
| ・ ・ ・ ・ ・ ・ ・ ・ ・|八
| 香 ・ ・ ・ ・ ・ ・ ・ ・|九
+---------------------------+
先手の持駒：歩　
下手番
先手：Player1
後手：Player2
手数----指手---------消費時間--
   1 ８四歩(85)   ( 0:04/00:00:04)
*Most of the attack start with advancing a pawn to dispose of it. This is called tsukisute no fu (突き捨ての歩　= lit. meaning push and waste a pawn)
   2 同　歩(83)   ( 0:02/00:00:02)
*If you take this pawn with your silver, then white will simply drop a pawn at ８三 and your silver need to retreat.  we are not looking at just exchangeing Pawns. We are going to destroy mino castle!
   3 ８三歩打     ( 0:02/00:00:06)
*This drop of a pawn at the head of opponent piece is called tanda no fu (単打の歩、　lit. meaning Pawn of single strike)
   4 同　銀(72)   ( 0:04/00:00:06)
   5 ８四銀(75)   ( 0:02/00:00:08)
   6 同　銀(83)   ( 0:01/00:00:07)
*If you take this Silver, then the opponent will drop his pawn at ８三　position and we will end up with exchanging Silvers and Pawns. This is not what we are aiming at.
   7 ８三歩打     ( 0:04/00:00:12)
*Another Tanda no fu
   8 同　玉(82)   ( 0:03/00:00:10)
   9 ８四飛(86)   ( 0:02/00:00:14)
  10 ７二玉(83)   ( 0:03/00:00:13)
  11 ８三銀打     ( 0:21/00:00:35)
*Knowning this single drop of Pawn at the head of King get you a lot of mileage.
`
    },
    {
        caption: "five",
        initialComment: `Single strike of pawn on gold's head`,
        maskBranch: true,
        kifu: `#KIF version=2.0 encoding=UTF-8
# ---- Kifu for Windows V7 V7.44 棋譜ファイル ----
開始日時：2020/07/08 22:29:03
手合割：その他　
上手の持駒：
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ ・v玉 ・v桂v香|一
| ・ ・ ・ ・ ・ ・v金 ・ ・|二
| ・ ・ ・ ・ ・v歩 ・v歩V歩|三
| ・ ・ ・ ・ ・ ・ ・ ・ ・|四
| ・ ・ ・ ・ ・ ・ ・ ・ ・|五
| ・ ・ ・ ・ ・ ・ ・ ・ ・|六
| ・ ・ ・ ・ ・ ・ ・ ・ ・|七
| ・ ・ ・ ・ ・ ・ ・ ・ ・|八
| ・ ・ ・ ・ ・ ・ ・ ・ ・|九
+---------------------------+
下手の持駒：飛　角　桂　歩二　
下手：
上手：
手数----指手---------消費時間--
   1 ３三歩打     ( 0:04/00:00:04)
*Single strike on gold\'s head
   2 同　金(32)   ( 0:27/00:00:27)+
   3 ２二歩打     ( 0:03/00:00:07)+


変化：3手
   3 ２二角打     ( 0:04/00:00:08)+


変化：3手
   3 ２二飛打     ( 0:12/00:00:16)+
*Variety of pieces can be dropped at 2二


変化：3手
   3 ４五桂打     ( 0:07/00:00:11)
   4 中断         ( 0:15/00:00:42)
まで3手で中断

変化：2手
   2 ２二金(32)   ( 1:09/00:01:09)
   3 ３四桂打     ( 0:57/00:01:01)+


変化：3手
   3 ３九飛打     ( 0:03/00:00:07)

`
    },
    {
        caption: "6",
        initialComment: `Initial comment`,
        kifu: `# ----  Kifu for Windows V7 V7.44 棋譜ファイル  ----
開始日時：2023/03/17 10:09:10
終了日時：2023/03/17 10:09:23
手合割：平手　　
先手：Sente
後手：Sente
手数----指手---------消費時間--
*コメント１
*コメント２
*コメント３
   1 ７六歩(77)   ( 0:04/00:00:04)+
*分岐のコメント１
*分岐のコメント２
   2 ３四歩(33)   ( 0:04/00:00:04)
   3 ４八銀(39)   ( 0:01/00:00:05)
   4 中断         ( 0:03/00:00:07)
まで3手で中断

変化：1手
   1 ２六歩(27)   ( 0:03/00:00:03)
   2 ８四歩(83)   ( 0:03/00:00:03)
   3 ２五歩(26)   ( 0:01/00:00:04)
   4 中断         ( 0:03/00:00:06)
まで3手で中断

`
    },

    {
        caption: "seven, focal point",
        sideComment: true,
        kifu: `# --- Kifu for Windows V6.44 棋譜ファイル ---
開始日時：2008/06/09(月) 21:47:36
手合割：平手　　
後手の持駒：角　銀　歩二　
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
|v香 ・ ・ ・v角 ・ ・v桂v香|一
| ・v飛 ・ ・ ・ ・ ・ ・ ・|二
| ・ ・v桂v銀v玉 ・ ・ ・v歩|三
| ・ ・v歩v歩 ・v歩v歩v金 ・|四
|v歩v歩 ・ ・ 歩 ・ 歩 桂 ・|五
| ・ ・ 歩 歩 ・ ・ ・ ・ ・|六
| 歩 歩 銀 ・ ・ 金 ・ ・ 歩|七
| ・ ・ 金 ・ 玉 銀 ・ 飛 ・|八
| 香 桂 ・ ・ ・ ・ ・ ・ 香|九
+---------------------------+
先手の持駒：金　歩二　
先手：a
後手：b
手数----指手---------消費時間--
*First thing it may come to your mind is that if the opponent's Bishop is not protecting the Gold at ２四、then you could jump your Knight to ３三 and clear your Rook's path. Would that work?
   1 ４一金打     ( 0:00/00:00:00)+
   2 ６二角(51)   ( 0:00/00:00:00)
   3 ３三桂成(25) ( 0:00/00:00:00)
   4 ２六歩打     ( 0:00/00:00:00)
*Nice pawn drop from the opponent..
   5 同　飛(28)   ( 0:00/00:00:00)
   6 ２五歩打     ( 0:00/00:00:00)
   7 ５六飛(26)   ( 0:00/00:00:00)
   8 ３三桂(21)   ( 0:00/00:00:00)
*Yikes, it did not work! Now go back to the beginning and chose the alternate move!
   9 中断         ( 0:00/00:00:00)
まで8手で中断

変化：1手
   1 ４二歩打     ( 0:00/00:00:00)
*Let's start over again. This is where Shoten no fu becomes handy.
*If the Rook takes it, then Knight promoting to ３三　is immediately threatening　the Rook, so there is no time to drop a Pawn at ２六.
*If King takes it, drop your Gold at ６一 and you capture the Bishop.
   2 同　角(51)   ( 0:00/00:00:00)
   3 ４一金打     ( 0:00/00:00:00)
*His Bishop is still dead.
   4 ５二銀打     ( 0:00/00:00:00)
*This is actually a bad move, but just show you how this game is already one sided, thanks to Shoten-no fu..
   5 ４二金(41)   ( 0:00/00:00:00)
   6 同　玉(53)   ( 0:00/00:00:00)
   7 ３三桂成(25) ( 0:00/00:00:00)
   8 同　玉(42)   ( 0:00/00:00:00)
   9 ５一角打     ( 0:00/00:00:00)
  10 ４二角打     ( 0:00/00:00:00)
  11 ７三角成(51) ( 0:00/00:00:00)
  12 中断         ( 0:00/00:00:00)
まで11手で中断
`
    },
    {
        caption: "Eight, The latest Yagura 3g silver -矢倉３七銀2012年最新型",
        maskBranchOnce: true,
        initialComment: "The program can show branch moves when available.Main course follows the actual game played by Hirose and Watanabe" +
            "on October 2012.",
        moves: [
            "*One of the reasons for Yagura's steady popularity is this thanks to Miyata's discovery of  p-65(６五歩).  Let's take a look.",
            "s-7677=1:７六歩",
            "g-8483=2:８四歩",
            "s-6879=3:６八銀",
            "g-3433=4:３四歩",
            "s-6667=5:６六歩",
            "g-6271=6:６二銀",
            "s-5657=7:５六歩",
            "g-5453=8:５四歩",
            "s-4839=9:４八銀",
            "g-4231=10:４二銀",
            "s-5849=11:５八金",
            "g-3241=12:３二金",
            "s-7869=13:７八金",
            "g-4151=14:４一玉",
            "s-6959=15:６九玉",
            "g-7473=16:７四歩",
            "s-6758=17:６七金",
            "g-5261=18:５二金",
            "s-7768=19:７七銀",
            "g-3342=20:３三銀",
            "s-7988=21:７九角",
            "g-3122=22:３一角",
            "s-3637=23:３六歩",
            "g-4443=24:４四歩",
            "s-3748=25:３七銀",
            "g-6431=26:６四角",
            "s-6879=27:６八角",
            "g-4352=28:４三金",
            "s-7969=29:７九玉",
            "g-3141=30:３一玉",
            "s-8879=31:８八玉",
            "g-2231=32:２二玉",
            "s-4637=33:４六銀",
            "g-5362J34:５三銀",
            "s-3729=35:３七桂",
            "g-7364=36:７三角",
            "s-1617=37:１六歩",
            "g-1413=38:１四歩",
            "s-2627=39:２六歩",
            "g-2433=40:２四銀",
            "s-3828=41:３八飛",
            "g-9493=42:９四歩",
            "s-1819=43:１八香",
            "g-9594=44:９五歩",
            "s-6566=45:６五歩",
            "g-8584J46:８五歩",
            "s-2537=47:２五桂",
            "g-4253J48:４二銀",
            "s-5556J49:５五歩",
            "g-4544J50:４五歩",
            "s-0046=51:同　銀",
            "g-5573J52:５五角",
            "s-4647J53:４六歩",
            "g-8685=54:８六歩",
            "s-0087=55:同　歩",
            "g-0082=56:同　飛",
            "sd87p=57:８七歩打",
            "g-8286=58:８二飛",
            "s-5768=59:５七角",
            "g-3321=60:３三桂",
            "s-5645=61:５六銀",
            "g-4455=62:４四角",
            "s-4857J63:４八角",
            "g-7381=64:７三桂",
            "s-4546=65:４五歩",
            "g-5344=66:５三角",
            "s+3325=67:３三桂成",
            "g-0042=68:同　銀",
            "s-1516=69:１五歩",
            "g-0014=70:同　歩",
            "s-3748=71:３七角",
            "gd55n=72:５五桂打",
            "s-0056=73:同　銀",
            "g-0054=74:同　歩",
            "s-0037=75:同　角",
            "g-8382=76:８三飛",
            "sd44nJ77:４四桂打",
            "g-4232J78:４二金",
            "sd25n=79:２五桂打",
            "g-0024=80:同　銀",
            "s-0026=81:同　歩",
            "gd86p=82:８六歩打",
            "s-0077=83:同　銀",
            "gd94n=84:９四桂打",
            "s-3536=85:３五歩",
            "g-0034=86:同　歩",
            "sd34p=87:３四歩打",
            "g-0043=88:同　金",
            "sd54p=89:５四歩打",
            "g-8653=90:８六角",
            "s-0087=91:同　歩",
            "g-0094=92:同　桂",
            "sd87p=93:８七歩打",
            "g+7886=94:７八桂成",
            "s-0088=95:同　玉",
            "gd47s=96:４七銀打",
            "sd32s=97:３二銀打",
            "g-0042=98:同　金",
            "s+0044=99:同　桂成",
            "g-0022=100:同　玉",
            "s+5354=101:５三歩成",
            "g+3847=102:３八銀成",
            "sd43b=103:４三角打",
            "g-2232=104:２二玉",
            "s+3355=105:３三角成",
            "g-0034=106:同　金",
            "sd34n=107:３四桂打",
            "g-0033=108:同　金",
            "sd32g=109:３二金打",
            "g-1322=110:１三玉",
            "s-1518=111:１五香",
            "gd14p=112:１四歩打",
            "sd22s=113:２二銀打",
            "g-1213=114:１二玉",
            "s-1415=115:１四香",
            "g-x=116:投了",
            "C:78手",
            "g-0033=78:同　銀",
            "s-0045=79:同　歩",
            "g-0043=80:同　金",
            "sd54p=81:５四歩打",
            "C:77手",
            "s-4838=77:４八飛",
            "gd47p=78:４七歩打",
            "s-0048=79:同　飛",
            "gd58s=80:５八銀打",
            "C:63手",
            "s-4546=63:４五歩",
            "g-2644=64:２六角",
            "s-6657=65:６六角",
            "g-2524=66:２五銀",
            "C:53手",
            "s-4668=53:４六角",
            "g-0055=54:同　角",
            "s-0047=55:同　歩",
            "gd47b=56:４七角打",
            "C:52手",
            "g-5554=52:５五歩",
            "s-7576=53:７五歩",
            "gd44p=54:４四歩打",
            "s-7475=55:７四歩",
            "g-6273=56:６二角",
            "s-4668=57:４六角*No, Gote can not take a silver (Bishop can then fork King and Rook)",
            "g-4544=58:４五歩",
            "s-5546=59:５五角",
            "C:50手",
            "g-0054=50:同　歩",
            "s-1516=51:１五歩",
            "g-0014=52:同　歩",
            "s-3536=53:３五歩",
            "g-0034J54:同　歩",
            "s-0046=55:同　銀",
            "g-0024=56:同　銀",
            "s-0038=57:同　飛",
            "gd34p=58:３四歩打",
            "s-3835=59:３八飛",
            "C:54手",
            "g-4544=54:４五歩",
            "s-0046=55:同　銀",
            "g-3534=56:３五歩",
            "s-7576=57:７五歩",
            "C:49手",
            "s-3536=49:３五歩",
            "g-0024=50:同　銀",
            "s-0046=51:同　銀",
            "g-0034=52:同　歩",
            "s-1516=53:１五歩",
            "g-0014=54:同　歩",
            "s-6465=55:６四歩",
            "g-0073J56:同　角",
            "s-3538=57:３五飛",
            "gd24sJ58:２四銀打",
            "s-6535=59:６五飛",
            "g-7381=60:７三桂",
            "s-6665=61:６六飛",
            "g-2524=62:２五銀",
            "s-0026=63:同　歩",
            "gd65n=64:６五桂打",
            "s-2425=65:２四歩",
            "g-0023=66:同　歩",
            "sd25p=67:２五歩打",
            "g-0024=68:同　歩",
            "s-7576=69:７五歩",
            "g+7765=70:７七桂成",
            "s-0089=71:同　桂",
            "g-7574=72:７五歩",
            "s-1518=73:１五香",
            "g-0011=74:同　香",
            "sd24p=75:２四歩打",
            "gd34s=76:３四銀打*Sente S-3e otherwise",
            "s-6466=77:６四飛",
            "g-0063=78:同　歩",
            "sd41b=79:４一角打",
            "g-3122=80:３一玉",
            "sd52s=81:５二銀打",
            "g-3343=82:３三金",
            "sd23s=83:２三銀打",
            "g-0034=84:同　銀",
            "s+0024=85:同　歩成",
            "g-0033=86:同　金",
            "sd35n=87:３五桂打",
            "gd34s=88:３四銀打",
            "s+2335=89:２三桂成",
            "g-0034=90:同　銀",
            "sd24s=91:２四銀打",
            "g-0023=92:同　銀",
            "sd23g=93:２三金打",
            "g-0032=94:同　金",
            "s+0041=95:同　角成*Gote's King in Hisshi position. Gote can not prevent g* 4, g* 22 or g*32 with one move.",
            "g-x=96:中断",
            "C:58手",
            "g-7381=58:７三桂",
            "s-1518=59:１五香",
            "g-0011J60:同　香",
            "s+1325=61:１三桂成",
            "C:60手",
            "gd34p=60:３四歩打",
            "sd12p=61:１二歩打",
            "g-3534=62:３五歩",
            "s+1112=63:１一歩成",
            "C:56手",
            "g-0063=56:同　歩",
            "s-3568=57:３五角",
            "gd34p=58:３四歩打",
            "s-6835=59:６八角",
            "g-6564=60:６五歩",
            "sd13p=61:１三歩打",
            "C:48手",
            "g-4544=48:４五歩",
            "s-0046=49:同　銀",
            "g+1973=50:１九角成",
            "s-4668=51:４六角",
            "g-0019=52:同　馬",
            "s-0047=53:同　歩",
            "gd59b=54:５九角打",
            "sd37b=55:３七角打",
            "g+0059=56:同　角成",
            "s-0038=57:同　飛",
            "gd59b=58:５九角打",
            "sd66b=59:６六角打",
            "g-1222=60:１二玉",
            "s-2737=61:２七飛*Bishop at 5i will be dead with s-6h",
            "C:46手",
            "g-6463J46:６四歩",
            "s-0065=47:同　歩",
            "g-0073J48:同　角",
            "s-6677=49:６六銀",
            "g-8584=50:８五歩",
            "s-6566=51:６五銀",
            "C:48手",
            "g-0053=48:同　銀",
            "s-1516=49:１五歩",
            "g-0014=50:同　歩",
            "s-3536=51:３五歩",
            "g-0034=52:同　歩",
            "s-2537=53:２五桂",
            "C:46手",
            "g-4253=46:４二銀",
            "s-2537=47:２五桂",
            "g-4544=48:４五歩",
            "s-0046=49:同　銀",
            "g+1973=50:１九角成",
            "s-4668=51:４六角",
            "g-0019=52:同　馬",
            "s-0047=53:同　歩",
            "gd59b=54:５九角打",
            "s-4445=55:４四銀",
            "g+2659=56:２六角成",
            "sd71b=57:７一角打",
            "g-7282=58:７二飛",
            "s+3344=59:３三銀成",
            "g-0042=60:同　銀",
            "s+2671=61:２六角成",
            "C:34手",
            "g-4544=34:４五歩",
            "s-3746=35:３七銀",
            "g-5362=36:５三銀",
            "s-4647=37:４六歩",
            "g-0045=38:同　歩",
            "s-0068=39:同　角",
            "g-0064=40:同　角",
            "s-0037=41:同　銀",
            "gd47b=42:４七角打",
            "s-3746=43:３七銀",
            "g+6947=44:６九角成",
            "s-6867=45:６八金",
            "g-5969J46:５九馬",
            "sd67b=47:６七角打",
            "gd47p=48:４七歩打",
            "s-7978=49:７九金*Notice that Gote's horse is dead.",
            "C:46手",
            "g-4769=46:４七馬",
            "s-6778=47:６七金",
            "g-5554=48:５五歩",
            "s-5767=49:５七金",
            "x"
        ]
    },

    {
        caption: "Hidetch pieces",
        ban:4,
        koma:7,
        grid:4,
        kifu: `
      # --- Kifu for Windows V6.54 棋譜ファイル ---
開始日時：2008/06/02(月) 22:06:10
手合割：その他　
上手の持駒：歩二　
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ ・ ・v銀v桂v香|一
| ・ ・ ・ 龍v歩v金v玉 ・ ・|二
| ・ ・ ・ ・ ・v歩 ・v歩 ・|三
| ・ ・ ・ ・ 歩 ・v歩 ・v歩|四
| ・ ・ ・ ・ ・ 桂 ・ ・ ・|五
| ・ ・ ・ ・ ・ ・ 歩 歩 歩|六
| ・ ・ ・ ・ ・ ・ ・ ・ ・|七
| ・ ・ ・ ・ ・ ・ ・ ・ ・|八
| ・ ・ ・ ・ ・ ・ ・ ・ ・|九
+---------------------------+
下手の持駒：歩三　
下手番
下手：
上手：
手数----指手---------消費時間--
   1 ５三歩成(54) ( 0:00/00:00:00)
   2 同　歩(52)   ( 0:00/00:00:00)
   3 同　桂成(45) ( 0:00/00:00:00)+
*Not bad, but do you recognize that there is a better way in this case? (step back one move and select the alternative move using the dropdown.
   4 中断         ( 0:00/00:00:00)
まで3手で中断

変化：3手
   3 ５四歩打     ( 0:00/00:00:00)
   4 同　歩(53)   ( 0:00/00:00:00)
   5 ５三歩打     ( 0:00/00:00:00)
   6 ２二玉(32)   ( 0:00/00:00:00)
   7 ５二歩成(53) ( 0:00/00:00:00)
   8 ３二金(42)   ( 0:00/00:00:00)
   9 ４二歩打     ( 0:00/00:00:00)
  10 １二玉(22)   ( 0:00/00:00:00)
  11 ４一歩成(42) ( 0:00/00:00:00)
  12 ２二銀(31)   ( 0:00/00:00:00)
  13 ４二と(52)   ( 0:00/00:00:00)
*Do you start appreciating the power of pawns?
  14 中断         ( 0:00/00:00:00)
まで13手で中断
`
    },
    {
        caption: "smooth move option turned off",
        initialComment: 'pawn pawn',
        smooth: false,
        kifu: `#KIF version=2.0 encoding=UTF-8,

# ---- Kifu for Windows V7 V7.06 棋譜ファイル ----
# --- Kifu for Windows V6.54 棋譜ファイル ---
開始日時：2008/05/06(火) 21:02:12
終了日時：2008/05/06(火) 21:53:44
手合割：その他　
上手の持駒：なし
  ９ ８ ７ ６ ５ ４ ３ ２ １
+---------------------------+
| ・ ・ ・ ・ ・ ・ ・v桂v香|一
| ・ ・ ・ ・ ・ ・v金v玉 ・|二
| ・ ・ ・ ・ ・v銀 ・v歩 ・|三
| ・ ・ ・ ・ ・v歩v歩 ・v歩|四
| ・ ・ ・ ・v銀 ・ ・ ・ ・|五
| ・ ・ ・ ・ ・ 歩 歩 ・ 歩|六
| ・ ・ ・ ・ ・ 金 ・ ・ ・|七
| ・ ・ ・ ・ ・ 角 ・ 飛 ・|八
| ・ ・ ・ ・ ・ ・ ・ 桂 香|九
+---------------------------+
下手の持駒：歩三　
下手番
下手：
上手：
手数----指手---------消費時間--
   1 ２四歩打     ( 0:00/00:00:00)
   2 同　歩(23)   ( 0:00/00:00:00)
   3 ２五歩打     ( 0:00/00:00:00)
   4 同　歩(24)   ( 0:00/00:00:00)
   5 同　飛(28)   ( 0:00/00:00:00)
*You get silver for free!
   6 ２三歩打     ( 0:02/00:00:02)
   7 ５五飛(25)   ( 0:02/00:00:02)`
    },
    {caption: 'No data = initial static board'},

]

initialSetup__ts81 = [...initialSetup__ts81, ...rest_of_setup];
